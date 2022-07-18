<?php

/**
 * Plugin Name: PDF Embedder
 * Plugin URI: http://wp-pdf.com/
 * Description: Embed PDFs straight into your posts and pages, with flexible width and height. No third-party services required. Compatible with Gutenberg Editor WordPress
 * Version: 4.6.4
 * Author: WP PDF Embedder Team
 * Author URI: http://wp-pdf.com/
 * License: GPL3
 * Text Domain: pdf-embedder
 */

require_once( plugin_dir_path(__FILE__).'/core/core_pdf_embedder.php' );

if ( !class_exists('PDF_Embedder_Basic') ) {

	/**
	 * Core Plugin Class
	 *
	 * @since 4.6.3
	 */
	final class PDF_Embedder_Basic extends core_pdf_embedder {

		/**
		 * Singleton Instance
		 *
		 * @since 4.6.3
		 *
		 * @var PDF_Embedder_Basic
		 */
		public static $instance = null;

		/**
		 * Plugin Version
		 *
		 * @since 4.6.3
		 *
		 * @var string
		 */
		protected $PLUGIN_VERSION = '4.6.4';

		protected $file = __FILE__;

		/**
		 * Powered By
		 *
		 * @since 1.0.0
		 *
		 * @var string
		 */
          protected static $poweredby_optionname='poweredby';

          public function pdfemb_activation_hook($network_wide) {

			parent::pdfemb_activation_hook($network_wide);
			 // If installed previously, keep 'poweredby' to off since they were used to that
               $old_options = get_site_option($this->get_options_name());

               if (!$old_options) {
                    update_site_option(self::$poweredby_optionname, 'off');
               }
          }

    public function pdfemb_wp_enqueue_scripts() {

               if (!$this->useminified()) {
                    wp_register_script( 'pdfemb_grabtopan_js', $this->my_plugin_url().'assets/js/grabtopan-basic.js', array('jquery'), $this->PLUGIN_VERSION);
                    wp_register_script( 'pdfemb_pv_core_js', $this->my_plugin_url().'assets/js/pdfemb-pv-core.js',
                     array('pdfemb_grabtopan_js', 'jquery'), time() );
                    wp_register_script( 'pdfemb_versionspecific_pdf_js', $this->my_plugin_url().'assets/js/pdfemb-basic.js',
                     array('jquery', 'pdfemb_pv_core_js'), $this->PLUGIN_VERSION);
                    wp_register_script( 'pdfemb_embed_pdf_js', $this->my_plugin_url().'assets/js/pdfemb-embed-pdf.js',
                         array('pdfemb_pv_core_js', 'pdfemb_versionspecific_pdf_js'), $this->PLUGIN_VERSION );
               }
               else {
                    wp_register_script( 'pdfemb_embed_pdf_js', $this->my_plugin_url().'assets/js/min/all-pdfemb-min.js', array('jquery'), false);
               }

               wp_localize_script( 'pdfemb_embed_pdf_js', 'pdfemb_trans', $this->get_translation_array() );

               wp_register_script( 'pdfemb_pdf_js', $this->my_plugin_url().'assets/js/pdfjs/pdf'.($this->useminified() ? '.min' : '').'.js', array('jquery'), $this->PLUGIN_VERSION);

    }

	protected function get_extra_js_name() {
		return 'basic';
	}

	// ADMIN

	protected function pdfemb_mainsection_extra() {
		?>
		<br class="clear" />
		<br class="clear" />

		<h2><?php _e('Options only available in Premium versions', 'pdf-embedder'); ?></h2>

		<label for="pdfemb_download" class="textinput"><?php esc_html_e('Download Button', 'pdf-embedder'); ?></label>
		<span>
        <label for="pdfemb_download" class="checkbox plain"><?php esc_html_e('Provide PDF download button on toolbar', 'pdf-embedder'); ?></label>
        </span>

		<br class="clear" />

		<label for="pdfemb_newwindow" class="textinput"><?php esc_html_e('External Links', 'pdf-embedder'); ?></label>
		<span>
        <label for="pdfemb_newwindow" class="checkbox plain"><?php esc_html_e('Open links in a new browser tab/window', 'pdf-embedder'); ?></label>
        </span>


		<br class="clear" />

		<label for="pdfemb_tracking" class="textinput"><?php esc_html_e('Track Views/Downloads', 'pdf-embedder'); ?></label>
		<span>
        <label for="pdfemb_tracking" class="checkbox plain"><?php esc_html_e('Count number of views and downloads', 'pdf-embedder'); ?></label>
        </span>

		<br class="clear" />

		<label for="pdfemb_continousscroll" class="textinput"><?php esc_html_e('Continous Page Scrolling', 'pdf-embedder'); ?></label>
		<span>
        <label for="pdfemb_continousscroll" class="checkbox plain"><?php esc_html_e('Allow user to scroll up/down between all pages in the PDF', 'pdf-embedder'); ?></label>
        </span>

		<br class="clear" />
        <p><?php printf(__('Find out more about <a href="%s" target="_blank">Premium Versions of the plugin on our website</a>.', 'pdf-embedder'),
                'http://wp-pdf.com/premium/?utm_source=PDF%20Settings%20PremiumFindOut&utm_medium=freemium&utm_campaign=Freemium'); ?></p>

        <?php
	}

	protected function render_mobile_section()
    {
        ?>

        <h2><?php esc_html_e('Mobile-friendly embedding using PDF Embedder Premium', 'pdf-embedder'); ?></h2>
        <p><?php esc_html_e("This free version of the plugin should work on most mobile browsers, but it will be cumbersome for users with small screens - it is difficult to position
            the document entirely within the screen, and your users' fingers may catch the entire browser page when
            they're trying only to move about the document...", 'pdf-embedder'); ?></p>

        <p><?php _e("Our <b>PDF Embedder Premium</b> plugin solves this problem with an intelligent 'full screen' mode.
            When the document is smaller than a certain width, the document displays only as a 'thumbnail' with a large
            'View in Full Screen' button for the
            user to click when they want to study your document.
            This opens up the document so it has the full focus of the mobile browser, and the user can move about the
            document without hitting other parts of
            the web page by mistake. Click Exit to return to the regular web page.", 'pdf-embedder'); ?>
        </p>

        <p><?php _e("The user can also touch and scroll continuously between all pages of the PDF which is much easier than clicking the next/prev buttons to navigate.", 'pdf-embedder'); ?>
        </p>

        <p><?php printf( __('See our website <a href="%s">wp-pdf.com</a> for more details and purchase options.', 'pdf-embedder'), 'http://wp-pdf.com/premium/?utm_source=PDF%20Settings%20Premium&utm_medium=freemium&utm_campaign=Freemium'); ?>
        </p>

        <?php
    }

    protected function options_do_sidebar() {
        ?><div id="pdfemb-tableright" class="pdfemb-tablecell">
            <div>
                <h3>Premium Versions</h3>
                <p>Visit <a href="https://wp-pdf.com/?utm_source=Premium%20Sidebar&utm_medium=freemium&utm_campaign=Freemium" target="_blank">wp-pdf.com</a> for premium PDF Embedder features:</p>
                <ul>
                    <li>Mobile Friendly</li>
                    <li>Continuous page scrolling</li>
                    <li>Download Button</li>
	                <li>Full screen button</li>
	                <li>Working Hyperlinks</li>
                    <li>Jump to page number</li>
					<li>Track views and downloads</li>
                    <li>Remove link to wp-pdf.com</li>
                    <li><i>Secure version</i> - prevent downloads and add watermark</li>
                </ul>
                <p>More details and demos are <br/> on <a href="https://wp-pdf.com/?utm_source=Premium%20Sidebar&utm_medium=freemium&utm_campaign=Freemium" target="_blank">our website</a>!</p>
            </div>

		    <div>
			    <h3>Thumbnails</h3>
			    <p>Buy our <a href="https://wp-pdf.com/thumbnails/?utm_source=Thumbnails%20Sidebar&utm_medium=freemium&utm_campaign=Freemium" target="_blank">PDF Thumbnails</a> plugin:</p>
			    <ul>
				    <li>Generates fixed image versions of PDFs</li>
				    <li>Use thumbnails as featured images in your posts</li>
				    <li>Embed thumbnails as link to full PDF</li>
				    <li>Easier to find your PDFs in the Media Library</li>
			    </ul>
			    <p>PDF Thumbnails is the perfect companion to any of our PDF Embedder plugins, or can be used standalone!</p>
			    <p>More details on <a href="https://wp-pdf.com/thumbnails/?utm_source=Thumbnails%20Sidebar&utm_medium=freemium&utm_campaign=Freemium" target="_blank">our website</a></p>
		    </div>
        </div>
        <?php
    }

	protected function extra_plugin_action_links( $links ) {

        $secure_link = '<a href="http://wp-pdf.com/secure/?utm_source=Plugins%20Secure&utm_medium=freemium&utm_campaign=Freemium" target="_blank">Secure</a>';
        $mobile_link = '<a href="http://wp-pdf.com/premium/?utm_source=Plugins%20Premium&utm_medium=freemium&utm_campaign=Freemium" target="_blank">Mobile</a>';

        array_unshift( $links, $secure_link );
        array_unshift( $links, $mobile_link );

        return $links;

	}

	protected function get_translation_array() {
		return array_merge(parent::get_translation_array()
			// ,Array('poweredby' => get_site_option(self::$poweredby_optionname, false))
		);
	}

	public function pdfemb_attachment_fields_to_edit($form_fields, $post) {
		if ($post->post_mime_type == 'application/pdf') {
			$form_fields['pdfemb-upgrade'] = array(
					'input' => 'html',
					'html' => sprintf(__('Track downloads and views with <a href="%s" target="_blank">PDF Embedder Premium</a>','pdf-embedder'),
                        'http://wp-pdf.com/premium/?utm_source=Media%20Library&utm_medium=freemium&utm_campaign=Freemium'),
					'label' => __( 'Downloads/Views', 'pdf-embedder' ));
		}
		return $form_fields;
	}

	// AUX

	protected function my_plugin_basename() {
		$basename = plugin_basename(__FILE__);
		if ('/'.$basename == __FILE__) { // Maybe due to symlink
			$basename = basename(dirname(__FILE__)).'/'.basename(__FILE__);
		}
		return $basename;
	}

	protected function my_plugin_url() {
		$basename = plugin_basename(__FILE__);
		if ('/'.$basename == __FILE__) { // Maybe due to symlink
			return plugins_url().'/'.basename(dirname(__FILE__)).'/';
		}
		// Normal case (non symlink)
		return plugin_dir_url( __FILE__ );
	}

			/**
		 * Autoload function.
		 *
		 * @access public
		 * @static
		 * @param mixed $class The class.
		 * @return void
		 */
		public static function autoload( $class ) {

			// Prepare variables.
			$prefix   = 'PDE';
			$base_dir = __DIR__ . '/core/';
			$length   = mb_strlen( $prefix );

			// If the class is not using the namespace prefix, return.
			if ( 0 !== strncmp( $prefix, $class, $length ) ) {
				return;
			}

			// Prepare classes to be autoloaded.
			$relative_class = mb_substr( $class, 0, strlen( $class ) );
			$relative_class = str_replace( 'PDE\\', '', $relative_class );
			$file           = $base_dir . str_replace( '\\', '/', $relative_class ) . '.php';

			// If the file exists, load it.
			if ( file_exists( $file ) ) {
				require $file;
			}

		}
	public static function get_instance() {
		if (null == self::$instance) {
			self::$instance = new self;
		}
		return self::$instance;
	}

}

}
add_action( 'plugins_loaded', 'pdfembPDFEmbedder' );

// Global accessor function to singleton
function pdfembPDFEmbedder() {
	return PDF_Embedder_Basic::get_instance();
}
