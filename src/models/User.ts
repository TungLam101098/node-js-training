import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const User = new Schema(
  {
    userName: String,
    password: String,
  },
  { timestamps: true }
);

export default mongoose.model('User', User);
