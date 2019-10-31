var express = require('express');
var router = express.Router();
var Ingredient = require('../app/models/ingredient');

router.post('/', function (req, res, next) {

  //need to add some test if the req.body is not as expected

  //adding ingredients to database
   for (var i = 0; i < req.body.ingredients.length; i++) {
     var newIng = new Ingredient({
       name: req.body.ingredients[i],
       qt: req.body.quantite[i]
     });
   
     newIng.save(function(err) {
       if (err) throw err;
       console.log('Saved to database succesfully !');
     });
   
   }

  console.log(req.body)
  
  res.json({ 'ok': true, 'quantite': req.body.quantite, 'ingredients': req.body.ingredients });

});

module.exports = router;