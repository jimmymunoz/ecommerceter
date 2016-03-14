angular.module('shopping_cart', ['ngRoute']);


angular.module('shopping_cart').run(function($rootScope, $location, $routeParams, $http, $httpParamSerializer){ 
    $rootScope.shopping_cart_data = [];
});

angular.module('shopping_cart').controller('ShoppingCartController', ['$scope', '$http', function($scope, $http){
	$scope.sendCatalogSearchForm = function($event){
		$scope.searchProducts();
	}
	$scope.searchProducts();
}]);

angular.module('shopping_cart').directive('shoppingCartContainer', function(){
	return {
		templateUrl: 'components/shopping_cart/shopping_cart_container.html'
	}
});

/*
USING REACT
angular.module('shopping_cart').directive('shoppingCartItems', function(){
	return{
		restrict: 'E',
		scope:{
			data: '='
		},
		link:function(scope, el, attrs){
			scope.$watchCollection('data', function(newValue, oldValue){
				ReactDOM.render(
			        React.createElement(ShoppingCartContent, {data: newValue}),
			        el[0]
			    );
			})
		}
	}
});
*/
