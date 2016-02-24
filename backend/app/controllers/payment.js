var pathServer = '../../';
var express     = require('express');
var config = require(pathServer + 'config');
var moduleRoutes = express.Router();


var Payment   = require(pathServer + 'app/models/payment');

//http://localhost:8888/payment/
moduleRoutes.get('/', function(req, res) {
        res.json({ success: false, message: 'Invalid Payment action', data: req.decoded });
});

//http://localhost:8888/payment/getPayment?code=888881919
moduleRoutes.get('/getPayment', function(req, res) {
    Payment.
        findOne({ code: req.query.code }).
        //where('code').equals(req.query.code).// =
        //where('code').gt(17).lt(66).// gt - lt
        //where('code').in(['code', req.query.code]).// like
        //limit(10).
        sort('-code').
        select('code status creationDate ').
        exec(function(err, payment) {
        if (err) throw err;

        if (!payment) {
            res.json({ success: false, message: 'Payment not found.', data: [] });
        } 
        else if (payment) {
                res.json({
                success: true,
                message: 'Payment Found',
                data: payment
            });
        }
    });
});

//http://localhost:8888/payment/getPaymentsList
moduleRoutes.get('/getPaymentsList', function(req, res) {
    Payment.find({}).
    //where('idCategory').equals(req.query.idCategory).// =
    //where('idCategory').gt(17).lt(66).// gt - lt
    //where('idCategory').in(['idCategory', req.query.idCategory]).// like
    //limit(10).
    sort('-idCategory').
    select('code status creationDate ').
    exec(function(err, Payments) {
        res.json({ success: true, message: 'Payment List:', data: Payments });
    });
});

//http://localhost:8888/payment/createPayment
moduleRoutes.post('/createPayment', function(req, res) {
   var dataPayment = new Payment({ 
        code: req.body.code, 
        status: req.body.status, 
        creationDate: req.body.creationDate 
    }); 
    dataPayment.save(function(err) {
        if (err) throw err;

        var msgResponse = 'Payment saved successfully';
        console.log(msgResponse);
        res.json({ success: true, message: msgResponse, data: dataPayment });
    });
});

//http://localhost:8888/payment/updatePayment?code=888881919
moduleRoutes.post('/updatePayment', function(req, res) {
    var queryWhere = { code: req.body.code };
    var updateFields = {  
        code: req.body.code, 
        status: req.body.status, 
        creationDate: req.body.creationDate 
    };
    
    Payment.update(
        queryWhere, //query
        updateFields, //update
        function (err, raw) {
            if (err) return handleError(err);

            var msgResponse = 'Payment updated successfully';
            console.log(msgResponse);
            res.json({ success: true, message: msgResponse, data: raw });
        }
    );
});
 
//http://localhost:8888/payment/setup
moduleRoutes.get('/setup', function(req, res) {
   var dataPayment = new Payment({ 
    code: String, 
    status: String, 
    creationDate: Date 
    }); 
    dataPayment.save(function(err) {
        if (err) throw err;

        var msgResponse = 'Payment saved successfully';
        console.log(msgResponse);
        res.json({ success: true, message: msgResponse, data: dataPayment });
    });
});

//http://localhost:8888/payment/removePayment?code=888881919
moduleRoutes.delete('/removePayment', function(req, res) {
    Payment.remove({
        code: req.body.code
    }, function(err, payment) {
        if (err) throw err;

        if (!payment) {
            res.json({ success: false, message: 'Error: Payment can not deleted', data: Payment });
        } 
        else if (payment) {
            res.json({
                success: true,
                message: 'Payment Deleted',
                data: payment
            });
        }
    });
});
module.exports = moduleRoutes;