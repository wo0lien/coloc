let serverUrl = window.location.href.substring(0, window.location.href.length - 9); // 9 = /shoplist length

let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var checkedDivs = [];

const vueApp = new Vue({
  el: '#vapp',
  created() {

    //get data to populate the page
    fetch(serverUrl + "/product")
      .then(res => res.json())
      .then(function (json) {
        vueApp.loading = false;
        vueApp.products = json;
        console.log("fetched data");
      })
      .catch(err => console.log(err))
  },
  data: {
    products: [],
    loading: true
  },
  methods: {

    //handle click on check button
    check: function (event) {

      let btn = event.target;
      //on recupere la div 3 couches plus haute
      let div = event.target.parentElement.parentElement.parentElement;

      if (div.className.includes('alert-success')) {
        //cas ou on passe en mode unchecked

        div.setAttribute("class", div.className.replace("alert-success", "alert-dark"));

        btn.innerHTML = 'Check';
        btn.setAttribute("class", btn.className.replace("btn-warning", "btn-primary"));

        checkedDivs.splice(checkedDivs.indexOf(div.id), 1);

        //si il ne reste plus de boutons checked on l'enleve sauf si il faut udpate
        if (checkedDivs.length == 0) {

          $("#btnDelete").attr("class", $("#btnDelete").attr("class").replace("btn-block", "d-none"));
          $("#btnAdd").attr("class", $("#btnAdd").attr("class").replace("d-none", "btn-block"));

        }

      } else {
        //cas ou on passe en mode checked

        div.setAttribute("class", div.className.replace("alert-dark", "alert-success"));

        btn.innerHTML = 'Uncheck';
        btn.setAttribute("class", btn.className.replace("btn-primary", "btn-warning"));

        checkedDivs.push(div.id);

        $("#btnDelete").attr("class", $("#btnDelete").attr("class").replace("d-none", "btn-block"));
        $("#btnAdd").attr("class", $("#btnAdd").attr("class").replace("btn-block", "d-none"));
      }

    },
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
    }
  }
})

var socket = io();

// sample function just for tests

socket.on('coucou', function () {
  alert('coucou');
});

socket.on('DeleteProduct', function (product) {

  product = JSON.parse(product);  
  console.log(product._id);
  vueApp.products.forEach((el, index) => {
    if ( el._id == product._id ) {
      vueApp.products.splice(index, 1);
    }
  });

  checkedDivs.splice(checkedDivs.indexOf(product._id));
});