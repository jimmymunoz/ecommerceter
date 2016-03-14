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
	urlRoot: "/products",
	defaults : {
		_id: null
	}
});