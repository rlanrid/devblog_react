import PostList from '../../components/post/PostList';
import Pagination from '../../components/post/Pagination';
import PostSort from '../../components/post/PostSort';

const PostListPage = ({ postSort, updateQuery, postList }) => {

  return (
    <>
      <div className="post__inner container">
        <PostSort postSort={postSort} updateQuery={updateQuery} />
        <PostList postList={postList} />
      </div>
    </>
  )
}

export default PostListPage

