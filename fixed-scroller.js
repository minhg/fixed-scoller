(function($){

  $.fn.fixedScroller = function(settings) {

    var $this = this,
        $body = $('body'),
        fixedheight,
        height,
        scrollTop,
        direction = 1;

    settings = $.extend({}, $.fn.fixedScroller.settings, settings);

    function calcScroll(direction) {
      
      fixedHeight = $this.outerHeight(true);

      if (settings.buffer > 0)
        fixedHeight += settings.buffer;

      height = $(window).height() - fixedHeight;
      scrollTop = $(document).scrollTop() + height * direction;

      if (settings.transform) {
        transformScroll(scrollTop);
      } else {
        animateScroll(scrollTop);
      }

      return false;
    }

    function animateScroll(scrollTop) {
      $("html, body").animate({
        scrollTop: scrollTop
      }, parseInt(settings.speed, 10));
    }

    function transformScroll(scrollTop) {
      $body.css('transition', '.2s');
      $body.css('transform', 'translate3d(0, ' + scrollTop + 'px, 0)');
      $body.bind('transitionend webkitTransitionEnd', function(event) {
          $body
          .scrollTop(scrollTop)
          .css({'transition': '', 'transform': ''})
          .unbind(event);
      });
    }

    $(document).keydown(function(e) {

      if ($('html, body').is(':animated')) return false;

      switch(e.keyCode){
        case 32: //space
          calcScroll(1);
          break;
        case 33: //pgup
          calcScroll(-1);
          break;
        case 34: //pgdown
          calcScroll(1);
          break;
      }
      return true;
    });

  };

  $.fn.fixedScroller.settings = {
    speed: 200,
    buffer: 10,
    transform: true
  };
})(jQuery);