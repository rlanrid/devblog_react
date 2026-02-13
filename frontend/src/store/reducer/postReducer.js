export const postReducer = (state, action) => {
  switch (action.type) {
    case "SET_TAG":
      return {
        ...state,
        filter: {
          ...state.filter,
          tag: action.payload,
        },
      };

    case "SET_KEYWORD":
      return {
        ...state,
        filter: {
          ...state.filter,
          query: action.payload,
        }
      };

    case "SET_SORT":
      return {
        ...state,
        filter: {
          ...state.filter,
          sort: action.payload,
        }
      };

    case "SET_PAGE":
      return {
        ...state,
        pagination: {
          ...state.pagination,
          page: action.payload,
        }
      };

    case "SYNC_FROM_URL":
      return {
        ...state,
        filter: {
          ...state.filter,
          tag: action.payload.tag,
          sort: action.payload.sort,
          query: action.payload.query,
        },
        pagination: {
          ...state.pagination,
          page: action.payload.page,
        },
      };

    default:
      return state;
  }
};
