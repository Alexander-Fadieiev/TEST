/*!
 * enquire.js v2.1.6 - Awesome Media Queries in JavaScript
 * Copyright (c) 2017 Nick Williams - http://wicky.nillia.ms/enquire.js
 * License: MIT */

!function (a) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = a();else if ("function" == typeof define && define.amd) define([], a);else {
        var b;b = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, b.enquire = a();
    }
}(function () {
    return function a(b, c, d) {
        function e(g, h) {
            if (!c[g]) {
                if (!b[g]) {
                    var i = "function" == typeof require && require;if (!h && i) return i(g, !0);if (f) return f(g, !0);var j = new Error("Cannot find module '" + g + "'");throw j.code = "MODULE_NOT_FOUND", j;
                }var k = c[g] = { exports: {} };b[g][0].call(k.exports, function (a) {
                    var c = b[g][1][a];return e(c ? c : a);
                }, k, k.exports, a, b, c, d);
            }return c[g].exports;
        }for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);return e;
    }({ 1: [function (a, b, c) {
            function d(a, b) {
                this.query = a, this.isUnconditional = b, this.handlers = [], this.mql = window.matchMedia(a);var c = this;this.listener = function (a) {
                    c.mql = a.currentTarget || a, c.assess();
                }, this.mql.addListener(this.listener);
            }var e = a(3),
                f = a(4).each;d.prototype = { constuctor: d, addHandler: function (a) {
                    var b = new e(a);this.handlers.push(b), this.matches() && b.on();
                }, removeHandler: function (a) {
                    var b = this.handlers;f(b, function (c, d) {
                        if (c.equals(a)) return c.destroy(), !b.splice(d, 1);
                    });
                }, matches: function () {
                    return this.mql.matches || this.isUnconditional;
                }, clear: function () {
                    f(this.handlers, function (a) {
                        a.destroy();
                    }), this.mql.removeListener(this.listener), this.handlers.length = 0;
                }, assess: function () {
                    var a = this.matches() ? "on" : "off";f(this.handlers, function (b) {
                        b[a]();
                    });
                } }, b.exports = d;
        }, { 3: 3, 4: 4 }], 2: [function (a, b, c) {
            function d() {
                if (!window.matchMedia) throw new Error("matchMedia not present, legacy browsers require a polyfill");this.queries = {}, this.browserIsIncapable = !window.matchMedia("only all").matches;
            }var e = a(1),
                f = a(4),
                g = f.each,
                h = f.isFunction,
                i = f.isArray;d.prototype = { constructor: d, register: function (a, b, c) {
                    var d = this.queries,
                        f = c && this.browserIsIncapable;return d[a] || (d[a] = new e(a, f)), h(b) && (b = { match: b }), i(b) || (b = [b]), g(b, function (b) {
                        h(b) && (b = { match: b }), d[a].addHandler(b);
                    }), this;
                }, unregister: function (a, b) {
                    var c = this.queries[a];return c && (b ? c.removeHandler(b) : (c.clear(), delete this.queries[a])), this;
                } }, b.exports = d;
        }, { 1: 1, 4: 4 }], 3: [function (a, b, c) {
            function d(a) {
                this.options = a, !a.deferSetup && this.setup();
            }d.prototype = { constructor: d, setup: function () {
                    this.options.setup && this.options.setup(), this.initialised = !0;
                }, on: function () {
                    !this.initialised && this.setup(), this.options.match && this.options.match();
                }, off: function () {
                    this.options.unmatch && this.options.unmatch();
                }, destroy: function () {
                    this.options.destroy ? this.options.destroy() : this.off();
                }, equals: function (a) {
                    return this.options === a || this.options.match === a;
                } }, b.exports = d;
        }, {}], 4: [function (a, b, c) {
            function d(a, b) {
                var c = 0,
                    d = a.length;for (c; c < d && b(a[c], c) !== !1; c++);
            }function e(a) {
                return "[object Array]" === Object.prototype.toString.apply(a);
            }function f(a) {
                return "function" == typeof a;
            }b.exports = { isFunction: f, isArray: e, each: d };
        }, {}], 5: [function (a, b, c) {
            var d = a(2);b.exports = new d();
        }, { 2: 2 }] }, {}, [5])(5);
});
/*global jQuery */
/*!
* Lettering.JS 0.7.0
*
* Copyright 2010, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Thanks to Paul Irish - http://paulirish.com - for the feedback.
*
* Date: Mon Sep 20 17:14:00 2010 -0600
*/
(function ($) {
    function injector(t, splitter, klass, after) {
        var text = t.text(),
            a = text.split(splitter),
            inject = '';
        if (a.length) {
            $(a).each(function (i, item) {
                inject += '<span class="' + klass + (i + 1) + '" aria-hidden="true">' + item + '</span>' + after;
            });
            t.attr('aria-label', text).empty().append(inject);
        }
    }

    var methods = {
        init: function () {

            return this.each(function () {
                injector($(this), '', 'char', '');
            });
        },

        words: function () {

            return this.each(function () {
                injector($(this), ' ', 'word', ' ');
            });
        },

        lines: function () {

            return this.each(function () {
                var r = "eefec303079ad17405c889e092e105b0";
                // Because it's hard to split a <br/> tag consistently across browsers,
                // (*ahem* IE *ahem*), we replace all <br/> instances with an md5 hash
                // (of the word "split").  If you're trying to use this plugin on that
                // md5 hash string, it will fail because you're being ridiculous.
                injector($(this).children("br").replaceWith(r).end(), r, 'line', '');
            });
        }
    };

    $.fn.lettering = function (method) {
        // Method calling logic
        if (method && methods[method]) {
            return methods[method].apply(this, [].slice.call(arguments, 1));
        } else if (method === 'letters' || !method) {
            return methods.init.apply(this, [].slice.call(arguments, 0)); // always pass an array
        }
        $.error('Method ' + method + ' does not exist on jQuery.lettering');
        return this;
    };
})(jQuery);

