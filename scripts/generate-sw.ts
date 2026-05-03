import fs from "node:fs";
import path from "node:path";

const FIREBASE_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const REQUIRED = ["apiKey", "authDomain", "projectId", "messagingSenderId", "appId"] as const;

const MISSING = REQUIRED.filter(key => !FIREBASE_CONFIG[key]);

if (MISSING.length > 0) {
  console.error(`❌ Missing Firebase config required fields: ${MISSING.join(", ")}`);
  console.error("Make sure environment variables are set");
  process.exit(1);
}

const outputPath = path.join(__dirname, "../public/sw.js");

if (fs.existsSync(outputPath)) {
  fs.unlinkSync(outputPath);
  console.log("🗑️ Removed existing sw.js");
}

const templatePath = path.join(__dirname, "../templates/sw.template.js");
const swContent = fs
  .readFileSync(templatePath, "utf8")
  .replace("__FIREBASE_CONFIG__", JSON.stringify(FIREBASE_CONFIG));

fs.writeFileSync(path.join(__dirname, "../public/sw.js"), swContent);
console.log("✅ Generated sw.js");
