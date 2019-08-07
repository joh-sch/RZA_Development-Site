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
    <div>
      <h1 class="text--b"><?php the_title(); ?></h1>
      <span>*<?php the_field('geburtsjahr'); ?></span>
    </div>
    <?php echo preg_replace('/<img[^>]+./','',get_the_content()); ?>
  </div>
  
</article> 