import React from 'react'

const Header = ({ state, onSearch }) => {
  const handlerSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <header className="header">
      <div className="header__inner">
        <button className="hamburger" aria-label="메뉴" aria-expanded="false">
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
            value={state.filter.query}
            onChange={(e) => onSearch(e.target.value)}
          />

          <button type="submit" className="header__button">Search</button>
        </form>
      </div>
    </header>
  )
}

export default Header