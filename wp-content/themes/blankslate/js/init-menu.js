//
// Utility-functions for interactions with menu-/nav-elements
//

function set_active_menu_entry() {
  var namespace = jQuery("#content_left").data("namespace");
  //
  jQuery("a[data-namespace='" + namespace + "']").addClass("active");
}

function hide_menu() {
  var menu_container = jQuery("#header");
  var menu = jQuery("#nav_main");
  var menu_btn = jQuery("#button_nav");
  //
  if (!menu.hasClass("hidden--off")) {
    menu_container.addClass("off");
    menu.addClass("hidden--off");
    menu_btn.removeClass("hidden--off");
  }
}
function show_menu() {
  var menu = jQuery("#nav_main");
  //
  menu.removeClass("hidden--off");
}
function toggle_menu() {
  var menu_container = jQuery("#header");
  var menu = jQuery("#nav_main");
  //
  if (!menu.hasClass("hidden--off")) {
    menu.addClass("hidden--off");
  } else {
    menu_container.removeClass("hidden--off");
    menu.removeClass("hidden--off");
  }
}
function resize_menu() {
  var master = jQuery("#content_left");
  var master_width = master.width();
  var menu = jQuery("#header");
  //
  menu.width(master_width);
}

//

jQuery(document).ready(function($) {
  set_active_menu_entry();
  //
  $("#button_nav").mouseover(function() {
    var parent = $("#content_left");
    if (!parent.hasClass("noActor")) {
      $("#header").removeClass("off");
      $("#nav_main").removeClass("hidden--off");
    }
  });
  $("#header").mouseleave(function() {
    var parent = $("#content_left");
    if (!parent.hasClass("noActor")) {
      $("#nav_main").removeClass("hidden--off");
      $("#nav_main").addClass("hidden--off");
      $("#header").addClass("off");
    }
  });
});
