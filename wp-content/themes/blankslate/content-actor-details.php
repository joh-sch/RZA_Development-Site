<article id="post-<?php the_ID(); ?>" class="content-item actor text--def">

  <header>
    <figure > 
      <img src="<?php the_post_thumbnail_url(); ?>">
    </figure>
  </header>

  <div>
    <h2><?php the_title(); ?></h2>
    <?php the_content(); ?>
  </div>
  
</article> 