<header id="header" class="z--high hidden--mobile <?php if(is_single()): ?>off<?php endif ?>">

  <!-- Menu-button -->
  <button id="button_nav" class="text text--lg <?php if(!is_single()): ?>hidden--off<?php endif ?>">+</button>
  
  <!-- Menu -->
  <div id="nav_main" class="d--flex btw text--lg text--b w--100 <?php if(is_single()): ?>hidden--off<?php endif ?>">

    <!-- Links -->
    <div>
      <div class="d--flex v">
        <?php 
          $menu = wp_get_nav_menu_object('Hauptmenü');  
          $menu_items = wp_get_nav_menu_items($menu->term_id);
          //
          foreach ( (array) $menu_items as $key => $menu_item ) {
            $title = $menu_item->title;
            $url = $menu_item->url;
            $cat = $menu_item->object_id;
            $menu_link = '<a class="align-left actor-link" data-content-cat="' . $cat . '">' . $title . '</a>';
            //
            echo $menu_link;
          }
        ?>
      </div>

      <div class="d--flex h">
        <?php 
          $menu = wp_get_nav_menu_object('Untermenü');  
          $menu_items = wp_get_nav_menu_items($menu->term_id);

          foreach ( (array) $menu_items as $key => $menu_item ) {
            $title = $menu_item->title;
            $url = $menu_item->url;
            $cat = $menu_item->object_id;
            //
            if($title == 'Agentur' || $title == 'Kontakt') {
              $menu_link = '<span class="list menu-link content-link" data-content-cat="' . $title . '" ><a>' . $title . '</a></span>';
              echo $menu_link;
            } else {
              $menu_link = '<span class="list menu-link content-link" data-content-cat="' . $title . '" ><a>' . $title . '</a></span>';
              echo $menu_link;
            }
          }
        ?>
      </div>
    </div>

    <!-- Brand -->
    <a id="brand_link" class="nobreak" href="<?php echo get_home_url(); ?>">RZ A</a>
  </div> 
  
  <!-- Glow -->
  <div id="glow_nav" class="glow--menu"></div>
</header>