// database.js


firebase.initializeApp({
    apiKey: 'AIzaSyDjRk2i7KKUNle65LnUYcTUqeRzb9I4aWM',
    authDomain: '### FIREBASE AUTH DOMAIN ###',
    projectId: 'realnotes-3f4f4'
  });

  var db = firebase.firestore();
  var notesRef = db.collection("site");

  firebase.firestore().enablePersistence()
    .then(function () {
      // Initialize Cloud Firestore through firebase
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

    // function storeSite(siteId, data)
    // function loadSite(siteId, data)

    function loadSite(id){
      var noteReaderRef = db.collection("site").doc(id);
      let place = noteReaderRef.get();
      return place;
    }