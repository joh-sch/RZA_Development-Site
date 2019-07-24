// Setting up event
(function($) {
  function find_content_cat(element) {
    return element.attr("data-content-cat");
  }

  $(document).on("click", ".content-link", function(event) {
    event.preventDefault();

    cat = find_content_cat($(this));

    $.ajax({
      url: ajaxcontent.ajaxurl,
      type: "post",
      data: {
        action: "ajax_content",
        query_vars: ajaxcontent.query_vars,
        cat: cat
      },
      success: function(content) {
        $("#content_left").empty();
        $("#content_left").append(content);
      }
    });
  });
})(jQuery);
