import { useEffect, useState } from "react";
import { getPosts } from "../api/postApi";

export const usePosts = ({ tag, sort, query, page, pageSize = 12 }) => {

  // post 패치
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  // 파라미터 변경 시 초기화
  useEffect(() => {
    setPosts([]);
    setHasMore(true);
  }, [tag, sort, query]);

  // 데이터 패치
  const fetchPosts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const { data } = await getPosts({
        page,
        limit: pageSize,
        tag,
        sort,
        query,
      });

      setPosts((prev) => page === 1 ? data.posts : [...prev, ...data.posts]);

      setHasMore(data.hasMore);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page, tag, sort, query]);

  return { posts, hasMore, loading, error, fetchPosts };
};