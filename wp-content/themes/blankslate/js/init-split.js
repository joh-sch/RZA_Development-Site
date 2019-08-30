//
// Init of split panes
//

jQuery(document).ready(function($) {
  // Split panes
  Split(["#content_left", "#content_right"], {
    gutterSize: 50,
    cursor: "col-resize",
    onDrag: function() {
      resize_menu();
    }
  });

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
});
