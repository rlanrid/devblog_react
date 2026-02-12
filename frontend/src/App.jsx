import { useMemo, useReducer } from "react";

import { initialState } from "./store/initialState";

import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import Footer from "./components/layout/Footer";

import { getDataProcessing, paginate } from "./utils/dataProcess";
import { postReducer } from "./store/reducer/postReducer";

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

  // reducer
  const [state, dispatch] = useReducer(postReducer, initialState);

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