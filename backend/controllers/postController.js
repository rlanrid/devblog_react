const mongoose = require("mongoose");
const Post = require("../models/Post");

// 게시글 전체 조회
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

// 단일 게시글 조회
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch post" });
  }
};

// 게시글 작성
exports.createPost = async (req, res) => {
  try {
    const { title, content, tags, thumbnail } = req.body;

    const newPost = new Post({
      title,
      content,
      tags,
      thumbnail,
    });

    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create post" });
  }
};

// 게시글 수정
exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, tags, thumbnail } = req.body;

    console.log(id)

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invaild ID" });
    }

    const updatePost = await Post.findByIdAndUpdate(
      id,
      { title, content, tags, thumbnail },
      { returnDocument: "after", runValidators: true },
    );

    if (!updatePost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(updatePost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update post" });
  }
};

// 게시글 삭제
exports.deletePost = async (req, res) => {
  try {
    const result = await Post.deleteOne({ _id: req.params.id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "삭제할 게시글이 없습니다." });
    }

    res.status(204).json({ message: "Success to delete post" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete post" });
  }
};

// 조회수 증가
exports.updateViews = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { "info.views": 1 } },
      { returnDocument: "after" }
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update view" });
  }
};