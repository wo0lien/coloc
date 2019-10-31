var express = require('express');
var router = express.Router();
var Ingredient = require('../app/models/ingredient');

/* GET home page. */
router.get('/', function(req, res, next) {

  // on recupere la liste de tout les ingredients qui sont dans la liste de courses

  Ingredient.find({}, (err,results)=>{
    res.render('list', { 'ingredients': results });
  })

});

module.exports = router;
