angular.module('order', ['ngRoute']);

angular.module('order').run(function($rootScope, $location, $routeParams, $http, $httpParamSerializer){ 
	$rootScope.order_result = [];
	$rootScope.order_result.orderLines = [];
});

angular.module('order').controller('OrderController', ['$rootScope', '$http', function($rootScope, $http){
	$rootScope.order_result = getOrderInSession();
	console.log($rootScope.order_result);
    $rootScope.order_result_totals = {
    	q_items : 0,
    	carSubtotal : 0,
    	carTaxSubtotal : 0,
    	carTotal : 0,
    }
    /*
    */
	$rootScope.$watchCollection('order_result', function(newValue, oldValue) {
	  	//console.log($rootScope.order_result);
	  	if( $rootScope.order_result.idOrder != undefined && $rootScope.order_result.idOrder > 0 ){
	  		$("#container_result_order").css('display', 'block');
	  	}
	  	else{
	  		$("#container_result_order").css('display', 'none');
	  	}
	  	if( $rootScope.order_result.orderLines != undefined ){

	  	  	$rootScope.order_result_totals.q_items = $rootScope.order_result.orderLines.length;
		    var carSubtotal = 0;
		    var carTaxSubtotal = 0;
		    var carTotal = 0;
		    for( key in $rootScope.order_result.orderLines ){//If already exits
				carTaxSubtotal += $rootScope.order_result.orderLines[key]['totalTax'];
				carTotal += $rootScope.order_result.orderLines[key]['total'];
			}
		    $rootScope.order_result_totals.carSubtotal = carTotal - carTaxSubtotal;
			$rootScope.order_result_totals.carTaxSubtotal = carTaxSubtotal;
			$rootScope.order_result_totals.carTotal = carTotal;
			//console.log($rootScope.order_result_totals);
	  	}
	  	else{
	  		$rootScope.order_result.orderLines = [];
	  		$("#container_result_order").css('display', 'none');
	  		
	  	}
	    
	});
    /*
	*/
}]);

angular.module('order').directive('orderContainer', function(){
	return {
		templateUrl: 'modules/order/order_container.html'
	}
});


angular.module('order').directive('orderResultList', function(){
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
