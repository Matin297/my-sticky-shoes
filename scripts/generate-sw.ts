import fs from "node:fs";
import path from "node:path";
import {
  getFirebaseConfig,
  getMissingFirebaseConfigs,
  isFirebaseConfigReady,
} from "@/lib/firebase/configuration";

if (!isFirebaseConfigReady()) {
  const missingConfigs = getMissingFirebaseConfigs();
  console.error(`❌ Missing Firebase config: ${missingConfigs}`);
  console.error("💡 Add these to your .env.local file");
  process.exit(1);
}

console.log("✅ Firebase configuration validated");

const firebaseConfig = getFirebaseConfig();

const outputPath = path.join(process.cwd(), "public/sw.js");
const templatePath = path.join(process.cwd(), "templates/sw.template.js");

if (fs.existsSync(outputPath)) {
  fs.unlinkSync(outputPath);
  console.log("🗑️ Removed existing sw.js");
}

if (!fs.existsSync(templatePath)) {
  console.error(`❌ Template not found at ${templatePath}`);
  process.exit(1);
}

const swContent = fs
  .readFileSync(templatePath, "utf8")
  .replace("__FIREBASE_CONFIG__", JSON.stringify(firebaseConfig));

fs.writeFileSync(outputPath, swContent);
console.log("✅ Generated sw.js");
