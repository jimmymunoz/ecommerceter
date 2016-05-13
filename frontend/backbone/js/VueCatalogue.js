
App.VueCatalogue.App = Backbone.View.extend({
	initialize: function() {
		  
		//var vue = new App.VueCatalogue.MaVue({ collection: App.produits  });
		var allProductsView = new App.VueCatalogue.Products({ collection: App.produits });
		$('#allProducts').append(allProductsView.render().el);
		
	}
	
});


//App.VueCatalogue.ShowProductView  ////

App.VueCatalogue.ShowProductView = Backbone.View.extend({
	template: template('showProductTemplate'),
	//el: '#editProductTemplate',

	initialize: function() {
		this.render();
		//var quantite = this.form.find('#Quantite');
	},

	 events: {
		"click .btn-btn-fefault-cart": "submit",
	},

	submit: function(e) {
		/*e.preventDefault();
		var html = this.template( this.model.toJSON() );*/
		// console.log(this.model.toJSON()+quantite);
		// $('#ShowProductId2').html(html);
		var cardContent = new App.VueCatalogue.AddToCard({ model: this.model });
		
		$('#AddToCardId').append(cardContent.el);
		//shopping_cart_view.collection.add(this.model);
	},

	

	render: function() {
	
		
		var html = this.template( this.model.toJSON() );
		 console.log(this.model.toJSON());
		this.$el.html(html);
		return this;
	}
});
/*
var ShoppingCartView = Backbone.View.extend({
	el:"#shopping_cart",
	initialize: function(){
		this.collection.on("add", this.render, this); 
	},
	render: function(){
		var template_html = jQuery("#addTocard").html();
		var total = this.getTotal();
		this.$el.html(_.template(template_html, {products:this.collection.models, total:total}));
	},
	getTotal: function(){
		var sum = 0;
		_.each(this.collection.models, function(product){
			sum += parseFloat(product.get("price"));
		});
		return parseFloat(sum).toFixed(2);
	}
		
});*/

App.VueCatalogue.AddToCard = Backbone.View.extend({
	tagName: 'tr',
	template: template('addTocard'),
	//el: '#editProductTemplate',

	initialize: function() {
		this.render();
		
	},
	render: function() {
	
		
		var html = this.template( this.model.toJSON() );
		 console.log(this.model.toJSON());
		this.$el.html(html);
		return this;
	}
});

App.VueCatalogue.MaVue = Backbone.View.extend({

initialize: function() {
this.collection.on('add', this.addOne, this);
		
		 var administrator = this.collection.models;
		var arr = [];
		for (i=0;i<administrator.length;i++) {
          arr.push(administrator[i].attributes);
        }
		
		var administrators = arr; 
   
var AdministratorsCollection = Backbone.Collection.extend({
});
var FilteredCollection = Backbone.Collection.extend();

var AdministratorView = Backbone.View.extend({
    el: '#montest',
    template: _.template($('#ClientTmpl').html()),
    render: function() {
        $(this.el).append(this.template({administrators: this.collection.models}));
    },
	events: {
		'click a.edit'  : 'ShowProduct'
	},
	
ShowProduct: function() {
		var ShowProductV = new App.VueCatalogue.ShowProductView({ model: this.collection.models[1] });
		//console.log(this.collection.models[0]);
		$('#ShowProductId').html(ShowProductV.el);
		//alert("You clicked me");
	}
});

var administratorCollection = new AdministratorsCollection(administrators);


renderView = function() {
    var administratorView = new AdministratorView({
        collection: administratorCollection
    });
    
    administratorView.render();
};

renderView();

$('#filter').on('keyup', function(e) {
    filteredCollection = new FilteredCollection();
	 el = e.currentTarget;
        value = $(el).val();
		console.log(value);
    filteredCollection.reset(filterTable(administratorCollection, value));
    resetTable(filteredCollection);
});

resetTable = function(filteredCollection){
    $('#montest').html('');
    
    var administratorFilteredView = new AdministratorView({
        collection: filteredCollection
    });
    
    administratorFilteredView.render();

}

filterTable = function(collection, filterValue){
    var filteredCollection;
    if (filterValue === "") {
        return collection.toJSON();
    }
    return filteredCollection = collection.filter(function(data) {
      return _.some(_.values(data.toJSON()), function(value) {
        value = (!isNaN(value) ? value.toString() : value);
        return value.indexOf(filterValue) >= 0;
      });
    });
}; 
},


		
addOne: function(product) {
		var productView = new App.VueCatalogue.Product({ model: product });
		this.$el.append(productView.render().el);
	}
});
 
 /*
|--------------------------------------------------------------------------
| All Products View
|--------------------------------------------------------------------------
*/

App.VueCatalogue.Products = Backbone.View.extend({
	tagName: 'tbody',
	
	initialize: function() {
		this.collection.on('add', this.addOne, this);
	},

	render: function() {
		this.collection.each( this.addOne, this );
		return this;
	},

	addOne: function(product) {
		var productView = new App.VueCatalogue.Product({ model: product });
		this.$el.append(productView.render().el);
	}
});


/*
|--------------------------------------------------------------------------
| Single Product View
|--------------------------------------------------------------------------
*/
App.VueCatalogue.Product = Backbone.View.extend({
	//tagName: 'tr',

	template: template('ClientTmpl'),

	initialize: function() {
		this.model.on('destroy', this.unrender, this);
		this.model.on('change', this.render, this);
	},

	events: {
		'click a.edit'  : 'ShowProduct'
	},
	
	ShowProduct: function() {
		//var ShowProductV = new App.VueCatalogue.ShowProductView({ model: this.collection.models[1] });
		var ShowProductV = new App.VueCatalogue.ShowProductView({ model: this.model });
		
		$('#ShowProductId').html(ShowProductV.el);
		
	},

	/*editProduct: function() {
		var editProductView = new App.VueCatalogue.EditProduct({ model: this.model });
		$('#editProductId').html(editProductView.el);
		
	},

	deleteProduct: function() {
		this.model.destroy();
	},*/

	render: function() {
		this.$el.html( this.template( this.model.toJSON() ) );
		return this;
	},

	unrender: function() {
		this.remove();
	}
});


 