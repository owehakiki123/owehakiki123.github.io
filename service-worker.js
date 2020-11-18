/*const CACHE_NAME = "football-app_v1";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/article.html",
  "/pages/about.html",
  "/pages/jadwal.html",
  "/pages/home.html",
  "/pages/save.html",
  "/icon.png",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/manifest.json",
  "/js/nav.js",
  "/js/api.js",
  "/js/idb.js",
  "/js/db.js",
  "/js/script.js",
  "/push.js",
  "/package-lock.json",
  "/maskable_icon.png",
  "https://unpkg.com/snarkdown@1.0.2/dist/snarkdown.umd.js",
  "https://fonts.googleapis.com/icon?family=Material+Icons"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

    self.addEventListener("fetch", function(event) {
      var base_url = "https://api.football-data.org/v2/";
      if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
          caches.open(CACHE_NAME).then(function(cache) {
            return fetch(event.request).then(function(response) {
              cache.put(event.request.url, response.clone());
              return response;
            })
          })
        );
  } else {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then(function(response) {
          return response || fetch (event.request);
      })
    )
  }
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'icon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('football-App', options)
  );
});*/
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
    console.log(`Workbox berhasil dimuat`);
} else {
    console.log(`Workbox gagal dimuat`);
}
workbox.precaching.precacheAndRoute([
 
  { url: '/nav.html', revision: '5' },
  { url: '/index.html', revision: '5' },
  { url: '/article.html', revision: '5' },
  { url: '/css/materialize.min.css', revision: '5' },
  { url: '/js/materialize.min.js', revision: '5' },
  { url: '/js/nav.js', revision: '5' },
  { url: '/js/api.js', revision: '5' },
  { url: '/js/idb.js', revision: '5' },
  { url: '/js/db.js', revision: '5' },
  { url: '/js/script.js', revision: '5' },
  { url: '/pages/about.html', revision: '5' },
  { url: '/pages/home.html', revision: '5' },
  { url: '/pages/jadwal.html', revision: '5' },
  { url: '/pages/save.html', revision: '5' },
  { url: '/icon.png', revision: '5' },
  { url: '/maskable_icon.png', revision: '5' },
  { url: '/push.js', revision: '5' },
  { url: '/package.json', revision: '5' },
  { url: '/package-lock.json', revision: '5' },
  { url: '/manifest.json', revision: '5' }
  
], {
  ignoreUrlParametersMatching: [/.*/ ]
});
workbox.routing.registerRoute(
  /\.(?:png|webp|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
      cacheName: 'image-cache',
      plugins: [
          new workbox.expiration.Plugin({
              maxEntries: 60,
              maxAgeSeconds: 2592000, // 30 hari
          }),
      ],
  }),
);

workbox.routing.registerRoute(
  new RegExp('/pages/'),
  workbox.strategies.staleWhileRevalidate({
      cacheName: 'pages'
  })
);

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
  workbox.strategies.staleWhileRevalidate({
      cacheName: 'api-src'
  })
);
self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'icon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('football-App', options)
  );
});