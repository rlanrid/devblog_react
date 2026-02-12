import { useEffect, useMemo, useReducer } from "react";

import { initialState } from "./store/initialState";

import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import Footer from "./components/layout/Footer";

import { getDataProcessing, paginate } from "./utils/dataProcess";
import { postReducer } from "./store/reducer/postReducer";
import { replace, useSearchParams } from "react-router-dom";

function App() {

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

  // reducer
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

  useEffect(() => {
    const params = {};

    if (state.filter.tag) params.tag = state.filter.tag;
    if (state.filter.sort !== "최신순") params.sort = state.filter.sort;
    if (state.filter.query) params.query = state.filter.query;
    if (state.pagination.page !== 1) params.page = state.pagination.page;

    console.log(state.pagination.page)

    setSearchParams(params), { replace: true };
  }, [
    state.filter,
    state.pagination.page,
  ]);

  // post
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
      <Sidebar onTag={actions.onTag} />
      {/* aside */}

      <div className="wrap">
        <div className="overlay"></div>

        <Header state={state} onSearch={actions.onSearch} />

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