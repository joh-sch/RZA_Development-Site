function find_content_cat(e){return e.attr("data-content-cat")}function reset_navLinks_left(){jQuery(".content-link a").removeClass("active")}function reset_navLinks_right(){jQuery(".actor-link").removeClass("active")}function reset_scrollbars_left(){os_left.destroy(),window.os_left=jQuery("#content_left").overlayScrollbars({className:"os-theme-dark rza left"}).overlayScrollbars()}function toggle_gridDisplay_mobile(e){e.parents("section").addClass("grid").removeClass("off"),e.addClass("grid-container mobile").removeClass("off")}function disable_gridDisplay_mobile(e){e.parents("section").addClass("off"),e.addClass("off")}function slider_update_counter(){var e=jQuery(".slider-counter"),t=$sliderActor.data("flickity"),a=t.selectedIndex+1;e.html(a+"/"+t.slides.length)}function slider_next(){$sliderActor.flickity("next"),slider_update_counter()}function slider_prev(){$sliderActor.flickity("previous"),slider_update_counter()}function slider_home_next(){$sliderHome.flickity("next");$(".main-carousel");var e=$(".main-carousel-cover"),t=$(".carousel-cell-link.is-selected"),a=t.attr("id");if(t.hasClass("video")){e.addClass("hidden-full");var n=t.children(".video-overlay"),o=a.replace("player_","");n.removeClass("hidden-op"),players[o].play(),"home"==namespace&&toggle_ui_white()}else e.hasClass("hidden-full")&&(e.removeClass("hidden-full"),$(".video-overlay").addClass("hidden-op"),toggle_ui_white(),$.each(players,function(e,t){this.pause()}))}!function(e){e(document).on("click",".content-link",function(t){t.preventDefault(),e("#header").addClass("perma"),e(".grid-item.actor").removeClass("active"),e(".content-link a").removeClass("active"),e(this).children("a").addClass("active"),cat=find_content_cat(e(this)),history.pushState(null,null,"/"+cat),e.ajax({url:ajaxcontent.ajaxurl,type:"post",data:{action:"ajax_content",query_vars:ajaxcontent.query_vars,cat:cat},success:function(t){var a=e("#content_left"),n=e("#content_left_items");a.attr("data-namespace",cat),n.addClass("hidden--content"),setTimeout(function(){toggle_menu_mobile(),set_menu_color_r(),n.find("article, .content-item, .grid-item.actor").remove(),n.append(t),a.removeClass("actor"),a.addClass("noActor"),disable_gridDisplay_mobile(n)},275),setTimeout(function(){reset_scrollbars_left(),n.removeClass("hidden--content")},300)}})})}(jQuery),function(e){e(document).on("click",".actor-link",function(t){if(t.preventDefault(),e(this).hasClass("active")){var a=[7,8];reset_navLinks_right()}else{a=find_content_cat(e(this));reset_navLinks_right(),e(this).addClass("active")}e.ajax({url:ajaxcontent.ajaxurl,type:"post",data:{action:"ajax_actors",query_vars:ajaxcontent.query_vars,cat:a},success:function(t){var a;"block"==e("#content_right").css("display")?((a=e("#content_right .grid-container")).addClass("hidden--content"),setTimeout(function(){a.empty()},275),setTimeout(function(){a.append(t)},300),setTimeout(function(){a.removeClass("hidden--content")},325)):((a=e("#content_left_items")).addClass("hidden--content"),setTimeout(function(){toggle_menu_mobile(),set_menu_color_w(),a.empty(),toggle_gridDisplay_mobile(a)},275),setTimeout(function(){a.append(t)},300),setTimeout(function(){a.removeClass("hidden--content")},325))}})})}(jQuery),function(e){e(document).on("click",".grid-item.actor",function(t){var a=e(this).attr("id"),n=e(this).data("post-id");history.pushState(null,null,"/"+a),e(".content-link a").removeClass("active"),e(".grid-item.actor").removeClass("active"),e(this).addClass("active"),e.ajax({url:ajaxcontent.ajaxurl,type:"post",data:{action:"ajax_content_actor",query_vars:ajaxcontent.query_vars,post:n},success:function(t){var a=e("#content_left"),n=e("#content_left_items"),o=e("#content_right").css("display");a.attr("data-namespace","actor"),"block"==o?(a.addClass("hidden--content"),hide_menu(),setTimeout(function(){n.find("article, .content-item").remove(),n.append(t),a.removeClass("noActor"),a.addClass("actor")},275),setTimeout(function(){window.$sliderActor=e(".actor-carousel").flickity({cellAlign:"left",contain:!0,pageDots:!1,prevNextButtons:!1,wrapAround:!0,draggable:!1,lazyLoad:2}),reset_scrollbars_left(),a.removeClass("hidden--content")},300)):(a.addClass("hidden--content"),setTimeout(function(){e("#content_left_items").find(".grid-item").remove(),n.append(t),disable_gridDisplay_mobile(n),a.removeClass("noActor"),a.addClass("actor")},275),setTimeout(function(){window.$sliderActor=e(".actor-carousel").flickity({cellAlign:"left",contain:!0,pageDots:!1,prevNextButtons:!1,wrapAround:!0,draggable:!1,lazyLoad:2}),reset_scrollbars_left(),a.removeClass("hidden--content")},300))}})})}(jQuery);