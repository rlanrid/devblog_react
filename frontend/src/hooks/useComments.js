import { useState } from "react";
import { getComments } from "../api/commentApi";
import { useEffect } from "react";

export const useComments = () => {
  // comment 패치
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const { data } = await getComments();
      setComments(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return { comments, loading, fetchComments };
};