const Product = require('../models/product.model');

//Simple version, without validation or sanitation

//----------------------------------------------- create -----------------------------------------------

exports.product_create = function (req, res, next) {

    //si ce n'est pas un bon produit on retourne une erreur
    isValidProduct(req.body, next);
    
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
        //emit socket io request to update the pages
        req.io.emit('CreateProduct', product);
        res.sendStatus(200);
    })
};

//----------------------------------------------- read -----------------------------------------------

exports.product_details = function (req, res, next) {
    Product.findById(req.params.id, function (err, product) {
        if (err) return next(err);
        res.send(product);
    })
};

//----------------------------------------------- read all -----------------------------------------------

exports.product_list = function (req, res, next) {
    Product.find({}, function (err, products) {
        if (err) return next(err);
        res.send(products);
    })
};

//----------------------------------------------- update -----------------------------------------------

exports.product_update = function (req, res, next) {
    Product.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, product) {
        if (err) return next(err);
        //emit socket io request to update the pages
        req.io.emit('UpdateProduct', product);
        res.sendStatus(200);
    });
};

//----------------------------------------------- delete -----------------------------------------------

exports.product_delete = function (req, res, next) {
    Product.findByIdAndDelete(req.params.id, function (err, product) {
        if (err) return next(err);
        //emit socket io request to update the pages
        req.io.emit('DeleteProduct', product);
        res.sendStatus(200);
    });
}

//----------------------------------------------- delete list -----------------------------------------------

exports.product_delete_list = function (req, res, next) {

    var ids = req.body.ids;

    ids.forEach(id => {
        Product.findByIdAndDelete(id, function (err, product) {
            if (err) return next(err);
            //emit socket io request to update the pages
            if (product != []) {
                req.io.emit('DeleteProduct', product);
            }
        });
    });
    res.sendStatus(200);
}

//----------------------------------------------- functions -----------------------------------------------

function isValidProduct(data, next) {
    //check if the rights keys exist
    if (isNaN(data.quantity)) {
        let err = new Error("Quantity should be a number");
        return next(err);
    }
    
}