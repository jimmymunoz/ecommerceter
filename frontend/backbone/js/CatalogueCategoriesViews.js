App.CatalogueCategoriesViews.App = Backbone.View.extend({
	initialize: function() {
	
		var allCategoryView = new App.CatalogueCategoriesViews.Categories({ collection: App.categorie });
		$('#allcategories').append(allCategoryView.render().el);
		
	}
});



/*
|--------------------------------------------------------------------------
| All Categories View
|--------------------------------------------------------------------------
*/

App.CatalogueCategoriesViews.Categories = Backbone.View.extend({
	tagName: 'tbody',
	
	initialize: function() {
		this.collection.on('add', this.addOne, this);
	},

	render: function() {
		this.collection.each( this.addOne, this );
		return this;
	},

	addOne: function(category) {
		var categoryView = new App.CatalogueCategoriesViews.Category({ model: category });
		this.$el.append(categoryView.render().el);
	}
});


/*
|--------------------------------------------------------------------------
| Single Category View
|--------------------------------------------------------------------------
*/
App.CatalogueCategoriesViews.Category = Backbone.View.extend({
	tagName: 'tr',

	template: template('CategoriesTemplate'),

	initialize: function() {
		this.model.on('destroy', this.unrender, this);
		this.model.on('change', this.render, this);
	},

	/*events: {
		'click a.edit'  : 'FilterCategory'
	},
*/
	FilterCategory: function() {
		var editCategoryView = new App.CatalogueCategoriesViews.EditCategory({ model: this.model });
		$('#editCategoryId').html(editCategoryView.el);
	},

	deleteCategory: function() {
		this.model.destroy();
	},

	render: function() {
		this.$el.html( this.template( this.model.toJSON() ) );
		return this;
	},

	unrender: function() {
		this.remove();
	}
});

