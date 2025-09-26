const CACHE_NAME = 'gradinita-cache-v2'; // Schimbă numărul la fiecare actualizare majoră
const urlsToCache = [
  'gradinita.html',
  'manifest.json',
  // Adaugă și numele icon-urilor tale aici
  'icon-192.png',
  'icon-512.png',
  // Biblioteci externe
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js',
  'https://cdn.jsdelivr.net/npm/chart.js'
];
// ================== PWA Service Worker Registration & Update Handler ==================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);

                // Ascultă evenimentul de actualizare (updatefound)
                registration.addEventListener('updatefound', () => {
                    const installingWorker = registration.installing;
                    installingWorker.addEventListener('statechange', () => {
                        // Când noul Service Worker a terminat de instalat
                        if (installingWorker.state === 'installed') {
                            if (navigator.serviceWorker.controller) {
                                // Afișează mesajul de actualizare
                                document.getElementById('update-message').style.display = 'block';
                            } else {
                                // Primul conținut a fost pus în cache
                                console.log('Content is cached for offline use.');
                            }
                        }
                    });
                });
            })
            .catch(error => {
                console.log('ServiceWorker registration failed: ', error);
            });
    });
}
// Instalare: Caching-ul fișierelor statice
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

// Activare: Curățarea vechilor cache-uri (dacă schimbi CACHE_NAME)
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
