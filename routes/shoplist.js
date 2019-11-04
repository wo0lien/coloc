var express = require('express');
var router = express.Router();
var Ingredient = require('../API/models/product.model');

/* GET shoplist page. */
router.get('/', function(req, res, next) {

  res.render('shoplist');

});

module.exports = router;
