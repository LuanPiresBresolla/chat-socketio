import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema({
  username: String,
  message: String,
});

export default mongoose.model('Chat', ChatSchema);