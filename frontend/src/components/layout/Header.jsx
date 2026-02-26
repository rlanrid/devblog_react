import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

const Header = ({ query, updateQuery, isMenuOpen, syncMenuUI }) => {

  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  return (
    <header className="header">
      <div className="header__inner container">
        <button
          // className={`hamburger ${isMenuOpen ? "is-open" : ""} `}
          aria-label="메뉴"
          aria-expanded={isMenuOpen ? "True" : "False"}
          onClick={syncMenuUI}
        >
          <span></span>
        </button>
        <div className="header__intro">
          <h1 className="header__logo">DevBlog - A Blog For Developers</h1>
          <p className="header__subtitle">Welcome to my blog. Subscribe and get my latest blog post in your inbox.</p>
        </div>

        <form className="header__search" action="/" method="" onSubmit={(e) => { e.preventDefault(); }}>
          {/* <label for="header__select" className="sr-only">검색 대상</label>
          <select name="type" id="header__select" className="header__select">
            <option value="post">게시글</option>
            <option value="user">유저</option>
          </select> */}

          <label htmlFor="header__input" className="sr-only">검색어 입력</label>
          <input
            type="search"
            id="header__input"
            className="header__input"
            placeholder="Search for posts..."
            name="search"
            value={searchQuery}
            onChange={(e) => {
              const value = e.target.value;
              setSearchQuery(value);
              updateQuery("query", e.target.value);
            }}
          />
        </form>
      </div>
    </header >
  )
}

export default Header