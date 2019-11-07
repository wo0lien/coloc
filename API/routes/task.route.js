const express = require('express');
const router = express.Router();

// require the controller to compute data and all
const task_controller = require('../controllers/task.controller');

//real routes for task CRUD

router.post('/create', task_controller.task_create);
router.get('/:id', task_controller.task_details);
router.get('/', task_controller.task_list);
router.put('/:id/update', task_controller.task_update);
router.delete('/:id/delete', task_controller.task_delete);
router.delete('/delete', task_controller.task_delete_list)

module.exports = router;