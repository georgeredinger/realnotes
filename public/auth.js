// auth.js
var theUser = firebase.auth().currentUser;
let logoutId = document.getElementById("logout");
logoutId.onclick = logout;


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

  function logout() {
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
      location.reload();
    }).catch(function (error) {
      // An error happened.
    });
  }
