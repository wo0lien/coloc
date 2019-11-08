let serverUrl = window.location.href.substring(0, window.location.href.length - 9); // 9 = /shoplist length

let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var checkedDivs = [];

//------------------------VUE JS----------------------------

const vueApp = new Vue({
  el: '#vapp',
  created() {

    //get data to populate the page
    fetch(serverUrl + "/product")
      .then(res => res.json())
      .then(function (json) {
        vueApp.loading = false;
        vueApp.products = json;
      })
      .catch(err => console.log(err))
  },
  data: {
    products: [],
    loading: true
  },
  methods: {

    //handle click on the login button
    login: function (event) {

      let fetchData = {
        'logusername': $('#InputUsername').val(),
        'logpassword': $('#InputPassword').val()
      };
      //get data to populate the page
      fetch(serverUrl + '/user/login', {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(fetchData)
      })
        .then((res) => console.log(res.status))
        .catch((error) => { console.log(error) })
    },

    //handle click on check button
    check: function (event) {

      let btn = event.target;
      let div = btn.parentElement.parentElement.parentElement;
      if (div.className.includes("alert-success")) {
        uncheckProduct(btn);
      } else {
        checkProduct(btn);
      }

    },

    //handle click on delete button
    deleteProducts: function (event) {

      let fetchData = {
        'ids': checkedDivs
      };
      //get data to populate the page
      fetch(serverUrl + '/product/delete', {
        method: 'DELETE',
        headers: myHeaders,
        body: JSON.stringify(fetchData)
      })
        .catch((error) => { console.log(error) })
    },

    //handle click on Add button
    addProduct: function (event) {

      var qt = document.getElementById("InputQuantite").value;
      var name = document.getElementById("InputName").value;
      
      let fetchData = {
        'name': name,
        'quantity': Number(qt) 
      }

      //get data to populate the page
      fetch(serverUrl + '/product/create', {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(fetchData)
      })
        .catch((error) => { console.log(error) })
    },
    checkAll: function (event) {

      let btnEvent = event.target
      let btns = document.getElementsByClassName("btn-check");
      
      //on check le mode du bouton check all

      if (btnEvent.className.includes("btn-primary")) {

        //on passe tout les items en checked
        let btns = document.getElementsByClassName("btn-check");
        for (btn of btns) {
          checkProduct(btn);
        }

        //on passe le bouton en mode uncheck all

        btnEvent.setAttribute("class", btnEvent.className.replace("btn-primary", "btn-warning"));
        btnEvent.innerHTML = "Uncheck all"
      
      } else {

        //on passe tout les items en mode unchecked

        for (btn of btns) {
          uncheckProduct(btn);
        }

        //on passe le bouton en mode check all

        btnEvent.setAttribute("class", btnEvent.className.replace("btn-warning", "btn-primary"));
        btnEvent.innerHTML = "Check all"

      }
    }
  }
})

//----------------SOCKET IO FUNCTIONS-----------------------

var socket = io();

// sample function just for tests

socket.on('coucou', function () {
  alert('coucou');
});

socket.on('DeleteProduct', function (product) {
 
  vueApp.products.forEach((el, index) => {
    if ( el._id == product._id ) {
      vueApp.products.splice(index, 1);
    }
  });

  // on reset le data encore présent
  checkedDivs = [];

  let btns = document.getElementsByClassName("btn-check");

  for (btn of btns) {
    uncheckProduct(btn);
  }
});

socket.on('CreateProduct', function (product) {
  // product = JSON.parse(product);
  vueApp.products.push(product);
});

//-----------------BASIC FUNCTIONS-------------------------

function uncheckProduct(btn) {

  //cas ou on passe en mode unchecked

  let div = btn.parentElement.parentElement.parentElement;

  if (div.className.includes("alert-success")) {

    div.setAttribute("class", div.className.replace("alert-success", "alert-dark"));

    btn.innerHTML = 'Check';
    btn.setAttribute("class", btn.className.replace("btn-warning", "btn-primary"));

    checkedDivs.splice(checkedDivs.indexOf(div.id), 1);

    //si il ne reste plus de boutons checked on l'enleve sauf si il faut udpate
    if (checkedDivs.length == 0) {

      $("#btnDelete").attr("class", $("#btnDelete").attr("class").replace("btn-block", "d-none"));
      $("#btnAdd").attr("class", $("#btnAdd").attr("class").replace("d-none", "btn-block"));
      
      if ($("#btnCheckAll").attr("class").includes("btn-warning")) {
        $("#btnCheckAll").attr("class", $("#btnCheckAll").attr("class").replace("btn-warning", "btn-primary"));
        $("#btnCheckAll").html('Check All');
      }
    }
  }
}

function checkProduct(btn) {

  let div = btn.parentElement.parentElement.parentElement;

  if (div.className.includes("alert-dark")) {
      //cas ou on passe en mode checked

      div.setAttribute("class", div.className.replace("alert-dark", "alert-success"));

      btn.innerHTML = 'Uncheck';
      btn.setAttribute("class", btn.className.replace("btn-primary", "btn-warning"));

      checkedDivs.push(div.id);

      $("#btnDelete").attr("class", $("#btnDelete").attr("class").replace("d-none", "btn-block"));
      $("#btnAdd").attr("class", $("#btnAdd").attr("class").replace("btn-block", "d-none"));
  }
}