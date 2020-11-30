export const register = () => {
  if (navigator.serviceWorker) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log(registration);
        })
        .catch((reasion) => {
          console.log(reasion);
        });
    });
  }
};

const CACHE_NAME = 'shell_cache_v1';

self.addEventListener('install', (event) => {
  const mainifest = [
    '/locales/cn/auth.json',
    '/locales/en/auth.json',
    '/static/css/*.css',
    '/static/js/*.js',
  ];
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      cache.addAll(mainifest);
    }),
  );
});

self.addEventListener('active', (event) => {
  const cacheList = ['shell_cache_v1'];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheList.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});

self.addEventListener('fetch', (event) => {
  console.log(event.respondWith);
  console.log(event.request);
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      const fetchResquest = event.request.clone();
      return fetch(fetchResquest).then((response) => {
        if (
          !response ||
          response.status !== 200 ||
          response.type !== 'basic'
        ) {
          return response;
        }
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      });
    }),
  );
});
