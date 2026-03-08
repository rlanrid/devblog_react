import { useCallback, useEffect, useMemo, useState } from "react";

import { useTheme } from "./context/ThemeContext";

import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import { getDataProcessing, paginate } from "./utils/dataProcess";
import { Navigate, Route, Routes, useSearchParams } from "react-router-dom";
import { useLockBodyScroll } from "./hooks/useLockBodyScroll";

import PostListPage from "./pages/PostListPage";
import PostCreatePage from "./pages/PostCreatePage";
import PostDeatilPage from "./pages/PostDeatilPage";
import PostEditPage from "./components/post/PostEditPage";
import BlogLayout from "./components/layout/BlogLayout";

function App() {

  // Theme
  const { theme, changeTheme } = useTheme();

  const handleThemeToggle = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    changeTheme(nextTheme);
  };

  // UI
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const syncMenuUI = () => {
    setIsMenuOpen(prev => !prev);
  };

  useLockBodyScroll({ active: isMenuOpen, onClose: closeMenu, breakpoint: 980 });

  // state
  const [pageSize, setPageSize] = useState(10);
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

  const totalPage = Math.ceil(processedPosts.length / pageSize);

  const postList = paginate(processedPosts, { page, pageSize: pageSize });

  return (
    <>
      <Sidebar isMenuOpen={isMenuOpen} />
      {/* aside */}

      <div className="wrap">
        <div
          className={`overlay ${isMenuOpen ? "is-open" : ""}`}
          onClick={syncMenuUI}
        ></div>

        <Header query={query} updateQuery={updateQuery} isMenuOpen={isMenuOpen} syncMenuUI={syncMenuUI} />

        <main className="main">
          <Routes>
            <Route path="/" element={<Navigate to="/posts" replace />} />
            <Route path="/posts" element={<PostListPage postSort={sort} page={page} updateQuery={updateQuery} postList={postList} totalPage={totalPage} />} />

            <Route path="/posts/:id" element={<PostDeatilPage fetchPosts={fetchPosts} />} />

            <Route path="/posts/create" element={<PostCreatePage fetchPosts={fetchPosts} />} />
            <Route path="/posts/edit/:id" element={<PostEditPage fetchPosts={fetchPosts} />} />
          </Routes>
        </main>

        <Footer />
      </div>
      {/* wrap */}

      {/* <button
        id="theme__toggle"
        className="theme__toggle-btn"
        aria-label={`${theme === "dark" ? "라이트" : "다크"}모드로 전환`}
        onClick={handleThemeToggle}
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </button> */}
      {/* toggle */}


      {/* 
      <Routes>
        <Route path="/" element={<Navigate to="/posts" replace />} />

        <Route element={<BlogLayout />}>
          <Route path="/posts" element={<PostListPage postSort={sort} page={page} updateQuery={updateQuery} postList={postList} totalPage={totalPage} />} />
        </Route>
      </Routes> */}
    </>
  )
}

export default App