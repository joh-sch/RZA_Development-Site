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
      <section id="content_mobile" data-namespace="<?php echo get_the_title(); ?>" class="text--def bg--white default-container mobile">
        <!-- »Kontakt« content -->
        <?php $page = get_page_by_title('Kontakt');
              $content = '<div class="content-item text--def">' . $page->post_content . '</div>';
              echo $content ?>

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
          <div class="collapsible--content text--def mb--1-plus">
            <?php the_field('impressum') ?>
          </div>
          <button class="collapsible--button text text--lg text--b">Datenschutz</button>
          <div class="collapsible--content text--def">
            <?php the_field('datenschutz') ?>
          </div>
        </div>
      </section>
    <?php else: ?>
      <!-- Content Sections -->
      <section id="content_left" data-namespace="<?php echo get_the_title(); ?>" class="w--50 noActor">
        <section id="content_left_items">
          
          <!-- Load »Kontakt« content -->
          <?php $page = get_page_by_title('Kontakt');
                $content = '<div class="content-item text--def">' . $page->post_content . '</div>';
                echo $content ?>

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
            <div class="collapsible--content text--def mb--1-plus">
              <?php the_field('impressum') ?>
            </div>
            <button class="collapsible--button text text--lg text--b">Datenschutz</button>
            <div class="collapsible--content text--def">
              <?php the_field('datenschutz') ?>
            </div>
          </div>

        </section>
      </section>
      <!-- Zig-Zag -->
      <?php get_template_part('templates/snippets/zigzag'); ?>
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

  <!-- Standalone Inits -->
  <script>
    jQuery(document).ready(function($) {
      init_collapsibles()
    });
  </script>

<?php get_template_part( 'templates/snippets/footer'); ?>