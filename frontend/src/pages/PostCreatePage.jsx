import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const PostCreatePage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
    tags: [],
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5050/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    navigate("/posts");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="제목"
        value={form.title}
        onChange={handleChange}
      />
      <textarea
        name="content"
        placeholder="내용"
        value={form.content}
        onChange={handleChange}
      />
      <input
        name="tag"
        placeholder="태그"
        value={form.tag}
        onChange={handleChange}
      />
      <button type="submit">작성</button>
    </form>
  )
}

export default PostCreatePage