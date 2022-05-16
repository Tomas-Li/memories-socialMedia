import { POST as CONST } from '../Constants'

//Here the state will be the posts keeped inside the DB, but I'm not renaming the state var to posts as done in the video for keeping the nomencalture
const reducer = (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case CONST.fetchAll:
      return {
        ...state,
        posts: action.payload.posts,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages
      };

    case CONST.fetchBySearch:
      return { 
        ...state,
        posts: action.payload
       };

    case CONST.create:
      return { ...state, posts: [...state.posts, action.payload]};

    case CONST.update:
      return { ...state, posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post)};

    case CONST.delete:
      return { ...state, posts: state.posts.filter(post => post._id !== action.payload)};

    case CONST.like:
      return { ...state, posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post)};

    case CONST.startLoading:
       return { ...state, isLoading: true };

    case CONST.endLoading:
      return { ...state, isLoading: false };

    default:
      return state;
  }
}

export default reducer;