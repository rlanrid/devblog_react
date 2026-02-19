const express = require("express");
const router = express.Router();

const Post = require("../models/Post");

// GET
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
});

router.get("/:id", async (req, res) => {
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
});

// POST
router.post("/", async (req, res) => {
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
});

// PUT
router.put("/:id", async (req, res) => {
  try {
    const updatePost = await Post.findByIdAndUpdate(req.params.id, req.body, { returnDocument: "after" });

    if (!updatePost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(updatePost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update post" });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const result = await Post.deleteOne({ _id: req.params.id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "삭제할 게시글이 없습니다." });
    }

    res.status(200).json({ message: "Success to delete post" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete post" });
  }
});

module.exports = router;