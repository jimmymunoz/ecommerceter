var pathServer = '../../';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var commonHelper   = require(pathServer + 'app/helpers/common');


module.exports = mongoose.model('Payment', new Schema({ 
    code: String, 
    status: String 
}));