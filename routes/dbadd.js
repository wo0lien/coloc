var express = require('express');
var router = express.Router();
var Ingredient = require('../app/models/ingredient');

//liste des expressions que l'on peut enlever dans les ingredients
let qtTypes = ['g de '];

router.post('/', function (req, res, next) {

  //need to add some test if the req.body is not as expected
  //improve here

  let names = req.body.ingredients;
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

  //adding ingredients to database if they aren't
  names.forEach((name, index) => {

    //creation du nouvel ingredient

    var newIng = new Ingredient({
      name: name,
      type: types[index],
      qt: quantites[index]
    });

    //Cherche si on le trouve dans la première database

    Ingredient.find({ 'name': name, 'type': types[index] }).limit(1)
      .then(function (ingredient) {

        if (ingredient.length == 0) {

          newIng.save(function (err) {
            if (err) throw err;
            console.log('Save new item');
          });

        } else {

          //tranforme les qt en nombres is possible

          if (!isNaN(ingredient[0].qt) && !isNaN(quantites[index])) {

            let qt1 = Number(ingredient[0].qt);
            let qt2 = Number(quantites[index]);

            //update entry en sommant si possible les quantités
            Ingredient.findByIdAndUpdate(ingredient[0]._id, { 'qt': String(qt1 + qt2) }, { new: true }, function (err) {
              // Handle any possible database errors
              if (err) throw err;
              console.log('2 items merged');
            })

          } else {

            newIng.save(function (err) {
              if (err) throw err;
              console.log('Unable to merge, saved new item');
            });

          }
        }
      })

    //add error catch

  });

  res.json({ 'ok': true, 'quantite': quantites, 'ingredients': names, 'types': types });

});

module.exports = router;