!function(t){t(document).on("click",".content-link",function(a){a.preventDefault(),cat=t(this).attr("data-content-cat"),t.ajax({url:ajaxcontent.ajaxurl,type:"post",data:{action:"ajax_content",query_vars:ajaxcontent.query_vars,cat:cat},success:function(a){t("#content_left").append(a)}})})}(jQuery);