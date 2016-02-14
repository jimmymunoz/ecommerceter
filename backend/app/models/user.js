var pathServer = '../../';
// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var commonHelper   = require(pathServer + 'app/helpers/common');


// set up a mongoose model and pass it using module.exports
var UserModel = mongoose.model('User', new Schema({ 
    firstName: String, 
    lastName: String, 
    email: String, 
    password: String, 
    address: String, 
    image: String, 
    phone: String
}));

UserModel.validateSignUp = function (query){
	console.log("User validating");
	var validationResponse = commonHelper.getValidationResponse();
	var HelperValidator = commonHelper.validator;

    if(! HelperValidator.isEmail( query.email) ){ 
    	validationResponse.addError("Invalid email: " + query.email);
    }
	if(! HelperValidator.isAlphanumeric( query.firstName ) 
		&& query.lastName != "" ){
		validationResponse.addError("Invalid firstName: " + query.firstName);
    }
    if(! HelperValidator.isAlphanumeric( query.lastName) 
    	&& query.lastName != "" ){ 
    	validationResponse.addError("Invalid Prenom: " + query.lastName);
    }
    if(! HelperValidator.isAlphanumeric( query.password) 
    	&& HelperValidator.isLength(query.password, {min: 0, max: 10}) ){ 
    	validationResponse.addError("Le mot de pass doit être une chaine de characters entre (5 - 10) : " + query.password);
    }
    /*
    if(! HelperValidator.isAlphanumeric( query.address) ){ 
    	validationResponse.addError("Invalid address: " + query.address);
    }
    if(! HelperValidator.isEmail( query.image) ){ 
    	validationResponse.addError("Invalid email: " + query.image);
    }
    if(! HelperValidator.isEmail( query.phone) ){ 
    	validationResponse.addError("Invalid email: " + query.phone);
    }
    */
    
	return validationResponse;
}

UserModel.getUser = function (res, idUser){
	var response = { success: false, message: '', data: [] };
	/*
	
	 */
	this.findOne({
       idUser: idUser
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
        	console.log("not found");
            response = { success: false, message: 'User not found.', data: [] };
        } 
        else if (user) {
        	console.log("found ");
            response = {
                success: true,
                message: 'User Found :)',
                data: user
            };
        }
    });
	var query = this.findOne({
       idUser: idUser
    });
    query.then(function (doc) {
      // use doc
    });
    promise = query.exec();
    promise.then(function (doc) {
      // use doc
        console.log(doc);
        return response;
    });
}

module.exports =  UserModel;
