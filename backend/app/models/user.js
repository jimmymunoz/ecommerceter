var pathServer = '../../';
// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var commonHelper   = require(pathServer + 'app/helpers/common');


// set up a mongoose model and pass it using module.exports
var UserModel = Model = mongoose.model('User', new Schema({ 
    firstName: String, 
    lastName: String, 
    email: String, 
    password: String, 
    address: String, 
    image: String, 
    phone: String
}));


UserModel.getUser = function (res, idUser, callback){
	var response = { success: false, message: '', data: [] };
	
    this.findOne({
       idUser: idUser
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
        	response = { success: false, message: 'User not found.', data: [] };
        } 
        else if (user) {
        	response = {
                success: true,
                message: 'User Found',
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

UserModel.createUser = function (res, data, callback){
    var dataUser = new Model({ 
        firstName: req.data.firstName, 
        lastName: req.data.lastName, 
        email: req.data.email, 
        password: req.data.password, 
        rol: "client", 
        creationDate: new Date(), 
        updateDate: new Date() 
    }); 
    dataUser.save(function(err) {
        if (err) throw err;
        
        var msgResponse = 'User saved successfully';
        console.log(msgResponse);
        res.json({ success: true, message: msgResponse, data: dataUser });
    });
}

UserModel.getLoginUser = function (data){
    
}



module.exports =  UserModel;
