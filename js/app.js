$(document).foundation();


$(document).ready(function() {
	$(window).resize(function() {
		$('.header-page').css({ height : $(window).height() });
	}).trigger('resize');


    getDonAmount();
})

function getDonAmount() {
    $.ajax({
        url: "https://peuples-solidaires.iraiser.eu/api/counter/get",
        data: {
            "user_api": "008",
            "pwd_api": "4hCVhv2H",
            "campaigns[]": [101]
        }
    }).done(function(data, status, jqXHR) {
        if (data[0] == '1') {
            var amount = data.slice(data.indexOf('|') + 1, data.length - 2);
            $('.counter').html(amount ? amount : 0);
            $('.progressbar > .bar').css("width", (amount > 0 ? amount * 100 / 60000 : 0) + "%");
        }
    });
}