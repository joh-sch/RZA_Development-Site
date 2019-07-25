// Setting up event
(function($) {
  // Utility functions
  function find_content_cat(element) {
    return element.attr("data-content-cat");
  }

  // AJAX function
  $(document).on("click", ".content-link", function(event) {
    event.preventDefault();
    //
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
        $("#content_left").empty();
        $("#content_left").append(content);
      }
    });
  });
})(jQuery);
