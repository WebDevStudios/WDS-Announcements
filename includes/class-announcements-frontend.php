<?php
/**
 * WDS Announcements Frontend.
 *
 * @version 0.1.0
 * @package WDS Announcements
 */

/**
 * Announcements frontend class.
 */
class WDS_Announcements_Frontend {

	/**
	 * Parent plugin class.
	 *
	 * @var object
	 * @since 0.1.0
	 */
	protected $plugin = null;

	/**
	 * Constructor.
	 *
	 * @since 0.1.0
	 * @param object $plugin Parent plugin class.
	 */
	public function __construct( $plugin ) {
		$this->plugin = $plugin;
		$this->hooks();
	}

	/**
	 * Initiate our hooks.
	 *
	 * @since 0.1.0
	 * @return void
	 */
	public function hooks() {
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
		add_action( 'wp_enqueue_styles', array( $this, 'enqueue_styles' ) );
		add_action( 'wds_do_announcement', array( $this, 'show' ) );
	}

	public function get() {
		return get_posts( array(
			'posts_per_page' => '1',
		    'post_status'    => 'publish',
		    'post_type'      => 'wds-announcements',
		) );
	}

	public function show() {
		if ( current( $this->get() ) === false ) {
			return;
		} else {
			$announcement = current( $this->get() );
			$link = get_post_meta( $announcement->ID, 'wds_announcements_url', true );
			$link_start = $link ? '<a href="' . esc_url( $link ) .'">' : '';
			$link_end = $link ? '</a>' : '';
			do_action( 'wds_announcement_before' );
			?>
			<div class="announcement-wrap announcement-display">
				<div class="announcement">

					<?php do_action( 'wds_announcement_top' ); ?>

					<?php echo $link_start; ?>
						<div class="announcement-message">
							<span><?php echo get_the_title( $announcement->ID ); ?></span>
						</div><!-- .announcement-message -->
					<?php echo $link_end; ?>

					<?php do_action( 'wds_announcement_bottom' ); ?>

					<div id="dismiss" class="announcement-dismiss">
						<i class="icon icon-close"></i>
					</div><!-- #dismiss .announcement-dismiss -->

				</div><!-- .announcement -->
			</div><!-- .announcement-wrap .announcement-display -->
			<?php
			do_action( 'wds_announcement_after' );
		}
	}

	/**
	 * Load sripts on the front end.
	 **/
	public function enqueue_scripts() {
		$min = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '': '.min';
		wp_enqueue_script( 'wds-announcements', WDS_Announcements::url( 'assets/js/wds-announcements' . $min . '.js' ), array( 'jquery' ), '100815', true );

		wp_enqueue_style( 'wds-announcements', WDS_Announcements::url( 'assets/css/wds-announcements' . $min . '.css' ), true );
	}
}

/**
 * Public template tag to display the announcement.
 *
 * @param boolean $echo Whether to echo or return the announcement.
 * @return string
 */
function wds_announcements_content( $echo = false ) {
	// Determine whether to echo or return the output.
	if ( $echo ) {
		echo wp_kses_post( wds_announcements()->announcements_frontend->show() );
		return;
	}

	return wds_announcements()->announcements_frontend->show();
}
