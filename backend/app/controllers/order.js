var pathServer = '../../';
var express     = require('express');
var config = require(pathServer + 'config');
var moduleRoutes = express.Router();
 
var Product   = require(pathServer + 'app/models/product');
var Category   = require(pathServer + 'app/models/category');
var Order   = require(pathServer + 'app/models/order');
var Payment   = require(pathServer + 'app/models/payment');
//Helpers:
var commonHelper   = require(pathServer + 'app/helpers/common'); 
var authenticationHelper   = require(pathServer + 'app/helpers/authentication'); 

//http://localhost:8888/order/
moduleRoutes.get('/', function(req, res) {
        res.json({ success: false, message: 'Invalid Order action', data: req.decoded });
});

//http://localhost:8888/order/getOrder?idOrder=1 //Comment connaiter le client en question
moduleRoutes.get('/getOrder', function(req, res) {
    var validationResponse = commonHelper.getValidationResponse();
    var HelperValidator = commonHelper.validator;
    if(! ( HelperValidator.isNumeric( req.query.idOrder ) && req.query.idOrder != "" )  ){
        validationResponse.addError("Invalid number: " + req.query.idOrder);
    }
    if(! validationResponse.success){
        res.json(validationResponse);
    }
    else {
    Order.
        findOne({ idOrder: req.query.idOrder }).
        sort('-idOrder').
        select('idOrder address creationDate total status city totalTax orderLines approvalCode paymentDate modificationDate ').
        exec(function(err, order) {
        if (err) throw err;

        if (!order) {
            res.json({ success: false, message: 'Order not found.', data: [] });
        } 
        else if (order) {
                res.json({
                success: true,
                message: 'Order Found',
                data: order
            });
        }
    });
    }
});


//http://localhost:8888/order/getAdminOrders/
moduleRoutes.get('/getAdminOrders', function(req, res) {
    var query = {};
    var page = (req.query.page != undefined )? req.query.page : 1 ;
    var page_size = (req.query.page_size != undefined )? req.query.page_size : config.default_page_size_pagination ;
    Order.count(query, function(err, total_results) {
        if (err) throw err;
        //  res.json({ success: true, message: 'Product List:', data: out, pagination: commonHelper.getPaginationResult(total_results, page_size, page) });
        Order.find({}).
        sort('-idCategory').
        select('idUser idOrder address creationDate total status city totalTax orderLines approvalCode paymentDate modificationDate ').
        exec(function(err, Orders) {
            res.json({ success: true, message: 'Order List:', data: Orders, pagination: commonHelper.getPaginationResult(total_results, page_size, page) });
        });
    });
        
});
//http://localhost:8888/order/getClientOrder?idUser=1
moduleRoutes.get('/getClientOrder', function(req, res) {
    //res.setHeader('Access-Control-Allow-Origin', '*');
    var validationResponse = commonHelper.getValidationResponse();
    var HelperValidator = commonHelper.validator;
    var token = req.body.token || req.param('token') || req.headers['x-access-token'];
    var user = authenticationHelper.getUserByToken(token);

    if(! ( HelperValidator.isNumeric( user.idUser ) && user.idUser != "" )  ){
        validationResponse.addError("Invalid idUser: " + user.idUser);
    }
    
    if(! validationResponse.success){
        res.json(validationResponse);
    }
    else {
        Order.find({
            idUser: user.idUser
        }, function(err, order) {
            if (err) throw err;

            if (!order) {
                res.json({ success: false, message: 'Error: Order not found', data: Order });
            } 
            else if (order) {
                res.json({
                    success: true,
                    message: 'Orders result',
                    data: order
                });
            }
        });
    }
});

