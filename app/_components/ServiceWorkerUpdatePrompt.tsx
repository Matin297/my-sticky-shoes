"use client";

import { Check, Close, SystemUpdate } from "@mui/icons-material";
import { Alert, IconButton } from "@mui/material";
import { useEffect, useState } from "react";

export default function ServiceWorkerUpdatePrompt() {
  const [dismissed, setDismissed] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    registerServiceWorker();

    async function registerServiceWorker() {
      try {
        let registration = await navigator.serviceWorker.getRegistration();

        if (!registration) {
          registration = await navigator.serviceWorker.register("/sw.js");
        }

        console.log("✅ Service Worker registered:", registration);

        if (registration.waiting) {
          setWaitingWorker(registration.waiting);
        }

        registration.addEventListener("updatefound", () => {
          const upcomingServiceWorker = registration.installing;
          if (upcomingServiceWorker) {
            upcomingServiceWorker.addEventListener("statechange", () => {
              if (
                upcomingServiceWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                setWaitingWorker(upcomingServiceWorker);
              }
            });
          }
        });
      } catch (error) {
        console.error("❌ Service Worker registration failed:", error);
      }
    }
  }, []);

  function handleUpdateServiceWorker() {
    if (!waitingWorker) return;
    setupControllerChangeEvent();
    activateWaitingServiceWorker(waitingWorker);
  }

  function activateWaitingServiceWorker(serviceWorker: ServiceWorker) {
    serviceWorker.postMessage({ type: "SKIP_WAITING" });
  }

  function setupControllerChangeEvent() {
    const handleReload = () => {
      setWaitingWorker(null);
      setDismissed(true);
      navigator.serviceWorker.removeEventListener("controllerchange", handleReload);
      window.location.reload();
    };
    navigator.serviceWorker.addEventListener("controllerchange", handleReload);
  }

  function handleDismiss() {
    setDismissed(true);
  }

  if (dismissed || !waitingWorker) {
    return null;
  }

  return (
    <Alert
      severity="info"
      variant="filled"
      icon={<SystemUpdate />}
      action={
        <>
          <IconButton color="inherit" size="small" onClick={handleUpdateServiceWorker}>
            <Check />
          </IconButton>
          <IconButton color="inherit" size="small" onClick={handleDismiss}>
            <Close />
          </IconButton>
        </>
      }
      onClose={handleDismiss}
      sx={{ alignItems: "center" }}
    >
      <strong>New version available!</strong> Update to get the latest features.
    </Alert>
  );
}
