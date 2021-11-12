---
name: post
layout: post
title: "Getting giddy over Grunt."
tags: js javascript grunt automation
---

[Grunt](http://gruntjs.com/) is an aptly named JavaScript taskrunner that - once
set up - does a dirty great chunk of the grunt (_heh_) work for you.

There's an ever growing list of [plugins out there](http://gruntjs.com/plugins)
that're ready to automate the repetitive tasks like compiling, testing, setup,
building, linting, etc, that we have to do every day. Lets automate that shit!

Grunt has become a fundamental part of my workflow. I'm going to show you how I have
it set up and, [after installation](#installation), we'll get it to:

- Compile our [Sass / Compass](#sass)
- [Watch](#watch) for changes, recompile and [LiveReload](#watch) 
- Compile our [Coffeescript](#coffeescript)
- Build our Js with [Require Js](#requirejs) and text
- Create a custom [Modernizr](#modernizr) build
- Optimize our [images](#images)

If you've been here before, feel free to skip to the [tl;dr](#tldr) for the complete gruntfile.


## Case

Let's imagine our app currently has a directory structure like this:

    $ tree
    ├── app
    │   └── ..
    ├── public
    │   ├── css
    │   │   └── main.css
    │   ├── img
    │   │   ├── logo.png
    │   │   ├── icon.png
    │   │   ├── photo.jpg
    │   │   └── sprite.png
    │   └── js
    │       ├── vendor
    │       │   ├── modernizr.js
    │       │   ├── plugin_one.js
    │       │   └── plugin_two.js
    │       ├── bar.js
    │       ├── foo.js
    │       └── main.js
    ├── gruntfile.js
    └── package.json


## Guide

#### Install Grunt {#installation}

Grunt is a command line app. We'll need to install it globally so we can access
it from anywhere on the system.

    $ npm install -g grunt-cli

_Prerequisites: [Node.js](http://nodejs.org/) and it's package manager; [npm](https://npmjs.org/)._

This will put `$ grunt` in your system path.

If we dropped the `-g` (global) flag, the package would be installed locally
within this project _only_, and not be available system wide.


#### Create a package.json

The `package.json` file is where information about your application is stored, such as
it's name, version, authors, homepage, etc. More importantly (to us at least), is
that it remembers any dependencies of your application, so anyone else who works
on your project can install the very same dependencies and be up and running in a jiffy.

If you've used composer before, this is the node equivalent to your `composer.json` file.

Here's a basic `package.json` file.

    {
      "name": "grunt-demo",
      "version": "0.1.0",
      "devDependencies": {
          "grunt": "~0.4.1",
      }
    }

_note: You **can** `$ npm init` to generate a `package.json` file._


#### Install the packages.

`npm` has a couple of commands you'll use a lot: `install` and `update`.

Install will read the dependencies listed in `package.json` and install them.

    $ npm install

Update will (obviously) update your dependencies to newer versions (within
the 'version bounds' set within `package.json`).

    $ npm update

To install a new package, we run install again with a couple of options:

    $ npm install PACKAGE_NAME --save-dev

The `--save-dev` flag will update your `package.json` file with the new dependency.


#### Create a gruntfile.js

Grunt reads the `gruntfile.js` file. This is the file where you define and configure
your tasks. Below is a template for the `gruntfile.js` file. 

Take note of where the hashed numbers (e.g. `#1`) are, we'll reference these points later.

    module.exports = function (grunt) {
        grunt.initConfig({
            // Load in data from package.json.
            // Now pkg.name == 'grunt-demo'
            pkg : grunt.file.readJSON('package.json'),

            // #1 Define a task
            TASK : {
                ROUTINE : {
                    //..
                }
            }
        });

        // #2 Load the package
        grunt.loadNpmTasks('PACKAGE');

        // #3 Register a task
        grunt.registerTask('REGISTERED', [
            'TASK' // Or, more verbosely, 'TASK:ROUTINE'
        ]);
    };

In this one file, we can tell grunt what packages to load, configure and define
our tasks/routines. It's brilliantly simple.

Before we go any further, let's just clarify what a package, task, routine and registered is:

Package
: Within the context of Grunt, a package is really a plugin. Anyone can write a 
package that does anything they reqiure, whether it be compiling sass, minifying
images, etc. The great thing about Grunt is that the community have already written a whole
bunch of [great packages already](http://gruntjs.com/plugins)!

Task
: A task is a loaded, configured and 'executable' plugin. For example, the
`grunt-sass` package will allow you to compile and minify SASS files with the task
`$ grunt sass`.

Routine
: Tasks can be configured in multiple ways to achieve different results. For example,
we could configure sass to compile `expanded` throught development with `$ grunt sass:development`,
and `compressed` on release with `$ grunt sass:release`

Registered
: A registered task is a set of tasks that are run with a single command. For example, you
may want to run the `sass`, `coffeescript` and `imagemin` tasks one after the
other, automatically in a routine called 'release' by with `$ grunt release`.


#### Usage

Run registered tasks (`REGISTERED` is `default` by default).

    $ grunt [REGISTERED]

Run a task

    $ grunt TASK[:ROUTINE]


### Sass & Compass {#sass}

All great css started life as [Sass](http://sass-lang.com/).

Sass is a css preprocessor that offers great features like variables,
nesting, imports, mixins, inheritence and much much more.

So, with that in mind let's create a few [Sass](http://sass-lang.com/) 
files that will compile and minify into `main.min.css`.

    $ tree
    .
    ├── public
    │   ├── css
    │   │   └── main.min.css
    |   .
    │   └── sass
    │       ├── _bar.scss
    │       ├── _foo.scss
    │       └── main.
    .

#### Install [`grunt-sass`](https://github.com/sindresorhus/grunt-sass)

Install the `grunt-sass` package locally, and tell npm to add it to your `package.json`
file as a development dependency.

    $ npm install grunt-sass --save-dev

#### Define

How a package is configured is dependent on that paticular package. However,
they do follow a very similar pattern. Here we set up sass to accept one source `.scss`
file, compile and compress it (with compass) into one minified `.css` file.

    // #1 Define a task
    sass : {
        main : {
            options : {
                // style : ['nested', 'expanded', 'compact', 'compressed']
                style   : 'compressed',
                compass : true
            },
            files : {
                // destination : source
                'public/css/main.min.css' : 'public/sass/main.scss'
            }
        }
    }

#### Load

    // #2 Load the package
    grunt.loadNpmTasks('grunt-sass');

#### Register

Register the default sass task to default, so we can simply run `$ grunt`.

    // #3 Register a task
    grunt.registerTask('default', ['sass']);

#### Run

    $ grunt [sass]


### Watch & LiveReload {#watch}

By default, Grunt will execute your tasks and finish. This quickly becomes annoying
once you start developing anything: _make changes_, _save changes_, _run grunt_,
_reload browser_, _make changes_, _sa..._ Ugh.

Watch will automate this! It monitors the filesystem for changes and will trigger
the appropriate tasks again for you.

Add in LiveReload and it'll even reload your browser for you. What a hoot.

#### Install [`grunt-contrib-watch`](https://github.com/gruntjs/grunt-contrib-watch)

    $ npm install grunt-contrib-watch --save-dev

#### Define

    // #1 Define a task
    watch : {
        options : {
            livereload : true
        }
        sass : {
            // **/*.scss will match all of these:
            // ./main.scss
            // ./nested/file.scss
            // ./very/deeply/nested/file.scss
            files : 'public/sass/**/*.scss',
            tasks : ['sass']
        }
    }

#### Load

    // #2 Load the package
    grunt.loadNpmTasks('grunt-contib-watch');

#### Register

**PROTIP:** Add watch to the end of your default task. Start working with a simple `$ grunt`.

    // #3 Register a task
    grunt.registerTask('default', ['sass', 'watch]);

#### Run

    $ grunt [watch]

_Prerequisites: The [LiveReload browser extension](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei)
(for that magical reload)._


### CoffeeScript {#coffeescript}

[CoffeeScript](http://coffeescript.org) is a great little language that compiles
into JavaScript. It's actually makes writing JavaScript enjoyable again!

We'll be using [RequireJs](#requirejs) later to build and optimize our JavaScript,
so we'll set up CoffeeScript to compile each `.coffee` file into the equivalent `.js` file, 1-for-1.

    $ tree
    .
    ├── public
    │   ├── coffee
    │   │   ├── bar.coffee
    │   │   ├── foo.coffee
    │   │   └── main.coffee
    |   .
    │   ├── js
    │   │   ├── bar.js
    │   │   ├── foo.js
    │   │   ├── main.js
    .   .   .

#### Install [`grunt-contrib-coffee`](https://github.com/gruntjs/grunt-contrib-coffee)

    $ npm install grunt-contrib-coffee --save-dev

#### Define

    // #1 Define a task
    coffee : {
        compile : {
            expand : true,
            cwd : 'public/coffee',
            src : '**/*.coffee',
            dest : 'public/js',
            ext : '.js'
        }
    },

#### Load

    // #2 Load the package
    grunt.loadNpmTasks('grunt-contib-coffee');

#### Register

We can now run `$ grunt coffee` to compile our CoffeeScript, but since we have sass
set up to compile too, let's register them as `build`.

    // #3 Register a task
    grunt.registerTask('build', ['sass', 'coffee']);
    grunt.registerTask('default', ['build', 'watch]);

#### Run

    $ grunt [coffee]


### RequireJs (with text) {#requirejs}

Websites are fast becomming Web apps, codebases grow fat with horrible JavaScript
sphagetti, HTTP requests are in <del>double</del> tripple figures! 

Who's to blame? JavaScript. No really, who's to blame? _me_.

[RequireJs](http://requirejs.org) (and [AMD](http://github.com/amdjs/amdjs-api/wiki/AMD) in general)
will help you structure your code much, _much_ better, and make building a breeze.


    $ tree
    .
    ├── public
    |   .
    │   ├── js
    │   │   ├── vendor
    │   │   │   ├── ..
    │   │   │   ├── plugin_one.js
    │   │   │   └── plugin_two.js
    │   │   ├── bar.js
    │   │   ├── foo.js
    │   │   ├── main.js
    │   │   └── main.min.js
    .   .
    │   ├── templates
    │   │   ├── index.html
    │   │   ├── header.html
    │   │   └── partial.html
    .   .

#### Install [`grunt-contrib-requirejs`](https://github.com/gruntjs/grunt-contrib-requirejs)

    $ npm install grunt-contrib-requirejs --save-dev

#### Define

**CONFESSION:** From what I can tell, we pretty much have to duplicate the settings
from the `require.config({ .. })` in our `main.js` file here. That sucks, [let me know](https://github.com/aaronlord/aaronlord.github.io)
if you know of a better way. thanks xx

    // #1 Define a task
    requirejs : {
        release : {
            options : {
                baseUrl : 'public/js',
                name : 'main',
                out : 'public/js/main.min.js',
                stubModules : ['text'],
                paths : {
                    text : 'vendor/text',
                    templates : '../templates',
                    jquery : 'vendor/jquery/jquery'
                    //..
                },
                shim: {
                    jquery: {
                        exports: 'jQuery'
                    }
                    //..
               }
            }
        }
    }

#### Load

    // #2 Load the package
    grunt.loadNpmTasks('grunt-contib-requirejs');

#### Register

See why we created the build task earlier? Let's use it again in out release task.

    // #3 Register a task
    grunt.registerTask('build', ['sass', 'coffee']);
    grunt.registerTask('default', ['build', 'watch]);
    grunt.registerTask('release', ['build', 'requirejs']);

#### Run

    $ grunt release


### Modernizr {#modernizr}

[Modernizr](http://modernizr.com) gives us a tonne of feature detection goodness.
But it's doubtful we'll use _all_ of it. So let's trim the fat ... automatically.

`grunt-modernizr` is super sweet. It'll take a look at your files to determine what
Modernizr features you're _actually_ using, pluck them from a development copy
you have laying around (_\*cough\*_ [use bower](http://bower.io) _\*cough\*_) and spit
you our a lean, minified, custom build. Hot.

    $ tree
    .
    ├── public
    │   ├── css
    │   │   └── main.min.css
    |   .
    │   ├── js
    │   │   ├── vendor
    │   │   │   ├── modernizr.js
    │   │   │   └── ..
    │   │   ├── ..
    │   │   └── modernizr.min.js // output file
    .   .

#### Install [`grunt-modernizr`](https://github.com/Modernizr/grunt-modernizr)

    $ npm install grunt-modernizr --save-dev

#### Define

    // #1 Define a task
    modernizr : {
        devFile    : "public/js/vendor/modernizr.js",
        outputFile : "public/js/modernizr.min.js",
        extra : {
            // Include w/e you like
            shiv       : true,
            printshiv  : false,
            load       : true,
            mq         : true,
            cssclasses : true
        },
        files : [
            "public/css/main.min.css",
            "public/js/main.min.js"
            // include anything that uses modernizr,
            // remember you can use **/*.ext
        ]
    },

#### Load

    // #2 Load the package
    grunt.loadNpmTasks('grunt-modernizr');

#### Register

The great thing about this is, we can work in development with the feature-rich
development copy of Modernizr, and simply create our custom build on release.

    // #3 Register a task
    grunt.registerTask('build', ['sass', 'coffee']);
    grunt.registerTask('default', ['build', 'watch]);
    grunt.registerTask('release', ['build', 'requirejs', 'modernizr']);

#### Run

    $ grunt release

### Image optimisation {#images}

I hate optimizing images manualy. So I don't.

    $ tree
    .
    ├── public
    │   ├── img
    │   │   ├── sprites
    │   │   │   └── .. // compass will output to ../sprite.png
    │   │   ├── logo.png
    │   │   ├── photo.jpg
    │   │   └── sprite.png
    .   .

#### Install [`grunt-contrib-imagemin`](https://github.com/gruntjs/grunt-contrib-imagemin)

    $ npm install grunt-contrib-imagemin --save-dev

#### Define

**CAUTION:** I live life on the edge. My optimized images replace their chubby
predecessors. If, for whatever reason it goes wrong the originals are gone forever.
Change the dest(ination) directories to something else if you're a girl.

*[forever]: A back-up a day...

    // #1 Define a task
    imagemin : {
        png : {
            options: {
                optimizationLevel: 7
            },
            files : [
                {
                    expand : true,
                    cwd : 'public/img',
                    src : ['**/*.png'],
                    dest : 'public/img',
                    ext : '.png'
                }
            ]
        },
        jpg : {
            options : {
                progressive: true
            },
            files : [
                {
                    expand : true,
                    cwd : 'public/img',
                    src : ['**/*.jpg'],
                    dest : 'public/img',
                    ext : '.jpg'
                }
            ]
        }
    },

#### Load

    // #2 Load the package
    grunt.loadNpmTasks('grunt-contrib-imagemin');

#### Register

Again, we only care about this on release; add it to the list.

    // #3 Register a task
    grunt.registerTask('build', ['sass', 'coffee']);
    grunt.registerTask('default', ['build', 'watch]);
    grunt.registerTask('release', ['build', 'requirejs', 'modernizr', 'imagemin']);

#### Run

    $ grunt release

## Guide tl;dr {#tldr}

`gruntfile.js`

    module.exports = function (grunt) {
        grunt.initConfig({
            pkg : grunt.file.readJSON('package.json'),
            sass : {
                main : {
                    options : {
                        style   : 'compressed',
                        compass : true
                    },
                    files : {
                        'public/css/main.min.css' : 'public/sass/main.scss'
                    }
                }
            },
            coffee : {
                compile : {
                    expand : true,
                    cwd : 'public/coffee',
                    src : '**/*.coffee',
                    dest : 'public/js',
                    ext : '.js'
                }
            },
            watch : {
                options : {
                    livereload : true
                }
                sass : {
                    files : 'public/sass/**/*.scss',
                    tasks : ['sass']
                }
            },
            requirejs : {
                release : {
                    options : {
                        baseUrl : 'public/js',
                        name : 'main',
                        out : 'public/js/main.min.js',
                        stubModules : ['text'],
                        paths : {
                            text : 'vendor/text',
                            templates : '../templates',
                        },
                        shim: { }
                    }
                }
            },
            modernizr : {
                devFile    : "public/js/vendor/modernizr.js",
                outputFile : "public/js/modernizr.min.js",
                extra : {
                    shiv       : true,
                    printshiv  : false,
                    load       : true,
                    mq         : true,
                    cssclasses : true
                },
                files : [
                    "public/css/main.min.css",
                    "public/js/main.min.js"
                ]
            },
            imagemin : {
                png : {
                    options: {
                        optimizationLevel: 7
                    },
                    files : [
                        {
                            expand : true,
                            cwd : 'public/img',
                            src : ['**/*.png'],
                            dest : 'public/img',
                            ext : '.png'
                        }
                    ]
                },
                jpg : {
                    options : {
                        progressive: true
                    },
                    files : [
                        {
                            expand : true,
                            cwd : 'public/img',
                            src : ['**/*.jpg'],
                            dest : 'public/img',
                            ext : '.jpg'
                        }
                    ]
                }
            }
        });

        grunt.loadNpmTasks('grunt-sass');
        grunt.loadNpmTasks('grunt-contib-coffee');
        grunt.loadNpmTasks('grunt-contib-watch');
        grunt.loadNpmTasks('grunt-contib-requirejs');

        grunt.registerTask('build', ['sass', 'coffee']);
        grunt.registerTask('default', ['build', 'watch]);
        grunt.registerTask('release', ['build', 'requirejs', 'modernizr', 'imagemin']);
    };

`package.json`

    {
        "name": "grunt-demo",
        "version": "0.1.0",
        "devDependencies": {
            "node-sass" : "~0.7.0",
            "grunt": "~0.4.1",
            "grunt-sass": "~0.8.0",
            "grunt-contrib-watch" : "~0.5.3",
            "grunt-contrib-coffee" : "~0.8.0",
            "grunt-contrib-requirejs" : "~0.4.1",
            "grunt-modernizr" : "~0.4.1",
            "grunt-contrib-imagemin" : "~0.1.4",
        }
    }

While developing:

    $ grunt

To build for release:

    $ grunt release
