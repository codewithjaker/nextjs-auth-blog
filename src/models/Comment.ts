import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true, index: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },

  // Threaded replies
  parentComment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: null, index: true },
  depth: { type: Number, default: 0 },

  // Reactions
  likesCount: { type: Number, default: 0 },
  dislikesCount: { type: Number, default: 0 },

  // Moderation
  status: { type: String, enum: ["pending", "approved", "spam", "deleted"], default: "pending", index: true },

  // Editing support
  isEdited: { type: Boolean, default: false },
  editedAt: Date

}, { timestamps: true });

// Index for fast loading of comments per post
CommentSchema.index({ post: 1, createdAt: -1 });

export default mongoose.models.Comment || mongoose.model("Comment", CommentSchema);