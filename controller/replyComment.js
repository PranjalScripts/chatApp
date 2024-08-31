import Comment from '../models/commentModel.js';

// Add a reply to a comment
export const addReply = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { content } = req.body;

        
        if (!content || content.trim() === '') {
            return res.status(400).json({ error: 'Reply content cannot be empty' });
        }
 
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

 
        const reply = {
            content: content.trim(),
            author: req.user._id,
            createdAt: new Date()  
        };

         
        comment.replies.push(reply);
        await comment.save();

        res.status(200).json({ message: 'Reply added successfully', comment });
    } catch (err) {
        console.error(err);  
        res.status(500).json({ error: 'Failed to add reply' });
    }
};
