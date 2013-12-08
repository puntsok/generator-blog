/* global require, console */

require([
    'handlebars', 'eventEmitter', 'handlebarsHelpers',
    'expartial', 'exampleTemplate',
], function(hb, eventEmitter, handlebarsHelpers, expartial, exampleTemplate) {
    'use strict';

    var
        create = Object.create.bind(Object),
        Activity = function Activity() {},
        proto = Activity.prototype = create(Object.prototype);

    // mixin EventEmitter
    Object.keys(eventEmitter.prototype).forEach( function(key) {
        proto[key] = eventEmitter.prototype[key];
    });

    proto.constructor = Activity;
    proto.hi = function hi() {
        console.log('hi');
    };

    var
        activity = create(Activity.prototype);

    activity.on('test', function() {
        console.log('test fired');
    });

    activity.trigger('test');
    activity.trigger('test');
    console.dir(activity);

    var
        d = document,
        body = d.body,
        div = d.createElement('div');

    handlebarsHelpers.registerAll();

    div.innerHTML = exampleTemplate({
        firstName: 'Russel',
        lastName:  'Brand',
    });

    body.appendChild(div);
});