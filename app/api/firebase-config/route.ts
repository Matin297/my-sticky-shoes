import { NextResponse } from "next/server";

const CONFIG = {
  client: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  },
  vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
};

const REQUIRED = ["apiKey", "authDomain", "projectId", "messagingSenderId", "appId"] as const;

export async function GET() {
  const missingRequiredFields = REQUIRED.filter(key => !CONFIG.client[key]);

  if (missingRequiredFields.length > 0 || !CONFIG.vapidKey) {
    return NextResponse.json({ error: "Firebase configuration incomplete" }, { status: 500 });
  }

  return NextResponse.json(CONFIG, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
