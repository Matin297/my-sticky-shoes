import type { Metadata } from "next";
import PageMainHeading from "./_components/PageMainHeading";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomePage() {
  return <PageMainHeading>Welcome Beastlings</PageMainHeading>;
}
