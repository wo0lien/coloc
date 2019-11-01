let btnsSuccess = document.getElementsByClassName("btn-check");
let btnDel = document.getElementById("btnDelete");
let btnAdd = document.getElementById("btnAdd");
let btnConfirm = document.getElementById("confirmDeleteConfirmButton");
let btnSubmitAdd = document.getElementById("SubmitAddForm");

let serverUrl  = window.location.href.substring(0, window.location.href.length - 5);

let checkedDivs = [];

for (btnSuccess of btnsSuccess) {
  btnSuccess.onclick = successClick;
}

btnConfirm.onclick = confirmClick;
btnSubmitAdd.onclick = submitAddClick;

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
    //si il ne reste plus de boutons checked on l'enleve
    if (checkedDivs.length == 0) {
      btnDel.setAttribute("class", btnDel.className.replace("btn-block", "d-none"));
      btnAdd.setAttribute("class", btnAdd.className.replace("d-none", "btn-block"));
    }

  } else {
    //cas ou on passe en mode checked

    div.setAttribute("class", div.className.replace("alert-dark", "alert-success"));
    btn.innerHTML = 'Uncheck';
    btn.setAttribute("class", btn.className.replace("btn-primary", "btn-warning"));
    checkedDivs.push(div.id);

    btnDel.setAttribute("class", btnDel.className.replace("d-none", "btn-block"));
    btnAdd.setAttribute("class", btnAdd.className.replace("btn-block", "d-none"));
  }

}

function confirmClick(event) {

  //transmet le tableau des elements a enlever a l'API

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  console.log(checkedDivs)

  let dataTransmited = {
    'id': checkedDivs
  };

  fetch(serverUrl + '/db/remove', {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(dataTransmited)
  })
    .then((res) => { 
      console.log(res);
      
      // mise a jour des element en enlevant ceux qui ne sont plus dans la liste

      checkedDivs.forEach(divid => {
        document.getElementById(divid).remove();
      });

      //on reset checked divs et on fait disparaitre le bouton delete
      checkedDivs = [];
      btnDel.setAttribute("class", btnDel.className.replace("btn-block", "d-none"));
      btnAdd.setAttribute("class", btnAdd.className.replace("d-none", "btn-block"));

    })
    .catch((error) => { console.log(error) })

}

function submitAddClick(event) {
  var qt = document.getElementById("InputQuantite").value;
  var name = document.getElementById("InputName").value;

  console.log(name);
  console.log(qt);

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
    .then((res) => {

      console.log(res);
      
      //reload page plus simple que de recréer un element html a plusieurs niveaux

      document.location.reload(true);

    })
    .catch((error) => { console.log(error) })
}