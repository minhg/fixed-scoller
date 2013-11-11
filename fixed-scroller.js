(function($){

  $.fn.fixedScroller = function(settings) {

    var $this = this,
        fixedheight,
        height,
        scrollTop,
        direction = 1;

    settings = $.extend({}, $.fn.fixedScroller.settings, settings);

    function calcScroll(e, direction) {
      
      e.preventDefault();

      fixedHeight = $this.outerHeight(true);

      if (settings.buffer > 0)
        fixedHeight += settings.buffer;

      height = $(window).height() - fixedHeight;
      scrollTop = $(document).scrollTop() + height * direction;

      if (settings.animate) {
        $("html, body").animate({ scrollTop: scrollTop });
      } else {
        return $(document).scrollTop(scrollTop);
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
    animate: true
  };
})(jQuery);