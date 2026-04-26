import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";

import { createComment, deleteComment } from "../../api/commentApi";
import { useAuth } from "../../hooks/useAuth";
import { formatTimeAgo } from "../../utils/dataProcess";

import CommentForm from "./CommentForm"

import NoProfile from "../../assets/icons/NoProfile.png";

const CommentList = ({ setComments, comments, postId }) => {
  const { user } = useAuth();

  const [content, setContent] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      const { data } = await createComment(postId, { content });

      setComments(prev => [data, ...prev]);

      setContent("");
    } catch (error) {
      console.error("댓글 작성 실패", error);
    }
  };

  const handleDelete = async (commentId) => {
    const isConfirm = window.confirm("정말 삭제하시겠습니까?");
    if (!isConfirm) return;

    try {
      await deleteComment(postId, commentId);

      setComments((prev) => prev.filter((comment) => comment._id !== commentId));
    } catch (error) {
      console.error("댓글 삭제 실패", error);
    }
  };

  return (
    <div className="post-detail__comment">
      <CommentForm
        content={content}
        setContent={setContent}
        handleSubmit={handleCreate}
        user={user}
      />

      <div className="comment__list">
        {comments.map((comment) => (
          <div className="comment__item" key={comment._id}>
            <div className="comment__profile">
              <img src={comment.author.profileImage || NoProfile} alt="유저 프로필" />
            </div>
            <div className="comment__info">
              <div className="comment__info-top">
                <div className="comment__author">{comment.author.username}</div>
                <div className="comment__date">{formatTimeAgo(comment?.createdAt)}</div>
                {user?.id === comment?.author?._id && (
                  <button onClick={() => handleDelete(comment?._id)} className="comment__delete-btn">
                    <HiOutlineTrash />
                  </button>
                )}
              </div>

              <div className="comment__info-bottom">
                <div className="comment__content">{comment.content}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommentList