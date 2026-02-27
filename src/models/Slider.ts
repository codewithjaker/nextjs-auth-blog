import mongoose from "mongoose";

const SliderSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  image: { type: String, required: true },
  buttonText: String,
  buttonUrl: String,
  order: { type: Number, default: 0 },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Slider || mongoose.model("Slider", SliderSchema);