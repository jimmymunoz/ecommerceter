
function editProductItem(item){
	console.log("editProductItem");
	var $body = angular.element(document.body);
	var $rootScope = $body.scope().$root;      
	$rootScope.$apply(function () {            
		$rootScope.product_manager_form = {
			name: item.name,
			description: item.description,
			price: item.price,
			tax: item.tax,
			buyPrice: item.buyPrice,
			quantity: item.quantity,
			weight: item.weight,
			category: item.category,
			image: item.image,
		}
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
		name: '',
		description: '',
		price: '',
		tax: '',
		buyPrice: '',
		quantity: '',
		weight: '',
		category: '',
		image: '',
	};
});

angular.module('admin_product').controller('AdminCreateProductController', ['$rootScope', '$http', '$httpParamSerializer', function($rootScope, $http, $httpParamSerializer){
	$rootScope.sendProductManagerForm = function(product_manager_form){
   		//product_manager_form = mapPostRequestToBody(product_manager_form);  // this sends your data to the formDataObject provider that we are defining below.
   		console.log(product_manager_form);
   
   		//console.log($rootScope.product_manager_form);
   		/*
   		
   		$http.post(config.pathApiServer + 'product/createProduct/'
   				,$rootScope.product_manager_form
   				//, JSON.stringify(product_manager_form)
   				//,product_manager_form
	    		//,{'name': 'asaasas', 'key': 'some text'}
	    		//{ headers: {'Content-Type': undefined, 'Access-Control-Allow-Origin': '*'} }
	    		/*
	    		
	    		,{ 
	    			//headers: { 'Content-Type': undefined},
	    			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	    			//headers: {'Content-Type': 'multipart/form-data'}
	    			//enctype="multipart/form-data"
	    		}
    		).then(function(response){
	            console.log(response.data);
	            if( response.data.success  ){
	            	$rootScope.admin_product_list_data = response.data.data;
	            }
	            else{
	            	alert(response.data.errors);
	            }
        	}
        );
   		 */
		$http({
			method: 'POST',
			url: config.pathApiServer + 'product/createProduct/',
			data: $rootScope.product_manager_form // your original form data,
			/*
			
			,transformRequest: function(data) {
				console.log("TEST");
		        var fd = new FormData();
		        angular.forEach(data, function(value, key) {
		            fd.append(key, value);
		        });
		        return fd;
		    }  // this sends your data to the formDataObject provider that we are defining below.
			 */
			,headers: {
				'Access-Control-Allow-Origin': '*'
				,'Access-Control-Allow-Headers': 'X-Requested-With' 
				,'Connection': 'keep-alive' 
				//,'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT'
				,'Host': undefined
				,'Origin': undefined
				//,'Content-Type': undefined
				,'Content-Type': 'application/json; charset=utf-8'
				//,'Content-Type': 'multipart/form-data'
				
				//,'X-Requested-With': 'XMLHttpRequest'
			}
		}).
		success(function(data, status, headers, config){
			console.log(data);
		}).
		error(function(data, status, headers, config){
			console.log(data);
		});
	}
	$rootScope.getCategorysList = function($event){
		var categoryFilters = "";
		$http.get (config.pathApiServer + 'category/getCategorysList/?' + categoryFilters).then(function(response){
            if( response.data.success  ){
            	$rootScope.search_admin_product_form.category_options = [];
            	console.log(response.data.data);
            	for (key in response.data.data){
            		$rootScope.search_admin_product_form.category_options.push({
            			name: response.data.data[key]['name'],
            			value: response.data.data[key]['idCategory'],
            		});
            	}
            	console.log($rootScope.search_admin_product_form.category_options);
            }
            else{
            	alert(response.data.message);
            }
        });
	}
	$rootScope.removeProduct = function(idProduct){
            	var tmp_old_item = $rootScope.admin_product_list_data;
            	for (var key in $rootScope.admin_product_list_data ){
            		if( $rootScope.admin_product_list_data[key]['idProduct'] != idProduct ){
            			console.log($rootScope.admin_product_list_data[key]);
            			//delete $rootScope.admin_product_list_data[key]['idProduct'];
            		}
            		tmp_old_item = $rootScope.admin_product_list_data[key];
            	}
            	$rootScope.admin_product_list_data = tmp_old_item;
            	return;
		$http.delete(config.pathApiServer + 'category/removeProduct/?idProduct=' + idProduct).then(function(response){
            if( response.data.success  ){
            	console.log(response.data.data);
            }
            else{
            	alert(response.data.message);
            }
        });
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
	//$rootScope.getCategorysList();
	$rootScope.getProductsList();
}]);

angular.module('admin_product').directive('adminProductManager', function(){
	return {
		templateUrl: 'admin_modules/catalog/admin_product_main.html'
	}
});

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
			        //React.createElement(ProductListContent, {data: newValue}),
			        el[0]
			    );
			})
		}
	}
});
