import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useEffect } from 'react';
import { getPost, updatePost } from '../../api/postApi';

import PostForm from '../../components/post/PostForm';

const PostEditPage = ({ fetchPosts }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { form, setForm, handleFieldChange } = useForm({
    title: "",
    content: "",
    tags: [],
    thumbnail: null,
  });

  const loadPost = async () => {
    try {
      const { data } = await getPost(id);
      setForm({
        title: data.title,
        content: data.content,
        tags: data.tags || ["Vue"],
        thumbnail: data.thumbnail || null,
      });
    } catch (error) {
      console.error("게시글 불러오기 실패", error);
    }
  };

  useEffect(() => {
    loadPost();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updatePost(id, form);
      await fetchPosts();
    } catch (error) {
      console.error("게시글 수정 실패", error);
    } finally {
      navigate(`/posts/${id}`);
    }
  };

  return (
    <div className="post-create">
      <PostForm
        form={form}
        setForm={setForm}
        handleFieldChange={handleFieldChange}
        handleSubmit={handleUpdate}
      />
    </div>
  )
}

export default PostEditPage

