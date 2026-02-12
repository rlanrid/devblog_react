import { useReducer } from "react";

import { initialState } from "./store/initialState";

import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import Footer from "./components/layout/Footer";

import { getDataProcessing, paginate } from "./utils/dataProcess";
import { postReducer } from "./store/reducer/postReducer";

function App() {

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

  // reducer
  const [state, dispatch] = useReducer(postReducer, initialState);

  // post
  const processedPosts = getDataProcessing(state);
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