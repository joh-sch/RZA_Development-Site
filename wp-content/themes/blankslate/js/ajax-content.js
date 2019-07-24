// Setting up event
(function($) {
  $(document).on("click", "#postload", function(event) {
    event.preventDefault();
    $.ajax({
      url: ajaxcontent.ajaxurl,
      type: "post",
      data: {
        action: "ajax_content"
      },
      success: function(result) {
        alert(result);
      },
      error: function(result) {
        alert("Error");
      }
    });
  });
})(jQuery);
