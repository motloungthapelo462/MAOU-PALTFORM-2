interface OtpEntry {
  code: string;
  expiresAt: number;
  attempts: number;
}

const otpCache = new Map<string, OtpEntry>();

function generateOtpCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

import { sendEmail } from "./mailer";

export async function requestOtp(email: string) {
  const code = generateOtpCode();
  const expiresAt = Date.now() + 5 * 60 * 1000;

  otpCache.set(email, {
    code,
    expiresAt,
    attempts: 0,
  });

  // Send email in production (or when mailer configured)
  try {
    if (process.env.NODE_ENV === "production" || process.env.SENDGRID_API_KEY || process.env.SMTP_HOST) {
      await sendEmail(
        email,
        "Your MAOU admin OTP",
        `Your MAOU admin OTP code is ${code}. It expires in 5 minutes.`,
        `<p>Your MAOU admin OTP code is <strong>${code}</strong>. It expires in 5 minutes.</p>`
      );
      return { code: undefined, message: `OTP sent to ${email}` };
    }
  } catch (err) {
    console.error("Error sending OTP email:", err);
  }

  // In non-production/dev, return the code for convenience
  return { code, message: `OTP generated for ${email}` };
}

export function verifyOtp(email: string, code: string) {
  const entry = otpCache.get(email);
  if (!entry) return false;
  if (Date.now() > entry.expiresAt) {
    otpCache.delete(email);
    return false;
  }
  if (entry.attempts >= 5) {
    otpCache.delete(email);
    return false;
  }

  if (entry.code === code) {
    otpCache.delete(email);
    return true;
  }

  entry.attempts += 1;
  otpCache.set(email, entry);
  return false;
}
