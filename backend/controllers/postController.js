const mongoose = require("mongoose");
const Post = require("../models/Post");

const { deleteImage } = require("./uploadController");

// 게시글 전체 조회
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author").sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

// 단일 게시글 조회
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author");

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
      author: req.user._id,
      tags,
      thumbnail: thumbnail || process.env.DEFAULT_THUMBNAIL,
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
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "권한이 없습니다." });
    }

    if (post.thumbnailPublicId) {
      await deleteImage(post.thumbnailPublicId);
    }

    await post.deleteOne();
    res.status(204).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "게시글 삭제 실패" });
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

// 게시글 좋아요
exports.updateLikes = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }

    const isLiked = post.info.likes.some(like => like.toString() === userId.toString());

    const updateQuery = isLiked
      ? { $pull: { "info.likes": userId } }
      : { $push: { "info.likes": userId } }

    const updateLike = await Post.findByIdAndUpdate(id, updateQuery, { returnDocument: "after" });

    res.status(200).json(updateLike);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류" });
  }
};