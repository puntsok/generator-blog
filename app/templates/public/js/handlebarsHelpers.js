define(['handlebars'], function(Handlebars) {
    'use strict';

    var
        safe = function safe(str) {
            return new Handlebars.SafeString(str);
        },
        escaped = Handlebars.Utils.escapeExpression;
    
    var helpers = {
        makeBold: function makeBold(str) {
            var other = escaped("<strong>: ");
            return safe(other + '<strong>' + str + '</strong>');
            // return '<strong>' + str + '</strong>'; // would be escaped
        },
    };

    return {
        registerAll: function registerAll() {
            Object.keys(helpers).forEach( function(key) {
                Handlebars.registerHelper(key, helpers[key]);
            });
        },
    };
});