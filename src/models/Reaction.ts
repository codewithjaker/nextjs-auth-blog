import mongoose from "mongoose";

const ReactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },
  targetType: {
    type: String,
    enum: ["post", "comment"],
    required: true
  },
  targetId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true
  },
  type: {
    type: String,
    enum: ["like", "dislike"],
    required: true
  }
}, { timestamps: true });

// One user can react once per target
ReactionSchema.index(
  { user: 1, targetType: 1, targetId: 1 },
  { unique: true }
);

ReactionSchema.index({ targetType: 1, targetId: 1 });

export default mongoose.models.Reaction || mongoose.model("Reaction", ReactionSchema);