jQuery(document).ready(function(e){Split(["#content_left","#content_right"],{gutterSize:50,cursor:"col-resize",onDrag:function(){resize_menu(),resize_zigzag()}});var t=document.getElementsByClassName("gutter"),r=document.createElement("img");r.src="http://localhost:8888/wp-content/uploads/2019/08/rz_zigzag_rot_v.png",t[0].appendChild(r),window.os_left=e("#content_left").overlayScrollbars({className:"os-theme-dark rza left"}).overlayScrollbars(),window.os_right=e("#content_right").overlayScrollbars({className:"os-theme-dark rza right"}).overlayScrollbars()});