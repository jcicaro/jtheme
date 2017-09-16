(function($) {

	$(document).ready(function($) {
		_moveContentBelowHeader();
	});

	function _moveContentBelowHeader() {
		var divHeight = $('#header').height(); 
		$('#content').css('margin-top', (divHeight+10)+'px');
	}

})(jQuery);