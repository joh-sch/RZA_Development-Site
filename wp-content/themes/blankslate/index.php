<?php get_template_part( 'templates/snippets/header'); ?>

  <main id="content" class="d--flex">
    
    <!-- Nav-Menu -->
    <?php get_template_part( 'templates/snippets/menu'); ?>
    
    <!-- Left Content Section -->
    <section id="content_left" data-namespace="News" class="w--50 noActor <?php if (wp_is_mobile()): ?> grid<?php endif ?>">
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

      <!-- Zig-Zag -->
      <div class="zigzag-container">
        <img src="http://localhost:8888/wp-content/uploads/2019/08/rz_zigzag_rot_v.png">
      </div>
    
    </section>

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

  </main>

<?php get_template_part( 'templates/snippets/footer'); ?>