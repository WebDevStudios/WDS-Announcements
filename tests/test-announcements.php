<?php

class WDSAB_Announcements_Test extends WP_UnitTestCase {

	function test_sample() {
		// replace this with some actual testing code
		$this->assertTrue( true );
	}

	function test_class_exists() {
		$this->assertTrue( class_exists( 'WDSAB_Announcements') );
	}

	function test_class_access() {
		$this->assertTrue( wds_announcement_banner()->announcements instanceof WDSAB_Announcements );
	}

  function test_cpt_exists() {
    $this->assertTrue( post_type_exists( 'wdsab-announcements' ) );
  }
}
