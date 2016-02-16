var pathServer = '../../';
var express 	= require('express');
var config = require(pathServer + 'config');
var jwt    = require('jsonwebtoken'); 
var moduleRoutes = express.Router();


var Order   = require(pathServer + 'app/models/order');

//http://localhost:8888/order/
moduleRoutes.get('/', function(req, res) {
        res.json({ success: false, message: 'Invalid Order action', data: req.decoded });
});

//http://localhost:8888/order/getOrder?idOrder=1
moduleRoutes.get('/getOrder', function(req, res) {
    Order.
        findOne({ idOrder: req.query.idOrder }).
        //where('idOrder').equals(req.query.idOrder).// =
        //where('idOrder').gt(17).lt(66).// gt - lt
        //where('idOrder').in(['idOrder', req.query.idOrder]).// like
        //limit(10).
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
});

//http://localhost:8888/order/getOrdersList
moduleRoutes.get('/getOrdersList', function(req, res) {
    Order.find({}).
    //where('idCategory').equals(req.query.idCategory).// =
    //where('idCategory').gt(17).lt(66).// gt - lt
    //where('idCategory').in(['idCategory', req.query.idCategory]).// like
    //limit(10).
    sort('-idCategory').
    select('idOrder address creationDate total status city totalTax orderLines approvalCode paymentDate modificationDate ').
    exec(function(err, Orders) {
        res.json({ success: true, message: 'Order List:', data: Orders });
    });
});

function getNextSequence(name) {
   var ret = db.counters.findAndModify(
          {
            query: { _id: name },
            update: { $inc: { seq: 1 } },
            new: true
          }
   );

   return ret.seq;
}

//http://localhost:8888/order/createOrder
moduleRoutes.post('/createOrder', function(req, res) {
	//var tmp = encodeURIComponent(JSON.stringify({productId:1, total:10}))
	
	//console.log(tmp);
	//return;
	/*var myObj = JSON.parse('[{"p": 5},{"p": 4}]');
	console.log(myObj);
	var lines = req.body['orderLines[0]'];
	console.log(lines*/
	/*var orderLines = JSON.parse(req.body['orderLines[]'])
   console.log( orderLines );
   console.log( orderLines[0] );*/
	var obj = JSON.parse(req.body['orderLines[]'])
	console.log( obj );
	console.log(obj[0]);
	/*try{
		for(var i in  obj)
		{  
			var s = orderLines[i];
		    console.log(s);  
		}	
	}
	catch(e){
		console.log("Parsing error:", e);
	}
	*/
	



 /*  var dataOrder = new Order({ 
        idOrder: getNextSequence("OrderId"), 
        address: req.body.address, 
        creationDate: Date(), 
        total: req.body.total, 
        status: req.body.status, 
        city: req.body.city, 
        totalTax: req.body.totalTax, 
        orderLines: req.body.orderLines, 
        approvalCode: req.body.approvalCode, 
        modificationDate: Date() 
    }); 
	console.log("body");
	console.log( req.body );
    dataOrder.save(function(err) {
        if (err) throw err;

        var msgResponse = 'Order saved successfully';
        console.log(msgResponse);
        res.json({ success: true, message: msgResponse, data: dataOrder });
    });*/
});

//http://localhost:8888/order/updateOrder?idOrder=1
moduleRoutes.post('/updateOrder', function(req, res) {
    var queryWhere = { idOrder: req.body.idOrder };
    var updateFields = {  
        idOrder: req.body.idOrder, 
        address: req.body.address, 
        creationDate: req.body.creationDate, 
        total: req.body.total, 
        status: req.body.status, 
        city: req.body.city, 
        totalTax: req.body.totalTax, 
        orderLines: req.body.orderLines, 
        approvalCode: req.body.approvalCode, 
        paymentDate: req.body.paymentDate, 
        modificationDate: req.body.modificationDate 
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
});
 
//http://localhost:8888/order/setup
moduleRoutes.get('/setup', function(req, res) {
   var dataOrder = new Order({ 
    idOrder: Number, 
    address: String, 
    creationDate: Date, 
    total: Number, 
    status: String, 
    city: String, 
    totalTax: String, 
    orderLines: Array, 
    approvalCode: String, 
    paymentDate: Date, 
    modificationDate: Date 
    }); 
    dataOrder.save(function(err) {
        if (err) throw err;

        var msgResponse = 'Order saved successfully';
        console.log(msgResponse);
        res.json({ success: true, message: msgResponse, data: dataOrder });
    });
});

//http://localhost:8888/order/removeOrder?idOrder=1
moduleRoutes.post('/removeOrder', function(req, res) {
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
});
module.exports = moduleRoutes;