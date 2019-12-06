<article id="post-<?php the_ID(); ?>" class="content-item noActor news text--def">

  <div>
    <img src="<?php the_post_thumbnail_url(); ?>">
    <p class="mr--05"><?php echo get_the_date(); ?></p> <h2><?php the_title(); ?></h2>
    <?php the_content("d m y"); ?>
  </div>
  
</article> 