App.Models.Product = Backbone.Model.extend({
	/*validate: function(attrs) {
	
		if ( ! attrs.name) {
			return 'A name is required.';
		}

		if ( ! attrs.description ) {
			return 'Please enter a valid description.';
		}

		if( isNaN(attrs.price) == true ){
			return 'Please enter a valid number';
		}
	},*/
	idAttribute : "_id",
	urlRoot: "http://localhost:8888/product/getProductsList/",
	//urlRoot: "http://localhost:8888/product",
	defaults : {
		_id: null
	}
});
App.Models.Category = Backbone.Model.extend({
	
	idAttribute : "_id",
	//urlRoot: "http://localhost:8888/category",
	urlRoot: "http://localhost:8888/category/getCategorysList",
	defaults : {
		_id: null
	},
	/*
	altSave: function(){
		$.post("http://localhost:8888/category/createCategory", {}, 
		
			function(response){
				console.log(response)
		});
	}*/
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