import Post from '../models/postModel.js';
import User from '../models/userModel.js';
import Comment from '../models/commentModel.js';
import mongoose from 'mongoose';

// Create a new post
export const createPost = async (req, res) => {
    try {
      const { title, content } = req.body;
      const { _id: author } = req.user;  
  
      if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' });
      }
  
      const newPost = new Post({ title, content, author });
      await newPost.save();
  
      res.status(201).json({ success: true, message: 'Post created successfully', post: newPost });
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
 
export const getAllPosts = async (req, res) => {
  try {
    const { userId } = req; 
    const posts = await Post.find(userId ? { author: { $ne: userId } } : {})
      .populate('author', 'name email')
      .populate('comments');
    
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a single post by ID
export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid post ID' });
    }

    const post = await Post.findById(id).populate('author', 'name email').populate('comments');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

 