import mongoose, { Document, Model, Types } from "mongoose";

interface UserInterface extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
  bookmarks: Types.ObjectId[];
}

const userModel = new mongoose.Schema<UserInterface>(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    bookmarks: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tweet" }],
      default: [],
    },
    followers: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
    following: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
  },
  { timestamps: true }
);

export const UserModel: Model<UserInterface> = mongoose.model(
  "User",
  userModel
);
