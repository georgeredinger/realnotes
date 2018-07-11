// locatation.js
var location;
location.lat = 0;
location.longitude = 0;

function logLocation(x, y) {
    location.lat = x;
    location.lng = y;
}

if ("geolocation" in navigator) {
    console.log("Geolocation Available");
    navigator.geolocation.getCurrentPosition(function (position) {
        logLocation(position.coords.latitude, position.coords.longitude);
        location.lat = position.coords.latitude;
        location.lng = position.coords.longitude;
        console.log("Geolocation Available", location);

    });
} else {
    console.log("Geolocation not Available");
}