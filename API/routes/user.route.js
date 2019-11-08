const express = require('express');
const router = express.Router();

// require the controller to compute data and all
const user_controller = require('../controllers/user.controller');

//real routes for user CRUD

router.post('/create', user_controller.user_create); //create a new user
router.post('/login', user_controller.user_login); //login to the user
router.get('/logout', user_controller.user_logout); //log out the actual session
router.get('/profile', user_controller.user_profile); //get the actual profile informations

module.exports = router;