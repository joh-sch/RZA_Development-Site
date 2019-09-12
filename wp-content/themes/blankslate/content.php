<article id="post-<?php the_ID(); ?>" class="content-item noActor news text--def">

  <div>
    <img src="<?php the_post_thumbnail_url(); ?>">
    <h2><?php the_title(); ?></h2>
    <?php the_content(); ?>
  </div>
  
</article> 