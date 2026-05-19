import { Typography } from "@mui/material";
import type { Metadata } from "next";
import { LinkButton } from "@/components/LinkButton";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomePage() {
  return (
    <>
      <Typography variant="h1">My Sticky Shoes</Typography>
      <LinkButton href="/profile">Profile</LinkButton>
    </>
  );
}
