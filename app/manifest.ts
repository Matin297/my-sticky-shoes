import type { MetadataRoute } from "next";

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
    // TODO
    // icons: [
    //   // 48x48 icon (smallest, for older devices)
    //   {
    //     src: "/icons/app-48x48.png",
    //     sizes: "48x48",
    //     type: "image/png",
    //     purpose: "any",
    //   },
    //   // 72x72 icon (classic mobile)
    //   {
    //     src: "/icons/app-72x72.png",
    //     sizes: "72x72",
    //     type: "image/png",
    //     purpose: "any",
    //   },
    //   // 96x96 icon (common favicon size)
    //   {
    //     src: "/icons/app-96x96.png",
    //     sizes: "96x96",
    //     type: "image/png",
    //     purpose: "any",
    //   },
    //   // 128x128 icon (basic PWA requirement)
    //   {
    //     src: "/icons/app-128x128.png",
    //     sizes: "128x128",
    //     type: "image/png",
    //     purpose: "any",
    //   },
    //   // 144x144 icon (Windows tiles)
    //   {
    //     src: "/icons/app-144x144.png",
    //     sizes: "144x144",
    //     type: "image/png",
    //     purpose: "any",
    //   },
    //   // 152x152 icon (iOS classic)
    //   {
    //     src: "/icons/app-152x152.png",
    //     sizes: "152x152",
    //     type: "image/png",
    //     purpose: "any",
    //   },
    //   // 192x192 icon (Android standard)
    //   {
    //     src: "/icons/app-192x192.png",
    //     sizes: "192x192",
    //     type: "image/png",
    //     purpose: "any",
    //   },
    //   // 256x256 icon (high-res Android)
    //   {
    //     src: "/icons/app-256x256.png",
    //     sizes: "256x256",
    //     type: "image/png",
    //     purpose: "any",
    //   },
    //   // 384x384 icon (tablet Android)
    //   {
    //     src: "/icons/app-384x384.png",
    //     sizes: "384x384",
    //     type: "image/png",
    //     purpose: "any",
    //   },
    //   // 512x512 icon (store listing, splash screens)
    //   {
    //     src: "/icons/app-512x512.png",
    //     sizes: "512x512",
    //     type: "image/png",
    //     purpose: "any",
    //   },
    //   // Maskable icon (for Android adaptive icons)
    //   {
    //     src: "/icons/app-maskable-192x192.png",
    //     sizes: "192x192",
    //     type: "image/png",
    //     purpose: "maskable",
    //   },
    //   {
    //     src: "/icons/app-maskable-512x512.png",
    //     sizes: "512x512",
    //     type: "image/png",
    //     purpose: "maskable",
    //   },
    // ],
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
    //     icons: [{ src: "/icons/shortcut-home.png", sizes: "96x96" }],
    //   },
    //   {
    //     name: "Profile",
    //     short_name: "Profile",
    //     description: "View your profile",
    //     url: "/profile",
    //     icons: [{ src: "/icons/shortcut-profile.png", sizes: "96x96" }],
    //   },
    //   {
    //     name: "Search",
    //     short_name: "Search",
    //     description: "Search content",
    //     url: "/search",
    //     icons: [{ src: "/icons/shortcut-search.png", sizes: "96x96" }],
    //   },
    // ],
  };
}
