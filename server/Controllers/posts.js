import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js'


export const getPosts = async (req, res) => {
  try {
    const postMesages = await PostMessage.find();

    res.status(200).json(postMesages);
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });

  try {
    await newPost.save();
    
    res.status(201).json(newPost); //we send back our new post to the front end after saving it. Axios receive it
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });

  res.json(updatedPost); //This is what we are sending back to our axios patch method
}

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');
  
  const deletedPost = await PostMessage.findByIdAndDelete(_id);

  res.json({ message: 'Post deleted successfully' })
}

export const likePost = async (req, res) => {
  const { id: _id} = req.params;

  //req.userId wa created by the middleware before calling this function!
  if(!req.userId) return res.json({ message: 'Unauthenticated' })

  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

  const post = await PostMessage.findById(_id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if(index === -1) {
    //like
    post.likes.push(req.userId);
  } else {
    //dislike
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true })

  res.json(updatedPost);
}

export const getPostsBySearch = async (req, res) => {
  const { searchTerm, searchTags } = req.query

  try {
    const title = new RegExp(searchTerm, 'i');
    const tags = searchTags.split(',').map((tag) => new RegExp(tag, 'i'));

    const posts = await PostMessage.find({ $and: [ { title }, { tags: { $in: tags }} ] });

    res.status(200).json( posts );
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}