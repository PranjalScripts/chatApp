import express from "express";
import { addReply } from "../controller/replyComment.js";
import { requireSignIn } from '../middleware/authmiddleware.js';

const router = express.Router();

// Route to add a reply to an existing comment
router.post('/comments/:commentId/reply', requireSignIn, addReply);

export default router;