//http://localhost:8888/order/changeStatus
moduleRoutes.post('/changeStatus', function(req, res) {
res.setHeader('Access-Control-Allow-Origin', '*');
    var validationResponse = commonHelper.getValidationResponse();
    var HelperValidator = commonHelper.validator;
    
    if(! ( HelperValidator.isNumeric( req.body.idOrder ) && req.body.idOrder != "" )  ){
        validationResponse.addError("Invalid number: " + req.body.idOrder);
    }
    
    if(! ( HelperValidator.isAscii( req.body.status ) && req.body.status != "" )  ){
        validationResponse.addError("Invalid status: " + req.body.status);
    }

    if(! validationResponse.success){
        res.json(validationResponse);
    }
    else {

        var queryWhere = { idOrder: req.body.idOrder };
        var updateFields = {  
            idOrder: req.body.idOrder, 
            status: req.body.status
        };
        Order.findOne(queryWhere).
            select('idOrder').
            exec( function(err, order){
                if(err) throw err;

                if(! order ){
                    res.json({ success: false, message: 'Order not found.', data: order });
                }
                else if( order ){
                    Order.update(
                        queryWhere, 
                        updateFields,
                        function (err, raw) {
                            if (err) return handleError(err);

                            var msgResponse = 'Status updated successfully';
                            console.log(msgResponse);
                            res.json({ success: true, message: msgResponse, data: raw });
                        }
                    );
                }
            });
    }
});

//http://localhost:8888/order/getAdminOrder?idOrder=1
moduleRoutes.get('/getAdminOrder', function(req, res) {
    var validationResponse = commonHelper.getValidationResponse();
    var HelperValidator = commonHelper.validator;
    if(! ( HelperValidator.isNumeric( req.query.idOrder ) && req.query.idOrder != "" )  ){
        validationResponse.addError("Invalid number: " + req.query.idOrder);
    }
    if(! validationResponse.success){
        res.json(validationResponse);
    }
    else {
        Order.
            findOne({ idOrder: req.query.idOrder }).
            sort('-idOrder').
            select('idOrder address creationDate total status city totalTax orderLines approvalCode paymentDate modificationDate ').
            exec(function(err, order) {
            if (err) throw err;

            if (!order) {
                res.json({ success: false, message: 'Order not found.', data: [] });
            } 
            else if (order) {
                    res.json({
                    success: true,
                    message: 'Order Found',
                    data: order
                });
            }
        });
    }
});


