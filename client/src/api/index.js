import axios from 'axios';

//we need a url pointing to our backend!
const url = 'http://localhost:5000/post'; 

export const fetchPost = () => axios.get(url);

//This call will create a post, so it has to receive it, then call the backend with it.
export const createPost = (newPost) => axios.post(url, newPost);

export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost)

export const deletePost = (id) => axios.delete(`${url}/${id}`);

export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);