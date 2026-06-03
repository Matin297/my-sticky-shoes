import type { Metadata } from "next";
import "./globals.css";
import CustomSonnerToast from "./_components/CustomSonnerToast";
import { Providers } from "./_providers";

export const metadata: Metadata = {
  title: {
    template: "%s | My Sticky Shoes",
    default: "My Sticky Shoes",
  },
  description:
    "My Sticky Shoes is here to help you to stick to good habits and experiment fearlessly",
  manifest: "/manifest.webmanifest",
  keywords: ["sticky", "shoes", "pwa", "technology", "software", "cutting edge"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <Providers>
          <CustomSonnerToast />
          {children}
        </Providers>
      </body>
    </html>
  );
}
