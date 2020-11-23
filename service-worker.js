importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
    console.log(`Workbox berhasil dimuat`);
} else {
    console.log(`Workbox gagal dimuat`);
}
workbox.precaching.precacheAndRoute([
 
  { url: '/nav.html', revision: '9' },
  { url: '/index.html', revision: '9' },
  { url: '/article.html', revision: '9' },
  { url: '/css/materialize.min.css', revision: '9' },
  { url: '/js/materialize.min.js', revision: '9' },
  { url: '/js/nav.js', revision: '9' },
  { url: '/js/api.js', revision: '9' },
  { url: '/js/idb.js', revision: '9' },
  { url: '/js/db.js', revision: '9' },
  { url: '/js/script.js', revision: '9' },
  { url: '/pages/about.html', revision: '9' },
  { url: '/pages/home.html', revision: '9' },
  { url: '/pages/jadwal.html', revision: '9' },
  { url: '/pages/save.html', revision: '9' },
  { url: '/icon.png', revision: '9' },
  { url: '/maskable_icon.png', revision: '9' },
  { url: '/push.js', revision: '9' },
  { url: '/package.json', revision: '9' },
  { url: '/package-lock.json', revision: '9' },
  { url: '/manifest.json', revision: '9' },
  { url: '/css/font.css', revision: '9' },
  { url: '/css/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2', revision: '9' },
  { url: '/css/6xK-dSZaM9iE8KbpRA_LJ3z8mH9BOJvgkP8o58a-wjw3UD0.woff2', revision: '9' },
  { url: '/https://unpkg.com/snarkdown@1.0.2/dist/snarkdown.umd.js', revision: '9' },
  { url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '9' },
  
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