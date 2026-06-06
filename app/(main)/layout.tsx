import { Container, Stack } from "@mui/material";
import { type ReactNode, ViewTransition } from "react";
import { isProductionEnv } from "@/lib/utils";
import PWAInstallationPrompt from "../_components/PWAInstallationPrompt";
import ServiceWorkerUpdatePrompt from "../_components/ServiceWorkerUpdatePrompt";
import Header from "./_components/Header";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <Container maxWidth="md" sx={{ py: 2 }}>
      {isProductionEnv && (
        <Stack spacing={2}>
          <ServiceWorkerUpdatePrompt />
          <PWAInstallationPrompt />
        </Stack>
      )}
      <Header />
      <ViewTransition>{children}</ViewTransition>
    </Container>
  );
}
