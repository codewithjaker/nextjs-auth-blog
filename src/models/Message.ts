import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  chatRoom: { type: mongoose.Schema.Types.ObjectId, ref: "ChatRoom", required: true, index: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  type: { type: String, enum: ["text", "image", "file"], default: "text" },

  // Tracking who has read the message
  isReadBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  // Soft delete per user
  deletedFor: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

// Index for fast retrieval of recent messages in a room
MessageSchema.index({ chatRoom: 1, createdAt: -1 });

export default mongoose.models.Message || mongoose.model("Message", MessageSchema);