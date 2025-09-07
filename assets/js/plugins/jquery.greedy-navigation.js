/*
* Greedy Navigation
*
* http://codepen.io/lukejacksonn/pen/PwmwWV
*
*/

$(document).ready(function() {
  var $nav = $('#site-nav');
  var $btn = $('#site-nav button');
  var $vlinks = $('#site-nav .visible-links');
  var $vlinks_persist_tail = $vlinks.children(".persist.tail");
  var $hlinks = $('#site-nav .hidden-links');

  var breaks = [];

  function updateNav() {

    var availableSpace = $btn.hasClass('hidden') ? $nav.width() : $nav.width() - $btn.width() - 30;
    
    // Be more conservative - ensure we have proper navigation space
    var conservativeSpace = availableSpace * 0.8; // Use 80% of available space to be safe

    // The visible list is overflowing the nav
    if ($vlinks.width() > conservativeSpace) {

      // Only move non-persistent items that are not critical navigation
      while ($vlinks.width() > conservativeSpace && $vlinks.children("*:not(.persist):not(.masthead__menu-item--lg)").length > 0) {
        // Record the width of the list
        breaks.push($vlinks.width());

        // Move item to the hidden list - but skip the main title and essential nav items
        var itemToMove = $vlinks.children("*:not(.persist):not(.masthead__menu-item--lg)").last();
        if (itemToMove.length > 0) {
          itemToMove.prependTo($hlinks);
        } else {
          break; // Stop if we can't find items to move
        }

        availableSpace = $btn.hasClass("hidden") ? $nav.width() : $nav.width() - $btn.width() - 30;
        conservativeSpace = availableSpace * 0.8;

        // Show the dropdown btn only if we actually moved items
        if ($hlinks.children().length > 0) {
          $btn.removeClass("hidden");
        }
      }

      // The visible list is not overflowing
    } else {

      // There is space for another item in the nav
      while (breaks.length > 0 && conservativeSpace > breaks[breaks.length - 1]) {
        // Move the item to the visible list
        if ($vlinks_persist_tail.length > 0) {
          $hlinks.children().first().insertBefore($vlinks_persist_tail);
        } else {
          $hlinks.children().first().appendTo($vlinks);
        }
        breaks.pop();
      }

      // Hide the dropdown btn if hidden list is empty
      if (breaks.length < 1) {
        $btn.addClass('hidden');
        $btn.removeClass('close');
        $hlinks.addClass('hidden');
      }
    }

    // Keep counter updated
    $btn.attr("count", breaks.length);

    // update masthead height and the body/sidebar top padding
    var mastheadHeight = $('.masthead').height();
    $('body').css('padding-top', mastheadHeight + 'px');
    if ($(".author__urls-wrapper button").is(":visible")) {
      $(".sidebar").css("padding-top", "");
    } else {
      $(".sidebar").css("padding-top", mastheadHeight + "px");
    }

  }

  // Window listeners
  $(window).on('resize', function () {
    updateNav();
  });
  screen.orientation.addEventListener("change", function () {
    updateNav();
  });

  $btn.on('click', function () {
    $hlinks.toggleClass('hidden');
    $(this).toggleClass('close');
  });

  // Initialize navigation after DOM is ready
  updateNav();
});