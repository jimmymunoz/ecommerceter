var pathServer = "../../";
var express 	= require('express');
var config = require(pathServer + 'config');
//Models:
var moduleRoutes = express.Router();
var Category   = require(pathServer + 'app/models/category');
//Helpers:
var commonHelper   = require(pathServer + 'app/helpers/common');
//http://localhost:8888/category/
/*

moduleRoutes.get('/', function(req, res) {
    res.json({ success: false, message: 'Invalid Category action', data:req.decoded});
});
 */

//http://localhost:8888/category/setup
moduleRoutes.get('/setup', function(req, res) {
   	var dataCategory = new Category({
	    //idCategory: '1',
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
	if(! ( HelperValidator.isNumeric( req.body.idParent ) && req.body.idParent >= 0 )  ){
		validationResponse.addError("Invalid categoy idParent: " + req.body.idParent);
	}
	//validation name
	if(! ( HelperValidator.isAscii( req.body.name ) && req.body.name != "" )  ){
		validationResponse.addError("Invalid categoy name: " + req.body.name);
	}
	//console.log(req.body.level);
	if(! validationResponse.success){
		res.json(validationResponse);
	}
	else {
        /*
        
        var parentCategory = 0;
        var promiseParentCategory = Category.getCategoryById(req.body.idParent);
        promiseParentCategory.then(
            function(val) {
                parentCategory = val;
                console.log(val);
            })
            .catch(function() { 
                console.log("promesse rompue");
            });
         */

        Category.findOne({
            idCategory: req.body.idParent
        }, function (err, categoryParent) {
            if (err) throw err;

            console.log(categoryParent);
            
            if (! categoryParent && req.body.idParent > 0) {
                res.json({ success: false, message: 'Category Parent not found.' + req.body.idParent, data: [] });
            } 
            else {
                console.log("parentCategoryParent: ");
                console.log(categoryParent);
                var idParent = null;
                var level = 1;
                if (categoryParent){//Found
                    idParent = categoryParent._id;
                    //idParent = categoryParent.idCategory;
                    level = categoryParent.level + 1;
                }

        		var dataCategory = new Category({
        			idParent: idParent,
        			name: req.body.name,
        			level: level,
        			creationDate: Date(),
        			modificationDate: Date()
        		});
        		dataCategory.save(function(err) {
        			if (err) throw err;

        			var msgResponse = 'Category saved successfully';
        			console.log(msgResponse);
        			res.json({ success: true, message: msgResponse, data: dataCategory });
        		});
                
            }
        });
    }
});

//http://localhost:8888/category/getCategorysList
moduleRoutes.get('/getCategorysList', function(req, res) {
    var query = {};
    var page = (req.query.page != undefined )? req.query.page : 1 ;
    var page_size = (req.query.page_size != undefined )? req.query.page_size : config.default_page_size_pagination ;
    Category.count(query, function(err, total_results) {
        if (err) throw err;
        //  res.json({ success: true, message: 'Product List:', data: out, pagination: commonHelper.getPaginationResult(total_results, page_size, page) });
        Category.find(query).
        //where('idCategory').equals(req.query.idCategory).// =
        //where('idCategory').gt(17).lt(66).// gt - lt
        //where('idCategory').in(['idCategory', req.query.idCategory]).// like
        //limit(10).
        sort('-idCategory').
        populate('idParent'). 
        select('idCategory idParent name level creationDate modificationDate ').
        exec(function(err, Categorys) {
            res.json({ success: true, message: 'Category List:', data: Categorys, pagination: commonHelper.getPaginationResult(total_results, page_size, page) });
        });
        
    }); 
});

//http://localhost:8888/category/getCategorysParent
moduleRoutes.get('/getCategorysParent', function(req, res) {
    var query = {};
    query["level"] = 1;
    var page = (req.query.page != undefined )? req.query.page : 1 ;
    var page_size = (req.query.page_size != undefined )? req.query.page_size : config.default_page_size_pagination ;
    Category.count(query, function(err, total_results) {
        if (err) throw err;
        Category.find( query ).
        //where('level').equals(0).// =
        //where('idCategory').gt(17).lt(66).// gt - lt
        //where('idCategory').in(['idCategory', req.query.idCategory]).// like
        //limit(10).
        sort('-idCategory').
        populate('idParent'). 
        select('idCategory name').
        exec(function(err, Categorys) {
            res.json({ success: true, message: 'Category List:', data: Categorys, pagination: commonHelper.getPaginationResult(total_results, page_size, page) });
        });
        
    });
    
});

//http://localhost:8888/category/getCategorysParentWithChilds
moduleRoutes.get('/getCategorysParentWithChilds', function(req, res) {
    var query = {};
    query["level"] = 1;
    Category.find( query ).
    sort('-idCategory').
    //populate('idParent'). 
    select('idCategory name _id level').
    exec(function(err, CategorysParent) {
        if (err) throw err;

        var CategorysParentResponse = {};
        var query2_in = [];
        for (var keyParent in CategorysParent){
            CategorysParentResponse[CategorysParent[keyParent]._id] = (JSON.parse(JSON.stringify(CategorysParent[keyParent])));
            CategorysParentResponse[CategorysParent[keyParent]._id]["childs"] = [];//Empty array
            query2_in.push(CategorysParent[keyParent]._id);
        }
        //console.log(query2_in);
        query["level"] = undefined;
        Category.find( {} ).
        //where('idCategory').in(['idCategory', query2_in]).// like
        sort('-idCategory').
        //populate('idParent'). 
        select('idCategory name _id idParent').
        exec(function(err, Categorys) {
            for (var key in Categorys){
                if( Categorys[key]['idParent'] != undefined ){
                    for (var keyParent in CategorysParentResponse){
                        if(Categorys[key]['idParent'] == CategorysParentResponse[keyParent]['_id'] ){//Child - Parent id
                            CategorysParentResponse[keyParent]['childs'].push(Categorys[key]);
                        }
                    }
                }
            }
            res.json({ success: true, message: 'Category List:', data: CategorysParentResponse });
        });
        
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

    // validation idCategory
    if(! ( HelperValidator.isNumeric( req.body.idCategory) && req.body.idCategory != "" )  ){
    	validationResponse.addError("Invalid category idCategory: " + req.body.idCategory);
    }
    // validation name
    if(! ( HelperValidator.isAscii( req.body.name) && req.body.name != "" )  ){
    	validationResponse.addError("Invalid category name: " + req.body.name);
    }
    console.log(req.body.idParent);
    // validation idParent
    if(! ( HelperValidator.isNumeric( req.body.idParent) && req.body.idParent >= 0  )  ){
    	validationResponse.addError("Invalid category idParent: " + req.body.idParent);
    }
    
    if(! validationResponse.success){
    	res.json(validationResponse);
    }

    else {

        var queryWhere = { idCategory: req.body.idCategory };
        Category.findOne( queryWhere ).
            select('idCategory').
            exec( function(err, category){
                if (err) throw err;

                if (!category) {
                    res.json({ success: false, message: 'Category not found.', data: [] });
                } 
                else if (category) {
                    Model.findOne({
                        idCategory: req.body.idParent
                    }, function (err, categoryParent) {
                        if (err) throw err;

                        console.log(categoryParent);
                        
                        if (! categoryParent && req.body.idParent > 0) {
                            res.json({ success: false, message: 'Category Parent not found.' + req.body.idParent, data: [] });
                        } 
                        else {
                            console.log("parentCategoryParent: ");
                            console.log(categoryParent);
                            var idParent = null;
                            var level = 1;
                            if (categoryParent){//Found
                                idParent = categoryParent._id;
                                level = categoryParent.level + 1;
                            }

                            var updateFields = {
                                idCategory: req.body.idCategory,
                                idParent: idParent,
                                name: req.body.name,
                                level: level,
                                //creationDate: Date(),
                                modificationDate:Date()
                            };

                            Category.update(
                                queryWhere, //query
                                updateFields, //update
                                function (err, raw) {
                                    if (err) throw err;

                                    var msgResponse = 'Category updated successfully';
                                    console.log(msgResponse);
                                    res.json({ success: true, message: msgResponse, data: raw });
                                }
                            );
                            
                        }
                    });

                }
            });

    }
});

//http://localhost:8888/category/getCategory?idCategory=1
moduleRoutes.get('/getCategory', function(req, res) {
    Category.findOne({ idCategory: req.query.idCategory }).
        //where('idCategory').equals(req.query.idCategory).// =
        //where('idCategory').gt(17).lt(66).// gt - lt
        //where('idCategory').in(['idCategory', req.query.idCategory]).// like
        //limit(10).
        populate('idParent'). // Join
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
            var queryWhere = { idCategory: req.body.idCategory };
            Category.findOne( queryWhere ).
                select('idCategory').
                exec( function(err, category){
                    if (err) throw err;

                    if (!category) {
                        res.json({ success: false, message: 'category not found.', data: [] });
                    } 
                    else if (category) {
                        res.json({
                            success: true,
                            message: 'Category Deleted',
                            data: category
                        });
                    }
                });
            
        }
    });
});

module.exports = moduleRoutes;
