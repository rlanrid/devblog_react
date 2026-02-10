import { useEffect, useReducer, useState } from "react";

import { posts } from "./data/posts";

import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import Footer from "./components/layout/Footer";

function App() {

  const initialState = {
    data: {
      posts: posts,
    },
    filter: {
      tag: '',
      sort: '최신순',
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

  const sortMap = {
    "최신순": (a, b) => b.id - a.id,
    "조회순": (a, b) => b.info.view - a.info.view,
    "댓글순": (a, b) => b.info.comment - a.info.comment,
  };

  // handler
  const handlerSearchChange = (e) => {
    dispatch({ type: "SET_KEYWORD", payload: e.target.value });
  };

  const handlerTagChange = (tag) => {
    dispatch({
      type: "SET_TAG",
      payload: tag,
    });
  };

  const handlerSortChange = (sort) => {
    dispatch({
      type: "SET_SORT",
      payload: sort,
    });
  };

  const hanlderPageChange = (e, page) => {
    e.preventDefault();
    dispatch({
      type: "SET_PAGE",
      payload: page,
    })
  };

  const actions = {
    onSearch: handlerSearchChange,
    onTag: handlerTagChange,
    onSort: handlerSortChange,
    onPage: hanlderPageChange,
  };

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

      case "SET_KEYWORD":
        return {
          ...state,
          filter: {
            ...state.filter,
            query: action.payload,
          }
        };

      case "SET_SORT":
        return {
          ...state,
          filter: {
            ...state.filter,
            sort: action.payload,
          }
        };

      case "SET_PAGE":
        return {
          ...state,
          pagination: {
            ...state.pagination,
            page: action.payload,
          }
        }

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

    // 검색
    if (state.filter.query !== "") {
      const keyword = state.filter.query.toLowerCase();

      result = result.filter(post =>
        post.title.toLowerCase().includes(keyword) ||
        post.summary.toLowerCase().includes(keyword)
      );
    }

    // 정렬
    if (sortMap[state.filter.sort]) {
      result.sort(sortMap[state.filter.sort]);
    }

    return result;
  };

  const paginate = (processedPosts, pagination) => {
    const startIndex = (pagination.page - 1) * pagination.pageSize;

    return processedPosts.slice(startIndex, startIndex + pagination.pageSize);
  };

  // 포스트
  const processedPosts = getDataProcessing(state);
  const totalPage = Math.ceil(processedPosts.length / state.pagination.pageSize);
  const postList = paginate(processedPosts, state.pagination);

  return (
    <>
      <Sidebar onTag={actions.onTagChange} />
      {/* aside */}

      <div className="wrap">
        <div className="overlay"></div>

        <Header state={state} onSearch={actions.onSearch} />

        <Main state={state} actions={actions} postList={postList} totalPage={totalPage} />

        {/* <Footer /> */}


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