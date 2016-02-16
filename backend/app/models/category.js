var pathServer = '../../';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var commonHelper   = require(pathServer + 'app/helpers/common');


module.exports = mongoose.model('Category', new Schema({ 
    idCategory: Number, 
    idParent: String, 
    name: String, 
    level: Number, 
    creationDate: Date, 
    modificationDate: Date 
}));