import { Container } from "@mui/material";
import type { ReactNode } from "react";
import { isProductionEnv } from "@/lib/utils";
import PWAInstallationPrompt from "../_components/PWAInstallationPrompt";
import ServiceWorkerUpdatePrompt from "../_components/ServiceWorkerUpdatePrompt";
import Header from "./_components/Header";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <Container maxWidth="md" sx={{ py: 1 }}>
      <Header />
      {children}
      {isProductionEnv && <PWAInstallationPrompt />}
      {isProductionEnv && <ServiceWorkerUpdatePrompt />}
    </Container>
  );
}
