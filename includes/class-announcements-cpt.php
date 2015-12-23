<?php
/**
 * WDS Announcements CPT
 *
 * @version 0.1.0
 * @package WDS Announcement
 */

require_once dirname(__FILE__) . '/../vendor/cpt-core/CPT_Core.php';
require_once dirname(__FILE__) . '/../vendor/cmb2/init.php';

class WDS_Announcements_Cpt extends CPT_Core {
	/**
	 * Parent plugin class
	 *
	 * @var class
	 * @since  0.1.0
	 */
	protected $plugin = null;

	/**
	 * Constructor
	 * Register Custom Post Types. See documentation in CPT_Core, and in wp-includes/post.php
	 *
	 * @since  0.1.0
	 * @return void
	 */
	public function __construct( $plugin ) {
		$this->plugin = $plugin;
		$this->hooks();

		// Register this cpt
		// First parameter should be an array with Singular, Plural, and Registered name
		parent::__construct(
			array( 
				__( 'Announcement', 'wds-announcements' ), 
				__( 'Announcements', 'wds-announcements' ), 'wds-announcements' 
			),
			array( 
				'supports' => array( 'title' ), 
				'menu_icon' => 'dashicons-megaphone', 
			)
		);
	}

	/**
	 * Initiate our hooks
	 *
	 * @since  0.1.0
	 * @return void
	 */
	public function hooks() {
		add_action( 'cmb2_init', array( $this, 'fields' ) );
	}

	/**
	 * Add custom fields to the CPT
	 *
	 * @since  0.1.0
	 * @return void
	 */
	public function fields() {
		$prefix = 'wds_announcements_';

		$cmb = new_cmb2_box( array(
			'id'            => $prefix . 'metabox',
			'title'         => __( 'WDS Announcements Meta Box', 'wds-announcements' ),
			'object_types'  => array( 'wds-announcements', ),
			'context'       => 'normal',
			'priority'      => 'high',
		) );
		
		// Regular text field
	    $cmb->add_field( array(
	        'name'       => __( 'Link URL', 'cmb2' ),
			'desc'       => __( '(optional) e.g. http://www.lifehacker.com', 'cmb2' ),
	        'id'         => $prefix . 'url',
	        'type'       => 'text_url',
	    ) );

	}

	/**
	 * Registers admin columns to display. Hooked in via CPT_Core.
	 *
	 * @since  0.1.0
	 * @param  array  $columns Array of registered column names/labels
	 * @return array           Modified array
	 */
	public function columns( $columns ) {
		$new_column = array(
		);
		return array_merge( $new_column, $columns );
	}

	/**
	 * Handles admin column display. Hooked in via CPT_Core.
	 *
	 * @since  0.1.0
	 * @param  array  $column Array of registered column names
	 */
	public function columns_display( $column, $post_id ) {
		switch ( $column ) {
		}
	}
}

// get rid of WordPress SEO metabox - adapted from http://wordpress.stackexchange.com/a/91184/2015
function wds_announcements_remove_wp_seo_meta_box() {
	remove_meta_box( 'wpseo_meta', 'wds-announcements', 'normal' ); 
}
// Remove Yoast SEO metabox from our CPT
add_action( 'add_meta_boxes', 'wds_announcements_remove_wp_seo_meta_box', 100000 );
