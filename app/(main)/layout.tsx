import { Container } from "@mui/material";
import type { ReactNode } from "react";
import { isProductionEnv } from "@/lib/utils";
import { PushNotificationManager } from "../_components/PushNotificationsManager";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <Container maxWidth="md">
      {isProductionEnv && <PushNotificationManager />}
      {children}
    </Container>
  );
}
