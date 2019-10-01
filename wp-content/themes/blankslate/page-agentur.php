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
        <?php $page = get_page_by_title('Agentur');
              $content = '<div class="content-item text--def">' . $page->post_content . '</div>';
              echo $content ?>
      </section>
    <?php else: ?>
      <!-- Content Sections -->
      <section id="content_left" data-namespace="<?php echo get_the_title(); ?>" class="w--50 noActor <?php if (wp_is_mobile()): ?> grid<?php endif ?>">
        <section id="content_left_items" class="<?php if (wp_is_mobile()): ?> grid-container mobile<?php endif ?>">
          
          <!-- Load »Agentur« content -->
          <?php 
            $page = get_page_by_title('Agentur');
            $content = '<div class="content-item text--def">' . $page->post_content . '</div>';
            echo $content
          ?>

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
    <?php endif ?>

  </main>

<?php get_template_part( 'templates/snippets/footer'); ?>