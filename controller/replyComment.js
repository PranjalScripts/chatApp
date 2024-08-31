import Comment from '../models/commentModel.js';
import Reply from '../models/replyModel.js';  

export const addReply = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { content } = req.body;

        // Validate the content
        if (!content || content.trim() === '') {
            return res.status(400).json({ error: 'Reply content cannot be empty' });
        }

        
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

      
        const reply = new Reply({
            content: content.trim(),
            author: req.user._id,  
            createdAt: new Date()
        });

        await reply.save();

       
        comment.replies.push(reply._id); 
        await comment.save();

     
        const populatedComment = await Comment.findById(commentId).populate({
            path: 'replies',
            populate: { path: 'author' }
        });

        res.status(200).json({ message: 'Reply added successfully', comment: populatedComment });
    } catch (err) {
        console.error(err); 
        res.status(500).json({ error: 'Failed to add reply' });
    }
};
