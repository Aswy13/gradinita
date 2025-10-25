const CACHE_NAME = 'gradinita-cache-v2.3';
const urlsToCache = [
  '/',
'gradinita.html',
'index.html',
'manifest.json',
'style.css',
'app.js',
'icon-192.png',
'icon-512.png',
// Biblioteci externe
'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js',
'https://cdn.jsdelivr.net/npm/chart.js'
];

// Install: Adaugă fișierele în cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch: Servirea conținutului din cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      // Cache hit - return response
      if (response) {
        return response;
      }
      // Nu este în cache, face o cerere la rețea
      return fetch(event.request);
    }
    )
  );
});

// Activare: Curățarea vechilor cache-uri
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Listener pentru a prelua controlul imediat la cerere
self.addEventListener('message', event => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
