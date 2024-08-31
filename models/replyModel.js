import mongoose from 'mongoose';

const { Schema } = mongoose;

const replySchema = new Schema({
    content: { type: String, required: true },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // Reference to the User model
        required: true,
      },
    createdAt: { type: Date, default: Date.now }
});

const Reply = mongoose.model('Reply', replySchema);

export default Reply;
