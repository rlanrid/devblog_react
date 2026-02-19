import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { usePostForm } from '../../hooks/usePostForm';
import PostForm from './PostForm';
import { useEffect } from 'react';

const PostEditPage = ({ fetchPosts }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { form, setForm, handleChange } = usePostForm({
    title: "",
    content: "",
    tags: ["Next"],
    thumbnail: "../",
  });

  useEffect(() => {
    fetch(`http://localhost:5050/api/posts/${id}`)
      .then(res => res.json())
      .then(data => setForm({
        title: data.title,
        content: data.content,
        tags: data.tags || ["Vue"],
        thumbnail: data.thumbnail || "../",
      }));
  }, [id]);


  const handleUpdate = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:5050/api/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    await fetchPosts();

    navigate(`/posts/${id}`);
  };

  return (
    <PostForm
      form={form}
      handleChange={handleChange}
      onSubmit={handleUpdate}
    />
  )
}

export default PostEditPage