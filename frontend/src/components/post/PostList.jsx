import React from 'react'
import PostItem from './PostItem'

const PostList = ({ postList, updateQuery }) => {
  return (
    <div className="post__list">
      {postList.map((post) => (
        <PostItem key={post._id} post={post} updateQuery={updateQuery} />
      ))}
    </div>
  )
}

export default PostList