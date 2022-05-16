import * as api from '../api';

import { TAGS as CONST } from '../Constants'

export const getTags = () => async (dispatch) => {
  try {
    const { data: tags } = await api.fetchTags(); //returns all the tags
    dispatch({ type: CONST.fetchAll, payload: tags });
  } catch (error) {
    console.log(error);
  }
}

export const createTags = (tags) => async (dispatch) => {
  try {
    //We are sending all the tags of the new post in an array
    const { data } = await api.createTags(tags); //returns the new tags added to the db
    // const newTags = data.map(tagObj => tagObj["name"]);
    //Then we need to update our state with the new elements
    dispatch({ type: CONST.create, payload: data });
  } catch (error) {
    console.log(error);
  }
}