/* global define */

(function () {
    'use strict';

    /**
     * Helpers
     */
    
    var helpers = {
        toArray: function (obj) {
            return [].slice.call(obj, 0);
        },
        mixin: function (target, obj) {
            helpers.toArray(Object.keys(obj)).forEach(function (key) {
                target[key] = obj[key];
            });
        }
    };
    

    // Expose the class either via AMD, CommonJS or the global object
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return helpers;
        });
    }
    else if (typeof module === 'object' && module.exports) {
        module.exports = helpers;
    }
    else {
        this.helpers = helpers;
    }
}.call(this));