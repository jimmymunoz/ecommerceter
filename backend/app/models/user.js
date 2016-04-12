var pathServer = '../../';
var mongoose = require('mongoose');
var config = require(pathServer + 'config'); // get our config file
var Schema = mongoose.Schema;
var commonHelper   = require(pathServer + 'app/helpers/common');

var autoIncrement = require('mongoose-auto-increment');
var mongoosePaginate = require('mongoose-paginate');
var connection = mongoose.createConnection(config.database);
autoIncrement.initialize(connection);

// set up a mongoose model and pass it using module.exports
var UserSchema = new Schema({ 
    idUser: Number, 
    firstName: String, 
    lastName: String, 
    email: String, 
    rol: String, 
    password: String, 
    address: String, 
    image: String, 
    phone: String
});

UserSchema.plugin(autoIncrement.plugin, { model: 'users', field: 'idUser' });
var UserModel = Model = mongoose.model('User', UserSchema);


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

module.exports = UserModel;
module.exports.paginate = mongoosePaginate;
