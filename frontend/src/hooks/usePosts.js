import { useEffect, useMemo, useState } from "react";
import { getDataProcessing, paginate } from "../utils/dataProcess";
import { getPosts } from "../api/postApi";

export const usePosts = ({ tag, sort, query, page, pageSize = 10 }) => {
  // post 패치
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data } = await getPosts();
      setPosts(data);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // 데이터 처리
  const processedPosts = useMemo(() => {
    return getDataProcessing({
      posts: posts,
      filter: { tag, sort, query },
    });
  }, [posts, tag, sort, query]);

  const totalPage = Math.ceil(processedPosts.length / pageSize);
  const postList = paginate(processedPosts, { page, pageSize: pageSize });

  return { postList, totalPage, loading, error, fetchPosts };
};