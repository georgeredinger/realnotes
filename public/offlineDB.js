//offline DB

if (!window.indexedDB) {
  window.alert("Your browser doesn't support IndexedDB.");
}
var dbPromise;
var keyValStore;
var offlineStore;
// var siteIndex;
var dbName = 'realNotes';

var dbPromise = idb.open(dbName, 1,
  function (upgradeDb) {
    upgradeDb.createObjectStore(dbName);
    notestore = upgradeDb.transaction.objectStore(dbName);
    notestore.createIndex('siteId', dbName);
    offlineGetAll();
  }).then(function (db) {
  console.log(`DB ${dbName} opened ${dbPromise}`);
  offlineGetAll(dbPromise);

});



//https://gist.github.com/barbietunnie/02122ecfbd4c5dda060a57e825686954



function offlineDBclose() {}

function offlineDBCount() {}

function offlineGet(site) {
  return idb.open(dbName, 1, upgradeDB => {
    upgradeDB.createObjectStore(dbName);
    switch (upgradeDB.oldVersion) {
      case 0:
        upgradeDB.createObjectStore(dbName);
    }
  }).then(db => {
    var tx = db.transaction(dbName);
    var keyValStore = tx.objectStore(dbName);
    return keyValStore.get(site);
  });
}

function offlinePut(site, object) {
  idb.open(dbName, 1, upgradeDB => {
    upgradeDB.createObjectStore(dbName);
    switch (upgradeDB.oldVersion) {
      case 0:
        upgradeDB.createObjectStore(dbName);
    }
  }).then(db => {
    var tx = db.transaction(dbName, 'readwrite');
    var keyValStore = tx.objectStore(dbName);
    keyValStore.put(object, site);
    return tx.complete;
  }).then(function () {
    console.log('Added', site, 'to ', object);
  });
}


function offlineRm() {}

function offlineGetAll(dbPromise) {
  idb.open(dbName, 1, upgradeDB => {
    upgradeDB.createObjectStore(dbName);
    switch (upgradeDB.oldVersion) {
      case 0:
        upgradeDB.createObjectStore(dbName);
    }
  }).then(db => {
    const tx = db.transaction(dbName);
    const store = tx.objectStore(dbName);
    const keys = [];

    store.getAllKeys().
    then(
      function (result) {
        updateOfflineStatus(result);
      }
    );
  });
}