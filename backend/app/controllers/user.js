var pathServer = '../../';
var express 	= require('express');
var config = require(pathServer + 'config');
var moduleRoutes = express.Router();
//Models:
var User   = require(pathServer + 'app/models/user');
var authenticationHelper   = require(pathServer + 'app/helpers/authentication');
//Helpers:
var commonHelper   = require(pathServer + 'app/helpers/common');


//http://localhost:8888/user/
moduleRoutes.get('/', function(req, res) {
    res.json({ success: false, message: 'Invalid User action', data: req.decoded });
});

//http://localhost:8888/user/getMyUser
moduleRoutes.get('/getMyUser', function(req, res) {
    var validationResponse = commonHelper.getValidationResponse();
    var HelperValidator = commonHelper.validator;

    var token = req.body.token || req.param('token') || req.headers['x-access-token'];
    var user = authenticationHelper.getUserByToken(token);
    
    console.log("user: ");
    console.log(user);

    if(! ( HelperValidator.isNumeric( user.idUser ) )  ){
        validationResponse.addError("User not found (" + user.idUser + ") - Login required");
    }

    if(! validationResponse.success){
        res.json(validationResponse);
    }
    else {
        User.findOne({ idUser: user.idUser }).
            sort('-idUser').
            select('idUser firstName lastName email address image phone rol InscriptionDate updateDate ').
            exec(function(err, user) {
            if (err) throw err;

            if (!user) {
                res.json({ success: false, message: 'User not found.', data: [] });
            } 
            else if (user) {
                    res.json({
                    success: true,
                    message: 'User Found',
                    data: user
                });
            }
        });
    }

});

//http://localhost:8888/user/getUser?idUser=1
moduleRoutes.get('/getUser', function(req, res) {
    var validationResponse = commonHelper.getValidationResponse();
    var HelperValidator = commonHelper.validator;

    if(! ( HelperValidator.isNumeric( req.query.idUser ) )  ){
        validationResponse.addError("User not found (" + user.idUser + ")");
    }

    if(! validationResponse.success){
        res.json(validationResponse);
    }
    else {
        User.
            findOne({ idUser: req.query.idUser }).
            //where('idUser').equals(req.query.idUser).// =
            //where('idUser').gt(17).lt(66).// gt - lt
            //where('idUser').in(['idUser', req.query.idUser]).// like
            //limit(10).
            sort('-idUser').
            select('idUser firstName lastName email address image phone rol InscriptionDate updateDate ').
            exec(function(err, user) {
            if (err) throw err;

            if (!user) {
                res.json({ success: false, message: 'User not found.', data: [] });
            } 
            else if (user) {
                    res.json({
                    success: true,
                    message: 'User Found',
                    data: user
                });
            }
        });
    }
});

//http://localhost:8888/user/getUsersList
moduleRoutes.get('/getUsersList', function(req, res) {
    var validationResponse = commonHelper.getValidationResponse();
    var HelperValidator = commonHelper.validator;

    var query = {};
    var page = (req.query.page != undefined )? req.query.page : 1 ;
    var page_size = (req.query.page_size != undefined )? req.query.page_size : config.default_page_size_pagination ;
    User.count(query, function(err, total_results) {
        if (err) throw err;
        //  res.json({ success: true, message: 'Product List:', data: out, pagination: commonHelper.getPaginationResult(total_results, page_size, page) });
        User.find({}).
        //where('idCategory').equals(req.query.idCategory).// =
        //where('idCategory').gt(17).lt(66).// gt - lt
        //where('idCategory').in(['idCategory', req.query.idCategory]).// like
        //limit(10).
        sort('-idCategory').
        select('idUser firstName lastName email password address image phone rol InscriptionDate updateDate ').
        exec(function(err, Users) {
            res.json({ success: true, message: 'User List:', data: Users, pagination: commonHelper.getPaginationResult(total_results, page_size, page) });
        });
        
    });
    
});

//http://localhost:8888/user/createUser
moduleRoutes.post('/createUser', function(req, res) {
    var validationResponse = commonHelper.getValidationResponse();
    var HelperValidator = commonHelper.validator;
    var rol = ( req.body.rol != undefined )? req.body.rol: '';
    var arrRols = commonHelper.getDataByKey('rol');
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
    if(! validationResponse.success ){ //Validation errors
        var msgResponse = validationResponse.formatErrors();
        console.log(msgResponse);
        res.json({ success: false, message: msgResponse, data: [] });
    }
    if(! HelperValidator.isAscii( req.body.phone) 
        && req.body.phone != "" ){ 
        validationResponse.addError("Invalid phone: " + req.body.phone);
    }

    if(! ( HelperValidator.isAscii( req.body.rol) 
        && req.body.rol != "" 
        && arrRols.indexOf(rol) != -1 ) ){ 
        validationResponse.addError("Invalid rol: " + req.body.rol);
    }

    if(! validationResponse.success){
        res.json(validationResponse);
    }
    else {
        User.findOne({ email: email }).
            select('idUser, email').
            exec( function(err, user){
                if (err) throw err;

                if (!user){

                    var encryptedPassword = authenticationHelper.encrypt(req.body.password);

                    //Email no 
                    var dataUser = new User({ 
                        //idUser: req.body.idUser, 
                        firstName: req.body.firstName, 
                        lastName: req.body.lastName, 
                        email: email, 
                        //password: req.body.password, 
                        password: encryptedPassword,
                        address: req.body.address, 
                        //image: req.body.image, 
                        phone: req.body.phone, 
                        rol: req.body.rol, 
                        InscriptionDate: Date(), 
                        updateDate: Date() 
                    }); 
                    dataUser.save(function(err) {
                        if (err) throw err;

                        var msgResponse = 'User saved successfully';
                        console.log(msgResponse);
                        res.json({ success: true, message: msgResponse, data: dataUser });
                    });
                }
                else{
                    res.json({ success: false, errors: 'Email (' + email + ') Already Exists ', message: 'Email (' + email + ') Already Exists ', data: [] });
                }
            });
    }

});

