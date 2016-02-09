var pathServer = "../../";
var express 	= require('express');
var config = require(pathServer + 'config');
var jwt    = require('jsonwebtoken'); 
//Models:
var moduleRoutes = express.Router();


//Public Methods:
var Payment   = require(pathServer + 'app/models/payment'); 
//http://localhost:8080/payment/setup
moduleRoutes.get('/setup', function(req, res) {
   var dataPayment = new Payment({ 
        code: '888881919', 
        status: 'accepted' 
    }); 
    dataPayment.save(function(err) {
        if (err) throw err;

        var msgResponse = 'Payment saved successfully';
        console.log(msgResponse);
        res.json({ success: true, msgResponse: msgResponse, data: [] });
    });
});
//http://localhost:8080/payment/getPaymentsList
moduleRoutes.get('/getPaymentsList', function(req, res) {
        Payment.find({}, function(err, Payments) {
                res.json({ success: true, message: 'Payment List:', data: Payments });
        });
});
//http://localhost:8080/payment/gePayment?code=888881919
moduleRoutes.get('/getPayment', function(req, res) {
        Payment.findOne({
                code: req.body.code
        }, function(err, payment) {
                if (err) throw err;

                if (!payment) {
                        res.json({ success: false, message: 'Payment not found.:(', data: [] });
                } 
                else if (payment) {

                        res.json({
                                success: true,
                                message: 'Payment Found :)',
                                data: payment
                        });
                }
        });
});
module.exports = moduleRoutes;
