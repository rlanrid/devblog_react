import { sortMap } from "./constants";

export const getDataProcessing = (state) => {
  let result = [...state.data.posts];

  // 태그 필터링
  if (state.filter.tag !== "") {
    const targetTag = state.filter.tag.toLowerCase();

    result = result.filter(post => post.tag.some(t => t.toLowerCase() === targetTag));
  }

  // 검색
  if (state.filter.query !== "") {
    const keyword = state.filter.query.toLowerCase();

    result = result.filter(post =>
      post.title.toLowerCase().includes(keyword) ||
      post.summary.toLowerCase().includes(keyword)
    );
  }

  // 정렬
  if (sortMap[state.filter.sort]) {
    result.sort(sortMap[state.filter.sort]);
  }

  return result;
};

export const paginate = (processedPosts, pagination) => {
  const startIndex = (pagination.page - 1) * pagination.pageSize;

  return processedPosts.slice(startIndex, startIndex + pagination.pageSize);
};