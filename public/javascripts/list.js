let btnsSuccess = document.getElementsByClassName("btn-success");
let btnDel = document.getElementsByClassName("btn-danger")[0];

let checkedButtons = 0;

for (btnSuccess of btnsSuccess) {
  btnSuccess.onclick = successClick;
}

btnDel.onclick = delClick;

function successClick(event) {
  
  // pass color to green

  let btn = event.target;

  let div = document.getElementById(btn.id.substring(0, btn.id.length - 8));

  if (div.className.includes('alert-success')) {
    //cas ou on passe en mode unchecked

    div.setAttribute("class", div.className.replace("alert-success", "alert-dark"));
    btn.innerHTML = 'Check';
    btn.setAttribute("class", btn.className.replace("btn-warning", "btn-success"));
    checkedButtons--;
    //si il ne reste plus de boutons checked on l'enleve
    if (checkedButtons == 0) {
      btnDel.setAttribute("class", btnDel.className.replace("btn-block", "d-none"));
    }

  } else {
    //cas ou on passe en mode checked

    div.setAttribute("class", div.className.replace("alert-dark", "alert-success"));
    btn.innerHTML = 'Uncheck';
    btn.setAttribute("class", btn.className.replace("btn-success", "btn-warning"));
    checkedButtons++;

    btnDel.setAttribute("class", btnDel.className.replace("d-none", "btn-block"));

  }

}

function checkDeleteMode() {

}

function delClick(event) {

  let btn = event.target;
  
  // delete from database
  console.log(btn.id);

}