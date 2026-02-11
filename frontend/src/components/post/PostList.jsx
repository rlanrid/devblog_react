import React from 'react'
import PostItem from './PostItem'

const PostList = ({ postList, actions }) => {
  return (
    <div className="post__list">
      {postList.map((post) => (
        <PostItem key={post.id} post={post} actions={actions} />
      ))}
    </div>
  )
}

export default PostList