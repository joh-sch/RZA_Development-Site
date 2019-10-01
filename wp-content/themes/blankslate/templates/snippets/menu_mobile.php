<?php $current_category = single_cat_title("", false); ?>
<header id="header_mob_wrapper" class="z--high d--flex v btw <?php if( get_the_title() == "Kontakt" || get_the_title() == "Agentur" || $current_category == "News" ): ?>red<?php else: ?>white<?php endif; ?>">

  <div id="header_mob_content" class="d--flex btw">
    <button id="button_nav_mob" class="text--lg-xl mb--05"></button>
    <a id="brand_link_mob" class="nobreak" href="<?php echo get_home_url(); ?>">RZ A</a>
  </div>

  <!-- Links -->
  <div id="nav_links_mob" class="d--flex v hidden--dis text--lg-plus text--b h--100">
    <?php 
      $menu = wp_get_nav_menu_object('Hauptmenü');  
      $menu_items = wp_get_nav_menu_items($menu->term_id);
      //
      foreach ( (array) $menu_items as $key => $menu_item ) {
        $title = $menu_item->title;
        $menu_link = '<a class="navigation-link mb--1" href="/page/' . strtolower($title) . '">' . $title . '</a>';
        //
        echo $menu_link;
      } 
    ?>

    <?php 
      $menu = wp_get_nav_menu_object('Untermenü');  
      $menu_items = wp_get_nav_menu_items($menu->term_id);

      foreach ( (array) $menu_items as $key => $menu_item ) {
        $title = $menu_item->title;
        if($title == "News"){ $link_prefix = "/page";};
        $menu_link = '<a class="navigation-link mb--1" href="' . $link_prefix . '/' . strtolower($title) . '" >' . $title . '</a>';
        echo $menu_link;
      }
    ?>
  </div>

  <!-- Zick-Zack -->
  <img class="w--100" id="zigzag_mob_w" src="<?php echo get_home_url(); ?>/wp-content/uploads/2019/09/rz_zigzag_weiss.png">
  <img class="w--100" id="zigzag_mob_r" src="<?php echo get_home_url(); ?>/wp-content/uploads/2019/09/rz_zigzag_mob_rot.png">

</header>