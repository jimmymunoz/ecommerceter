var pathServer = '../../';
var mongoose = require('mongoose');
var config = require(pathServer + 'config'); // get our config file
var Schema = mongoose.Schema;
var commonHelper   = require(pathServer + 'app/helpers/common');

var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection(config.database);
autoIncrement.initialize(connection);

// set up a mongoose model and pass it using module.exports

var schemaProduct = new Schema({
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
    //productEvaluation: Array,
    productEvaluation: [{ type: Schema.Types.ObjectId, ref: 'User' }, { type: Number }],
    creationDate: Date,
    modificationDate: Date
});


schemaProduct.plugin(autoIncrement.plugin, { model: 'products', field: 'idProduct' });
module.exports = mongoose.model('Product', schemaProduct);