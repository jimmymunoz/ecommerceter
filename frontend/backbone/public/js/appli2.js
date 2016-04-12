(function () {


	var DimensionsModel = Backbone.Model.extend({

		url: 'http://localhost:8888/category'

	});
	
	var setHeader = function (xhr) {
		xhr.setRequestHeader('JsonStub-User-Key', '0bb5822a-58f7-41cc-b8a7-17b4a30cd9d7');
		xhr.setRequestHeader('JsonStub-Project-Key', '9e508c89-b7ac-400d-b414-b7d0dd35a42a');
	};

	var DimensionsView = Backbone.View.extend({
		el: '.js-container',

		initialize: function () {
			var that = this;
			this.listenTo(this.model,'change', this.render);
			this.model.fetch({
				beforeSend: setHeader
			});
		},

		render: function () {
			console.log('inside render');
			console.log(this.model);
			console.log( this.model.get('name').length );  //returns length of 3
			console.log( this.model.get('name')[0].id ); //returns the id I expect

			var menu = '<select>';
			for (var i = 0, dimensionsLength = this.model.get('name').length; i < dimensionsLength; i++) {
				console.log('ID = ' + this.model.get('name')[i].id);
				menu += '<option>' + this.model.get('name')[i].id + '</options>';

			}
			
			menu += '</select>';
			$(menu).appendTo(this.$el);
			//$('.js-container').html(menu);

			return this;
		}
	});

	var myModel = new DimensionsModel();
	var myView = new DimensionsView({model: myModel});
	
}());