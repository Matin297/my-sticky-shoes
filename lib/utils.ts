export function isClientSide(): boolean {
  return typeof window !== "undefined";
}

export function isServerSide(): boolean {
  return typeof window === "undefined";
}

export const isStandalone = () =>
  isClientSide() &&
  (window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in navigator && navigator.standalone === true));

export const isProductionEnv = process.env.NODE_ENV === "production";
export const isDevelopmentEnv = process.env.NODE_ENV === "development";

export function isPushSupported(): boolean {
  return isClientSide() && "Notification" in window && "serviceWorker" in navigator;
}

export function getNotificationPermission(): NotificationPermission {
  if (isServerSide()) return "default";
  return Notification.permission;
}

export function isNotificationPermissionGranted(): boolean {
  return isPushSupported() && Notification.permission === "granted";
}

export function isNotificationPermissionDenied(): boolean {
  return isPushSupported() && Notification.permission === "denied";
}

export const getUsernameInitials = (name: string) => {
  return name
    .trim()
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase();
};
