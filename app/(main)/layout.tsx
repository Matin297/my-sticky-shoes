import { Container } from "@mui/material";
import type { ReactNode } from "react";
import { isProductionEnv } from "@/lib/utils";
import { PushNotificationManager } from "../_components/PushNotificationsManager";
import PWAInstallationPrompt from "../_components/PWAInstallationPrompt";
import ServiceWorkerUpdatePrompt from "../_components/ServiceWorkerUpdatePrompt";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <Container maxWidth="md">
      {children}
      {isProductionEnv && <PushNotificationManager />}
      {isProductionEnv && <PWAInstallationPrompt />}
      {isProductionEnv && <ServiceWorkerUpdatePrompt />}
    </Container>
  );
}
