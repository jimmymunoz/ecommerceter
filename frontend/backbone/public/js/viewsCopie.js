/*
|--------------------------------------------------------------------------
| Global App View 
|--------------------------------------------------------------------------
*/

App.Views.App = Backbone.View.extend({
	initialize: function() {
		  
		$("#editProduct").hide();
		vent.on('product:edit', this.editProduct, this);
		/*$("#MaVueCliente").hide();
		vent.on('product:client', this.MaVueCliente, this);
		$("#MaVueAdministratrice").hide();
		vent.on('product:admin', this.MaVueAdministratrice, this); 
		
		$("#addProduct").hide();
		vent.on('product:add', this.addProduct, this);
		
		$("#allProducts").hide();
		vent.on('product:allProd', this.allProducts, this);
		
		$("#editProductTemplate").hide();
		vent.on('product:editProdTemplate', this.editProductTemplate, this);
		
		 $("#ClientTmpl").hide();
		vent.on('product:client', this.ClientTmpl, this);  */
		 
		//var VuePrincipale = new App.Views.Principale({ collection: App.products });
		
		
			
		
 		var addProductView = new App.Views.AddProduct({ collection: App.products  });
		
		var allProductsView = new App.Views.Products({ collection: App.products  });
		$('#allProducts').append(allProductsView.render().el);
	
		//var vue = new App.Views.MaVue({ collection: App.products  }); */
		
		
		
		/* var v = new V({collection: App.products,
        el: '#view'
         });
		
		 new App.Views.ResearchProduct({ collection: App.products });
		//$('#SearchProductv').append(SarchItemView.search().el);
		var ProductView = new App.Views.ResearchProduct({ collection: App.products });
		$('#SearchProduct').append(ProductView.ProductChange().el);*/
		 
	
	}, 
	editProduct: function(product) {
		var editProductView = new App.Views.EditProduct({ model: product });
		$('#editProduct').html(editProductView.el);
	}
	/* ,addProduct:function(product) {
	var addProductView = new App.Views.AddProduct({ collection: product  });
	//$('#addProduct').html(addProductView.el);
	},
	allProducts:function(product) {
	var allProductsView = new App.Views.Products({ collection: product  });
		$('#allProducts').append(allProductsView.render().el);
	},
	editProductTemplate:function(product) {
	},
	ClientTmpl:function(product) {
		var vue = new App.Views.MaVue({ collection: product  });
		//$('#ClientTmpl').html(vue.el);
	 ,MaVueCliente: function() {
		var vue = new App.Views.MaVue({ collection: App.products  });;
		$('#MaVueCliente').html(vue.el);
	}
	,MaVueAdministratrice: function(product) {
		var addProductView = new App.Views.AddProduct({ model: product  });
		
		var allProductsView = new App.Views.Products({ model: product  });
		$('#allProducts').append(allProductsView.render().el);
		
		$('#MaVueAdministratrice').html(addProductView.el);
		$('#MaVueAdministratrice').html(allProductsView.el);
	} */
});


/*
|--------------------------------------------------------------------------
| Add Product View
|--------------------------------------------------------------------------
*/
App.Views.AddProduct = Backbone.View.extend({
el: '#addContact',
	//template: template('addProduct'),
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
		
		
	}
});


/*
|--------------------------------------------------------------------------
| Research Product View
|--------------------------------------------------------------------------
*/
/*
App.Views.ResearchProduct = Backbone.View.extend({
            el: "#SearchProduct",
            initialize: function () {
			
            },
			template: template('allProductsTemplate'),
            events: {
                "keyup #donnees": "ProductChange"
            },
            ProductChange: function (event) {
               // console.log(event);
			//var superset = new App.Collections.Products;
			//var filtered = new FilteredCollection(superset);
			//var val = filtered.filterBy({ name: this.name });
			this.donnees = $(event.target).val();
                console.log("donnees: " + this.donnees);
				//console.log(val);
				//this.model.find
            },
			
        })
 
       // var movieInput = new MovieInput();
*/

App.Views.ResearchProduct = Backbone.View.extend({

    template: '<label>Search :</label>'+'<input type="text" id="searchItem" />',
	//template: template('SearchProduct'),
    //tagName: "form",

    events : {
        'keyup #searchItem' : 'search'
    },

    initialize : function(options){
        this.collection = options.collection;
        this.parentView = options.parentView;
		
    },

    render: function () {
        this.$el.html(this.template);
        return this;
    },

    search : function(e){
        var letters = $("#searchItem").val();
        var filterd = this.collection.search(letters);
        var parentView = this.parentView;
        parentView.$('#items').empty();
        filterd.each(function(item){
            parentView.addOne(item);
			 //console.log(e);
			// console.log(parentView);
			// console.log(filterd);
			// console.log(letters);
        });
    }
});


/*
|--------------------------------------------------------------------------
| Mon essai de filtre
|--------------------------------------------------------------------------
*/

