const express = require("express");
const router = express.Router();

const { getComments, createComment, deleteComment, updateComment } = require("../controllers/commentController");
const { protect } = require("../middlewares/authMiddleware");

router.get("/:postId", getComments);
router.post("/:postId", protect, createComment);
router.put("/:postId/:commentId", protect, updateComment);
router.delete("/:postId/:commentId", protect, deleteComment);

module.exports = router;