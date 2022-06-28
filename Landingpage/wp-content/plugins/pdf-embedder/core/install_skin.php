<?php


/**
 * Skin class.
 *
 * @since 1.0.0
 *
 * @package Envira_Gallery
 * @author  Envira Team
 */
class WPPDF_Skin extends WP_Upgrader_Skin {

	/**
	 * Primary class constructor.
	 *
	 * @since 1.0.0
	 *
	 * @param array $args Empty array of args (we will use defaults).
	 */
	public function __construct( $args = array() ) {

		parent::__construct();

	}

	/**
	 * Set the upgrader object and store it as a property in the parent class.
	 *
	 * @since 1.0.0
	 *
	 * @param object $upgrader The upgrader object (passed by reference).
	 */
	public function set_upgrader( &$upgrader ) {

		if ( is_object( $upgrader ) ) {
			$this->upgrader =& $upgrader;
		}

	}

	/**
	 * Set the upgrader result and store it as a property in the parent class.
	 *
	 * @since 1.0.0
	 *
	 * @param object $result The result of the install process.
	 */
	public function set_result( $result ) {

		$this->result = $result;

	}

	/**
	 * Empty out the header of its HTML content and only check to see if it has
	 * been performed or not.
	 *
	 * @since 1.0.0
	 */
	public function header() {}

	/**
	 * Empty out the footer of its HTML contents.
	 *
	 * @since 1.0.0
	 */
	public function footer() {}

	/**
	 * Instead of outputting HTML for errors, json_encode the errors and send them
	 * back to the Ajax script for processing.
	 *
	 * @since 1.0.0
	 *
	 * @param array $errors Array of errors with the install process.
	 */
	public function error( $errors ) {

		if ( ! empty( $errors ) ) {
			echo wp_json_encode( array( 'error' => __( 'There was an error installing the addon. Please try again.', 'envira-gallery' ) ) );
			/* log this for API issues */

			error_log( 'Envira: There was an error installing the addon' );
			error_log( print_r( $errors, true ) );

			die;
		}

	}
	/**
	 * Hides the `process_failed` error message when updating by uploading a zip file.
	 *
	 * @since 5.5.0
	 *
	 * @param WP_Error $wp_error WP_Error object.
	 * @return bool
	 */
	public function hide_process_failed( $wp_error ) {
		return true;
	}
	/**
	 * Empty out the feedback method to prevent outputting HTML strings as the install
	 * is progressing.
	 *
	 * @since 1.0.0
	 *
	 * @param string $string The feedback string.
	 * @param array  ...$args The args.
	 */
	public function feedback( $string, ...$args ) {}

}
