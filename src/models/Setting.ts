import mongoose from "mongoose";

const SettingSchema = new mongoose.Schema({
  siteName: String,
  logo: String,
  favicon: String,
  contactEmail: String,
  phone: String,
  address: String,
  metaTitle: String,
  metaDescription: String,
  googleAnalytics: String,
}, { timestamps: true });

// Ensure only one document exists
SettingSchema.pre("save", async function(next) {
  const count = await mongoose.models.Setting.countDocuments();
  if (count > 0 && this.isNew) {
    throw new Error("Only one settings document can exist");
  }
  // @ts-ignore
  next();
});

export default mongoose.models.Setting || mongoose.model("Setting", SettingSchema);