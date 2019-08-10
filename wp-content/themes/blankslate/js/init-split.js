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
  // window.os_left = OverlayScrollbars(document.getElementById("content_left"), {
  //   className: "os-theme-dark flo"
  // });

  window.os_left = $("#content_left")
    .overlayScrollbars({})
    .overlayScrollbars();
});
