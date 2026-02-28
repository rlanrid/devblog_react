import React from 'react'
import { formatTimeAgo } from '../../utils/dataProcess'
import { Link } from 'react-router-dom'

import profileImg from '../../assets/images/JS.png'

const PostItem = ({ post }) => {

  return (
    <article className="post__item">
      <div className="post__thumbnail">
        <Link to={`/posts/${post._id}`}>
          <img src={profileImg} alt="" />
        </Link>

        {/* <img src={profileImg} alt="" /> */}
      </div>
      <div className="post__content">
        <h2 className="post__title">
          <Link to={`/posts/${post._id}`}>
            {post.title}
          </Link>
        </h2>
        <div className="post__summary">
          <Link to={`/posts/${post._id}`}>
            {post.content}
          </Link>
        </div>
        <div className="post__info">
          <div className="post__info-top">
            <span className="post__info-item">{formatTimeAgo(post.createdAt)}</span>
            <span className="dot"></span>
            <span className="post__info-item">{post.info.view} 조회수</span>
            <span className="dot"></span>
            <span className="post__info-item">{post.info.comments} 댓글</span>
          </div>
          <div className="post__info-bottom">
            <span>{post.info.author}</span>
            <span>❤️ 0</span>
          </div>
        </div>
      </div>
    </article>
  )
}

export default PostItem