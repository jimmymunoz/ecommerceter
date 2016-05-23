var pathServer = '../../';
var mongoose = require('mongoose');
var path = require('path');
var filePluginLib = require('mongoose-file');
var filePlugin = filePluginLib.filePlugin;
var make_upload_to_model = filePluginLib.make_upload_to_model;
var config = require(pathServer + 'config'); // get our config file
var Schema = mongoose.Schema;
var commonHelper   = require(pathServer + 'app/helpers/common');

var uploads_base = path.join("", "uploads");
var uploads = path.join(uploads_base, "u");

var autoIncrement = require('mongoose-auto-increment');
var mongoosePaginate = require('mongoose-paginate');
var connection = mongoose.createConnection(config.database);
autoIncrement.initialize(connection);

// set up a mongoose model and pass it using module.exports

var schemaProduct = new Schema({
    idProduct: String,
    name: String,
    description: String,
    brand: String,
    price: Number,
    tax: Number,
    buyPrice: Number,
    price: Number,
    quantity: Number,
    weight: Number,
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    productComment: [ { user: { type: Schema.Types.ObjectId, ref: 'User' }, comment: { type: String } , evaluationDate: { type: Date } }],
    productEvaluation: [ { user: { type: Schema.Types.ObjectId, ref: 'User' }, evaluation: { type: Number } , evaluationDate: { type: Date } }],
    creationDate: Date,
    modificationDate: Date
});

schemaProduct.plugin(filePlugin, {
    name: 'image',
    upload_to: make_upload_to_model(uploads, 'photo'),
    relative_to: uploads_base
});

schemaProduct.plugin(autoIncrement.plugin, { model: 'products', field: 'idProduct' });
module.exports = mongoose.model('Product', schemaProduct);
module.exports.paginate = mongoosePaginate;

//console.log(  mongoosePaginate );
//console.log(  module.exports.paginate() );

