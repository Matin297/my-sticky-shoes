import { Typography } from "@mui/material";
import type { Metadata } from "next";
import EditProfileForm from "./_components/Form";

export const metadata: Metadata = {
  title: "Edit Profile",
};

export default function EditProfilePage() {
  return (
    <>
      <Typography align="center" gutterBottom variant="h1">
        Edit Profile
      </Typography>
      <EditProfileForm />
    </>
  );
}
