(function($){

  $.fn.fixedScroller = function(settings) {

    var $this = this,
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

      animateScroll(scrollTop);

      return false;
    }

    function animateScroll(scrollTop) {
      $("html, body").animate({
        scrollTop: scrollTop
      }, parseInt(settings.speed, 10));
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
    buffer: 10
  };
})(jQuery);