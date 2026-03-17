import { useState } from 'react';
import { HiArrowNarrowLeft } from "react-icons/hi";
import { Link } from 'react-router-dom';

import MDEditor from "@uiw/react-md-editor";

const PostForm = ({ form, setForm, handleFieldChange, handleCreate }) => {

  const [tagInput, setTagInput] = useState("");

  const handleAddTag = (value) => {
    const newTag = value.toLowerCase().trim();

    if (newTag !== "" && !form.tags.includes(newTag)) {
      setTagInput("");

      const newTags = [...form.tags, newTag];

      setForm(prev => ({
        ...prev,
        tags: newTags,
      }));

    } else {
      setTagInput("");
    }
  };

  const handleRemoveTag = (removeTag) => {
    setForm(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== removeTag),
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag(e.target.value)
    }
  };

  const handleTagBlur = (e) => {
    if (e.target.value !== "") {
      handleAddTag(e.target.value);
    }
  };

  const handleContentChange = (value) => {
    setForm(prev => ({ ...prev, content: value || "" }));
  };

  return (
    <form onSubmit={handleCreate} className='post-create__form'>
      <textarea
        name="title"
        className="post-create__title"
        rows={1}
        placeholder="제목을 입력하세요."
        value={form.title}
        onChange={handleFieldChange}
      />

      <div className="post-create__tagBox">
        <ul className="post-create__tags">
          {form.tags.map((tag) => (
            <li key={tag} className="post-create__tag">
              <button type="button" onClick={() => handleRemoveTag(tag)}>
                # {tag}
              </button>
            </li>
          ))}
        </ul>

        <input
          name="tags"
          placeholder="태그를 입력한 뒤 Enter 키를 누르세요."
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleTagBlur}
        />
      </div>

      <MDEditor
        value={form.content}
        onChange={(value) => handleContentChange(value)}
        preview='edit'
        className='post-create__content'
      />

      <div className="post-create__bottom">
        <Link to='/'>
          <HiArrowNarrowLeft />
          <span>나가기</span>
        </Link>
        <button type='submit' className='post-create__publish' disabled={!form.title || !form.content}>작성</button>
      </div>
    </form>
  )
}

export default PostForm