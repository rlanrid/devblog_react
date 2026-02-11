import React from 'react'
import PostList from '../post/PostList';

const Main = ({ state, actions, postList, totalPage }) => {
  // 임시
  const tempSorts = ["최신순", "조회순", "댓글순"];

  return (
    <main className="main">
      <div className="post__inner">
        <div className="post__filtering" role="group" aria-label="게시글 정렬">
          {tempSorts.map((sort) => {
            const isActive = state.filter.sort === sort;

            return (
              <button
                key={sort}
                type="button"
                className={isActive ? "is-active" : ""}
                aria-pressed={isActive}
                onClick={() => actions.onSort(sort)}
              >
                {sort}
              </button>
            );
          })}
        </div>

        <PostList postList={postList} />
        <div className="post__list">
          {postList.map((post) => (
            <article key={post.id} className="post__item">
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
          ))}
        </div>
      </div>

      <nav className="pagination">
        <ul>
          <li>
            <a
              href="/"
              className={state.pagination.page === 1 ? 'prev disabled' : 'prev'}
              aria-disabled={state.pagination.page === 1}
              onClick={(e) => { actions.onPage(e, state.pagination.page - 1) }}
            >
              이전
            </a>
          </li>
          {Array.from({ length: totalPage }, (_, i) => i + 1).map((index) => (
            <li key={index}>
              <a
                href="/"
                className={index === state.pagination.page ? 'active' : ''}
                aria-disabled={state.pagination.page !== index}
                onClick={(e) => actions.onPage(e, index)}
              >
                {index}
              </a>
            </li>
          ))}

          {/* todo: page dispatch */}
          <li>
            <a
              href="/"
              className={state.pagination.page === totalPage ? 'next disabled' : 'next '}
              aria-disabled={state.pagination.page === totalPage}
              onClick={(e) => { actions.onPage(e, state.pagination.page + 1) }}
            >
              다음
            </a>
          </li>
        </ul>
      </nav>
    </main>
  )
}

export default Main