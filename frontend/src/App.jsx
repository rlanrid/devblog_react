import { useCallback, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { useTheme } from "./context/ThemeContext";
import { useLockBodyScroll } from "./hooks/useLockBodyScroll";
import { usePostQuery } from "./hooks/usePostQuery";
import { usePosts } from "./hooks/usePosts";

import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import PostListPage from "./pages/PostList/PostListPage";
import PostCreatePage from "./pages/PostCreate/PostCreatePage";
import PostDeatilPage from "./pages/PostDetail/PostDeatilPage";
import PostEditPage from "./pages/PostEdit/PostEditPage";

import DefaultLayout from "./components/layout/DefaultLayout";

function App() {

  // Theme
  const { theme, changeTheme } = useTheme();

  const handleThemeToggle = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    changeTheme(nextTheme);
  };

  // 사이드바
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const syncMenuUI = () => setIsMenuOpen(prev => !prev);
  useLockBodyScroll({ active: isMenuOpen, onClose: closeMenu, breakpoint: 980 });

  // URL 쿼리
  const { tag, sort, query, page, updateQuery } = usePostQuery();

  // 포스트 데이터
  const { postList, totalPage, loading, error } = usePosts({ tag, sort, query, page });

  if (error) return <div>에러 발생</div>;

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

            <Route path="/posts/:id" element={<PostDeatilPage />} />

            <Route path="/posts/create" element={<PostCreatePage />} />
            <Route path="/posts/edit/:id" element={<PostEditPage />} />
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