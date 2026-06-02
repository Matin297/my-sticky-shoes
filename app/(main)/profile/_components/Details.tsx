"use client";

import { ChevronRight } from "@mui/icons-material";
import { Avatar, Divider, Stack, Typography } from "@mui/material";
import { PushNotificationManager } from "@/app/_components/PushNotificationsManager";
import { LinkButton } from "@/components/LinkButton";
import { isProductionEnv } from "@/lib/utils";
import { useGetCurrentUser } from "@/services/generated/profile/profile";

export default function ProfileDetails() {
  const { data, isLoading } = useGetCurrentUser();
  const user = data?.data.user;

  if (isLoading) {
    return "Loading...";
  }

  return (
    <Stack spacing={3}>
      <Stack spacing={1} sx={{ alignItems: "center" }}>
        <Avatar src={user?.avatar} sx={{ width: 120, height: 120 }} />
        <Typography>{user?.name}</Typography>
        <Typography>{user?.email}</Typography>
      </Stack>
      <Divider />
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <LinkButton color="secondary" variant="outlined" endIcon={<ChevronRight />} href="/faq">
          FAQ
        </LinkButton>
        {isProductionEnv && <PushNotificationManager />}
      </Stack>
    </Stack>
  );
}