function SVGInliner(elements) {
    "use strict";

    this.elements = elements;
    this.results = {};
    this.images = [];
    this.init();
}

SVGInliner.prototype.init = function () {
    "use strict";

    this.replaceImages();
};

SVGInliner.prototype.isSVG = function (img) {
    "use strict";

    if (img.hasAttribute("src")) {
        var splits = img.getAttribute("src").split(".");

        return splits[splits.length - 1].substr(0, 3) === "svg";
    } else {
        return false;
    }
};

SVGInliner.prototype.replaceImages = function () {
    "use strict";

    for (var i = 0; i < this.elements.length; i++) {
        if (this.isSVG(this.elements[i])) {
            this.images.push(new SVGImage(this.elements[i], this));
        }
    }
};

function SVGImage(img, inliner) {
    "use strict";

    this.image = img;
    this.inliner = inliner;

    if (img !== null && typeof img !== "undefined") {
        this.image.style.display = "none";

        this.getData(function (element) {
            this.createSVG(element);
            this.injectSVG();
        }.bind(this));
    }
}

SVGImage.prototype.getData = function (cb) {
    "use strict";

    var src = this.image.getAttribute("src");

    if (typeof this.inliner.results[src] !== "undefined") {
        cb(this.inliner.results[src]);
    } else {

        this.xhr = new XMLHttpRequest();
        this.xhr.onload = function (e) {
            if (this.xhr.status === 200) {
                this.inliner.results[src] = this.xhr.responseXML;

                cb(this.xhr.responseXML);
            }
        }.bind(this);
        this.xhr.open("GET", src, true);
        this.xhr.overrideMimeType("image/svg+xml");
        this.xhr.send("");
    }
};

SVGImage.prototype.createSVG = function (element) {
    "use strict";

    this.element = element.firstChild ? element.firstChild : element;

    if (this.hasHash()) {
        this.filterSVG();
    }
};

SVGImage.prototype.cloneAttributes = function () {
    "use strict";

    var className = this.image.getAttribute("class");
    if (className !== null) {
        this.element.setAttribute("class", className);
    }

    var idName = this.image.getAttribute("id");
    if (idName !== null) {
        this.element.setAttribute("id", idName);
    }
};

SVGImage.prototype.filterSVG = function () {
    "use strict";

    var hash = this.extractHash();
    var id = hash[hash.length - 1];
    var width = 0;
    var height = 0;

    var children = this.element.getElementsByTagName("svg");
    for (var i = 0; i < children.length; i++) {
        if (children[i].getAttribute("id") === id) {
            this.element = children[i];
            this.setDefaultAttributes();
        }
    }
};

