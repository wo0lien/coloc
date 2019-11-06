var express = require('express');
var router = express.Router();
var Product = require('../API/models/product.model');

/* GET home page. */
router.get('/', function(req, res, next) {

  Product.find({}, (err, results)=>{
    res.render('index', { 'nbItems': String(results.length) });
  })
  
});

module.exports = router;
