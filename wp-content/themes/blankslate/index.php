<?php get_template_part( 'templates/snippets/header'); ?>

  <main id="content" class="d--flex">
    <!-- Content Sections -->

    <section id="content_left" class="w--50 px--2 pt--10">
      <!-- Content Items -->
      <?php query_posts('cat=5'); ?>
      <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
        <div id="post-<?php the_ID(); ?>" class="<?php foreach((get_the_category()) as $category){echo $category->name;} ?> content-item text--def">
          <h2><?php the_title(); ?></h2>
          <?php the_content(); ?>
        </div>
      <?php endwhile; endif; ?>
      <?php wp_reset_query(); ?>

    </section>

    <section id="content_right" class="w--50"></section>

  </main>

<?php get_template_part( 'templates/snippets/footer'); ?>