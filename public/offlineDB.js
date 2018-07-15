//offline DB

if (!window.indexedDB) {
  window.alert("Your browser doesn't support IndexedDB.");
}
var dbPromise;
var keyValStore;
var offlineStore;
var siteIndex;
var dbName = 'realNotes';

var dbPromise = idb.open(dbName, 1, function (upgradeDb) {
  if (upgradeDb.oldVersion == 0) {
    noteStore = upgradeDb.createObjectStore(dbName);
    noteStore.createIndex(dbName, 'siteId');
  } else {
    noteStore = upgradeDb.transaction.objectStore(dbName);
  }
  siteIndex = noteStore.createIndex(dbName, 'siteId');
});



//https://gist.github.com/barbietunnie/02122ecfbd4c5dda060a57e825686954



function offlineDBclose() {}

function offlineDBCount() {}

function offlineGet(site) {
  dbPromise.then(function (db) {
    var tx = db.transaction(dbName);
    var keyValStore = tx.objectStore(dbName);
    return keyValStore.get(site);
  }).then(function (val) {
    console.log('The value of "site" is:', val);
  });
}

function offlinePut(site, object) {
  dbPromise.then(function (db) {
    var tx = db.transaction(dbName, 'readwrite');
    var keyValStore = tx.objectStore(dbName);
    keyValStore.put(object, site);
    return tx.complete;
  }).then(function () {
    console.log('Added', site, 'to ', object);
  });
  dbPromise.then(db => {
    return db.transaction(dbName).objectStore(dbName).getAll();
  }).then(function (allObjs) {
    console.log("saved keys ",allObjs);
    console.log("saved key count ",allObjs.length);
    console.log("if online, shoot them to firestore");
    console.log("if just gone online, verify that they should be sent to firestore");
    //after each site sent to firestore, delete the local storage for that site
  });
}


function offlineRm() {}













// set "foo" to be "bar" in "keyval"


// dbPromise.then(function(db) {
//   var tx = db.transaction('keyval', 'readwrite');
//   var keyValStore = tx.objectStore('keyval');
//   keyValStore.put('cat', 'favoriteAnimal');
//   return tx.complete;
// }).then(function() {
//   console.log('Added favoriteAnimal:cat to keyval');
// });

// // add people to "people"
// dbPromise.then(function(db) {
//   var tx = db.transaction('people', 'readwrite');
//   var peopleStore = tx.objectStore('people');

//   peopleStore.put({
//     name: 'Sam Munoz',
//     age: 25,
//     favoriteAnimal: 'dog'
//   });

//   peopleStore.put({
//     name: 'Susan Keller',
//     age: 34,
//     favoriteAnimal: 'cat'
//   });

//   peopleStore.put({
//     name: 'Lillie Wolfe',
//     age: 28,
//     favoriteAnimal: 'dog'
//   });

//   peopleStore.put({
//     name: 'Marc Stone',
//     age: 39,
//     favoriteAnimal: 'cat'
//   });

//   return tx.complete;
// }).then(function() {
//   console.log('People added');
// });

// // list all cat people
// dbPromise.then(function(db) {
//   var tx = db.transaction('people');
//   var peopleStore = tx.objectStore('people');
//   var animalIndex = peopleStore.index('animal');

//   return animalIndex.getAll('cat');
// }).then(function(people) {
//   console.log('Cat people:', people);
// });

// // people by age
// dbPromise.then(function(db) {
//   var tx = db.transaction('people');
//   var peopleStore = tx.objectStore('people');
//   var ageIndex = peopleStore.index('age');

//   return ageIndex.getAll();
// }).then(function(people) {
//   console.log('People by age:', people);
// });

// // Using cursors
// dbPromise.then(function(db) {
//   var tx = db.transaction('people');
//   var peopleStore = tx.objectStore('people');
//   var ageIndex = peopleStore.index('age');

//   return ageIndex.openCursor();
// }).then(function(cursor) {
//   if (!cursor) return;
//   return cursor.advance(2);
// }).then(function logPerson(cursor) {
//   if (!cursor) return;
//   console.log("Cursored at:", cursor.value.name);
//   // I could also do things like:
//   // cursor.update(newValue) to change the value, or
//   // cursor.delete() to delete this entry
//   return cursor.continue().then(logPerson);
// }).then(function() {
//   console.log('Done cursoring');
// });