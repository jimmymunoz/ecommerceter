$(function(){
  
  var CategoryView = Backbone.View.extend({
    tagName: "option",
 
    initialize: function(){
      _.bindAll(this, 'render');
    },
    render: function(){
      $(this.el).attr('value',
        this.model.get('idCategory')).html(this.model.get('name'));
      return this;
    }
  });
  
   
 
  var CategoriesView = Backbone.View.extend({
    initialize: function(){
      _.bindAll(this, 'addOne', 'addAll');
        this.collection.bind('reset', this.addAll);
    },
    addOne: function(category){
      $(this.el).append(
        new CategoryView({ model: category }).render().el);
    },
    addAll: function(){
      this.collection.each(this.addOne);
    }
  });
 
  var categories = new App.Collections.Category;
  new CategoriesView({el: $("#category"), collection: categories});
  new CategoriesView({el: $("#parent_name"), collection: categories});
  new CategoriesView({el: $("#edit_category"), collection: categories});
  categories.fetch();
}());