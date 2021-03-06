(function($){
$(document).ready(function(){
    var showPager = true;

    // don't show pager navigation if only 1 img
    if( $('.tss.full > ul li').length <= 1 ) {
        showPager = false;
    }

    var fullSlider = $('.tss.full > ul').bxSlider({
        autoControls: true,
        mode: 'fade',
        speed: 500,
        controls: false,
        pager: showPager,
        onSliderLoad: function(){
            if( showPager ) {
                $('.tss.full .bx-pager').before(
                    '<a href="" id="slider-prev">&lt;</a>'
                );
                $('.tss.full .bx-pager').after(
                    '<a href="" id="slider-next">&gt;</a>'
                );
            }
        }
    });

    $('#slider-prev').live('click',function( event ){
        event.preventDefault();

        fullSlider.goToPrevSlide();
    });

    $('#slider-next').live('click',function( event ){
        event.preventDefault();

        fullSlider.goToNextSlide();
    });

    var carousels = [];
    $('.tss.carousel').each(function(){
        carousels[ $(this).attr( 'id' ) ] = $(this).find('ul').bxSlider({
            pager: false,
            pagerShortSeparator: ' - ',
            lightbox: true,
            infiniteLoop: false,
            maxSlides: 100,
            slideHeight: 100,
            slideWidth: 145,
            onSliderLoad: function() {
                $('.tss.carousel').each(function(){
                    var viewPortWidth = $(this).find('.bx-viewport').width();
                    var liWidth       = $(this).find('ul li').width();
                    var visibleSlides = viewPortWidth / liWidth;

                    var start = 1;
                    var end   = visibleSlides;
                    var total = $(this).find('ul li').length;
                    if( end > total ) {
                        end = total;
                    }

                    var text = start +' - '+ end +' of '+ total;

                    if( !$(this).find('.bx-controls .bx-pager').length ) {
                        $(this).find('.bx-controls').prepend('<div class="bx-pager">'+ text +'</div>');
                    }
                });
            },
            onSlideAfter: function( slideElement, oldIndex, newIndex ) {
                var viewPortWidth = slideElement.closest('.bx-viewport').width();
                var liWidth       = slideElement.width();
                var visibleSlides = Math.floor( viewPortWidth / liWidth );
                var offset        = Math.abs( slideElement.closest('ul').position().left );

                var start = Math.floor( offset / liWidth ) + 1;
                var end   = start + visibleSlides - 1;
                var total = slideElement.closest( '.tss' ).find( 'ul li' ).length;
                if( end > total ) {
                    end = total;
                }

                var newText = start +' - '+ end +' of '+ total;
                slideElement.closest( '.tss' ).find('.bx-pager').text( newText );
            }
        });
    });

    var thisCarousel = null;
    var lbSpeed      = 'fast';

    $('.tss.carousel ul li .slideWrapper a').live('click',function( event ){
        event.preventDefault();

        thisCarousel = $(this).closest('li');
        $('#tss-lightbox-content .close').trigger('click');

        var lbTitle = $(this).attr('title');
        var lbDesc  = $(this).attr('description');
        var lbIndex = $(this).closest('li').index() + 1;
        var lbTotal = $(this).closest('ul').find('li').length;

        $('<img/>').attr( 'src', $(this).attr( 'href' ) ).load(function(){
            $('<div/>').attr('id', 'tss-lightbox-content')
                .append( '<h2 class="imgHeader">'+ lbTitle +'</h2>' )
                .append( '<a href="#" class="close">Close</a>')
                .append( $(this) )
                .append( '<hr class="divider" />' )
                .append( '<p>'+ lbDesc +'</p>' )
                .append( '<div class="previous"/>' )
                .append( '<div class="next"/>' )
                .append( '<div class="item">Item '+ lbIndex +' of '+ lbTotal +'</div>' )
                .lightbox_me({
                    centered: true,
                    destroyOnClose: true,
                    overlaySpeed: lbSpeed,
                    lightboxSpeed: lbSpeed,
                    overlayCSS: {
                        opacity: .6
                    }
                });
        });
    });

    $('#tss-lightbox-content .previous').live('click',function(){
        if( thisCarousel.prev().length ) {
            var tLbSpeed = lbSpeed;
            lbSpeed = 1;
            $('#tss-lightbox-content').remove();
            thisCarousel.prev().find( '.slideWrapper a' ).trigger('click');
            lbSpeed = tLbSpeed;

            setTimeout(function(){
                if( $('.lb_overlay_clear').length > 1 ) {
                    $('.lb_overlay_clear:eq(0)').remove();
                }
            }, 500 );
        }
    });

    $('#tss-lightbox-content .next').live('click',function(){
        if( thisCarousel.next().length ) {
            var tLbSpeed = lbSpeed;
            lbSpeed = 1;
            $('#tss-lightbox-content').remove();
            thisCarousel.next().find( '.slideWrapper a' ).trigger('click');
            lbSpeed = tLbSpeed;

            setTimeout(function(){
                if( $('.lb_overlay_clear').length > 1 ) {
                    $('.lb_overlay_clear:eq(0)').remove();
                }
            }, 500 );
        }
    });

    $('.lb_overlay_clear, #tss-lightbox-content .close').live('click',function(){
        $('.lb_overlay').remove();
    });
});
})(jQuery);
