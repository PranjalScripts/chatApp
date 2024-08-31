import Comment from '../models/commentModel.js';

 
export const getComments = async (req, res) => {
  const { postId } = req.params;  

  try {
     
    const comments = await Comment.find({ post: postId })
      .populate('author') 
      .populate({
        path: 'replies', 
        populate: { path: 'author' },  
      })
      .sort({ createdAt: -1 });  

    // Send the comments as a response
    res.status(200).json({ success: true, comments });
  } catch (err) {
    console.error('Error Fetching Comments:', err);
    res.status(400).json({ success: false, message: 'Failed to fetch comments' });
  }
};

// Add a new comment
export const addComment = async (req, res) => {
  const { post, content } = req.body;
    

  try {
    const comment = new Comment({
      post,
      author: req.user._id,
      content,
    });
    await comment.save();
    console.log('Comment Saved:', comment);   
    res.status(201).json({ success: true, comment });
  } catch (err) {
    console.error('Error Saving Comment:', err);  
    res.status(400).json({ success: false, message: 'Failed to add comment' });
  }
};


