// lib/db/models/Post.ts
import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  excerpt: { type: String },
  featuredImage: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  tags: [{ type: String }],
  status: { type: String, enum: ["draft", "published"], default: "draft" },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  publishedAt: { type: Date },
  views: { type: Number, default: 0 },
  metaTitle: { type: String },
  metaDescription: { type: String },
  allowComments: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
