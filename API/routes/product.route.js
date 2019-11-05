const express = require('express');
const router = express.Router();

// require the controller to compute data and all
const product_controller = require('../controllers/product.controller');

//real routes for product CRUD

router.post('/create', product_controller.product_create);
router.get('/:id', product_controller.product_details);
router.get('/', product_controller.product_list);
router.put('/:id/update', product_controller.product_update);
router.delete('/:id/delete', product_controller.product_delete);
router.delete('/delete', product_controller.product_delete_list)

module.exports = router;