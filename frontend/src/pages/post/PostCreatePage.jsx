import PostForm from '../../components/post/PostForm';
import { useNavigate } from 'react-router-dom'
import { usePostForm } from '../../hooks/usePostForm';
import { createPost } from '../../api/postApi';
import { useAuth } from '../../hooks/useAuth';

const PostCreatePage = ({ fetchPosts }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { form, setForm, handleFieldChange } = usePostForm({
    title: "",
    content: "",
    author: user,
    tags: [],
    thumbnail: "",
  });

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await createPost(form);

      await fetchPosts();
    } catch (error) {
      console.error("게시글 작성 실패", error);
    } finally {
      navigate("/posts");
    }
  };

  return (
    <div className='post-create'>
      <PostForm
        form={form}
        setForm={setForm}
        handleFieldChange={handleFieldChange}
        handleSubmit={handleCreate}
      />
    </div>
  )
}

export default PostCreatePage

