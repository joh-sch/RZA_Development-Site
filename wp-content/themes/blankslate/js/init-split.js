//
// Init of split panes
//

jQuery(document).ready(function($) {
  // Split panes
  Split(["#content_left", "#content_right"], {
    gutterSize: 8,
    cursor: "col-resize"
  });
  // Init scrollbars
  $("#content_left").overlayScrollbars({
    className: "os-theme-dark flo"
  });
  $("#content_right").overlayScrollbars({
    className: "os-theme-dark flo"
  });
});
