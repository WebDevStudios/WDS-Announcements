<?php

class WDSAB_Announcements_Visibility_Test extends WP_UnitTestCase {

	function test_sample() {
		// replace this with some actual testing code
		$this->assertTrue( true );
	}

	function test_class_exists() {
		$this->assertTrue( class_exists( 'WDSAB_Announcements_Visibility') );
	}

	function test_class_access() {
		$this->assertTrue( wds_announcement_banner()->announcements-visibility instanceof WDSAB_Announcements_Visibility );
	}
}
