let btnsSuccess = document.getElementsByClassName("btn-check");
let btnDel = document.getElementById("btnDelete");
let btnAdd = document.getElementById("btnAdd");
let btnUpdate = document.getElementById("btnUpdate");
let btnConfirm = document.getElementById("confirmDeleteConfirmButton");
let btnSubmitAdd = document.getElementById("SubmitAddForm");

let serverUrl = window.location.href.substring(0, window.location.href.length - 5);

var socket = io();

socket.on('updatePage', function () {
  
  btnDel.setAttribute("class", btnDel.className.replace("btn-block", "d-none"));
  btnAdd.setAttribute("class", btnAdd.className.replace("btn-block", "d-none"));
  btnUpdate.setAttribute("class", btnUpdate.className.replace("d-none", "btn-block"));

});

socket.on('coucou', function () {
  alert('coucou');
});

let checkedDivs = [];

for (btnSuccess of btnsSuccess) {
  btnSuccess.onclick = successClick;
}

btnConfirm.onclick = confirmClick;
btnSubmitAdd.onclick = submitAddClick;
btnUpdate.onclick = reloadPage;

function successClick(event) {

  // pass color to green

  let btn = event.target;

  let div = document.getElementById(btn.id.substring(0, btn.id.length - 8));

  if (div.className.includes('alert-success')) {
    //cas ou on passe en mode unchecked

    div.setAttribute("class", div.className.replace("alert-success", "alert-dark"));
    
    btn.innerHTML = 'Check';
    btn.setAttribute("class", btn.className.replace("btn-warning", "btn-primary"));
    
    checkedDivs.pop(div.id);

    //si il ne reste plus de boutons checked on l'enleve sauf si il faut udpate
    if (checkedDivs.length == 0 && btnUpdate.className.includes('d-none')) {
    
      btnDel.setAttribute("class", btnDel.className.replace("btn-block", "d-none"));
      btnAdd.setAttribute("class", btnAdd.className.replace("d-none", "btn-block"));
    
    }

  } else {
    //cas ou on passe en mode checked

    div.setAttribute("class", div.className.replace("alert-dark", "alert-success"));
    
    btn.innerHTML = 'Uncheck';
    btn.setAttribute("class", btn.className.replace("btn-primary", "btn-warning"));
    
    checkedDivs.push(div.id);
    
    if (btnUpdate.className.includes('d-none')) {
      
      btnDel.setAttribute("class", btnDel.className.replace("d-none", "btn-block"));
      btnAdd.setAttribute("class", btnAdd.className.replace("btn-block", "d-none"));
    
    }
  }

}

function confirmClick(event) {

  //transmet le tableau des elements a enlever a l'API

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let dataTransmited = {
    'id': checkedDivs
  };

  fetch(serverUrl + '/db/remove', {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(dataTransmited)
  })
    .then((res) => { socket.emit('elementRemoved') })
    .catch((error) => { console.log(error) })

}

function submitAddClick(event) {
  var qt = document.getElementById("InputQuantite").value;
  var name = document.getElementById("InputName").value;

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let dataTransmited = {
    'ingredients': [name],
    'quantites': [qt]
  };

  fetch(serverUrl + '/db/add', {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(dataTransmited)
  })
    .then((res) => { socket.emit('elementAdded') })
    .catch((error) => { console.log(error) })
}

function reloadPage() {
  window.location.reload();
}