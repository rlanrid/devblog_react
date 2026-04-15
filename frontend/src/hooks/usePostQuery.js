import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const usePostQuery = () => {
  // router
  const [searchParams, setSearchParams] = useSearchParams();

  const tag = searchParams.get("tag") || "";
  const sort = searchParams.get("sort") || "최신순";
  const query = searchParams.get("query") || "";

  const updateQuery = (key, value) => {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);

      if (!value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }

      return params;
    });
  };

  // 스크롤 초기화
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [tag, sort, query]);

  return { tag, sort, query, updateQuery };
};