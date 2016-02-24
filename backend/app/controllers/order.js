var pathServer = '../../';
var express     = require('express');
var config = require(pathServer + 'config');
var moduleRoutes = express.Router();
 

var Order   = require(pathServer + 'app/models/order');
//Helpers:
var commonHelper   = require(pathServer + 'app/helpers/common'); 

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
    Order.find({}).
    sort('-idCategory').
    select('idUser idOrder address creationDate total status city totalTax orderLines approvalCode paymentDate modificationDate ').
    exec(function(err, Orders) {
        res.json({ success: true, message: 'Order List:', data: Orders });
    });
});
//http://localhost:8888/order/getClientOrder?idUser=1
moduleRoutes.post('/getClientOrder', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var validationResponse = commonHelper.getValidationResponse();
    var HelperValidator = commonHelper.validator;
    
    if(! ( HelperValidator.isNumeric( req.query.idUser ) && req.query.idUser != "" )  ){
      validationResponse.addError("Invalid idUser: " + req.query.idUser);
    }
    
    if(! validationResponse.success){
        res.json(validationResponse);
    }
    else {
    Order.find({
        idUser: req.query.idUser
    }, function(err, order) {
        if (err) throw err;

        if (!order) {
            res.json({ success: false, message: 'Error: Order not found', data: Order });
        } 
        else if (order) {
            res.json({
                success: true,
                message: 'Order found',
                data: order
            });
        }
    });
    }
});

//http://localhost:8888/order/changeStatus?idOrder=1
moduleRoutes.post('/changeStatus', function(req, res) {
res.setHeader('Access-Control-Allow-Origin', '*');
    var validationResponse = commonHelper.getValidationResponse();
    var HelperValidator = commonHelper.validator;
    
    if(! ( HelperValidator.isNumeric( req.query.idOrder ) && req.query.idOrder != "" )  ){
      validationResponse.addError("Invalid number: " + req.query.idOrder);
    }
    
    if(! ( HelperValidator.isAscii( req.body.status ) && req.body.status != "" )  ){
      validationResponse.addError("Invalid status: " + req.body.status);
    }

    if(! validationResponse.success){
        res.json(validationResponse);
    }
    else {
        var queryWhere = { idOrder: req.query.idOrder };
        var updateFields = {  
            idOrder: req.query.idOrder, 
            status: req.body.status
        };
        
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
   //console.log(req.body);
    res.setHeader('Access-Control-Allow-Origin', '*');
   
    var validationResponse = commonHelper.getValidationResponse();
    var HelperValidator = commonHelper.validator;
    if(! ( HelperValidator.isAscii( req.body.address ) && req.body.address != "" )  ){
      validationResponse.addError("Invalid address: " + req.body.address);
    }
    
    if(! ( HelperValidator.isAscii( req.body.city ) && req.body.city != "" )  ){
      validationResponse.addError("Invalid city: " + req.body.city);
    }
    
    if(! ( HelperValidator.isJSON( req.body['orderLines[]'] ) && req.body['orderLines[]'] != "" )  ){
      validationResponse.addError("Invalid orderLines: " + req.body['orderLines[]']);
    }

    if(! validationResponse.success){
        res.json(validationResponse);
    }
    else {     
        var dataOrder = new Order({ 
            idUser: req.body.idUser,
            address: req.body.address, 
            creationDate: Date(), 
            total: commonHelper.calculateTotalProd(req.body['orderLines[]']), 
            status: req.body.status, 
            city: req.body.city, 
            totalTax: commonHelper.calculateTotalProd(req.body['orderLines[]']), 
            orderLines: req.body['orderLines[]'], 
            approvalCode: "bien", 
            modificationDate: Date() 
        });
        dataOrder.save(function(err) {
            if (err) throw err;

            var msgResponse = 'Order saved successfully';
            console.log(msgResponse);
            res.json({ success: true, message: msgResponse, data: dataOrder });
        });
    }
   
});

//http://localhost:8888/order/updateOrder?idOrder=1
moduleRoutes.post('/updateOrder', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var validationResponse = commonHelper.getValidationResponse();
    var HelperValidator = commonHelper.validator;
    
    if(! ( HelperValidator.isNumeric( req.query.idOrder ) && req.query.idOrder != "" )  ){
      validationResponse.addError("Invalid number: " + req.query.idOrder);
    }
    
    if(! ( HelperValidator.isAscii( req.body.status ) && req.body.status != "" )  ){
      validationResponse.addError("Invalid status: " + req.body.status);
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
        var queryWhere = { idOrder: req.query.idOrder };
        var updateFields = {  
            idOrder: req.query.idOrder, 
            //address: req.body.address, à rajouter
            total: commonHelper.calculateTotalProd(req.body['orderLines[]']), 
            status: req.body.status, 
            //city: req.body.city, à rajouter
            totalTax: commonHelper.calculateTotalProd(req.body['orderLines[]']), 
            orderLines: req.body['orderLines[]'], 
            approvalCode: req.body.approvalCode, 
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
        Order.remove({
            idOrder: req.query.idOrder
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
module.exports = moduleRoutes;