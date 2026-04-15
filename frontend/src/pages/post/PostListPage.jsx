import { useCallback, useEffect, useRef, useState } from 'react';

import { usePostQuery } from '../../hooks/usePostQuery';

import PostList from '../../components/post/PostList';
import PostSort from '../../components/post/PostSort';
import { usePosts } from '../../hooks/usePosts';

const PostListPage = () => {

  // URL 쿼리
  const { tag, sort, query, updateQuery } = usePostQuery();

  // 포스트 데이터
  const [page, setPage] = useState(1);
  // const { posts, loading, hasMore } = usePosts({ tag, sort, query, page });

  // 무한 스크롤
  const observer = useRef();

  const lastRef = useCallback((node) => {
    if (loading) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1);
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  useEffect(() => {
    setPage(1);
  }, [tag, sort, query]);

  return (
    <>
      <div className="post__inner container">
        <PostSort postSort={sort} updateQuery={updateQuery} />
        <PostList postList={posts} lastRef={lastRef} />
      </div>
    </>
  )
}

export default PostListPage

