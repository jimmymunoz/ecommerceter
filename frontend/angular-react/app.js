//var angular = require('vendor/angular');
/*

 */
angular.module('app', [
	'catalog',
	'shopping_cart',
	'admin_product',
]);

angular.module('app').config( 
	['$routeProvider', '$locationProvider', '$httpProvider', 
		function ($routeProvider, $locationProvider, $httpProvider){
			$httpProvider.defaults.useXDomain = true;
			delete $httpProvider.defaults.headers.common['X-Requested-With'];

		    $routeProvider
		        .when('/', {//otherwhise
		            //controller: 'ControllerHome',
		            //templateUrl: 'modules/main/main.html'//Template or templateUrl
		            templateUrl: 'modules/main/admin_main.html'//Template or templateUrl
		        });
		}
	]
);