const main = {
    init() {
        $('.js-select').nSelect({
            afterOpen: function() {
                $('.nselect').on('click', function () {
                    $('.nselect').not(this).each(function () {
                        $(this).removeClass('_active');
                    });
                });
            }
        });

        $(document).ready(function() {
            $("a.scrollto").click(function() {
                let elementClick = $(this).attr("href")
                let destination = $(elementClick).offset().top - 40;
                jQuery("html:not(:animated),body:not(:animated)").animate({
                    scrollTop: destination
                }, 800);
                return false;
            });
        });

        let menu = $('.header__menu');

        menu.on('click', function () {
            $(this).toggleClass('header__menu--active');
            $('.header__inner').toggleClass('header__inner--active');
        });

        $(document).scroll(function () {
            let top = $(document).scrollTop();

            if (top >= 140) {
                menu.addClass('header__menu--blue');
            } else {
                menu.removeClass('header__menu--blue');
            }
        });

        $( function() {
            function hexFromRGB(r, g, b) {
                let hex = [
                    r.toString( 16 ),
                    g.toString( 16 ),
                    b.toString( 16 )
                ];
                $.each( hex, function( nr, val ) {
                    if ( val.length === 1 ) {
                        hex[ nr ] = "0" + val;
                    }
                });
                return hex.join( "" ).toUpperCase();
            }
            function refreshSwatch() {
                let red = $( "#red" ).slider( "value" ),
                    green = $( "#green" ).slider( "value" ),
                    blue = $( "#blue" ).slider( "value" ),
                    hex = hexFromRGB( red, green, blue );
                $( "#swatch" ).css( "background-color", "#" + hex );
            }

            $( "#red, #green, #blue" ).slider({
                orientation: "horizontal",
                range: "min",
                max: 255,
                value: 127,
                slide: refreshSwatch,
                change: refreshSwatch
            });
            $( "#red" ).slider( "value", 180 );
            $( "#green" ).slider( "value", 140 );
            $( "#blue" ).slider( "value", 60 );
        } );
    }
};

export default main;
