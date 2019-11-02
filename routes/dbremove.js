var express = require('express');
var router = express.Router();
var Ingredient = require('../app/models/ingredient');


router.post('/', function (req, res, next) {

  let ids = req.body.id;

  ids.forEach(id => {
    Ingredient.findByIdAndDelete(id, function (err) {
      // Handle any possible database errors
      if (err) throw err;
      console.log('item deleted');
    });

  });

  res.sendStatus(200);

});

module.exports = function (io) {
  //Socket.IO
  io.on('connection', function (socket) {
      console.log('User has connected to dbremove');
      //ON Events
      socket.on('elementRemoved', function(){
        io.emit('updatePage');
      });
      //End ON Events
  });
  return router;
};