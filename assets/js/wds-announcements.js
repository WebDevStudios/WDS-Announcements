/**
 * WDS Announcement - v0.1.0 - 2016-01-05
 * http://webdevstudios.com
 *
 * Copyright (c) 2016;
 * Licensed GPLv2+
 */

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

/**
 * WDS Announcement Banner
 * http://webdevstudios.com
 *
 * Licensed under the GPLv2+ license.
 */

var that = window.WDS_Announcement_Banner = window.WDS_Announcement_Banner || {};

var jsCookie = require('js-cookie');

(function (window, document, $, that) {
	var $c = {};

	that.init = function () {
		that.cache();
		that.bindEvents();
		that.doAnnouncements();
	};

	that.cache = function () {
		$c.window = $(window);
		$c.document = $(document);
		$c.body = $(document.body);
		$c.announcementBar = $('.announcement-display');
		$c.page = $('#page');
		$c.dismiss = $('#dismiss');
		$c.header = $('#masthead');
		$c.wpAdminBar = $('#wpadminbar');
	};

	that.bindEvents = function () {
		$c.body.on('load', announcementAdded);
		$c.dismiss.on('click', setCookie);
		$c.window.on('scroll, resize', announcementAdded);
		$c.window.on('scroll', stickyHeaderCheck);
		$c.document.on('ready', stickyHeaderCheck, wpAdminBarCheck);
		$c.window.on('resize', wpAdminBarCheck);
	};

	// If there is no cookie then display Announcement and set page position
	that.doAnnouncements = function (e, $this) {
		if (!jsCookie.get('dismiss-announcement')) {
			$c.body.addClass('has-announcement');
			setPagePosition();
		}
	};

	// set a cookie and remove body.has-announcement class
	var setCookie = function setCookie() {
		jsCookie.set('dismiss-announcement', 1, { expires: 1 });
		$c.body.removeClass('has-announcement');
		removePagePosition();
	};

	// Set #page position based on height of the Announcement Bar
	var setPagePosition = function setPagePosition(wpAdminBarHeight) {
		$c.page.css('top', $c.announcementBar.outerHeight());
	};

	var removePagePosition = function removePagePosition() {
		$c.page.css('top', '');
	};

	// Let's play nice with most sticky headers, if they exist
	var stickyHeaderCheck = function stickyHeaderCheck() {
		var headerHeight = $c.header.outerHeight();
		var topPos = $c.document.scrollTop();

		if (topPos > headerHeight && $c.header.css('position') == 'fixed' && $c.announcementBar.css('display') == 'block') {
			$c.header.css('top', $c.announcementBar.outerHeight());
		} else {
			$c.header.css('top', '');
		}
	};

	// Check if WP Admin Bar is showing and play nice if it is.
	var wpAdminBarCheck = function wpAdminBarCheck() {
		if (!$c.wpAdminBar.length) {
			return;
		} else {
			$c.announcementBar.css('margin-top', $c.wpAdminBar.outerHeight() + 'px');
		}
	};

	var announcementAdded = function announcementAdded(e, $this) {
		that.doAnnouncements();
	};

	$(that.init);

	return that;
})(window, document, (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null), window.WDS_Announcement_Banner);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"js-cookie":2}],2:[function(require,module,exports){
/*!
 * JavaScript Cookie v2.1.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		var _OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = _OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init (converter) {
		function api (key, value, attributes) {
			var result;

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value))
						.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				return (document.cookie = [
					key, '=', value,
					attributes.expires && '; expires=' + attributes.expires.toUTCString(), // use expires attribute, max-age is not supported by IE
					attributes.path    && '; path=' + attributes.path,
					attributes.domain  && '; domain=' + attributes.domain,
					attributes.secure ? '; secure' : ''
				].join(''));
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var name = parts[0].replace(rdecode, decodeURIComponent);
				var cookie = parts.slice(1).join('=');

				if (cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					cookie = converter.read ?
						converter.read(cookie, name) : converter(cookie, name) ||
						cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.get = api.set = api;
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));

},{}]},{},[1]);
