module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    var pkg = grunt.file.readJSON('package.json');
    var bannerTemplate = '/**\n' + ' * <%= pkg.title %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' + ' * <%= pkg.author.url %>\n' + ' *\n' + ' * Copyright (c) <%= grunt.template.today("yyyy") %>;\n' + ' * Licensed GPLv2+\n' + ' */\n';
    var compactBannerTemplate = '/** ' + '<%= pkg.title %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> | <%= pkg.author.url %> | Copyright (c) <%= grunt.template.today("yyyy") %>; | Licensed GPLv2+' + ' **/\n';
    // Project configuration
    grunt.initConfig({
        pkg: pkg,
        watch: {
            styles: {
                files: [
                    'assets/**/*.css',
                    'assets/**/*.scss'
                ],
                tasks: ['styles'],
                options: {
                    spawn: false,
                    livereload: true,
                    debounceDelay: 500
                }
            },
            scripts: {
                files: ['assets/**/*.js'],
                tasks: ['scripts'],
                options: {
                    spawn: false,
                    livereload: true,
                    debounceDelay: 500
                }
            },
            php: {
                files: [
                    '**/*.php',
                    '!vendor/**.*.php'
                ],
                tasks: ['php'],
                options: {
                    spawn: false,
                    debounceDelay: 500
                }
            }
        },
        makepot: {
            dist: {
                options: {
                    domainPath: '/languages/',
                    potFilename: pkg.name + '.pot',
                    type: 'wp-plugin'
                }
            }
        },
        addtextdomain: {
            dist: {
                options: { textdomain: pkg.name },
                target: { files: { src: ['**/*.php'] } }
            }
        },
        jshint: {
            all: [
                'assets/js/components/**/*.js',
                '!**/*.min.js'
            ],
            options: {
                browser: true,
                esnext: true,
                predef: [
                    'document',
                    'window',
                    'jQuery',
                    'require',
                    'undefined'
                ]
            }
        },
		/**
		 * Minify SVGs using SVGO.
		 *
		 * @link https://github.com/sindresorhus/grunt-svgmin
		 */
		svgmin: {
			options: {
				plugins: [
					{ removeComments: true },
					{ removeUselessStrokeAndFill: false },
					{ removeEmptyAttrs: true }
				]
			},
			dist: {
				files: [{
					expand: true,
					cwd: '',
					src: ['assets/images/*.svg'],
					dest: ''
				}]
			}
		},
        browserify: {
            options: {
                stripBanners: true,
                banner: bannerTemplate,
                transform: [
                    [
                        'babelify',
                        { presets: ['es2015'] }
                    ],
                    'browserify-shim'
                ]
            },
            dist: { files: { 'assets/js/wds-announcements.js': 'assets/js/components/main.js' } }
        },
        uglify: {
            dist: {
                files: { 'assets/js/wds-announcements.min.js': 'assets/js/wds-announcements.js' },
                options: { banner: compactBannerTemplate }
            }
        },
        sass: {
            dist: {
                options: { 
					outputStyle: 'expanded',
					sourceComments: true,
					sourceMap: true,
				},
                files: { 'assets/css/wds-announcements.css': 'assets/css/sass/styles.scss' }
            }
        },
		/**
		 * Apply several post-processors to CSS using PostCSS.
		 *
		 * @link https://github.com/nDmitry/grunt-postcss
		 */
		postcss: {
			options: {
				map: true,
				processors: [
					require('autoprefixer')({ browsers: 'last 2 versions' }),
					require('css-mqpacker')({ sort: true }),
			]},
			dist: {
				src: ['assets/css/wds-announcements.css']
			}
		},
		/**
		 * A modular minifier, built on top of the PostCSS ecosystem.
		 *
		 * @link https://github.com/ben-eb/cssnano
		 */
		cssnano: {
			options: {
				autoprefixer: false,
				safe: true,
			},
			dist: {
				files: {
					'assets/css/wds-announcements.min.css': 'assets/css/wds-announcements.css'
				}
			}
		},
        usebanner: {
            taskName: {
                options: {
                    position: 'top',
                    banner: bannerTemplate,
                    linebreak: true
                },
                files: { src: ['assets/css/wds-announcements.min.css'] }
            }
        }
    });
    // Default task.
    grunt.registerTask('scripts', [
        'jshint',
        'browserify',
        'uglify'
    ]);
	grunt.registerTask('images', [
		'svgmin'
	])
    grunt.registerTask('styles', [
        'sass',
        'postcss',
		'cssnano',
        'usebanner'
    ]);
    grunt.registerTask('php', [
        'addtextdomain',
        'makepot'
    ]);
    grunt.registerTask('default', [
        'images',
		'styles',
        'scripts',
        'php'
    ]);
    grunt.util.linefeed = '\n';
};