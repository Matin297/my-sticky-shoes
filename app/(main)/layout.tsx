import { Box } from "@mui/material";
import type { ReactNode } from "react";
import { isProductionEnv } from "@/lib/utils";
import { PushNotificationManager } from "../_components/PushNotificationsManager";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <Box>
      {isProductionEnv && <PushNotificationManager />}
      {children}
    </Box>
  );
}
