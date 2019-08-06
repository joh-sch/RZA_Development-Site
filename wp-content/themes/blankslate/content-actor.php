<div class="grid-item actor" id="<?php echo sanitize_title_with_dashes(get_the_title()) ?>" data-post-id="<?php the_ID() ?>">
  <figure > 
    <img src="<?php the_post_thumbnail_url(); ?>">
    <figcaption><?php the_title(); ?></figcaption>
  </figure>
</div>