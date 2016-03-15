function addToShoppingCart(item){
	console.log("addToShoppingCart");
	console.log(item);
	var $body = angular.element(document.body);
	var $rootScope = $body.scope().$root;      
	$rootScope.$apply(function () {            
		$rootScope.shopping_cart_data.push( {name: item.name, product: item, quantity: 1} );
	});
}

angular.module('catalog', ['ngRoute']);


angular.module('catalog').run(function($rootScope, $location, $routeParams, $http, $httpParamSerializer){ 
    $rootScope.product_list_data = [];
    $rootScope.search_catalog_form = {
		product_name : '',
		product_price : '',
		category_name : '',
		category_options : [],
	};
    $rootScope.searchProducts = function($event){
    	var strSearchFormParams = $httpParamSerializer($rootScope.search_catalog_form);
    	$http.get (config.pathApiServer + 'product/getProductsList/?' + strSearchFormParams).then(function(response){
            console.log(response.data);
            if( response.data.success  ){
            	$rootScope.product_list_data = response.data.data;
            }
            else{
            	alert(response.data.message);
            }
        });
	}
});

angular.module('catalog').controller('CatalogSearchController', ['$rootScope', '$http', function($rootScope, $http){
	$rootScope.sendCatalogSearchForm = function($event){
		$rootScope.searchProducts();
	}
	$rootScope.getCategorysList = function($event){
		var categoryFilters = "";
		$http.get (config.pathApiServer + 'category/getCategorysList/?' + categoryFilters).then(function(response){
            if( response.data.success  ){
            	$rootScope.search_catalog_form.category_options = [];
            	console.log(response.data.data);
            	for (key in response.data.data){
            		$rootScope.search_catalog_form.category_options.push({
            			name: response.data.data[key]['name'],
            			value: response.data.data[key]['idCategory'],
            		});
            	}
            	console.log($rootScope.search_catalog_form.category_options);
            }
            else{
            	alert(response.data.message);
            }
        });
	}
	//$rootScope.getCategorysList();
	$rootScope.searchProducts();
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
