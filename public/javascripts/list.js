let btnsSuccess = document.getElementsByClassName("btn-success");
let btnsDel = document.getElementsByClassName("btn-danger");

for (btnSuccess of btnsSuccess) {
  btnSuccess.onclick = successClick;
}

for (btnDel of btnsDel) {
  btnDel.onclick = delClick;
}

function successClick(event) {
  
  // pass color to green

  let btn = event.target;
  
  console.log(btn.id.substring(0, btn.id.length - 8));
  console.log(btn.id);

  let div = document.getElementById(btn.id.substring(0, btn.id.length - 8));

  if (div.className.includes('alert-success')) {
    div.setAttribute("class", "alert alert-dark row");
    btn.innerHTML = 'Check';
    btn.setAttribute("class", "btn btn-success mr-3 mr-sm-0");
  } else {
    div.setAttribute("class", "alert alert-success row");
    btn.innerHTML = 'Uncheck';
    btn.setAttribute("class", "btn btn-warning mr-3 mr-sm-0");
  }
  console.log("updated");

}

function delClick(btn) {
  
  // delete from database
  let div = document.getElementById(btn.id.substring(0, btn.id.length - 4));
  
  console.log(btn.id.substring(0, btn.id.length - 4));
  console.log(btn.id);

  

}