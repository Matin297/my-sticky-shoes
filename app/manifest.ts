import type { MetadataRoute } from "next";
import { ICONS } from "@/lib/pwa";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/v1",
    scope: "/",
    start_url: "/",
    lang: "en-US",
    dir: "ltr",
    name: "My Sticky Shoes",
    short_name: "Sticky",
    description: "A personal playground for exploring frontend technologies.",
    display: "standalone",
    display_override: ["window-controls-overlay", "minimal-ui"],
    categories: ["frontend", "playground", "pwa"],
    orientation: "portrait-primary",
    theme_color: "#ffffff",
    background_color: "#ffffff",
    prefer_related_applications: false,
    related_applications: [],
    launch_handler: {
      client_mode: "focus-existing",
    },
    icons: ICONS,
    // screenshots: [
    //   // Mobile screenshot (required for store listing)
    //   {
    //     src: "/screenshots/mobile-home.png",
    //     sizes: "1080x1920",
    //     type: "image/png",
    //     form_factor: "narrow",
    //     label: "Home Screen",
    //   },
    //   {
    //     src: "/screenshots/mobile-dashboard.png",
    //     sizes: "1080x1920",
    //     type: "image/png",
    //     form_factor: "narrow",
    //     label: "Dashboard",
    //   },
    //   // Tablet screenshot (optional but recommended)
    //   {
    //     src: "/screenshots/tablet-home.png",
    //     sizes: "1280x800",
    //     type: "image/png",
    //     form_factor: "wide",
    //     label: "Home Screen on Tablet",
    //   },
    // ],
    // shortcuts: [
    //   {
    //     name: "Home",
    //     short_name: "Home",
    //     description: "Go to home page",
    //     url: "/",
    //     icons: [{ src: "/assets/assets/android/, sizes: "96x96" }],
    //   },
    //   {
    //     name: "Profile",
    //     short_name: "Profile",
    //     description: "View your profile",
    //     url: "/profile",
    //     icons: [{ src: "/assets/assets/android/, sizes: "96x96" }],
    //   },
    //   {
    //     name: "Search",
    //     short_name: "Search",
    //     description: "Search content",
    //     url: "/search",
    //     icons: [{ src: "/assets/assets/android/, sizes: "96x96" }],
    //   },
    // ],
  };
}
