App.Router = Backbone.Router.extend({
	routes: {
		'': 'index'
	},

	index: function() {
		console.log( 'INDEX' );
		/*this.listContainerView = new App.Views.Filter({
			collection:App.Collections.Products
		});
		$("#contentContainer").append(this.listContainerView.render().el);	
		this.listContainerView.sorts()*/
	}
});
