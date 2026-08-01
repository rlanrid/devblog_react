import { useEffect, useState } from "react";
import { createPost, getPosts, updatePost, deletePost } from "../api/postApi";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getComments } from "../api/commentApi";

export const usePosts = ({ tag, sort, query, page, pageSize = 12 }) => {
  const {
    data,
    isPending,
    isFetchingNextPage,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts", { tag, sort, query }],
    queryFn: async ({ pageParam, signal }) => {
      const { data } = await getPosts({
        page: pageParam,
        limit: pageSize,
        tag,
        sort,
        query,
        signal
      });

      return data;
    },

    initialPageParam: 1,

    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? allPages.length + 1 : undefined;
    },
  });

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  return {
    posts,
    loading: isPending || isFetchingNextPage,
    error,
    hasMore: hasNextPage,
    fetchNextPage,
  }
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, form }) => updatePost(id, form),
    onSuccess: (_, post) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", post.id] });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

// Legacy code //

// post 패치
// const [posts, setPosts] = useState([]);
// const [loading, setLoading] = useState(false);
// const [error, setError] = useState(null);
// const [hasMore, setHasMore] = useState(true);

// 파라미터 변경 시 초기화
// useEffect(() => {
//   setPosts([]);
//   setHasMore(true);
// }, [tag, sort, query]);

// 데이터 패치
// const fetchPosts = async () => {
//   if (loading || !hasMore) return;

//   setLoading(true);

//   try {
//     const { data } = await getPosts({
//       page,
//       limit: pageSize,
//       tag,
//       sort,
//       query,
//     });

//     if (data) {
//       console.log(data)
//     }

//     const newPosts = data?.posts || [];

//     setPosts((prev) => page === 1 ? newPosts : [...prev, ...newPosts]);

//     setHasMore(data?.hasMore);
//   } catch (error) {
//     setError(error);
//   } finally {
//     setLoading(false);
//   }
// };

// useEffect(() => {
//   fetchPosts();
// }, [page, tag, sort, query]);

// return { posts, hasMore, loading, error, fetchPosts };