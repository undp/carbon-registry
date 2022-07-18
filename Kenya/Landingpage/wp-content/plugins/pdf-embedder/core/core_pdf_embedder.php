<?php

class core_pdf_embedder {

	protected $PLUGIN_VERSION;

	protected $file;
	/**
	 * Inserted Scripts
	 *
	 * @since 1.0.0
	 *
	 * @var boolean
	 */
	protected $inserted_scripts = false;

	protected $pdfemb_options = null;

	/**
	 * Class Constructor
	 *
	 * @since 1.0.0
	 *
	 * @return null
	 */
	protected function __construct() {
		$this->init();
		register_activation_hook( $this->my_plugin_basename(), array( $this, 'pdfemb_activation_hook' ) );
	}

	/**
	 * Init Method
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	protected function init() {

		add_action( 'plugins_loaded', array($this, 'pdfemb_plugins_loaded') );

		add_action( 'init', array($this, 'pdfemb_init') );

		add_action( 'wp_enqueue_scripts', array($this, 'pdfemb_wp_enqueue_scripts'), 5, 0 );

		if (is_admin()) {
			add_action( 'admin_init', array($this, 'pdfemb_admin_init'), 5, 0 );
			add_action( 'wp_ajax_pdfemb_partners_install', array( $this, 'install_partner' ) );
			add_action( 'wp_ajax_pdfemb_partners_activate', array( $this, 'activate_partner' ) );
			add_action( 'wp_ajax_pdfemb_partners_deactivate', array( $this, 'deactivate_partner' ) );
			add_action($this->is_multisite_and_network_activated() ? 'network_admin_menu' : 'admin_menu', array( $this, 'admin_menu' ) );

			if ($this->is_multisite_and_network_activated()) {
				add_action('network_admin_edit_'.$this->get_options_menuname(), array($this, 'pdfemb_save_network_options'));
			}

            add_filter($this->is_multisite_and_network_activated() ? 'network_admin_plugin_action_links' : 'plugin_action_links', array($this, 'pdfemb_plugin_action_links'), 10, 2 );

		}

	}

	/**
	 * Undocumented function
	 *
	 * @return void
	 */
	protected function useminified() {
		return !defined( 'SCRIPT_DEBUG' ) || !SCRIPT_DEBUG;
	}

	/**
	 * Undocumented function
	 *
	 * @param [type] $network_wide
	 * @return void
	 */
	public function pdfemb_activation_hook($network_wide) {}

	/**
	 * Undocumented function
	 *
	 * @return void
	 */
	public function pdfemb_wp_enqueue_scripts() {}

	protected function insert_scripts() {

		if (!$this->inserted_scripts) {
			$this->inserted_scripts = true;
			wp_enqueue_script( 'pdfemb_embed_pdf_js' );

			wp_enqueue_script( 'pdfemb_pdf_js' );

			wp_enqueue_style( 'pdfemb_embed_pdf_css', $this->my_plugin_url().'assets/css/pdfemb-embed-pdf.css', array(), $this->PLUGIN_VERSION );
		}
	}

	protected function get_translation_array() {

		$options = $this->get_option_pdfemb();

		return array(
			'worker_src' => $this->my_plugin_url().'js/pdfjs/pdf.worker'.($this->useminified() ? '.min' : '').'.js',
		     'cmap_url'   => $this->my_plugin_url().'js/pdfjs/cmaps/',
		     'poweredby'  =>$options['poweredby'],
               'objectL10n' => array(
                    'loading'            => esc_html__( 'Loading...', 'pdf-embedder' ),
                    'page'               => esc_html__( 'Page', 'pdf-embedder' ),
                    'zoom'               => esc_html__( 'Zoom', 'pdf-embedder' ),
                    'prev'               => esc_html__( 'Previous page', 'pdf-embedder' ),
                    'next'               => esc_html__( 'Next page', 'pdf-embedder' ),
                    'zoomin'             => esc_html__( 'Zoom In', 'pdf-embedder' ),
				'secure'             => esc_html__( 'Secure', 'pdf-embedder' ),
				'zoomout'            => esc_html__( 'Zoom Out', 'pdf-embedder' ),
                    'download'           => esc_html__( 'Download PDF', 'pdf-embedder' ),
                    'fullscreen'         => esc_html__( 'Full Screen', 'pdf-embedder' ),
                    'domainerror'        => esc_html__( 'Error: URL to the PDF file must be on exactly the same domain as the current web page.', 'pdf-embedder' ),
                    'clickhereinfo'      => esc_html__( 'Click here for more info', 'pdf-embedder' ),
                    'widthheightinvalid' => esc_html__( "PDF page width or height are invalid", 'pdf-embedder' ),
                    'viewinfullscreen'   => esc_html__( "View in Full Screen", 'pdf-embedder' ),
			  ),
		);
	}

	protected function get_extra_js_name() {
		return '';
	}

	// Take over PDF type in media gallery
	public function pdfemb_upload_mimes($existing_mimes = array()) {
		$existing_mimes['pdf'] = 'application/pdf';
		return $existing_mimes;
	}

	public function pdfemb_post_mime_types($post_mime_types) {
		$post_mime_types['application/pdf'] = array( __( 'PDFs' , 'pdf-embedder'), __( 'Manage PDFs' , 'pdf-embedder'), _n_noop( 'PDF <span class="count">(%s)</span>', 'PDFs <span class="count">(%s)</span>' , 'pdf-embedder') );
		return $post_mime_types;
	}

