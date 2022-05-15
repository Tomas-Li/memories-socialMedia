import { TAGS as CONST } from '../Constants'

//Here the state will be the posts keeped inside the DB, but I'm not renaming the state var to posts as done in the video for keeping the nomencalture
const reducer = (state = [], action) => {
  switch (action.type) {
    case CONST.fetchAll:
      return action.payload;
    case CONST.create:
      //the old state + the new post
      return [...state, action.payload];
    case CONST.delete:
      return state.filter(post => post._id !== action.payload)
    default:
      return state;
  }
}

export default reducer;