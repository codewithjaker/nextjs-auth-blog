import crypto from "crypto";
import { addDays } from "date-fns";

export function generateRefreshToken() {
  return crypto.randomBytes(40).toString("hex");
}

export function hashRefreshToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function getRefreshTokenExpiry() {
  return addDays(new Date(), 7); // 7 days from now
}
