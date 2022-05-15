import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

// REAL URL to herouku back-end
// const url = 'https://memories-default.herokuapp.com/post'; 

//The following is something that will happen before each request
API.interceptors.request.use((req) => {
  //We need to send our token to all the request for verification
  if(localStorage.getItem('profile')){
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  } 
  return req; //we have to re send it to the other requests
});

export const fetchPost = () => API.get('/post');

//This call will create a post, so it has to receive it, then call the backend with it.
export const createPost = (newPost) => API.post('/post', newPost);

export const updatePost = (id, updatedPost) => API.patch(`/post/${id}`, updatedPost)

export const deletePost = (id) => API.delete(`/post/${id}`);

export const likePost = (id) => API.patch(`/post/${id}/likePost`);


//auth
//We are sending the formData as req.body because of the post method from axios!
export const signIn = (formData) => API.post('/user/signin', formData); 
export const signUp = (formData) => API.post('/user/signup', formData);