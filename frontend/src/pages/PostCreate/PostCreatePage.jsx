import PostForm from '../../components/post/PostForm';
import { useNavigate } from 'react-router-dom'
import { usePostForm } from '../../hooks/usePostForm';
import { createPost, getPosts } from '../../api/postApi';

const PostCreatePage = () => {
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

    await createPost();

    await getPosts();

    navigate("/posts");
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

