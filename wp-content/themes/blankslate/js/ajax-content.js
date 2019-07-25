// Function to fetch subpage-content (Agentur, Kontakt, News)

(function($) {
  // Utility functions
  function find_content_cat(element) {
    return element.attr("data-content-cat");
  }
  // AJAX function
  $(document).on("click", ".content-link", function(event) {
    event.preventDefault();
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
        // Change content
        $("#content_left").addClass("hidden--content");
        setTimeout(function() {
          $("#content_left").empty();
          $("#content_left").append(content);
        }, 275);
        setTimeout(function() {
          $("#content_left").removeClass("hidden--content");
        }, 300);
      }
    });
  });
})(jQuery);

// Function to fetch actor-page contetn
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
        $("#content_left").addClass("hidden--content");
        //
        setTimeout(function() {
          $("#content_left").empty();
          $("#content_left").append(content);
        }, 275);
        //
        setTimeout(function() {
          $(".actor-carousel").flickity({
            cellAlign: "left",
            contain: true
          });
          $("#content_left").removeClass("hidden--content");
        }, 300);
      }
    });
  });
})(jQuery);
