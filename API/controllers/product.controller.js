const Product = require('../models/product.model');

//Simple version, without validation or sanitation

//create

exports.product_create = function (req, res) {

    //create a new product
    let product = new Product(
        {
            name: req.body.name,
            quantity: req.body.quantity
        }
    );

    //save it to the database
    product.save(function (err) {
        if (err) {
            return next(err);
        }
        //res.send('Product Created successfully');
        req.io.emit('coucou');
        res.sendStatus(200);
    })
};

// read

exports.product_details = function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (err) return next(err);
        res.send(product);
    })
};

//read all

exports.product_list = function (req, res) {
    Product.find({}, function (err, products) {
        if (err) return next(err);
        res.send(products);
    })
};

// update

exports.product_update = function (req, res) {
    Product.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, product) {
        if (err) return next(err);
        res.send('Product udpated.');
    });
};

//delete

exports.product_delete = function (req, res) {
    Product.findByIdAndDelete(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Product deleted successfully !');
    });
}