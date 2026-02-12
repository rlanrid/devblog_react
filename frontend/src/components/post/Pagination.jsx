import React from 'react'

const Pagination = ({ state, actions, totalPage }) => {
  return (
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
  )
}

export default Pagination