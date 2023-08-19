import mongoose from 'mongoose';
import { email, minLength, object, string } from 'valibot';

const Schema = mongoose.Schema;

const minLengthSchema = {
  username: 4,
  password: 4,
};

const User = new Schema(
  {
    username: { type: String, required: true, minLength: minLengthSchema.username },
    password: { type: String, required: true, minLength: minLengthSchema.password },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

const userLoginSchema = object({
  username: string([minLength(minLengthSchema.username)]),
  password: string([minLength(minLengthSchema.password)]),
});

const userSchema = object({
  username: string([minLength(minLengthSchema.username)]),
  password: string([minLength(minLengthSchema.password)]),
  email: string([email()]),
});

export default mongoose.model('User', User);

export { userSchema, userLoginSchema };
