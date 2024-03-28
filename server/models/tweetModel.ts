import mongoose, { Document, Model, Types } from "mongoose";

interface TweetInterface extends Document {
  userId: Types.ObjectId[];
  like: Types.ObjectId[];
  description: string;
}

const tweetModel = new mongoose.Schema<TweetInterface>(
  {
    userId: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      ref: "User",
      required: true
    },
    description: {
      type: String,
      required: true,
    },
    like: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      default: [],
    }
  },
  { timestamps: true }
);

export const TweetModel: Model<TweetInterface> = mongoose.model(
  "Tweet",
  tweetModel
);
