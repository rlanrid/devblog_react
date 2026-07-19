import { useEffect, useState } from "react";
import { getPosts } from "../api/postApi";
import { useInfiniteQuery } from "@tanstack/react-query";

export const usePosts = ({ tag, sort, query, page, pageSize = 12 }) => {

  const {
    data,
    isPending,
    isFetchingNextpage,
  } = useInfiniteQuery({
    queryKey: ["posts", { tag, sort, query }],
    queryFn: async () => {
      const { data } = await getPosts({
        page,
        limit: pageSize,
        tag,
        sort,
        query,
      });

      return data;
    },

    initialPageParam: 1,

    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? allPages.length + 1 : undefined;
    },
  })

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

      if (data) {
        console.log(data)
      }

      const newPosts = data?.posts || [];

      setPosts((prev) => page === 1 ? newPosts : [...prev, ...newPosts]);

      setHasMore(data?.hasMore);
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