angular.module('offer', ['ngRoute']);


angular.module('offer').run(function($rootScope, $location, $routeParams, $http, $httpParamSerializer){ 
    
});

angular.module('offer').controller('OfferController', ['$rootScope', '$http', function($rootScope, $http){
	
}]);

angular.module('offer').directive('offerContainer', function(){
	return {
		templateUrl: 'modules/offer/offer_container.html'
	}
});

/*

angular.module('offer').directive('offerList', function(){
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
 */
