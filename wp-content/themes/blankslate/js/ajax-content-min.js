function slider_update_counter(){var e=jQuery(".slider-counter"),t=$sliderActor.data("flickity"),n=t.selectedIndex+1;e.html(n+"/"+t.slides.length)}function slider_next(){$sliderActor.flickity("next"),slider_update_counter()}function slider_prev(){$sliderActor.flickity("previous"),slider_update_counter()}function slider_home_next(){$sliderHome.flickity("next");$(".main-carousel");var e=$(".main-carousel-cover"),t=$(".carousel-cell-link.is-selected"),n=t.attr("id");if(t.hasClass("video")){e.addClass("hidden-full");var a=t.children(".video-overlay"),o=n.replace("player_","");a.removeClass("hidden-op"),players[o].play(),"home"==namespace&&toggle_ui_white()}else e.hasClass("hidden-full")&&(e.removeClass("hidden-full"),$(".video-overlay").addClass("hidden-op"),toggle_ui_white(),$.each(players,function(e,t){this.pause()}))}!function(e){e(document).on("click",".content-link",function(t){t.preventDefault(),e(".grid-item.actor").removeClass("active"),e(".content-link a").removeClass("active"),e(this).children("a").addClass("active"),cat=e(this).attr("data-content-cat"),e.ajax({url:ajaxcontent.ajaxurl,type:"post",data:{action:"ajax_content",query_vars:ajaxcontent.query_vars,cat:cat},success:function(t){if("6"==cat){e("#content_left").attr("data-namespace","News")}e("#content_left").addClass("hidden--content"),setTimeout(function(){e("#content_left").empty(),e("#content_left").append(t)},275),setTimeout(function(){e("#content_left").addClass("noActor"),e("#content_left").removeClass("hidden--content")},300)}})})}(jQuery),function(e){e(document).on("click",".grid-item.actor",function(t){e(this).attr("id");var n=e(this).data("post-id");e(".content-link a").removeClass("active"),e(".grid-item.actor").removeClass("active"),e(this).addClass("active"),e.ajax({url:ajaxcontent.ajaxurl,type:"post",data:{action:"ajax_content_actor",query_vars:ajaxcontent.query_vars,post:n},success:function(t){hide_menu(),e("#content_left").addClass("hidden--content"),setTimeout(function(){e("#content_left").empty(),e("#content_left").append(t)},275),setTimeout(function(){window.$sliderActor=e(".actor-carousel").flickity({cellAlign:"left",contain:!0,pageDots:!1,prevNextButtons:!1,wrapAround:!0,draggable:!1,lazyLoad:2}),e("#content_left").removeClass("noActor"),e("#content_left").removeClass("hidden--content")},300)}})})}(jQuery);