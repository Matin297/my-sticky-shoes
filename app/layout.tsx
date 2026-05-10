import type { Metadata } from "next";
import "./globals.css";
import { isProductionEnv } from "@/lib/utils";
import CustomSonnerToast from "./_components/CustomSonnerToast";
import PWAInstallationPrompt from "./_components/PWAInstallationPrompt";
import ServiceWorkerUpdatePrompt from "./_components/ServiceWorkerUpdatePrompt";
import { Providers } from "./_providers";

export const metadata: Metadata = {
  title: {
    template: "%s | My Sticky Shoes",
    default: "My Sticky Shoes",
  },
  description:
    "My Sticky Shoes is here to help you to stick to good habits and experiment fearlessly",
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <CustomSonnerToast />
          {children}
        </Providers>

        {isProductionEnv && <PWAInstallationPrompt />}
        {isProductionEnv && <ServiceWorkerUpdatePrompt />}
      </body>
    </html>
  );
}
