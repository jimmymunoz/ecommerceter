var pathServer = '../../';
var express     = require('express');
var config = require(pathServer + 'config');
var SHARED_DATA   = require(pathServer + 'app/helpers/data');
//Helpers:
var commonHelper   = require(pathServer + 'app/helpers/common'); 
var authenticationHelper   = require(pathServer + 'app/helpers/authentication'); 

var moduleRoutes = express.Router();
//Public Methods:
//
//
//http://mongoosejs.com/docs/populate.html
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  
var personSchema = Schema({
    _id     : Number,
    name    : String,
    age     : Number,
    stories : [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

var storySchema = Schema({
    _creator : { type: Number, ref: 'Person' },
    title    : String,
    fans     : [{ type: Number, ref: 'Person' }]
});

var Story  = mongoose.model('Story', storySchema);
var Person = mongoose.model('Person', personSchema);


//http://localhost:8888/_population/save
moduleRoutes.get('/save', function(req, res) {
    var aaron = new Person({ _id: 0, name: 'Aaron', age: 100 });

    aaron.save(function (err) {
      if (err) throw (err);
      
      var story1 = new Story({
        title: "Once upon a timex.",
        _creator: aaron._id    // assign the _id from the person
      });
      
      story1.save(function (err) {
        if (err) throw (err);
        // thats it!
      });
    });

    res.json({ success: true, message: "Saved", data: aaron });
});


//http://localhost:8888/_population/get
moduleRoutes.get('/get', function(req, res) {
    Story
        .findOne({ title: 'Once upon a timex.' })
        .populate('_creator')
        .exec(function (err, story) {
          if (err) throw (err);
          console.log('The creator is %s', story._creator.name);
          // prints "The creator is Aaron"
            res.json({ success: true, message: "Saved", data: story });
        });

});

//http://localhost:8888/_population/populatefields
moduleRoutes.get('/populatefields', function(req, res) {
    var aaron = new Person({ _id: 0, name: 'Aaron', age: 100 });
    Story.findOne({ title: 'Once upon a timex.' }, function(error, story) {
      if (error) {
        throw (error);
      }
        story._creator = aaron;
        console.log(story._creator.name); // prints "Aaron"
        res.json({ success: true, message: "Saved", data: story });
    });

});

//http://localhost:8888/_population/filedselection
moduleRoutes.get('/filedselection', function(req, res) {
    Story
        .findOne({ title: /timex/i })
        .populate('_creator', 'name') // only return the Persons name
        .exec(function (err, story) {
          if (err) throw (err);
          
          console.log('The creator is %s', story._creator.name);
          // prints "The creator is Aaron"
          
          console.log('The creators age is %s', story._creator.age);
          // prints "The creators age is null'
            res.json({ success: true, message: 'The creator is ' + story._creator.name, message2: 'The creators age is ' + story._creator.age, data: story });
        })

});



module.exports = moduleRoutes;
