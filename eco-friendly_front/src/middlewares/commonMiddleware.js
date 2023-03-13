/* eslint-disable brace-style */
import axios from 'axios';
import {
  LOADING_CATEGORIES_DATA,
  fetchCategoriesFromApi,
  LOADING_HOME_PAGE_DATA,
  fetchHomePageDataFromApi,
} from '../actions/common';

import config from '../config';

import lastFourAdvices from '../data/lastFourArticles';
import lastFourArticles from '../data/lastFourAdvices';

const commonMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case LOADING_CATEGORIES_DATA:
      if (config.env === 'dev') {
        store.dispatch(fetchCategoriesFromApi(config.defaultNavLinks));
      } else {
        axios
          .get(`${config.apiBaseUrl}/categories`)
          .then((response) => {
            store.dispatch(fetchCategoriesFromApi(response.data));
          })
          .catch((error) => `Error: ${error.message}`);
      }
      break;
    case LOADING_HOME_PAGE_DATA:
      if (config.env === 'dev') {
        store.dispatch(
          fetchHomePageDataFromApi({
            lastFourAdvices,
            lastFourArticles,
          }),
        );
      } else {
        axios
          .get(`${config.apiBaseUrl}/home`)
          .then((response) => {
            store.dispatch(fetchHomePageDataFromApi(response.data));
          })
          .catch((error) => `Error: ${error.message}`);
      }
      break;
    default:
  }
  next(action);
};

export default commonMiddleware;
