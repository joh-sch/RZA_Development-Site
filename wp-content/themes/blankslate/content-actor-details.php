<article id="post-<?php the_ID(); ?>" class="content-item actor text--def">

  <?php $images = get_attached_media( 'image' ); ?>

  <header>
    <div class="actor-carousel">
      
      <?php foreach ( $images as $image ): ?>
        <div class="carousel-cell">
          <img src="<?php echo wp_get_attachment_url($image->ID) ?>">
        </div>
      <?php endforeach; ?>
      
    </div>
  </header>

  <div>
    <h2><?php the_title(); ?></h2>
    <?php echo preg_replace('/<img[^>]+./','',get_the_content()); ?>
  </div>
  
</article> 