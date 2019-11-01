let btnsSuccess = document.getElementsByClassName("btn-success");
let btnDel = document.getElementsByClassName("btn-danger")[0];
let btnConfirm = document.getElementById("confirmDeleteConfirmButton");

let checkedDivs = [];

for (btnSuccess of btnsSuccess) {
  btnSuccess.onclick = successClick;
}

btnDel.onclick = delClick;
btnConfirm.onclick = confirmClick;

function successClick(event) {
  
  // pass color to green

  let btn = event.target;

  let div = document.getElementById(btn.id.substring(0, btn.id.length - 8));

  if (div.className.includes('alert-success')) {
    //cas ou on passe en mode unchecked

    div.setAttribute("class", div.className.replace("alert-success", "alert-dark"));
    btn.innerHTML = 'Check';
    btn.setAttribute("class", btn.className.replace("btn-warning", "btn-success"));
    checkedDivs.pop(div.id);
    //si il ne reste plus de boutons checked on l'enleve
    if (checkedDivs.length == 0) {
      btnDel.setAttribute("class", btnDel.className.replace("btn-block", "d-none"));
    }

  } else {
    //cas ou on passe en mode checked

    div.setAttribute("class", div.className.replace("alert-dark", "alert-success"));
    btn.innerHTML = 'Uncheck';
    btn.setAttribute("class", btn.className.replace("btn-success", "btn-warning"));
    checkedDivs.push(div.id);

    btnDel.setAttribute("class", btnDel.className.replace("d-none", "btn-block"));
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

    fetch('http://localhost:3000/db/remove', {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(dataTransmited)
    })
       .then((res) => { console.log(res) })
       .catch((error) => { console.log(error) })

    //il faudrait mettre a jour la page à ce moment la ou juste reload
}

function delClick(event) {

  let btn = event.target;
  
  // delete from database
  console.log(btn.id);

}