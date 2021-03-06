<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'rza_devel' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', 'root' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '@|<7QRpL4cIW8DX3<wUd}Jy@~:2kdsm9%bfdNU:ez}~S14^`N=lW;u|acUhv_l[Q' );
define( 'SECURE_AUTH_KEY',  ';MQSFs CSp65^di~cW?C8{Dh`;eSBx2@lY`vlGkxx&<cKi=ZRs5-!K`QqY817V~1' );
define( 'LOGGED_IN_KEY',    'N;bbEQS+rNz_nG`dgBJ+/>WN!0J;Dr<QhrtQx:5V&4z-A7MOb=K(0?|__2/a|rQZ' );
define( 'NONCE_KEY',        'gM*mWmoPlYED_`X>tfrx2B=zr5s.}c6;_[B,@l4)&fa-u%2>tG;I MDPO?WvrG V' );
define( 'AUTH_SALT',        'n!;&ul*BM_gWuzjlm0m/=45.jSm22#iA7c5ws]:}W$@!m0MI1eX)MvVjUP0b|bix' );
define( 'SECURE_AUTH_SALT', 'l<+b%+O.Aj)WkA{&LqY0*xe`rA(%ZC.S;kI{t9%qT`D>pg1!pPc/r-8SV?FD>dQ.' );
define( 'LOGGED_IN_SALT',   '.+ A(v1^oGU{`_5[4+8Es5o~v-.T[f;I1CGas0c@2DHC=@X|uCap5dH!^V^+oK&-' );
define( 'NONCE_SALT',       'm687T:7r};!NIc/o)N%n:cQp1I{d@G)yUc-NLZ]B91DRV ;v]Pg/97|kd|E!>1mR' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once( ABSPATH . 'wp-settings.php' );
