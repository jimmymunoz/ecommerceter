var pathServer = "../../";
var express 	= require('express');
var config = require(pathServer + 'config');
var jwt    = require('jsonwebtoken');
//Models:
var moduleRoutes = express.Router();
var Category   = require(pathServer + 'app/models/category');
//Helpers:
var commonHelper   = require(pathServer + 'app/helpers/common');
//http://localhost:8888/category/
moduleRoutes.get('/', function(req, res) {
    res.json({ success: false, message: 'Invalid Category action', data:req.decoded});
    });

//http://localhost:8888/category/setup
moduleRoutes.get('/setup', function(req, res) {
   var dataCategory = new Category({
    idCategory: '1',
    idParent: '1',
    name: 'my new category',
    level: 1,
    creationDate: Date(),
    modificationDate: Date()
    });
    dataCategory.save(function(err) {
        if (err) throw err;

        var msgResponse = 'Category saved successfully';
        console.log(msgResponse);
        res.json({ success: true, message: msgResponse, data: dataCategory });
    });
});
//Public Methods:
// http://localhost:8888/category/createCategory
moduleRoutes.post('/createCategory', function(req, res) {
  var validationResponse = commonHelper.getValidationResponse();
  var HelperValidator = commonHelper.validator;
  console.log(req.body.idParent);
// validation idParent
  if(! ( HelperValidator.isNumeric( req.body.idParent ) && req.body.idParent != "" )  ){
    validationResponse.addError("Invalid product idParent: " + req.body.idParent);
  }
  console.log(req.body.name);
//validation name
  if(! ( HelperValidator.isAlphanumeric( req.body.name ) && req.body.name != "" )  ){
    validationResponse.addError("Invalid product name: " + req.body.name);
  }
  console.log(req.body.level);
// validation level
if(! ( HelperValidator.isInt( req.body.level) && req.body.level != "" )  ){
validationResponse.addError("Invalid product level: " + req.body.level);
}
  if(! validationResponse.success){
      res.json(validationResponse);
  }
  else {

   var dataCategory = new Category({
        idCategory: req.body.idCategory,
        idParent: req.body.idParent,
        name: req.body.name,
        level: req.body.level,
        creationDate: Date(),
        modificationDate:Date()
    });
    dataCategory.save(function(err) {
        if (err) throw err;

        var msgResponse = 'Category saved successfully';
        console.log(msgResponse);
        res.json({ success: true, message: msgResponse, data: dataCategory });
    });
      }
  });
//http://localhost:8888/category/getCategorysList
    moduleRoutes.get('/getCategorysList', function(req, res) {
        Category.find({}).
        //where('idCategory').equals(req.query.idCategory).// =
        //where('idCategory').gt(17).lt(66).// gt - lt
        //where('idCategory').in(['idCategory', req.query.idCategory]).// like
        //limit(10).
        sort('-idCategory').
        select('idCategory idParent name level creationDate modificationDate ').
        exec(function(err, Categorys) {
            res.json({ success: true, message: 'Category List:', data: Categorys });
        });
    });


// http://localhost:8888/category/updateCategory?idCategory=1
    moduleRoutes.post('/updateCategory', function(req, res) {
      var validationResponse = commonHelper.getValidationResponse();
      var HelperValidator = commonHelper.validator;
    //  console.log("Body:");
    //  console.log(req.body);
    //  console.log("end Body");
    console.log(req.body.name);
    // validation name
    if(! ( HelperValidator.isAlphanumeric( req.body.name) && req.body.name != "" )  ){
      validationResponse.addError("Invalid product name: " + req.body.name);
    }
      console.log(req.body.idParent);
    // validation idParent
    if(! ( HelperValidator.isNumeric( req.body.idParent) && req.body.idParent != "" )  ){
      validationResponse.addError("Invalid product idParent: " + req.body.idParent);
    }
    console.log(req.body.level);
    // validation level
    if(! ( HelperValidator.isNumeric( req.body.level) && req.body.level != "" )  ){
      validationResponse.addError("Invalid product level: " + req.body.level);
    }

    if(! validationResponse.success){
        res.json(validationResponse);
    }

    else {
        var queryWhere = { idCategory: req.body.idCategory };

        var updateFields = {
            idCategory: req.body.idCategory,
            idParent: req.body.idParent,
            name: req.body.name,
            level: req.body.level,
            //creationDate: Date(),
            modificationDate:Date()
        };


        Category.update(
            queryWhere, //query
            updateFields, //update
            function (err, raw) {
                if (err) return handleError(err);

                var msgResponse = 'Category updated successfully';
                console.log(msgResponse);
                res.json({ success: true, message: msgResponse, data: raw });
            }
        );
      }
    });

//http://localhost:8888/category/getCategory?idCategory=1
    moduleRoutes.get('/getCategory', function(req, res) {
        Category.findOne({ idCategory: req.query.idCategory }).
            //where('idCategory').equals(req.query.idCategory).// =
            //where('idCategory').gt(17).lt(66).// gt - lt
            //where('idCategory').in(['idCategory', req.query.idCategory]).// like
            //limit(10).

            sort('-idCategory').
            select('idCategory idParent name level creationDate modificationDate ').
            exec(function(err, category) {
            if (err) throw err;

            if (!category) {
                res.json({ success: false, message: 'Category not found.', data: [] });
            }
            else if (category) {
                    res.json({
                    success: true,
                    message: 'Category Found',
                    data: category
                });
            }
        });
    });


// http://localhost:8888/category/removeCategory?idCategory=1
moduleRoutes.delete('/removeCategory', function(req, res) {
    Category.remove({
        idCategory: req.body.idCategory
    }, function(err, category) {
        if (err) throw err;

        if (!category) {
            res.json({ success: false, message: 'Error: Category can not deleted', data: Category });
        }
        else if (category) {
            res.json({
                success: true,
                message: 'Category Deleted',
                data: category
            });
        }
    });
});

module.exports = moduleRoutes;
