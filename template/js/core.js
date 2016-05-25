/**
 * [onReadyFunctions Methodes to call on ready document]
 * @return {[type]} [description]
 */
function onReadyFunctions(){
	//$container = $("#container").notify();
	$container = $("#container-bottom").notify();
	/* show about more  ======================================= */
	$("#show-btn").click(function() {
		$('#showme').slideDown("slow");
		$(this).hide();
		return false;
	});

	/* Bootstrap Affix ======================================= */		
	$('#modal-bar').affix({
		offset: {
			top: 10,
		}
	});

	/* Smooth Hash Link Scroll ======================================= */	
	$('.smooth-scroll').click(function() {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				// console.log(offset());
				$('html,body').animate({
						scrollTop: target.offset().top - 60
				}, 1000);
				return false;
			}
		}
	});
	
	$('#project-modal').on('hidden.bs.modal', function() {
		$(this).find('.loader').show();
		$(this).find('.screen').removeClass('slides').removeClass('done').html('').superslides('destroy');
	});

	$('#project-modal').on( 'click', '#btn-order',function () {
		$('#project-modal').modal('hide');
		$(this).find('.loader').show();
		$(this).find('.screen').removeClass('slides').removeClass('done').html('').superslides('destroy');
		var aTag = $("section[id='orderform']");
		$('html,body').animate({scrollTop: aTag.offset().top},'slow');
	});

	/* style switch	==============================================*/
	$('#style-switcher h2 a').click(function(){
		$('#style-switcher').toggleClass('open');
		return false;
	});

	$('#style-switcher li').click(function(e){
		e.preventDefault();
		var m = $(this);
		var newlocation = window.location.href.toString().split(window.location.host)[1];
		//alert(newlocation)
		newlocation = "";
		switch( $(this).attr('id') ){
			case 'framework_backbone':
				newlocation = "../backbone" + newlocation;
				break;
			case 'framework_ember':
				newlocation = "../ember" + newlocation;
				break;
			case 'framework_angular_react':
			default:
				newlocation = "../angular-react" + newlocation;
				break;
		}
		$('#img_style_switcher').attr('class', $(this).attr('class'));
		$('#style-switcher').removeClass('open');
		document.location.href = newlocation;
		return false; 
	});

	
	$('.nav-tabs > li > a').click( function() {
	    $('.nav-tabs > li.active').removeClass('active');
	    $(this).parent().addClass('active');
	} )

	$('a[class="close"]').attr("href", "javascript:void(0)");
	$('a[class="close"]').on('click', function(){
		colseModal();
	});
	/*price range*/
	/*
	
	var timers = {};
    function delayShowData(type, values) {
      clearTimeout(timers[type]);
      timers[type] = setTimeout(function() {
      	console.log("Refresh price: " + values[0] + '  - ' + values[1] + ' ');
        //$('span.' + type).text(values[0] + 'mm - ' + values[1] + 'mm');
       // showData(type, values, 'range');
      }, 300);
    }

	$('#sl2').slider({});//price range
	$("#sl2").on("slide", function(slideEvt) {

		delayShowData('depth', slideEvt.value);
		//console.log("Slider: " + slideEvt.value);
		//$rootScope.search_catalog_form.minPrice = slideEvt.value[0];
		//console.log($rootScope.search_catalog_form.minPrice);
		//$rootScope.search_catalog_form.maxPrice = slideEvt.value[1];
	});
	 */
	/*
	$(function () {
		
		$.scrollUp({
	        scrollName: 'scrollUp', // Element ID
	        scrollDistance: 300, // Distance from top/bottom before showing element (px)
	        scrollFrom: 'top', // 'top' or 'bottom'
	        scrollSpeed: 300, // Speed back to top (ms)
	        easingType: 'linear', // Scroll to top easing (see http://easings.net/)
	        animation: 'fade', // Fade, slide, none
	        animationSpeed: 200, // Animation in speed (ms)
	        scrollTrigger: false, // Set a custom triggering element. Can be an HTML string or jQuery object
					//scrollTarget: false, // Set a custom target element for scrolling to the top
	        scrollText: '<i class="fa fa-angle-up"></i>', // Text for element, can contain HTML
	        scrollTitle: false, // Set a custom <a> title if required.
	        scrollImg: false, // Set true to use image
	        activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
	        zIndex: 2147483647 // Z-Index for the overlay
		});
	});
	*/
}



