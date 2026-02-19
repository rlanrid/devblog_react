import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import PostForm from '../components/post/PostForm';
import { usePostForm } from '../hooks/usePostForm';

const PostCreatePage = ({ fetchPosts }) => {
  const navigate = useNavigate();

  const { form, handleChange } = usePostForm({
    title: "",
    content: "",
    tags: ["Next"],
    thumbnail: "../",
  });

  const handleCreate = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5050/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    await fetchPosts();

    navigate("/posts");
  };

  return (
    <PostForm
      form={form}
      handleChange={handleChange}
      onSubmit={handleCreate}
    />
  )
}

export default PostCreatePage