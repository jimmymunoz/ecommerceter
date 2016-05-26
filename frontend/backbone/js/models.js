App.Models.Product = Backbone.Model.extend({
	
	idAttribute : "_id",
	//urlRoot: "http://localhost:8888/product/getProductsList/",
	urlRoot: "http://localhost:8888/product",
	defaults : {
		_id: null
	}
});
App.Models.Category = Backbone.Model.extend({
	
	idAttribute : "_id",
	urlRoot: "http://localhost:8888/category",
	//urlRoot: "http://localhost:8888/category/getCategorysList",
	defaults : {
		_id: null
	}
});

App.Models.Order = Backbone.Model.extend({
	
	idAttribute : "_id",
	urlRoot: "http://localhost:8888/order",
	defaults : {
		_id: null
	}
});

App.Models.User = Backbone.Model.extend({
	
	idAttribute : "_id",
	urlRoot: "http://localhost:8888/user",
	defaults : {
		_id: null
	}
});