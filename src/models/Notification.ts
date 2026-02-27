import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  type: {
    type: String,
    enum: ["follow", "like", "comment", "reply"],
    required: true
  },
  targetType: {
    type: String,
    enum: ["post", "comment", "user"]
  },
  targetId: mongoose.Schema.Types.ObjectId,
  message: String,
  isRead: {
    type: Boolean,
    default: false,
    index: true
  }
}, { timestamps: true });

NotificationSchema.index({ recipient: 1, createdAt: -1 });

export default mongoose.models.Notification || mongoose.model("Notification", NotificationSchema);