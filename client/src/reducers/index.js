import { combineReducers } from "redux";

import posts from './posts';
import tags from './tags'
import auth from './auth';

export default combineReducers({
  posts,
  tags,
  auth
});