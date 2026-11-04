// Preview build: no offline caching. This worker only clears anything an earlier
// build cached and unregisters itself.
self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) await caches.delete(k)
    await self.registration.unregister()
    for (const c of await self.clients.matchAll()) c.navigate(c.url)
  })())
})