	// Embed PDF shortcode instead of link
	public function pdfemb_media_send_to_editor($html, $id, $attachment) {
		$pdf_url = '';
		$title = '';
		if (isset($attachment['url']) && preg_match( "/\.pdf$/i", $attachment['url'])) {
			$pdf_url = $attachment['url'];
			$title = isset($attachment['post_title']) ? $attachment['post_title'] : '';
		}
		elseif ($id > 0) {
			$post = get_post($id);
			if ($post && isset($post->post_mime_type) && $post->post_mime_type == 'application/pdf') {
				$pdf_url = wp_get_attachment_url($id);
				$title = get_the_title($id);
			}
		}

		if ($pdf_url != '') {
			if ($title != '') {
				$title_from_url = $this->make_title_from_url($pdf_url);
				if ($title == $title_from_url || $this->make_title_from_url('/'.$title) == $title_from_url) {
					// This would be the default title anyway based on URL
					// OR if you take .pdf off title it would match, so that's close enough - don't load up shortcode with title param
					$title = '';
				}
				else {
					$title = ' title="' . esc_attr( $title ) . '"';
				}
			}

			return apply_filters('pdfemb_override_send_to_editor', '[pdf-embedder url="' . $pdf_url . '"'.$title.']', $html, $id, $attachment);
		} else {
			return $html;
		}
	}

	protected function modify_pdfurl($url) {
		return set_url_scheme($url);
	}

	public function pdfemb_shortcode_display_pdf($atts, $content=null) {

		$atts = apply_filters('pdfemb_filter_shortcode_attrs', $atts);

		if (!isset($atts['url'])) {
			return '<b>PDF Embedder requires a url attribute</b>';
		}

		$url = $atts['url'];

		$this->insert_scripts();

        // Get defaults

        $options = $this->get_option_pdfemb();

		$width = isset($atts['width']) ? $atts['width'] : $options['pdfemb_width'];
		$height = isset($atts['height']) ? $atts['height'] : $options['pdfemb_height'];

		$extra_style = "";
		if (is_numeric($width)) {
			$extra_style .= "width: ".$width."px; ";
		}
        elseif ($width!='max' && $width!='auto') {
            $width = 'max';
        }

		if (is_numeric($height)) {
			$extra_style .= "height: ".$height."px; ";
		}
		elseif ($height!='max' && $height!='auto') {
			$height = 'max';
		}

		$toolbar = isset($atts['toolbar']) && in_array($atts['toolbar'], array('top', 'bottom', 'both', 'none')) ? $atts['toolbar'] : $options['pdfemb_toolbar'];
        if (!in_array($toolbar, array('top', 'bottom', 'both', 'none'))) {
            $toolbar = 'bottom';
        }

		$toolbar_fixed = isset($atts['toolbarfixed']) ? $atts['toolbarfixed'] : $options['pdfemb_toolbarfixed'];
        if (!in_array($toolbar_fixed, array('on', 'off'))) {
            $toolbar_fixed = 'off';
        }

		$title = isset($atts['title']) && $atts['title'] != '' ? $atts['title'] : $this->make_title_from_url($url);

		$pdfurl = $this->modify_pdfurl($url);
		$esc_pdfurl = esc_attr($pdfurl);

		$returnhtml = '<a href="'.$esc_pdfurl.'" class="pdfemb-viewer" style="'.esc_attr($extra_style).'" '
						.'data-width="'.esc_attr($width).'" data-height="'.esc_attr($height).'" ';

		$returnhtml .= $this->extra_shortcode_attrs($atts, $content);

		$returnhtml .= ' data-toolbar="'.$toolbar.'" data-toolbar-fixed="'.$toolbar_fixed.'">'.esc_html( $title ).'<br/></a>';

		if (!is_null($content)) {
			$returnhtml .= do_shortcode($content);
		}
		return $returnhtml;
	}

	protected function make_title_from_url($url) {
		if (preg_match( '|/([^/]+?)(\.pdf(\?[^/]*)?)?$|i', $url, $matches)) {
			return $matches[1];
		}
		return $url;
	}

	protected function extra_shortcode_attrs($atts, $content=null) {
		return '';
	}

	protected function get_options_menuname() {
		return 'pdfemb_list_options';
	}

	protected function get_options_pagename() {
		return 'pdfemb_options';
	}

	protected function is_multisite_and_network_activated() {
	    if (!is_multisite()) {
	        return false;
        }

		if ( ! function_exists( 'is_plugin_active_for_network' ) ) {
			require_once( ABSPATH . '/wp-admin/includes/plugin.php' );
		}
        return is_plugin_active_for_network($this->my_plugin_basename());
    }

	protected function get_settings_url() {
		return $this->is_multisite_and_network_activated()
		? network_admin_url( 'settings.php?page='.$this->get_options_menuname() )
		: admin_url( 'options-general.php?page='.$this->get_options_menuname() );
	}