SVGImage.prototype.setDefaultAttributes = function () {
    "use strict";

    this.element.setAttribute("y", "0px");
    this.element.setAttribute("x", "0px");
    this.element.setAttribute("version", "1.1");
    this.element.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    this.element.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
    this.element.setAttribute("preserveAspectRatio", "xMidYMid meet");
    this.element.setAttribute("xml:space", "preserve");
    this.element.removeAttribute("width");
    this.element.removeAttribute("height");
};

SVGImage.prototype.hasHash = function () {
    "use strict";

    return this.image.getAttribute("src").indexOf("#") !== -1;
};

SVGImage.prototype.extractHash = function () {
    "use strict";

    return this.image.getAttribute("src").split("#");
};

SVGImage.prototype.injectSVG = function () {
    "use strict";

    this.cloneAttributes();

    this.image.parentNode.replaceChild(this.element, this.image);
};

if (typeof module !== "undefined") {
    module.exports = SVGInliner;
}
'use strict';
document.addEventListener('DOMContentLoaded', function () {

    if (document.querySelector('.s_test_title')) {
        $(".s_test_title").lettering();
    }

    function animationLetters() {
        let tl = new TimelineMax();
        tl.staggerFromTo('.s_test_title span', 0.3, { y: 20, opacity: 0 }, { y: 0, opacity: 1, ease: Back.easeOut.config(3) }, 0.04);
    }
    setTimeout(animationLetters, 500);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    scene.background = new THREE.Color(0xffffff);
    document.body.appendChild(renderer.domElement);

    var geometry = new THREE.PlaneGeometry(6, 6 * .75);
    var material;
    var mesh;
    let frame;

    // instantiate a loader
    var loader = new THREE.TextureLoader();
    // load a resource
    loader.load(
    // resource URL
    'figure.png',

    // onLoad callback
    function (texture) {
        // in this example we create the material when the texture is loaded
        material = new THREE.MeshBasicMaterial({
            map: texture
        });
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        animate();
    },

    // onProgress callback currently not supported
    undefined,

    // onError callback
    function (err) {
        console.error('An error happened.');
    });
    camera.position.z = 5;

    var animate = function () {
        frame = requestAnimationFrame(animate);
        mesh.rotation.y -= 0.01;
        renderer.render(scene, camera);
    };

    if (document.querySelector('#circle')) {
        var canvas = document.querySelector("#circle");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        var ctx = canvas.getContext("2d");

        function getPosition(el) {
            var xPosition = 0;
            var yPosition = 0;

            while (el) {
                xPosition += el.offsetLeft - el.scrollLeft + el.clientLeft;
                yPosition += el.offsetTop - el.scrollTop + el.clientTop;
                el = el.offsetParent;
            }
            return {
                x: xPosition,
                y: yPosition
            };
        }
        var canvasPos = getPosition(canvas);
        let scale = 21;

        document.querySelector("body").addEventListener("mousemove", setMousePosition, false);

        function setMousePosition(e) {
            mouseX = e.clientX - canvasPos.x;
            mouseY = e.clientY - canvasPos.y;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            let el = document.querySelector('.s_test_title');
            if (mouseX < el.offsetLeft + el.offsetWidth && mouseX > el.offsetLeft && mouseY < el.offsetTop + el.offsetHeight && mouseY > el.offsetTop) {
                cancelAnimationFrame(frame);
                if (scale <= 80) {
                    ctx.beginPath();
                    ctx.arc(mouseX, mouseY, scale, 0, 2 * Math.PI, true);
                    ctx.fillStyle = "#FF6A6ACC";
                    ctx.fill();
                    scale++;
                } else {
                    ctx.beginPath();
                    ctx.arc(mouseX, mouseY, 80, 0, 2 * Math.PI, true);
                    ctx.fillStyle = "#FF6A6ACC";
                    ctx.fill();
                }
            } else {
                cancelAnimationFrame(frame);
                frame = requestAnimationFrame(animate);
                if (scale >= 21) {
                    ctx.beginPath();
                    ctx.arc(mouseX, mouseY, scale, 0, 2 * Math.PI, true);
                    ctx.fillStyle = "#FF6A6ACC";
                    ctx.fill();
                    scale--;
                } else {
                    ctx.beginPath();
                    ctx.arc(mouseX, mouseY, 21, 0, 2 * Math.PI, true);
                    ctx.fillStyle = "#FF6A6ACC";
                    ctx.fill();
                }
            }
        }
    }
});