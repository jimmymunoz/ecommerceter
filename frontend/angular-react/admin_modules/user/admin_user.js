angular.module('admin_user', ['ngRoute']);

angular.module('admin_user').run(function($rootScope, $location, $routeParams, $http, $httpParamSerializer){ 
    $rootScope.admin_user_list_data = [];
    $rootScope.user_manager_form = {
		idUser: '',
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		phone: '',
		rol: '',
		rolSelected: {},
	};
	
});

angular.module('admin_user').controller('AdminCreateUserController', ['$scope', '$rootScope', '$http', '$httpParamSerializer', function($scope, $rootScope, $http, $httpParamSerializer){
	$scope.pageChanged = function(newPage) {
        $rootScope.pagination_current_page = (newPage != undefined)? newPage : $rootScope.pagination_current_page;
        getUsersListAdmin($rootScope.pagination_page_size, $rootScope.pagination_current_page);
    	
    };

	$rootScope.sendUserManagerForm = function(user_manager_form){
		$rootScope.user_manager_form.rol = $rootScope.user_manager_form.rolSelected.id;
			
		//$rootScope.user_manager_form.imageFile = $scope.myFile;
		var postUrl = config.pathApiServer + 'user/createUser/';
		if( $rootScope.user_manager_form.idUser > 0 ){
			postUrl = config.pathApiServer + 'user/updateUser/';
		}
		//$rootScope.user_manager_form.rolSelected = undefined;
		var fd = mapPostRequestToBody($rootScope.user_manager_form);//Encode Form Data
        //fd.append('file', $scope.myFile);
   		$http.post(postUrl ,$rootScope.user_manager_form
   			).then(function(response){
	            if( response.data.success  ){
	            	alert(response.data.message);
	            	colseModal();
	            	getUsersListAdmin();
	            }
	            else{
	            	alert(response.data.errors);
	            }
        	}
        );
	}
	$rootScope.removeUser = function(idUser){
    	$http.delete(config.pathApiServer + 'user/removeUser/',
    			{
    				data: {idUser: idUser}
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
	getUsersListAdmin = function(page_size, current_page){
		var strSearchFormParams = $httpParamSerializer($rootScope.search_user_form);
    	$http.get (config.pathApiServer + 'user/getUsersList/?page_size=' + page_size + "&" + '&page=' + current_page + "&" + strSearchFormParams).then(function(response){
            if( response.data.success  ){
            	$rootScope.admin_user_list_data = response.data.data;
            	$rootScope.admin_pagination = response.data.pagination;
            }
            else{
            	alert(response.data.message);
            }
        });
	}
	createNewUserItem = function()
	{
		$rootScope.$apply(function () {            
			$rootScope.user_manager_form = {
				idUser: '',
				firstName: '',
				lastName: '',
				email: '',
				password: '',
				phone: '',
				rol: '',
				rolSelected: {},
			};
		});
		openModal('show_user_form');
	}

	editUserItem = function(item)
	{
		$rootScope.$apply(function () {            
			$rootScope.user_manager_form = {
				idUser: item.idUser,
				firstName: item.firstName,
				lastName: item.lastName,
				email: item.email,
				password: item.password,
				phone: item.phone,
				rol: item.rol,
				rolSelected: { id: item.rol, name: item.rol },
			};
		});
		openModal('show_user_form');
	}

	removeUserItem = function(item){
		$rootScope.removeUser(item.idUser, $rootScope);
	}

	mapPostRequestToBody = function(data) {
	    var fd = new FormData();
	    angular.forEach(data, function(value, key) {
	        fd.append(key, value);
	    });
	    return fd;
	    
	}
	$scope.pageChanged();
}]);

angular.module('admin_user').directive('adminUserManager', function(){
	return {
		templateUrl: 'admin_modules/user/admin_user_main.html'
	}
});

angular.module('admin_user').directive('fileModel', ['$parse', function ($parse) {
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

angular.module('admin_user').directive('adminUserList', function(){
	return {
		restrict: 'E',
		scope:{
			data: '='
		},
		link: function(scope, el, attrs){
			scope.$watchCollection('data', function(newValue, oldValue){
				ReactDOM.render(
			        React.createElement(AdminUserListTable, {data: newValue}),
			        el[0]
			    );
			})
		}
	}
});


