// onoffline.js

if (navigator.onLine) {
    document.body.style.backgroundColor = "LightGreen";
} else {
    document.body.style.backgroundColor = "LightPink";
}

window.addEventListener('online', function (e) {
    // Re-sync data with server.
    document.body.style.backgroundColor = "LightGreen";
}, false);

window.addEventListener('offline', function (e) {
    // Queue up events for server.
    document.body.style.backgroundColor = "LightPink";
}, false);