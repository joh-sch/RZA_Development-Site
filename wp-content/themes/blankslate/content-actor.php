<?php 
  $active_post = get_query_var('current_post'); 
  $current_post = get_the_ID();
  $status = 'undefined';

  if($current_post == $active_post ) {
    $status = 'active';
  } else {
    $status = 'inactive';
  };
?>

<div class="grid-item actor <?php echo $status ?>" id="<?php echo sanitize_title_with_dashes(get_the_title()) ?>" data-post-id="<?php the_ID() ?>">
  <figure > 
    <img src="<?php the_post_thumbnail_url(); ?>">
    <figcaption><?php the_title(); ?></figcaption>
  </figure>
</div>