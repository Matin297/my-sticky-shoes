import { Edit } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import type { Metadata } from "next";
import Link from "next/link";
import PageMainHeading from "../_components/PageMainHeading";
import ProfileDetails from "./_components/Details";

export const metadata: Metadata = {
  title: "Profile",
};

export default function ProfilePage() {
  return (
    <>
      <Stack spacing={1} direction="row" sx={{ alignItems: "center", mb: 4 }}>
        <PageMainHeading>Profile</PageMainHeading>
        <Link href="/profile/edit">
          <IconButton size="large" color="secondary">
            <Edit />
          </IconButton>
        </Link>
      </Stack>
      <ProfileDetails />
    </>
  );
}
