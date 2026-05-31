import { readdirSync } from "node:fs";
import { join } from "node:path";
import type { MetadataRoute } from "next";

export const ANDROID_ICONS: MetadataRoute.Manifest["icons"] = getPwaAssetFiles(
  "assets/android",
).flatMap(file => {
  const size = file.split(".")[0];
  return [
    {
      src: `/assets/android/${file}`,
      sizes: `${size}x${size}`,
      type: "image/png",
      purpose: "any",
    },
    {
      src: `/assets/android/${file}`,
      sizes: `${size}x${size}`,
      type: "image/png",
      purpose: "maskable",
    },
  ];
});

export const IOS_ICONS: MetadataRoute.Manifest["icons"] = getPwaAssetFiles("assets/ios").map(
  file => {
    const size = file.split(".")[0];
    return {
      src: `/assets/ios/${file}`,
      sizes: `${size}x${size}`,
      type: "image/png",
      purpose: "any",
    };
  },
);

export const ICONS = [...ANDROID_ICONS, ...IOS_ICONS];

function getPwaAssetFiles(dirPath: string) {
  try {
    const fullPath = join(process.cwd(), "public", dirPath);
    const files = readdirSync(fullPath);
    return files;
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
  }
  return [];
}
