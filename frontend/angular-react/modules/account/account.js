function logOut (){
	removeSessionUserData();//Front-end -> Core
	var $body = angular.element(document.body);
	var $rootScope = $body.scope().$root;      
	$rootScope.$apply(function () {            
		$rootScope.user_session_data = getUserSessionData();
		$rootScope.shopping_cart_data = getToSessionShoppingCart();
	});
}

angular.module('account', ['ngRoute']);

angular.module('account').run(function($rootScope, $location, $routeParams, $http, $httpParamSerializer){ 
   	
    $rootScope.authentication_login = {
    	email : '',
    	password : '',
    }
    $rootScope.authentication_singup = {
    	firstName : '',
    	lastName : '',
    	email : '',
    	password : '',
    } 
});

angular.module('account').controller('AccountController', ['$rootScope', '$http', function($rootScope, $http){
	updateAngularSesionData = function(){
		$rootScope.user_session_data = getUserSessionData();//Front-end -> Core
	}
	
	$rootScope.authenticationSingupForm = function(){
		var postUrl = config.pathApiServer + 'authentication/singup/';
		$http.post(postUrl ,$rootScope.authentication_singup
   			).then(function(response){
   				notifyServerResponse(response, false);
	            if( response.data.success  ){
	            	saveSessionUserData(response.data);//Save Session Data 
	            	updateAngularSesionData();//updates session Data
	            	//alert(response.data.message);
	            	colseModal();
	            }
	            else{
	            	//alert(response.data.errors);
	            }
        	}
        );
	}

	$rootScope.authenticationLoginForm = function(){
		var postUrl = config.pathApiServer + 'authentication/login/';
		$http.post(postUrl ,$rootScope.authentication_login
   			).then(function(response){
	            notifyServerResponse(response);
	            if( response.data.success  ){
	            	saveSessionUserData(response.data);//Save Session Data 
	            	updateAngularSesionData();//updates session Data
	            	//alert(response.data.message);
	            	colseModal();
	            }
	            else{
	            	//alert(response.data.errors);
	            }
        	}
        );
	}
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
