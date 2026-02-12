import { sortMap } from "./constants";

export const getDataProcessing = (data) => {
  let result = [...data.posts];

  // 태그 필터링
  if (data.filter.tag !== "") {
    const targetTag = data.filter.tag.toLowerCase();

    result = result.filter(post => post.tag.some(t => t.toLowerCase() === targetTag));
  }

  // 검색
  if (data.filter.query !== "") {
    const keyword = data.filter.query.toLowerCase();

    result = result.filter(post =>
      post.title.toLowerCase().includes(keyword) ||
      post.summary.toLowerCase().includes(keyword)
    );
  }

  // 정렬
  if (sortMap[data.filter.sort]) {
    result.sort(sortMap[data.filter.sort]);
  }

  return result;
};

export const paginate = (processedPosts, pagination) => {
  const startIndex = (pagination.page - 1) * pagination.pageSize;

  return processedPosts.slice(startIndex, startIndex + pagination.pageSize);
};