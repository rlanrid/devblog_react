import PostForm from '../components/post/PostForm';
import { useNavigate } from 'react-router-dom'
import { usePostForm } from '../hooks/usePostForm';
import { createPost } from '../api/postApi';

const PostCreatePage = ({ fetchPosts }) => {
  const navigate = useNavigate();

  const { form, setForm, handleFieldChange } = usePostForm({
    title: "",
    content: "",
    tags: [],
    tagsInput: "",
    thumbnail: "../",
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
        handleCreate={handleCreate}
      />
    </div>
  )
}

export default PostCreatePage

