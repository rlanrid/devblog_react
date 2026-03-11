import { Navigate, Route, Routes } from "react-router-dom";

import { usePostQuery } from "./hooks/usePostQuery";
import { usePosts } from "./hooks/usePosts";

import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import PostListPage from "./pages/PostList/PostListPage";
import PostCreatePage from "./pages/PostCreate/PostCreatePage";
import PostDeatilPage from "./pages/PostDetail/PostDeatilPage";
import PostEditPage from "./pages/PostEdit/PostEditPage";

import BlogLayout from "./components/layout/BlogLayout";
import AuthLayout from "./components/layout/AuthLayout";

function App() {
  // URL 쿼리
  const { tag, sort, query, page, updateQuery } = usePostQuery();

  // 포스트 데이터
  const { postList, totalPage, loading, error } = usePosts({ tag, sort, query, page });

  if (error) return <div>에러 발생</div>;

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/posts" replace />} />

      <Route element={<BlogLayout query={query} updateQuery={updateQuery} />}>
        <Route path="/posts" element={
          <PostListPage
            postSort={sort} page={page}
            updateQuery={updateQuery}
            postList={postList}
            totalPage={totalPage}
            loading={loading}
          />}
        />
        <Route path="/posts/:id" element={<PostDeatilPage />} />
        <Route path="/posts/create" element={<PostCreatePage />} />
        <Route path="/posts/edit/:id" element={<PostEditPage />} />
      </Route>

      <Route element={<AuthLayout />}>

      </Route>

    </Routes>
  )
}

export default App