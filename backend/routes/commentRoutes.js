const express = require("express");
const router = express.Router();

const { getComments, createComment, deleteComment } = require("../controllers/commentController");
const { protect } = require("../middlewares/authMiddleware");

router.get("/:postId", getComments);
router.post("/:postId", protect, createComment);
router.delete("/:postId/:commentId", protect, deleteComment);

module.exports = router;