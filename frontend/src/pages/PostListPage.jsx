import React from 'react'
import PostList from '../components/post/PostList';
import Pagination from '../components/post/Pagination';
import PostSort from '../components/post/PostSort';

const PostListPage = ({ postSort, page, updateQuery, postList, totalPage }) => {

  return (
    <>
      <div className="post__inner">
        <PostSort postSort={postSort} updateQuery={updateQuery} />
        <PostList postList={postList} />
      </div>

      <Pagination page={page} updateQuery={updateQuery} totalPage={totalPage} />
    </>
  )
}

export default PostListPage