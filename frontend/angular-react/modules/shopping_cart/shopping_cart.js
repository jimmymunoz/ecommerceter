angular.module('shopping_cart', ['ngRoute']);




angular.module('shopping_cart').run(function($rootScope, $location, $routeParams, $http, $httpParamSerializer){ 
    $rootScope.shopping_cart_data = getToSessionShoppingCart();
    $rootScope.shopping_cart_totals = {
    	q_items : 0,
    	carSubtotal : 0,
    	carTaxSubtotal : 0,
    	carTotal : 0,
    }
	$rootScope.$watchCollection('shopping_cart_data', function(newValue, oldValue) {
	  	$rootScope.shopping_cart_totals.q_items = $rootScope.shopping_cart_data.length;
	    var carSubtotal = 0;
	    var carTaxSubtotal = 0;
	    var carTotal = 0;
	    for( key in $rootScope.shopping_cart_data ){//If already exits
			carTaxSubtotal += $rootScope.shopping_cart_data[key]['totalTax'];
			carTotal += $rootScope.shopping_cart_data[key]['total'];
		}
	    $rootScope.shopping_cart_totals.carSubtotal = carTotal - carTaxSubtotal;
		$rootScope.shopping_cart_totals.carTaxSubtotal = carTaxSubtotal;
		$rootScope.shopping_cart_totals.carTotal = carTotal;
	    
	});
});

angular.module('shopping_cart').controller('ShoppingCartController', ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http){
	$scope.sendCatalogSearchForm = function($event){
		$scope.searchProducts();
	}
	$scope.searchProducts();
}]);

angular.module('shopping_cart').directive('shoppingCartContainer', function(){
	return {
		templateUrl: 'modules/shopping_cart/shopping_cart_container.html'
	}
});



/*
USING REACT
*/
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
