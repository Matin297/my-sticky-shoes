importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js");

// This gets replaced at build time
const firebaseConfig = __FIREBASE_CONFIG__;
initializeFirebaseMessaging();
function initializeFirebaseMessaging() {
  try {
    if (firebase.apps?.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
    return firebase.messaging();
  } catch (error) {
    console.error("Failed to initialize Firebase:", error);
    return null;
  }
}

const NOTIFICATION_DISPLAY_CONFIG = {
  TITLE: "My Sticky Shoes",
  ICON: "", // TODO
  BADGE: "", // TODO
  URL: "/",
  VIBRATION_PATTERN: [100, 50, 100],
  TAG: `notification-${Date.now()}`,
};

const CACHE_PREFIX = "my-sticky-shoes";
const CACHE_VERSION = "1.0.0";
const OFFLINE_URL = "/offline.html";

const CACHE_CONFIG = {
  PRECACHE_NAME: `${CACHE_PREFIX}--precache.v${CACHE_VERSION}`,
  PRECACHE_FILES: [
    OFFLINE_URL,
    "/manifest.webmanifest",
    // "/icons/app-192x192.png", // TODO
    // "/icons/app-512x512.png", // TODO
  ],
  STATIC_CACHE_NAME: `${CACHE_PREFIX}--static.v${CACHE_VERSION}`,
  IMAGE_CACHE_NAME: `${CACHE_PREFIX}--images.v${CACHE_VERSION}`,
  FONT_CACHE_NAME: `${CACHE_PREFIX}--fonts.v${CACHE_VERSION}`,
};

self.addEventListener("install", event => {
  event.waitUntil(precache());
});

async function precache() {
  const cache = await caches.open(CACHE_CONFIG.PRECACHE_NAME);

  await Promise.all(
    CACHE_CONFIG.PRECACHE_FILES.map(async fileName => {
      const response = await fetch(fileName);

      if (!response.ok) {
        throw new Error(`Failed to fetch ${fileName}: ${response.status}`);
      }

      await cache.put(fileName, response);
      console.log(`Pre-cached: ${fileName}`);
    }),
  );

  console.log(`✅ Successfully pre-cached ${CACHE_CONFIG.PRECACHE_FILES.length} files.`);
}

self.addEventListener("activate", event => {
  event.waitUntil(
    (async () => {
      await clearCache();
      await enableNavigationPreload();

      if (self.clients?.claim) {
        await self.clients.claim();
      }

      console.log("Service worker activated successfully.");
    })(),
  );
});

async function clearCache() {
  const keys = await caches.keys();
  const incomingKeys = [
    CACHE_CONFIG.PRECACHE_NAME,
    CACHE_CONFIG.STATIC_CACHE_NAME,
    CACHE_CONFIG.IMAGE_CACHE_NAME,
    CACHE_CONFIG.FONT_CACHE_NAME,
  ];

  await Promise.all(
    keys
      .filter(key => key.startsWith(CACHE_PREFIX) && !incomingKeys.includes(key))
      .map(key => {
        console.log(`Cache entry ${key} deleted.`);
        return caches.delete(key);
      }),
  );
}

async function enableNavigationPreload() {
  try {
    await self.registration?.navigationPreload.enable();
  } catch (err) {
    console.warn("Navigation preload not supported:", err);
  }
}

self.addEventListener("fetch", event => {
  const { request } = event;
  const url = new URL(request.url);

  // Workaround for Chrome's "only-if-cached" error
  if (request.cache === "only-if-cached" && request.mode !== "same-origin") {
    return;
  }

  // No API mutations Caching, No Cross-Origin Caching
  if (request.method !== "GET" || url.origin !== self.location.origin) {
    return;
  }

  // Never cache service worker itself
  if (url.pathname === "/sw.js") {
    return;
  }

  // Never cache API or Next.js data endpoints
  if (url.pathname.startsWith("/api/") || url.pathname.startsWith("/_next/data/")) {
    return;
  }

  // Network-first with offline fallback
  if (request.mode === "navigate") {
    event.respondWith(networkFirst(event));
    return;
  }

  // Cache-first for Next.js static assets
  if (isNextStaticAsset(url)) {
    event.respondWith(cacheFirst(request, CACHE_CONFIG.STATIC_CACHE_NAME));
    return;
  }

  // Cache-first for fonts
  if (request.destination === "font" || isFontAsset(url)) {
    event.respondWith(cacheFirst(request, CACHE_CONFIG.FONT_CACHE_NAME));
    return;
  }

  // Stale-while-revalidate for scripts/styles
  if (request.destination === "script" || request.destination === "style") {
    event.respondWith(staleWhileRevalidate(request, CACHE_CONFIG.STATIC_CACHE_NAME));
    return;
  }

  // Stale-while-revalidate for images and icons
  if (request.destination === "image" || isImageAsset(url)) {
    event.respondWith(staleWhileRevalidate(request, CACHE_CONFIG.IMAGE_CACHE_NAME));
    return;
  }

  // Stale-while-revalidate for other static files
  if (isStaticFileByExtension(url)) {
    event.respondWith(staleWhileRevalidate(request, CACHE_CONFIG.STATIC_CACHE_NAME));
  }
});

async function networkFirst(event) {
  const { request } = event;

  try {
    const preloadResponse = await event.preloadResponse;
    if (preloadResponse) {
      return preloadResponse;
    }

    const networkResponse = await fetch(request);
    return networkResponse;
  } catch (_) {
    const cachedOffline = await caches.match(OFFLINE_URL);
    if (cachedOffline) {
      return cachedOffline;
    }

    return new Response("Offline. Please check your connection.", {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}

function isNextStaticAsset(url) {
  return url.pathname.startsWith("/_next/static/");
}

async function cacheFirst(request, cacheName) {
  const cachedRequest = await caches.match(request);
  if (cachedRequest) {
    return cachedRequest;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      await putInCache(cacheName, request, response);
    }
    return response;
  } catch (_) {
    return new Response("Requested resource is unavailable.", {
      status: 504,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cachedRequest = await caches.match(request);

  const networkPromise = fetch(request)
    .then(async response => {
      if (response.ok) {
        await putInCache(cacheName, request, response);
      }
      return response;
    })
    .catch(() => {
      if (cachedRequest) return cachedRequest;
      return new Response("Requested resource is unavailable.", {
        status: 504,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    });

  return cachedRequest || networkPromise;
}

async function putInCache(cacheName, request, response) {
  try {
    if (!response || response.status !== 200) {
      return;
    }

    const cache = await caches.open(cacheName);
    await cache.put(request, response.clone());
  } catch (error) {
    console.warn(`Failed to cache ${request.url}:`, error);
  }
}

function isFontAsset(url) {
  return /\.(?:woff2?|ttf|otf|eot)$/i.test(url.pathname);
}

function isImageAsset(url) {
  return /\.(?:png|svg|jpg|jpeg|gif|webp|ico|avif)$/i.test(url.pathname);
}

function isStaticFileByExtension(url) {
  return (
    /\.(?:js|css|map|json|txt|xml)$/i.test(url.pathname) || url.pathname.startsWith("/assets/")
  );
}

self.addEventListener("message", event => {
  const { data } = event;

  if (!data?.type) return;

  switch (data.type) {
    case "SKIP_WAITING":
      self.skipWaiting();
      break;

    // case "CLEAR_CACHES":
    //   event.waitUntil(
    //     (async () => {
    //       const keys = await caches.keys();
    //       await Promise.all(
    //         keys
    //           .filter(key => key.startsWith(CACHE_PREFIX))
    //           .map(key => {
    //             console.log(`Clearing cache: ${key}`);
    //             return caches.delete(key);
    //           }),
    //       );
    //       console.log("All caches cleared");
    //     })(),
    //   );
    //   break;

    // case "REFRESH_STATIC_CACHE":
    //   event.waitUntil(
    //     (async () => {
    //       await caches.delete(STATIC_CACHE_NAME);
    //       await caches.delete(PRECACHE_NAME);
    //       await precache();
    //       console.log("Static caches refreshed");
    //     })(),
    //   );
    //   break;

    default:
      console.log("Invalid message type:", data.type);
  }
});

self.addEventListener("push", async event => {
  event.waitUntil(handlePushEvent(event));
});

async function handlePushEvent(event) {
  const payload = parsePushPayload(event.data);

  if (!payload) {
    console.warn("Push received with empty payload!");
    return;
  }

  const { title, options } = createNotificationOptions(payload);

  try {
    await self.registration.showNotification(title, options);
  } catch (error) {
    console.error("Failed to display push notification:", error);
  }
}

function parsePushPayload(data) {
  if (!data) return null;

  try {
    return data.json();
  } catch {
    const text = data.text?.() || "";
    if (text) {
      return { notification: { body: text } };
    }
  }

  return null;
}

function createNotificationOptions(payload) {
  const notification = payload.notification ?? {};
  const data = payload.data ?? {};
  const fcmOptions = payload.fcmOptions ?? payload.webpush?.fcmOptions ?? {};

  const title = notification.title ?? data.title ?? NOTIFICATION_DISPLAY_CONFIG.TITLE;
  const targetUrl =
    data.url ?? notification.click_action ?? fcmOptions.link ?? NOTIFICATION_DISPLAY_CONFIG.URL;

  const options = {
    body: notification.body ?? data.body ?? "",
    icon: notification.icon ?? data.icon ?? NOTIFICATION_DISPLAY_CONFIG.ICON,
    badge: notification.badge ?? data.badge ?? NOTIFICATION_DISPLAY_CONFIG.BADGE,
    vibrate: Array.isArray(data.vibrate)
      ? data.vibrate
      : NOTIFICATION_DISPLAY_CONFIG.VIBRATION_PATTERN,
    image: notification.image ?? data.image,
    data: {
      ...data,
      dateOfArrival: Date.now(),
      url: targetUrl,
    },
    tag: notification.tag ?? data.tag ?? NOTIFICATION_DISPLAY_CONFIG.TAG,
    renotify: Boolean(data.renotify),
    requireInteraction: Boolean(data.requireInteraction),
    silent: Boolean(data.silent),
  };

  return { title, options };
}

self.addEventListener("notificationclick", event => {
  event.notification.close();
  const targetUrl = event.notification?.data?.url ?? NOTIFICATION_DISPLAY_CONFIG.URL;
  event.waitUntil(openOrFocusClient(targetUrl));
});

async function openOrFocusClient(targetUrl) {
  const normalizedUrl = new URL(targetUrl, self.location.origin).href;

  try {
    const clientList = await clients.matchAll({
      type: "window",
      includeUncontrolled: true,
    });

    for (const client of clientList) {
      if (client.url.includes(self.location.origin)) {
        await client.focus();
        client.navigate(normalizedUrl).catch(() => {});
        return;
      }
    }

    if (clients.openWindow) {
      await clients.openWindow(normalizedUrl);
    }
  } catch (error) {
    console.warn("Failed to open/focus client:", error);
  }
}
