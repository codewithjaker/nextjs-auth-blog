import mongoose from "mongoose";

const FollowSchema = new mongoose.Schema({
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },
  following: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  }
}, { timestamps: true });

// Prevent duplicate follow
FollowSchema.index(
  { follower: 1, following: 1 },
  { unique: true }
);

export default mongoose.models.Follow || mongoose.model("Follow", FollowSchema);