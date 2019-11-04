let serverUrl = window.location.href.substring(0, window.location.href.length - 9); // 9 = /shoplist length

let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

//get data to populate the page

fetch(serverUrl + "/product")
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.log(err))

var socket = io();

// sample function just for tests

socket.on('coucou', function () {
  alert('coucou');
});