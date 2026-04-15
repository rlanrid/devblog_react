import { Navigate, Route, Routes } from "react-router-dom";

import { usePostQuery } from "./hooks/usePostQuery";
import { usePosts } from "./hooks/usePosts";

import BlogLayout from "./components/layout/BlogLayout";
import AuthLayout from "./components/layout/AuthLayout";

import PrivateRoute from "./components/common/PrivateRoute";
import PublicOnlyRoute from "./components/common/PublicOnlyRoute";

import PostListPage from "./pages/post/PostListPage";
import PostCreatePage from "./pages/post/PostCreatePage";
import PostDeatilPage from "./pages/post/PostDeatilPage";
import PostEditPage from "./pages/post/PostEditPage";

import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import UserSettingPage from "./pages/user/UserSettingPage";

function App() {
  // URL 쿼리
  const { tag, sort, query, page, updateQuery } = usePostQuery();

  // 포스트 데이터
  const { posts, fetchPosts, loading, error } = usePosts({ tag, sort, query, page });

  if (error) return <div>에러 발생</div>;

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/posts" replace />} />

      <Route element={<BlogLayout query={query} updateQuery={updateQuery} />}>
        <Route path="/posts" element={
          <PostListPage
            postSort={sort}
            updateQuery={updateQuery}
            postList={posts}
            loading={loading}
          />}
        />
        <Route path="/posts/:postId" element={<PostDeatilPage fetchPosts={fetchPosts} />} />

        <Route element={<PrivateRoute />}>
          <Route path="/posts/create" element={<PostCreatePage fetchPosts={fetchPosts} />} />
          <Route path="/posts/edit/:id" element={<PostEditPage fetchPosts={fetchPosts} />} />
          <Route path="/user/setting" element={<UserSettingPage />} />
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