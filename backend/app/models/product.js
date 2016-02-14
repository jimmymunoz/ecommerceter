var pathServer = '../../';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var commonHelper   = require(pathServer + 'app/helpers/common');


module.exports = mongoose.model('Product', new Schema({ 
    idProduct: String, 
    name: String, 
    description: String, 
    price: Number, 
    tax: Number, 
    buyPrice: Number, 
    price: Number, 
    image: String, 
    quantity: Number, 
    weight: Number, 
    category: Number, 
    productComment: Array, 
    productEvaluation: Array, 
    creationDate: Date, 
    modificationDate: Date 
}));