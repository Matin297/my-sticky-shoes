"use client";

import { useEffect, useState } from "react";

export default function ServiceWorkerUpdatePrompt() {
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
      navigator.serviceWorker.removeEventListener("controllerchange", handleReload);
      window.location.reload();
    };
    navigator.serviceWorker.addEventListener("controllerchange", handleReload);
  }

  if (waitingWorker)
    return (
      <button type="button" onClick={handleUpdateServiceWorker}>
        Update Available
      </button>
    );

  return null;
}
