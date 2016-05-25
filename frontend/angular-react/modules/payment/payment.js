angular.module('payment', ['ngRoute']);



angular.module('payment').run(function($rootScope, $location, $routeParams, $http, $httpParamSerializer){ 
    $rootScope.payment_form = {
    	cc_number: '',//cc -> credit_card
		cc_code: '',
		cc_month: '',
		cc_year: '',
		address: '',
		city: '',
		country: '',
		token: '',
		product: [],
		quantity: []
	};
});

angular.module('payment').controller('PaymentController', ['$rootScope', '$http', function($rootScope, $http){
	$rootScope.sendPaymentForm = function(){
		$rootScope.payment_form.token = getUserToken();
		if( validateCurrentLogin() ){
			$rootScope.payment_form.cc_month = $rootScope.localstorage.paymentMonthSelected.id;
			$rootScope.payment_form.cc_year = $rootScope.localstorage.paymentYearSelected.id;
			//get Quantites from Shopping Cart module:
			$rootScope.payment_form.product = [];
			$rootScope.payment_form.quantity = [];
			for(var key in $rootScope.shopping_cart_data){
				$rootScope.payment_form.product.push($rootScope.shopping_cart_data[key]['product']['idProduct']);
				$rootScope.payment_form.quantity.push($rootScope.shopping_cart_data[key]['quantity']);
			}
			var postUrl = config.pathApiServer + 'order/createOrderWithPayment/';
			$http.post(postUrl ,$rootScope.payment_form
	   			).then(function(response){
	   				notifyServerResponse(response);
		            if( response.data.success  ){
		            	colseModal();
		            	saveResultOrderInSession(response);
		            	$rootScope.order_result = getOrderInSession();
		            	console.log($rootScope.order_result);
		            }
		            else{
		            }
	        	}
	        );
		}
	}
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
