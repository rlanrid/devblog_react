import { sortMap } from "./constants";

export const getDataProcessing = (data) => {
  let result = [...data.posts];

  // 태그 필터링
  if (data.filter.tag !== "") {
    const targetTag = data.filter.tag.toLowerCase();

    result = result.filter(post => post.tags.some(t => t.toLowerCase() === targetTag));
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

export const formatTimeAgo = (date) => {
  const start = new Date(date);
  const end = new Date();
  const diff = (end - start) / 1000;

  const times = [
    { name: '년', seconds: 60 * 60 * 24 * 365 },
    { name: '개월', seconds: 60 * 60 * 24 * 30 },
    { name: '주', seconds: 60 * 60 * 24 * 7 },
    { name: '일', seconds: 60 * 60 * 24 },
    { name: '시간', seconds: 60 * 60 },
    { name: '분', seconds: 60 },
  ];

  for (const value of times) {
    const betweenTime = Math.floor(diff / value.seconds);

    if (betweenTime > 0) {
      return `${betweenTime}${value.name} 전`;
    }
  }

  return '방금 전';
};