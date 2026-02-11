import React from 'react'

const PostSort = ({ state, actions }) => {
  // 임시
  const tempSorts = ["최신순", "조회순", "댓글순"];

  return (
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
  )
}

export default PostSort