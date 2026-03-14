import { Navigate, Route, Routes } from "react-router-dom";

import { usePostQuery } from "./hooks/usePostQuery";
import { usePosts } from "./hooks/usePosts";

import PostListPage from "./pages/PostListPage";
import PostCreatePage from "./pages/PostCreatePage";
import PostDeatilPage from "./pages/PostDeatilPage";
import PostEditPage from "./pages/PostEditPage";

import BlogLayout from "./components/layout/BlogLayout";
import AuthLayout from "./components/layout/AuthLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./components/common/PrivateRoute";
import PublicOnlyRoute from "./components/common/PublicOnlyRoute";

function App() {
  // URL 쿼리
  const { tag, sort, query, page, updateQuery } = usePostQuery();

  // 포스트 데이터
  const { postList, totalPage, loading, error, fetchPosts } = usePosts({ tag, sort, query, page });

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
        <Route path="/posts/:id" element={<PostDeatilPage fetchPosts={fetchPosts} />} />

        <Route element={<PrivateRoute />}>
          <Route path="/posts/create" element={<PostCreatePage fetchPosts={fetchPosts} />} />
          <Route path="/posts/edit/:id" element={<PostEditPage fetchPosts={fetchPosts} />} />
        </Route>
      </Route>

      <Route element={<AuthLayout />}>
        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Route>

    </Routes>
  )
}

export default App