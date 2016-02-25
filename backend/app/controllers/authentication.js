var pathServer = '../../';
var express     = require('express');
var config = require(pathServer + 'config');
var SHARED_DATA   = require(pathServer + 'app/helpers/data');
//Models:
var User   = require(pathServer + 'app/models/user'); 
//Helpers:
var commonHelper   = require(pathServer + 'app/helpers/common'); 
var authenticationHelper   = require(pathServer + 'app/helpers/authentication'); 

var moduleRoutes = express.Router();
//Public Methods:

//http://localhost:8888/authentication/singup
moduleRoutes.post('/singup', function(req, res) {
    var validationResponse = commonHelper.getValidationResponse();
    var HelperValidator = commonHelper.validator;
    var email = (req.body.email == undefined)? "": req.body.email;
    email = email.toLowerCase();

    if(! HelperValidator.isEmail( email) ){ 
        validationResponse.addError("Invalid email: " + email);
    }
    if(! HelperValidator.isAscii( req.body.firstName ) 
        && req.body.lastName != "" ){
        validationResponse.addError("Invalid firstName: " + req.body.firstName);
    }
    if(! HelperValidator.isAscii( req.body.lastName) 
        && req.body.lastName != "" ){ 
        validationResponse.addError("Invalid lastName: " + req.body.lastName);
    }
    if(! (HelperValidator.isAlphanumeric( req.body.password) 
        && HelperValidator.isLength(req.body.password, {min: 5, max: 10}) ) ){ 
        validationResponse.addError("Le mot de pass doit être une chaine de characters Alphanumerique entre (5 - 10) : " + req.body.password);
    }

    //Validate response
    if(! validationResponse.success ){ //Validation errors
        var msgResponse = validationResponse.formatErrors();
        console.log(msgResponse);
        res.json({ success: false, message: msgResponse, data: [] });
    }
    else{ //validation ok
        User.findOne({ email: email }).
            select('idUser, email').
            exec( function(err, user){
                if (err) throw err;

                if (!user){

                    var encryptedPassword = authenticationHelper.encrypt(req.body.password);
                    
                    var dataUser = new User({ 
                        firstName: req.body.firstName, 
                        lastName: req.body.lastName, 
                        email: email, 
                        password: encryptedPassword, 
                        rol: "client", 
                        creationDate: new Date(), 
                        updateDate: new Date() 
                    }); 
                    dataUser.save(function(err) {
                        if (err) throw err;
                        var msgResponse = 'User saved successfully';
                        console.log(msgResponse);
                        dataUser.password = undefined;
                        res.json({ success: true, message: msgResponse, data: dataUser });
                    });

                }
                else{
                    res.json({ success: false, message: 'Email (' + email + ') Already Exists ', data: [] });
                }
            });

    }
});



moduleRoutes.post('/login', function(req, res) {
    var validationResponse = commonHelper.getValidationResponse();
    var HelperValidator = commonHelper.validator;
    var email = (req.body.email == undefined)? "": req.body.email;
    email = email.toLowerCase();

    if(! HelperValidator.isEmail( email) ){ 
        validationResponse.addError("Invalid email: " + email);
    }
    
    if(! HelperValidator.isAlphanumeric( req.body.password) 
        && HelperValidator.isLength(req.body.password, {min: 0, max: 10}) ){ 
        validationResponse.addError("Le mot de pass doit être une chaine de characters Alphanumerique entre (5 - 10) : " + req.body.password);
    }

    if(! validationResponse.success ){ //Validation errors
        var msgResponse = validationResponse.formatErrors();
        console.log(msgResponse);
        res.json({ success: false, message: msgResponse, data: [] });
    }
    else{
        //User.getUserBy();
        User.findOne({ email: email }).
            select('idUser firstName lastName email password address image phone rol InscriptionDate updateDate ').
            exec(function(err, user) {
                if (err) throw err;

                if (!user) {
                    res.json({ success: false, message: 'Email not found : ' + email , data: [] });
                } 
                else if (user) {
                    //Email found!
                    if( user.password != undefined ){

                        var decryptedPassword = authenticationHelper.decrypt(user.password);
                        if( req.body.password == decryptedPassword ){
                            user.password = undefined;

                            var token = authenticationHelper.createToken(user);

                            res.json({
                                success: true,
                                message: 'Login ok',
                                data: user,
                                token: token
                            });
                        }
                        else{
                            res.json({
                                success: false,
                                message: 'Invalid Password',
                                data: []
                            });
                        }
                    }
                    else{
                        res.json({
                            success: false,
                            message: 'Password error',
                            data: []
                        });
                    }
                }
            }
        );

    }
});



module.exports = moduleRoutes;
