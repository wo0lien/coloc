//------------------------VUE JS----------------------------

const vueApp = new Vue({
  el: '#vapp',
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
    }
  }
});