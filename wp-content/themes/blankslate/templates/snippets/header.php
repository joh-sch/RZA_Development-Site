<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<meta name="viewport" content="width=device-width" />
<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

  <div id="wrapper" class="hfeed">

    <header id="header">
      <div id="nav_main" class="d--flex text--lg w--100 dev-bg--1">

        <div class="f1">
          <div class="d--flex v">
            <?php 
              $menu = wp_get_nav_menu_object('Hauptmenü');  
              $menu_items = wp_get_nav_menu_items($menu->term_id);

              foreach ( (array) $menu_items as $key => $menu_item ) {
                $title = $menu_item->title;
                $url = $menu_item->url;
                $menu_link = '<a class="align-left">' . $title . '</a>';

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

                // if ($title == 'News') {
                //   $status = 'active';
                // } else {
                //   $status = 'inactive';
                // }

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
          <a>RZ A</a>
        </div>
        
      </div>  
    </header>

    <div id="container">