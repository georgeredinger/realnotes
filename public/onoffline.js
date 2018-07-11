// onoffline.js
var online;
function isOnline(){
    return online;
}
if (navigator.onLine) {
    document.body.style.backgroundColor = "LightGreen";
    online = true;
} else {
    document.body.style.backgroundColor = "LightPink";
    online = false;
}

window.addEventListener('online', function (e) {
    online = true;
    document.body.style.backgroundColor = "LightGreen";
    login();
}, false);

window.addEventListener('offline', function (e) {
    online = false;
    document.body.style.backgroundColor = "LightPink";
   // logout();
}, false);