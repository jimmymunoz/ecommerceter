/*
http://www.tutorialspoint.com/restful/restful_first_application.htm
|--------------------------------------------------------------------------
| Global App View 
|--------------------------------------------------------------------------
*/

App.OrdersViews.App = Backbone.View.extend({
	initialize: function() {
		
		//$("#editOrder").hide();
		//vent.on('order:edit', this.editOrder, this);

		var allOrderView = new App.OrdersViews.Orders({ collection: App.orders });
		$('#allorders').append(allOrderView.render().el);
	}
});

/*
|--------------------------------------------------------------------------
| Edit Order View
|--------------------------------------------------------------------------
*/
App.OrdersViews.EditOrder = Backbone.View.extend({
	template: template('editOrderTemplate'),

	initialize: function() {
		this.render();

		this.form = this.$('form');
		
		this.idOrder = this.form.find('#edit_order');
		this.status = this.form.find('#edit_status');
		this.address = this.form.find('#edit_address');
		this.city = this.form.find('#edit_city');
		this.approvalCode = this.form.find('#edit_approvalCode');
		
		//this.CategoryData = this.form.find('#edit_CategoryData');
		
	},

	events: {
		'submit form': 'submit',
		'click button.cancel': 'cancel'
	},

	submit: function(e) {
		e.preventDefault();

		this.model.save({
			idOrder: this.idOrder.val(),
			status: this.status.val(),
			address: this.address.val(),
			city: this.city.val(),
			approvalCode: this.approvalCode.val()
			
		});

		//this.remove();
		//$("#editOrder").hide();
		
	},

	cancel: function() {
		//this.remove();
		//$("#editOrder").hide();
			
	},

	render: function() {
		var html = this.template( this.model.toJSON() );

		this.$el.html(html);
		return this;
	}
});


/*
|--------------------------------------------------------------------------
| All Orders View
|--------------------------------------------------------------------------
*/

App.OrdersViews.Orders = Backbone.View.extend({
	tagName: 'tbody',
	
	initialize: function() {
		this.collection.on('add', this.addOne, this);
	},

	render: function() {
		this.collection.each( this.addOne, this );
		return this;
	},

	addOne: function(order) {
		var orderView = new App.OrdersViews.Order({ model: order });
		this.$el.append(orderView.render().el);
	}
});


/*
|--------------------------------------------------------------------------
| Single Order View
|--------------------------------------------------------------------------
*/
App.OrdersViews.Order = Backbone.View.extend({
	tagName: 'tr',

	template: template('allOrdersTemplate'),

	initialize: function() {
		this.model.on('destroy', this.unrender, this);
		this.model.on('change', this.render, this);
	},

	events: {
		'click a.delete': 'deleteOrder',
		'click a.edit'  : 'editOrder'
	},

	editOrder: function() {
		var editOrderView = new App.OrdersViews.EditOrder({ model: this.model });
		$('#editOrderId').html(editOrderView.el);
	},

	deleteOrder: function() {
		this.model.destroy();
	},

	render: function() {
		this.$el.html( this.template( this.model.toJSON() ) );
		console.log(this.model.toJSON());
		return this;
	},

	unrender: function() {
		this.remove();
	}
});