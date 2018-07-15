 //app.js
  let saveId = document.getElementById("save");
  saveId.onclick = saveForm;

  let loadId = document.getElementById("load");
  loadId.onclick = loadForm;

  function saveForm() {
    let textId = document.getElementById("notes");
    let siteId = document.getElementById("siteId");
    let siteNumber = siteId.value;
    let notes = textId.value;
    let date = new Date();
    var timeStamp = date.toISOString();


    // if offline and unauthenticated
    if(theUser == null){
      theUser = {}; 
      theUser.email = 'offline.email.com';
    }
    let saveme = {
      siteId: siteNumber,
      notes: `${timeStamp}
    [${location.lat},${location.lng}]
     ${theUser.email}
     ${notes}`
    };
    notesRef.doc(siteNumber).set(saveme);
    textId.value = saveme.notes;
    offlinePut(siteNumber, saveme);
   // function storeSite(siteId, data)
  }

  function loadForm() {
    let siteId = document.getElementById("siteId");
    let siteNumber = siteId.value;
    let textId = document.getElementById("notes");

    loadSite(siteNumber).then(function (doc) {
// if offline and unauthenticated



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
       // function loadSite(siteId, data)

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
 