//http://localhost:8888/user/updateUser?idUser=1
moduleRoutes.post('/updateUser', function(req, res) {
    var validationResponse = commonHelper.getValidationResponse();
    var HelperValidator = commonHelper.validator;
    var rol = ( req.body.rol != undefined )? req.body.rol: '';
    var arrRols = commonHelper.getDataByKey('rol');
    var email = (req.body.email == undefined)? "": req.body.email;
    email = email.toLowerCase();

    if(! HelperValidator.isNumeric( req.body.idUser) 
        && req.body.idUser != "" ){ 
        validationResponse.addError("Invalid idUser: " + req.body.idUser);
    }

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
    if(! HelperValidator.isAscii( req.body.phone) 
        && req.body.phone != "" ){ 
        validationResponse.addError("Invalid phone: " + req.body.phone);
    }

    if(! ( HelperValidator.isAscii( req.body.rol) 
        && req.body.rol != "" 
        && arrRols.indexOf(rol) != -1 ) ){ 
        validationResponse.addError("Invalid rol: " + req.body.rol);
    }

    if(! validationResponse.success){
        res.json(validationResponse);
    }
    else {
        User.findOne({ idUser: req.body.idUser }).
            select('idUser, email').
            exec( function(err, user){
                if (err) throw err;

                if (!user) {
                    res.json({ success: false, message: 'User not found.', data: [] });
                } 
                else if (user) {

                    var queryWhere = { idUser: req.body.idUser };
                    var updateFields = {  
                        idUser: req.body.idUser, 
                        firstName: req.body.firstName, 
                        lastName: req.body.lastName, 
                        email: email, 
                        password: req.body.password, 
                        address: req.body.address, 
                        image: req.body.image, 
                        phone: req.body.phone, 
                        rol: req.body.rol, 
                        updateDate: Date() 
                    }
                    
                    User.update(
                        queryWhere, //query
                        updateFields, //update
                        function (err, raw) {
                            if (err) return handleError(err);

                            var msgResponse = 'User updated successfully';
                            console.log(msgResponse);
                            res.json({ success: true, message: msgResponse, data: raw });
                        }
                    );
                }
            });

    }
});
 
//http://localhost:8888/user/setup
moduleRoutes.get('/setup', function(req, res) {
   var dataUser = new User({ 
        //idUser: 1, 
        firstName: 'Jimmy', 
        lastName: 'MUNOZ', 
        email: 'myappeu@gmail.com', 
        password: '1234567', 
        address: '345, Rue des Azalées', 
        image: 'images/user/jimmy.png', 
        phone: ' +33 988765432', 
        rol: 'admin', 
        creationDate: Date('2014-04-30T14:00:00.000Z'), 
        updateDate: Date('2014-04-30T14:00:00.000Z') 
    }); 
    dataUser.save(function(err) {
        if (err) throw err;

        var msgResponse = 'User saved successfully';
        console.log(msgResponse);
        res.json({ success: true, message: msgResponse, data: [] });
    });
});

//http://localhost:8888/user/removeUser?idUser=1
moduleRoutes.delete('/removeUser', function(req, res) {
    var validationResponse = commonHelper.getValidationResponse();
    var HelperValidator = commonHelper.validator;
    if(! ( HelperValidator.isNumeric( req.body.idUser) && req.body.idUser!= "" )  ){
        validationResponse.addError("Invalid idUser: " + req.body.idUser);
    }
    if(! validationResponse.success){
        res.json(validationResponse);
    }
    else {
        var queryWhere = { idProduct: req.body.idProduct };
        User.findOne( queryWhere ).
            select('idUser, email').
            exec( function(err, user){
                if (err) throw err;

                if (!user) {
                    res.json({ success: false, message: 'User not found.', data: [] });
                } 
                else if (user) {
                    User.remove({
                        idUser: req.body.idUser
                    }, function(err, user) {
                        if (err) throw err;

                        if (!user) {
                            res.json({ success: false, message: 'Error: User can not deleted', data: User });
                        } 
                        else if (user) {
                            res.json({
                                success: true,
                                message: 'User Deleted',
                                data: user
                            });
                        }
                    });
                }
            });

    }
    
});

module.exports = moduleRoutes;
