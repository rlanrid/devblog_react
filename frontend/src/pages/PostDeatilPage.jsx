import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

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

  return (
    <>
      <div>제목:{detailPost.title}</div>
      <div>내용:{detailPost.content}</div>
      <div>태그:{detailPost.tags}</div>
      <div>이미지:{detailPost.thumbnail} </div>

      <button onClick={handleDelete}>삭제</button>
    </>
  )
}

export default PostDeatilPage