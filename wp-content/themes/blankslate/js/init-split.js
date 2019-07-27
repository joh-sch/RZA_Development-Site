//
// Init of split panes
//

jQuery(document).ready(function($) {
  Split(["#content_left", "#content_right"], {
    gutterSize: 8,
    cursor: "col-resize"
  });
});
