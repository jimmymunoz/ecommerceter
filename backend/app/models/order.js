var pathServer = '../../';
var mongoose = require('mongoose');
var config = require(pathServer + 'config'); // get our config file
var Schema = mongoose.Schema;
var commonHelper   = require(pathServer + 'app/helpers/common');

var autoIncrement = require('mongoose-auto-increment');
var mongoosePaginate = require('mongoose-paginate');
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
    orderLines: [ { productId: { type: Schema.Types.ObjectId, ref: 'Product' },  product: { type: Schema.Types.Mixed }, quantity: { type: Number }, total: { type: Number }, totalTax: { type: Number } }],
    //orderLines: Array, 
    approvalCode: String, 
    paymentDate: Date,
    modificationDate: Date 
});

schemaOrder.plugin(autoIncrement.plugin, { model: 'orders', field: 'idOrder' });
module.exports = mongoose.model('Order', schemaOrder);
module.exports.paginate = mongoosePaginate;