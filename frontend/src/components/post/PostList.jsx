import React from 'react'
import PostItem from './PostItem'

const PostList = ({ postList, updateQuery }) => {
  return (
    <div className="post__list">
      {postList && postList.length > 0 ?
        postList.map((post) => (
          <PostItem key={post._id} post={post} updateQuery={updateQuery} />
        ))
        :
        <p>게시글이 없습니다.</p>
      }
    </div>
  )
}

export default PostList