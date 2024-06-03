import mongoose, { Document, Model, Types } from "mongoose";

interface MessageInterface {
  text: String;
  imageURL: String;
  videoURL: String;
  seen: Boolean;
}

const messageModel = new mongoose.Schema<MessageInterface>(
  {
    text: {
      type: String,
      default: "",
    },
    imageURL: {
      type: String,
      default: "",
    },
    videoURL: {
      type: String,
      default: "",
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const MessageModel: Model<MessageInterface> = mongoose.model(
  "Message",
  messageModel
);