//http://localhost:8888/order/createOrder
moduleRoutes.post('/createOrder', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var validationResponse = commonHelper.getValidationResponse();
    var HelperValidator = commonHelper.validator;
    var token = req.body.token || req.param('token') || req.headers['x-access-token'];
    var user = authenticationHelper.getUserByToken(token);
    
    if(! ( HelperValidator.isNumeric( user.idUser ) && user.idUser != "" )  ){
        validationResponse.addError("Invalid idUser: " + user.idUser);
    }
    if(! ( HelperValidator.isAscii( req.body.address ) && req.body.address != "" )  ){
        validationResponse.addError("Invalid address: " + req.body.address);
    }
    if(! ( HelperValidator.isAscii( req.body.city ) && req.body.city != "" )  ){
        validationResponse.addError("Invalid city: " + req.body.city);
    }
    if(! ( HelperValidator.isAscii( req.body.country ) && req.body.country != "" )  ){
        validationResponse.addError("Invalid country: " + req.body.country);
    }
    
    //if(! ( HelperValidator.isJSON( req.body['orderLines[]'] ) && req.body['orderLines[]'] != "" )  ){
    //    validationResponse.addError("Invalid orderLines: " + req.body['orderLines[]']);
    //}
    //
    req.body['product'] = (req.body['product'] == undefined)? []: req.body['product'];
    req.body['quantity'] = (req.body['quantity'] == undefined)? []: req.body['quantity'];

    var arrRequestProduct = (typeof req.body['product'] == "string")? [req.body['product']]: req.body['product'];
    var arrRequestQuantity = (typeof req.body['quantity'] == "string")? [req.body['quantity']]: req.body['quantity'];
    
    if(! ( HelperValidator.isAscii( req.body['product'] ) && typeof arrRequestProduct == "object" )  ){
        validationResponse.addError("Invalid product: " + req.body['product']);
    }
    if(! ( HelperValidator.isAscii( req.body['quantity'] ) && typeof arrRequestQuantity == "object" )  ){
        validationResponse.addError("Invalid quantity: " + req.body['quantity']);
    }
    if(! ( arrRequestProduct.length == arrRequestQuantity.length  && arrRequestProduct.length > 0  && arrRequestQuantity.length > 0) ){
        validationResponse.addError("Invalid quanties x product: (" + arrRequestProduct.length + " - " + arrRequestQuantity.length + ") ");
    }
    
    if(! validationResponse.success){
        res.json(validationResponse);
    }
    else { 
        Product.find({}).
        where('idProduct').in( arrRequestProduct ).// like
        //limit(10).
        sort('-name').
        populate('category').
        exec(function(err, Products) {
            if (err) throw err;

            if (!Products) {
                res.json({ success: false, message: 'Products not found :(' + arrRequestProduct.join(', ') + ')', data: arrRequestProduct });
            
            } 
            else if (Products) {
                //Jimmy compare if all products exists
                var arrUnfoundProducts = [];
                var arrOrderLines = [];
                for ( keyRp in arrRequestProduct){
                    var tmpProduct = null;
                    for ( keyP in Products){
                        if( Products[keyP].idProduct == arrRequestProduct[keyRp] ){
                            tmpProduct = Products[keyP];
                            break;
                        }
                    }
                    if(! tmpProduct ){
                        arrUnfoundProducts.push(arrRequestProduct[keyRp]);
                    }
                    else{ //Product Found - Add to orderLines
                        tmpProduct.CategoryData = undefined;
                        tmpProduct.productEvaluation = undefined;
                        tmpProduct.productComment = undefined;
                        tmpProduct.creationDate = undefined;
                        tmpProduct.modificationDate = undefined;
                        arrOrderLines.push({ productId : tmpProduct.productId, product : tmpProduct, quantity: arrRequestQuantity[keyRp] });
                    }
                }
                console.log(arrOrderLines);

                if( arrUnfoundProducts.length > 0 ){
                    res.json({ success: false, message: 'Products not found :(' + arrUnfoundProducts.join(', ') + ')', data: arrUnfoundProducts });
                }
                else{//All products found
                    var dataOrder = new Order({ 
                        idUser: user.idUser,
                        address: req.body.address, 
                        creationDate: Date(), 
                        //total: commonHelper.calculateTotalProd(req.body['orderLines[]']), 
                        status: "unpaid", 
                        city: req.body.city, 
                        //totalTax: commonHelper.calculateTotalProd(req.body['orderLines[]']), 
                        orderLines: arrOrderLines, 
                        //orderLines: req.body['orderLines[]'], 
                        //approvalCode: "bien", 
                        modificationDate: Date() 
                    });
                    dataOrder.save(function(err) {
                        if (err) throw err;

                        var msgResponse = 'Order saved successfully';
                        console.log(msgResponse);
                        res.json({ success: true, message: msgResponse, data: dataOrder });
                    });

                }

            }
        });
        
    }
});

