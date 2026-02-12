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
      }

    default:
      return state;
  }
};
