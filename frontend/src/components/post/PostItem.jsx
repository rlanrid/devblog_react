import React from 'react'

const PostItem = ({ post, actions }) => {
  return (
    <article className="post__item">
      <div className="post__thumbnail">
        <img src={post.thumbnail} alt="게시글 썸네일" />
      </div>
      <div className="post__content">
        <h2 className="post__title">
          <a href="/">{post.title}</a>
        </h2>
        <div className="post__info">
          <span>{post.info.date}</span>
          <span className="dot"></span>
          <span>{post.info.view} 조회수</span>
          <span className="dot"></span>
          <span>{post.info.comment} 댓글</span>
        </div>
        <div className="post__summary">
          {post.summary}
        </div>
        <div className="post__tags">
          <ul className="post__tag-list">
            {post.tag.map((tag) => (
              <li key={tag} className="post__tag-item">
                <button onClick={() => actions.onTag(tag)}>
                  #{tag}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}

export default PostItem