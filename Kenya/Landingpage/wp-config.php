<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'u640413103_2022' );

/** MySQL database username */
define( 'DB_USER', 'u640413103_md22' );

/** MySQL database password */
define( 'DB_PASSWORD', 'h?oN4QsC?1w' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '`&r^(Ns^(6#LBjXp12|D-VP,<SvnD</qBzf!#S{:,O2&F~s mD$2#/$x76.!0)Xh' );
define( 'SECURE_AUTH_KEY',  'B&zp-*mj}Y|40Q=4_CFQ3 &u9QZCUJdBDR_Jq2/p_LS#+Huc bIu|g3s!3U9`/+w' );
define( 'LOGGED_IN_KEY',    'KKC.$?0JB@nuxsKf2&CLV{~ kxA!#V#wVDfxbBesOG+TOiHhKDp|gRmnJ;Hvbh+6' );
define( 'NONCE_KEY',        '[0F.M3,~xzC`{E7@T~ltE}o;Z(87W4h)}FI1nOu?9cj:utg8TCfOM4p4aX9rw}t8' );
define( 'AUTH_SALT',        'b6]Zy%Cb;VvwlyS9, p:vC1g*eE;Ri)T$LsmP6F7M|l@,h<D(07&T2{4:{4XB/hR' );
define( 'SECURE_AUTH_SALT', '_>N,a6O2S 0|MX)AG0-0:Q!xS&QGbJ;n?Q#q]lO}gc!Spk]pLfm$`Egc^/](`w!s' );
define( 'LOGGED_IN_SALT',   'b3IDS0z(o*ECm5fXo]3|?X W((BD@nYtK<Vuxc@DA(7iQ6Q6QMOxH{_$HT`%A=k^' );
define( 'NONCE_SALT',       '3nYa7wwboE5q/R5kZ8MO*<q8N.;LWdfo>B>e`x:u_#kzA=;GqA.(X%LCt2CNPBQS' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'en_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
