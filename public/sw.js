"use strict ";
console.log("wat! I am a service worker");

var cacheName = 'shell-content';
var filesToCache = [
  'styles.css',
  'app.js',
  'index.html',
  '/',
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
 
});


this.addEventListener('install', function (event) {
    console.log("whoo who, install event in service worker");
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
          console.log('[ServiceWorker] Caching app shell');
          return cache.addAll(filesToCache);
        })
      );
});