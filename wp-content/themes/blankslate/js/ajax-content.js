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
        // Change namespace
        if (cat == "6") {
          var namespace = "News";
          $("#content_left").attr("data-namespace", namespace);
        }
        // Determine display-status of #content_right
        var display_status_r = $("#content_right").css("display");
        // (Re-)place content
        if (display_status_r == "block") {
          $("#content_left_items").addClass("hidden--content");

          setTimeout(function() {
            $("#content_left_items")
              .find("article, .content-item")
              .remove();
            $("#content_left_items").append(content);
            //
            $("#content_left").removeClass("actor");
            $("#content_left").addClass("noActor");
          }, 275);
          setTimeout(function() {
            reset_scrollbars_left();
            $("#content_left_items").removeClass("hidden--content");
          }, 300);
        } else {
          alert("Site is viewed in mobile resolution…");
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
        var display_status_r = $("#content_right").css("display");
        //
        if (display_status_r == "block") {
          $("#content_left").addClass("hidden--content");
          hide_menu();
          //
          setTimeout(function() {
            $("#content_left_items")
              .find("article, .content-item")
              .remove();
            $("#content_left_items").append(content);
            //
            $("#content_left").removeClass("noActor");
            $("#content_left").addClass("actor");
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
            reset_scrollbars_left();
            $("#content_left").removeClass("hidden--content");
          }, 300);
        } else {
          alert("Site is viewed in mobile resolution…");
        }
      }
    });
  });
})(jQuery);

// Function to fetch actors (based on category of clicked nav-link)
(function($) {
  $(document).on("click", ".actor-link", function(event) {
    event.preventDefault();
    //
    var grid = $("#content_right .grid-container");
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
}
function slider_prev() {
  $sliderActor.flickity("previous");
  slider_update_counter();
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
