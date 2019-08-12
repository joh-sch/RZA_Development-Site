//
// Utility-functions for interactions with menu-/nav-elements
//

function set_active_menu_entry() {
  var namespace = jQuery("#content_left").data("namespace");
  //
  jQuery("a[data-namespace='" + namespace + "']").addClass("active");
}

function hide_menu() {
  var menu = jQuery("#nav_main");
  //
  if (!menu.hasClass("hidden--off")) {
    menu.addClass("hidden--off");
  }
}
function toggle_menu() {
  var menu = jQuery("#nav_main");
  //
  if (!menu.hasClass("hidden--off")) {
    menu.addClass("hidden--off");
  } else {
    menu.removeClass("hidden--off");
  }
}

//

jQuery(document).ready(function($) {
  set_active_menu_entry();
  //
  $("#button_nav").mouseover(function() {
    var parent = $("#content_left");
    if (!parent.hasClass("noActor")) {
      $("#nav_main").removeClass("hidden--off");
    }
  });
  $("#nav_main").mouseleave(function() {
    var parent = $("#content_left");
    if (!parent.hasClass("noActor")) {
      $("#nav_main").removeClass("hidden--off");
      $("#nav_main").addClass("hidden--off");
    }
  });
});
