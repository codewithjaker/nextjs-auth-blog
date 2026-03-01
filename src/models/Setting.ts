import mongoose from "mongoose";

/* ===============================
   Language Sub Schema
================================ */
const LanguageSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minlength: 2,
      maxlength: 10,
    }, // "en"

    name: {
      type: String,
      required: true,
      trim: true,
    }, // "English"

    locale: {
      type: String,
      required: true,
      trim: true,
    }, // "en-US"

    direction: {
      type: String,
      enum: ["ltr", "rtl"],
      default: "ltr",
    },

    isDefault: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false },
);

// Prevent duplicate language codes inside array
LanguageSchema.index({ code: 1 });

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
      type: String,
      trim: true,
      match: /^([01]\d|2[0-3]):([0-5]\d)$/, // HH:mm 24h format
    },

    close: {
      type: String,
      trim: true,
      match: /^([01]\d|2[0-3]):([0-5]\d)$/, // HH:mm 24h format
    },

    isClosed: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false },
);

/* ===============================
   Marketing Integration Schema
================================ */
const MarketingIntegrationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true }, // "Google Analytics"
    type: {
      type: String,
      enum: ["analytics", "ads", "other"],
      default: "other",
    },
    key: { type: String, required: true, trim: true }, // Tracking ID
    isActive: { type: Boolean, default: true },
  },
  { _id: false },
);

/* ===============================
   Main Setting Schema
================================ */
const SettingSchema = new mongoose.Schema(
  {
    /* ---------- Site Info ---------- */
    siteName: {
      type: String,
      required: true,
      trim: true,
    },

    logo: { type: String, trim: true },
    favicon: { type: String, trim: true },

    /* ---------- Contact ---------- */
    contactEmail: {
      type: String,
      trim: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },

    phone: { type: String, trim: true },
    address: { type: String, trim: true },

    /* ---------- SEO ---------- */
    metaTitle: { type: String, trim: true },
    metaDescription: { type: String, trim: true },

    /* ---------- Marketing / Tracking ---------- */
    marketingIntegrations: { type: [MarketingIntegrationSchema], default: [] },
    googleMapEmbed: { type: String, trim: true },

    /* ---------- Localization ---------- */
    localization: {
      languages: {
        type: [LanguageSchema],
        required: true,
        validate: [
          {
            validator: function (val: any[]) {
              return val.length > 0;
            },
            message: "At least one language is required",
          },
          {
            validator: function (val: any[]) {
              const defaultCount = val.filter((l) => l.isDefault).length;
              return defaultCount === 1;
            },
            message: "Exactly one language must be marked as default",
          },
          {
            validator: function (val: any[]) {
              const codes = val.map((l) => l.code);
              return codes.length === new Set(codes).size;
            },
            message: "Language codes must be unique",
          },
        ],
      },

      defaultLocale: {
        type: String,
        default: "en-US",
        trim: true,
      },

      dateFormat: {
        type: String,
        default: "YYYY-MM-DD",
        trim: true,
      },
    },

    /* ---------- Currency ---------- */
    currency: {
      code: {
        type: String,
        default: "USD",
        uppercase: true,
        trim: true,
        minlength: 3,
        maxlength: 3,
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

    /* ---------- System Timezone ---------- */
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

/* ===============================
   Ensure Only One Settings Document Exists
================================ */
// SettingSchema.pre("save", async function (next) {
//   if (this.isNew) {
//     const count = await mongoose.models.Setting.countDocuments();
//     if (count > 0) {
//       throw new Error("Only one settings document can exist");
//     }
//   }
//   next();
// });

/* ===============================
   Export Model
================================ */
export default mongoose.models.Setting ||
  mongoose.model("Setting", SettingSchema);
