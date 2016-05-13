App.UsersViews.App = Backbone.View.extend({
	initialize: function() {
				
		var addUserView = new App.UsersViews.AddUser({ collection: App.users });
		
		var allUserView = new App.UsersViews.Users({ collection: App.users });
		$('#allusers').append(allUserView.render().el);
	}
});

/*
|--------------------------------------------------------------------------
| Add User View
|--------------------------------------------------------------------------
*/
App.UsersViews.AddUser = Backbone.View.extend({
	el: '#addUser',

	initialize: function() {
		this.firstName = $('#firstName');
		this.lastName = $('#lastName');
		this.email = $('#email');
		this.email = $('#phone');
		this.rol = $('#rol');
	},

	events: {
		'submit': 'addUser'
	},

	addUser: function(e) {
		e.preventDefault();
		console.log(this.firstName.val());
		this.collection.create({
			firstName: this.firstName.val(),
			lastName: this.lastName.val(),
			email: this.email.val(),
			phone: this.phone.val(),
			rol:this.rol.val()
			
		}, { wait: true });
		this.clearForm();
	},

	clearForm: function() {
		this.firstName.val('');
		this.lastName.val('');
		this.email.val('');
		this.phone.val('');
		this.rol.val('');
	}
});


/*
|--------------------------------------------------------------------------
| Edit User View
|--------------------------------------------------------------------------
*/
App.UsersViews.EditUser = Backbone.View.extend({
	template: template('editUserTemplate'),

	initialize: function() {
		this.render();

		this.form = this.$('form');
		
		this.firstName = this.form.find('#edit_firstName');
		this.lastName = this.form.find('#edit_lastName');
		this.email = this.form.find('#edit_email');
		this.phone = this.form.find('#edit_phone');
		this.rol = this.form.find('#edit_rol');
	},

	events: {
		'submit form': 'submit',
		'click button.cancel': 'cancel'
	},

	submit: function(e) {
		e.preventDefault();
	console.log(this.firstName.val());
		this.model.save({
			firstName: this.firstName.val(),
			lastName: this.lastName.val(),
			email: this.email.val(),
			phone: this.phone.val(),
			rol: this.rol.val()
		});

		
	},

	cancel: function() {
		
	},

	render: function() {
		var html = this.template( this.model.toJSON() );

		this.$el.html(html);
		return this;
	}
});

/*
|--------------------------------------------------------------------------
| All Users View
|--------------------------------------------------------------------------
*/

App.UsersViews.Users = Backbone.View.extend({
	tagName: 'tbody',
	
	initialize: function() {
		this.collection.on('add', this.addOne, this);
	},

	render: function() {
		this.collection.each( this.addOne, this );
		return this;
	},

	addOne: function(user) {
		var UserView = new App.UsersViews.User({ model: user });
		this.$el.append(UserView.render().el);
	}
});


/*
|--------------------------------------------------------------------------
| Single User View
|--------------------------------------------------------------------------
*/
App.UsersViews.User = Backbone.View.extend({
	tagName: 'tr',

	template: template('allUsersTemplate'),

	initialize: function() {
		this.model.on('destroy', this.unrender, this);
		this.model.on('change', this.render, this);
	},

	events: {
		'click a.delete': 'deleteUser',
		'click a.edit'  : 'editUser'
	},

	editUser: function() {
		var editUserView = new App.UsersViews.EditUser({ model: this.model });
		$('#editUserId').html(editUserView.el);
	},

	deleteUser: function() {
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

