App.Collections.Products = Backbone.Collection.extend({
	model: App.Models.Product,
	url: 'http://localhost:8888/product',
	//url: "http://localhost:8888/product/getProductsList/",
	parse: function(data) {
		return data.data;
		
	},
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

App.Collections.Category = Backbone.Collection.extend({
	model: App.Models.Category,
	url: 'http://localhost:8888/category',
	//url: 'http://localhost:8888/category/getCategorysList',
	parse: function(data) {
		//console.log(data);
		return data.data;
	}
});
	
App.Collections.Order = Backbone.Collection.extend({
	model: App.Models.Order,
	url: 'http://localhost:8888/order',
	parse: function(data) {
		return data.data;
	}
	});
	
App.Collections.User = Backbone.Collection.extend({
	model: App.Models.User,
	url: 'http://localhost:8888/user',
	parse: function(data) {
		//console.log(data);
		return data.data;
	}
	});