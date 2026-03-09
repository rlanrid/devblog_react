import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { formatTimeAgo } from '../../utils/dataProcess';

const PostDeatilPage = ({ fetchPosts }) => {
  const { id } = useParams();

  const [detailPost, setDetailPost] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5050/api/posts/${id}`)
      .then(res => res.json())
      .then(data => setDetailPost(data));
  }, [id]);

  const navigate = useNavigate();

  const handleDelete = async () => {
    const isConfirm = window.confirm("정말 삭제하시겠습니까?");
    if (!isConfirm) return;

    await fetch(`http://localhost:5050/api/posts/${id}`, {
      method: "DELETE",
    });

    await fetchPosts();

    navigate("/posts");
  };

  if (!detailPost) return <div>로딩 중...</div>

  return (
    <>
      <div className="post-detail container">
        <div className="post-detail__meta">
          <h1 className="post-detail__title">{detailPost.title}</h1>

          <div className="post-detail__info">
            <div className="post-detail__info-left">
              <span>{detailPost?.info?.author}</span>
              <span>{formatTimeAgo(detailPost.createdAt)}</span>
            </div>

            <div className="post-detail__info-right">
              <button className="post-detail__action-btn">팔로우</button>
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
          {detailPost.content}
        </div>


        {/* <div>제목:{detailPost.title}</div>
        <div>내용:{detailPost.content}</div>
        <div>태그:{detailPost.tags}</div>
        <div>이미지:{detailPost.thumbnail} </div>

        <button onClick={handleDelete}>삭제</button> */}

      </div>
    </>
  )
}

export default PostDeatilPage

