<?php get_template_part( 'templates/snippets/header'); ?>

  <main id="content" class="d--flex">
    
    <!-- Nav-Menu -->
    <?php get_template_part( 'templates/snippets/menu'); ?>
    
    <!-- Content Sections -->
    <section id="content_left" data-namespace="<?php echo get_the_title(); ?>" class="w--50 noActor <?php if (wp_is_mobile()): ?> grid<?php endif ?>">
      <section id="content_left_items" class="<?php if (wp_is_mobile()): ?> grid-container mobile<?php endif ?>">
        
        <!-- Load »Kontakt« content -->
        <?php 
          $page = get_page_by_title('Kontakt');
          $content = '<div class="content-item text--def">' . $page->post_content . '</div>';
          echo $content
        ?>

        <!-- Social Media -->
        <div class="content-item text--lg">
          <?php if(have_rows("social_media")): ?>
            <?php while ( have_rows('social_media') ) : the_row(); ?>
              <a href="<?php the_sub_field("instagram") ?>" target="_blank"><i class="fab fa-instagram mr--1"></i></a>
              <a href="<?php the_sub_field("facebook") ?>" target="_blank"><i class="fab fa-facebook-f mr--1"></i></a>
              <a href="<?php the_sub_field("twitter") ?>" target="_blank"><i class="fab fa-twitter"></i></a>
            <?php endwhile ?>
          <?php endif ?>
        </div>

        <!-- Imprint & PP -->
        <div class="content-item">
          <button class="collapsible--button text text--lg text--b">Impressum</button>
          <div class="collapsible--content text--def">
            <p><?php the_field('impressum') ?></p>
          </div>
          <button class="collapsible--button text text--lg text--b">Datenschutz</button>
          <div class="collapsible--content text--def">
            <p><?php the_field('datenschutz') ?></p>
          </div>
        </div>

      </section>
    </section>

    <!-- Zig-Zag -->
    <?php get_template_part( 'templates/snippets/zigzag'); ?>

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

  <!-- Standalone Inits -->
  <script>
    jQuery(document).ready(function($) {
      init_collapsibles()
    });
  </script>

<?php get_template_part( 'templates/snippets/footer'); ?>