/*
App.Views.Filter = Backbone.View.extend({
	events: {
		"keyup #searchProd" : "search",
		"change #prodSorting":"sorts"
	},
	render: function(data) {
		$(this.el).html(this.template);
		return this;
	},
	renderList : function(prods){
		$("#prodList").html("");
 
		prods.each(function(prod){
			var view = new App.Views.ProdsItem({
				model: prod,
				collection: this.collection
			});
			$("#prodList").append(view.render().el);
		});
		return this;
	},
	initialize : function(){
		this.template = _.template($("#list_container_tpl").html());
		this.collection.bind("reset", this.render, this);
	},
	search: function(e){
		var letters = $("#searchProd").val();
		this.renderList(this.collection.search(letters));
	},	
	sorts: function(e){
		var status = $("#prodSorting").find("option:selected").val();
		if(status == "") status = 0;
		this.renderList(this.collection.currentStatus(status));
	}
});
 
// we would instantiate this view with our collection
this.listContainerView = new App.Views.Filter({
	collection: App.products
});
// print our template
$("#contentContainer").prepend(this.listContainerView.render().el);

App.Views.ProdsItem = Backbone.View.extend({
	events: {},
	render: function(data) {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	},
	initialize : function(){
		this.template = _.template($("#prod_item_tpl").html());
	}
});
*/

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
		//this.CategoryData= this.form.find('#edit_CategoryData');
		
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

		this.remove();
		$("#editProduct").hide();
		$("#addProduct").show();
	},

	cancel: function() {
		this.remove();
		$("#editProduct").hide();
		$("#addProduct").show();		
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
		vent.trigger('product:edit', this.model);
		$("#addProduct").hide();
		$("#editProduct").show();
	},

	deleteProduct: function() {
		this.model.destroy();
	},

	render: function() {
	var x = this.model.toJSON();
	//var x1 = this.models;
		//console.log(x);
		this.$el.html( this.template( x ) );
		return this;
	},

	unrender: function() {
		this.remove();
	}
});
/*******vue principale*******/
 App.Views.Principale = Backbone.View.extend({
	

	template: template('vuePrincipale'),

	initialize: function() {
		/* this.collection.on('destroy', this.unrender, this);
		this.collection.on('change', this.render, this); */
		},
		
	events: {
		'click a.Client' : 'client',
		'click a.Administrateur'  : 'admin'
	},

	client: function() {

	
		this.trigger('product:client', this.collection);
		//$(this.el).find('#ClientTmpl').show();
		
		$("#MaVueCliente").show();
		//$("#MaVueAdministratrice").hide(); 
		
		/* $("#ClientTmpl").show();
		$("#vuePrincipale").hide();
		$("#addProduct").hide();
		$("#editProduct").hide();
		$("#allProducts").hide();
		$("#editProductTemplate").hide();  */
		
	},

	admin: function() {
		vent.trigger('product:admin', this.model);
		$("#MaVueAdministratrice").show();
		$("#MaVueCliente").hide();
		/* 
		$("#addProduct").show();
		$("#allProducts").show();
		$("#editProductTemplate").show();
		
		$("#ClientTmpl").hide();
		$("#vuePrincipale").hide();
		$("#editProduct").hide(); */
	},
	render: function() {
	
		this.$el.html( this.template(this.model.toJSON()) );
		return this;
	},

	unrender: function() {
		this.remove();
	}
});
 
///////////////////////////
var V = Backbone.View.extend({
    events: {
        'keyup #filter' : 'filter_collection'
    },

    filter_collection: _.throttle(function(e) {
        var el, throttled, value;

        el = e.currentTarget;
        value = $(el).val();
		this.filter = value;
        this.update_collection(value);
    }, 1000),

    update_collection: function(val) {
        var promise, self;
        self = this;
        promise = this.collection.fetch();
        $.when(promise).then(function() {
          console.log('fetched '+val);
		 this.filter = val;
        });
    }
});
///////////
App.Views.MaVue = Backbone.View.extend({
initialize: function() {
this.collection.on('add', this.addOne, this);
		
		 var administrator = this.collection.models;
		var arr = [];
		for (i=0;i<administrator.length;i++) {
          arr.push(administrator[i].attributes);
        }
		
		var administrators = arr; 
    var administrators1 = [
{
  id: 1,
  firstName: "User1",
  lastName: "Tester",
  phone: "781-000-0000",
  email: "user1.tester@email.com",
  privileges: "view-only"
}, {
  id: 2,
  firstName: "Mickey",
  lastName: "Mouse",
  phone: "781-123-4567",
  email: "mickey.mouse@disney.com",
  privileges: "all"
}, {
  id: 3,
  firstName: "Snow",
  lastName: "White",
  phone: "781-890-1234",
  email: "snow.white@disney.com",
  privileges: "all"
}, {
  id: 4,
  firstName: "Anakin",
  lastName: "Skywalker",
  phone: "888-874-9084",
  email: "anakin.skywalker@deathstar.com",
  privileges: "view-only"
}, {
  id: 5,
  firstName: "Obi-one",
  lastName: "Kenobi",
  phone: "908-765-5432",
  email: "obi.kenobi@jedi.com",
  privileges: "all"
}, {
  id: 6,
  firstName: "Master",
  lastName: "Yoda",
  phone: "876-654-2134",
  email: "yoda@jedi.com",
  privileges: "view-only"
}, {
  id: 7,
  firstName: "Han",
  lastName: "Solo",
  phone: "781-456-3209",
  email: "han.solo@gmail.com",
  privileges: "all"
}, {
  id: 8,
  firstName: "Neo",
  lastName: "TheOne",
  phone: "781-000-0000",
  email: "neo@matrix.com",
  privileges: "all"
}];
console.log(administrators);
console.log(administrators1);
var AdministratorsCollection = Backbone.Collection.extend({
});
var FilteredCollection = Backbone.Collection.extend();

var AdministratorView = Backbone.View.extend({
    el: 'table tbody',
    template: _.template($('#ClientTmpl').html()),
    render: function() {
        $(this.el).append(this.template({administrators: this.collection.models}));
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
    $('table tbody').html('');
    
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
		var productView = new App.Views.Product({ model: product });
		this.$el.append(productView.render().el);
	}
});
 
 
 