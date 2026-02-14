import { posts } from "../data/posts";

export const initialState = {
  data: {
    posts: posts,
  },
  filter: {
    tag: '',
    sort: '최신순',
    query: '',
  },
  pagination: {
    page: 1,
    pageSize: 5,
  },
};