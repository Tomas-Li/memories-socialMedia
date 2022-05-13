import { AUTH as CONST } from '../Constants'

//Here the state will be the posts keeped inside the DB, but I'm not renaming the state var to posts as done in the video for keeping the nomencalture
const reducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case CONST.auth:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data })) //this is result and token
      return { ...state, authData: action?.data };
    case CONST.logout:
      localStorage.removeItem('profile');
      return { ...state, authData: null };
    default:
      return state;
  }
}

export default reducer;