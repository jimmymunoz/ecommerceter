var pathServer = "../../";
var express 	= require('express');
var config = require(pathServer + 'config');
var jwt    = require('jsonwebtoken');
//Models:
var moduleRoutes = express.Router();
var Product   = require(pathServer + 'app/models/product');
var Category   = require(pathServer + 'app/models/category');
//http://localhost:8888/product/setup
moduleRoutes.get('/setup', function(req, res) {
   var dataProduct = new Product({
        idProduct: '1',
        name: 'Product 1',
        description: 'Mi product has ....',
        price: 100,
        tax: 10,
        buyPrice: 100,
        price: 100,
        image: 'images/products',
        quantity: 100,
        weight: 1000,
        category: 1,
        productComment: [{comment: "Comment1", idUser: 1}, {comment: "Comment2", idUser: 2}],
        productEvaluation: [{evaluation: 4, idUser: 1}, {evaluation: 2, idUser: 2}],
        creationDate: Date('2014-04-30T14:00:00.000Z'),
        modificationDate: Date('2014-04-30T14:00:00.000Z')
    });
    dataProduct.save(function(err) {
        if (err) throw err;

        var msgResponse = 'Product saved successfully';
        console.log(msgResponse);
        res.json({ success: true, message: msgResponse, data: dataProduct });
    });
});

//Public Methods:
//http://localhost:8888/product/createProduct
moduleRoutes.post('/createProduct', function(req, res) {
   var dataProduct = new Product({
        idProduct: req.body.idProduct,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        tax: req.body.tax,
        buyPrice: req.body.buyPrice,
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
        res.json({ success: true, message: msgResponse, data: [] });
    });
});
// http://localhost:8888/product/getProduct?idProduct=1
moduleRoutes.get('/getProduct', function(req, res) {
    Product.findOne({
            idProduct: req.query.idProduct
    },
    function(err, product) {
        if (err) throw err;

        if (!product) {
            res.json({ success: false, message: 'Product not found.:(', data: [] });
        }
        else if (product) {
                res.json({
                success: true,
                message: 'Product Found :)',
                data: product
            });
        }
    });
});


//http://localhost:8888/product/updateProduct?idProduct=1
moduleRoutes.post('/updateProduct', function(req, res) {
	console.log("Body:");

	console.log(req.body);
	console.log("end Body");
    var queryWhere = { idProduct: req.body.idProduct };
    var updateFields = {
        idProduct: req.body.idProduct,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        tax: req.body.tax,
        buyPrice: req.body.buyPrice,
        image: req.body.image,
        quantity: req.body.quantity,
        weight: req.body.weight,
        category: req.body.category,
        //productComment: req.body.productComment,
        //productEvaluation: req.body.productEvaluation,
        modificationDate: Date()
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
//http://localhost:8888/product/updateProduct?idProduct=1
moduleRoutes.post('/updateProduct-', function(req, res) {
    console.log(req);

    Product.findOne({
            idProduct: req.body.idProduct
    }, function(err, product) {

        if (!product) {
            res.json({ success: false, message: 'Product not found.', data: [] });
        }
        else if (product) {
        	// update product
            product.idProduct= req.body.idProduct;
            product.name = req.body.name;
            product.description = req.body.description;
            product.price = req.body.price;
            product.tax = req.body.tax;
            product.buyPrice = req.body.buyPrice;
            product.image = req.body.image;
            product.quantity = req.body.quantity;
            product.weight = req.body.weight;
            product.category = req.body.category;
            product.productComment = req.body.productComment;
            product.productEvaluation = req.body.productEvaluation;
            product.creationDate = req.body.creationDate;

            product.update(function(err) {
                if (err) throw err;

                var msgResponse = 'Product updated successfully';
                console.log(msgResponse);
                res.json({ success: true, message: msgResponse, data: [] });
            });
        }
    });
});
//http://localhost:8888/product/removeProduct?idProduct=1
moduleRoutes.delete('/removeProduct', function(req, res) {
    Product.remove({
        idProduct: req.query.idProduct
    }, function(err, product) {
        if (err) throw err;

        if (!product) {
            res.json({ success: false, message: 'Error: Product can not deleted', data: [] });
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

// http://localhost:8888/product/getProductsList
moduleRoutes.get('/getProductsList', function(req, res) {
    Product.find({}, function(err, Products) {
		//console.log(Products);
		var out = [];
		for(var key in Products){
			Products[key]['CategoryData'] = Category.findOne({ idCategory: Products[key].category });
			console.log(Products[key]);
			out.push(Products[key]);
		}
		res.json({ success: true, message: 'Product List 45:', data: out });
    });
});


module.exports = moduleRoutes;
