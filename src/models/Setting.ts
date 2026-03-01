import mongoose from "mongoose";

/* ===============================
   Business Hour Sub Schema
================================ */
const BusinessHourSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      enum: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      required: true,
    },
    open: {
      type: String, // "09:00"
      trim: true,
    },
    close: {
      type: String, // "18:00"
      trim: true,
    },
    isClosed: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }, // Prevents extra _id for each day
);

/* ===============================
   Main Setting Schema
================================ */
const SettingSchema = new mongoose.Schema(
  {
    /* ---------- Site Info ---------- */
    siteName: {
      type: String,
      trim: true,
      required: true,
    },
    logo: {
      type: String,
      trim: true,
    },
    favicon: {
      type: String,
      trim: true,
    },

    /* ---------- Contact ---------- */
    contactEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },

    /* ---------- SEO ---------- */
    metaTitle: {
      type: String,
      trim: true,
    },
    metaDescription: {
      type: String,
      trim: true,
    },

    /* ---------- Integrations ---------- */
    googleAnalytics: {
      type: String,
      trim: true,
    },
    googleMapEmbed: {
      type: String,
      trim: true,
    },

    /* ---------- Currency ---------- */
    currency: {
      code: {
        type: String,
        default: "USD",
        uppercase: true,
        trim: true,
      },
      symbol: {
        type: String,
        default: "$",
        trim: true,
      },
      position: {
        type: String,
        enum: ["before", "after"],
        default: "before",
      },
    },

    /* ---------- Business Hours ---------- */
    businessHours: {
      type: [BusinessHourSchema],
      default: [],
    },

    timezone: {
      type: String,
      default: "UTC",
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

// Ensure only one document exists
// SettingSchema.pre("save", async function(next) {
//   const count = await mongoose.models.Setting.countDocuments();
//   if (count > 0 && this.isNew) {
//     throw new Error("Only one settings document can exist");
//   }
//
//   next();
// });

/* ===============================
   Export Model (Prevents Overwrite Error)
================================ */
export default mongoose.models.Setting ||
  mongoose.model("Setting", SettingSchema);
