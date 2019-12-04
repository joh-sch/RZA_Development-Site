<?php get_template_part( 'templates/snippets/header'); ?>

  <main id="content" class="d--flex">
    
    <!-- Navigation Menu -->
    <?php if(wp_is_mobile()) {
      get_template_part( 'templates/snippets/menu_mobile');
    } else {
      get_template_part( 'templates/snippets/menu');
    } ?>
    
    <!-- Site Content -->
    <?php if(wp_is_mobile()): ?>
      <section id="content_mobile" data-namespace="Actors" class="text--def bg--red grid-container mobile">
        <?php $args = array('cat' => array(7,8));
              $loop = new WP_Query($args); ?>

        <?php while ($loop->have_posts()) : $loop->the_post(); ?>
          <?php get_template_part( 'templates/grids/content-actor-gridItem-mobile' ); ?>
        <?php endwhile; ?>
      </section>
    <?php else: ?>
      <!-- Left Content Section -->
      <section id="content_left" data-namespace="<?php if (wp_is_mobile()): ?>Actors<?php else: ?>News<?php endif ?>" class="w--50 text--def noActor <?php if (wp_is_mobile()): ?> grid<?php endif ?>">
        <section id="content_left_items" class="<?php if (wp_is_mobile()): ?> grid-container mobile<?php endif ?>">
          <?php
            if ( wp_is_mobile() ) {
              $args = array('cat' => array(7,8));
            } else {
              $args = array('cat' => 6);
            }
            $loop = new WP_Query($args); 
          ?>

          <?php while ($loop->have_posts()) : $loop->the_post(); ?>
            <?php if ( wp_is_mobile() ): ?>
              <?php get_template_part( 'content-actor' ); ?>
            <?php else: ?>
              <?php get_template_part( 'content' ); ?>
            <?php endif ?>
          <?php endwhile; ?>
        </section>
        <!-- Scroll-Shadow -->
        <div class="glow--scrollshadow"></div>
      </section>
      <!-- Zig-Zag -->
      <?php get_template_part( 'templates/snippets/zigzag'); ?>
      <!-- Right Content Section -->
      <section id="content_right" class="w--50 text--def">
        <div class="grid-container">

          <?php
            $args = array('cat' => array(7,8));
            $loop = new WP_Query($args); 
          ?>

          <?php while ($loop->have_posts()) : $loop->the_post(); ?>
            <?php get_template_part( 'content-actor' ); ?>
          <?php endwhile; ?>
          
        </div>
      </section>
    <?php endif ?>

  </main>

<?php get_template_part( 'templates/snippets/footer'); ?>