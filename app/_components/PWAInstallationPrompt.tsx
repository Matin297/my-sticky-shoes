"use client";

import { isStandalone } from "@/lib/utils";

export default function PWAInstallationPrompt() {
  if (isStandalone()) return null;
  return "please install our pwa!";
}
