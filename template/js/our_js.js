$(document).ready(function() {
	
	

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
		document.location.href = "../angular_react/";
		return false; 
	});

	
	$('.nav-tabs > li > a').click( function() {
	    $('.nav-tabs > li.active').removeClass('active');
	    $(this).parent().addClass('active');
	} )
});


function openModal(div){
  	$("#" + div).css('opacity', 1);
  	$("#" + div).css('pointer-events', 'auto');
  	
}
function colseModal(){
  	$("[class^=modalDialog]").css('opacity', 0);
  	$("[class^=modalDialog]").css('pointer-events', 'none');
}
