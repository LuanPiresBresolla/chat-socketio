import mongoose, { Document, Schema } from 'mongoose';

type IMessage = Document & {
  to: string;
  text: string;
  roomId: string;  
  created_at: Date;
}

const MessageSchema = new Schema({
  to: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
  text: String,
  roomId: {
    type: String,
    ref: 'ChatRoom',
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const Message = mongoose.model<IMessage>('Messages', MessageSchema);

export { Message };