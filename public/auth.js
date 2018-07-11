// auth.js
var theUser = firebase.auth().currentUser;
let logoutId = document.getElementById("logout");
logoutId.onclick = logout;


firebase.auth().onAuthStateChanged(function (user) {
    theUser = user;
    if (user) {
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
      login();
    };
});

function logout() {
  firebase.auth().signOut().then(function () {
    // Sign-out successful.
    location.reload();
  }).catch(function (error) {
    // An error happened.
  });
}

function login() {
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