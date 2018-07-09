var location;
location.lat = 0;
location.longitude = 0;



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

  var theUser = firebase.auth().currentUser;

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

  let saveId = document.getElementById("save");
  saveId.onclick = saveForm;
  var notesRef = db.collection("site");

  let loadId = document.getElementById("load");
  loadId.onclick = loadForm;

  let logoutId = document.getElementById("logout");
  logoutId.onclick = logout;

  function logout() {
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
      location.reload();
    }).catch(function (error) {
      // An error happened.
    });
  }

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
    console.log("success ", ret);
  }

  function failure(ret) {
    console.log("failure ", ret);

  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(
      'sw.js', {}
    ).then(success, failure);
  }
  console.log(theUser);



  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      theUser = user;
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // ...
    } else {
      // User is signed out.
      // ...
      var ui = new firebaseui.auth.AuthUI(firebase.auth());

      if (!theUser) {
        ui.start('#firebaseui-auth-container', {
          signInSuccessUrl: 'index.html',
          signInOptions: [{
            provider: firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD,
            requireDisplayName: false
          }]
        });

      }
    }
  });
