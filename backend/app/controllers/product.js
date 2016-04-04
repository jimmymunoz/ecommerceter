var pathServer = "../../";
var express 	= require('express');
var config = require(pathServer + 'config');
//Models:
var moduleRoutes = express.Router();
var Product   = require(pathServer + 'app/models/product');
var Category   = require(pathServer + 'app/models/category');
var ProductEvaluation = require(pathServer + 'app/models/productEvaluation');
//Helpers:
var commonHelper   = require(pathServer + 'app/helpers/common');
var authenticationHelper   = require(pathServer + 'app/helpers/authentication');
var app = express();
//http://localhost:8888/product/setup
moduleRoutes.get('/setup', function(req, res) {
   var dataProduct = new Product({
        //idProduct: '1',
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
moduleRoutes.post('/', function(req, res) {
   // res.setHeader('Access-Control-Allow-Origin', '*');
    //res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    //console.log(req);
    var validationResponse = commonHelper.getValidationResponse();
    var HelperValidator = commonHelper.validator;
    console.log(req.body.name);
	// validation name
    if(! ( HelperValidator.isAscii( req.body.name ) && req.body.name != "" )  ){
		validationResponse.addError("Invalid product name: " + req.body.name);
    }
	//validation description
    if(! ( HelperValidator.isAscii( req.body.description ) && req.body.description != "" )  ){
		validationResponse.addError("Invalid product description: " + req.body.description);
    }
	// validation price
	if(! ( HelperValidator.isNumeric( req.body.price ) && req.body.price != "" )  ){
		validationResponse.addError("Invalid product price: " + req.body.price);
	}
	// validation tax
	if(! ( HelperValidator.isNumeric( req.body.tax) && req.body.tax != "" )  ){
		validationResponse.addError("Invalid product tax: " + req.body.tax);
	}
	// validation buyPrice
	if(! ( HelperValidator.isNumeric( req.body.buyPrice) && req.body.buyPrice!= "" )  ){
		validationResponse.addError("Invalid product buyPrice: " + req.body.buyPrice);
	}
	// validation image
	if(! ( HelperValidator.isAscii( req.body.image ) && req.body.image != "" )  ){
		validationResponse.addError("Invalid product image : " + req.body.image);
	}
	// validation quantity
	if(! ( HelperValidator.isNumeric( req.body.quantity) && req.body.quantity!= "" )  ){
		validationResponse.addError("Invalid product quantity: " + req.body.quantity);
	}
	// validation weight
	if(! ( HelperValidator.isNumeric( req.body.weight) && req.body.weight!= "" )  ){
		validationResponse.addError("Invalid product weight: " + req.body.weight);
	}
	// validation category
	if(! ( HelperValidator.isInt( req.body.category) && req.body.category!= "" )  ){
		validationResponse.addError("Invalid product category: " + req.body. category);
	}
	// validation productComment
	if(! validationResponse.success){
        res.json(validationResponse);
    }
    else {
    	Category.findOne({
            idCategory: req.body.category
        }, function (err, categoryJoin) {
            if (err) throw err;

            console.log(categoryJoin);
            
            if (! categoryJoin && req.body.category > 0) {
                res.json({ success: false, message: 'Category not found.' + req.body.category, data: [] });
            } 
            else {
				var dataProduct = new Product({
					//idProduct: req.body.idProduct,
					name: ( req.body.name == undefined )? '': req.body.name,
					description: ( req.body.description == undefined )? '': req.body.description,
					price: ( req.body.price == undefined )? '': req.body.price,
					tax: ( req.body.tax == undefined )? '': req.body.tax,
					buyPrice: ( req.body.buyPrice == undefined )? '': req.body.buyPrice,
					image: ( req.body.image == undefined )? '': req.body.image,
					quantity: ( req.body.quantity == undefined )? '': req.body.quantity,
					weight: ( req.body.weight == undefined )? '': req.body.weight,
					category: categoryJoin._id,
					creationDate: Date(),
					modificationDate: Date()
				});
				dataProduct.save(function(err) {
					if (err) throw err;

					var msgResponse = 'Product saved successfully';
					console.log(msgResponse);
					res.json({ success: true, message: msgResponse, data: dataProduct});
					//res.send(dataProduct);
				});

            }
        });

    }

});
// http://localhost:8888/product/getProduct?idProduct=1
moduleRoutes.get('/getProduct', function(req, res) {
	var validationResponse = commonHelper.getValidationResponse();
    var HelperValidator = commonHelper.validator;

    Product.findOne({
        idProduct: req.query.idProduct
    }).
    populate('category').
    populate('productEvaluation.user', 'firstName lastName idUser').
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


//http://localhost:8888/product/updateProduct?idProduct=1
moduleRoutes.put('/:id', function(req, res) {
    var validationResponse = commonHelper.getValidationResponse();
    var HelperValidator = commonHelper.validator;
    //  console.log("Body:");
    //  console.log(req.body);
    //  console.log("end Body");
    console.log(req.body.name);
    // validation id
    /*if(! ( HelperValidator.isNumeric( req.body.idProduct) && req.body.idProduct != "" )  ){
		validationResponse.addError("Invalid idProduct: " + req.body.idProduct);
    }*/
    // validation name
    if(! ( HelperValidator.isAscii( req.body.name) && req.body.name != "" )  ){
		validationResponse.addError("Invalid product name: " + req.body.name);
    }
    //validation description
    if(! ( HelperValidator.isAscii( req.body.description ) && req.body.description != "" )  ){
		validationResponse.addError("Invalid product description: " + req.body.description);
    }
    // validation price
    if(! ( HelperValidator.isNumeric( req.body.price ) && req.body.price != "" )  ){
		validationResponse.addError("Invalid product price: " + req.body.price);
    }
    // validation tax
    if(! ( HelperValidator.isNumeric( req.body.tax) && req.body.tax != "" )  ){
		validationResponse.addError("Invalid product tax: " + req.body.tax);
    }
    // validation buyPrice
    if(! ( HelperValidator.isNumeric( req.body.buyPrice) && req.body.buyPrice!= "" )  ){
		validationResponse.addError("Invalid product buyPrice: " + req.body.buyPrice);
    }
    // validation image
    if(! ( HelperValidator.isAscii( req.body.image ) && req.body.image != "" )  ){
		validationResponse.addError("Invalid product image : " + req.body.image);
    }
    // validation quantity
    if(! ( HelperValidator.isNumeric( req.body.quantity) && req.body.quantity!= "" )  ){
		validationResponse.addError("Invalid product quantity: " + req.body.quantity);
    }

    // validation weight
    if(! ( HelperValidator.isNumeric( req.body.weight) && req.body.weight!= "" )  ){
		validationResponse.addError("Invalid product weight: " + req.body.weight);
    }
    // validation category
    if(! ( HelperValidator.isInt( req.body.category) && req.body.category!= "" )  ){
		validationResponse.addError("Invalid product category: " + req.body. category);
    }
    
    if(! validationResponse.success){
        res.json(validationResponse);
    }
    else {
	    var queryWhere = { idProduct: req.body.idProduct };
	    Product.findOne( queryWhere ).
	        select('idProduct').
	        exec( function(err, product){
	            if (err) throw err;

	            if (!product) {
	                res.json({ success: false, message: 'Product not found.', data: [] });
	            } 
	            else if (product) {
	            	Category.findOne({
					    idCategory: req.body.category
					}, function (err, categoryJoin) {
					    if (err) throw err;

					    console.log(categoryJoin);
					    
					    if (! categoryJoin && req.body.category > 0) {
					        res.json({ success: false, message: 'Category not found.' + req.body.category, data: [] });
					    } 
					    else {
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
						        category: categoryJoin._id,
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
						}
					});
	            }
	        });

  	}
});
/*
moduleRoutes.delete("/Product/:id", function(req,res){
  var id = req.params.id;
  Product.findById(id, function(err, prod) {
      prod.remove(function(err) {
        if(err) throw err;
        
      });
    });
});*/
//http://localhost:8888/product/removeProduct?idProduct=1
moduleRoutes.delete('/:id', function(req, res) {
	var validationResponse = commonHelper.getValidationResponse();
    var HelperValidator = commonHelper.validator;
	console.log(req.params.id);
	// validation idProduct
   /* if(! ( HelperValidator.isNumeric( req.params.idProduct) && req.params.idProduct != "" )  ){
		validationResponse.addError("Invalid idProduct: " + req.params.idProduct);
    }

    if(! validationResponse.success){
        res.json(validationResponse);
    }
    else {*/
    	var queryWhere = { _id: req.params.id };
	    Product.findOne( queryWhere ).
	        select('_id').
	        exec( function(err, product){
	            if (err) throw err;

	            if (!product) {
	                res.json({ success: false, message: 'Product not found.', data: [] });
	            } 
	            else if (product) {
				    Product.remove({
				        _id: req.params.id
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
	            }
	        });
	        
	//}
}); 

// http://localhost:8888/product/getProductsList
moduleRoutes.get('/getProductsList', function(req, res) {
    var query = {};
    if( req.query.name != undefined && req.query.name != "" ){
    	query["name"] = new RegExp(req.query.name, "i");
    }
    if( req.query.category != undefined && req.query.category != "" ){
    	query["category"] = req.query.category;
    }
    if( req.query.price != undefined && req.query.price != "" ){
    	query["price"] = req.query.price
    }

    var ProductList = Product.find(query);
    //ProductList.where('name').equals(req.query.name);// =
    //ProductList.where('name').equals(req.query.name);// =
    //ProductList.where('idCategory').gt(17).lt(66);// gt - lt
    //ProductList.where('idCategory').in(['idCategory', req.query.idCategory]);// like
    //ProductList.limit(10).
    ProductList.sort('-name')
    ProductList.populate('category')
    ProductList.populate('productEvaluation.user', 'firstName lastName idUser')
    ProductList.populate('productComment.user', 'firstName lastName idUser')
    ProductList.exec(function(err, Products) {
    	//console.log(Products);
		var out = [];
		for(var key in Products){
			//Products[key]['CategoryData'] = Category.findOne({ idCategory: Products[key].category });
			//console.log(Products[key]);
			out.push(Products[key]);
		}
		res.json({ success: true, message: 'Product List:', data: out });
    });
});

//http://localhost:8888/product/productEvaluation
moduleRoutes.post('/productEvaluation', function(req, res) {
	var validationResponse = commonHelper.getValidationResponse();
	var HelperValidator = commonHelper.validator;
	var token = req.body.token || req.headers['x-access-token'];
	var user = authenticationHelper.getUserByToken(token);
	// validation evaluation
	if(! ( HelperValidator.isNumeric( req.body.evaluation ) && req.body.evaluation  != ""  && HelperValidator.isLength(req.body.evaluation, {min:0, max:5}) )  ){
		validationResponse.addError("Invalid product evaluation  : " + req.body.evaluation );
	}
	if(! ( HelperValidator.isNumeric( user.idUser ) )  ){
        validationResponse.addError("User not found (" + user.idUser + ") - Login required");
    }


	if(! validationResponse.success){
		res.json(validationResponse);
	}
	else {
		var queryWhere = { idProduct: req.body.idProduct };
	    Product.findOne( queryWhere ).
	        //select('idProduct').
	        exec( function(err, product){
	            if (err) throw err;
	            console.log(product);

	            if (!product) {
	                res.json({ success: false, message: 'Product not found.', data: [] });
	            } 
	            else if (product) {
	            	var productEvaluation = product.productEvaluation;
	            	productEvaluation.push( { user: user._id, evaluation: req.body.evaluation, evaluationDate: Date() });
	            	
	            	var updateFields = {
				        productEvaluation: productEvaluation
				    };

				    Product.update(
				        queryWhere, //query
				        updateFields, //update
				        function (err, raw) {
				            if (err) return handleError(err);

				            var msgResponse = 'Product evaluation added successfully';
				            console.log(msgResponse);
				            res.json({ success: true, message: msgResponse, data: raw });
				        }
				    );
	            	/*
	            	var dataProductEvaluation = new ProductEvaluation({
						evaluation: req.body.evaluation,
						idProduct:req.body.idProduct,
						email : user.email,
						evaluationDate : Date()
					});
					dataProductEvaluation.save(function(err) {
						if (err) throw err;

						var msgResponse = 'Product evaluation saved successfully';
						console.log(msgResponse);
						res.json({ success: true, message: msgResponse, data: [] });
					});
	            	 */
				}
			});
	}
});

//http://localhost:8888/product/productComment
moduleRoutes.post('/productComment', function(req, res) {
	var validationResponse = commonHelper.getValidationResponse();
	var HelperValidator = commonHelper.validator;
	var token = req.body.token || req.headers['x-access-token'];
	var user = authenticationHelper.getUserByToken(token);
	// validation comment
	if(! ( HelperValidator.isAscii( req.body.comment ) && req.body.comment  != "")  ){
		validationResponse.addError("Invalid product comment  : " + req.body.comment );
	}
	if(! ( HelperValidator.isNumeric( user.idUser ) )  ){
        validationResponse.addError("User not found (" + user.idUser + ") - Login required");
    }


	if(! validationResponse.success){
		res.json(validationResponse);
	}
	else {
		var queryWhere = { idProduct: req.body.idProduct };
	    Product.findOne( queryWhere ).
	        //select('idProduct').
	        exec( function(err, product){
	            if (err) throw err;
	            console.log(product);

	            if (!product) {
	                res.json({ success: false, message: 'Product not found.', data: [] });
	            } 
	            else if (product) {
	            	var productComment = product.productComment;
	            	productComment.push( { user: user._id, comment: req.body.comment, commentDate: Date() });
	            	
	            	var updateFields = {
				        productComment: productComment
				    };

				    Product.update(
				        queryWhere, //query
				        updateFields, //update
				        function (err, raw) {
				            if (err) return handleError(err);

				            var msgResponse = 'Product comment added successfully';
				            console.log(msgResponse);
				            res.json({ success: true, message: msgResponse, data: raw });
				        }
				    );
				}
			});
	}
});

// http://localhost:8888/product/AllProducts
moduleRoutes.get("/", function(req,res){
  Product.find({},function(err,docs){
    if(err) throw err;
    res.send(docs);
	//console.log(docs);
  });
});

module.exports = moduleRoutes;
