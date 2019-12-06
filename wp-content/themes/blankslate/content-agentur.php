<?php 
  $page = get_page_by_title('Agentur');
  $content = '<div class="content-item columns text--def">' . $page->post_content . '</div>';
  echo $content
?>