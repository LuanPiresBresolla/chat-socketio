import mongoose, { Document, Schema } from 'mongoose';

type IUser = Document & {
  email: string;
  socket_id: string;
  name: string;
  avatar: string;
}

const UserSchema = new Schema({
  email: String,
  socket_id: String,
  name: String,
  avatar: String,
});

export const User = mongoose.model<IUser>('Users', UserSchema);