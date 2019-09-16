    </div> <!-- #container -->

    <footer id="footer">
    </footer>

  </div> <!-- #wrapper -->
  
  <?php wp_footer(); ?>

  <!-- Global Inits -->
  <script>
    jQuery(window).bind("load", function() {
      resize_zigzag();
      init_cookieConsent();
    });

    function meta_info(file){
      var rawFile = new XMLHttpRequest();
      rawFile.open("GET", file, false);
      rawFile.onreadystatechange = function () {
          if(rawFile.readyState === 4) {
              if(rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                console.log(allText);
              }
          }
      }
      rawFile.send(null);
    }
  </script>
</body>
</html>