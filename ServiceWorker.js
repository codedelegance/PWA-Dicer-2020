const VERSION = 'v1.00.4';

const cacheResources = async () => {
    const cacheFilesFirst = [
        './',
        './public/views/index.ejs',
        './public/views/header.ejs',
        './public/views/footer.ejs',
        './public/css/overrides.css',
        './public/javascripts/main.js',
        './public/javascripts/EventHandler.js',
        './public/images/favicon.ico',
        './public/images/d20.png',
        './public/images/dices.png',
        './public/fonts/Uncial_Antiqua.woff2'
    ];
    const cache = await caches.open(VERSION);
    return cache.addAll(cacheFilesFirst);
};

self.addEventListener('install', async (event) => {
    event.waitUntil(cacheResources());
    await self.skipWaiting();
});

const cachedResource = async (request) => {
    const cache = await caches.open(VERSION);
    return await cache.match(request);
};

self.addEventListener('activate', async (event) => {
    console.log(`SW activated:  ${event}`);
    await self.clients.claim();
});

self.addEventListener('fetch', async (event) => {
    console.log(`Fetch event: ${event.request.url}`);
    await event.respondWith(cachedResource(event.request));
});

self.addEventListener('push', async (event) => {

});

self.addEventListener('sync', async (event) => {

});