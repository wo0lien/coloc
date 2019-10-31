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

  for (let i = 0; i < names.length; i++) {
    
    //inspection de l'ingredient
    
    //on enleve les espaces en trop en debut et fin de mot
    if (names[i].startsWith(" ")) {
      names[i] = names[i].substring(1);
    }
    if (names[i].endsWith(" ")) {
      names[i] = names[i].substring(0, names[i].length - 1);
    }

    //on check si on trouve des chaines de caractère récurrentes
    
    qtTypes.forEach(type => {
      if (names[i].includes(type)) {
        names[i] = names[i].substring(type.length);
        types[i] = type;
      }
    });

  };

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