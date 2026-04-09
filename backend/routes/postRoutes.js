const express = require("express");
const router = express.Router();

const { getPosts, getPost, createPost, updatePost, deletePost, updateViews, updateLikes } = require("../controllers/postController");
const { protect } = require("../middlewares/authMiddleware");

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", protect, createPost);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);
router.patch("/:id/view", updateViews);
router.patch("/:id/like", protect, updateLikes);

module.exports = router;