function create( template, vars, opts ){
	return $container.notify("create", template, vars, opts);
}

function notifyProductAdded(text, titre){
	titre = ( titre == undefined)? "Product Added": titre;//Jimmy Default ok
	text = ( text == undefined)? "": text;//Jimmy Default ok
	create("default", { title: titre, text: text});
}

function validateCurrentLogin(){
	var result = false;
	var token = getUserToken();
	if( typeof token == "string" && token.length > 30 ){
		result = true;
	}
	else{
    	loginRequired();
    	openModal('showLoginSingUp');//angular - React
	}
	return result;
}

function loginRequired(){
	notifyError("You can log in using your existing account or you can create a new account", "Login Required");
	openModal('showLoginSingUp');
}

function notifyError(text, titre){
	var icon = "alert.png";
	titre = ( titre == undefined)? "Error": titre;//Jimmy Default ok
	text = ( text == undefined)? "": text;//Jimmy Default ok
	create("withIcon", { title: titre, text: text + ' <a href="#" class="ui-notify-close">Close me.</a>', icon: icon },{ expires:false, queue: 2 });
}

function notifyServerResponse(response, expires, titre){
	expires = ( expires == undefined)? true: expires;
	var icon = "success.png";//Jimmy Default ok
	titre = ( titre == undefined)? "": titre;//Jimmy Default ok
	var text = "Success";
	if(response.data != undefined ){
		text = (response.data.message != undefined )? response.data.message: '';
		if( response.data.success  ){

		}
		else{
			titre = "Warning";//Jimmy Default ok
			icon = "alert.png";//Jimmy Default ok
			//Jimmy-> Errors 
			if( (response.data.errors != undefined ) ){
				var errors = (response.data.errors != undefined )?response.data.errors : [];
				text =  "Errors: <br/>";
				for(var key in response.data.errors){
					text += "\n<br/>" + response.data.errors[key] + "";
				}
				text += "<br/>\n"
			}

		}
		if(expires){
			create("withIcon", { title: titre, text: text + ' <a href="#" class="ui-notify-close">Close me.</a>', icon: icon },{ queue: 2 });//Jimmy: Max 3 Messages
		}
		else{
			create("withIcon", { title: titre, text: text + ' <a href="#" class="ui-notify-close">Close me.</a>', icon: icon },{ expires:false, queue: 2 });//Jimmy: Max 3 Messages
		}
	}
	/*
	
	create("default", { title:'Default Notification', text:'Example of a default notification.  I will fade out after 5 seconds'});
	create("withIcon", { title:'Warning!', text:'OMG the quick brown fox jumped over the lazy dog.  You\'ve been warned. <a href="#" class="ui-notify-close">Close me.</a>', icon:'alert.png' },{ 
			expires:true
		});
	create("withIcon", { title:'OK', text:'OMG the quick brown fox jumped over the lazy dog.  You\'ve been warned. <a href="#" class="ui-notify-close">Close me.</a>', icon:'success.png' },{ queue: 3 });
	 */

}

var RGBChange = function() {
  $('#RGB').css('background', 'rgb('+r.getValue()+','+g.getValue()+','+b.getValue()+')')
};	
// Angular --> toogle categoryPanelCollapse('womens');
function categoryPanelCollapse(obj){
  	var categoryContentId = $(obj).attr('category-parent-container')
  
  	if( $("#" + categoryContentId).hasClass('in') ){

  		$("#" + categoryContentId).removeClass('in');
	  	$("#" + categoryContentId).addClass('collapse');
  		$("#" + categoryContentId).css('height', '0px;');
  	}
  	else{
  		$("#" + categoryContentId).removeClass('collapse');
	  	$("#" + categoryContentId).addClass('in');
  		$("#" + categoryContentId).css('height', 'auto');
  	}


}



