import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export async function signInUser(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}
