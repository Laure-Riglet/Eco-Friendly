/* eslint-disable operator-linebreak */
/**
 * @name loadingArticlesData
 * @description Action creator for loading articles data
 * @returns {object}
 */
export const LOADING_ARTICLES_DATA = 'LOADING_ARTICLES_DATA';

export const loadingArticlesData = () => ({
  type: LOADING_ARTICLES_DATA,
});

/**
 * @name fetchArticlesFromApi
 * @description Action creator to get a list of the articles data
 * @param {array} data
 * @returns {object}
 */
export const FETCH_ARTICLES_FROM_API = 'FETCH_ARTICLES_FROM_API';

export const fetchArticlesFromApi = (data) => ({
  type: FETCH_ARTICLES_FROM_API,
  data,
});

/**
 * @name loadingLastArticleData
 * @description Action creator for loading last article data by category
 * @returns {object}
 */
export const LOADING_LAST_ARTICLE_DATA = 'LOADING_LAST_ARTICLE_DATA';

export const loadingLastArticleData = (id) => ({
  type: LOADING_LAST_ARTICLE_DATA,
  id,
});

/**
 * @name fetchLastArticleFromApi
 * @description Action creator to get the data of the last article by category
 * @param {object} data
 * @returns {object}
 */
export const FETCH_LAST_ARTICLE_FROM_API = 'FETCH_LAST_ARTICLE_FROM_API';

export const fetchLastArticleFromApi = (data) => ({
  type: FETCH_LAST_ARTICLE_FROM_API,
  data,
});
