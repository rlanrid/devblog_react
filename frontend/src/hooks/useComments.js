import { useState } from "react";
import { createComment, deleteComment, getComments } from "../api/commentApi";
import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useComments = (postId) => {
  const {
    data,
    isPending,
    error,
  } = useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const { data } = await getComments(postId);
      return data;
    },
    enabled: !!postId,
  });

  return {
    comments: data || [],
    loading: isPending,
    error,
  }
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, data }) => createComment(postId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["comments", variables.postId] });
    }
  })
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, commentId }) => deleteComment(postId, commentId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["comments", variables.postId] })
    }
  })
}