function setCategorySearchForm(obj){
  	var categoryId = $(obj).attr('category-id')
  	var level = $(obj).attr('level')
  	$("#catalog_search_form_category").attr('value', categoryId);
  	$("#catalog_search_form_level").attr('value', level);
}

function openModal(div){
  	$("#" + div).css('opacity', 1);
  	$("#" + div).css('pointer-events', 'auto');	
}
function colseModal(){
  	$("[class^=modalDialog]").css('opacity', 0);
  	$("[class^=modalDialog]").css('pointer-events', 'none');
}

/*SESSION*/
//http://www.w3schools.com/html/html5_webstorage.asp

function getUserToken(){
	var token = "";
	if (sessionStorage.token) {
		token = sessionStorage.token;
	}
	return token;
}

function getUserSessionData(){
	//var tmpobj = JSON.parse(JSON.stringify(Products[key]));
	var userloged = {
		_id: '',
		idUser: '',
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		rol: '',
    };
	if (sessionStorage.userloged) {
		if( typeof sessionStorage.userloged ==  "string" ){
			userloged = JSON.parse(sessionStorage.userloged);
		}
	}
	return userloged;
}

function removeSessionUserData(){
	sessionStorage.removeItem('userloged');
	sessionStorage.removeItem('token');
	sessionStorage.removeItem('shoppingCartList');
	notifyServerResponse({ data: { success: true, message: "Bye! Closed"} }, false, "Session Closed");
		
}

function saveSessionUserData(responseLogin){
	sessionStorage.userloged = JSON.stringify(responseLogin.data);
	sessionStorage.token = responseLogin.token;
}

/**
 * [getToSessionShoppingCart description]
 * @return {[type]} [description]
 * shoppingCartList[ {
		'product': productData,
		'quantity': quantity,
	} ];
 */
function getToSessionShoppingCart(){
	//var tmpobj = JSON.parse(JSON.stringify(Products[key]));
	var shoppingCartList = [];
	if (sessionStorage.shoppingCartList) {
		if( typeof sessionStorage.shoppingCartList ==  "string" ){
			shoppingCartList = JSON.parse(sessionStorage.shoppingCartList);
		}
	}
	return shoppingCartList;
}

function addToSessionShoppingCart(productData, quantity){
	var productExist = false;
	var shoppingCartList = getToSessionShoppingCart();
	for( key in shoppingCartList ){//If already exits
		if( productData['idProduct'] == shoppingCartList[key]['product']['idProduct'] ){
			productExist = true;
			if(false){ // Add - Replace
				shoppingCartList[key]['quantity'] = parseFloat(quantity);
			}
			else{
				shoppingCartList[key]['quantity'] = parseFloat(shoppingCartList[key]['quantity']) + parseFloat(quantity);
				
			}
			shoppingCartList[key]['total'] = ( parseFloat(productData['price']) * parseFloat(shoppingCartList[key]['quantity']) );
		}
	}

	if(! productExist ){//If does not exists yet
		shoppingCartList.push({
			'product': productData,
			'quantity': quantity,
			'total': (parseFloat(productData['price']) * parseFloat(quantity)),
			'totalTax': (parseFloat(productData['tax']) * parseFloat(quantity)),
		});
	}
	notifyProductAdded(quantity + " - <i>" + productData.name + "</i> (" + (parseFloat(productData['price']) * parseFloat(quantity)) + " €)", "Product Added");
		
	sessionStorage.shoppingCartList = JSON.stringify(shoppingCartList);
}

function removeToSessionShoppingCart(idProduct){
	var newShoppingCartList = [];
	var shoppingCartList = getToSessionShoppingCart();
	for( key in shoppingCartList ){//If already exits
		if( idProduct == shoppingCartList[key]['product']['idProduct'] ){
			//delete shoppingCartList[key];
			notifyProductAdded( " <i>" + shoppingCartList[key]['product'].name + "</i> ", "Product Removed");
		}
		else{
			newShoppingCartList.push(shoppingCartList[key]);
		}

	}
	sessionStorage.shoppingCartList = JSON.stringify(newShoppingCartList);
}



$(document).ready(function() {
	onReadyFunctions();
});
