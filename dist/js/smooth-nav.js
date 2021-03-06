/*!smooth.js
 * https://github.com/iteam-software/smooth-nav
 * Copyright 2015 iTEAM Software
 * Licensed under MIT (https://github.com/iteam-software/blob/master/LICENSE)
 */
+function($) {
  'use strict';
  
  // SMOOTH CLASS DEFINITION
  
  var Smooth = function(element, options) {
    this.$element = $(element)
    this.options  = $.extend({}, Smooth.DEFAULTS, options)
    
    this.$element.on('click', $.proxy(this.animateScroll, this))
  }
  
  Smooth.DEFAULTS = {
    speed: 300
  }
  
  Smooth.prototype.animateScroll = function(e) {
    var hash            = this.$element[0].hash
    var targetPosition  = $(hash).offset()
    
    var properties  = { scrollTop: targetPosition.top }
    var speed       = this.options.speed
    var complete    = function() { window.location.hash = hash }
    
    e.preventDefault()
    
    $('html, body').animate(properties, speed, complete)
  }
  
  // SMOOTH PLUGIN DEFINITION
  
  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data = $this.data('smooth.nav')
      var options = typeof option == 'object' && option
      
      if (!data) $this.data('smooth.nav', (data = new Smooth(this, options)))
    })
  }
  
  var old = $.fn.smooth
  
  $.fn.smooth             = Plugin
  $.fn.smooth.Constructor = Smooth
  
  // SMOOTH NO CONFLICT
  
  $.fn.smooth.noConflict = function() {
    $.fn.smooth = old
    return this
  }
  
  // SMOOTH DATA-API
  
  $(window).on('load', function() {
    $('a[href^="#"][data-scroll="smooth"]').each(function() {
      var $link   = $(this)
      var data    = $link.data()
      var options = {}
      
      if (data.scrollSpeed != null) options.speed = data.scrollSpeed
      
      Plugin.call($link, options)
    })
  })
}(jQuery);
