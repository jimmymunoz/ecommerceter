var pathServer = '../../';
var express 	= require('express');
var config = require(pathServer + 'config');
var jwt    = require('jsonwebtoken'); 
var moduleRoutes = express.Router();


var Category   = require(pathServer + 'app/models/category');

//http://localhost:8888/category/
moduleRoutes.get('/', function(req, res) {
        res.json({ success: false, message: 'Invalid Category action', data: req.decoded });
});

//http://localhost:8888/category/getCategory?idCategory=1
moduleRoutes.get('/getCategory', function(req, res) {
    Category.
        findOne({ idCategory: req.query.idCategory }).
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

//http://localhost:8888/category/createCategory
moduleRoutes.post('/createCategory', function(req, res) {
   var dataCategory = new Category({ 
        idCategory: req.body.idCategory, 
        idParent: req.body.idParent, 
        name: req.body.name, 
        level: req.body.level, 
        creationDate: req.body.creationDate, 
        modificationDate: req.body.modificationDate 
    }); 
    dataCategory.save(function(err) {
        if (err) throw err;

        var msgResponse = 'Category saved successfully';
        console.log(msgResponse);
        res.json({ success: true, message: msgResponse, data: dataCategory });
    });
});

//http://localhost:8888/category/updateCategory?idCategory=1
moduleRoutes.post('/updateCategory', function(req, res) {
    var queryWhere = { idCategory: req.body.idCategory };
    var updateFields = {  
        idCategory: req.body.idCategory, 
        idParent: req.body.idParent, 
        name: req.body.name, 
        level: req.body.level, 
        creationDate: req.body.creationDate, 
        modificationDate: req.body.modificationDate 
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
});
 
//http://localhost:8888/category/setup
moduleRoutes.get('/setup', function(req, res) {
   var dataCategory = new Category({ 
    idCategory: Number, 
    idParent: String, 
    name: String, 
    level: Number, 
    creationDate: Date, 
    modificationDate: Date 
    }); 
    dataCategory.save(function(err) {
        if (err) throw err;

        var msgResponse = 'Category saved successfully';
        console.log(msgResponse);
        res.json({ success: true, message: msgResponse, data: dataCategory });
    });
});

//http://localhost:8888/category/removeCategory?idCategory=1
moduleRoutes.post('/removeCategory', function(req, res) {
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