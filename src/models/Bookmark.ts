import mongoose from "mongoose";

const BookmarkSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
    index: true
  }
}, { timestamps: true });

// Prevent duplicate bookmarks
BookmarkSchema.index(
  { user: 1, post: 1 },
  { unique: true }
);

export default mongoose.models.Bookmark || mongoose.model("Bookmark", BookmarkSchema);