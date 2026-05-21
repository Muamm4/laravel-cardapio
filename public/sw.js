const CACHE_NAME = 'cardapio-cache-v1';
const STATIC_ASSETS = [
    '/',
    '/manifest.json',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(STATIC_ASSETS);
        }).then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // 1. Guard Clause: Skip non-GET requests, WebSockets, and browser extensions
    if (
        event.request.method !== 'GET' ||
        !url.protocol.startsWith('http') ||
        url.protocol === 'ws:' ||
        url.protocol === 'wss:'
    ) {
        return;
    }

    // 2. Guard Clause: Skip Vite internal HMR requests
    if (url.pathname.startsWith('/@vite') || url.pathname.includes('node_modules')) {
        return;
    }

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }

            return fetch(event.request).then((fetchResponse) => {
                // Ensure valid response and exclude opaque status (0) or errors
                if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
                    return fetchResponse;
                }

                const responseToCache = fetchResponse.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });

                return fetchResponse;
            }).catch(() => {
                // Fallback policy when network fails and asset is missing from cache
                if (event.request.mode === 'navigate') {
                    return caches.match('/');
                }
            });
        })
    );
});