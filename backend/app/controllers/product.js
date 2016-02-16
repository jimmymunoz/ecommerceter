var pathServer = '../../';
var express 	= require('express');
var config = require(pathServer + 'config');
var jwt    = require('jsonwebtoken'); 
var moduleRoutes = express.Router();


var Product   = require(pathServer + 'app/models/product');

//http://localhost:8888/product/
moduleRoutes.get('/', function(req, res) {
        res.json({ success: false, message: 'Invalid Product action', data: req.decoded });
});

//http://localhost:8888/product/getProduct?idProduct=1
moduleRoutes.get('/getProduct', function(req, res) {
    Product.
        findOne({ idProduct: req.query.idProduct }).
        //where('idProduct').equals(req.query.idProduct).// =
        //where('idProduct').gt(17).lt(66).// gt - lt
        //where('idProduct').in(['idProduct', req.query.idProduct]).// like
        //limit(10).
        sort('-idProduct').
        select('idProduct name description price tax buyPrice price image quantity weight category productComment productEvaluation creationDate modificationDate ').
        exec(function(err, product) {
        if (err) throw err;

        if (!product) {
            res.json({ success: false, message: 'Product not found.', data: [] });
        } 
        else if (product) {
                res.json({
                success: true,
                message: 'Product Found',
                data: product
            });
        }
    });
});

//http://localhost:8888/product/getProductsList
moduleRoutes.get('/getProductsList', function(req, res) {
    Product.find({}).
    //where('idCategory').equals(req.query.idCategory).// =
    //where('idCategory').gt(17).lt(66).// gt - lt
    //where('idCategory').in(['idCategory', req.query.idCategory]).// like
    //limit(10).
    sort('-idCategory').
    select('idProduct name description price tax buyPrice price image quantity weight category productComment productEvaluation creationDate modificationDate ').
    exec(function(err, Products) {
        res.json({ success: true, message: 'Product List:', data: Products });
    });
});

//http://localhost:8888/product/createProduct
moduleRoutes.post('/createProduct', function(req, res) {
   var dataProduct = new Product({ 
        idProduct: req.body.idProduct, 
        name: req.body.name, 
        description: req.body.description, 
        price: req.body.price, 
        tax: req.body.tax, 
        buyPrice: req.body.buyPrice, 
        price: req.body.price, 
        image: req.body.image, 
        quantity: req.body.quantity, 
        weight: req.body.weight, 
        category: req.body.category, 
        productComment: req.body.productComment, 
        productEvaluation: req.body.productEvaluation, 
        creationDate: req.body.creationDate, 
        modificationDate: req.body.modificationDate 
    }); 
    dataProduct.save(function(err) {
        if (err) throw err;

        var msgResponse = 'Product saved successfully';
        console.log(msgResponse);
        res.json({ success: true, message: msgResponse, data: dataProduct });
    });
});

//http://localhost:8888/product/updateProduct?idProduct=1
moduleRoutes.post('/updateProduct', function(req, res) {
    var queryWhere = { idProduct: req.body.idProduct };
    var updateFields = {  
        idProduct: req.body.idProduct, 
        name: req.body.name, 
        description: req.body.description, 
        price: req.body.price, 
        tax: req.body.tax, 
        buyPrice: req.body.buyPrice, 
        price: req.body.price, 
        image: req.body.image, 
        quantity: req.body.quantity, 
        weight: req.body.weight, 
        category: req.body.category, 
        productComment: req.body.productComment, 
        productEvaluation: req.body.productEvaluation, 
        creationDate: req.body.creationDate, 
        modificationDate: req.body.modificationDate 
    };
    
    Product.update(
        queryWhere, //query
        updateFields, //update
        function (err, raw) {
            if (err) return handleError(err);

            var msgResponse = 'Product updated successfully';
            console.log(msgResponse);
            res.json({ success: true, message: msgResponse, data: raw });
        }
    );
});
 
//http://localhost:8888/product/setup
moduleRoutes.get('/setup', function(req, res) {
   var dataProduct = new Product({ 
    idProduct: String, 
    name: String, 
    description: String, 
    price: Number, 
    tax: Number, 
    buyPrice: Number, 
    price: Number, 
    image: String, 
    quantity: Number, 
    weight: Number, 
    category: Number, 
    productComment: Array, 
    productEvaluation: Array, 
    creationDate: Date, 
    modificationDate: Date 
    }); 
    dataProduct.save(function(err) {
        if (err) throw err;

        var msgResponse = 'Product saved successfully';
        console.log(msgResponse);
        res.json({ success: true, message: msgResponse, data: dataProduct });
    });
});

//http://localhost:8888/product/removeProduct?idProduct=1
moduleRoutes.post('/removeProduct', function(req, res) {
    Product.remove({
        idProduct: req.body.idProduct
    }, function(err, product) {
        if (err) throw err;

        if (!product) {
            res.json({ success: false, message: 'Error: Product can not deleted', data: Product });
        } 
        else if (product) {
            res.json({
                success: true,
                message: 'Product Deleted',
                data: product
            });
        }
    });
});
module.exports = moduleRoutes;