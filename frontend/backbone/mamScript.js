var Model = Backbone.Model.extend();

var Collection = Backbone.Collection.extend({
  model:Model,
  search:function(find) {
    return this.filter(function(model) {
      var json = model.toJSON();
   
      for (var k in find) {
        var re = new RegExp(find[k],"i");
        if (json[k].search(re) == -1) return false;
      }
      
      return true;
    });
   
  }
});

var View = Backbone.View.extend({

  template: template('viewtemplate'),
  events: {
    'keyup input' : 'search'
  },
  
  search:function() {
    var find = {};
    
    this.$('input').each(function() {
      var $element = $(this),
          modelKey = $element.attr('name'),
          modelVal = $element.val();
      find[modelKey] = modelVal;
    });
    
    var results = this.collection.search(find);
    this.showResults(results);
    
  },
 
  showResults:function(results) {
    this.$('#results').empty();
   
    for (var i=0;i<results.length;i++) {
      
      this.$('#results').append('<li>' + results[i].get('first_name') +
                                ' '  + results[i].get('last_name')    +
                                ' '  + results[i].get('email')        +
                                '</li>');
    }
    
  },
  render:function() {
 
    this.$el.html(this.template());
    return this;
  }
  
});

/* set-up below */

var collection = new Collection(
(function() {
    var arr = [];
  for (var i=0;i<200;i++) {
    var obj = {
      first_name:'firstName'+i,
      last_name :'lastName'+i,
      email:'email'+i
    };
    arr.push(obj);
  }
  return arr;
})());

var view = new View({collection:collection});

$('body').append(view.render().el);