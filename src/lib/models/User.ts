import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  name: string;
  isEmailVerified: boolean;
  otp?: {
    code: string;
    expiresAt: Date;
    purpose: "email-verification" | "password-reset";
  };
  refreshTokens: Array<{
    token: string; // hashed
    device?: string;
    createdAt: Date;
    expiresAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    name: { type: String, required: true },
    isEmailVerified: { type: Boolean, default: false },
    otp: {
      code: String,
      expiresAt: Date,
      purpose: { type: String, enum: ["email-verification", "password-reset"] },
    },
    refreshTokens: [
      {
        token: String,
        device: String,
        createdAt: { type: Date, default: Date.now },
        expiresAt: Date,
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
