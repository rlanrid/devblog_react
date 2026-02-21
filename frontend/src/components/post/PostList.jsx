import React from 'react'
import PostItem from './PostItem'

const PostList = ({ postList, updateQuery }) => {
  return (
    <>
      {postList && postList.length > 0 ?
        <div className="post__list">
          {
            postList.map((post) => (
              <PostItem key={post._id} post={post} updateQuery={updateQuery} />
            ))
          }
        </div> :
        <p className='post__none'>게시글이 없습니다.</p>
      }
    </>
  )
}

export default PostList