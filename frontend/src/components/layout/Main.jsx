import React from 'react'
import PostList from '../post/PostList';
import Pagination from '../post/Pagination';
import PostSort from '../post/PostSort';

const Main = ({ postSort, page, updateQuery, postList, totalPage }) => {

  return (
    <main className="main">
      <div className="post__inner">
        <PostSort postSort={postSort} updateQuery={updateQuery} />

        <PostList postList={postList} updateQuery={updateQuery} />
      </div>

      <Pagination page={page} updateQuery={updateQuery} totalPage={totalPage} />
    </main>
  )
}

export default Main