import { useEffect, useMemo, useState } from "react";
import { getDataProcessing, paginate } from "../utils/dataProcess";
import { getPosts } from "../api/postApi";
import { useCallback } from "react";

export const usePosts = ({ tag, sort, query, page, pageSize = 10 }) => {

  // post 패치
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  // const fetchPostss = async () => {
  //   setLoading(true);
  //   try {
  //     const { data } = await getPosts();
  //     setPosts(data);
  //   } catch (error) {
  //     console.error(error);
  //     setError(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // 데이터 패치
  const fetchPosts = useCallback(async () => {
    if (loading) return;

    setLoading(true);

    try {
      const { data } = await getPosts({ page, limit: 12, tag, sort, query });

      setPosts((prev) => (page === 1 ? data.posts : [...prev, ...data.posts]));

      setHasMore(data.hasMore);
    } catch (error) {
      console.error("게시글 로드 실패:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [page, tag, sort, query]);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    setPosts([]);
    setHasMore(true);
  }, [tag, sort, query]);

  // 데이터 처리
  // const processedPosts = useMemo(() => {
  //   return getDataProcessing({
  //     posts: posts,
  //     filter: { tag, sort, query },
  //   });
  // }, [posts, tag, sort, query]);

  // const totalPage = Math.ceil(processedPosts.length / pageSize);
  // const postList = paginate(processedPosts, { page, pageSize: pageSize });

  return { posts, hasMore, loading, error, fetchPosts };
};