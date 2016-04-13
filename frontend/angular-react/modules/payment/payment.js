angular.module('payment', ['ngRoute']);


angular.module('payment').run(function($rootScope, $location, $routeParams, $http, $httpParamSerializer){ 
    
});

angular.module('payment').controller('PaymentSearchController', ['$rootScope', '$http', function($rootScope, $http){
	
}]);

angular.module('payment').directive('paymentContainer', function(){
	return {
		templateUrl: 'modules/payment/payment_container.html'
	}
});

angular.module('payment').directive('paymentList', function(){
	return {
		restrict: 'E',
		scope:{
			data: '='
		},
		link: function(scope, el, attrs){
			scope.$watchCollection('data', function(newValue, oldValue){
				ReactDOM.render(
			        React.createElement(PaymentListContent, {data: newValue}),
			        el[0]
			    );
			})
		}
	}
});
