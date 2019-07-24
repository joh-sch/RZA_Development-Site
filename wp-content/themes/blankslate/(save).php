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

<div id="site-title">
  <?php if ( is_front_page() || is_home() || is_front_page() && is_home() ) { echo '<h1>'; } ?>
    <a href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php echo esc_html( get_bloginfo( 'name' ) ); ?>" rel="home"><?php echo esc_html( get_bloginfo( 'name' ) ); ?></a>
  <?php if ( is_front_page() || is_home() || is_front_page() && is_home() ) { echo '</h1>'; } ?>
</div>

<div id="site-description"><?php bloginfo( 'description' ); ?></div>

<nav id="menu">
  <?php wp_nav_menu( array( 'theme_location' => 'main-menu' ) ); ?>
</nav>


<!-- Parts of original footer.php -->

<div id="copyright">
  &copy; <?php echo esc_html( date_i18n( __( 'Y', 'blankslate' ) ) ); ?> <?php echo esc_html( get_bloginfo( 'name' ) ); ?>
</div>


<!-- Content loops -->

<?php query_posts('cat=6'); ?>
<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
  <div id="post-<?php the_ID(); ?>" class="<?php foreach((get_the_category()) as $category){echo $category->name;} ?> content-item text--def">
    <h2><?php the_title(); ?></h2>
    <?php the_content(); ?>
  </div>
<?php endwhile; endif; ?>
<?php wp_reset_query(); ?>


<div id="ajax-posts" class="row">
  <?php
    $args = array('cat' => 6, 'posts_per_page' => 10);
    $loop = new WP_Query($args); 
  ?>
  
  <?php while ($loop->have_posts()) : $loop->the_post(); ?>
    <div id="post-<?php the_ID(); ?>" class="<?php foreach((get_the_category()) as $category){echo $category->name;} ?> content-item text--def">
      <h2><?php the_title(); ?></h2>
      <?php the_content(); ?>
    </div>
  <?php endwhile; ?>

  <?php wp_reset_postdata(); ?>
</div>



<!-- Org. entry.php -->

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

  <header>

    <?php if ( is_singular() ) {
      echo '<h1 class="entry-title">';
    } else {
      echo '<h2 class="entry-title">';
    } ?>

      <a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>" rel="bookmark">
        <?php the_title(); ?>
        <span>Still testing…</span>
      </a>

    <?php if ( is_singular() ) {
      echo '</h1>';
    } else {
      echo '</h2>';
    } ?> 
    
    <?php edit_post_link(); ?>

    <?php if ( ! is_search() ) { get_template_part( 'entry', 'meta' ); } ?>
  </header>

  <?php get_template_part( 'entry', ( is_front_page() || is_home() || is_front_page() && is_home() || is_archive() || is_search() ? 'summary' : 'content' ) ); ?>
  <?php if ( is_singular() ) { get_template_part( 'entry-footer' ); } ?>
  
</article>