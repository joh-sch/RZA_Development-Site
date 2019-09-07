// Utility functions
function find_content_cat(element) {
  return element.attr("data-content-cat");
}
function reset_navLinks_left() {
  var navLinks = jQuery(".content-link a");
  navLinks.removeClass("active");
}
function reset_navLinks_right() {
  var navLinks = jQuery(".actor-link");
  navLinks.removeClass("active");
}
function reset_scrollbars_left() {
  os_left.destroy();
  window.os_left = jQuery("#content_left")
    .overlayScrollbars({
      className: "os-theme-dark rza left"
    })
    .overlayScrollbars();
}
function toggle_gridDisplay_mobile(element) {
  element
    .parents("section")
    .addClass("grid")
    .removeClass("off");
  element.addClass("grid-container mobile").removeClass("off");
}
function disable_gridDisplay_mobile(element) {
  element.parents("section").addClass("off");
  element.addClass("off");
}
function toggle_ui_actor(color) {
  var ui_elements = jQuery("#slider_overlay, #button_nav");
  // Remove all color classes
  ui_elements.removeClass(function(index, classname) {
    return (classname.match(/\bcolor_\S+/g) || []).join(" ");
  });
  // Set new color
  ui_elements.addClass(color);
}
function check_slide_video() {
  var sliderInstance = $sliderActor.data("flickity");
  var currentSlide = jQuery(sliderInstance.selectedElement);
  var video = jQuery(players[0].videojs.el_);
  var controls = jQuery("#slider_overlay .video-controls");
  //
  if (currentSlide.hasClass("video-cell")) {
    var ui_colorSetting = "color_white";
    controls.removeClass("hidden--off");
    toggle_ui_actor(ui_colorSetting);
  } else {
    var ui_colorSetting = "color_black";
    controls.addClass("hidden--off");
    toggle_ui_actor(ui_colorSetting);
    if (video.hasClass("vjs-playing")) {
      players[0].stop();
      controls.removeClass("playing");
    }
  }
}
function video_playToggle() {
  var video = jQuery(players[0].videojs.el_);
  var controls = jQuery("#slider_overlay .video-controls");
  //
  if (video.hasClass("vjs-playing")) {
    players[0].pause();
    controls.removeClass("playing");
  } else {
    players[0].play();
    controls.addClass("playing");
  }
}
function video_fullscreen() {
  players[0].maximize();
  players[0].controls(true);
}

// Function to fetch subpage-content (Agentur, Kontakt, News)
(function($) {
  $(document).on("click", ".content-link", function(event) {
    event.preventDefault();
    //
    $("#header").addClass("perma");
    //
    var gridItems = $(".grid-item.actor");
    gridItems.removeClass("active");
    var navLinks = $(".content-link a");
    navLinks.removeClass("active");
    $(this)
      .children("a")
      .addClass("active");
    //
    cat = find_content_cat($(this));
    history.pushState(null, null, "/" + cat.toLowerCase());
    //
    $.ajax({
      url: ajaxcontent.ajaxurl,
      type: "post",
      data: {
        action: "ajax_content",
        query_vars: ajaxcontent.query_vars,
        cat: cat
      },
      success: function(content) {
        var section = $("#content_left");
        var container = $("#content_left_items");
        // Change namespace
        section.attr("data-namespace", cat);
        //
        container.addClass("hidden--content");
        //
        setTimeout(function() {
          //
          container.find("article, .content-item, .grid-item.actor").remove();
          container.append(content);
          //
          section.removeClass("actor");
          section.addClass("noActor");
          //
          disable_gridDisplay_mobile(container);
          toggle_mobile_menu();
          set_menu_color_r();
          var display_status_r = $("#content_right").css("display");
          if (display_status_r == "none") {
            reset_navLinks_right();
          }
        }, 275);
        setTimeout(function() {
          reset_scrollbars_left();
          container.removeClass("hidden--content");
        }, 300);
      }
    });
  });
})(jQuery);

// Function to fetch actors (based on category of clicked nav-link)
(function($) {
  $(document).on("click", ".actor-link", function(event) {
    event.preventDefault();
    //
    if ($(this).hasClass("active")) {
      var cat = [7, 8];
      reset_navLinks_right();
    } else {
      var cat = find_content_cat($(this));
      reset_navLinks_right();
      $(this).addClass("active");
    }
    //
    $.ajax({
      url: ajaxcontent.ajaxurl,
      type: "post",
      data: {
        action: "ajax_actors",
        query_vars: ajaxcontent.query_vars,
        cat: cat
      },
      success: function(content) {
        // Determine display-status of #content_right
        var display_status_r = $("#content_right").css("display");
        //
        if (display_status_r == "block") {
          var grid = $("#content_right .grid-container");
          //
          grid.addClass("hidden--content");
          setTimeout(function() {
            grid.empty();
          }, 275);
          setTimeout(function() {
            grid.append(content);
          }, 300);
          setTimeout(function() {
            grid.removeClass("hidden--content");
          }, 325);
        } else {
          var grid = $("#content_left_items");
          var section = $("#content_left");
          // Change namespace
          section.attr("data-namespace", "actors");
          //
          grid.addClass("hidden--content");
          setTimeout(function() {
            grid.empty();
            toggle_gridDisplay_mobile(grid);
          }, 275);
          setTimeout(function() {
            grid.append(content);
            toggle_mobile_menu();
            set_menu_color_w();
            reset_navLinks_left();
          }, 300);
          setTimeout(function() {
            grid.removeClass("hidden--content");
          }, 325);
        }
      }
    });
  });
})(jQuery);

