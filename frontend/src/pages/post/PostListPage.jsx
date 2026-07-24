import { useCallback, useEffect, useRef } from 'react';

import { usePostQuery } from '../../hooks/usePostQuery';

import PostList from '../../components/post/PostList';
import PostSort from '../../components/post/PostSort';
import { usePosts } from '../../hooks/usePosts';

const PostListPage = () => {

  // URL 쿼리
  const { tag, sort, query, updateQuery } = usePostQuery();

  // 포스트 데이터
  const {
    posts,
    loading,
    error,
    hasMore,
    fetchNextPage,
  } = usePosts({ tag, sort, query });

  // 무한 스크롤
  const observer = useRef();
  const pagingLockRef = useRef(false);

  const lastRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (!entries[0]?.isIntersecting) return;
      if (!hasMore) return;
      if (pagingLockRef.current) return;

      pagingLockRef.current = true;
      fetchNextPage();
    }, { root: null, rootMargin: '200px 0px', threshold: 0 });

    if (node) observer.current.observe(node);
  }, [fetchNextPage, hasMore]);

  useEffect(() => {
    if (!loading) pagingLockRef.current = false;
  }, [loading]);

  if (error) {
    return <div>에러 발생: {error.message}</div>;
  }

  return (
    <>
      <div className="post__inner container">
        <PostSort postSort={sort} updateQuery={updateQuery} />
        <PostList postList={posts} loading={loading} lastRef={lastRef} />
      </div>
    </>
  )
}

export default PostListPage

