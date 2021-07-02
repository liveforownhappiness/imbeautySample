import { combineReducers } from 'redux';

import reviewReducer from './modules/Review/reviewReducer';
import shopReducer from './modules/Shop/shopReducer'
import userReducer from './modules/User/userReducer'

const rootReducer = combineReducers({
  reviewReducer,
  shopReducer,
  userReducer
});

export default rootReducer;
