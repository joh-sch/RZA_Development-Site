jQuery(function(e){function r(e){for(var n=r.options,t=n.parser[n.strictMode?"strict":"loose"].exec(e),s={},a=14;a--;)s[n.key[a]]=t[a]||"";return s[n.q.name]={},s[n.key[12]].replace(n.q.parser,function(e,r,t){r&&("queryKey"===n.q.name&&(t=t.replace("+"," "),r=decodeURIComponent(r),t=decodeURIComponent(t)),s[n.q.name][r]=t)}),s}r.options={strictMode:!1,key:["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],q:{name:"queryKey",parser:/(?:^|&)([^&=]*)=?([^&]*)/g},parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}};var n=r(location.href),t={uri:null,link:null,matchingParams:-1,differentParams:1e4,isAnchorMatch:!1,isTopMenu:!1,isHighlighted:!1};n.path.match(/\/wp-admin\/$/)&&(n.path=n.path+"index.php"),"edit.php"!==n.file&&"post-new.php"!==n.file||n.queryKey.hasOwnProperty("post_type")||(n.queryKey.post_type="post");var s=e("#adminmenu");if(s.find("li > a").each(function(s,a){var u=e(a);if(u.is("[href]")&&"#"!==u.attr("href").substring(0,1)){var o=r(a.href);"edit.php"!==o.file&&"post-new.php"!==o.file||o.queryKey.hasOwnProperty("post_type")||(o.queryKey.post_type="post");for(var i=["protocol","host","port","user","password","path"],p=!0,c=0;c<i.length&&p;c++)p=p&&o[i[c]]===n[i[c]];if(p){var l,h=0,m=0;for(l in o.queryKey)if(o.queryKey.hasOwnProperty(l))if(n.queryKey.hasOwnProperty(l)){if(o.queryKey[l]!==n.queryKey[l])return;h++}else m++;for(l in n.queryKey)n.queryKey.hasOwnProperty(l)&&!o.queryKey.hasOwnProperty(l)&&m++;for(var d=o.anchor===n.anchor,y=u.hasClass("menu-top"),f=u.is(".current, .wp-has-current-submenu"),w=[{better:h>t.matchingParams,equal:h===t.matchingParams},{better:m<t.differentParams,equal:m===t.differentParams},{better:d&&!t.isAnchorMatch,equal:d===t.isAnchorMatch},{better:!y&&t.isTopMenu&&(!t.link||u.closest(t.link.closest("li")).length>0),equal:y===t.isTopMenu},{better:f&&!t.isHighlighted,equal:f===t.isHighlighted}],q=!1,g=!0,b=0;g&&!q&&b<w.length;)q=w[b].better,g=w[b].equal,b++;q&&(t={uri:o,link:u,matchingParams:h,differentParams:m,isAnchorMatch:d,isTopMenu:y,isHighlighted:f})}}}),null!==t.link){var a=t.link,u=a.closest("li.menu-top"),o=e("li.wp-has-current-submenu, li.menu-top.current","#adminmenu").not(u).not(".ws-ame-has-always-open-submenu"),i=!a.hasClass("current");if(!u.is(".wp-has-current-submenu, .current")||o.length>0){!e("div.expand-arrow","#adminmenu").get(0)&&o.add("> a",o).removeClass("wp-menu-open wp-has-current-submenu current").addClass("wp-not-current-submenu");var p=u.add("> a.menu-top",u);p.removeClass("wp-not-current-submenu"),u.hasClass("wp-has-submenu")&&p.addClass("wp-has-current-submenu wp-menu-open"),"object"==typeof window.stickyMenu&&"function"==typeof window.stickyMenu.update?window.stickyMenu.update():e(document).trigger("wp-window-resized"),"function"==typeof u.off&&u.off("focusin.adminmenu")}i&&(s.find(".current").removeClass("current"),a.addClass("current").closest("li").addClass("current"))}var c=e(".wp-submenu a.current","#adminmenu").closest(".menu-top");c.add("> a.menu-top",c).removeClass("wp-not-current-submenu").addClass("wp-has-current-submenu wp-menu-open")});