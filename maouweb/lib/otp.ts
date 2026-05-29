interface OtpEntry {
  code: string;
  expiresAt: number;
  attempts: number;
}

const otpCache = new Map<string, OtpEntry>();

function generateOtpCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function requestOtp(email: string) {
  const code = generateOtpCode();
  const expiresAt = Date.now() + 5 * 60 * 1000;

  otpCache.set(email, {
    code,
    expiresAt,
    attempts: 0,
  });

  return {
    code: process.env.NODE_ENV === "production" ? undefined : code,
    message: `OTP sent to ${email}`,
  };
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
