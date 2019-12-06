<?php get_template_part( 'templates/snippets/header'); ?>

  <main id="content" class="d--flex">

    <!-- Navigation Menu -->
    <?php if(wp_is_mobile()) {
      get_template_part( 'templates/snippets/menu_mobile');
    } else {
      get_template_part( 'templates/snippets/menu');
    } ?>
    
    <!-- Site Content -->
    <?php if(wp_is_mobile()): ?>
      <section id="content_mobile" data-namespace="actor" class="text--def bg--white actor-container mobile">
        <article id="post-<?php the_ID(); ?>" class="content-item actor text--def">

          <?php $images = get_field('bildergalerie');?>
          <?php $image_max = count($images); 
                if(get_field("video")) {$image_max++; }
          ?>
          
          <!-- Photo & Video Content -->
          <header>
            <!-- Slider-Overlay -->
            <div id="slider_overlay" class="actor-carousel-overlay z--up text--def color_black">
              <!-- Slider Controls -->
              <div class="slider-counter glow--txt--white">1/<?php echo $image_max;?></div>
              <button class="slider-button prev" onclick="slider_prev()"></button>
              <button class="slider-button next" onclick="slider_next()"></button>

              <!-- Video Controls -->
              <div class="video-controls hidden--off">
                <button class="play mr--1"></button>
                <!-- <button class="fullscreen"></button> -->
              </div>
            </div>

            <!-- Slider -->
            <div class="actor-carousel">
              <!-- Photo-Slides -->
              <?php if( $images ): ?>
                <?php foreach( $images as $image ): ?>
                  <div class="carousel-cell">
                    <img src="<?php echo $image['url']; ?>">
                  </div>
                <?php endforeach; ?>
              <?php endif; ?>
              <!-- Video-Slide -->
              <?php if(get_field('video')): ?>
                <div class="carousel-cell video-cell">
                  <video class="cld-video-player cld-video-player-skin-dark" data-cld-public-id="Clients/Client_RZA/<?php the_field('video') ?>">
                  </video>
                </div>
              <?php endif ?>
            </div>
          </header>
          <!-- Text Content -->
          <div class="content-item-text">
            <div class="mb--1 text--kompress">
              <h1 class="text--b"><?php the_title(); ?></h1>
              <span>*<?php the_field('geburtsjahr'); ?></span>
            </div>

            <?php 
              $post_id = get_the_ID();
              global $post; 
              $post = get_post($post_id); 
              setup_postdata($post);
            ?>

            <!-- Meta-Infos -->
            <section class="mb--1">
              <div class="text--il">
                <p class="h2 list">Größe    </p><span> <?php the_field('groesse'); ?>m</span>
              </div>
              <div class="text--il">
                <p class="h2 list">Haarfarbe</p><span> <?php the_field('haarfarbe'); ?></span>
              </div>
              <div class="text--il">
                <p class="h2 list">Augenfarbe</p><span> <?php the_field('augenfarbe'); ?></span>
              </div>
            </section>

            <section class="mb--1">
              <?php if( have_rows('faehigkeiten') ): ?>
                <?php while ( have_rows('faehigkeiten') ) : the_row(); ?>
                  <div class="text--il">
                    <p class="h2 list"><?php the_sub_field('kategorie'); ?></p><span> <?php the_sub_field('faehigkeiten_list'); ?></span>
                  </div>
                <?php endwhile ?>
              <?php endif ?>
              <div class="text--il">
                <p class="h2 list">Besonderheiten</p><span> <?php the_field('besonderheiten'); ?></span>
              </div>
            </section>

            <section class="mb--1">
              <div class="text--il">
                <p class="h2 list">Wohnort</p><span> <?php the_field('wohnort'); ?></span>
              </div>
            </section>

            <section class="mb--2">
              <p class="h2"><?php the_field('weiteres'); ?></p>
            </section>

            <!-- Lebenslauf -->
            <div class="mb--1 text--kompress">
              <h1 class="text--b">Filme</h1>
            </div>
            <?php if( have_rows('lebenslauf') ): ?>
              <?php while ( have_rows('lebenslauf') ) : the_row(); ?>
                <section class="mb--2">
                  <h2><?php the_sub_field('jahr'); ?></h2>
                  <?php $all_items_count = count(get_sub_field('produktionen'));
                        $item_count = 1; ?>
                  <?php if( have_rows('produktionen') ): ?>
                    <?php while ( have_rows('produktionen') ) : the_row(); ?>
                      <div class="<?php if ($item_count == $all_items_count): ?>mb--0<?php else: ?>mb--1<?php endif ?>">
                        <p class="h2 list"><?php the_sub_field('titel'); ?></p>
                        <span>Regie: <?php the_sub_field('regie'); ?></span>
                      </div>
                      <?php $item_count++; ?>
                    <?php endwhile ?>
                  <?php endif ?>
                </section> 
              <?php endwhile ?>
            <?php endif ?>
            <div class="mb--1">
              <h1 class="text--b">Weitere Produktionen</h1>
            </div>
            <?php if( have_rows('lebenslauf_weitere') ): ?>
              <?php while ( have_rows('lebenslauf_weitere') ) : the_row(); ?>
                <section class="mb--1">
                  <h2><?php the_sub_field('jahr'); ?></h2>

                  <?php if( have_rows('produktionen') ): ?>
                    <?php while ( have_rows('produktionen') ) : the_row(); ?>
                      <div class="text--il">
                        <p class="h2"><?php the_sub_field('titel'); ?></p>
                        <span><?php the_sub_field('regie'); ?></span>
                      </div>
                    <?php endwhile ?>
                  <?php endif ?>

                </section> 
              <?php endwhile ?>
            <?php endif ?>
          </div>
        </article>
      </section>
    <?php else: ?>
      <section id="content_left" data-namespace="actor" class="w--50 actor">
        <section id="content_left_items">
          <article id="post-<?php the_ID(); ?>" class="content-item actor text--def">
            
            <?php $images = get_field('bildergalerie');?>
            <?php $image_max = count($images); 
                  if(get_field("video")) {$image_max++; }
            ?>
    
            <!-- Photo & Video Content -->
            <header>
              <!-- Slider-Overlay -->
              <div id="slider_overlay" class="actor-carousel-overlay z--up text--def color_black">
                <!-- Slider Controls -->
                <div class="slider-counter glow--txt--white">1/<?php echo $image_max;?></div>
                <button class="slider-button prev" onclick="slider_prev()"></button>
                <button class="slider-button next" onclick="slider_next()"></button>

                <!-- Video Controls -->
                <div class="video-controls hidden--off">
                  <button class="play mr--1"></button>
                  <!-- <button class="fullscreen"></button> -->
                </div>
              </div>

              <!-- Slider -->
              <div class="actor-carousel">
                <!-- Photo-Slides -->
                <?php if( $images ): ?>
                  <?php foreach( $images as $image ): ?>
                    <div class="carousel-cell">
                      <img src="<?php echo $image['url']; ?>">
                    </div>
                  <?php endforeach; ?>
                <?php endif; ?>
                <!-- Video-Slide -->
                <?php if(get_field('video')): ?>
                  <div class="carousel-cell video-cell">
                    <video class="cld-video-player cld-video-player-skin-dark" data-cld-public-id="Clients/Client_RZA/<?php the_field('video') ?>">
                    </video>
                  </div>
                <?php endif ?>
              </div>
            </header>

            <!-- Bio. Info -->
            <div class="content-item-actor">
              <div class="mb--1 text--kompress">
                <h1 class="text--b"><?php the_title(); ?></h1>
                <span>*<?php the_field('geburtsjahr'); ?></span>
              </div>

              <?php 
                $post_id = get_the_ID();
                global $post; 
                $post = get_post($post_id); 
                setup_postdata($post);
              ?>

              <section class="mb--1">
                <div class="text--il">
                  <p class="h2 list">Größe    </p><span> <?php the_field('groesse'); ?>m</span>
                </div>
                <div class="text--il">
                  <p class="h2 list">Haarfarbe</p><span> <?php the_field('haarfarbe'); ?></span>
                </div>
                <div class="text--il">
                  <p class="h2 list">Augenfarbe</p><span> <?php the_field('augenfarbe'); ?></span>
                </div>
              </section>

              <section class="mb--1">
                <?php if( have_rows('faehigkeiten') ): ?>
                  <?php while ( have_rows('faehigkeiten') ) : the_row(); ?>
                    <div class="text--il">
                      <p class="h2 list"><?php the_sub_field('kategorie'); ?></p><span> <?php the_sub_field('faehigkeiten_list'); ?></span>
                    </div>
                  <?php endwhile ?>
                <?php endif ?>

                <div class="text--il">
                  <p class="h2 list">Besonderheiten</p><span> <?php the_field('besonderheiten'); ?></span>
                </div>
              </section>

              <section class="mb--1">
                <div class="text--il">
                  <p class="h2 list">Wohnort</p><span> <?php the_field('wohnort'); ?></span>
                </div>
              </section>

              <section class="mb--0">
                <p class="h2"><?php the_field('weiteres'); ?></p>
              </section>
            </div>
            <!-- Filme -->
            <div class="content-item-actor">
              <button class="collapsible--button text text--lg text--b">Filme</button>
              <div class="collapsible--content text--def">
                <?php if( have_rows('lebenslauf') ): ?>
                  <?php $all_items_count = count(get_field('lebenslauf'));
                        $item_count = 1;
                        ?>
                  <?php while ( have_rows('lebenslauf') ) : the_row(); ?>
                    <section class="<?php if ($item_count == $all_items_count): ?>mb--05 <?php else: ?>mb--1 <?php endif ?>">
                      <h2><?php the_sub_field('jahr'); ?></h2>

                      <?php if( have_rows('produktionen') ): ?>
                        <?php while ( have_rows('produktionen') ) : the_row(); ?>
                          <div>
                            <p class="h2 list"><?php the_sub_field('titel'); ?></p>
                            <span>Regie: <?php the_sub_field('regie'); ?></span>
                          </div>
                        <?php endwhile ?>
                      <?php endif ?>

                    </section> 
                    <?php $item_count++; ?>

                  <?php endwhile ?>
                <?php endif ?>
              </div>
            </div>
            <!-- Weitere Prod. -->
            <div class="content-item-actor">
              <button class="collapsible--button text text--lg text--b">Weitere Produktionen</button>
              <div class="collapsible--content text--def">
                <?php if( have_rows('lebenslauf_weitere') ): ?>
                  <?php $all_items_count = count(get_field('lebenslauf_weitere'));
                        $item_count = 1;
                        ?>
                  <?php while ( have_rows('lebenslauf_weitere') ) : the_row(); ?>
                    <section class="<?php if ($item_count == $all_items_count): ?>mb--05 <?php else: ?>mb--1 <?php endif ?>">
                      <h2><?php the_sub_field('jahr'); ?></h2>
                      <?php if( have_rows('produktionen') ): ?>
                        <?php while ( have_rows('produktionen') ) : the_row(); ?>
                          <div><p class="h2 list"><?php the_sub_field('titel'); ?></p></div>
                        <?php endwhile ?>
                      <?php endif ?>
                    </section> 
                    <?php $item_count++; ?>
                  <?php endwhile ?>
                <?php endif ?>
              </div>
            </div>

          </article>
        </section>
        <!-- Scroll-Shadow -->
        <div class="glow--scrollshadow"></div>
      </section>
      <!-- Zig-Zag -->
      <?php get_template_part( 'templates/snippets/zigzag'); ?>
      <section id="content_right" class="w--50 text--def">
        <div class="grid-container">

          <?php
            $args = array('cat' => array(7,8));
            $loop = new WP_Query($args); 
          ?>

          <?php while ($loop->have_posts()) : $loop->the_post(); ?>
            <?php set_query_var('current_post', $post_id); ?>
            <?php get_template_part( 'content-actor' ); ?>
          <?php endwhile; ?>
          
        </div>
      </section>
    <?php endif ?>
  </main>

  <!-- Standalone Inits -->
  <script>
    // Flickity init
    window.$sliderActor = jQuery(".actor-carousel").flickity({
      cellAlign: "left",
      contain: true,
      pageDots: false,
      prevNextButtons: false,
      wrapAround: true,
      draggable: false,
      lazyLoad: 2
    });
    // CLD/Video init
    if(jQuery(".video-cell").length > 0) {
      var cld = cloudinary.Cloudinary.new({ cloud_name: "johschmoll" });
      window.players = cld.videoPlayers(".cld-video-player", {
        events: ["ended"]
      });
      // Video Controls
      document.querySelector("#slider_overlay button.play").addEventListener("click", function() {
        video_playToggle();
      });
      // document.querySelector("#slider_overlay button.fullscreen").addEventListener("click", function() {
      //   alert("Dieser Button funktioniert noch nicht… aber bald!")
      // });
      // End of Video
      players[0].on("ended", event => {
        // Reset play-button & video
        var controls = jQuery("#slider_overlay .video-controls");
        controls.removeClass("playing");
        players[0].stop();
      });
    } else {
      console.log("No video slides found.")
    }
    // Collapsibles
    jQuery(document).ready(function($) {
      init_collapsibles()
    });
  </script>

<?php get_template_part( 'templates/snippets/footer'); ?>