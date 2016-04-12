angular.module('admin_order', ['ngRoute']);

angular.module('admin_order').run(function($rootScope, $location, $routeParams, $http, $httpParamSerializer){ 
    $rootScope.admin_order_list_data = [];
    $rootScope.order_manager_form = {
		idOrder: '',
		address: '',
		creationDate: '',
		total: '',
		city: '',
		totalTax: '',
		approvalCode: '',
		modificationDate: '',
		orderLines: [],
		statusSelected: {},
	};
	$rootScope.options = ($rootScope.options != undefined)? $rootScope.options :  [];//name - idCategory
	$rootScope.options.category_options = [];//name - idCategory
});

angular.module('admin_order').controller('AdminCreateOrderController', ['$scope', '$rootScope', '$http', '$httpParamSerializer', function($scope, $rootScope, $http, $httpParamSerializer){
	$scope.pageChanged = function(newPage) {
        $rootScope.pagination_current_page = (newPage != undefined)? newPage : $rootScope.pagination_current_page;
        getOrdersListAdmin($rootScope.pagination_page_size, $rootScope.pagination_current_page);
   	};

	$rootScope.sendOrderManagerForm = function(order_manager_form){
	    console.log("sendOrderManagerForm");
		$rootScope.order_manager_form.category = $rootScope.order_manager_form.statusSelected.id;
		
		var postUrl = config.pathApiServer + 'order/createOrder/';
		if( $rootScope.order_manager_form.idOrder > 0 ){
			postUrl = config.pathApiServer + 'order/updateOrder/';
		}
		
		$http.post(postUrl ,$rootScope.order_manager_form
   			).then(function(response){
	            console.log(response.data);
	            if( response.data.success  ){
	            	alert(response.data.message);
	            	colseModal();
	            	getOrdersListAdmin();
	            }
	            else{
	            	alert(response.data.errors);
	            }
        	}
        );
	}
	$rootScope.removeOrder = function(idOrder){
    	$http.delete(config.pathApiServer + 'order/removeOrder/',
    			{
    				data: {idOrder: idOrder}
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
	getOrdersListAdmin = function(page_size, current_page){
		var strSearchFormParams = $httpParamSerializer($rootScope.search_order_form);
    	$http.get (config.pathApiServer + 'order/getAdminOrders/?page_size=' + page_size + "&" + '&page=' + current_page + "&" + strSearchFormParams).then(function(response){
            if( response.data.success  ){
            	$rootScope.admin_order_list_data = response.data.data;
            	$rootScope.admin_pagination = response.data.pagination;
            }
            else{
            	alert(response.data.message);
            }
        });
	}
	createNewOrderItem = function()
	{
		$rootScope.$apply(function () {            
			$rootScope.order_manager_form = {
				idOrder: '',
				address: '',
				total: '',
				city: '',
				totalTax: '',
				approvalCode: '',
				orderLines: [],
				statusSelected: {},
			};
		});
		openModal('show_order_form');
	}

	editOrderItem = function(item)
	{
		$rootScope.$apply(function () {            
			$rootScope.order_manager_form = {
				idOrder: item.idOrder,
				address: item.address,
				total: item.total,
				city: item.city,
				totalTax: item.totalTax,
				buyPrice: item.buyPrice,
				approvalCode: item.approvalCode,
				orderLines: item.orderLines,
				statusSelected: { id: item.status, name: item.status },
			}
		});
		openModal('show_order_form');
	}

	removeOrderItem = function(item){
		$rootScope.removeOrder(item.idOrder, $rootScope);
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

angular.module('admin_order').directive('adminOrderManager', function(){
	return {
		templateUrl: 'admin_modules/order/admin_order_main.html'
	}
});

angular.module('admin_order').directive('adminOrderList', function(){
	return {
		restrict: 'E',
		scope:{
			data: '='
		},
		link: function(scope, el, attrs){
			scope.$watchCollection('data', function(newValue, oldValue){
				ReactDOM.render(
			        React.createElement(AdminOrderListTable, {data: newValue}),
			        el[0]
			    );
			})
		}
	}
});


