angular.module('admin_category', ['ngRoute']);

angular.module('admin_category').run(function($rootScope, $location, $routeParams, $http, $httpParamSerializer){ 
    $rootScope.admin_category_list_data = [];
    $rootScope.category_manager_form = {
		idCategory: '',
		idParent: '',
		name: '',
	};

	$rootScope.options = ($rootScope.options != undefined)? $rootScope.options :  [];//name - idCategory
	$rootScope.options.category_options = [];//name - idCategory
});

angular.module('admin_category').controller('AdminCreateCategoryController', ['$scope', '$rootScope', '$http', '$httpParamSerializer', function($scope, $rootScope, $http, $httpParamSerializer){
	$scope.pageChanged = function(newPage) {
        $rootScope.pagination_current_page = (newPage != undefined)? newPage : $rootScope.pagination_current_page;
        getCategorysListAdmin($rootScope.pagination_page_size, $rootScope.pagination_current_page);
    	
    };

	$rootScope.sendCategoryManagerForm = function(category_manager_form){
		$rootScope.category_manager_form.idParent = $rootScope.localStorageAdmin.id;
		
		var postUrl = config.pathApiServer + 'category/createCategory/';
		if( $rootScope.category_manager_form.idCategory > 0 ){
			postUrl = config.pathApiServer + 'category/updateCategory/';
		}
		
		$http.post(postUrl ,$rootScope.category_manager_form
   			).then(function(response){
	            if( response.data.success  ){
	            	alert(response.data.message);
	            	colseModal();
	            	getCategorysListAdmin();
	            }
	            else{
	            	alert(response.data.errors);
	            }
        	}
        );
	}
	$rootScope.removeCategory = function(idCategory){
    	$http.delete(config.pathApiServer + 'category/removeCategory/',
    			{
    				data: {idCategory: idCategory}
    				,headers: {"Content-Type": "application/json;charset=utf-8"}
    			}
    		).then(function(response){
	            if( response.data.success  ){
	            	$scope.pageChanged();
	            }
	            else{
	            	alert(response.data.errors);
	            }
        	}
        );
	}
	getCategorysListAdmin = function(page_size, current_page){
		var strSearchFormParams = $httpParamSerializer($rootScope.search_catalog_form);
    	$http.get (config.pathApiServer + 'category/getCategorysList/?page_size=' + page_size + "&" + '&page=' + current_page + "&" + strSearchFormParams).then(function(response){
            if( response.data.success  ){
            	var categoryData = response.data.data;
            	for(key in categoryData){
	                categoryData[key]['parentName'] = (categoryData[key]['idParent'] != undefined )? categoryData[key]['idParent']['name']: '';
	                categoryData[key]['parentId'] = (categoryData[key]['idParent'] != undefined )? categoryData[key]['idParent']['idCategory']: '';
	            }
            	$rootScope.admin_category_list_data = categoryData;
            	$rootScope.admin_pagination = response.data.pagination;
            }
            else{
            	alert(response.data.message);
            }
        });
	}
	createNewCategoryItem = function()
	{
		$rootScope.$apply(function () {            
			$rootScope.category_manager_form = {
				idCategory: '',
				idParent: '',
				name: '',
			};
		});
		openModal('show_category_form');
	}

	editCategoryItem = function(item)
	{
		item.category = (item.category != undefined)? item.category: [];

		$rootScope.$apply(function () {            
			$rootScope.category_manager_form = {
				idCategory: item.idCategory,
				idParent: item.category.idCategory,
				name: item.name,
				level: item.level,
				price: item.price,
			}
			$rootScope.localStorageAdmin.categoryParentSelected = { id: item.category.idCategory, name: item.category.name };
		});
		openModal('show_category_form');
	}

	removeCategoryItem = function(item){
		$rootScope.removeCategory(item.idCategory, $rootScope);
	}

	mapPostRequestToBody = function(data) {
	    var fd = new FormData();
	    angular.forEach(data, function(value, key) {
	        fd.append(key, value);
	    });
	    return fd;
	    
	}
	setCategorysOptions();
	$scope.pageChanged();
}]);


angular.module('admin_category').directive('adminCategoryManager', function(){
	return {
		templateUrl: 'admin_modules/catalog/admin_category_main.html'
	}
});

angular.module('admin_category').directive('adminCategoryList', function(){
	return {
		restrict: 'E',
		scope:{
			data: '='
		},
		link: function(scope, el, attrs){
			scope.$watchCollection('data', function(newValue, oldValue){
				ReactDOM.render(
			        React.createElement(AdminCategoryListTable, {data: newValue}),
			        el[0]
			    );
			})
		}
	}
});


