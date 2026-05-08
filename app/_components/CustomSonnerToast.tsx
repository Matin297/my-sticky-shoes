"use client";

import { useColorScheme } from "@mui/material/styles";
import { Toaster } from "sonner";

export default function SonnerProvider() {
  const { mode } = useColorScheme();
  return <Toaster richColors closeButton duration={4000} theme={mode} />;
}
