import mongoose from 'mongoose';

const { Schema } = mongoose;

const commentSchema = new Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'posts',
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', // Reference to the User model
    required: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  replies: [{
    content: String,
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comments'
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
  }],
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});


commentSchema.index({ post: 1 });
commentSchema.index({ author: 1 });

const Comment = mongoose.model('comments', commentSchema);

export default Comment;
