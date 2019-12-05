//
// Init of split panes
//

jQuery(document).ready(function($) {
  // Split panes
  Split(["#content_left", "#content_right"], {
    gutterSize: 20,
    cursor: "col-resize",
    onDrag: function() {
      resize_menu();
      resize_zigzag();
    }
  });
  window.addEventListener(
    "resize",
    function() {
      resize_menu();
      resize_zigzag();
    },
    true
  );
  // Init scrollbars
  window.os_left = $("#content_left")
    .overlayScrollbars({
      className: "os-theme-dark rza left"
    })
    .overlayScrollbars();
  window.os_right = $("#content_right")
    .overlayScrollbars({
      className: "os-theme-dark rza right"
    })
    .overlayScrollbars();
  // Init glow-effect (event-listener)
  $(".gutter").mouseover(function() {
    $("#zigzag").addClass("active");
  });
  $(".gutter").mouseleave(function() {
    $("#zigzag").removeClass("active");
  });
});
