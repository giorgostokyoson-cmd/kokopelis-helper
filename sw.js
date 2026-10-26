const CACHE = 'kokopelis-v5-core-4';
const CORE = [
  './', './index.html', './styles.css', './roll-persistent.css', './characters.css', './app.js', './roll-persistent.js', './characters.js', './manifest.webmanifest',
  './icons/kokopelis-face-192.jpg','./icons/kokopelis-face-512.jpg','./icons/kokopelis-face-maskable-512.jpg',
  './assets/sheet.jpg'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      if (response && response.ok) {
        const copy = response.clone();
        caches.open(CACHE).then(cache => cache.put(event.request, copy));
      }
      return response;
    }).catch(() => caches.match('./index.html')))
  );
});
