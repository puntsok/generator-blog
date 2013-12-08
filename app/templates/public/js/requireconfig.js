/* global require:true */

var require = {
    urlArgs: 'bust=' + new Date().getTime(),
    paths: {
        requireLib: '../assets/requirejs/require',
        jquery:     '../assets/jquery/jquery',
        underscore: '../assets/underscore/underscore',
        backbone:   '../assets/backbone/backbone',
        eventEmitter: '../assets/eventEmitter/EventEmitter',

        // Handlebars:
        
        handlebars: '../assets/handlebars.js/dist/handlebars.runtime',
            // templates
        exampleTemplate: './templates/example',
        expartial: './templates/_expartial',
        // helpers
        handlebarsHelpers: './handlebarsHelpers',
    },
    shim: {
        underscore: {
            'exports': '_'
        },
        backbone: {
            'deps': ['jquery', 'underscore'],
            'exports': 'Backbone'
        },
        handlebars: {
            'exports': 'Handlebars'
        }
    }
};
window.require = require;