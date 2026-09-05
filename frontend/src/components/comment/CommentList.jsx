import { useState } from "react";
import { HiOutlineTrash, HiOutlinePencil, HiCursorClick } from "react-icons/hi";

import { useAuth } from "../../hooks/useAuth";
import { formatTimeAgo } from "../../utils/dataProcess";

import { useComments, useCreateComment, useDeleteComment, useUpdateComment } from "../../hooks/useComments";

import CommentForm from "./CommentForm"

import NoProfile from "../../assets/icons/NoProfile.png";
import toast from "react-hot-toast";

const CommentList = ({ postId }) => {
  const { user } = useAuth();

  const [content, setContent] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");

  const { comments, isPending, error } = useComments(postId);

  const createCommentMutation = useCreateComment();
  const updateCommentMutation = useUpdateComment();
  const deleteCommentMutation = useDeleteComment();

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    createCommentMutation.mutate(
      { postId, data: { content } },
      {
        onSuccess: () => {
          setContent("");
          toast.success("댓글이 작성되었습니다.");
        },
        onError: (error) => {
          console.error("댓글 작성 실패", error);
        },
      }
    );
  };

  const handleEdit = (comment) => {
    setEditingCommentId(comment._id);
    setEditContent(comment.content);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditContent("");
  };

  const handleUpdate = async (commentId) => {
    if (!editContent.trim()) return;

    updateCommentMutation.mutate(
      {
        postId,
        commentId,
        data: { content: editContent }
      },
      {
        onSuccess: () => {
          setEditingCommentId(null);
          setEditContent("");
          toast.success("댓글이 수정되었습니다.");
        },
        onError: (error) => {
          console.error("댓글 수정 실패", error);
        },
      }
    );
  };

  const handleDelete = async (commentId) => {
    const isConfirm = window.confirm("정말 삭제하시겠습니까?");
    if (!isConfirm) return;

    deleteCommentMutation.mutate(
      { postId, commentId },
      {
        onSuccess: () => {
          toast.success("댓글이 삭제되었습니다.");
        },
        onError: (error) => {
          console.error("댓글 삭제 실패", error);
        }
      }
    );
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
                  <>
                    <button onClick={() => handleEdit(comment)} className="comment__edit-btn">
                      <HiOutlinePencil />
                    </button>
                    <button onClick={() => handleDelete(comment?._id)} className="comment__delete-btn">
                      <HiOutlineTrash />
                    </button>
                  </>
                )}
              </div>

              <div className="comment__info-bottom">
                {editingCommentId === comment._id ? (
                  <div className="comment__content">
                    <textarea
                      name="comment"
                      className="comment__textarea"
                      rows={1}
                      placeholder="댓글을 작성해주세요.."
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                    />
                    <div className="comment__content-btn">
                      <button type="button" onClick={() => handleUpdate(comment._id)}>
                        저장
                      </button>
                      <button type="button" onClick={handleCancelEdit}>
                        취소
                      </button>
                    </div>
                  </div>
                ) :
                  (
                    <div className="comment__content">{comment.content}</div>
                  )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div >
  )
}

export default CommentList