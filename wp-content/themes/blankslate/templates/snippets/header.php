<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<meta name="viewport" content="width=device-width" />
<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

  <div id="wrapper" class="hfeed">

    <header id="header" class="z--high">
      <button id="button_nav" class="text text--lg" onclick="toggle_menu()">
        +
      </button>
      
      <div id="nav_main" class="d--flex text--lg text--b w--100">

        <div class="f1">
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
                  $menu_link = '<span class="list content-link" data-content-cat="' . $title . '" ><a>' . $title . '</a></span>';
                  echo $menu_link;
                } else {
                  $menu_link = '<span class="list content-link" data-content-cat="' . $cat . '" ><a data-namespace="' . $title . '">' . $title . '</a></span>';
                  echo $menu_link;
                }
              }
            ?>
          </div>
        </div>

        <div class="f1 d--flex h right align-top">
          <a href="<?php echo get_home_url(); ?>">RZ A</a>
        </div>
        
      </div>  
    </header>

    <div id="container">