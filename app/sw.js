// Минимален, безопасен service worker – без агресивен кеш

self.addEventListener('install', (event) => {
  // Активиране веднага
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Claim-ва всички клиенти
  event.waitUntil(self.clients.claim());
});

// По желание – пасивен fetch (не кешира нищо)
self.addEventListener('fetch', (event) => {
  // Просто пуска заявките да минават нормално
});
