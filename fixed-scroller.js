(function($){

  $.fn.fixedScroller = function(settings) {

    var $this = this,
        fixedheight,
        height,
        direction = 1;

    settings = $.extend({}, $.fn.fixedScroller.settings, settings);

    function calcScroll(e, direction) {
      
      e.preventDefault();

      fixedHeight = $this.outerHeight(true);

      if (settings.buffer > 0)
        fixedHeight += settings.buffer;

      height = $(window).height() - fixedHeight;

      if (settings.animate) {
        $("html, body").animate({ scrollTop: height });
      } else {
        return $(document).scrollTop($(document).scrollTop() + height * direction);
      }
    }

    $(document).keydown(function(e) {

      switch(e.keyCode){
        case 32: //space
          calcScroll(e, -1);
          break;
        case 33: //pgup
          calcScroll(e, -1);
          break;
        case 34: //pgdown
          calcScroll(e, 1);
          break;
      }
      return true;
    });

  };

  $.fn.fixedScroller.settings = {
    speed: 1,
    buffer: 30,
    animate: false
  };
})(jQuery);