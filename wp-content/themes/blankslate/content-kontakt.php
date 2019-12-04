<?php 
$post = get_post(25); 
setup_postdata($post);
?>

<!-- ”Kontakt" Content -->
<div class="content-item text--def">
  <?php $page = get_page_by_title("Kontakt"); ?>
  <?php  echo $page->post_content ?>
</div>

<!-- Social Media -->
<div class="content-item text--lg">
  <?php if(have_rows("social_media")): ?>
    <?php while ( have_rows('social_media') ) : the_row(); ?>
      <a href="<?php the_sub_field("instagram") ?>" target="_blank"><i class="fab fa-instagram mr--1"></i></a>
      <a href="<?php the_sub_field("facebook") ?>" target="_blank"><i class="fab fa-facebook-f mr--1"></i></a>
      <a href="<?php the_sub_field("twitter") ?>" target="_blank"><i class="fab fa-twitter"></i></a>
    <?php endwhile ?>
  <?php endif ?>
</div>

<!-- Imprint & PP -->
<div class="content-item">
  <button class="collapsible--button text text--lg text--b">Impressum</button>
  <div class="collapsible--content text--def mb--1-plus">
    <?php the_field('impressum') ?>
  </div>
  <button class="collapsible--button text text--lg text--b">Datenschutz</button>
  <div class="collapsible--content text--def">
    <?php the_field('datenschutz') ?>
  </div>
</div>