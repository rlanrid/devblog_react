import { useReducer, useState } from "react";

import { posts } from "./data/posts";
import profileImg from "./assets/images/profile.jpg";
import XImg from "./assets/images/X.jpg";

function App() {
  const initialState = {
    data: {
      posts: posts,
    },
    filter: {
      tag: '',
      sort: 'latest',
      query: '',
    },
    pagination: {
      page: 1,
      pageSize: 5,
    },
    UI: {
      isMenuOpen: false,
      theme: '',
    },
  };

  // const [state, setState] = useState(initialState);

  // useReducer
  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state, action) {
    switch (action.type) {
      case "SET_TAG":
        return {
          ...state,
          filter: {
            ...state.filter,
            tag: action.payload,
          },
        };

      default:
        return state;
    }
  };

  // 함수
  const getDataProcessing = (state) => {
    let result = [...state.data.posts];

    // 태그 필터링
    if (state.filter.tag !== "") {
      const targetTag = state.filter.tag.toLowerCase();

      result = result.filter(post => post.tag.some(t => t.toLowerCase() === targetTag));
    }


    return result;
  };

  // 임시
  const tempTags = ["HTML5", "CSS", "JavaScript", "React", "Vue", "Jquery", "CS"];

  const postList = getDataProcessing(state);

  return (
    <>
      <aside className="sidebar">
        <div className="sidebar__inner">
          <header className="sidebar__header">
            <h1 className="sidebar__logo">WJ's blog</h1>
            <div className="sidebar__profile">
              <img src={profileImg} alt="프로필 이미지" className="profile" />
            </div>
            <p className="sidebar__bio">Hi, my name is Mike. </p>
            <ul className="social">
              <li className="social__item Github">
                <a href="">
                  <img src={XImg} alt="X" className="social__img" />
                </a>
              </li>
              <li className="social__item Jobkorea">
                <a href="">
                  <img src={XImg} alt="X" className="social__img" />
                </a>
              </li>
              <li className="social__item Saramin">
                <a href="">
                  <img src={XImg} alt="X" className="social__img" />
                </a>
              </li>
              <li className="social__item X">
                <a href="">
                  <img src={XImg} alt="X" className="social__img" />
                </a>
              </li>
              <li className="social__item X">
                <a href="">
                  <img src={XImg} alt="X" className="social__img" />
                </a>
              </li>
            </ul>
          </header>

          <nav className="nav" aria-label="주 메뉴">
            <ul className="menu">
              <li className="menu__item"><a href="/">Home</a></li>
              <li className="menu__item"><a href="/">My Posts</a></li>
              <li className="menu__item"><a href="/">Setting</a></li>
            </ul>
          </nav>

          {/* todo: post write */}

          <section className="sidebar__tags" aria-labelledby="sidebar__tags-head">
            <h2 id="sidebar__tags-head" className="sr-only">태그 목록</h2>
            <ul className="sidebar__tag-list">
              {tempTags.map((tag) => (
                <li key={tag} className="sidebar__tag-item">
                  <button data-tag={tag} onClick={() => {
                    dispatch({
                      type: "SET_TAG",
                      payload: tag,
                    });
                  }}>
                    #{tag}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </aside>
      {/* aside */}

      <div className="wrap">
        <div className="overlay"></div>

        <header className="header">
          <div className="header__inner">
            <button className="hamburger" aria-label="메뉴" aria-expanded="false">
              <span></span>
            </button>
            <div className="header__intro">
              <h1 className="header__logo">DevBlog - A Blog For Developers</h1>
              <p className="header__subtitle">Welcome to my blog. Subscribe and get my latest blog post in your inbox.</p>
            </div>

            <form className="header__search" action="/" method="">
              {/* <label for="header__select" className="sr-only">검색 대상</label>
          <select name="type" id="header__select" className="header__select">
            <option value="post">게시글</option>
            <option value="user">유저</option>
          </select> */}

              <label htmlFor="header__input" className="sr-only">검색어 입력</label>
              <input type="search" id="header__input" className="header__input" placeholder="Search for posts..." name="search" />

              <button type="submit" className="header__button">Search</button>
            </form>
          </div>
        </header>

        <main className="main">
          <div className="post__inner">
            <div className="post__filtering" role="group" aria-label="게시글 정렬">
              <button type="button" data-sort="latest" className="is-active" aria-pressed="true">최신순</button>
              <button type="button" data-sort="views" aria-pressed="false">조회순</button>
            </div>
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
                            <button data-tag={tag}>
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

          </nav>
        </main>


        <footer className="footer">
          <div className="footer__content">
            <p>이 사이트의 디자인은 Dribble을 참고하여 만들었습니다.</p>
            <p>© 2024 DevBlog. All rights reserved. | Built with Passion</p>
          </div>
        </footer>
      </div>
      {/* wrap */}

      <button id="theme__toggle" className="theme__toggle-btn" aria-label="다크모드로 전환">🌙</button>
      {/* toggle */}
    </>
  )
}

export default App