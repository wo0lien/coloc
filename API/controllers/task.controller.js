const Task = require('../models/task.model');

//Simple version, without validation or sanitation

//----------------------------------------------- create -----------------------------------------------

exports.task_create = function (req, res, next) {

  //create a new task

  let task = new Task()

  if (!'repeat' in req.body) {

    task = new Task({
      name: req.body.name,
      worker: req.body.worker
    });

  } else {

    task = new Task({
      name: req.body.name,
      worker: req.body.worker,
      repeat: req.body.repeat,
      shared: req.body.shared
    });
  
  }

  //save it to the database
  task.save(function (err) {
    if (err) {
      return next(err);
    }
    //emit socket io request to update the pages
    req.io.emit('CreateTask', task);
    res.sendStatus(200);
  })
};

//----------------------------------------------- read -----------------------------------------------

exports.task_details = function (req, res, next) {
  Task.findById(req.params.id, function (err, task) {
    if (err) return next(err);
    res.send(task);
  })
};

//----------------------------------------------- read all -----------------------------------------------

exports.task_list = function (req, res, next) {
  Task.find({}, function (err, tasks) {
    if (err) return next(err);
    res.send(tasks);
  })
};

//----------------------------------------------- update -----------------------------------------------

exports.task_update = function (req, res, next) {
  Task.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, task) {
    if (err) return next(err);
    //emit socket io request to update the pages
    req.io.emit('UpdateTask', task);
    res.sendStatus(200);
  });
};

//----------------------------------------------- delete -----------------------------------------------

exports.task_delete = function (req, res, next) {
  Task.findByIdAndDelete(req.params.id, function (err, task) {
    if (err) return next(err);
    //emit socket io request to update the pages
    req.io.emit('DeleteTask', task);
    res.sendStatus(200);
  });
}

//----------------------------------------------- delete list -----------------------------------------------

exports.task_delete_list = function (req, res, next) {

  var ids = req.body.ids;

  ids.forEach(id => {
    Task.findByIdAndDelete(id, function (err, task) {
      if (err) return next(err);
      //emit socket io request to update the pages
      if (task != []) {
        req.io.emit('DeleteTask', task);
      }
    });
  });
  res.sendStatus(200);
}

//----------------------------------------------- functions -----------------------------------------------

function isValidTask(data, next) {
  //not implemented yet
}