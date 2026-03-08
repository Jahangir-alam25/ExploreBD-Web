import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodbNative";
import { logAdminActivity } from "@/lib/logAdminActivity";

interface ResetPasswordBody {
  email: string;
  otp?: string;
  newPassword: string;
}

export async function PUT(req: Request) {
  try {
    const body: ResetPasswordBody = await req.json();
    const { email, otp, newPassword } = body;

    if (!email?.trim() || !newPassword?.trim()) {
      return NextResponse.json({ error: "Email and newPassword are required" }, { status: 400 });
    }

    const { db } = await connectDB();
    const usersCollection = db.collection("users");
    const emailNormalized = email.trim().toLowerCase();
    const hashedPassword = await bcrypt.hash(newPassword.trim(), 10);
    const now = new Date();

    console.log("🔹 Reset password request:", { email: emailNormalized, otp });

    let updateResult;

    if (otp) {
      // OTP-based reset
      updateResult = await usersCollection.findOneAndUpdate(
        { email: emailNormalized, otp: otp.toString(), otpExpires: { $gt: now } },
        {
          $set: { password: hashedPassword, updatedAt: now, isVerified: true },
          $unset: { otp: 1, otpExpires: 1 },
        },
        { returnDocument: "after" }
      );

      if (!updateResult?.value) {
        await logAdminActivity(`Password reset failed - invalid/expired OTP: ${emailNormalized}`, "warning", "auth", null);
        return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });
      }
    } else {
      // Verified user reset
      const user = await usersCollection.findOne({ email: emailNormalized });
      if (!user) {
        await logAdminActivity(`Password reset failed - user not found: ${emailNormalized}`, "warning", "auth", null);
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      if (!user.isVerified) {
        await logAdminActivity(`Password reset failed - user not verified: ${emailNormalized}`, "warning", "auth", user._id?.toString() ?? null);
        return NextResponse.json({ error: "User not verified. Please verify your OTP first." }, { status: 403 });
      }

      updateResult = await usersCollection.findOneAndUpdate(
        { email: emailNormalized },
        { $set: { password: hashedPassword, updatedAt: now }, $unset: { otp: 1, otpExpires: 1 } },
        { returnDocument: "after" }
      );

      if (!updateResult?.value) {
        await logAdminActivity(`Password reset failed - DB update error: ${emailNormalized}`, "error", "auth", user._id?.toString() ?? null);
        return NextResponse.json({ error: "Failed to update password" }, { status: 500 });
      }
    }

    const updatedUser = updateResult.value;

    await logAdminActivity(`Password reset successful: ${emailNormalized}`, "success", "auth", updatedUser._id?.toString() ?? null);

    return NextResponse.json({ message: "Password reset successful", success: true });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    console.error("❌ Reset Password API error:", errMsg);
    return NextResponse.json({ error: "Server error", details: errMsg }, { status: 500 });
  }
}