var pathServer = '../../';
var express     = require('express');
var config = require(pathServer + 'config');
var jwt    = require('jsonwebtoken'); 
var moduleRoutes = express.Router();


var Privilege   = require(pathServer + 'app/models/privilege');

//http://localhost:8888/privilege/
moduleRoutes.get('/', function(req, res) {
        res.json({ success: false, message: 'Invalid Privilege action', data: req.decoded });
});

//http://localhost:8888/privilege/getPrivilege?action=test
moduleRoutes.get('/getPrivilege', function(req, res) {
    Privilege.
        findOne({ action: req.query.action }).
        //where('action').equals(req.query.action).// =
        //where('action').gt(17).lt(66).// gt - lt
        //where('action').in(['action', req.query.action]).// like
        //limit(10).
        sort('-action').
        select('action rol ').
        exec(function(err, privilege) {
        if (err) throw err;

        if (!privilege) {
            res.json({ success: false, message: 'Privilege not found.', data: [] });
        } 
        else if (privilege) {
                res.json({
                success: true,
                message: 'Privilege Found',
                data: privilege
            });
        }
    });
});

//http://localhost:8888/privilege/getPrivilegesList
moduleRoutes.get('/getPrivilegesList', function(req, res) {
    Privilege.find({}).
    //where('idCategory').equals(req.query.idCategory).// =
    //where('idCategory').gt(17).lt(66).// gt - lt
    //where('idCategory').in(['idCategory', req.query.idCategory]).// like
    //limit(10).
    sort('-idCategory').
    select('action rol ').
    exec(function(err, Privileges) {
        res.json({ success: true, message: 'Privilege List:', data: Privileges });
    });
});

//http://localhost:8888/privilege/createPrivilege
moduleRoutes.post('/createPrivilege', function(req, res) {
   var dataPrivilege = new Privilege({ 
        action: req.body.action, 
        rol: req.body.rol 
    }); 
    dataPrivilege.save(function(err) {
        if (err) throw err;

        var msgResponse = 'Privilege saved successfully';
        console.log(msgResponse);
        res.json({ success: true, message: msgResponse, data: dataPrivilege });
    });
});

//http://localhost:8888/privilege/updatePrivilege?action=test
moduleRoutes.post('/updatePrivilege', function(req, res) {
    var queryWhere = { action: req.body.action };
    var updateFields = {  
        action: req.body.action, 
        rol: req.body.rol 
    };
    
    Privilege.update(
        queryWhere, //query
        updateFields, //update
        function (err, raw) {
            if (err) return handleError(err);

            var msgResponse = 'Privilege updated successfully';
            console.log(msgResponse);
            res.json({ success: true, message: msgResponse, data: raw });
        }
    );
});
 
//http://localhost:8888/privilege/setup
moduleRoutes.get('/setup', function(req, res) {
   var dataPrivilege = new Privilege({ 
    action: String, 
    rol: String 
    }); 
    dataPrivilege.save(function(err) {
        if (err) throw err;

        var msgResponse = 'Privilege saved successfully';
        console.log(msgResponse);
        res.json({ success: true, message: msgResponse, data: dataPrivilege });
    });
});

//http://localhost:8888/privilege/removePrivilege?action=test
moduleRoutes.post('/removePrivilege', function(req, res) {
    Privilege.remove({
        action: req.body.action
    }, function(err, privilege) {
        if (err) throw err;

        if (!privilege) {
            res.json({ success: false, message: 'Error: Privilege can not deleted', data: Privilege });
        } 
        else if (privilege) {
            res.json({
                success: true,
                message: 'Privilege Deleted',
                data: privilege
            });
        }
    });
});
module.exports = moduleRoutes;