	public function get_products() {
		$products = array(
			'soliloquy' => array(
				'name' => 'Slider by Soliloquy – Responsive Image Slider for WordPress',
				'description' => 'The best WordPress slider plugin. Drag & Drop responsive slider builder that helps you create a beautiful image slideshows with just a few clicks.',
				'icon' => plugins_url( 'assets/img/partners/soliloquy.png', $this->file ),
				'url' => 'https://downloads.wordpress.org/plugin/soliloquy-lite.zip',
				'basename' => 'soliloquy-lite/soliloquy-lite.php'
			),
			'envira' => array(
				'name' => 'Envira Gallery',
				'description' => 'Envira Gallery is the fastest, easiest to use WordPress image gallery plugin. Lightbox with Drag & Drop builder that helps you create beautiful galleries.',
				'icon' => plugins_url( 'assets/img/partners/envira-gallery-lite.png', $this->file ),
				'url' => 'https://downloads.wordpress.org/plugin/envira-gallery-lite.zip',
				'basename' => 'envira-gallery-lite/envira-gallery-lite.php'

			),
			'google_drive_embedder' => array(
				'name' => 'Google Drive Embedder',
				'description' => 'Browse for Google Drive documents and embed directly in your posts/pages. This WordPress plugin extends the Google Apps Login plugin so no extra user …',
				'icon' => plugins_url( 'assets/img/partners/google-drive.png', $this->file ),
				'url' => 'https://downloads.wordpress.org/plugin/google-drive-embedder.zip',
				'basename' => 'google-drive-embedder/google_drive_embedder.php',
			),
			'google_apps_login' => array(
				'name' => 'Google Apps Login',
				'description' => 'Simple secure login and user management through your Google Workspace for WordPress (uses secure OAuth2, and MFA if enabled)',
				'icon' => plugins_url( 'assets/img/partners/google-apps.png', $this->file ),
				'url' => 'https://downloads.wordpress.org/plugin/google-apps-login.zip',
				'basename' => 'google-apps-login/google_apps_login.php',

			),
			'all_in_one' => array(
				'name' => 'All-In-One Intranet',
				'description' => 'Instantly turn your WordPress installation into a private corporate intranet',
				'icon' => plugins_url( 'assets/img/partners/allinone.png', $this->file ),
				'url' => 'https://downloads.wordpress.org/plugin/all-in-one-intranet.zip',
				'basename' => 'all-in-one-intranet/basic_all_in_one_intranet.php',

			),
			'nextgen' => array(
				'name' => 'NextGEN Gallery',
				'description' => 'The most popular WordPress gallery plugin and one of the most popular plugins of all time with over 31 million downloads.',
				'icon' => plugins_url( 'assets/img/partners/nextgen.png', $this->file ),
				'url' => 'https://downloads.wordpress.org/plugin/nextgen-gallery.zip',
				'basename' => 'nextgen-gallery/nggallery.php',

			),
		);
		return $products;
	}

	public function admin_menu() {
		if ($this->is_multisite_and_network_activated()) {
			add_submenu_page( 'settings.php', __('PDF Embedder settings', 'pdf-embedder'), __('PDF Embedder', 'pdf-embedder'),
			'manage_network_options', $this->get_options_menuname(),
			array($this, 'pdfemb_options_do_page'));
		}
		else {
			add_options_page( __('PDF Embedder settings', 'pdf-embedder'), __('PDF Embedder', 'pdf-embedder'),
			'manage_options', $this->get_options_menuname(),
			array($this, 'pdfemb_options_do_page'));
		}
	}

