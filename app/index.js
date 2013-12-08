'use strict';

var
    // core dependencies
    // util   = require('util'),
    path   = require('path'),

    // external dependencies
    yeoman = require('yeoman-generator'),
    chalk  = require('chalk'),
    sh     = require('execSync'),

    // internal dependencies:
    helpers = require('./support/helpers'),
    prompts = require('./config/prompts.js'),

    // aliases:
    Base = yeoman.generators.Base,

    // helpers:
    // toArray = helpers.toArray,
    mixin   = helpers.mixin,

    // shortcuts:
    log = console.log.bind(console);

// BlogGenerator:
var BlogGenerator /* extends Base */ = {

    initialize: function (args, options, config) {
        Base.apply(this, arguments);
        this._setState(options);
        this._bindEvents();
    },
    _setState: function (options) {
        var
            filePath = path.join(__dirname, '../package.json'),
            contents = this.readFileAsString(filePath);

        this.pkg = JSON.parse(contents);

        this.skipInstall = options['skip-install'];
    },
    _bindEvents: function () {
        this.on('end', function () {
            this.installDependencies({ skipInstall: this.skipInstall });
            // this._goodbye();
        });
    },
    _installDependencies: function() {
        var
            done = this.async();
    },
    _welcome: function () {
        sh.run('clear');
        log(chalk.cyan('Blog Generator'));
        log(chalk.yellow('Node Version: ' + process.version));
        log(chalk.red('process.cwd(): ' + process.cwd()));
    },
    _goodbye: function() {
        sh.run('grunt concat');
        sh.run('grunt sass');
        sh.run('grunt handlebars');

        log(
            'After bower components are installed,' +
            ' you might want to lock down the versions'
        );
        log('');

        log('You may want to copy the `public/htaccess-sample` to `public/.htaccess`');
        log('');

        log('Remember, your bower components should be included in repo.');
        log('(That is, the `public/assets` will not be in `.gitignore`)');
        log('');
        log('Go ahead and store your repo somewhere now!');
    },
    _mkdirAndKeep: function(name) {
        this.mkdir(name);
        this.copy('gitkeep', name + '/.gitkeep');
    },
    askFor: function () {
        this._welcome();

        var
            ins = this,
            cb  = ins.async();

        ins.prompt(prompts, function (props) {
            mixin(ins, props);
            cb();
        });
    },
    app: function () {

        if (this.clearOutDirectory) {
            log('clearing out directory');
            sh.exec('rm -rf *');
            sh.exec('rm -rf .*');
        }

        this.mkdir('public');
        this._mkdirAndKeep('public/img');

        this.copy('public/_index.html', 'public/index.html');

        // css
        this.mkdir('public/css');
        this.copy('public/css/main.scss');

        // markdown
        this.copy('public/css/github.css');
        this.copy('public/README-layout.html');

        // js and requirejs
        this.mkdir('public/js');
        this.copy('public/js/requireconfig.js');
        this.copy('public/js/main.js');
        this.copy('public/js/bootstrap.js');
        this.copy('public/js/handlebarsHelpers.js');

        // handlebars:
        this._mkdirAndKeep('precompiled_templates');
        this._mkdirAndKeep('public/js/templates');
        this.copy('precompiled_templates/example.mustache');
        this.copy('precompiled_templates/_expartial.mustache');
        // TODO: explain that user should link web folder to public
   
        // Node and Grunt
        this.template('_package.json', 'package.json');
        this.copy('_Gruntfile.js', 'Gruntfile.js');

        // Bower
        this.copy('bowerrc', '.bowerrc');
        this.copy('_bower.json', 'bower.json');
        this._mkdirAndKeep('public/assets');

        // General
        this.copy('editorconfig', '.editorconfig');
        this.copy('jshintrc', '.jshintrc');
        // TODO: explain to user the need to use jshint
        
        this.copy('htaccess-sample', 'public/.htaccess-sample');
        this.copy('htaccess-sample', 'public/.htaccess');

        this.copy('robots.txt', 'public/robots.txt');
        this.copy('gitignore', '.gitignore');
        if (this.createReadme) this.copy('README.md', 'README.md');
    }
};

var BlogGeneratorConstructor = function BlogGenerator(args, options, config) {
    this.initialize.apply(this, arguments);
};
BlogGeneratorConstructor.prototype = Object.create(Base.prototype);
mixin(BlogGeneratorConstructor.prototype, BlogGenerator);

module.exports = BlogGeneratorConstructor;

//util.inherits(BlogGenerator, yeoman.generators.Base);
