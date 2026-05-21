"use client";

import { Avatar, Stack, Typography } from "@mui/material";
import { useGetCurrentUser } from "@/services/generated/profile/profile";

export default function ProfileDetails() {
  const { data, isLoading } = useGetCurrentUser();
  const user = data?.data.user;

  if (isLoading) {
    return "Loading...";
  }

  return (
    <Stack spacing={1} sx={{ alignItems: "center" }}>
      <Avatar src={user?.avatar} sx={{ width: 120, height: 120 }} />
      <Typography>{user?.name}</Typography>
      <Typography>{user?.email}</Typography>
    </Stack>
  );
}
