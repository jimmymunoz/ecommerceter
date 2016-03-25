
/**
 * Module dependencies.
 */

var express = require('express')
  , mongoose =  require('mongoose')
  , http = require('http')
  , path = require('path')
  , bodyParser  = require('body-parser');
  var filePluginLib = require('mongoose-file');
  var filePlugin = filePluginLib.filePlugin;
   var make_upload_to_model = filePluginLib.make_upload_to_model;
  
var uploads_base = path.join("", "uploads");
var uploads = path.join(uploads_base, "u");

var app = express();
mongoose.connect("mongodb://localhost/contactmanager");
var ProductsSchema = new mongoose.Schema({
  //idProduct: String,
    name: String,
    description: String,
    price: String,
    tax: String,
    buyPrice: String,
    price: String,
    //image: file,
    quantity: String,
    weight: String,
    category: String,
    CategoryData: String, 
    creationDate: Date,
    modificationDate: Date
});

ProductsSchema.plugin(filePlugin, {
	name: "image"
	,upload_to: make_upload_to_model(uploads, 'photo'),
	relative_to: uploads_base
});

var Products = mongoose.model("products",ProductsSchema);

//app.configure(function(){
  //app.set('port', process.env.PORT || 3000);
  app.set('port', 8080);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
//});

app.get("/products", function(req,res){
  Products.find({},function(err,docs){
    if(err) throw err;
    res.send(docs);
	//console.log(docs);
  });
});

app.post("/products", function(req, res){
console.log(req.body.files);
console.log(req.body);
console.log(req.query);
  var product = new Products({
   //idProduct: req.body.idProduct,
   
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        tax: req.body.tax,
        buyPrice: req.body.buyPrice,
        image: req.body.file,
        quantity: req.body.quantity,
        weight: req.body.weight,
        category: req.body.category,
        CategoryData: req.body.CategoryData,
        creationDate: Date()
        ,modificationDate: ''
  }).save(function(err,docs){
    if(err) throw err;
    res.send(docs);
  });
});

app.put("/products/:id", function(req,res){
  var id = req.params.id;
  Products.findById(id, function(err, prod) {
      if(err) throw err;
	  prod.name= req.body.name,
	  prod.description= req.body.description,
	  prod.price= req.body.price,
	  prod.tax= req.body.tax,
	  prod.buyPrice= req.body.buyPrice,
	  prod.image= req.body.image,
	  prod.quantity= req.body.quantity,
	  prod.weight= req.body.weight,
	  prod.category= req.body.category,
	  prod.modificationDate= Date()
      prod.save(function(err) {
        if(err) throw err;
        res.send(prod);
      });
    });
});

app.del("/products/:id", function(req,res){
  var id = req.params.id;
  Products.findById(id, function(err, prod) {
      prod.remove(function(err) {
        if(err) throw err;
        
      });
    });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
