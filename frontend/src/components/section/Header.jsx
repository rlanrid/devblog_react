import { useEffect } from 'react';
import { useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

import NoProfile from "../../assets/icons/NoProfile.png";

const Header = ({ query, updateQuery, isMenuOpen, syncMenuUI }) => {
  const { isLoggedIn, user } = useAuth();

  // 검색
  const [searchQuery, setSearchQuery] = useState(query);
  const location = useLocation();
  const navigate = useNavigate();

  const isPostListPage = location.pathname === "/posts";

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (isPostListPage) {
      updateQuery("query", value);
    }
  };

  const handleSearchWithKeydown = (e) => {
    if (e.key === "Enter" && !isPostListPage) {
      navigate(`/posts?query=${e.target.value}`);
    }
  };

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  return (
    <header className="header">
      <div className="header__inner container">
        <div className="header__left">
          <button
            className={`hamburger ${isMenuOpen ? "is-open" : ""} `}
            aria-label="메뉴"
            aria-expanded={isMenuOpen ? "True" : "False"}
            onClick={syncMenuUI}
          >
            <span></span>
          </button>

          <form className="header__search" autoComplete='off' action="/" method="get" onSubmit={(e) => { e.preventDefault(); }}>
            <label htmlFor="header__input" className="sr-only">검색어 입력</label>
            <HiOutlineSearch />
            <input
              type="search"
              id="header__input"
              className="header__input"
              placeholder="검색어를 입력하세요..."
              name="search"
              value={searchQuery}
              onChange={handleSearch}
              onKeyDown={handleSearchWithKeydown}
            />
            {/* <button type="submit">검색</button> */}
          </form>
        </div>

        <div className="header__right">
          {isLoggedIn() ?
            <div className="header__user">
              <div className="header__user-info">
                <div className="header__user-avatar">
                  <img src={user.profileImage || NoProfile} alt="프로필 이미지" />
                </div>
                <span className="header__user-name">{user.username}</span>
              </div>
            </div>
            :
            <Link to="/login" className='header__login-btn'>로그인</Link>
          }
        </div>
      </div>
    </header >
  )
}

export default Header