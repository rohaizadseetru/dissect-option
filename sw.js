// Preview build only: this static copy gets redeployed often, and the real
// PWA service worker's precache would serve stale assets/pages to repeat
// visitors after each redeploy. Self-unregister and clear any caches instead
// of installing a cache, matching the Luqman/property preview's own fix.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      self.registration.unregister(),
      caches.keys().then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
    ]).then(() => self.clients.matchAll()).then((clients) => {
      clients.forEach((client) => client.navigate(client.url));
    })
  );
});
