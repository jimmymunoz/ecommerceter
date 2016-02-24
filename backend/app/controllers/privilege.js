var pathServer = '../../';
var express     = require('express');
var config = require(pathServer + 'config');
var moduleRoutes = express.Router();


var Privilege   = require(pathServer + 'app/models/privilege');

//http://localhost:8888/privilege/
moduleRoutes.get('/', function(req, res) {
    res.json({ success: false, message: 'Invalid Privilege action', data: req.decoded });
});

//http://localhost:8888/privilege/getPrivilege?action=test
moduleRoutes.get('/getPrivilege', function(req, res) {
    var validationResponse = commonHelper.getValidationResponse();
    var HelperValidator = commonHelper.validator;

    Privilege.
        findOne({ action: req.query.action }).
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
    sort('-idCategory').
    select('action rol ').
    exec(function(err, Privileges) {
        res.json({ success: true, message: 'Privilege List:', data: Privileges });
    });
});

//http://localhost:8888/privilege/createPrivilege
moduleRoutes.post('/createPrivilege', function(req, res) {
    var validationResponse = commonHelper.getValidationResponse();
    var HelperValidator = commonHelper.validator;

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

//http://localhost:8888/privilege/removePrivilege?action=test
moduleRoutes.delete('/removePrivilege', function(req, res) {
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