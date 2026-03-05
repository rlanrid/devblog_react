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
          className={`hamburger ${isMenuOpen ? "is-open" : ""} `}
          aria-label="메뉴"
          aria-expanded={isMenuOpen ? "True" : "False"}
          onClick={syncMenuUI}
        >
          <span></span>
        </button>



        {/* <form className="header__search" action="/" method="" onSubmit={(e) => { e.preventDefault(); }}>
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
        </form> */}
      </div>
    </header >
  )
}

export default Header