// Homepage fixes for section navigation and visual improvements
$(document).ready(function() {
  
  // Fix smooth scrolling for anchor links
  $('a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    
    var target = this.hash;
    var $target = $(target);
    
    if ($target.length) {
      var offset = 80; // Account for fixed header
      
      $('html, body').animate({
        'scrollTop': $target.offset().top - offset
      }, 800, 'swing');
    }
  });
  
  // Add active state to navigation links based on scroll position
  $(window).on('scroll', function() {
    var scrollDistance = $(window).scrollTop();
    
    // Check each section
    $('section[id]').each(function(i) {
      var $section = $(this);
      var sectionTop = $section.offset().top - 100;
      var sectionId = $section.attr('id');
      
      if (scrollDistance >= sectionTop) {
        $('.masthead .visible-links a[href="#' + sectionId + '"]').parent().addClass('active');
        $('.masthead .visible-links a[href!="#' + sectionId + '"]').parent().removeClass('active');
      }
    });
  });
  
});