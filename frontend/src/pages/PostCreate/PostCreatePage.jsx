import { useNavigate } from 'react-router-dom'
import PostForm from '../../components/post/PostForm';
import { usePostForm } from '../../hooks/usePostForm';

import styles from "./PostCreatePage.module.css";

const PostCreatePage = ({ fetchPosts }) => {
  const navigate = useNavigate();

  const { form, setForm, handleFieldChange } = usePostForm({
    title: "",
    content: "",
    tags: [],
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
    <div className={styles.inner}>
      <PostForm
        form={form}
        setForm={setForm}
        handleFieldChange={handleFieldChange}
        handleCreate={handleCreate}
      />
    </div>
  )
}

export default PostCreatePage

