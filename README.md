# WDS Announcement Banner #
**Contributors:**      WebDevStudios
**Donate link:**       http://webdevstudios.com
**Tags:**
**Requires at least:** 4.3
**Tested up to:**      4.3
**Stable tag:**        0.1.1
**License:**           GPLv2
**License URI:**       http://www.gnu.org/licenses/gpl-2.0.html

## Description ##

Create custom, sticky announcements at the top of your site.

### Usage ###

To display the announcement banner, use either the template tag or the `do_action`:

**Template Tag Method**

```php
<?php echo wds_announcements_content(); ?>
```

You can also immediately echo the announcement without using `echo` by passing a `true` value to the `wds_announcements_content` function.

```php
<?php wds_announcements_content( true ); ?>
```

**`do_action` Method**

```php
<?php do_action( 'wds_do_announcement' ); ?>
```

## Installation ##

### Manual Installation ###

1. Upload the entire `/wds-announcement-banner` directory to the `/wp-content/plugins/` directory.
2. Activate WDS Announcement Banner through the 'Plugins' menu in WordPress.

## Frequently Asked Questions ##


## Screenshots ##


## Changelog ##

### 0.1.1 ###
* added `wds_do_announcement` `do_action`
* added action hooks around and inside the announcement

### 0.1.0 ###
* First release