//http://localhost:8888/order/createOrderWithPayment
moduleRoutes.post('/createOrderWithPayment', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var validationResponse = commonHelper.getValidationResponse();
    var HelperValidator = commonHelper.validator;
    var token = req.body.token || req.param('token') || req.headers['x-access-token'];
    var user = authenticationHelper.getUserByToken(token);
    
    if(! ( HelperValidator.isNumeric( user.idUser ) && user.idUser != "" )  ){
        validationResponse.addError("Invalid idUser: " + user.idUser);
    }
    if(! ( HelperValidator.isAscii( req.body.address ) && req.body.address != "" )  ){
        validationResponse.addError("Invalid address: " + req.body.address);
    }
    if(! ( HelperValidator.isAscii( req.body.city ) && req.body.city != "" )  ){
        validationResponse.addError("Invalid city: " + req.body.city);
    }
    if(! ( HelperValidator.isAscii( req.body.country ) && req.body.country != "" )  ){
        validationResponse.addError("Invalid country: " + req.body.country);
    }
    
    //if(! ( HelperValidator.isJSON( req.body['orderLines[]'] ) && req.body['orderLines[]'] != "" )  ){
    //    validationResponse.addError("Invalid orderLines: " + req.body['orderLines[]']);
    //}
    //
    req.body['product'] = (req.body['product'] == undefined)? []: req.body['product'];
    req.body['quantity'] = (req.body['quantity'] == undefined)? []: req.body['quantity'];

    var arrRequestProduct = (typeof req.body['product'] == "string")? [req.body['product']]: req.body['product'];
    var arrRequestQuantity = (typeof req.body['quantity'] == "string")? [req.body['quantity']]: req.body['quantity'];
    
    if(! ( HelperValidator.isAscii( req.body['product'] ) && typeof arrRequestProduct == "object" )  ){
        validationResponse.addError("Invalid product: " + req.body['product']);
    }
    if(! ( HelperValidator.isAscii( req.body['quantity'] ) && typeof arrRequestQuantity == "object" )  ){
        validationResponse.addError("Invalid quantity: " + req.body['quantity']);
    }
    if(! ( arrRequestProduct.length == arrRequestQuantity.length  && arrRequestProduct.length > 0  && arrRequestQuantity.length > 0) ){
        validationResponse.addError("Invalid quanties x product: (" + arrRequestProduct.length + " - " + arrRequestQuantity.length + ") ");
    }
    //Credid Card
    if(! ( HelperValidator.isCreditCard( req.body.cc_number ) && req.body.cc_number != "" )  ){
        validationResponse.addError("Invalid credid Card: " + req.body.cc_number);
    }
    if(! ( HelperValidator.isInt( req.body.cc_code , { min: 100, max: 999 }) && req.body.cc_code != "" )  ){
        validationResponse.addError("Invalid cc_code: " + req.body.cc_code);
    }
    if(! ( HelperValidator.isInt( req.body.cc_month ) && req.body.cc_month != "" )  ){
        validationResponse.addError("Invalid cc_month: " + req.body.cc_month);
    }
    if(! ( HelperValidator.isInt( req.body.cc_year ) && req.body.cc_year != "" )  ){
        validationResponse.addError("Invalid cc_year: " + req.body.cc_year);
    }
    
    if(! validationResponse.success){
        res.json(validationResponse);
    }
    else { 
        Product.find({}).
        where('idProduct').in( arrRequestProduct ).// like
        //limit(10).
        sort('-name').
        populate('category').
        exec(function(err, Products) {
            if (err) throw err;

            if (!Products) {
                res.json({ success: false, message: 'Products not found :(' + arrRequestProduct.join(', ') + ')', data: arrRequestProduct });
            
            } 
            else if (Products) {
                //Jimmy compare if all products exists
                var arrUnfoundProducts = [];
                var arrOrderLines = [];
                for ( keyRp in arrRequestProduct){
                    var tmpProduct = null;
                    for ( keyP in Products){
                        if( Products[keyP].idProduct == arrRequestProduct[keyRp] ){
                            tmpProduct = Products[keyP];
                            break;
                        }
                    }
                    if(! tmpProduct ){
                        arrUnfoundProducts.push(arrRequestProduct[keyRp]);
                    }
                    else{ //Product Found - Add to orderLines
                        tmpProduct.CategoryData = undefined;
                        tmpProduct.productEvaluation = undefined;
                        tmpProduct.productComment = undefined;
                        tmpProduct.creationDate = undefined;
                        tmpProduct.modificationDate = undefined;
                        arrOrderLines.push({ productId : tmpProduct.productId, product : tmpProduct, quantity: arrRequestQuantity[keyRp] });
                    }
                }
                console.log(arrOrderLines);

                if( arrUnfoundProducts.length > 0 ){
                    res.json({ success: false, message: 'Products not found :(' + arrUnfoundProducts.join(', ') + ')', data: arrUnfoundProducts });
                }
                else{//All products found
                    var dataOrder = new Order({ 
                        idUser: user.idUser,
                        address: req.body.address, 
                        creationDate: Date(), 
                        //total: commonHelper.calculateTotalProd(req.body['orderLines[]']), 
                        status: "paid", 
                        city: req.body.city, 
                        //totalTax: commonHelper.calculateTotalProd(req.body['orderLines[]']), 
                        orderLines: arrOrderLines, 
                        //orderLines: req.body['orderLines[]'], 
                        //approvalCode: "bien", 
                        modificationDate: Date() 
                    });
                    dataOrder.save(function(err) {
                        if (err) throw err;
                        /*Payment*/
                        var dataPayment = new Payment({ 
                            code: dataOrder._id, 
                            status: "approved", 
                            creationDate: Date() 
                        }); 
                        dataPayment.save(function(err) {
                            if (err) throw err;

                            //res.json({ success: true, message: msgResponse, data: dataPayment });
                            var msgResponse = 'Order saved successfully\nPayment successfully';
                            console.log(msgResponse);
                            res.json({ success: true, message: msgResponse, data: dataOrder, dataPayment: dataPayment });
                        });
                    });

                }

            }
        });
        
    }
});

