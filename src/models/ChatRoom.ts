import mongoose from "mongoose";

const ChatRoomSchema = new mongoose.Schema({
  participants: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true }
  ],
  isGroup: { type: Boolean, default: false },
  name: { type: String }, // optional for group chats
  lastMessage: { type: String },
  lastMessageAt: { type: Date },
}, { timestamps: true });

// Unique index to prevent duplicate one-to-one chats
ChatRoomSchema.index(
  { participants: 1 },
  { unique: true, partialFilterExpression: { isGroup: false } }
);

export default mongoose.models.ChatRoom || mongoose.model("ChatRoom", ChatRoomSchema);