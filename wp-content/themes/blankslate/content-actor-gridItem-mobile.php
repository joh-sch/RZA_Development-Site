<?php 
  $active_post = get_query_var('current_post'); 
  $current_post = get_the_ID();
?>

<a href="/<?php echo sanitize_title_with_dashes(get_the_title()) ?>">
  <div class="grid-item actor mobile" id="<?php echo sanitize_title_with_dashes(get_the_title()) ?>" data-post-id="<?php the_ID() ?>">
    <figure class="d--flex v">
      <div class="grid-item-image mb--06" style="background: url(<?php the_post_thumbnail_url(); ?>); background-size: cover"></div>
      <figcaption class="text--b"><?php the_title(); ?></figcaption>
    </figure>
  </div>
</a>