/* global console */

(function() {
    'use strict';

    var
        w = window,
        d = document,
        s = d.createElement('script'),
        h = d.querySelector('head'),
        host  = w.location.host,
        isDev = ! (host.match(/^prod/) || w.cordova),
        timestamp  = (new Date()).getTime(),
        path = isDev ? 'js/require-dev.js' : 'js/build-min.js',
        ls = localStorage,
        log = console.log.bind(console),
        on = function on(obj, eventName, cb) {
            return obj.addEventListener(eventName, cb.bind(obj), false);
        };

    s.src = path + '?' + timestamp;
    if (isDev) s.setAttribute('data-main', 'js/main');
    h.appendChild(s);

    // this can all go in external Javascript
    function setStyle(css) {
        var style = d.createElement('style');
        style.innerHTML = css;
        style.rel = 'stylesheet';
        h.appendChild(style);
    }

    if (ls.style) {
        setStyle(ls.style);
    } else {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'css/main.css');
        on(xhr, 'load', function() {
            log(xhr.status);
            if (xhr.status === 200) {
                log('status was 200');
                setStyle(xhr.response);
                ls.style = xhr.response;
            } else {
                // it failed (like 404);
            }
        });
        on(xhr, 'error', function(e) {
            // can't find server, etc
        });
        xhr.send();    
    }

})();  