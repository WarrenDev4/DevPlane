import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

export async function sendResetPasswordEmail(email: string) {
  await sendPasswordResetEmail(auth, email);
}
export async function resetPassword(email: string, newPassword: string) {
  throw new Error("Direct password reset is not supported. Use sendResetPasswordEmail instead.");
}