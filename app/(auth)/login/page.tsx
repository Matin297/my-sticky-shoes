import type { Metadata } from "next";
import LoginForm from "./_components/Form";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return <LoginForm />;
}
