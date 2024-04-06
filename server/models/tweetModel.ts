import mongoose, { Document, Model, Types } from "mongoose";

export interface UserDetails {
  _id: Types.ObjectId;
  name: string;
  username: string;
  email: string;
  avatar: string;
}

interface TweetInterface extends Document {
  userId: Types.ObjectId[];
  userDetails: UserDetails[];
  like: Types.ObjectId[];
  description: string;
  postImage: string;
  createdAt: string;
}

const tweetModel = new mongoose.Schema<TweetInterface>(
  {
    userId: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    postImage: {
      type: String,
    },
    like: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
    userDetails: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        username: {
          type: String,
          required: true,
        },
        email: {
          type: String,
        },
        avatar: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

export const TweetModel: Model<TweetInterface> = mongoose.model(
  "Tweet",
  tweetModel
);
