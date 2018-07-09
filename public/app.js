"use strict ";
/*jshint esversion: 6 */
var location;
location.lat = 0;
location.longitude = 0;
console.log("loading service worker")
firebase.initializeApp({
  apiKey: 'AIzaSyDjRk2i7KKUNle65LnUYcTUqeRzb9I4aWM',
  authDomain: '### FIREBASE AUTH DOMAIN ###',
  projectId: 'realnotes-3f4f4'
});
var db = firebase.firestore();
firebase.firestore().enablePersistence()
  .then(function () {
    // Initialize Cloud Firestore through firebase
    var db = firebase.firestore();
  })
  .catch(function (err) {
    if (err.code == 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
    } else if (err.code == 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
    }
  });

  function logLocation(x,y){
    location.lat = x;
    location.lng = y;
  }

if ("geolocation" in navigator) {
  console.log("Geolocation Available");
  navigator.geolocation.getCurrentPosition(function(position) {
    logLocation(position.coords.latitude, position.coords.longitude);
    location.lat = position.coords.latitude;
    location.lng = position.coords.longitude;
    console.log("Geolocation Available",location);

  });
} else {
  console.log("Geolocation not Available");
}

let saveId = document.getElementById("save");
saveId.onclick = saveForm;
var notesRef = db.collection("site");

let loadId = document.getElementById("load");
loadId.onclick = loadForm;
var site = "123456700";
notesRef.doc(site).set({
  name: "Smooth Water",
  state: "CA",
  type: "surface",
  notes: "soaking my toes in deep water"
});

function saveForm() {
  let textId = document.getElementById("notes");
  let siteId = document.getElementById("siteId");
  let siteNumber = siteId.value;
  let notes = textId.value;
  let date = new Date();
  var timeStamp = date.toISOString();
  let saveme = {
    siteId: siteNumber,
    notes: `${timeStamp}
    [${location.lat},${location.lng}]
     ${notes}`
  };
  notesRef.doc(siteNumber).set(saveme);
  textId.value = saveme.notes;

}

function loadForm() {
  let siteId = document.getElementById("siteId");
  let siteNumber = siteId.value;
  let textId = document.getElementById("notes");

  console.log("load this ", siteNumber);
  var noteReaderRef = db.collection("site").doc(siteNumber);
  let place = noteReaderRef.get().then(function (doc) {
    if (doc.exists) {
      console.log("Document data:", doc.data());
      let d = doc.data();
      console.log("read :", d);
      textId.value = d.notes;
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      textId.value = 'its all your notes now';

    }
  }).catch(function (error) {
    console.log("Error getting document:", error);
  });
}

function success(ret) {
  console.log("success ", ret)
}

function failure(ret) {
  console.log("failure ", ret)

}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register(
    'sw.js', {}
  ).then(success, failure);
}