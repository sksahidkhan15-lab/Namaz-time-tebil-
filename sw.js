const CACHE_NAME = 'islamic-app-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',      // আপনার CSS ফাইলের নাম
  './app.js',         // আপনার JS ফাইলের নাম
  './manifest.json',
  './icon-192.png'    // অ্যাপের আইকন
];

// ইনস্টল এবং ফাইল ক্যাশে সেভ করা
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// অফলাইন অবস্থা থেকে ফাইল ডেলিভারি করা
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(e.request);
    })
  );
});

// পুরোনো ক্যাশে ডিলিট করা (যদি আপডেট আসে)
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});