	public function pdfemb_options_do_page() {

		wp_enqueue_script( 'pdfemb_admin_js', $this->my_plugin_url().'assets/js/admin/pdfemb-admin.js', array('jquery'), $this->PLUGIN_VERSION );
		wp_localize_script(
			'pdfemb_admin_js',
			'pdfemb_args',
			array(
				'activate_nonce'   => wp_create_nonce( 'pdfemb-activate-partner' ),
				'active'           => __( 'Status: Active', 'pdf-embedder' ),
				'activate'         => __( 'Activate', 'pdf-embedder' ),
				'activating'       => __( 'Activating...', 'pdf-embedder' ),
				'ajax'             => admin_url( 'admin-ajax.php' ),
				'deactivate'       => __( 'Deactivate', 'pdf-embedder' ),
				'deactivate_nonce' => wp_create_nonce( 'pdfemb-deactivate-partner' ),
				'deactivating'     => __( 'Deactivating...', 'pdf-embedder' ),
				'inactive'         => __( 'Status: Inactive', 'pdf-embedder' ),
				'install'          => __( 'Install', 'pdf-embedder' ),
				'install_nonce'    => wp_create_nonce( 'pdfemb-install-partner' ),
				'installing'       => __( 'Installing...', 'pdf-embedder' ),
				'proceed'          => __( 'Proceed', 'pdf-embedder' ),
			)
		);
		wp_enqueue_style( 'pdfemb_admin_css', $this->my_plugin_url().'assets/css/pdfemb-admin.css', array(), $this->PLUGIN_VERSION  );

          $submit_page = $this->is_multisite_and_network_activated() ? 'edit.php?action='.$this->get_options_menuname() : 'options.php';

		$display_top_bar = get_option( 'pdfemb_display_topbar', false );

		if ($this->is_multisite_and_network_activated()) {
			$this->pdfemb_options_do_network_errors();
		}

		if ( ! $display_top_bar ) { ?>

			<div id="pdfemb-top-notification" class="pdfemb-header-notification">
				<p>You're using PDF Embedder Lite. To unlock more features, <a href="https://wp-pdf.com/premium/?utm_source=liteplugin&amp;utm_medium=topbar&amp;utm_campaign=goPro"><strong>consider upgrading to Premium.</strong></a></p>
			</div>
		<?php } ?>

		<div id="pdfemb-header">
			<div class="pdfemb-logo">
				<img src ="<?php echo plugins_url( 'assets/img/pdf-embedder.png', $this->file ); ?>" height="45px" />
				<h1>PDF Embedder</h1>
			</div>
		</div>
		<div>

		<h2 id="pdfemb-tabs" class="nav-tab-wrapper">
                    <a href="#main" id="main-tab" class="nav-tab nav-tab-active"><?php esc_html_e('Main Settings', 'pdf-embedder'); ?></a>
                    <a href="#mobile" id="mobile-tab" class="nav-tab"><?php esc_html_e('Mobile', 'pdf-embedder'); ?></a>
                    <a href="#secure" id="secure-tab" class="nav-tab"><?php esc_html_e('Secure', 'pdf-embedder'); ?></a>
                    <a href="#about" id="about-tab" class="nav-tab"><?php esc_html_e('About', 'pdf-embedder'); ?></a>
				<?php $this->draw_more_tabs(); ?>
          </h2>

               <div id="pdfemb-tablewrapper">

               <div id="pdfemb-tableleft" class="pdfemb-tablecell">

				<form action="<?php echo $submit_page; ?>" method="post" id="pdfemb_form" enctype="multipart/form-data" >
                    <?php

                         echo '<div id="main-section" class="pdfembtab active">';
                              $this->render_main_section();
                         echo '</div>';

                         echo '<div id="mobile-section" class="pdfembtab">';
                              $this->render_mobile_section();
                         echo '</div>';

                         echo '<div id="secure-section" class="pdfembtab">';
                              $this->render_secure_section();
                         echo '</div>';

					echo '<div id="about-section" class="pdfembtab">';
                              $this->render_about_section();
                         echo '</div>';

					$this->draw_extra_sections();

                         settings_fields( $this->get_options_pagename() );

					?>

                         <p class="submit">
                              <input type="submit" value="<?php esc_html_e('Save Changes', 'pdf-embedder'); ?>" class="button button-primary" id="submit" name="submit">
                         </p>

                    </form>
            </div>

            <?php $this->options_do_sidebar(); ?>

        </div>

		</div>  <?php
	}

    protected function options_do_sidebar() {}

    protected function draw_more_tabs() {}

    protected function draw_extra_sections() {}

