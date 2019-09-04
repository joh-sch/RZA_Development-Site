<header id="header_mob" class="z--high hidden--desktop--flex v">

  <div class="d--flex btw">
    <!-- Menu-Button -->
    <button id="button_nav_mob" class="text--xlg" onclick="toggle_mobile_menu()">+</button>

    <!-- Brand -->
    <a id="brand_link_mob" class="nobreak" href="<?php echo get_home_url(); ?>">RZ A</a>
  </div>

  <!-- Links -->
  <div id="nav_links_mob" class="d--flex v hidden--dis text--lg text--b">

    <?php 
      $menu = wp_get_nav_menu_object('Hauptmenü');  
      $menu_items = wp_get_nav_menu_items($menu->term_id);
      //
      foreach ( (array) $menu_items as $key => $menu_item ) {
        $title = $menu_item->title;
        $url = $menu_item->url;
        $cat = $menu_item->object_id;
        $menu_link = '<a class="actor-link mb--05" data-content-cat="' . $cat . '">' . $title . '</a>';
        //
        echo $menu_link;
      } 
    ?>

    <?php 
      $menu = wp_get_nav_menu_object('Untermenü');  
      $menu_items = wp_get_nav_menu_items($menu->term_id);

      foreach ( (array) $menu_items as $key => $menu_item ) {
        $title = $menu_item->title;
        $url = $menu_item->url;
        $cat = $menu_item->object_id;
        //
        $menu_link = '<span class="content-link mb--05" data-content-cat="' . $title . '" ><a>' . $title . '</a></span>';
        echo $menu_link;
      }
    ?>

  </div>
</header>