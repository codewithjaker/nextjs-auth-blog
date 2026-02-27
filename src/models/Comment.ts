import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  comment: { type: String, required: true },
  status: { type: String, enum: ["pending", "approved", "spam"], default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Comment || mongoose.model("Comment", CommentSchema);