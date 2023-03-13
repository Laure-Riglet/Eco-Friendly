import { combineReducers } from 'redux';

import userReducer from './user';
import advicesReducer from './advices';
import articlesReducer from './articles';
import commonReducer from './common';

const rootReducer = combineReducers({
  user: userReducer,
  advices: advicesReducer,
  articles: articlesReducer,
  common: commonReducer,
});

export default rootReducer;
