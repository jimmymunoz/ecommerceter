//var angular = require('vendor/angular');
/*

 */
angular.module('app', [
	'angularUtils.directives.dirPagination',
	//'offer',
	'catalog',
	'shopping_cart',
	'payment',
	'order',
	'account',
	'admin_product',
	'admin_category',
	'admin_user',
	'admin_order',
	'admin_privilege',
]);

angular.module('admin_product').run(function($rootScope){ 
	//Pagination - Default config
	$rootScope.options = ($rootScope.options != undefined)? $rootScope.options :  [];//name - idCategory
	
	$rootScope.options.pagination_page_size_options = [
		{ name: 10, id: 10 }
		,{ name: 20, id: 20 }
		,{ name: 30, id: 30 }
		,{ name: 50, id: 50 }
	];

	$rootScope.options.rol_options = [
		{ name: 'client', id: 'client' }
		,{ name: 'administrator', id: 'administrator' }
	];
	$rootScope.options.status_options = [
		{ name: 'unpaid', id: 'unpaid' }
		,{ name: 'paid', id: 'paid' }
		,{ name: 'delivered', id: 'delivered' }
	];

	$rootScope.pagination_page_size = 10;
	$rootScope.pagination_current_page = 1;
    $rootScope.admin_pagination = {
		total_results: 0 
		,pagesize: $rootScope.pagination_page_size 
		,current_page: $rootScope.pagination_current_page 
		,total_pages: 1 
		,last_page: 1 
		,firts_page: 1 
		,data: []
	}
	$rootScope.pagination = {
        current: 1
    };
});

/*

angular.module('app').directive('pagination', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]); // $scope.myFile.
                });
            });
        }
    };
}]);
 */

angular.module('app').config( 
	['$routeProvider', '$locationProvider', '$httpProvider', 
		function ($routeProvider, $locationProvider, $httpProvider){
			$httpProvider.defaults.useXDomain = true;
			delete $httpProvider.defaults.headers.common['X-Requested-With'];

		    $routeProvider
		        .when('/categories', {
		            template: '<admin-category-manager></admin-category-manager>'//Directive -> React module
		        })
		         .when('/orders', {
		            template: '<admin-order-manager></admin-order-manager>'//Directive -> React module
		        })
		        .when('/users', {
		            template: '<admin-user-manager></admin-user-manager>'//Directive -> React module
		        })
		        .when('/privileges', {
		            template: '<admin-privilege-manager></admin-privilege-manager>'//Directive -> React module
		        })
		        .when('/products', {
		            template: '<admin-product-manager></admin-product-manager>'//Directive -> React module
		        })
		        .when('/', {//otherwhise
		            //template: '<catalog-container></catalog-container>'//Directive -> React module
		            templateUrl: 'modules/main/main.html'//Template or templateUrl
		        });
		}
	]
);

angular.module('app').config(function(paginationTemplateProvider) {
   // paginationTemplateProvider.setString('<div class="my-page-links">aaaa...</div>');

    // or with e.g. Webpack you might do
    paginationTemplateProvider.setPath('admin_modules/main/pagination.tpl.html');
});