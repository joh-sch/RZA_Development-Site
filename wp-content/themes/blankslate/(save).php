<!-- Original index.php -->

<?php get_template_part( 'templates/snippets/header'); ?>

  <main id="content">

    <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
      <?php get_template_part( 'entry' ); ?>
      <?php comments_template(); ?>
    <?php endwhile; endif; ?>

    <?php get_template_part( 'nav', 'below' ); ?>

  </main>

<?php get_sidebar(); ?>

<?php get_template_part( 'templates/snippets/footer'); ?>


<!-- Parts of original header.php -->

<div id="site-description"><?php bloginfo( 'description' ); ?></div>

<nav id="menu">
  <?php wp_nav_menu( array( 'theme_location' => 'main-menu' ) ); ?>
</nav>