import { useNavigate, useParams } from 'react-router-dom';
import { usePostForm } from '../hooks/usePostForm';
import { useEffect } from 'react';
import { getPost, updatePost } from '../api/postApi';

import PostForm from '../components/post/PostForm';

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
    const loadPost = async () => {
      try {
        const { data } = await getPost(id);
        setForm({
          title: data.title,
          content: data.content,
          tags: data.tags || ["Vue"],
          thumbnail: data.thumbnail || "../",
        });
      } catch (error) {
        console.error("게시글 불러오기 실패", error);
      }
    };

    loadPost();
  }, [id]);


  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updatePost(id);
      await fetchPosts();
    } catch (error) {
      console.error("게시글 수정 실패", error);
    } finally {
      navigate(`/posts/${id}`);
    }
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

