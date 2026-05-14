import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported, type Messaging, onMessage } from "firebase/messaging";
import { isServerSide } from "../utils";
import {
  getFirebaseConfig,
  getMissingFirebaseConfigs,
  isFirebaseConfigReady,
} from "./configuration";

if (!isFirebaseConfigReady()) {
  const missingConfigs = getMissingFirebaseConfigs();
  throw new Error(
    `❌ Missing Firebase config: ${missingConfigs}. 💡 Add these to your .env.local file`,
  );
}

const firebaseConfig = getFirebaseConfig();
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

let messagingPromise: Promise<Messaging | null> | null = null;
function getMessagingInstance() {
  if (isServerSide()) {
    return null;
  }

  if (!messagingPromise) {
    messagingPromise = isSupported()
      .then(supported => {
        if (supported) {
          return getMessaging(app);
        }
        console.warn("Firebase messaging is not supported in this browser.");
        return null;
      })
      .catch(error => {
        console.error("Failed to initialize Firebase messaging:", error);
        return null;
      });
  }

  return messagingPromise;
}

export async function getFCMToken() {
  const messaging = await getMessagingInstance();
  if (!messaging) return null;

  try {
    const registration = await navigator.serviceWorker.getRegistration("/sw.js");

    if (!registration) {
      console.warn("No service worker registration for firebase found.");
      return null;
    }

    await navigator.serviceWorker.ready;

    return await getToken(messaging, {
      serviceWorkerRegistration: registration,
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    });
  } catch (error) {
    console.error("Error getting FCM token:", error);
    return null;
  }
}

export async function onForegroundMessage(callback: Parameters<typeof onMessage>[1]) {
  const messaging = await getMessagingInstance();
  if (!messaging) return;

  return onMessage(messaging, callback);
}
