<?php
add_action( 'after_setup_theme', 'blankslate_setup' );
function blankslate_setup() {
load_theme_textdomain( 'blankslate', get_template_directory() . '/languages' );
add_theme_support( 'title-tag' );
add_theme_support( 'automatic-feed-links' );
add_theme_support( 'post-thumbnails' );
add_theme_support( 'html5', array( 'search-form' ) );
global $content_width;
if ( ! isset( $content_width ) ) { $content_width = 1920; }
register_nav_menus( array( 'main-menu' => esc_html__( 'Main Menu', 'blankslate' ) ) );
}
add_action( 'wp_enqueue_scripts', 'blankslate_load_scripts' );


// Load additional CSS & JS
  function blankslate_load_scripts() {
    wp_enqueue_style( 'blankslate-style', get_stylesheet_uri() );
    wp_enqueue_script( 'jquery' );

    wp_enqueue_script('flickity', 'https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js');
    
    wp_enqueue_script( 'ajax-content',  get_template_directory_uri() . '/js/ajax-content.js', array( 'jquery' ), '1.0', true );
    global $wp_query;
    wp_localize_script( 'ajax-content', 'ajaxcontent', array(
      'ajaxurl' => admin_url( 'admin-ajax.php' ),
      'query_vars' => json_encode( $wp_query->query )
    ));

    wp_enqueue_script( 'init-menu',  get_template_directory_uri() . '/js/init-menu.js', array( 'jquery' ), '1.0', true );
  }
  
  wp_enqueue_style( 'main', get_template_directory_uri() . '/css/main.css',false,'1.0','all');
  wp_enqueue_style( 'flickity', "https://unpkg.com/flickity@2/dist/flickity.min.css",false,'1.0','all');
//////////////////////////////


// Custom AJAX functionalities
add_action( 'wp_ajax_nopriv_ajax_content', 'my_ajax_content' );
add_action( 'wp_ajax_ajax_content', 'my_ajax_content' );

add_action( 'wp_ajax_nopriv_ajax_content_actor', 'my_ajax_content_actor' );
add_action( 'wp_ajax_ajax_content_actor', 'my_ajax_content_actor' );

function my_ajax_content() {
    $cat  = $_POST['cat'];
    //
    if ($cat == 'Agentur' || $cat == 'Kontakt') {
      $page = get_page_by_title($cat);
      $content = '<div class="content-item text--def">' . $page->post_content . '</div>';
      echo $content;
    } else {
      $args = array('cat' => $cat);
      $loop = new WP_Query($args); 
      //
      while ( $loop->have_posts() ) { 
        $loop->the_post();
        //
        get_template_part( 'content' );
      }
    }
    //
    die();
}

function my_ajax_content_actor() {
  $post_id  = $_POST['post'];
  //
  global $post; 
  $post = get_post($post_id); 
  setup_postdata($post);
  get_template_part( 'content-actor-details' );
  //
  die();
}


//////////////////////////////

add_action( 'wp_footer', 'blankslate_footer_scripts' );
function blankslate_footer_scripts() {
?>
<script>
jQuery(document).ready(function ($) {
var deviceAgent = navigator.userAgent.toLowerCase();
if (deviceAgent.match(/(iphone|ipod|ipad)/)) {
$("html").addClass("ios");
$("html").addClass("mobile");
}
if (navigator.userAgent.search("MSIE") >= 0) {
$("html").addClass("ie");
}
else if (navigator.userAgent.search("Chrome") >= 0) {
$("html").addClass("chrome");
}
else if (navigator.userAgent.search("Firefox") >= 0) {
$("html").addClass("firefox");
}
else if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
$("html").addClass("safari");
}
else if (navigator.userAgent.search("Opera") >= 0) {
$("html").addClass("opera");
}
});
</script>
<?php
}
add_filter( 'document_title_separator', 'blankslate_document_title_separator' );
function blankslate_document_title_separator( $sep ) {
$sep = '|';
return $sep;
}
add_filter( 'the_title', 'blankslate_title' );
function blankslate_title( $title ) {
if ( $title == '' ) {
return '...';
} else {
return $title;
}
}
add_filter( 'the_content_more_link', 'blankslate_read_more_link' );
function blankslate_read_more_link() {
if ( ! is_admin() ) {
return ' <a href="' . esc_url( get_permalink() ) . '" class="more-link">...</a>';
}
}
add_filter( 'excerpt_more', 'blankslate_excerpt_read_more_link' );
function blankslate_excerpt_read_more_link( $more ) {
if ( ! is_admin() ) {
global $post;
return ' <a href="' . esc_url( get_permalink( $post->ID ) ) . '" class="more-link">...</a>';
}
}
add_filter( 'intermediate_image_sizes_advanced', 'blankslate_image_insert_override' );
function blankslate_image_insert_override( $sizes ) {
unset( $sizes['medium_large'] );
return $sizes;
}
add_action( 'widgets_init', 'blankslate_widgets_init' );
function blankslate_widgets_init() {
register_sidebar( array(
'name' => esc_html__( 'Sidebar Widget Area', 'blankslate' ),
'id' => 'primary-widget-area',
'before_widget' => '<li id="%1$s" class="widget-container %2$s">',
'after_widget' => '</li>',
'before_title' => '<h3 class="widget-title">',
'after_title' => '</h3>',
) );
}
add_action( 'wp_head', 'blankslate_pingback_header' );
function blankslate_pingback_header() {
if ( is_singular() && pings_open() ) {
printf( '<link rel="pingback" href="%s" />' . "\n", esc_url( get_bloginfo( 'pingback_url' ) ) );
}
}
add_action( 'comment_form_before', 'blankslate_enqueue_comment_reply_script' );
function blankslate_enqueue_comment_reply_script() {
if ( get_option( 'thread_comments' ) ) {
wp_enqueue_script( 'comment-reply' );
}
}
function blankslate_custom_pings( $comment ) {
?>
<li <?php comment_class(); ?> id="li-comment-<?php comment_ID(); ?>"><?php echo comment_author_link(); ?></li>
<?php
}
add_filter( 'get_comments_number', 'blankslate_comment_count', 0 );
function blankslate_comment_count( $count ) {
if ( ! is_admin() ) {
global $id;
$get_comments = get_comments( 'status=approve&post_id=' . $id );
$comments_by_type = separate_comments( $get_comments );
return count( $comments_by_type['comment'] );
} else {
return $count;
}
}