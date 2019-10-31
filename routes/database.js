var express = require('express');
var router = express.Router();
var Ingredient = require('../app/models/ingredient');



/* GET debbuging page

Link to mongoose to add object to the database or improve the quantity if the object is already inside the database
*/
router.get('/', function(req, res, next) {
  
  var dbobject = req.object;

  var newIng = new Ingredient({
    name: dbobject.name,
    qt: dbobject.qt
  });

  newIng.save(function(err) {
    if (err) throw err;

    console.log('Saved to database succesfully !');
  });

  res.json({'ok': true});
  //res.render('dbscreen', { name: dbobject.name, qt: dbobject.qt });

});

module.exports = router;

