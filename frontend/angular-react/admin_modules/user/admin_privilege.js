angular.module('admin_privilege', ['ngRoute']);

angular.module('admin_privilege').run(function($rootScope, $location, $routeParams, $http, $httpParamSerializer){ 
    $rootScope.admin_privilege_list_data = [];
    $rootScope.privilege_manager_form = {
		idPrivilege: '',
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
	$rootScope.options = ($rootScope.options != undefined)? $rootScope.options :  [];//name - idCategory
	$rootScope.options.category_options = [];//name - idCategory
});

angular.module('admin_privilege').controller('AdminCreatePrivilegeController', ['$scope', '$rootScope', '$http', '$httpParamSerializer', function($scope, $rootScope, $http, $httpParamSerializer){
	$scope.pageChanged = function(newPage) {
        $rootScope.pagination_current_page = (newPage != undefined)? newPage : $rootScope.pagination_current_page;
        getPrivilegesListAdmin($rootScope.pagination_page_size, $rootScope.pagination_current_page);
    	
    };

	$rootScope.sendPrivilegeManagerForm = function(privilege_manager_form){
		$rootScope.privilege_manager_form.category = $rootScope.privilege_manager_form.categorySelected.id;
			
		//$rootScope.privilege_manager_form.imageFile = $scope.myFile;
		var postUrl = config.pathApiServer + 'privilege/createPrivilege/';
		if( $rootScope.privilege_manager_form.idPrivilege > 0 ){
			postUrl = config.pathApiServer + 'privilege/updatePrivilege/';
		}
		//$rootScope.privilege_manager_form.categorySelected = undefined;
		var fd = mapPostRequestToBody($rootScope.privilege_manager_form);//Encode Form Data
        //fd.append('file', $scope.myFile);
   		$http.post(postUrl ,$rootScope.privilege_manager_form
   			).then(function(response){
	            console.log(response.data);
	            if( response.data.success  ){
	            	alert(response.data.message);
	            	colseModal();
	            	getPrivilegesListAdmin();
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
	$rootScope.removePrivilege = function(idPrivilege){
    	$http.delete(config.pathApiServer + 'privilege/removePrivilege/',
    			{
    				data: {idPrivilege: idPrivilege}
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
	getPrivilegesListAdmin = function(page_size, current_page){
		var strSearchFormParams = $httpParamSerializer($rootScope.search_privilege_form);
    	$http.get (config.pathApiServer + 'privilege/getPrivilegesList/?page_size=' + page_size + "&" + '&page=' + current_page + "&" + strSearchFormParams).then(function(response){
            if( response.data.success  ){
            	$rootScope.admin_privilege_list_data = response.data.data;
            	$rootScope.admin_pagination = response.data.pagination;
            }
            else{
            	alert(response.data.message);
            }
        });
	}
	createNewPrivilegeItem = function()
	{
		$rootScope.$apply(function () {            
			$rootScope.privilege_manager_form = {
				idPrivilege: '',
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
		});
		openModal('show_privilege_form');
	}

	editPrivilegeItem = function(item)
	{
		$rootScope.$apply(function () {            
			$rootScope.privilege_manager_form = {
				idPrivilege: item.idPrivilege,
				name: item.name,
				description: item.description,
				price: item.price,
				tax: item.tax,
				buyPrice: item.buyPrice,
				quantity: item.quantity,
				weight: item.weight,
				category: item.category.idCategory,
				image: item.image,
				privilege_manager_form: item.image,
				categorySelected: { id: item.category.idCategory, name: item.category.name },
			}
			console.log($rootScope.privilege_manager_form);
		});
		openModal('show_privilege_form');
	}

	removePrivilegeItem = function(item){
		$rootScope.removePrivilege(item.idPrivilege, $rootScope);
	}

	mapPostRequestToBody = function(data) {
	    var fd = new FormData();
	    angular.forEach(data, function(value, key) {
	        fd.append(key, value);
	    });
	    return fd;
	    
	}
	$rootScope.getCategorysList();
	$scope.pageChanged();
}]);

angular.module('admin_privilege').directive('adminPrivilegeManager', function(){
	return {
		templateUrl: 'admin_modules/user/admin_privilege_main.html'
	}
});

angular.module('admin_privilege').directive('fileModel', ['$parse', function ($parse) {
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

angular.module('admin_privilege').directive('adminPrivilegeList', function(){
	return {
		restrict: 'E',
		scope:{
			data: '='
		},
		link: function(scope, el, attrs){
			console.log("directive adminPrivilegeList");
			scope.$watchCollection('data', function(newValue, oldValue){
				ReactDOM.render(
			        React.createElement(AdminPrivilegeListTable, {data: newValue}),
			        el[0]
			    );
			})
		}
	}
});


