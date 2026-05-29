import { NextResponse } from "next/server";
import { findAdmin } from "@/lib/auth";
import { requestOtp, verifyOtp } from "@/lib/otp";

export async function POST(req: Request) {
  const { email, password, otp } = await req.json();
  const admin = findAdmin(email, password);

  if (!admin) {
    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
  }

  if (admin.role === "real") {
    if (!otp) {
      const result = requestOtp(email);
      return NextResponse.json({
        success: true,
        otpRequired: true,
        message: `OTP sent to ${email}`,
        debugCode: result.code,
      });
    }

    const isValidOtp = verifyOtp(email, otp);
    if (!isValidOtp) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired OTP" },
        { status: 401 }
      );
    }
  }

  const response = NextResponse.json({
    success: true,
    role: admin.role,
    message: "Admin login successful",
  });

  response.cookies.set("admin_session", "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
  });
  response.cookies.set("admin_role", admin.role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  return response;
}
