const idbPromised = idb.open('teamDetail', 1, upgradedDb => {
    if (!upgradedDb.objectStoreNames.contains('teams')) {
        upgradedDb.createObjectStore("teams", {keyPath: "id"});
    }
});



  function saveForLater(team) {
    idbPromised
      .then(function(db) {
        var tx = db.transaction("teams", "readwrite");
        var store = tx.objectStore("teams");
        console.log(team);
        store.put(team);
        return tx.complete;
      })
      .then(function() {
        console.log("Artikel berhasil di simpan.");
      });
  }

 
  /*function dbDelete(team){
    idbPromised
    .then(function(db) {
      var tx = db.transaction('teams', 'readwrite');
      var store = tx.objectStore('teams');
      console.log(team);
      store.delete(team);
      return tx.complete;
  })
  .then(function() {
    console.log("Team berhasil di hapus");
  })
}*/

const dbDelete = id => {
  let intId = parseInt(id);
  return new Promise((resolve, reject) => {
      idbPromised.then(db => {
          const transaction = db.transaction("teams", `readwrite`);
          var store = transaction.objectStore("teams");
          console.log(intId);
          console.log(typeof(intId));
          store.delete(intId);
          return transaction;
      }).then(transaction => {
          if (transaction.complete) {
              resolve(true)
          } else {
              reject(new Error(transaction.onerror))
          }
      })
      .then(function() {
        console.log("Team berhasil di hapus");
      })
  })
};

function getAll() {
  return new Promise(function(resolve, reject) {
    idbPromised
      .then(function(db) {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.getAll();
      })
      .then(function(teams) {
        resolve(teams);
      });
  });
}

function getById(id) {
  let intId = parseInt(id);
  return new Promise(function(resolve, reject) {
    idbPromised
      .then(function(db) {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.get(intId);
      })
      .then(function(team) {
        resolve(team);
      });
  });
}


