<?php get_template_part( 'templates/snippets/header'); ?>

  <main id="content">

    <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
      
    <?php endwhile; endif; ?>

    <?php get_template_part( 'nav', 'below' ); ?>

  </main>

<?php get_template_part( 'templates/snippets/footer'); ?>