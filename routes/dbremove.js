var express = require('express');
var router = express.Router();
var Ingredient = require('../app/models/ingredient');


router.post('/', function (req, res, next) {

  let ids = req.body.id;

  console.log(ids);

  ids.forEach(id => {
    Ingredient.findByIdAndDelete(id, function (err) {
      // Handle any possible database errors
      if (err) throw err;
      console.log('item deleted');
    });

  });

  res.json({ 'ok': true, 'ids': ids });

});

module.exports = router;