angular.module('order', ['ngRoute']);

angular.module('order').run(function($rootScope, $location, $routeParams, $http, $httpParamSerializer){ 
	$rootScope.order_result = [];
});

angular.module('order').controller('OrderController', ['$rootScope', '$http', function($rootScope, $http){
	$rootScope.order_result = getOrderInSession();
	console.log($rootScope.order_result);
    /*
    $rootScope.order_result_totals = {
    	q_items : 0,
    	carSubtotal : 0,
    	carTaxSubtotal : 0,
    	carTotal : 0,
    }
    */
    /*
	$rootScope.$watchCollection('order_result', function(newValue, oldValue) {
	  	$rootScope.order_result_totals.q_items = $rootScope.order_result.length;
	    var carSubtotal = 0;
	    var carTaxSubtotal = 0;
	    var carTotal = 0;
	    for( key in $rootScope.order_result ){//If already exits
			carTaxSubtotal += $rootScope.order_result[key]['totalTax'];
			carTotal += $rootScope.order_result[key]['total'];
		}
	    $rootScope.order_result_totals.carSubtotal = carTotal - carTaxSubtotal;
		$rootScope.order_result_totals.carTaxSubtotal = carTaxSubtotal;
		$rootScope.order_result_totals.carTotal = carTotal;
	    
	});
*/
}]);

angular.module('order').directive('orderContainer', function(){
	return {
		templateUrl: 'modules/order/order_container.html'
	}
});

angular.module('order').directive('orderList', function(){
	return {
		restrict: 'E',
		scope:{
			data: '='
		},
		link: function(scope, el, attrs){
			scope.$watchCollection('data', function(newValue, oldValue){
				ReactDOM.render(
			        React.createElement(OrderListContent, {data: newValue}),
			        el[0]
			    );
			})
		}
	}
});
