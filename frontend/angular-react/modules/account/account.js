angular.module('account', ['ngRoute']);


angular.module('account').run(function($rootScope, $location, $routeParams, $http, $httpParamSerializer){ 
    
});

angular.module('account').controller('AccountSearchController', ['$rootScope', '$http', function($rootScope, $http){
	
}]);

angular.module('account').directive('accountContainer', function(){
	return {
		templateUrl: 'modules/account/account_container.html'
	}
});

angular.module('account').directive('userList', function(){
	return {
		restrict: 'E',
		scope:{
			data: '='
		},
		link: function(scope, el, attrs){
			scope.$watchCollection('data', function(newValue, oldValue){
				ReactDOM.render(
			        React.createElement(UserListContent, {data: newValue}),
			        el[0]
			    );
			})
		}
	}
});
