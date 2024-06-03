import mongoose, { Document, Model, Types } from "mongoose";

interface ConversationInterface {
  _id: Types.ObjectId;
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  messages: Types.ObjectId[];
}

const conversationModel = new mongoose.Schema<ConversationInterface>(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  { timestamps: true }
);

export const ConversationModel: Model<ConversationInterface> = mongoose.model(
  "Conversation",
  conversationModel
);
