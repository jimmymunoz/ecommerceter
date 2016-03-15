angular.module('admin_product', ['ngRoute']);


angular.module('admin_product').run(function($rootScope, $location, $routeParams, $http, $httpParamSerializer){ 
    $rootScope.product_list_data = [];
    $rootScope.product_manager_form = {
		name: '',
		description: '',
		price: '',
		tax: '',
		buyPrice: '',
		quantity: '',
		weight: '',
		category: '',
		image: '',
	};
    $rootScope.searchProducts = function($event){
    	var strSearchFormParams = $httpParamSerializer($rootScope.search_admin_product_form);
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

angular.module('admin_product').controller('AdminCreateProductController', ['$rootScope', '$http', function($rootScope, $http){
	$rootScope.sendProductManagerForm = function($event){
		$rootScope.searchProducts();
	}
	$rootScope.getCategorysList = function($event){
		var categoryFilters = "";
		$http.get (config.pathApiServer + 'category/getCategorysList/?' + categoryFilters).then(function(response){
            if( response.data.success  ){
            	$rootScope.search_admin_product_form.category_options = [];
            	console.log(response.data.data);
            	for (key in response.data.data){
            		$rootScope.search_admin_product_form.category_options.push({
            			name: response.data.data[key]['name'],
            			value: response.data.data[key]['idCategory'],
            		});
            	}
            	console.log($rootScope.search_admin_product_form.category_options);
            }
            else{
            	alert(response.data.message);
            }
        });
	}
	//$rootScope.getCategorysList();
	//$rootScope.searchProducts();
}]);

angular.module('admin_product').directive('adminProductManager', function(){
	return {
		templateUrl: 'admin_modules/catalog/admin_product_main.html'
	}
});

angular.module('admin_product').directive('adminProductList', function(){
	return {
		restrict: 'E',
		scope:{
			data: '='
		},
		link: function(scope, el, attrs){
			scope.$watchCollection('data', function(newValue, oldValue){
				ReactDOM.render(
			        React.createElement(AdminProductListTable, {data: newValue}),
			        el[0]
			    );
			})
		}
	}
});
