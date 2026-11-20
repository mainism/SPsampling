/* Optional service worker for the monorail field map. Displays browser notifications while the page is running; it cannot track GPS in the background. */
self.addEventListener('install', event => { self.skipWaiting(); });
self.addEventListener('activate', event => { event.waitUntil(self.clients.claim()); });
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clients => {
    if (clients.length) return clients[0].focus();
    return self.clients.openWindow('./');
  }));
});
