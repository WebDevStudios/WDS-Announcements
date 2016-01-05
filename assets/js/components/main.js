/**
 * WDS Announcement Banner
 * http://webdevstudios.com
 *
 * Licensed under the GPLv2+ license.
 */

var that = window.WDS_Announcement_Banner = window.WDS_Announcement_Banner || {};

var jsCookie = require( 'js-cookie' );

( function( window, document, $, that ) {
	var $c = {};

	that.init = function() {
		that.cache();
		that.bindEvents();
		that.doAnnouncements();
	};

	that.cache = function() {
		$c.window          = $( window );
		$c.document        = $( document );
		$c.body            = $( document.body );
		$c.announcementBar = $( '.announcement-display' );
		$c.page            = $( '#page' );
		$c.dismiss         = $( '#dismiss' );
		$c.header          = $( '#masthead' );
		$c.wpAdminBar      = $( '#wpadminbar' );
	};

	that.bindEvents = function() {
		$c.body.on( 'load', announcementAdded );
		$c.dismiss.on( 'click', setCookie );
		$c.window.on( 'scroll, resize', announcementAdded );
		$c.window.on( 'scroll', stickyHeaderCheck );
		$c.document.on( 'ready', stickyHeaderCheck, wpAdminBarCheck );
		$c.window.on( 'resize', wpAdminBarCheck );
	};

	// If there is no cookie then display Announcement and set page position
	that.doAnnouncements = function( e, $this ) {
		if ( !jsCookie.get( 'dismiss-announcement' ) ) {
			$c.body.addClass( 'has-announcement' ); 
			setPagePosition();
		}
	};
	
	// set a cookie and remove body.has-announcement class
	var setCookie = function() {
		jsCookie.set( 'dismiss-announcement', 1, { expires : 1 } );
		$c.body.removeClass( 'has-announcement' );
		removePagePosition();
	};
	
    // Set #page position based on height of the Announcement Bar
    var setPagePosition = function( wpAdminBarHeight ) {
		$c.page.css( 'top', $c.announcementBar.outerHeight() );
    };
	
	var removePagePosition = function() {
		$c.page.css( 'top', '' );
	};
	
	// Let's play nice with most sticky headers, if they exist
	var stickyHeaderCheck = function() {
		var headerHeight = $c.header.outerHeight();
		var topPos       = $c.document.scrollTop();
		
		if ( topPos > headerHeight && $c.header.css( 'position' ) == 'fixed' && $c.announcementBar.css( 'display' )  == 'block' ) {
			$c.header.css( 'top', $c.announcementBar.outerHeight() );
		} else {
			$c.header.css( 'top', '' );
		}
	};
	
	// Check if WP Admin Bar is showing and play nice if it is.
	var wpAdminBarCheck = function() {
		if ( !$c.wpAdminBar.length ) {
			return;
		} else {
			$c.announcementBar.css( 'margin-top', $c.wpAdminBar.outerHeight() + 'px' );
		}
	};

	var announcementAdded = function( e, $this ) {
		that.doAnnouncements();
	};

	$( that.init );

	return that;
}( window, document, require('jquery'), window.WDS_Announcement_Banner ) );

