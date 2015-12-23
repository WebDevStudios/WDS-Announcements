<?php
/**
 * WDS Announcements Frontend
 * @version 0.1.0
 * @package WDS Announcements
 */

class WDS_Announcements_Frontend {
	/**
	 * Parent plugin class
	 *
	 * @var class
	 * @since  0.1.0
	 */
	protected $plugin = null;

	/**
	 * Constructor
	 *
	 * @since 0.1.0
	 * @return  null
	 */
	public function __construct( $plugin ) {
		$this->plugin = $plugin;
		$this->hooks();
	}

	/**
	 * Initiate our hooks
	 *
	 * @since 0.1.0
	 * @return  null
	 */
	public function hooks() {
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
		add_action( 'wp_enqueue_styles', array( $this, 'enqueue_styles' ) );
	}

	public function get() {
		return get_posts( array(
			'posts_per_page' => '1',
		    'post_status'    => 'publish',
		    'post_type'      => 'wds-announcements'
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
			?>
			<div class="announcement_wrap announcement_bar">
				<div class="announcement">
					<div class="announcement-box">
						
						<?php echo $link_start; ?>
							<div class="message">
								<span><?php echo get_the_title( $announcement->ID ); ?></span>
							</div>
						<?php echo $link_end; ?>
						
						<div id="dismiss">
							<i class="icon icon-close"></i>
						</div><!-- #dismiss -->
				
					</div><!-- .announcement-box -->
				</div><!-- .announcement -->
			</div><!-- .announcement_wrap .announcement_bar -->
			<?php
		}
	}

	/**
	 * Load sripts on the front end
	 **/
	public function enqueue_scripts() {
		$min = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '': '.min';
		wp_enqueue_script( 'wds-announcements', WDS_Announcements::url( 'assets/js/wds-announcements' . $min . '.js' ), array( 'jquery' ), '100815', true );

		wp_enqueue_style( 'wds-announcements', WDS_Announcements::url( 'assets/css/wds-announcements' . $min . '.css' ), true );
	}
}

function wds_announcements_content() {
	return wds_announcements()->announcements_frontend->show();
}
