var express = require('express');
var router = express.Router();
var Ingredient = require('../app/models/ingredient');

/* GET home page. */
router.get('/', function(req, res, next) {

  Ingredient.find({}, (err,results)=>{
    res.render('index', { 'nbItems': String(results.length) });
  })
  
});

module.exports = router;
