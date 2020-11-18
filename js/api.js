var base_url = "https://api.football-data.org/v2/";
var token = {
  headers : {
    "X-Auth-Token": "6583ce3e388d45df8848296f0b0a5d86"
  }
}

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}



//data team
function getArticles() {
  if ("caches" in window) {
    caches.match(base_url + "teams", token).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          var articlesHTML = "";
          data.teams.forEach(function(team) {
            articlesHTML += `
            <div class="row">
            <div class="col s12 m6">
              <div class="card">
              <a href="./article.html?id=${team.id}">
                <div class="card-image">
                  <img src=${team.crestUrl}>
                </div>
              </a>
                <div class="card-content">
                    <span class="card-title">${team.name}</span>
                    <p>${team.address}</p>
                </div>
                <div class="card-action">
                  <a href="#">${team.website}</a>
                </div>
              </div>
              </div>
            </div>
          </div>
            `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("satu").innerHTML = articlesHTML;
        });
      }
    });
  }
  fetch(base_url+ 'teams',token)
    .then(status)
    .then(json)
    .then(function(data) {
      const teams=data.teams;
      console.log(teams);
      let articlesHTML = "";
      data.teams.forEach(function(team) {
        articlesHTML += `
        <div class="row">
        <div class="col s12 m6">
          <div class="card">
          <a href="./article.html?id=${team.id}">
          <div class="card-image">
            <img src=${team.crestUrl}>
          </div>
          </a>
            <div class="card-content">
                <span class="card-title">${team.name}</span>
                <p>${team.address}</p>
            </div>
            <div class="card-action">
              <a href="#">${team.website}</a>
            </div>
            
          </div>
          </div>
        </div>
      </div>
        `;
        
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById('satu').innerHTML = articlesHTML;
      
    })
    .catch(error);
}
/*----------------------------------------------------------------------------------------------------------*/
//Data API
/*----------------------------------------------------------------------------------------------------------*/

//Kedua

function grup() {
  if ("caches" in window) {
    caches.match(base_url + "competitions/2021/standings", token).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          var articlesHTML = "";
          data.standings.forEach(function(standing) {
            articlesHTML += `
            <div class="table-container">
              <h2>${standing.group}</h1>
              <table>
                  <tr>
                    <th>id</th>
                    <th>Position</th>
                    <th>Team</th>
                    <th>Win</th>
                    <th>Draw</th>
                    <th>Lost</th>
                  </tr>
          `;
          standing.table.forEach(table => {
            articlesHTML += `
                <tr>
                  <td>${table.team.id}</td>
                  <td>${table.position}</td>
                  <td>${table.team.name}</td>
                  <td>${table.won}</td>
                  <td>${table.draw}</td>
                  <td>${table.lost}</td>
                </tr>
            `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("dua").innerHTML = articlesHTML;
        });
      });
    }
  })
  }

  fetch(base_url+ 'competitions/2021/standings',token)
    .then(status)
    .then(json)
    .then(function(data) {
      const standings=data.standings;
      console.log(standings);
      let articlesHTML = "";
      data.standings.forEach(function(standing) {
        articlesHTML += `
        <div class="table-container">
          <h2>${standing.group}</h1>
          <table>
              <tr>
                <th>id</th>
                <th>Position</th>
                <th>Team</th>
                <th>Win</th>
                <th>Draw</th>
                <th>Lost</th>
              </tr>
      `;
      standing.table.forEach(table => {
        articlesHTML += `
            <tr>
              <td>${table.team.id}</td>
              <td>${table.position}</td>
              <td>${table.team.name}</td>
              <td>${table.won}</td>
              <td>${table.draw}</td>
              <td>${table.lost}</td>      
            </tr>
        `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById('dua').innerHTML = articlesHTML;
      
    })
  })
    .catch(error);
}
/*============================================================================================================

=============================================================================================================*/
//Ketiga

function teamMatch() {

  if ("caches" in window) {
    caches.match(base_url + "competitions/2021/matches?matches", token).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          var articlesHTML = "";
          data.matches.forEach(function(match) {
            articlesHTML += `
            <div class="table-container">
            
              <h6>${match.utcDate}</h6>
              <table>
                <tr>
                  <th>${match.homeTeam.name}</th>
                  <td> vs </td>
                  <th>${match.awayTeam.name}</th>
                </tr>
              </table>
            `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("tiga").innerHTML = articlesHTML;
        });
      }
    });
  }

  fetch(base_url+ 'competitions/2021/matches?matches',token)
    .then(status)
    .then(json)
    .then(function(data) {
      const matches=data.matches;
      console.log(matches);
      let articlesHTML = "";
      data.matches.forEach(function(match) {
        articlesHTML += `
        <div class="table-container">       
          <h6>${match.utcDate}</h6>
          <table>
            <tr>
              <th>${match.homeTeam.name}</th>
              <td> vs </td>
              <th>${match.awayTeam.name}</th>
            </tr>
          </table>
        `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById('tiga').innerHTML = articlesHTML;
    })
    .catch(error);
}
/*----------------------------------------------------------------------------------------------------------
Detail Team
-----------------------------------------------------------------------------------------------------------*/

function getArticleById() {
  return new Promise(function(resolve, reject) {
  // Ambil nilai query parameter (?id=)
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  if ("caches" in window) {
    caches.match(base_url + "teams/" + idParam,token).then(function(response) {
      if (response) {
        response.json().then(function(data) {
        var articleHTML =  `
        <div class="row">
        <div class="col s12 m6">
          <div class="card">
          <div class="card-image">
            <img src=${data.crestUrl}>
          </div>
            <div class="card-content">
                <span class="card-title">${data.name}</span>
                <p>${data.address}</p>
            </div>
            <div class="card-action">
              <a href="#">${snarkdown(data.website)}</a>
            </div>
          </div>
          </div>
        </div>
      </div>
        `;
        document.getElementById("body-content").innerHTML = articleHTML;
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      });
    }
  });
}
  fetch(base_url + "teams/" + idParam,token)
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek JavaScript dari response.json() masuk lewat variabel data.
      console.log(data);
      // Menyusun komponen card artikel secara dinamis
      var articleHTML = `
      <div class="row">
      <div class="col s12 m6">
        <div class="card">
        <div class="card-image">
          <img src=${data.crestUrl}>
        </div>
          <div class="card-content">
              <span class="card-title">${data.name}</span>
              <p>${data.address}</p>
          </div>
          <div class="card-action">
            <a href="#">${snarkdown(data.website)}</a>
          </div>
        </div>
        </div>
      </div>
    </div>
      `;
      document.getElementById("body-content").innerHTML = articleHTML;
      resolve(data);
    });
  })
}

