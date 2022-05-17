import * as api from '../api';

import { POST as CONST } from '../Constants'


// Actions Creators

//The following is the simplest sintax of how to define a async function using react-thunk (dispatch comes from there)
  //we use an in between arrow function
  //instead of returning the action, we dispatch the action.
export const getPost = (id) => async (dispatch) => {
  try {

    dispatch({ type: CONST.startLoading })

    //data is the post with the corresponding id
    const { data } = await api.fetchPost(id);
    dispatch({ type: CONST.fetchPost, payload: data });

    dispatch({ type: CONST.endLoading })
  } catch (error) {
    console.log(error);
  }
}

export const getPosts = (page) => async (dispatch) => {
  try {

    dispatch({ type: CONST.startLoading })

    //data returs: 
      //Limited number of posts
      //CurrentPage (This may be uselles as we already knew this)
      //NumberOfPages to render inside the navigation
    const { data } = await api.fetchPosts(page);
    dispatch({ type: CONST.fetchAll, payload: data });

    dispatch({ type: CONST.endLoading })
  } catch (error) {
    console.log(error);
  }
}

export const getPostBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: CONST.startLoading })

    //data will be an array of objects (objects -> posts)
    const { data } = await api.fetchPostBySearch(searchQuery);
    dispatch({ type: CONST.fetchBySearch, payload: data });

    dispatch({ type: CONST.endLoading })
  } catch (error) {
    console.log(error)
  }
}

//as we are creating a post this method has to receive it.
export const createPost = (post, navigate) => async (dispatch) => {
  try {

    dispatch({ type: CONST.startLoading })

    //This ask our backend to create the post inside our DB
    const { data } = await api.createPost(post); //returns the new post
    //We need to update our state with the new element
    dispatch({ type: CONST.create, payload: data });

    navigate(`/posts/${data._id}`);

    dispatch({ type: CONST.endLoading });
  } catch (error) {
    console.log(error);
  }
}

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post); //returns the updated post
    //We need to update our state (client side of the data)
    dispatch({ type: CONST.update, payload: data });
  } catch (error) {
    console.log(error);
  }
}

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id); 

    dispatch({ type: CONST.delete, payload: id});
  } catch (error) {
    console.log(error);
  }
}

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ type: CONST.like, payload: data });
  } catch (error) {
    console.log(error);
  }
}