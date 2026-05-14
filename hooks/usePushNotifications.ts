"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { getFCMToken, onForegroundMessage } from "@/lib/firebase/client";
import { getNotificationPermission, isPushSupported } from "@/lib/utils";
import {
  useRegisterFCMToken,
  useUnregisterFCMToken,
} from "@/services/generated/notifications/notifications";

const STORED_FCM_TOKEN_KEY = "fcm-token";

export function usePushNotifications() {
  const [loading, setLoading] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>(getNotificationPermission);
  const [localFCMToken, setLocalFCMToken] = useLocalStorageState(STORED_FCM_TOKEN_KEY, "");

  const isNotificationsActive = Boolean(localFCMToken) && permission === "granted";

  const { mutateAsync: registerFCMToken } = useRegisterFCMToken();
  const { mutateAsync: unregisterFCMToken } = useUnregisterFCMToken();

  useEffect(() => {
    if (!isPushSupported() || permission !== "granted") return;

    const unsubscribe = onForegroundMessage(payload => {
      toast(payload.notification?.title || "New Notification", {
        description: payload.notification?.body,
      });
    });

    return () => {
      unsubscribe.then(callback => callback?.());
    };
  }, [permission]);

  const enableNotifications = async () => {
    if (!isPushSupported()) {
      toast.error("Push notifications are not supported in your browser");
      return;
    }

    setLoading(true);
    try {
      const result = await Notification.requestPermission();
      setPermission(result);

      if (result === "granted") {
        const token = await getFCMToken();
        if (token) {
          await registerFCMToken({ data: { token } });
          setLocalFCMToken(token);
          toast.success("Notifications enabled!");
        }
      }
    } catch (error) {
      console.error("Notification permission failed:", error);
      toast.error(error instanceof Error ? error.message : "Failed to enable notifications");
    } finally {
      setLoading(false);
    }
  };

  const disableNotifications = async () => {
    if (!isPushSupported()) {
      return;
    }

    setLoading(true);
    try {
      await unregisterFCMToken();
      setLocalFCMToken("");

      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      if (subscription) {
        await subscription.unsubscribe();
        console.log("✅ Browser push subscription removed");
      }

      toast.success("Notifications disabled. You can re-enable them anytime.");
    } catch (error) {
      console.error("Failed to disable notifications:", error);
      toast.error(error instanceof Error ? error.message : "Failed to disable notifications");
    } finally {
      setLoading(false);
    }
  };

  const toggleNotifications = async () => {
    if (isNotificationsActive) {
      disableNotifications();
    } else {
      enableNotifications();
    }
  };

  return {
    loading,
    permission,
    toggleNotifications,
    enableNotifications,
    disableNotifications,
    isNotificationsActive,
    isPermissionDenied: permission === "denied",
    isPermissionGranted: permission === "granted",
  };
}
