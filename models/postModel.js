import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the Post schema
const postSchema = new Schema({
    title: {
        type: String,
    },
     
  content: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',  
    required: true,
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'comments', 
  }],
}, {
  timestamps: true,
});

// Create the Post model
const Post = mongoose.model('posts', postSchema);

export default Post;
