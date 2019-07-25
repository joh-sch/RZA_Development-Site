function set_active_menu_entry() {
  var namespace = jQuery("#content_left").data("namespace");
  //
  jQuery("a[data-namespace='" + namespace + "']").addClass("active");
}
//
jQuery(document).ready(function($) {
  set_active_menu_entry();
});
