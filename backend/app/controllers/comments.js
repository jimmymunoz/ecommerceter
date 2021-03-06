var pathServer = '../../';
var express 	= require('express');
var config = require(pathServer + 'config');
var moduleRoutes = express.Router();


var Comment   = require(pathServer + 'app/models/comment');
//Helpers:
var commonHelper   = require(pathServer + 'app/helpers/common'); 

//http://localhost:8888/comment/
moduleRoutes.get('/', function(req, res) {
    res.json({ success: false, message: 'Invalid Comment action', data: req.decoded });
});

//http://localhost:8888/comment/getComments/
moduleRoutes.get('/getComments', function(req, res) {
    Comment.find({}).
    exec(function(err, Comments) {
        res.json({ success: true, message: 'Comment List:', data: Comments });
    });
});
//http://localhost:8888/comment/createComment
moduleRoutes.post('/createComment', function(req, res) {
   //console.log(req.body);
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    var validationResponse = commonHelper.getValidationResponse();
    var HelperValidator = commonHelper.validator;
	
	if(! ( HelperValidator.isNumeric( req.body.idComment ) && req.body.idComment != "" )  ){
      validationResponse.addError("Invalid idComment: " + req.body.idComment);
    }
	
	if(! ( HelperValidator.isNumeric( req.body.idProduct ) && req.body.idProduct != "" )  ){
      validationResponse.addError("Invalid idProduct: " + req.body.idProduct);
    }
	
	if(! ( HelperValidator.isNumeric( req.body.idUser ) && req.body.idUser != "" )  ){
      validationResponse.addError("Invalid idUser: " + req.body.idUser);
    }
	
    if(! ( HelperValidator.isAscii( req.body.comment ) && req.body.comment != "" )  ){
      validationResponse.addError("Invalid comment: " + req.body.comment);
    }
	
    if(! validationResponse.success){
        res.json(validationResponse);
    }
    else {	   
		var dataComment = new Comment({ 
			idComment: req.body.idComment,
			idProduct: req.body.idProduct, 
			idUser: req.body.idUser,
			comment: req.body.comment
		});
		dataComment.save(function(err) {
			if (err) throw err;

			var msgResponse = 'Comment saved successfully';
			console.log(msgResponse);
			res.json({ success: true, message: msgResponse, data: dataComment });
		});
	}
   
});

//http://localhost:8888/comment/editComment?idComment=1
moduleRoutes.post('/editComment', function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	var validationResponse = commonHelper.getValidationResponse();
    var HelperValidator = commonHelper.validator;
    
	if(! ( HelperValidator.isNumeric( req.query.idComment ) && req.query.idComment != "" )  ){
      validationResponse.addError("Invalid idComment: " + req.query.idComment);
    }
	
	if(! ( HelperValidator.isNumeric( req.body.idProduct ) && req.body.idProduct != "" )  ){
      validationResponse.addError("Invalid idProduct: " + req.body.idProduct);
    }
	
	if(! ( HelperValidator.isNumeric( req.body.idUser ) && req.body.idUser != "" )  ){
      validationResponse.addError("Invalid idUser: " + req.v.idUser);
    }
	
    if(! ( HelperValidator.isAscii( req.body.comment ) && req.body.comment != "" )  ){
      validationResponse.addError("Invalid comment: " + req.body.comment);
	}
    if(! validationResponse.success){
        res.json(validationResponse);
    }
    else {

		var queryWhere = { 
			idComment: req.query.idComment,
			idProduct: req.body.idProduct,
			idUser: req.body.idUser
		};
		var updateFields = {  
			comment: req.body.comment, 
		};
		
		Comment.findOne( queryWhere ).
            select('idComment').
            exec( function(err, comment){
                if (err) throw err;

                if (!comment) {
                    res.json({ success: false, message: 'Comment not found.', data: [] });
                } 
                else if (comment) {
					Comment.update(
						queryWhere, 
						updateFields, 
						function (err, raw) {
							if (err) return handleError(err);

							var msgResponse = 'Comment updated successfully';
							console.log(msgResponse);
							res.json({ success: true, message: msgResponse, data: raw });
						}
					);
                }
            });

	}
});
//http://localhost:8888/comment/removeComment?idComment=1
moduleRoutes.delete('/removeComment', function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	var validationResponse = commonHelper.getValidationResponse();
    var HelperValidator = commonHelper.validator;
    if(! ( HelperValidator.isNumeric( req.body.idComment ) && req.body.idComment != "" )  ){
      validationResponse.addError("Invalid idComment: " + req.body.idComment);
    }
	
	if(! ( HelperValidator.isNumeric( req.body.idProduct ) && req.body.idProduct != "" )  ){
      validationResponse.addError("Invalid idProduct: " + req.body.idProduct);
    }
	
	if(! ( HelperValidator.isNumeric( req.body.idUser ) && req.body.idUser != "" )  ){
      validationResponse.addError("Invalid idUser: " + req.body.idUser);
    }
	
	 if(! validationResponse.success){
        res.json(validationResponse);
    }
    else {
    	var queryWhere = { 
    		idComment: req.body.idComment,
			idProduct: req.body.idProduct,
			idUser: req.body.idUser 
		};
        Comment.findOne( queryWhere ).
            select('idComment').
            exec( function(err, comment){
                if (err) throw err;

                if (!comment) {
                    res.json({ success: false, message: 'Comment not found.', data: [] });
                } 
                else if (comment) {
					Comment.remove({
						idComment: req.query.idComment,
						idProduct: req.body.idProduct,
						idUser: req.body.idUser
					}, function(err, comment) {
						if (err) throw err;

						if (!comment) {
							res.json({ success: false, message: 'Error: Comment can not deleted', data: comment });
						} 
						else if (comment) {
							res.json({
								success: true,
								message: 'Comment Deleted',
								data: comment
							});
						}
					});
                }
            });
	}
});

module.exports = moduleRoutes;