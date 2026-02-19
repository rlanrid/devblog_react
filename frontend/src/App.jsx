import { useEffect, useMemo, useReducer, useState } from "react";

import { initialState } from "./store/initialState";

import { useTheme } from "./context/ThemeContext";

import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import Main from "./pages/PostListPage";
import Footer from "./components/layout/Footer";

import { getDataProcessing, paginate } from "./utils/dataProcess";
import { postReducer } from "./store/reducer/postReducer";
import { Navigate, Route, Routes, useSearchParams } from "react-router-dom";
import PostCreate from "./pages/PostCreatePage";
import PostListPage from "./pages/PostListPage";
import PostCreatePage from "./pages/PostCreatePage";
import PostDeatilPage from "./pages/PostDeatilPage";
import PostEditPage from "./components/post/PostEditPage";

function App() {

  // Theme
  const { theme, changeTheme } = useTheme();

  const handleThemeToggle = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    changeTheme(nextTheme);
  };

  // UI
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const syncMenuUI = () => {
    setIsMenuOpen(prev => !prev);
  };

  useEffect(() => {
    // scroll bar
    const getScrollbarWidth = () => window.innerWidth - document.documentElement.clientWidth;
    const scrollBarWidth = getScrollbarWidth();

    if (isMenuOpen) {
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }
      document.body.classList.add("is-locked");
    } else {
      document.body.style.paddingRight = '';
      document.body.classList.remove("is-locked");
    }

    // resize
    const handleResize = () => {
      if (window.innerWidth >= 980 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    // 메모리 누수 방지
    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.style.paddingRight = '';
      document.body.classList.remove("is-locked");
    };
  }, [isMenuOpen]);

  // state
  const [state, dispatch] = useReducer(postReducer, { pageSize: 5 });

  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:5050/api/posts");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // router
  const [searchParams, setSearchParams] = useSearchParams();

  const updateQuery = (key, value) => {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);

      if (!value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }

      if (key !== "page") {
        params.get("page", 1);
      }

      return params;
    })
  };

  const tag = searchParams.get("tag") || "";
  const sort = searchParams.get("sort") || "최신순";
  const query = searchParams.get("query") || "";
  const page = Number(searchParams.get("page")) || 1;

  // 스크롤 초기화
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [tag, sort, query, page]);

  // 데이터 처리
  const processedPosts = useMemo(() => {
    return getDataProcessing({
      posts: posts,
      filter: { tag, sort, query },
    });
  }, [posts, tag, sort, query]);

  const totalPage = Math.ceil(processedPosts.length / state.pageSize);

  const postList = paginate(processedPosts, { page, pageSize: state.pageSize });

  return (
    <>
      <Sidebar updateQuery={updateQuery} isMenuOpen={isMenuOpen} />
      {/* aside */}

      <div className="wrap">
        <div
          className={`overlay ${isMenuOpen ? "is-open" : ""}`}
          onClick={syncMenuUI}
        ></div>

        <Header query={query} updateQuery={updateQuery} isMenuOpen={isMenuOpen} syncMenuUI={syncMenuUI} />

        <Routes>
          <Route path="/" element={<Navigate to="/posts" replace />} />
          <Route path="/posts" element={<PostListPage postSort={sort} page={page} updateQuery={updateQuery} postList={postList} totalPage={totalPage} />} />

          <Route path="/posts/:id" element={<PostDeatilPage fetchPosts={fetchPosts} />} />

          <Route path="/posts/create" element={<PostCreatePage fetchPosts={fetchPosts} />} />
          <Route path="/posts/edit/:id" element={<PostEditPage fetchPosts={fetchPosts} />} />
        </Routes>

        <Footer />
      </div>
      {/* wrap */}

      <button
        id="theme__toggle"
        className="theme__toggle-btn"
        aria-label={`${theme === "dark" ? "라이트" : "다크"}모드로 전환`}
        onClick={handleThemeToggle}
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </button>
      {/* toggle */}
    </>
  )
}

export default App