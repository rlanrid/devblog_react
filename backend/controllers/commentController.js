const Comment = require("../models/Comment");
const Post = require("../models/Post");

// 댓글 조회
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.
      find({ post: req.params.postId })
      .populate("author", "username profileImage")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "서버 오류" });
  }
};

// 댓글 작성
exports.createComment = async (req, res) => {
  try {
    const { content } = req.body;

    const comment = await Comment.create({
      post: req.params.postId,
      author: req.user._id,
      content,
    });

    const populated = await comment.populate("author", "username profileImage");

    await Post.findByIdAndUpdate(req.params.postId, { $inc: { commentCount: 1 } });

    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: "서버 오류" });
  }
};

// 댓글 삭제
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
    }

    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "권한이 없습니다." });
    }

    await comment.deleteOne();

    await Post.findByIdAndUpdate(req.params.postId, { $inc: { commentCount: -1 } });

    res.status(200).json({ message: "댓글 삭제 완료" });
  } catch (error) {
    res.status(500).json({ message: "서버 오류" });
    console.error(error)
  }
};