<?php get_template_part( 'templates/snippets/header'); ?>

  <main id="content" class="d--flex">
    
    <!-- Content Sections -->
    <section id="content_left" data-namespace="News" class="w--50">
      <article id="post-<?php the_ID(); ?>" class="content-item actor text--def">
        
        <?php $images = get_field('bildergalerie');?>

        <header>
          <div class="actor-carousel-overlay z--up">
            <div class="slider-counter text--def">1/3</div>
            <button class="slider-button prev" onclick="slider_prev()"></button>
            <button class="slider-button next" onclick="slider_next()"></button>
          </div>
          <div class="actor-carousel">
            <?php if( $images ): ?>
              <?php foreach( $images as $image ): ?>
                <div class="carousel-cell">
                  <img src="<?php echo $image['url']; ?>">
                </div>
              <?php endforeach; ?>
            <?php endif; ?>
          </div>
        </header>

        <div class="px--2 pt--2">
          <div class="mb--1">
            <h1 class="text--b"><?php the_title(); ?></h1>
            <span>*<?php the_field('geburtsjahr'); ?></span>
          </div>

          <?php 
            $post_id = get_the_ID();
            global $post; 
            $post = get_post($post_id); 
            setup_postdata($post);
          ?>
          
          <?php if( have_rows('lebenslauf') ): ?>
            <?php while ( have_rows('lebenslauf') ) : the_row(); ?>
              <section class="mb--1">
                <h2><?php the_sub_field('jahr'); ?></h2>

                <?php if( have_rows('produktionen') ): ?>
                  <?php while ( have_rows('produktionen') ) : the_row(); ?>
                    <div class="text--il">
                      <p class="h2"><?php the_sub_field('titel'); ?></p>
                      <span>Regie: <?php the_sub_field('regie'); ?></span>
                    </div>
                  <?php endwhile ?>
                <?php endif ?>

              </section> 
            <?php endwhile ?>
          <?php endif ?>
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