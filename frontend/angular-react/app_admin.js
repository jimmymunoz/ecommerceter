//var angular = require('vendor/angular');
/*

 */
angular.module('app', [
	'angularUtils.directives.dirPagination',
	'ngScrollTo',
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

angular.module('app').run(function($rootScope, $http, $httpParamSerializer){ 
	$rootScope.user_session_data = getUserSessionData();
    
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
	$rootScope.options.month_options = [
		{ name: 'January', id: '1' }
		,{name:'February',  id: '2' }
		,{name:'March',  id: '3' }
		,{name:'April',  id: '4' }
		,{name:'May',  id: '5' }
		,{name:'June',  id: '6' }
		,{name:'July',  id: '7' }
		,{name:'Augoust',  id: '8' }
		,{name:'September',  id: '9' }
		,{name:'October',  id: '10' }
		,{name:'November',  id: '11' }
		,{name:'December',  id: '12' }
	];
	$rootScope.options.cc_year = [];//year
	for (var i = 2016; i < 2016 + 10; i++) {
		$rootScope.options.cc_year.push( { name: i, id: i } );
	};

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
	$rootScope.client_pagination = {
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
    $rootScope.localstorage = {
		categorySelected: {},
		paymentMonthSelected: {},
		paymentYearSelected: {},
	};
	$rootScope.localStorageAdmin = {
		categoryParentSelected: {},
	};
	$rootScope.category_menu_tree = {};
	//options
	setCategorysOptions = function($event){
		var categoryFilters = "";
		if(false){
			
			$http.get (config.pathApiServer + 'category/getCategorysList/?' + categoryFilters).then(function(response){
	            if( response.data.success  ){
	            	$rootScope.options.category_options = [];
	            	for (key in response.data.data){
	            		$rootScope.options.category_options.push({
	            			name: response.data.data[key]['name'],
	            			id: response.data.data[key]['idCategory'],
	            		});
	            	}
	            }
	        });
		}
	}
	setCategoryMenuTree = function($event){
		var categoryFilters = "";
		$http.get (config.pathApiServer + 'category/getCategorysParentWithChilds/?' + categoryFilters).then(function(response){
            if( response.data.success  ){
            	$rootScope.category_menu_tree = response.data.data;
            }
        });
	}
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
			$httpProvider.defaults.headers.common['token'] = getUserToken();

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
		            //template: ''//Directive -> React module
		            template: '<admin-product-manager></admin-product-manager>'//Directive -> React module
		            //template: ''//Directive -> React module
		            //templateUrl: 'modules/main/main.html'//Template or templateUrl
		        });
		}
	]
);

/*

angular.module('app').config( 
	['ngScrollTo', 
		function(ngScrollToOptionsProvider) {

		    ngScrollToOptionsProvider.extend({
		        handler: function(el) {
		            //$(el).scrollintoview();
		        }
		    });
		}
	]
);
 */

angular.module('app').config(function(paginationTemplateProvider) {
   // paginationTemplateProvider.setString('<div class="my-page-links">aaaa...</div>');

    // or with e.g. Webpack you might do
    paginationTemplateProvider.setPath('admin_modules/main/pagination.tpl.html');
});