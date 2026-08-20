import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { HiHeart } from 'react-icons/hi';

import ReactMarkdown from "react-markdown";

import { formatTimeAgo } from '../../utils/dataProcess';

import { getPost, incrementLike, incrementView } from '../../api/postApi';
import { getComments } from '../../api/commentApi';
import { useAuthStore } from '../../store/authStore';

import CommentList from '../../components/comment/CommentList';
import Loading from '../../components/common/Loading';
import { useDeletePost, useLikePost, usePost } from '../../hooks/usePosts';

const PostDeatilPage = ({ fetchPosts }) => {
  const { user, isLoggedIn } = useAuthStore();
  const { postId } = useParams();
  const navigate = useNavigate();

  const { post: detailPost, loading, error } = usePost(postId);

  const likePostMutation = useLikePost();
  const deletePostMutation = useDeletePost();

  const handleUpdateView = async () => {
    try {
      const watched = sessionStorage.getItem(`viewed_${postId}`);

      if (!watched) {
        await incrementView(postId);
        sessionStorage.setItem(`viewed_${postId}`, true);
        // await fetchPosts();
      }
    } catch (error) {
      console.error("조회수 업데이트 실패", error);
    }
  };

  useEffect(() => {
    handleUpdateView();
  }, [postId]);

  const handleUpdateLike = async () => {
    if (!isLoggedIn()) return alert("로그인 후 이용 가능합니다.");

    likePostMutation.mutate(postId, {
      onError: (error) => {
        console.error("좋아요 처리 실패", error);
      },
    });
  };

  const handleDelete = async () => {
    const isConfirm = window.confirm("정말 삭제하시겠습니까?");
    if (!isConfirm) return;

    deletePostMutation.mutate(postId, {
      onSuccess: () => {
        navigate("/posts");
      },
      onError: (error) => {
        console.error("게시글 삭제 실패", error);
      },
    });
  };

  const isLiking = detailPost?.info?.likes?.includes(user?.id);

  if (!detailPost) return <Loading />

  return (
    <>
      <div className="post-detail container">
        <div className="post-detail__item">
          <div className="post-detail__meta">
            <h1 className="post-detail__title">{detailPost?.title}</h1>
            <div className="post-detail__info">
              <div className="post-detail__info-left">
                <span>{detailPost?.author?.username}</span>
                <span>{formatTimeAgo(detailPost?.createdAt)}</span>
                <span>{detailPost?.isUpdated && "(수정됨)"}</span>
              </div>

              <div className="post-detail__info-right">
                <button
                  type='button'
                  onClick={handleUpdateLike}
                  className={`post-detail__action-btn ${isLiking ? "active" : ""}`}
                >
                  <HiHeart />
                  <span> {detailPost?.likeCount}</span>
                </button>
              </div>
            </div>

            <ul className="post-detail__tags">
              {detailPost?.tags?.map((tag) => (
                <li key={tag}>
                  <Link to={`/posts?tag=${encodeURIComponent(tag)}`}>
                    # {tag}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="post-detail__content">
            <ReactMarkdown>
              {detailPost?.content}
            </ReactMarkdown>
          </div>

          {detailPost?.author?._id === user?.id ? (
            <div className='post-detail__bottom'>
              <div className="post-detail__edit" >
                <Link to={`/posts/edit/${postId}`}>수정</Link>
              </div>
              <div className="post-detail__delete" >
                <button onClick={handleDelete} disabled={deletePostMutation.isPending}>
                  {deletePostMutation.isPending ? "삭제중..." : "삭제"}
                </button>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>

        <CommentList postId={postId} />
      </div>
    </>
  )
}

export default PostDeatilPage

