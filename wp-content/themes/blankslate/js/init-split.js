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
      resize_zigzag();
    }
  });
  // Append Zig-Zag element to split handler
  var handler = document.getElementsByClassName("gutter");
  var zigzag = document.createElement("img");
  //
  zigzag.src =
    "http://localhost:8888/wp-content/uploads/2019/08/rz_zigzag_rot_v.png";
  handler[0].appendChild(zigzag);

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
