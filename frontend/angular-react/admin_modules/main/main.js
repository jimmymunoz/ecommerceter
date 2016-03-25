angular.module('admin_product', ['ngRoute']);




angular.module('admin_product').run(function($rootScope, $location, $routeParams, $http, $httpParamSerializer){ 
    
});


angular.module('admin_product').directive('adminProductManager', function(){
	return {
		templateUrl: 'admin_modules/main/admin_product_main.html'
	}
});

angular.module('admin_product').directive('adminProductList', function(){
	return {
		restrict: 'E',
		scope:{
			data: '='
		},
		link: function(scope, el, attrs){
			console.log("directive adminProductList");
			scope.$watchCollection('data', function(newValue, oldValue){
				console.log("inside directive adminProductList");
				ReactDOM.render(
			        React.createElement(AdminProductListTable, {data: newValue}),
			        //React.createElement(ProductListContent, {data: newValue}),
			        el[0]
			    );
			})
		}
	}
});