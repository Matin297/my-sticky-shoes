"use client";

import { Close } from "@mui/icons-material";
import { Alert, AlertTitle, IconButton } from "@mui/material";
import { useState } from "react";
import { isStandalone } from "@/lib/utils";

export default function PWAInstallationPrompt() {
  const [dismissed, setDismissed] = useState(false);

  const handleDismiss = () => {
    setDismissed(true);
  };

  if (isStandalone() || dismissed) return null;

  return (
    <Alert
      severity="info"
      action={
        <IconButton color="inherit" size="small" onClick={handleDismiss}>
          <Close />
        </IconButton>
      }
      onClose={handleDismiss}
    >
      <AlertTitle>Install App</AlertTitle>
      Install this app on your device. On mobile, tap <strong>Share</strong> →{" "}
      <strong>Add to Home Screen</strong>.
      <br />
    </Alert>
  );
}
