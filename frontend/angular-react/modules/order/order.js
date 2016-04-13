angular.module('order', ['ngRoute']);

angular.module('order').run(function($rootScope, $location, $routeParams, $http, $httpParamSerializer){ 
    
});

angular.module('order').controller('OrderController', ['$rootScope', '$http', function($rootScope, $http){
	
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
