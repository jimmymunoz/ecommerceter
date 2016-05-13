App.CategoriesViews.App = Backbone.View.extend({
	initialize: function() {
		
		
	//$("#editCategory").hide();
		//vent.on('category:edit', this.editCategory, this);

		
		var addCategoryView = new App.CategoriesViews.AddCategory({ collection: App.categories });

		
		var allCategoryView = new App.CategoriesViews.Categories({ collection: App.categories });
		$('#allcategories').append(allCategoryView.render().el);
		
	},
	
	editCategory: function(category) {
		
	}
});

/*
|--------------------------------------------------------------------------
| Add Category View
|--------------------------------------------------------------------------
*/
App.CategoriesViews.AddCategory = Backbone.View.extend({
	el: '#addCategory',

	initialize: function() {
		this.name = $('#name_Cat');
		this.idParent = $('#parent_name');
		//this.level = $('#level');
		this.creationDate = $('#creationDate');
		this.modificationDate = $('#modificationDate');
	},

	events: {
		'submit': 'addCategory'
	},

	addCategory: function(e) {
		e.preventDefault();
		console.log(this.name.val());
		console.log(this.idParent.val());
		this.collection.create({
			name: this.name.val(),
			idParent: this.idParent.val(),
			//level: this.level.val(),
			creationDate: Date(),
			modificationDate: ''
		}, { wait: true });
		this.clearForm();
	},

	clearForm: function() {
		this.name.val('');
		this.idParent.val('');
		//this.level.val('');
		
	}
});


/*
|--------------------------------------------------------------------------
| Edit Category View
|--------------------------------------------------------------------------
*/
App.CategoriesViews.EditCategory = Backbone.View.extend({
	template: template('editCategoryTemplate'),

	initialize: function() {
		this.render();

		this.form = this.$('form');
		
		this.name = this.form.find('#edit_name_Cat');
		this.idParent = this.form.find('#edit_idParent');
		//this.level = this.form.find('#edit_level');
		
	},

	events: {
		'submit form': 'submit',
		'click button.cancel': 'cancel'
	},

	submit: function(e) {
		e.preventDefault();

		this.model.save({
			name: this.name.val(),
			idParent: this.idParent.val(),
			//level: this.level.val(),
			modificationDate: Date()
		});

		//this.remove();
		//$("#editCategory").hide();
		//$("#addCategory").show();
	},

	cancel: function() {
		//this.remove();
		//$("#editCategory").hide();
		//$("#addCategory").show();		
	},

	render: function() {
		var html = this.template( this.model.toJSON() );

		this.$el.html(html);
		return this;
	}
});

/*
|--------------------------------------------------------------------------
| All Categories View
|--------------------------------------------------------------------------
*/

App.CategoriesViews.Categories = Backbone.View.extend({
	tagName: 'tbody',
	
	initialize: function() {
		this.collection.on('add', this.addOne, this);
	},

	render: function() {
		this.collection.each( this.addOne, this );
		return this;
	},

	addOne: function(category) {
		var categoryView = new App.CategoriesViews.Category({ model: category });
		this.$el.append(categoryView.render().el);
	}
});


/*
|--------------------------------------------------------------------------
| Single Category View
|--------------------------------------------------------------------------
*/
App.CategoriesViews.Category = Backbone.View.extend({
	tagName: 'tr',

	template: template('allCategoriesTemplate'),

	initialize: function() {
		this.model.on('destroy', this.unrender, this);
		this.model.on('change', this.render, this);
	},

	events: {
		'click a.delete': 'deleteCategory',
		'click a.edit'  : 'editCategory'
	},

	editCategory: function() {
		var editCategoryView = new App.CategoriesViews.EditCategory({ model: this.model });
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

