import React from 'react'

const Pagination = ({ page, updateQuery, totalPage }) => {
  return (
    <nav className="pagination">
      <ul>
        <li>
          <a
            href="/"
            className={page === 1 ? 'prev disabled' : 'prev'}
            aria-disabled={page === 1}
            onClick={(e) => {
              e.preventDefault();
              updateQuery("page", page - 1)
            }}
          >
            이전
          </a>
        </li>
        {Array.from({ length: totalPage }, (_, i) => i + 1).map((index) => (
          <li key={index}>
            <a
              href="/"
              className={index === page ? 'active' : ''}
              aria-disabled={page !== index}
              onClick={(e) => {
                e.preventDefault();
                updateQuery("page", index)
              }}
            >
              {index}
            </a>
          </li>
        ))}

        <li>
          <a
            href="/"
            className={page >= totalPage ? 'next disabled' : 'next '}
            aria-disabled={page === totalPage}
            onClick={(e) => {
              e.preventDefault();
              updateQuery("page", page + 1)
            }}
          >
            다음
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination