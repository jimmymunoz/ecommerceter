/*
|--------------------------------------------------------------------------
| Global App View 
|--------------------------------------------------------------------------
*/

App.Views.App = Backbone.View.extend({
	initialize: function() {
		
		//$("#editProduct").hide();
		//vent.on('product:edit', this.editProduct, this);

		var addProductView = new App.Views.AddProduct({ collection: App.products });
		
		var allProductsView = new App.Views.Products({ collection: App.products });
		$('#allProducts').append(allProductsView.render().el);
		
	}
	/*,

	editProduct: function(product) {
		var editProductView = new App.Views.EditProduct({ model: product });
		$('#editProduct').html(editProductView.el);
	}*/
});



/*
|--------------------------------------------------------------------------
| Add Product View
|--------------------------------------------------------------------------
*/
App.Views.AddProduct = Backbone.View.extend({
	el: '#addProduct',

	initialize: function() {
		this.name = $('#name');
		this.description = $('#description');
		this.price = $('#price');
		this.tax = $('#tax');
		this.buyPrice = $('#buyPrice');
		this.image = $('#image');
		this.quantity = $('#quantity');
		this.weight = $('#weight');
		this.category = $('#category');
		//this.CategoryData = $('#CategoryData');
		this.creationDate = $('#creationDate');
		this.modificationDate = $('#modificationDate');
	},

	events: {
		'submit': 'addProduct'
	},

	addProduct: function(e) {
		e.preventDefault();
		console.log(this.name.val());
		this.collection.create({
			name: this.name.val(),
			description: this.description.val(),
			price: this.price.val(),
			tax: this.tax.val(),
			buyPrice: this.buyPrice.val(),
			image: this.image.val(),
			quantity: this.quantity.val(),
			weight: this.weight.val(),
			category: this.category.val(),
			//CategoryData: this.CategoryData.val(),
			creationDate: Date(),
			modificationDate: ''
		}, { wait: true });
		this.clearForm();
	},

	clearForm: function() {
		this.name.val('');
		this.tax.val('');
		this.description.val('');
		this.price.val('');
		this.quantity.val('');
		this.buyPrice.val('');
		this.image.val('');
		this.weight.val('');
		this.category.val('');
		//this.CategoryData.val('');
		
	}
});


/*
|--------------------------------------------------------------------------
| Edit Product View
|--------------------------------------------------------------------------
*/
App.Views.EditProduct = Backbone.View.extend({
	template: template('editProductTemplate'),

	initialize: function() {
		this.render();

		this.form = this.$('form');
		
		this.name = this.form.find('#edit_name');
		this.description = this.form.find('#edit_description');
		this.price = this.form.find('#edit_price');
		this.tax = this.form.find('#edit_tax');
		this.buyPrice = this.form.find('#edit_buyPrice');
		this.image = this.form.find('#edit_image');
		this.quantity = this.form.find('#edit_quantity');
		this.weight = this.form.find('#edit_weight');
		this.category = this.form.find('#edit_category');
		//this.CategoryData = this.form.find('#edit_CategoryData');
		
	},

	events: {
		'submit form': 'submit',
		'click button.cancel': 'cancel'
	},

	submit: function(e) {
		e.preventDefault();

		this.model.save({
			name: this.name.val(),
			description: this.description.val(),
			price: this.price.val(),
			tax: this.tax.val(),
			buyPrice: this.buyPrice.val(),
			image: this.image.val(),
			quantity: this.quantity.val(),
			weight: this.weight.val(),
			category: this.category.val(),
			//CategoryData: this.CategoryData.val(),
			modificationDate: Date()
		});

		/*this.remove();
		$("#editProduct").hide();
		$("#addProduct").show();*/
	},

	cancel: function() {
		/*this.remove();
		$("#editProduct").hide();
		$("#addProduct").show();*/		
	},

	render: function() {
		var html = this.template( this.model.toJSON() );

		this.$el.html(html);
		return this;
	}
});



/*
|--------------------------------------------------------------------------
| All Products View
|--------------------------------------------------------------------------
*/

App.Views.Products = Backbone.View.extend({
	tagName: 'tbody',
	
	initialize: function() {
		this.collection.on('add', this.addOne, this);
	},

	render: function() {
		this.collection.each( this.addOne, this );
		return this;
	},

	addOne: function(product) {
		var productView = new App.Views.Product({ model: product });
		this.$el.append(productView.render().el);
	}
});


/*
|--------------------------------------------------------------------------
| Single Product View
|--------------------------------------------------------------------------
*/
App.Views.Product = Backbone.View.extend({
	tagName: 'tr',

	template: template('allProductsTemplate'),

	initialize: function() {
		this.model.on('destroy', this.unrender, this);
		this.model.on('change', this.render, this);
	},

	events: {
		'click a.delete': 'deleteProduct',
		'click a.edit'  : 'editProduct'
	},

	editProduct: function() {
		var editProductView = new App.Views.EditProduct({ model: this.model });
		$('#editProductId').html(editProductView.el);
	},

	deleteProduct: function() {
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

