"use client";

import { Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { usePushNotifications } from "@/hooks/usePushNotifications";

export function PushNotificationManager() {
  const [mounted, setMounted] = useState(false);
  const { toggleNotifications, loading, isNotificationsActive } = usePushNotifications();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Stack>
        <Button variant="outlined">Loading...</Button>
      </Stack>
    );
  }

  return (
    <Stack>
      <Button variant="outlined" loading={loading} disabled={loading} onClick={toggleNotifications}>
        {isNotificationsActive ? "Disable" : "Enable"} Notifications
      </Button>
    </Stack>
  );
}
