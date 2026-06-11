// Service Worker for Pooja Sounds PWA
const CACHE_NAME = 'pooja-sounds-v3';
const urlsToCache = [
  './pooja.html',
  './sounds/bell.m4a',
  './sounds/damru.m4a',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Install event - cache files with error handling
self.addEventListener('install', event => {
  console.log('[SW] Installing service worker...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Opened cache');
        // Cache files one by one with error handling
        return Promise.all(
          urlsToCache.map(url => {
            return cache.add(url).catch(err => {
              console.error('[SW] Failed to cache:', url, err);
              // Don't fail installation if one file fails
              return Promise.resolve();
            });
          })
        );
      })
      .then(() => {
        console.log('[SW] All files cached (or attempted)');
        // Force activation immediately
        return self.skipWaiting();
      })
      .catch(err => {
        console.error('[SW] Installation failed:', err);
      })
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
  console.log('[SW] Activating service worker...');
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Service worker activated');
        // Take control of all pages immediately
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache if available, with network fallback
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          // Cache hit - return cached response
          return response;
        }
        // Not in cache - fetch from network
        return fetch(event.request)
          .then(response => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            // Clone the response
            const responseToCache = response.clone();
            // Add to cache for future use
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            return response;
          })
          .catch(err => {
            console.error('[SW] Fetch failed:', event.request.url, err);
            // Return a fallback if available
            return caches.match('./pooja.html');
          });
      })
  );
});
