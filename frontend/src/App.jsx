import { useEffect, useMemo, useReducer, useState } from "react";

import { initialState } from "./store/initialState";

import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import Footer from "./components/layout/Footer";

import { getDataProcessing, paginate } from "./utils/dataProcess";
import { postReducer } from "./store/reducer/postReducer";
import { useSearchParams } from "react-router-dom";

function App() {

  // UI
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const syncMenuUI = () => {
    setIsMenuOpen(prev => !prev);
  };

  // actions
  const actions = {
    onSearch: (keyword) => dispatch({ type: "SET_KEYWORD", payload: keyword }),
    onTag: (tag) => dispatch({ type: "SET_TAG", payload: tag }),
    onSort: (sort) => dispatch({ type: "SET_SORT", payload: sort }),
    onPage: (e, page) => {
      e.preventDefault();
      dispatch({ type: "SET_PAGE", payload: page })
    },
  };

  // router
  const [searchParams, setSearchParams] = useSearchParams();

  // 초기 state
  const [state, dispatch] = useReducer(
    postReducer,
    initialState,
    (baseState) => ({
      ...baseState,
      filter: {
        tag: searchParams.get("tag") || "",
        sort: searchParams.get("sort") || "최신순",
        query: searchParams.get("query") || "",
      },
      pagination: {
        ...baseState.pagination,
        page: Number(searchParams.get("page")) || 1,
      },
    })
  );

  // state 변경 -> URL 동기화
  useEffect(() => {
    const params = {};

    if (state.filter.tag) params.tag = state.filter.tag;
    if (state.filter.sort !== "최신순") params.sort = state.filter.sort;
    if (state.filter.query) params.query = state.filter.query;
    if (state.pagination.page !== 1) params.page = state.pagination.page;

    // 루프 방지
    const currentParams = Object.fromEntries([...searchParams]);
    const isDifferent = JSON.stringify(currentParams) !== JSON.stringify(params);

    if (isDifferent) {
      setSearchParams(params, { replace: true });
    }
  }, [
    state.filter.tag,
    state.filter.sort,
    state.filter.query,
    state.pagination.page,
  ]);

  // URL 변경 -> state 동기화 (앞/뒤로가기 대응)
  useEffect(() => {
    const urlState = {
      tag: searchParams.get("tag") || "",
      sort: searchParams.get("sort") || "최신순",
      query: searchParams.get("query") || "",
      page: Number(searchParams.get("page")) || 1,
    };

    const isDifferent =
      state.filter.tag !== urlState.tag ||
      state.filter.sort !== urlState.sort ||
      state.filter.query !== urlState.query ||
      state.pagination.page !== urlState.page;

    if (isDifferent) {
      dispatch({
        type: "SYNC_FROM_URL",
        payload: urlState,
      })
    }
  }, [
    searchParams.get("tag"),
    searchParams.get("sort"),
    searchParams.get("query"),
    searchParams.get("page"),
  ]);

  // 데이터 처리
  const processedPosts = useMemo(() => {
    return getDataProcessing({
      posts: state.data.posts,
      filter: state.filter,
    });
  }, [state.data.posts, state.filter]);

  const totalPage = Math.ceil(processedPosts.length / state.pagination.pageSize);

  const postList = paginate(processedPosts, state.pagination);

  return (
    <>
      <Sidebar onTag={actions.onTag} isMenuOpen={isMenuOpen} />
      {/* aside */}

      <div className="wrap">
        <div className={`overlay ${isMenuOpen ? "is-open" : ""}`}></div>

        <Header state={state} isMenuOpen={isMenuOpen} onSearch={actions.onSearch} syncMenuUI={syncMenuUI} />

        <Main state={state} actions={actions} postList={postList} totalPage={totalPage} />

        <Footer />
      </div>
      {/* wrap */}

      <button id="theme__toggle" className="theme__toggle-btn" aria-label="다크모드로 전환">🌙</button>
      {/* toggle */}
    </>
  )
}

export default App