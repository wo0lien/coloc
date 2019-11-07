const express = require('express');
const router = express.Router();

// require the controller to compute data and all
const user_controller = require('../controllers/user.controller');

//real routes for user CRUD

router.post('/create', user_controller.user_create);
router.post('/login', user_controller.user_login);

module.exports = router;