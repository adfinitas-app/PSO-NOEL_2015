$(document).foundation();


$(document).ready(function() {
	$(window).resize(function() {
		$('.header-page').css({ height : $(window).height() });
	}).trigger('resize');
})