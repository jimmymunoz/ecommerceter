//var angular = require('vendor/angular');
/*

 */
angular.module('app', [
	'catalog',
	'shopping_cart',
	'admin_product',
]);

angular.module('app').config( 
	['$routeProvider', 
		function ($routeProvider){
		    $routeProvider
		        .when('/', {//otherwhise
		            //controller: 'ControllerHome',
		            templateUrl: 'modules/main/main.html'//Template or templateUrl
		        });
		}
	]
);