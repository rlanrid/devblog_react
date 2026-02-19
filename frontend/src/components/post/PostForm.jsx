import React from 'react'

const PostForm = ({ form, handleChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
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
        value={form.tags}
        onChange={handleChange}
      />
      <button type="submit">작성</button>
    </form>
  )
}

export default PostForm