//http://localhost:8888/order/updateOrder
moduleRoutes.post('/updateOrder', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var validationResponse = commonHelper.getValidationResponse();
    var HelperValidator = commonHelper.validator;
    
    if(! ( HelperValidator.isNumeric( req.body.idOrder ) && req.body.idOrder != "" )  ){
        validationResponse.addError("Invalid number: " + req.body.idOrder);
    }
    
    if(! ( HelperValidator.isAscii( req.body.status ) && req.body.status != "" )  ){
        validationResponse.addError("Invalid status: " + req.body.status);
    }
    if(! ( HelperValidator.isAscii( req.body.address ) && req.body.address != "" )  ){
        validationResponse.addError("Invalid address: " + req.body.address);
    }
    if(! ( HelperValidator.isAscii( req.body.city ) && req.body.city != "" )  ){
        validationResponse.addError("Invalid city: " + req.body.city);
    }
    if(! ( HelperValidator.isAscii( req.body.approvalCode ) && req.body.approvalCode != "" )  ){
        validationResponse.addError("Invalid approvalCode: " + req.body.approvalCode);
    }
    
    if(! ( HelperValidator.isJSON( req.body['orderLines[]'] ) && req.body['orderLines[]'] != "" )  ){
        validationResponse.addError("Invalid orderLines: " + req.body['orderLines[]']);
    }
    
    if(! validationResponse.success){
        res.json(validationResponse);
    }
    else {
        var queryWhere = { idOrder: req.body.idOrder };
        Order.findOne( queryWhere ).
            select('idOrder').
            exec( function(err, order){
                if (err) throw err;

                if (!order) {
                    res.json({ success: false, message: 'Order not found.', data: [] });
                } 
                else if (order) {
                    var updateFields = {  
                        address: req.body.address,
                        total: commonHelper.calculateTotalProd(req.body['orderLines[]']), 
                        status: req.body.status, 
                        city: req.body.city,
                        totalTax: commonHelper.calculateTotalProd(req.body['orderLines[]']), 
                        orderLines: req.body['orderLines[]'], 
                        //approvalCode: req.body.approvalCode, 
                        //paymentDate: req.body.paymentDate, 
                        modificationDate: Date()  
                    };
                    
                    Order.update(
                        queryWhere, //query
                        updateFields, //update
                        function (err, raw) {
                            if (err) return handleError(err);

                            var msgResponse = 'Order updated successfully';
                            console.log(msgResponse);
                            res.json({ success: true, message: msgResponse, data: raw });
                        }
                    );

                }
            });


    }
});


//http://localhost:8888/order/removeOrder?idOrder=1
moduleRoutes.delete('/removeOrder', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var validationResponse = commonHelper.getValidationResponse();
    var HelperValidator = commonHelper.validator;
    
    if(! ( HelperValidator.isNumeric( req.query.idOrder ) && req.query.idOrder != "" )  ){
        validationResponse.addError("Invalid number: " + req.query.idOrder);
    }
    
     if(! validationResponse.success){
        res.json(validationResponse);
    }
    else {
        var queryWhere = { idOrder: req.body.idOrder };
        Order.findOne( queryWhere ).
            select('idOrder').
            exec( function(err, order){
                if (err) throw err;

                if (!order) {
                    res.json({ success: false, message: 'Order not found.', data: [] });
                } 
                else if (order) {
                    Order.remove({
                        idOrder: req.body.idOrder
                    }, function(err, order) {
                        if (err) throw err;

                        if (!order) {
                            res.json({ success: false, message: 'Error: Order can not deleted', data: Order });
                        } 
                        else if (order) {
                            res.json({
                                success: true,
                                message: 'Order Deleted',
                                data: order
                            });
                        }
                    });
                }
            });

            
    }
});
module.exports = moduleRoutes;