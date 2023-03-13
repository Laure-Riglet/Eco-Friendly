import {
  FETCH_ARTICLES_FROM_API,
  FETCH_LAST_ARTICLE_FROM_API,
} from '../actions/articles';

export const initialState = {
  data: [],
  lastArticleData: [{}],
  lastArticleDataIsLoaded: false,
  isLoaded: false,
  lastFourArticles: [],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_ARTICLES_FROM_API:
      return {
        ...state,
        data: action.data,
        isLoaded: true,
      };
    case FETCH_LAST_ARTICLE_FROM_API:
      return {
        ...state,
        lastArticleData: action.data,
        lastArticleDataIsLoaded: true,
      };
    default:
      return state;
  }
};

export default reducer;
