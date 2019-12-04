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
        <?php $args = array('cat' => array(7));
              $loop = new WP_Query($args); ?>

        <?php while ($loop->have_posts()) : $loop->the_post(); ?>
          <?php get_template_part( 'templates/grids/content-actor-gridItem-mobile' ); ?>
        <?php endwhile; ?>
      </section>

    <?php else: ?>

    <?php endif ?>

  </main>

<?php get_template_part( 'templates/snippets/footer'); ?>