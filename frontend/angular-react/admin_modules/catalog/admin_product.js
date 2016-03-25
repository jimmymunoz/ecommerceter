
function editProductItem(item){
	console.log("editProductItem");
	var $body = angular.element(document.body);
	var $rootScope = $body.scope().$root;      
	$rootScope.$apply(function () {            
		$rootScope.product_manager_form = {
			idProduct: item.idProduct,
			name: item.name,
			description: item.description,
			price: item.price,
			tax: item.tax,
			buyPrice: item.buyPrice,
			quantity: item.quantity,
			weight: item.weight,
			category: item.category.idCategory,
			image: item.image,
			product_manager_form: item.image,
			categorySelected: { id: item.category.idCategory, name: item.category.name },
		}
		console.log($rootScope.product_manager_form);
	});
}

function removeProductItem(item){
	var $body = angular.element(document.body);
	var $rootScope = $body.scope().$root;      
	$rootScope.removeProduct(item.idProduct);
}

angular.module('admin_product', ['ngRoute']);


angular.module('admin_product')
    .config(function ($httpProvider) {
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    });

angular.module('admin_product').config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        delete $httpProvider.defaults.headers.common['Host'];
    }
]);

function mapPostRequestToBody(data) {
    //return {'key': value, 'key': 'some text'};
    
    var fd = new FormData();
    angular.forEach(data, function(value, key) {
        fd.append(key, value);
    });
    return fd;
    
 }

angular.module('admin_product').run(function($rootScope, $location, $routeParams, $http, $httpParamSerializer){ 
    $rootScope.admin_product_list_data = [];
    $rootScope.product_manager_form = {
		idProduct: '',
		name: '',
		description: '',
		price: '',
		tax: '',
		buyPrice: '',
		quantity: '',
		weight: '',
		category: '',
		image: '',
		categorySelected: {},
	};
	$rootScope.options =  [];//name - idCategory
	$rootScope.options.category_options = [];//name - idCategory
});

angular.module('admin_product').controller('AdminCreateProductController', ['$rootScope', '$http', '$httpParamSerializer', function($rootScope, $http, $httpParamSerializer){
	$rootScope.sendProductManagerForm = function(product_manager_form){
		$rootScope.product_manager_form.category = $rootScope.product_manager_form.categorySelected.id;
		console.log($rootScope.product_manager_form);
		var postUrl = config.pathApiServer + 'product/createProduct/';
		if( $rootScope.product_manager_form.idProduct > 0 ){
			postUrl = config.pathApiServer + 'product/updateProduct/';
		}
   		$http.post(postUrl ,$rootScope.product_manager_form
   			).then(function(response){
	            console.log(response.data);
	            if( response.data.success  ){
	            	$rootScope.product_manager_form = {
						idProduct: '',
						name: '',
						description: '',
						price: '',
						tax: '',
						buyPrice: '',
						quantity: '',
						weight: '',
						category: '',
						image: '',
						categorySelected: {},
					};
	            	$rootScope.getProductsList();
	            	//$rootScope.admin_product_list_data = response.data.data;
	            }
	            else{
	            	alert(response.data.errors);
	            }
        	}
        );
	}
	$rootScope.getCategorysList = function($event){
		var categoryFilters = "";
		$http.get (config.pathApiServer + 'category/getCategorysList/?' + categoryFilters).then(function(response){
            if( response.data.success  ){
            	$rootScope.options.category_options = [];
            	for (key in response.data.data){
            		$rootScope.options.category_options.push({
            			name: response.data.data[key]['name'],
            			id: response.data.data[key]['idCategory'],
            		});
            	}
            	console.log($rootScope.options.category_options);
            }
        });
	}
	$rootScope.removeProduct = function(idProduct){
    	$http.delete(config.pathApiServer + 'product/removeProduct/' 
    			,{
    				data: {idProduct: idProduct}
    				,headers: {"Content-Type": "application/json;charset=utf-8"}
    			}
    		).then(function(response){
	            if( response.data.success  ){
	            	$rootScope.getProductsList();
	            	alert(response.data.message);
	            }
	            else{
	            	alert(response.data.errors);
	            }
        	}
        );
	}
	$rootScope.getProductsList = function($event){
    	var strSearchFormParams = $httpParamSerializer($rootScope.search_catalog_form);
    	$http.get (config.pathApiServer + 'product/getProductsList/?' + strSearchFormParams).then(function(response){
            if( response.data.success  ){
            	$rootScope.admin_product_list_data = response.data.data;
            }
            else{
            	alert(response.data.message);
            }
        });
	}
	$rootScope.getCategorysList();
	$rootScope.getProductsList();
}]);

angular.module('admin_product').directive('adminProductManager', function(){
	return {
		templateUrl: 'admin_modules/catalog/admin_product_main.html'
	}
});

angular.module('admin_product').directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

angular.module('admin_product').directive('adminProductList', function(){
	return {
		restrict: 'E',
		scope:{
			data: '='
		},
		link: function(scope, el, attrs){
			console.log("directive adminProductList");
			scope.$watchCollection('data', function(newValue, oldValue){
				console.log("inside directive adminProductList");
				ReactDOM.render(
			        React.createElement(AdminProductListTable, {data: newValue}),
			        el[0]
			    );
			})
		}
	}
});
