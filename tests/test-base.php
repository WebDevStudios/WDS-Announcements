<?php

class BaseTest extends WP_UnitTestCase {

	function test_sample() {
		// replace this with some actual testing code
		$this->assertTrue( true );
	}

	function test_class_exists() {
		$this->assertTrue( class_exists( 'WDS_Announcement_Banner') );
	}
	
	function test_get_instance() {
		$this->assertTrue( wds_announcement_banner() instanceof WDS_Announcement_Banner );
	}
}
