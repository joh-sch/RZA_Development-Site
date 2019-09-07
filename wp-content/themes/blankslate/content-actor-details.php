<article id="post-<?php the_ID(); ?>" class="content-item actor text--def">

  <?php $images = get_field('bildergalerie');?>

  <!-- Photo & Video Content -->
  <header>
    <!-- Slider-Overlay -->
    <div id="slider_overlay" class="actor-carousel-overlay z--up text--def color_black">
      <div class="slider-counter">1/3</div>
      <button class="slider-button prev" onclick="slider_prev()"></button>
      <button class="slider-button next" onclick="slider_next()"></button>
      <div class="video-controls hidden--off">
        <button class="play mr--05"></button>
        <button class="fullscreen"></button>
      </div>
    </div>

    <!-- Slider -->
    <div class="actor-carousel">
      <!-- Photo-Slides -->
      <?php if( $images ): ?>
        <?php foreach( $images as $image ): ?>
          <div class="carousel-cell">
            <img src="<?php echo $image['url']; ?>">
          </div>
        <?php endforeach; ?>
      <?php endif; ?>
      <!-- Video-Slide -->
      <div class="carousel-cell video-cell">
        <video class="cld-video-player cld-video-player-skin-dark" data-cld-public-id="Clients/Client_RZA/raeuber">
        </video>
      </div>
    </div>
  </header>

  <!-- Text Content -->
  <div class="p--mob-1-desk-2">
    <div class="mb--1">
      <h1 class="text--b"><?php the_title(); ?></h1>
      <span>*<?php the_field('geburtsjahr'); ?></span>
    </div>

    <?php if( have_rows('lebenslauf') ): ?>
      <?php $all_items_count = count(get_field('lebenslauf'));
            $item_count = 1;
            ?>
      <?php while ( have_rows('lebenslauf') ) : the_row(); ?>
        <section class="mb--1 <?php if ($item_count == $all_items_count): ?>mb--2 <?php endif ?>">
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
        <?php $item_count++; ?>

      <?php endwhile ?>
    <?php endif ?>

    <h2 class="mb--1">Weitere Produktionen</h2>

    <?php if( have_rows('lebenslauf_weitere') ): ?>
      <?php while ( have_rows('lebenslauf_weitere') ) : the_row(); ?>
        <section class="mb--1">
          <h2><?php the_sub_field('jahr'); ?></h2>

          <?php if( have_rows('produktionen') ): ?>
            <?php while ( have_rows('produktionen') ) : the_row(); ?>
              <div class="text--il">
                <p class="h2"><?php the_sub_field('titel'); ?></p>
                <span><?php the_sub_field('regie'); ?></span>
              </div>
            <?php endwhile ?>
          <?php endif ?>

        </section> 
      <?php endwhile ?>
    <?php endif ?>
  </div>
  
</article> 