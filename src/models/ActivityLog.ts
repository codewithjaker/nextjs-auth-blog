// lib/db/models/ActivityLog.ts
import mongoose from "mongoose";

const ActivityLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  action: { type: String, required: true }, // CREATE, UPDATE, DELETE, LOGIN
  module: { type: String, required: true }, // posts, users, settings, etc.
  targetId: { type: mongoose.Schema.Types.ObjectId },
  details: { type: mongoose.Schema.Types.Mixed },
  ipAddress: { type: String },
  userAgent: { type: String },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.models.ActivityLog || mongoose.model("ActivityLog", ActivityLogSchema);