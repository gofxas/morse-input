const WEB_CACHED = "Morseinput-web-cache";
const CACHE_LIST = [
  "/index.html",
  "/morse.js",
  "/logo.192.png",
  "/logo.512.png",
  "/bg.png",
];
self.addEventListener("activate", function (event) {
  console.log("ServiceWorker activated.");
});

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(WEB_CACHED).then(function (cache) {
      return cache.addAll(CACHE_LIST);
    })
  );
});

self.addEventListener("fetch", (e) => {});
