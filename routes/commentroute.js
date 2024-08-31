    import express from 'express';
    import { addComment, getComments } from '../controller/commentController.js';
    import { requireSignIn } from '../middleware/authmiddleware.js';

    const router = express.Router();

    // Route to add a new comment to a post
    router.post('/add', requireSignIn, addComment);

    //Route to get comments for a post
    router.get('/:postId', getComments);

    export default router;
