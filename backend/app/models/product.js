// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports

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
    CategoryData: Array, 
    productEvaluation: Array,
    creationDate: Date,
    modificationDate: Date
}));
