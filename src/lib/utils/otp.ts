import nodemailer from "nodemailer";

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // true for 465, false for other ports (587)
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, // optional, helps with self-signed certs
  },
});

export async function sendOTPEmail(
  email: string,
  otp: string,
  purpose: string,
): Promise<void> {
  const purposeDisplay =
    purpose === "email-verification" ? "Email Verification" : "Password Reset";

  const mailOptions = {
    from: `"Your App Name" <${process.env.SMTP_FROM_EMAIL}>`,
    to: email,
    subject: `Your OTP for ${purposeDisplay}`,
    text: `Your OTP is: ${otp}. It expires in 10 minutes.`,
    html: `<p>Your OTP is: <strong>${otp}</strong></p><p>It expires in 10 minutes.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP email sent to ${email} for ${purpose}`);
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP email");
  }
}

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
