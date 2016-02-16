var pathServer = '../../';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var commonHelper   = require(pathServer + 'app/helpers/common');


module.exports = mongoose.model('Order', new Schema({ 
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
}));