// Function to fetch actor-page content
(function($) {
  $(document).on("click", ".grid-item.actor", function(event) {
    var actor_id = $(this).attr("id");
    var post_id = $(this).data("post-id");
    //
    history.pushState(null, null, "/" + actor_id);
    //
    var navLinks = $(".content-link a");
    navLinks.removeClass("active");
    var gridItems = $(".grid-item.actor");
    gridItems.removeClass("active");
    $(this).addClass("active");
    //
    $.ajax({
      url: ajaxcontent.ajaxurl,
      type: "post",
      data: {
        action: "ajax_content_actor",
        query_vars: ajaxcontent.query_vars,
        post: post_id
      },
      success: function(content) {
        // Determine display-status of #content_right
        var section = $("#content_left");
        var container = $("#content_left_items");
        var display_status_r = $("#content_right").css("display");
        // Change namespace
        section.attr("data-namespace", "actor");
        // Place content
        if (display_status_r == "block") {
          section.addClass("hidden--content");
          hide_menu();
          //
          setTimeout(function() {
            container.find("article, .content-item").remove();
            container.append(content);
            //
            section.removeClass("noActor");
            section.addClass("actor");
          }, 275);
          //
          setTimeout(function() {
            // Flickity init
            window.$sliderActor = $(".actor-carousel").flickity({
              cellAlign: "left",
              contain: true,
              pageDots: false,
              prevNextButtons: false,
              wrapAround: true,
              draggable: false,
              lazyLoad: 2
            });
            // CLD init
            var cld = cloudinary.Cloudinary.new({ cloud_name: "johschmoll" });
            window.players = cld.videoPlayers(".cld-video-player", {
              events: ["ended"]
            });
            // Video Controls
            document
              .querySelector("#slider_overlay button.play")
              .addEventListener("click", function() {
                video_playToggle();
              });
            document
              .querySelector("#slider_overlay button.fullscreen")
              .addEventListener("click", function() {
                alert("Dieser Button funktioniert noch nicht… aber bald!");
              });
            // End of Video
            players[0].on("ended", event => {
              // Reset play-button & video
              var controls = jQuery("#slider_overlay .video-controls");
              controls.removeClass("playing");
              players[0].stop();
            });
            //
            reset_scrollbars_left();
            section.removeClass("hidden--content");
          }, 300);
        } else {
          section.addClass("hidden--content");
          //
          setTimeout(function() {
            $("#content_left_items")
              .find(".grid-item")
              .remove();
            //
            container.append(content);
            disable_gridDisplay_mobile(container);
            //
            section.removeClass("noActor");
            section.addClass("actor");
          }, 275);
          //
          setTimeout(function() {
            window.$sliderActor = $(".actor-carousel").flickity({
              cellAlign: "left",
              contain: true,
              pageDots: false,
              prevNextButtons: false,
              wrapAround: true,
              draggable: false,
              lazyLoad: 2
            });
            //
            reset_scrollbars_left();
            section.removeClass("hidden--content");
          }, 300);
        }
      }
    });
  });
})(jQuery);

// Custom slider-UI-functions
function slider_update_counter() {
  var counter = jQuery(".slider-counter");
  var flkty = $sliderActor.data("flickity");
  var slideNumber = flkty.selectedIndex + 1;
  counter.html(slideNumber + "/" + flkty.slides.length);
}

function slider_next() {
  $sliderActor.flickity("next");
  slider_update_counter();
  check_slide_video();
}
function slider_prev() {
  $sliderActor.flickity("previous");
  slider_update_counter();
  check_slide_video();
}

function slider_home_next() {
  $sliderHome.flickity("next");
  //
  var slider = $(".main-carousel");
  var sliderCover = $(".main-carousel-cover");
  var activeSlide = $(".carousel-cell-link.is-selected");
  var activeSlide_id = activeSlide.attr("id");
  //
  if (activeSlide.hasClass("video")) {
    sliderCover.addClass("hidden-full");
    //
    var videoControls = activeSlide.children(".video-overlay");
    var playerIndex = activeSlide_id.replace("player_", "");
    //
    videoControls.removeClass("hidden-op");
    players[playerIndex].play();
    if (namespace == "home") {
      toggle_ui_white();
    }
  } else {
    if (sliderCover.hasClass("hidden-full")) {
      sliderCover.removeClass("hidden-full");
      $(".video-overlay").addClass("hidden-op");
      toggle_ui_white();
      //
      $.each(players, function(index, value) {
        this.pause();
      });
    }
  }
}
