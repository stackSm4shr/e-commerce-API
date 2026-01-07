import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'sasha is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'password is required'],
      select: false,
    },
    roles: {
      type: [String],
      default: ['user'],
    },
    tokenVersion: {
      type: Number,
      default: 0,
      select: false,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default model('User', userSchema);
