<?php
/**
 * WDS Announcements Options options.
 * @version 0.1.0
 * @package WDS Announcement
 */

require_once dirname( __FILE__ ) . '/../vendor/cmb2/init.php';

class WDS_Announcements_Options {
	/**
	 * Parent plugin class.
	 *
	 * @var object
	 * @since 0.1.0
	 */
	protected $plugin = null;

	/**
	 * Option key, and option page slug.
	 *
	 * @var string
	 * @since 0.1.0
	 */
	protected $key = 'wds_announcements_options';

	/**
	 * Options page metabox id.
	 *
	 * @var string
	 * @since 0.1.0
	 */
	protected $metabox_id = 'wds_announcements_options_metabox';

	/**
	 * Options Page title.
	 *
	 * @var string
	 * @since 0.1.0
	 */
	protected $title = '';

	/**
	 * Options Page hook.
	 * @var string
	 */
	protected $options_page = '';

	/**
	 * Constructor.
	 *
	 * @since 0.1.0
	 *
	 * @param object $plugin Plugin detail.
	 */
	public function __construct( $plugin ) {
		$this->plugin = $plugin;
		$this->hooks();

		$this->title = __( 'Options', 'wds-announcements' );
	}

	/**
	 * Initiate our hooks.
	 *
	 * @since 0.1.0
	 */
	public function hooks() {
		add_action( 'admin_init', array( $this, 'admin_init' ) );
		add_action( 'admin_menu', array( $this, 'add_options_page' ) );
		add_action( 'cmb2_admin_init', array( $this, 'add_options_page_metabox' ) );
	}

	/**
	 * Register our setting to WP.
	 *
	 * @since 0.1.0
	 */
	public function admin_init() {
		register_setting( $this->key, $this->key );

		wp_register_style( 'wds-announcements-admin', WDS_Announcements::url( 'assets/css/admin.css' ) );
	}

	/**
	 * Enqueue Announcements options page stylesheet.
	 *
	 * @since 0.1.0
	 */
	public function admin_page_styles() {
		/*
         * It will be called only on your plugin admin page, enqueue our stylesheet here.
         */
        wp_enqueue_style( 'wds-announcements-admin' );
	}

	/**
	 * Add menu options page.
	 *
	 * @since 0.1.0
	 */
	public function add_options_page() {
		$this->options_page = add_submenu_page(
			'edit.php?post_type=wds-announcements', 
			$this->title, 
			$this->title, 
			'manage_options', 
			$this->key, 
			array( $this, 'admin_page_display' )
		);

		// Include CMB CSS in the head to avoid FOUC
		add_action( "admin_print_styles-{$this->options_page}", array( 'CMB2_hookup', 'enqueue_cmb_css' ) );
		add_action( "admin_print_styles-{$this->options_page}", array( $this, 'admin_page_styles' ) );
	}

	/**
	 * Admin page markup. Mostly handled by CMB2.
	 *
	 * @since 0.1.0
	 */
	public function admin_page_display() {
		?>
		<div class="wrap cmb2-options-page <?php echo $this->key; ?>">
			<h2><?php echo esc_html( get_admin_page_title() ); ?></h2>
			<?php cmb2_metabox_form( $this->metabox_id, $this->key ); ?>
		</div>
		<?php
	}

	/**
	 * Add custom fields to the options page.
	 *
	 * @since 0.1.0
	 */
	public function add_options_page_metabox() {

		$cmb = new_cmb2_box( array(
			'id'         => $this->metabox_id,
			'hookup'     => false,
			'cmb_styles' => false,
			'show_on'    => array(
				// These are important, don't remove.
				'key'   => 'options-page',
				'value' => array( $this->key, )
			),
		) );
		
		$cmb->add_field( array(
		    'name' => 'Display Announcements?',
		    'id'   => 'display_checkbox',
		    'type' => 'checkbox'
		) );

	}
}