/*---------------------------------------------------------------------------------------------------------
Ambil data dari dastabase
----------------------------------------------------------------------------------------------------------*/
function getSavedArticles() {
  getAll().then(function(teams) {
    console.log(teams);
    // Menyusun komponen card artikel secara dinamis
    var articlesHTML = "";
    teams.forEach(function(team) {
      //var web = team.website.substring(0,100);
      articlesHTML +=`
      <div class="row">
      <div class="col s12 m6">
        <div class="card">
        <a href="./article.html?id=${team.id}&save=true">
        <div class="card-image">
          <img src=${team.crestUrl}>
        </div>
        </a>
          <div class="card-content">
              <span class="card-title">${team.name}</span>
              <p>${team.address}</p>
          </div>
          <div class="card-action">
            <a href="#">${team.website}</a>
          </div>
          <td><button id="${team.id}" class="removeButton">Remove</button></td>
        </div>
        </div>
      </div>
    </div>
      `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("body-content").innerHTML = articlesHTML;
    let removeButtons = document.querySelectorAll(".removeButton");
    for(let button of removeButtons) {
        button.addEventListener("click", function (event) {
            let id = event.target.id;
            dbDelete(id).then(() => {
              getSavedArticles()
            })
        })
    }
    
  });
}
function getSavedArticleById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  getById(parseInt(idParam))
    .then(function (teams) {
      var articleHTML = `
    <div class="row">
    <div class="col s12 m6">
      <div class="card">
      
      <div class="card-image">
        <img src=${teams.crestUrl}>
      </div>
     
        <div class="card-content">
            <span class="card-title">${teams.name}</span>
            <p>${teams.address}</p>
        </div>
        <div class="card-action">
          <a href="#">${teams.website}</a>
        </div>
      </div>
      </div>
    </div>
  </div>
    `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = articleHTML;
  });
}

