var pathServer = '../../';
var mongoose = require('mongoose');
var config = require(pathServer + 'config'); // get our config file
var Schema = mongoose.Schema;
var commonHelper   = require(pathServer + 'app/helpers/common');

var autoIncrement = require('mongoose-auto-increment');
//autoIncrement.initialize();
var connection = mongoose.createConnection(config.database);
 
autoIncrement.initialize(connection);


var schemaOrder = new Schema({ 
    idUser: Number,
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

schemaOrder.plugin(autoIncrement.plugin, { model: 'orders', field: 'idOrder' });
module.exports = mongoose.model('Order', schemaOrder);