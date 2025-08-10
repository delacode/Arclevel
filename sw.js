// sw.js
// Basic offline cache for ARC//LEVEL
// Bump the CACHE version any time you change ASSETS so clients update.
const CACHE = 'arclevel-v3';

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-180.png',   // iOS touch icon
  './icons/icon-192.png',   // PWA required
  './icons/icon-512.png'    // PWA required
];

// Install: pre-cache core assets
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS))
  );
});

// Activate: clean old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
});

// Fetch: cache-first, then network fallback
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => r || fetch(e.request))
  );
});
