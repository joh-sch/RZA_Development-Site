<?php get_template_part( 'templates/snippets/header'); ?>

  <main id="content" class="d--flex">
    
    <!-- Content Sections -->
    <section id="content_left" data-namespace="News" class="w--50">
      <article id="post-<?php the_ID(); ?>" class="content-item actor text--def">
        <?php $images = get_attached_media( 'image' ); ?>

        <header>
          <div class="actor-carousel-overlay z--up">
            <div class="slider-counter text--def">1/3</div>
            <button class="slider-button prev" onclick="slider_prev()"></button>
            <button class="slider-button next" onclick="slider_next()"></button>
          </div>
          <div class="actor-carousel">
            <?php foreach ( $images as $image ): ?>
              <div class="carousel-cell">
                <img src="<?php echo wp_get_attachment_url($image->ID) ?>">
              </div>
            <?php endforeach; ?>
          </div>
        </header>

        <div class="px--2 pt--2">
          <h1 class="text--b"><?php the_title(); ?></h1>
          <span>*<?php the_field('geburtsjahr'); ?></span>
          <?php 
            $post_id = get_the_ID();
            global $post; 
            $post = get_post($post_id); 
            setup_postdata($post);
            echo preg_replace('/<img[^>]+./','',get_the_content()); 
          ?>
        </div>
      </article>
    </section>

    <section id="content_right" class="w--50 text--def">
      <div class="grid-container">

        <?php
          $args = array('cat' => array(7,8));
          $loop = new WP_Query($args); 
        ?>

        <?php while ($loop->have_posts()) : $loop->the_post(); ?>
          <?php set_query_var('current_post', $post_id); ?>
          <?php get_template_part( 'content-actor' ); ?>
        <?php endwhile; ?>
        
      </div>
    </section>

  </main>

  <!-- Standalone slider-init -->
  <script>
    window.$sliderActor = jQuery(".actor-carousel").flickity({
      cellAlign: "left",
      contain: true,
      pageDots: false,
      prevNextButtons: false,
      wrapAround: true,
      draggable: false,
      lazyLoad: 2
    });
  </script>

<?php get_template_part( 'templates/snippets/footer'); ?>