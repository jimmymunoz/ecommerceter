var pathServer = '../../';
var express     = require('express');
var config = require(pathServer + 'config');
var jwt    = require('jsonwebtoken');

//Models:
var User   = require(pathServer + 'app/models/user'); 
//Helpers:
var commonHelper   = require(pathServer + 'app/helpers/common'); 

var moduleRoutes = express.Router();
//Public Methods:
//http://localhost:8888/user/setup



//http://localhost:8888/user/createUser
moduleRoutes.get('/singup', function(req, res) {
    //Call to validationSingUp -> User Module
    var validationResponse = User.validateSignUp(req.query);
    console.log(req.query);
    //Validate response
    if(! validationResponse.success ){ //Validation errors
        var msgResponse = validationResponse.formatErrors();
        console.log(msgResponse);
        res.json({ success: false, message: msgResponse, data: [] });
    }
    else{ //validation ok
        var dataUser = new User({ 
            firstName: req.body.firstName, 
            lastName: req.body.lastName, 
            email: req.body.email, 
            password: req.body.password, 
            rol: "client", 
            creationDate: new Date(), 
            updateDate: new Date() 
        }); 
        dataUser.save(function(err) {
            if (err) throw err;
            
            var msgResponse = 'User saved successfully';
            console.log(msgResponse);
            res.json({ success: true, message: msgResponse, data: [] });
        });
    }
});


module.exports = moduleRoutes;
