const CACHE = 'kokopelis-v6-core-10';
const CORE = [
  './', './index.html', './styles.css', './roll-persistent.css', './characters.css', './summon-collapse.css?v=532', './summon-layout.css?v=550', './entelques-spell-read.css?v=560', './character-redesign.css?v=600',
  './app.js', './roll-persistent.js', './characters.js', './summon-collapse.js?v=532', './hp-controls.js?v=540', './summon-layout.js?v=550', './entelques-spell-read.js?v=560', './character-redesign.js?v=600', './manifest.webmanifest',
  './icons/kokopelis-face-192.jpg','./icons/kokopelis-face-512.jpg','./icons/kokopelis-face-maskable-512.jpg',
  './assets/sheet.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  const isNavigation = event.request.mode === 'navigate' || url.pathname.endsWith('/index.html') || url.pathname.endsWith('/');
  const isAppCode = /\.(?:js|css|webmanifest)$/.test(url.pathname);

  if (isNavigation || isAppCode) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE).then(cache => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => caches.match(event.request).then(cached => cached || caches.match('./index.html')))
    );
    return;
  }

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
