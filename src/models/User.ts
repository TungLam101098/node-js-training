import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const User = new Schema(
  {
    userName: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('User', User);
