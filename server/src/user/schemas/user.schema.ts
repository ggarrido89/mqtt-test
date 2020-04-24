import { Schema } from 'mongoose';

export const UserSchema = new Schema(
  {
    name: String,
    email: String,
    username: String,
    password: String,
    active: Boolean,
    lastConnection: {
      type: Date,
      default: null,
    },
  },
  { versionKey: false },
);
