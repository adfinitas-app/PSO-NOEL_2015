$(document).foundation();


function getDonAmount() {
    $.ajax({
        url: "https://peuples-solidaires.iraiser.eu/api/counter/get",
        data: {
            "user_api": "008",
            "pwd_api": "4hCVhv2H",
            "campaigns[]": [101, 102]
        }
    }).done(function(data, status, jqXHR) {
        if (data[0] == '1') {
            var amount = data.slice(data.indexOf('|') + 1, data.length - 2);
            $('.counter').html(amount ? amount : 0);
            $('.progressbar > .bar').css("width", (amount > 0 ? amount * 100 / 10000 : 0) + "%");
        }
    });
}
getDonAmount();

$(document).ready(function() {

	$(window).resize(function() {
		$('.header-page').css({ height : $(window).height() });
	}).trigger('resize');

    // FORM 
    $('form').on('submit', function() {
        var index = $(this).data('id');

        $(this).next('.msg').fadeIn();

        woopra.identify("email", $('form[data-id=' + index + '] input.input-group-field').val()).push();
        woopra.track('inscription', {
            category: "CHAMP_CAS" + index + "_FA15",
            url:document.location.href,
            title: document.title,
            optin:"oui",
            "email": $('form[data-id=' + index + '] input.input-group-field').val(),
            'code-campagne':"FA15"
        });
        return false;
    });

    // SWITCH
    function killSwitch() {
        if( parseInt($(window).width()) <= 565 ) {
            $(window).off('mousemove').off('mouseup');
            $('.section-case').removeClass('init').addClass('no-switch').find('.trigger-move').off('click').off('mousedown');
        } else if( $('.section-case').hasClass('no-switch')) {
            $('.section-case').removeClass('no-switch');
            initSwitch();
        }
    }
    $(window).resize(function() {
        killSwitch();
    });
    killSwitch();

    function initSwitch() {
        $(window).resize(function() {
            $('.section-case').each(function() {
                var $caseTrue = $(this).find('.section-case-true'),
                    $caseFalse = $(this).find('.section-case-false');

                // Update height
                var _h = $caseTrue.outerHeight(true) > $caseFalse.outerHeight(true) ? $caseTrue.outerHeight(true) : $caseFalse.outerHeight(true);

                $(this).css({ height : _h}).addClass('init');

                if( $caseTrue.attr('style') != null && $caseTrue.offset().left > 0 ) {
                    TweenMax.set($caseTrue, { x : $(window).width() });
                }
            });
        }).trigger('resize');

        $('.trigger-show-true').on('click', function(e) {
            e.preventDefault();

            var $parent = $(this).parents('.section-case');
            TweenMax.to($parent.find('.section-case-true'), 0.3, { x : 0 });
        });

        $('.section-case').find('.trigger-move').on('click', function(e) {
            e.preventDefault();
        }).on('mousedown touchstart', function(e) {
            e.preventDefault();
            var $parent = $(this).parents('.section-case-true');

            $(window).on('mousemove touchmove', function(e) {
                e.preventDefault();

                var pageX = (e.type.toLowerCase() === 'mousemove')
                    ? e.pageX
                    : e.originalEvent.touches[0].pageX;
                TweenMax.set($parent, { x : pageX });
            });

            $(window).on('mouseup touchend', function(e) {
                e.preventDefault();

                var pageX = (e.type.toLowerCase() === 'mouseup')
                    ? e.pageX
                    : e.originalEvent.changedTouches[0].pageX;


                if( pageX > $(window).width() / 2 ) {
                    TweenMax.to($parent, 0.3, { x : $(window).width() });
                } else {
                    TweenMax.to($parent, 0.3, { x : 0 });
                }

                $(window).off('mousemove').off('mouseup');
            });
        });
    }
})
