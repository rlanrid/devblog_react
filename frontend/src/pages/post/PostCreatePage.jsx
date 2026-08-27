import PostForm from '../../components/post/PostForm';
import { useNavigate } from 'react-router-dom'
import { useForm } from '../../hooks/useForm';
import { createPost } from '../../api/postApi';
import { useAuth } from '../../hooks/useAuth';
import { useCreatePost } from '../../hooks/usePosts';
import toast from 'react-hot-toast';

const PostCreatePage = ({ fetchPosts }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { form, setForm, handleFieldChange } = useForm({
    title: "",
    content: "",
    author: user || "Anonymous",
    tags: [],
    thumbnail: "",
  });

  const createPostMutation = useCreatePost();

  const handleCreate = async (e) => {
    e.preventDefault();

    createPostMutation.mutate(form, {
      onSuccess: () => {
        navigate("/posts");
        toast.success("게시글이 작성되었습니다.");
      },
    })
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

