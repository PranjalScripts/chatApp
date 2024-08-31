import express from 'express';
import { requireSignIn } from  '../middleware/authmiddleware.js';
import { createPost, getAllPosts, getPostById  } from '../controller/postController.js';

const router = express.Router();

router.post('/post', requireSignIn, createPost);
router.get('/getAllposts', requireSignIn, getAllPosts);
router.get('/posts/:id', requireSignIn, getPostById);

export default router;