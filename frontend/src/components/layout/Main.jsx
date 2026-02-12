import React from 'react'
import PostList from '../post/PostList';
import Pagination from '../post/Pagination';
import PostSort from '../post/PostSort';

const Main = ({ state, actions, postList, totalPage }) => {

  return (
    <main className="main">
      <div className="post__inner">
        <PostSort state={state} actions={actions} />

        <PostList postList={postList} actions={actions} />
      </div>

      <Pagination state={state} actions={actions} totalPage={totalPage} />
    </main>
  )
}

export default Main