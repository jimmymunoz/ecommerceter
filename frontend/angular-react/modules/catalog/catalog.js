/**
 * [addToShoppingCart description]
 * @param {[type]} productData [description]
 * @param {[type]} quantity    [description]
 * shoppingCartList[ {
		'product': productData,
		'quantity': quantity,
	} ];
 */
function addToShoppingCart(productData, quantity){
	var $body = angular.element(document.body);
	var $rootScope = $body.scope().$root;      
	$rootScope.$apply(function () { 
		addToSessionShoppingCart(productData, quantity);       
		$rootScope.shopping_cart_data = getToSessionShoppingCart();
		//updateShoppingCartTotals();
		colseModal();
		//$rootScope.shopping_cart_data.push( {name: item.name, product: item, quantity: 1} );
	});
}

function removeToShoppingCart(productData){
	var $body = angular.element(document.body);
	var $rootScope = $body.scope().$root;      
	$rootScope.$apply(function () { 
		removeToSessionShoppingCart(productData.idProduct);
		$rootScope.shopping_cart_data = getToSessionShoppingCart();
		//updateShoppingCartTotals();
		//colseModal();
		//$rootScope.shopping_cart_data.push( {name: item.name, product: item, quantity: 1} );
	});
}


function showProductDetailWindow(productData){
	var $body = angular.element(document.body);
	var $rootScope = $body.scope().$root;      
	$rootScope.$apply(function () {            
		$rootScope.detailProduct = productData;
		$rootScope.detailProduct.quantity = 1;
	});
}

function setCategoryId (obj){
	var idCategory = $(obj).attr('category-id')
  	var level = $(obj).attr('level')
  	var $body = angular.element(document.body);
	var $rootScope = $body.scope().$root; 
	$rootScope.$apply(function () {            
		$rootScope.search_catalog_form.category = idCategory;
		//$rootScope.search_catalog_form.idCategory = idCategory;
		$rootScope.search_catalog_form.levelCategory = level;
		sendCatalogSearchForm();
	});     

}

function sendCatalogSearchFormTest (){
	var $body = angular.element(document.body);
	var $rootScope = $body.scope().$root; 
	$rootScope.$apply(function () {            
		searchProducts(9, 1);
	});     

}


angular.module('catalog', ['ngRoute']);


angular.module('catalog').run(function($rootScope, $location, $routeParams, $http, $httpParamSerializer){ 
    
    $rootScope.product_list_data = [];
    $rootScope.localstorage = {
		categorySelected: {},
	};
    $rootScope.search_catalog_form = {
    	idProduct: '',
		name: '',
		description: '',
		price: '',
		tax: '',
		buyPrice: '',
		quantity: '',
		weight: '',
		category: '',
		idCategory: '',
		levelCategory: '',
		level: '',
		minPrice: 10,
		maxPrice: 2000,
		image: ''
	};

	$rootScope.detailProduct = {
    	idProduct: '',
		name: '',
		description: '',
		price: '',
		tax: '',
		brand: '',
		buyPrice: '',
		quantity: '',
		weight: '',
		category: '',
		quantity: '',
		image: ''
	};
});

angular.module('catalog').controller('CatalogSearchController', ['$scope', '$rootScope', '$http', '$httpParamSerializer', function($scope, $rootScope, $http, $httpParamSerializer){
	$scope.pageChanged = function(newPage) {
        $rootScope.pagination_current_page = (newPage != undefined)? newPage : $rootScope.pagination_current_page;
        searchProducts($rootScope.pagination_page_size, $rootScope.pagination_current_page);
    };
    
    searchProducts = function(page_size, current_page){
    	//$rootScope.search_catalog_form.category = $rootScope.localstorage.categorySelected.id;
    	var strSearchFormParams = $httpParamSerializer($rootScope.search_catalog_form);
    	$http.get (config.pathApiServer + 'product/getProductsList/?page_size=' + page_size  + '&page=' + current_page + "&" + strSearchFormParams).then(function(response){
            if( response.data.success  ){
            	$rootScope.product_list_data = response.data.data;
            	$rootScope.client_pagination = response.data.pagination;
            }
            else{
            	notifyServerResponse(response);
            	//alert(response.data.message);
            }
        });
	}

	addToShoppingCartDetailProduct = function(){
		addToSessionShoppingCart($rootScope.detailProduct, $rootScope.detailProduct.quantity);       
		$rootScope.shopping_cart_data = getToSessionShoppingCart();
		colseModal();
	}
	/*
	
	showProductDetailWindow =  function(productData){
		$rootScope.detailProduct = productData;
	}
	 */
	$rootScope.sendCatalogSearchFormBridge = function(){
		sendCatalogSearchForm();
	}
	sendCatalogSearchForm = function(){
		$scope.pageChanged(1);
	}
	var timers = {};
    function delayShowData(type, values) {
		clearTimeout(timers[type]);
		timers[type] = setTimeout(function() {
      	console.log("Refresh price: " + values[0] + '  - ' + values[1] + ' ');
        //$('span.' + type).text(values[0] + 'mm - ' + values[1] + 'mm');
		$rootScope.search_catalog_form.minPrice = values[0];
		$rootScope.search_catalog_form.maxPrice = values[1];
       	sendCatalogSearchForm();
      }, 500);
    }

	$('#sl2').slider({});//price range
	$("#sl2").on("slide", function(slideEvt) {
		delayShowData('price_products', slideEvt.value);
		//console.log("Slider: " + slideEvt.value);
	});

	setCategorysOptions();
	setCategoryMenuTree();//$rootScope.category_menu_tree
	//$rootScope.searchProducts();
	$scope.pageChanged();
}]);

angular.module('catalog').directive('catalogContainer', function(){
	return {
		templateUrl: 'modules/catalog/catalog_container.html'
	}
});

angular.module('catalog').directive('productList', function(){
	return {
		restrict: 'E',
		scope:{
			data: '='
		},
		link: function(scope, el, attrs){
			scope.$watchCollection('data', function(newValue, oldValue){
				ReactDOM.render(
			        React.createElement(ProductListContent, {data: newValue}),
			        el[0]
			    );
			})
		}
	}
});
