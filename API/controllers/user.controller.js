const User = require('../models/user.model');

exports.user_create = function (req, res, next) {

  if (req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

    var userData = {
      username: req.body.username,
      password: req.body.password,
    };

    //use schema.create to insert data into the db
    User.create(userData, function (err, user) {
      if (err) return next(err);
      res.redirect('/');
    });
  } else {
    res.sendStatus(500);
  }
};

exports.user_login = function (req, res, next) {

  if (req.body.logusername && req.body.logpassword) {

    User.authenticate(req.body.logusername, req.body.logpassword, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/');
      }
    });

  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }

}