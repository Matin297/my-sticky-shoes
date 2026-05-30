import { Edit } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";
import type { Metadata } from "next";
import Link from "next/link";
import ProfileDetails from "./_components/Details";

export const metadata: Metadata = {
  title: "Profile",
};

export default function ProfilePage() {
  return (
    <>
      <Stack spacing={1} direction="row" sx={{ alignItems: "center", mb: 4 }}>
        <Typography variant="h2">Profile</Typography>
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
