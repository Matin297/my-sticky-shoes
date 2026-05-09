import type { Metadata } from "next";
import SignupForm from "./_components/Form";

export const metadata: Metadata = {
  title: "Signup",
};

export default function SignupPage() {
  return <SignupForm />;
}
