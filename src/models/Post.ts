import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true, index: 'text' },
  slug: { type: String, required: true, unique: true, index: true },
  content: { type: String, required: true, index: 'text' },
  excerpt: { type: String, index: 'text' },
  featuredImage: String,

  // Relations
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  categoryName: String, // denormalized for fast read
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  authorName: String, // denormalized

  // Status and publishing
  status: { type: String, enum: ["draft", "published", "deleted"], default: "draft", index: true },
  publishedAt: Date,

  // Reactions
  likesCount: { type: Number, default: 0 },
  dislikesCount: { type: Number, default: 0 },

  // Other features
  views: { type: Number, default: 0 },
  tags: [{ type: String }],
  metaTitle: String,
  metaDescription: String,
  allowComments: { type: Boolean, default: true }

}, { timestamps: true });

// Indexes for performance
PostSchema.index({ status: 1, publishedAt: -1 });

export default mongoose.models.Post || mongoose.model("Post", PostSchema);