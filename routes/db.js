var express = require('express');
var router = express.Router();
var Ingredient = require('../app/models/ingredient');

//liste des expressions que l'on peut enlever dans les ingredients
let qtTypes = ['g de '];

router.post('/', function (req, res, next) {

  //need to add some test if the req.body is not as expected
  //improve here

  let names  = req.body.ingredients;
  let types = Array(names.length);
  let quantites = req.body.quantite;

  names.forEach((name, index) => {
    
    //inspection de l'ingredient
    
    //on enleve les espaces en trop en debut et fin de mot
    if (name.startsWith(" ")) {
      name = name.substring(1);
    }
    if (name.endsWith(" ")) {
      name = name.substring(0, name.length - 2);
    }

    //on check si on trouve des chaines de caractère récurrentes
    
    qtTypes.forEach(type => {
      if (name.includes(type)) {
        name.substring(type.length - 1);
        types[index] = type;
      }
    });
    
    // on pourra en rajouter plus tard, faire un array avec une liste de mots

  });

  //adding ingredients to database
   names.forEach((name, index) => {
     var newIng = new Ingredient({
       name: name,
       type: types[index],
       qt: quantites[index]
     });
   
     newIng.save(function(err) {
       if (err) throw err;
       console.log('Saved to database succesfully !');
     });
   
   });

  console.log(req.body)
  
  res.json({ 'ok': true, 'quantite': quantites, 'ingredients': names, 'types': types });

});

module.exports = router;