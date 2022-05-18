import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js'


export const getPost = async (req, res) => {
  const { id } = req.params;

  try{
    const post = await PostMessage.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }

}

export const getPosts = async (req, res) => {
  const { page } = req.query;

  try {
    //Const for the number of post per page
    const LIMIT = 6;
    const startIndex = (Number(page) - 1) * LIMIT; //Remember that is base 0, that's why there is a -1
    const total = await PostMessage.countDocuments({}); //We need this to know how many pages we have in our pagination

    //We recover all the post, sort them to start by the newest post, and then we limit the number and start looking from our startIndex
    const posts = await PostMessage.find().sort({ _id: -1}).limit(LIMIT).skip(startIndex);

    res.status(200).json({ posts: posts, numberOfPages: Math.ceil(total / LIMIT) });
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