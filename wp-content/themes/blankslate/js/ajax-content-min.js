function find_content_cat(t){return t.attr("data-content-cat")}function reset_navLinks_left(){jQuery(".content-link a").removeClass("active")}function reset_navLinks_right(){jQuery(".actor-link").removeClass("active")}function reset_scrollbars_left(){os_left.destroy(),window.os_left=jQuery("#content_left").overlayScrollbars({className:"os-theme-dark rza left"}).overlayScrollbars()}function slider_update_counter(){var t=jQuery(".slider-counter"),e=$sliderActor.data("flickity"),n=e.selectedIndex+1;t.html(n+"/"+e.slides.length)}function slider_next(){$sliderActor.flickity("next"),slider_update_counter()}function slider_prev(){$sliderActor.flickity("previous"),slider_update_counter()}function slider_home_next(){$sliderHome.flickity("next");$(".main-carousel");var t=$(".main-carousel-cover"),e=$(".carousel-cell-link.is-selected"),n=e.attr("id");if(e.hasClass("video")){t.addClass("hidden-full");var a=e.children(".video-overlay"),o=n.replace("player_","");a.removeClass("hidden-op"),players[o].play(),"home"==namespace&&toggle_ui_white()}else t.hasClass("hidden-full")&&(t.removeClass("hidden-full"),$(".video-overlay").addClass("hidden-op"),toggle_ui_white(),$.each(players,function(t,e){this.pause()}))}!function(t){t(document).on("click",".content-link",function(e){e.preventDefault(),t(".grid-item.actor").removeClass("active"),t(".content-link a").removeClass("active"),t(this).children("a").addClass("active"),cat=find_content_cat(t(this)),t.ajax({url:ajaxcontent.ajaxurl,type:"post",data:{action:"ajax_content",query_vars:ajaxcontent.query_vars,cat:cat},success:function(e){if("6"==cat){t("#content_left").attr("data-namespace","News")}t("#content_left").addClass("hidden--content"),setTimeout(function(){t("#content_left").empty(),t("#content_left").append(e)},275),setTimeout(function(){reset_scrollbars_left(),t("#content_left").addClass("noActor"),t("#content_left").removeClass("hidden--content")},300)}})})}(jQuery),function(t){t(document).on("click",".grid-item.actor",function(e){t(this).attr("id");var n=t(this).data("post-id");t(".content-link a").removeClass("active"),t(".grid-item.actor").removeClass("active"),t(this).addClass("active"),t.ajax({url:ajaxcontent.ajaxurl,type:"post",data:{action:"ajax_content_actor",query_vars:ajaxcontent.query_vars,post:n},success:function(e){hide_menu(),t("#content_left").addClass("hidden--content"),setTimeout(function(){t("#content_left").empty(),t("#content_left").append(e)},275),setTimeout(function(){window.$sliderActor=t(".actor-carousel").flickity({cellAlign:"left",contain:!0,pageDots:!1,prevNextButtons:!1,wrapAround:!0,draggable:!1,lazyLoad:2}),reset_scrollbars_left(),t("#content_left").removeClass("noActor"),t("#content_left").removeClass("hidden--content")},300)}})})}(jQuery),function(t){t(document).on("click",".actor-link",function(e){e.preventDefault();var n=t("#content_right .grid-container");if(t(this).hasClass("active")){var a=[7,8];reset_navLinks_right()}else{a=find_content_cat(t(this));reset_navLinks_right(),t(this).addClass("active")}t.ajax({url:ajaxcontent.ajaxurl,type:"post",data:{action:"ajax_actors",query_vars:ajaxcontent.query_vars,cat:a},success:function(t){n.addClass("hidden--content"),setTimeout(function(){n.empty()},275),setTimeout(function(){n.append(t)},300),setTimeout(function(){n.removeClass("hidden--content")},325)}})})}(jQuery);