<?php get_template_part( 'templates/snippets/header'); ?>

  <main id="content" class="d--flex">
    
    <!-- Content Sections -->
    <section id="content_left" data-namespace="News" class="w--50 noActor">
      <?php
        $args = array('cat' => 6);
        $loop = new WP_Query($args); 
      ?>

      <?php while ($loop->have_posts()) : $loop->the_post(); ?>
        <?php get_template_part( 'content' ); ?>
      <?php endwhile; ?>
    </section>

    <section id="content_right" class="w--50 text--def">
      <div class="grid-container">

        <?php
          $args = array('cat' => 7);
          $loop = new WP_Query($args); 
        ?>

        <?php while ($loop->have_posts()) : $loop->the_post(); ?>
          <?php get_template_part( 'content-actor' ); ?>
        <?php endwhile; ?>
        
      </div>
    </section>

  </main>

<?php get_template_part( 'templates/snippets/footer'); ?>