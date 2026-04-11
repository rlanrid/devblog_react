import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { HiHeart } from 'react-icons/hi';

import ReactMarkdown from "react-markdown";

import { formatTimeAgo } from '../../utils/dataProcess';

import { deletePost, getPost, incrementLike, incrementView } from '../../api/postApi';
import { getComments } from '../../api/commentApi';
import { useAuthStore } from '../../store/authStore';

import CommentList from '../../components/comment/CommentList';
import Loading from '../../components/common/Loading';

const PostDeatilPage = ({ fetchPosts }) => {
  const { user, isLoggedIn } = useAuthStore();
  const { postId } = useParams();

  const [detailPost, setDetailPost] = useState(null);
  const [comments, setComments] = useState([]);

  const loadPost = async () => {
    try {
      const { data: postData } = await getPost(postId);
      setDetailPost(postData);

      const { data: commentList } = await getComments(postId);
      setComments(commentList);
    } catch (error) {
      console.error("게시글 불러오기 실패", error);
    }
  };

  const handleUpdateView = async () => {
    try {
      const watched = sessionStorage.getItem(`viewed_${postId}`);

      if (!watched) {
        await incrementView(postId);
        sessionStorage.setItem(`viewed_${postId}`, true);
        await fetchPosts();
      }
    } catch (error) {
      console.error("조회수 업데이트 실패", error);
    }
  };

  useEffect(() => {
    loadPost();
    handleUpdateView();
  }, [postId]);

  const navigate = useNavigate();

  const handleUpdateLike = async () => {
    if (!isLoggedIn()) return alert("로그인 후 이용 가능합니다.");

    try {
      const { data } = await incrementLike(postId);

      setDetailPost(prev => ({
        ...prev,
        info: data.info,
        likeCount: data.likeCount,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    const isConfirm = window.confirm("정말 삭제하시겠습니까?");
    if (!isConfirm) return;

    try {
      await deletePost(postId);

      await fetchPosts();
    } catch (error) {
      console.error("게시글 삭제 실패", error);
    } finally {
      navigate("/posts");
    }
  };

  const isLiking = detailPost?.info?.likes?.includes(user?.id);

  if (detailPost) return <Loading />

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

          {detailPost?.author?._id === user?._id ? (
            <div className="post-detail__delete" >
              <button onClick={handleDelete}>삭제</button>
            </div>
          ) : (
            <></>
          )}
        </div>

        <CommentList setComments={setComments} comments={comments} postId={postId} />
      </div>
    </>
  )
}

export default PostDeatilPage

