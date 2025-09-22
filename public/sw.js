// Basic Service Worker to prevent 404 errors
// This is a minimal service worker that does nothing but prevents browser errors

self.addEventListener("install", (event) => {
  console.log("Service Worker: Installed");
  // Skip waiting to activate immediately
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activated");
  // Claim all clients to take control immediately
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  // Do nothing - just pass through all requests
  // This prevents any caching or offline functionality
  return;
});
