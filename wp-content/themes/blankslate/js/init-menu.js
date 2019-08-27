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
    menu_container.removeClass("perma");
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

function open_menu_mobile() {
  var menu_container = jQuery("#header");
  //
  menu_container.addClass("open");
}
function close_menu_mobile() {
  var menu_container = jQuery("#header");
  //
  menu_container.removeClass("open");
}
function toggle_menu_mobile() {
  var menu_container = jQuery("#header");
  //
  if (!menu_container.hasClass("open")) {
    menu_container.addClass("open");
  } else {
    menu_container.removeClass("open");
  }
}

function set_menu_color_r() {
  var menu_container = jQuery("#header");
  //
  if (!menu_container.hasClass("noActor")) {
    menu_container.addClass("noActor");
  }
}
function set_menu_color_w() {
  var menu_container = jQuery("#header");
  //
  if (menu_container.hasClass("noActor")) {
    menu_container.removeClass("noActor");
  }
}

//

jQuery(document).ready(function($) {
  set_active_menu_entry();
  //
  var parent = $("#content_left");
  var container = $("#header");
  //
  $("#button_nav").mouseover(function() {
    if (!parent.hasClass("noActor") && !container.hasClass("perma")) {
      container.removeClass("off");
      $("#nav_main").removeClass("hidden--off");
      $(this).addClass("hidden--off");
    }
  });
  $("#header").mouseleave(function() {
    if (!parent.hasClass("noActor") && !container.hasClass("perma")) {
      $("#nav_main").removeClass("hidden--off");
      $("#nav_main").addClass("hidden--off");
      $("#header").addClass("off");
      $("#button_nav").removeClass("hidden--off");
    }
  });
});
