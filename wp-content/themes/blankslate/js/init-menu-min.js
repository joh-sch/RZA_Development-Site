function getStatus_content(e){return(e=jQuery(e)).attr("data-namespace")}function set_active_menu_entry(){var e=jQuery("#content_left").data("namespace");jQuery("span[data-content-cat='"+e+"'] a").addClass("active")}function hide_menu(){var e=jQuery("#header"),a=jQuery("#nav_main"),n=jQuery("#button_nav");a.hasClass("hidden--off")||(e.addClass("off"),e.removeClass("perma"),e.removeClass("open"),e.removeClass("noActor"),a.addClass("hidden--off"),n.removeClass("hidden--off"))}function show_menu(){jQuery("#nav_main").removeClass("hidden--off")}function toggle_menu(){var e=jQuery("#header"),a=jQuery("#nav_main");a.hasClass("hidden--off")?(e.removeClass("hidden--off"),a.removeClass("hidden--off")):a.addClass("hidden--off")}function resize_menu(){var e=jQuery("#content_left"),a=getStatus_content("#content_left"),n=e.width(),o=jQuery("#header");"actor"==a?o.outerWidth(n):o.width(n)}function toggle_mobile_menu(){var e=jQuery("#header_mob"),a=jQuery("#nav_links_mob");e.toggleClass("h--100"),a.toggleClass("active")}function set_menu_color_r(){var e=jQuery("#header_mob");e.hasClass("noActor")||e.addClass("noActor")}function set_menu_color_w(){var e=jQuery("#header");e.hasClass("noActor")&&e.removeClass("noActor")}function resize_zigzag(){var e=jQuery("#content_left").outerWidth(),a=jQuery(".zigzag-container"),n=e-a.width();a.css("left",n)}jQuery(document).ready(function(e){set_active_menu_entry();var a=e("#content_left"),n=e("#header");e("#button_nav").mouseover(function(){a.hasClass("noActor")||n.hasClass("perma")||(n.removeClass("off"),e("#nav_main").removeClass("hidden--off"),e(this).addClass("hidden--off"))}),e("#header").mouseleave(function(){a.hasClass("noActor")||n.hasClass("perma")||(e("#nav_main").removeClass("hidden--off"),e("#nav_main").addClass("hidden--off"),e("#header").addClass("off"),e("#button_nav").removeClass("hidden--off"))})});