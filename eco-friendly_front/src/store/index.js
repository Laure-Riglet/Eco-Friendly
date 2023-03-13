/* eslint-disable brace-style */
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';

import reducer from 'src/reducers';

import userMiddleware from '../middlewares/userMiddleware';
import advicesMiddleware from '../middlewares/advicesMiddleware';
import articlesMiddleware from '../middlewares/articlesMiddleware';
import commonMiddleware from '../middlewares/commonMiddleware';

import { loadState, saveState } from './sessionStorage';

const enhancers = composeWithDevTools(
  applyMiddleware(
    userMiddleware,
    advicesMiddleware,
    articlesMiddleware,
    commonMiddleware,
  ),
);

function throttle(fn, delay) {
  let wait = false;
  let storedArgs = null;

  function checkStoredArgs() {
    if (storedArgs == null) {
      wait = false;
    } else {
      fn(...storedArgs);
      storedArgs = null;
      setTimeout(checkStoredArgs, delay);
    }
  }

  return (...args) => {
    if (wait) {
      storedArgs = args;
      return;
    }

    fn(...args);
    wait = true;
    setTimeout(checkStoredArgs, delay);
  };
}

const configureStore = () => {
  const persistedState = loadState();
  const store = createStore(reducer, persistedState, enhancers);

  store.subscribe(
    throttle(() => {
      saveState('user', store.getState().user);
    }, 1000),
  );

  return store;
};

export default configureStore;

// const store = createStore(reducer, enhancers);

// export default store;