	// Override elsewhere
	protected function render_main_section() {
        $options = $this->get_option_pdfemb();
		?>

<h2><?php esc_html_e('PDF Embedder setup', 'pdf-embedder'); ?></h2>

<p><?php esc_html_e('To use the plugin, just embed PDFs in the same way as you would normally embed images in your posts/pages - but try with a PDF file instead.', 'pdf-embedder'); ?></p>
<p><?php esc_html_e("From the post editor, click Add Media, and then drag-and-drop your PDF file into the media library.
When you insert the PDF into your post, it will automatically embed using the plugin's viewer.", 'pdf-embedder'); ?></p>

        <h2><?php _e('Default Viewer Settings', 'pdf-embedder'); ?></h2>

        <label for="input_pdfemb_width" class="textinput"><?php _e('Width', 'pdf-embedder'); ?></label>
        <input id='input_pdfemb_width' class='textinput' name='<?php echo $this->get_options_name(); ?>[pdfemb_width]' size='10' type='text' value='<?php echo esc_attr($options['pdfemb_width']); ?>' />
		<br class="clear"/>

        <label for="input_pdfemb_height" class="textinput"><?php _e('Height', 'pdf-embedder'); ?></label>
        <input id='input_pdfemb_height' class='textinput' name='<?php echo $this->get_options_name(); ?>[pdfemb_height]' size='10' type='text' value='<?php echo esc_attr($options['pdfemb_height']); ?>' />
        <br class="clear"/>

        <p class="desc big"><i><?php _e('Enter <b>max</b> or an integer number of pixels', 'pdf-embedder'); ?></i></p>

        <br class="clear"/>

        <label for="pdfemb_toolbar" class="textinput"><?php esc_html_e('Toolbar Location', 'pdf-embedder'); ?></label>
        <select name='<?php echo $this->get_options_name(); ?>[pdfemb_toolbar]' id='pdfemb_toolbar' class='select'>
            <option value="top" <?php echo $options['pdfemb_toolbar'] == 'top' ? 'selected' : ''; ?>><?php esc_html_e('Top', 'pdf-embedder'); ?></option>
            <option value="bottom" <?php echo $options['pdfemb_toolbar'] == 'bottom' ? 'selected' : ''; ?>><?php esc_html_e('Bottom', 'pdf-embedder'); ?></option>
            <option value="both" <?php echo $options['pdfemb_toolbar'] == 'both' ? 'selected' : ''; ?>><?php esc_html_e('Both', 'pdf-embedder'); ?></option>
	        <?php $this->no_toolbar_option($options); ?>
        </select>
        <br class="clear" />
        <br class="clear" />

        <label for="pdfemb_toolbarfixed" class="textinput"><?php esc_html_e('Toolbar Hover', 'pdf-embedder'); ?></label>
        <span>
        <input type="radio" name='<?php echo $this->get_options_name(); ?>[pdfemb_toolbarfixed]' id='pdfemb_toolbarfixed_off' class='radio' value="off" <?php echo $options['pdfemb_toolbarfixed'] == 'off' ? 'checked' : ''; ?> />
        <label for="pdfemb_toolbarfixed_off" class="radio"><?php esc_html_e('Toolbar appears only on hover over document', 'pdf-embedder'); ?></label>
        </span>
        <br/>
        <span>
        <input type="radio" name='<?php echo $this->get_options_name(); ?>[pdfemb_toolbarfixed]' id='pdfemb_toolbarfixed_on' class='radio' value="on" <?php echo $options['pdfemb_toolbarfixed'] == 'on' ? 'checked' : ''; ?> />
        <label for="pdfemb_toolbarfixed_on" class="radio"><?php esc_html_e('Toolbar always visible', 'pdf-embedder'); ?></label>
        </span>
        <br/><br/>
        <label for="pdfemb_toolbarfixed" class="textinput"><?php esc_html_e('Display Credit', 'pdf-embedder'); ?></label>
        <span>
        <input type='checkbox' name='<?php echo $this->get_options_name(); ?>[poweredby]' id='poweredby' class='checkbox' <?php echo $options['poweredby'] == 'on' ? 'checked' : ''; ?>  />

        <label for="poweredby" class="checkbox plain" style="margin-left: 10px;"><?php esc_html_e('Display "Powered by wp-pdf.com" on PDF Viewer with a link to our site. Spread the love!', 'pdf-embedder'); ?></label>
		</span>
		<?php
            $this->pdfemb_mainsection_extra();
        ?>

        <br class="clear" />
        <br class="clear" />



        <p><?php printf( __('You can override these defaults for specific embeds by modifying the shortcodes - see <a href="%s" target="_blank">instructions</a>.', 'pdf-embedder'), $this->get_instructions_url()); ?></p>

        <?php
	}

	protected function no_toolbar_option($options) {}

	protected function pdfemb_mainsection_extra() {}

    protected function get_instructions_url() {
        return $this->get_upgrade_link( 'https://wp-pdf.com/free-instructions/', 'settings', 'instructions' );
    }

    protected function render_mobile_section() {}

    protected function render_secure_section() {
        ?>

        <h2><?php esc_html_e('Protect your PDFs using PDF Embedder Secure', 'pdf-embedder'); ?></h2>
        <p><?php _e('Our <b>PDF Embedder Premium Secure</b> plugin provides the same simple but elegant viewer for your website visitors, with the added protection that
            it is difficult for users to download or print the original PDF document.', 'pdf-embedder'); ?></p>

        <p><?php esc_html_e('This means that your PDF is unlikely to be shared outside your site where you have no control over who views, prints, or shares it.', 'pdf-embedder'); ?></p>

	    <p><?php esc_html_e("Optionally add a watermark containing the user's name or email address to discourage sharing of screenshots.", 'pdf-embedder'); ?></p>

        <p><?php printf( __('See our website <a href="%s">wp-pdf.com</a> for more details and purchase options.', 'pdf-embedder'), 'http://wp-pdf.com/secure/?utm_source=PDF%20Settings%20Secure&utm_medium=freemium&utm_campaign=Freemium' ); ?>
        </p>

        <?php
    }

    protected function render_about_section() {
	    ?>

<div class="lionsher-get-started-main">


	<div class="lionsher-get-started-panel">

		<div class="wraps upgrade-wrap">

			<h2 class="headline-title"><?php esc_html_e( 'See Our Partners!', 'pdf-embedder' ); ?></h2>

			<h4 class="headline-subtitle"><?php esc_html_e( 'We have partnered with these amazing companies for further enhancement to your PDF Embedder experience.', 'pdf-embedder' ); ?></h4>
			<div class="lionsher-partners-wrap">
			<?php foreach( $this->get_products() as $products ) :

				$this->get_plugin_card( $products );

			endforeach; ?>
			</div>
		</div>
	</div>
</div>

	    <?php

    }
	public function pdfemb_options_validate($input) {
		$newinput = Array();

        $newinput['pdfemb_width'] = isset($input['pdfemb_width']) ? trim(strtolower($input['pdfemb_width'])) : 'max';
        if (!is_numeric($newinput['pdfemb_width']) && $newinput['pdfemb_width']!='max' && $newinput['pdfemb_width']!='auto') {
            add_settings_error(
                'pdfemb_width',
                'widtherror',
                self::get_error_string('pdfemb_width|widtherror'),
                'error'
            );
			// revert back to max as last resort, don't leave field blank.
			$newinput['pdfemb_width'] = 'max';
        }

        $newinput['pdfemb_height'] = isset($input['pdfemb_height']) ? trim(strtolower($input['pdfemb_height'])) : 'max';
        if (!is_numeric($newinput['pdfemb_height']) && $newinput['pdfemb_height']!='max' && $newinput['pdfemb_height']!='auto') {
            add_settings_error(
                'pdfemb_height',
                'heighterror',
                self::get_error_string('pdfemb_height|heighterror'),
                'error'
            );
			// revert back to max as last resort, don't leave field blank.
			$newinput['pdfemb_height'] = 'max';
        }

        if (isset($input['pdfemb_toolbar']) && in_array($input['pdfemb_toolbar'], array('top', 'bottom', 'both', 'none'))) {
            $newinput['pdfemb_toolbar'] = $input['pdfemb_toolbar'];
        }
        else {
            $newinput['pdfemb_toolbar'] = 'bottom';
        }

        if (isset($input['pdfemb_toolbarfixed']) && in_array($input['pdfemb_toolbarfixed'], array('on', 'off'))) {
            $newinput['pdfemb_toolbarfixed'] = $input['pdfemb_toolbarfixed'];
        }

        $newinput['pdfemb_version'] = $this->PLUGIN_VERSION;

        if (isset($input['poweredby']) && in_array($input['poweredby'], array('on', 'off'))) {
          $newinput['poweredby'] = $input['poweredby'];
        }else{
          $newinput['poweredby'] = 'off';
        }

		return $newinput;
	}

	protected function get_error_string($fielderror) {
        $local_error_strings = Array(
            'pdfemb_width|widtherror' => __('Width must be "max" or an integer (number of pixels). Settings reset to "max".', 'pdf-embedder'),
            'pdfemb_height|heighterror' => __('Height must be "max" or an integer (number of pixels). Settings reset to "max".', 'pdf-embedder')
        );
        if (isset($local_error_strings[$fielderror])) {
            return $local_error_strings[$fielderror];
        }

		return __('Unspecified error', 'pdf-embedder');
	}

	public function pdfemb_save_network_options() {
		check_admin_referer( $this->get_options_pagename().'-options' );

		if (isset($_POST[$this->get_options_name()]) && is_array($_POST[$this->get_options_name()])) {
			$inoptions = $_POST[$this->get_options_name()];

			$outoptions = $this->pdfemb_options_validate($inoptions);

			$error_code = Array();
			$error_setting = Array();
			foreach (get_settings_errors() as $e) {
				if (is_array($e) && isset($e['code']) && isset($e['setting'])) {
					$error_code[] = $e['code'];
					$error_setting[] = $e['setting'];
				}
			}

			if ($this->is_multisite_and_network_activated()) {
				update_site_option( $this->get_options_name(), $outoptions );
			}
			else {
				update_option( $this->get_options_name(), $outoptions );
            }

			// redirect to settings page in network
			wp_redirect(
			add_query_arg(
			array( 'page' => $this->get_options_menuname(),
			'updated' => true,
			'error_setting' => $error_setting,
			'error_code' => $error_code ),
			network_admin_url( 'admin.php' )
			)
			);
			exit;
		}
	}

	protected function pdfemb_options_do_network_errors() {
		if (isset($_REQUEST['updated']) && $_REQUEST['updated']) {
			?>
					<div id="setting-error-settings_updated" class="updated settings-error">
					<p>
					<strong><?php esc_html_e('Settings saved', 'pdf-embedder'); ?></strong>
					</p>
					</div>
				<?php
			}

			if (isset($_REQUEST['error_setting']) && is_array($_REQUEST['error_setting'])
				&& isset($_REQUEST['error_code']) && is_array($_REQUEST['error_code'])) {
				$error_code = $_REQUEST['error_code'];
				$error_setting = $_REQUEST['error_setting'];
				if (count($error_code) > 0 && count($error_code) == count($error_setting)) {
					for ($i=0; $i<count($error_code) ; ++$i) {
						?>
					<div id="setting-error-settings_<?php echo $i; ?>" class="error settings-error">
					<p>
					<strong><?php echo htmlentities2($this->get_error_string($error_setting[$i].'|'.$error_code[$i])); ?></strong>
					</p>
					</div>
						<?php
				}
			}
		}
	}

	// OPTIONS

    protected function get_options_name() {
        return 'pdfemb';
    }

	protected function get_default_options() {
		return Array(
            'pdfemb_width' => 'max',
            'pdfemb_height' => 'max',
            'pdfemb_toolbar' => 'bottom',
            'pdfemb_toolbarfixed' => 'off',
            'poweredby' => 'off',
            'pdfemb_version' => $this->PLUGIN_VERSION
        );
	}

	protected function get_option_pdfemb() {
		if ($this->pdfemb_options != null) {
			return $this->pdfemb_options;
		}

		if ($this->is_multisite_and_network_activated()) {
			$option = get_site_option( $this->get_options_name(), Array() );
		}
		else {
			$option = get_option( $this->get_options_name(), Array() );
        }

		$default_options = $this->get_default_options();
		foreach ($default_options as $k => $v) {
			if (!isset($option[$k])) {
				$option[$k] = $v;
			}
		}

		$this->pdfemb_options = $option;
		return $this->pdfemb_options;
	}

	protected function save_option_pdfemb($option) {
		if ($this->is_multisite_and_network_activated()) {
			update_site_option( $this->get_options_name(), $option );
		}
		else {
			update_option( $this->get_options_name(), $option );
        }
		$this->pdfemb_options = $option;
	}

	// ADMIN
	public function pdfemb_admin_init() {

		// Add PDF as a supported upload type to Media Gallery
		add_filter( 'upload_mimes', array($this, 'pdfemb_upload_mimes') );

		// Filter for PDFs in Media Gallery
		add_filter( 'post_mime_types', array($this, 'pdfemb_post_mime_types') );

		// Embed PDF shortcode instead of link
		add_filter( 'media_send_to_editor', array( $this, 'pdfemb_media_send_to_editor' ), 20, 3 );

		register_setting( $this->get_options_pagename(), $this->get_options_name(), Array($this, 'pdfemb_options_validate') );

		add_filter( 'attachment_fields_to_edit', array($this, 'pdfemb_attachment_fields_to_edit'), 10, 2 );

		wp_enqueue_style( 'pdfemb_admin_other_css', $this->my_plugin_url().'assets/css/pdfemb-admin-other.css', array(), $this->PLUGIN_VERSION  );

		if (is_admin()) {
			add_action( 'enqueue_block_editor_assets', array($this, 'gutenberg_enqueue_block_editor_assets') );
		}

	}

	// Override in Basic and Commercial
	public function pdfemb_attachment_fields_to_edit($form_fields, $post) {
		return $form_fields;
	}

	// Override in Premium
	public function pdfemb_init() {
		add_shortcode( 'pdf-embedder', array($this, 'pdfemb_shortcode_display_pdf') );

		// Gutenberg block
		if (function_exists('register_block_type')) {
			register_block_type( 'pdfemb/pdf-embedder-viewer', array(
				'render_callback' => array($this, 'pdfemb_shortcode_display_pdf')
			) );
		}
		if (is_admin()) {
			add_action( 'enqueue_block_assets', array($this, 'gutenberg_enqueue_block_assets') );
		}

	}

    public function pdfemb_plugin_action_links( $links, $file ) {

        if ($file == $this->my_plugin_basename()) {

            $links = $this->extra_plugin_action_links( $links );

            $settings_link = '<a href="' . $this->get_settings_url() . '">' . __('Settings', 'pdf-embedder') .'</a>';

		  array_unshift($links, $settings_link);

        }

        return $links;
    }

    protected function extra_plugin_action_links( $links ) {
        return $links;
    }

	public function pdfemb_plugins_loaded() {
		load_plugin_textdomain( 'pdf-embedder', false, dirname($this->my_plugin_basename()).'/lang/' );
	}

	/**
	 * Undocumented function
	 *
	 * @return void
	 */
	public function gutenberg_enqueue_block_editor_assets() {
		wp_enqueue_script(
			'pdfemb-gutenberg-block-js', // Unique handle.
			$this->my_plugin_url(). 'assets/js/pdfemb-blocks.js',
			array( 'wp-blocks', 'wp-i18n', 'wp-element' ), // Dependencies, defined above.
			$this->PLUGIN_VERSION
		);

		wp_enqueue_style(
			'pdfemb-gutenberg-block-css', // Handle.
			$this->my_plugin_url(). 'assets/css/pdfemb-blocks.css', // editor.css: This file styles the block within the Gutenberg editor.
			$this->PLUGIN_VERSION
		);
	}

	/**
	 * Undocumented function
	 *
	 * @return void
	 */
	public function gutenberg_enqueue_block_assets() {
		wp_enqueue_style(
			'pdfemb-gutenberg-block-backend-js', // Handle.
			$this->my_plugin_url(). 'assets/css/pdfemb-blocks.css', // style.css: This file styles the block on the frontend.
			$this->PLUGIN_VERSION
		);
	}


	public function get_plugin_card( $plugin = false ) {

		if ( ! $plugin ) {
			return;
		}
		$this->installed_plugins = get_plugins();

		if ( ! isset( $this->installed_plugins[ $plugin['basename'] ] ) ) { ?>
			<div class="lionsher-partners">
				<div class="lionsher-partners-main">
					<div>
						<img src="<?php esc_attr_e( $plugin['icon'], 'pdf-embedder' ); ?>" width="64px" />
					</div>
					<div>
						<h3><?php esc_html_e( $plugin['name'], 'lionsher-gallery-lite' ); ?></h3>
						<p class="lionsher-partner-excerpt"><?php esc_html_e( $plugin['description'], 'pdf-embedder' ); ?></p>
					</div>
				</div>
                    <div class="lionsher-partners-footer">
					<div class="lionsher-partner-status">Status:&nbsp;<span>Not Installed</span></div>
                         <div class="lionsher-partners-install-wrap">
                              <a href="#" target="_blank" class="button button-primary lionsher-partners-button lionsher-partners-install" data-url="<?php echo $plugin['url']; ?>" data-basename="<?php echo $plugin['basename']; ?>">Install Plugin</a>
                              <span class="spinner lionsher-gallery-spinner"></span>
                        </div>
                    </div>
               </div>
		<?php } else {
			if ( is_plugin_active( $plugin['basename'] ) ) { ?>
							<div class="lionsher-partners">
							<div class="lionsher-partners-main">
								<div>
									<img src="<?php esc_attr_e( $plugin['icon'], 'pdf-embedder' ); ?>" width="64px" />
								</div>
								<div>
									<h3><?php esc_html_e( $plugin['name'], 'pdf-embedder' ); ?></h3>
								<p class="lionsher-partner-excerpt"><?php esc_html_e( $plugin['description'], 'pdf-embedder' ); ?></p>
								</div>
							</div>
                                 <div class="lionsher-partners-footer">
							   <div class="lionsher-partner-status">Status:&nbsp;<span>Active</span></div>
                                   <div class="lionsher-partners-install-wrap">
                            <a href="#" target="_blank" class="button button-primary lionsher-partners-button lionsher-partners-deactivate" data-url="<?php echo $plugin['url']; ?>" data-basename="<?php echo $plugin['basename']; ?>">Deactivate</a>
                            <span class="spinner lionsher-gallery-spinner"></span>
                        </div>
                </div>
                        </div>
			<?php } else { ?>
				<div class="lionsher-partners">
							<div class="lionsher-partners-main">
								<div>
									<img src="<?php esc_attr_e( $plugin['icon'], 'pdf-embedder' ); ?>" width="64px" />
								</div>
								<div>
									<h3><?php esc_html_e( $plugin['name'], 'pdf-embedder' ); ?></h3>
								<p class="lionsher-partner-excerpt"><?php esc_html_e( $plugin['description'], 'pdf-embedder' ); ?></p>
								</div>
							</div>
                                 <div class="lionsher-partners-footer">
							   <div class="lionsher-partner-status">Status:&nbsp;<span>Inactive</span></div>
                                   <div class="lionsher-partners-install-wrap">
                            <a href="#" target="_blank" class="button button-primary lionsher-partners-button lionsher-partners-activate" data-url="<?php echo $plugin['url']; ?>" data-basename="<?php echo $plugin['basename']; ?>">Activate</a>
                            <span class="spinner lionsher-gallery-spinner"></span>
                        </div>
                </div>
                        </div>
			<?php }
		}
	}

	public function activate_partner() {
		// Run a security check first.
		check_admin_referer( 'pdfemb-activate-partner', 'nonce' );

		// Activate the addon.
		if ( isset( $_POST['basename'] ) ) {
			$activate = activate_plugin( wp_unslash( $_POST['basename'] ) );  // @codingStandardsIgnoreLine

			if ( is_wp_error( $activate ) ) {
				echo wp_json_encode( array( 'error' => $activate->get_error_message() ) );
				die;
			}
		}

		echo wp_json_encode( true );
		die;

	}

	public function deactivate_partner() {
		// Run a security check first.
		check_admin_referer( 'pdfemb-deactivate-partner', 'nonce' );

		// Deactivate the addon.
		if ( isset( $_POST['basename'] ) ) {
			$deactivate = deactivate_plugins( wp_unslash( $_POST['basename'] ) );  // @codingStandardsIgnoreLine
		}

		echo wp_json_encode( true );
		die;
	}

	public function install_partner() {

		check_admin_referer( 'pdfemb-install-partner', 'nonce' );
		// Install the addon.
		if ( isset( $_POST['download_url'] ) ) {

			$download_url = esc_url_raw( wp_unslash( $_POST['download_url'] ) );
			global $hook_suffix;

			// Set the current screen to avoid undefined notices.
			set_current_screen();

			// Prepare variables.
			$method = '';
			$url    = add_query_arg(
				array(
					'page' => 'pdfemb_list_options',
				),
				admin_url( 'options-general.php' )
			);
			$url    = esc_url( $url );

			// Start output bufferring to catch the filesystem form if credentials are needed.
			ob_start();
			$creds = request_filesystem_credentials( $url, $method, false, false, null );
			if ( false === $creds ) {
				$form = ob_get_clean();
				echo wp_json_encode( array( 'form' => $form ) );
				die;
			}

			// If we are not authenticated, make it happen now.
			if ( ! WP_Filesystem( $creds ) ) {
				ob_start();
				request_filesystem_credentials( $url, $method, true, false, null );
				$form = ob_get_clean();
				echo wp_json_encode( array( 'form' => $form ) );
				die;
			}

			// We do not need any extra credentials if we have gotten this far, so let's install the plugin.
			require_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';
			require_once plugin_dir_path( $this->file ) . 'core/install_skin.php';

			// Create the plugin upgrader with our custom skin.
			$skin      = new WPPDF_Skin();
			$installer = new Plugin_Upgrader( $skin );
			$installer->install( $download_url );

			// Flush the cache and return the newly installed plugin basename.
			wp_cache_flush();

			if ( $installer->plugin_info() ) {
				$plugin_basename = $installer->plugin_info();

				wp_send_json_success( array( 'plugin' => $plugin_basename ) );

				die();
			}
		}

		// Send back a response.
		echo wp_json_encode( true );
		die;

	}
	/**
	 * Helper Method to get Upgrade URL.
	 *
	 * @since 1.0.0
	 *
	 * @param boolean $url URL.
	 * @param string $medium Location.
	 * @param string $button Which button.
	 * @param boolean $append Add extras.
	 * @return string
	 */
	public function get_upgrade_link( $url = false, $medium = 'default', $button = 'default', $append = false  ) {

		$source = apply_filters( 'pbfemb_tracking_src', 'liteplugin' );

		if ( defined( 'PDFEMB_TRACKING_SRC' ) ) {
			$source = PDFEMB_TRACKING_SRC;
		}

		if ( false === filter_var( $url, FILTER_VALIDATE_URL ) ) {
			// prevent a possible typo.
			$url = false;
		}

		$url = ( false !== $url ) ? trailingslashit( esc_url( $url ) ) : 'https://wp-pdf.com/';
		return $url . '?utm_source=' . $source . '&utm_medium=' . $medium . '&utm_campaign=' . $button . $append;

	}

}
