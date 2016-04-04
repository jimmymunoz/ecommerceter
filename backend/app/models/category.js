var pathServer = '../../';
var Promise = require('es6-promise').Promise
var mongoose = require('mongoose');
var config = require(pathServer + 'config'); // get our config file
var Schema = mongoose.Schema;
var commonHelper   = require(pathServer + 'app/helpers/common');

// set up a mongoose model and pass it using module.exports
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection(config.database);
autoIncrement.initialize(connection);

var CategorySchema =  new Schema({
	idCategory: String,
	idParent: { type: Schema.Types.ObjectId, ref: 'Category' },//Join.
	//idParent: { type: Number, ref: 'Category' },//Join.
	name: String,
	level: Number,
	creationDate: Date,
	modificationDate: Date
});

var categoryModel = Model = mongoose.model('Category', CategorySchema);

CategorySchema.plugin(autoIncrement.plugin, { model: 'caterories', field: 'idCategory' });

categoryModel.getCategoryById = function (idCategory){
	return new Promise(function (resolve, reject) {
        Model.findOne({
            idCategory: idCategory
        }, function (error, category) {
            if (error) {
                reject(error);
                return;
            }

            //console.log(category);
            // build a result object you want.
            // ()
            resolve({
                idCategory: idCategory,
                category: category
            });
        });
    });
}


module.exports = categoryModel;