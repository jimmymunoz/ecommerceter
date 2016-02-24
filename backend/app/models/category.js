var pathServer = '../../';
var mongoose = require('mongoose');
var config = require(pathServer + 'config'); // get our config file
var Schema = mongoose.Schema;
var commonHelper   = require(pathServer + 'app/helpers/common');

// set up a mongoose model and pass it using module.exports
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection(config.database);
autoIncrement.initialize(connection);

var CategorySchema =  new Schema({
	idCategory: Number,
	idParent: String,
	name: String,
	level: Number,
	creationDate: Date,
	modificationDate: Date
});

CategorySchema.plugin(autoIncrement.plugin, { model: 'caterories', field: 'idCategory' });
module.exports = mongoose.model('Category', CategorySchema);