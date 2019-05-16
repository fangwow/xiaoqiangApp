var mui = function(a, b) {
    var c = /complete|loaded|interactive/,
        d = /^#([\w-]*)$/,
        e = /^\.([\w-]+)$/,
        f = /^[\w-]+$/,
        g = /translate(?:3d)?\((.+?)\)/,
        h = /matrix(3d)?\((.+?)\)/,
        i = function(b, c) {
            if (c = c || a, !b) return j();
            if ("object" == typeof b) return j([b], null);
            if ("function" == typeof b) return i.ready(b);
            try {
                if (d.test(b)) {
                    var e = a.getElementById(RegExp.$1);
                    return j(e ? [e] : [])
                }
                return j(i.qsa(b, c), b)
            } catch (f) {}
            return j()
        },
        j = function(a, b) {
            return a = a || [], Object.setPrototypeOf(a, i.fn), a.selector = b || "", a
        };
    i.uuid = 0, i.data = {}, i.extend = function(a, c, d) {
        a || (a = {}), c || (c = {});
        for (var e in c) c[e] !== b && (d && "object" == typeof a[e] ? i.extend(a[e], c[e], d) : a[e] = c[e]);
        return a
    }, i.noop = function() {}, i.slice = [].slice, i.type = function(a) {
        return null === a ? String(a) : k[{}.toString.call(a)] || "object"
    }, i.isArray = Array.isArray ||
        function(a) {
            return a instanceof Array
        }, i.isWindow = function(a) {
        return null !== a && a === a.window
    }, i.isObject = function(a) {
        return "object" === i.type(a)
    }, i.isPlainObject = function(a) {
        return i.isObject(a) && !i.isWindow(a) && Object.getPrototypeOf(a) === Object.prototype
    }, i.isFunction = function(a) {
        return "function" === i.type(a)
    }, i.qsa = function(b, c) {
        return c = c || a, i.slice.call(e.test(b) ? c.getElementsByClassName(RegExp.$1) : f.test(b) ? c.getElementsByTagName(b) : c.querySelectorAll(b))
    }, i.ready = function(b) {
        return c.test(a.readyState) ? b(i) : a.addEventListener("DOMContentLoaded", function() {
            b(i)
        }, !1), this
    }, i.map = function(a, b) {
        var c, d, e, f = [];
        if ("number" == typeof a.length) for (d = 0, len = a.length; len > d; d++) c = b(a[d], d), null !== c && f.push(c);
        else for (e in a) c = b(a[e], e), null !== c && f.push(c);
        return f.length > 0 ? [].concat.apply([], f) : f
    }, i.each = function(a, b) {
        if ("number" == typeof a.length)[].every.call(a, function(a, c) {
            return b.call(a, c, a) !== !1
        });
        else for (var c in a) if (b.call(a[c], c, a[c]) === !1) return a;
        return this
    }, i.trigger = function(a, b, c) {
        return a.dispatchEvent(new CustomEvent(b, {
            detail: c,
            bubbles: !0,
            cancelable: !0
        })), this
    }, i.getStyles = function(a, b) {
        var c = a.ownerDocument.defaultView.getComputedStyle(a, null);
        return b ? c.getPropertyValue(b) || c[b] : c
    }, i.parseTranslate = function(a, b) {
        var c = a.match(g || "");
        return c && c[1] || (c = ["", "0,0,0"]), c = c[1].split(","), c = {
            x: parseFloat(c[0]),
            y: parseFloat(c[1]),
            z: parseFloat(c[2])
        }, b && c.hasOwnProperty(b) ? c[b] : c
    }, i.parseTranslateMatrix = function(a, b) {
        var c = a.match(h),
            d = c && c[1];
        c ? (c = c[2].split(","), "3d" === d ? c = c.slice(12, 15) : (c.push(0), c = c.slice(4, 7))) : c = [0, 0, 0];
        var e = {
            x: parseFloat(c[0]),
            y: parseFloat(c[1]),
            z: parseFloat(c[2])
        };
        return b && e.hasOwnProperty(b) ? e[b] : e
    }, i.regesterHandler = function(a, b) {
        var c = i[a];
        return c || (c = []), b.index = b.index || 1e3, c.push(b), c.sort(function(a, b) {
            return a.index - b.index
        }), i[a] = c, i[a]
    };
    var k = {};
    return i.each(["Boolean", "Number", "String", "Function", "Array", "Date", "RegExp", "Object", "Error"], function(a, b) {
        k["[object " + b + "]"] = b.toLowerCase()
    }), window.JSON && (i.parseJSON = JSON.parse), i.fn = {
        each: function(a) {
            return [].every.call(this, function(b, c) {
                return a.call(b, c, b) !== !1
            }), this
        }
    }, i
}(document);
!
    function(a, b, c) {
        a.targets = {}, a.targetHandles = [], a.registerTarget = function(b) {
            return b.index = b.index || 1e3, a.targetHandles.push(b), a.targetHandles.sort(function(a, b) {
                return a.index - b.index
            }), a.targetHandles
        }, b.addEventListener("touchstart", function(b) {
            for (var d = b.target, e = {}; d && d !== c; d = d.parentNode) {
                var f = !1;
                if (a.each(a.targetHandles, function(c, g) {
                        var h = g.name;
                        f || e[h] || !g.hasOwnProperty("handle") ? e[h] || g.isReset !== !1 && (a.targets[h] = !1) : (a.targets[h] = g.handle(b, d), a.targets[h] && (e[h] = !0, g.isContinue !== !0 && (f = !0)))
                    }), f) break
            }
        })
    }(mui, window, document), function(a) {
    String.prototype.trim === a && (String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, "")
    }), Object.setPrototypeOf = Object.setPrototypeOf ||
        function(a, b) {
            return a.__proto__ = b, a
        }
}(), function() {
    function a(a, b) {
        b = b || {
            bubbles: !1,
            cancelable: !1,
            detail: void 0
        };
        var c = document.createEvent("Events"),
            d = !0;
        if (b) for (var e in b)"bubbles" === e ? d = !! b[e] : c[e] = b[e];
        return c.initEvent(a, d, !0), c
    }
    "undefined" == typeof window.CustomEvent && (a.prototype = window.Event.prototype, window.CustomEvent = a)
}(), function(a) {
    "classList" in a.documentElement || !Object.defineProperty || "undefined" == typeof HTMLElement || Object.defineProperty(HTMLElement.prototype, "classList", {
        get: function() {
            function a(a) {
                return function(c) {
                    var d = b.className.split(/\s+/),
                        e = d.indexOf(c);
                    a(d, e, c), b.className = d.join(" ")
                }
            }
            var b = this,
                c = {
                    add: a(function(a, b, c) {~b || a.push(c)
                    }),
                    remove: a(function(a, b) {~b && a.splice(b, 1)
                    }),
                    toggle: a(function(a, b, c) {~b ? a.splice(b, 1) : a.push(c)
                    }),
                    contains: function(a) {
                        return !!~b.className.split(/\s+/).indexOf(a)
                    },
                    item: function(a) {
                        return b.className.split(/\s+/)[a] || null
                    }
                };
            return Object.defineProperty(c, "length", {
                get: function() {
                    return b.className.split(/\s+/).length
                }
            }), c
        }
    })
}(document), function(a) {
    var b = 0;
    a.requestAnimationFrame || (a.requestAnimationFrame = a.webkitRequestAnimationFrame, a.cancelAnimationFrame = a.webkitCancelAnimationFrame || a.webkitCancelRequestAnimationFrame), a.requestAnimationFrame || (a.requestAnimationFrame = function(c) {
        var d = (new Date).getTime(),
            e = Math.max(0, 16.7 - (d - b)),
            f = a.setTimeout(function() {
                c(d + e)
            }, e);
        return b = d + e, f
    }), a.cancelAnimationFrame || (a.cancelAnimationFrame = function(a) {
        clearTimeout(a)
    })
}(window), function(a, b, c) {
    if (!b.FastClick) {
        var d = function(a, b) {
            return !b.type || "radio" !== b.type && "checkbox" !== b.type ? !1 : b
        };
        a.registerTarget({
            name: c,
            index: 40,
            handle: d,
            target: !1
        });
        var e = function(c) {
            var d = a.targets.click;
            if (d) {
                var e, f;
                document.activeElement && document.activeElement !== d && document.activeElement.blur(), f = c.detail.gesture.changedTouches[0], e = document.createEvent("MouseEvents"), e.initMouseEvent("click", !0, !0, b, 1, f.screenX, f.screenY, f.clientX, f.clientY, !1, !1, !1, !1, 0, null), e.forwardedTouchEvent = !0, d.dispatchEvent(e)
            }
        };
        b.addEventListener("tap", e), b.addEventListener("doubletap", e), b.addEventListener("click", function(b) {
            return a.targets.click && !b.forwardedTouchEvent ? (b.stopImmediatePropagation ? b.stopImmediatePropagation() : b.propagationStopped = !0, b.stopPropagation(), b.preventDefault(), !1) : void 0
        }, !0)
    }
}(mui, window, "click"), function(a, b) {
    a(function() {
        if (a.os.ios) {
            var c = "mui-focusin",
                d = "mui-bar-tab",
                e = "mui-bar-footer",
                f = "mui-bar-footer-secondary",
                g = "mui-bar-footer-secondary-tab";
            b.addEventListener("focusin", function(a) {
                var h = a.target;
                if (!h.tagName || "INPUT" === h.tagName) {
                    b.body.classList.add(c);
                    for (var i = !1; h && h !== b; h = h.parentNode) {
                        var j = h.classList;
                        if (j && j.contains(d) || j.contains(e) || j.contains(f) || j.contains(g)) {
                            i = !0;
                            break
                        }
                    }
                    if (i) {
                        var k = b.body.scrollHeight,
                            l = b.body.scrollLeft;
                        setTimeout(function() {
                            window.scrollTo(l, k)
                        }, 20)
                    }
                }
            }), b.addEventListener("focusout", function() {
                var a = b.body.classList;
                a.contains(c) && (a.remove(c), setTimeout(function() {
                    window.scrollTo(b.body.scrollLeft, b.body.scrollTop)
                }, 20))
            })
        }
    })
}(mui, document), function(a) {
    a.namespace = "mui", a.classNamePrefix = a.namespace + "-", a.classSelectorPrefix = "." + a.classNamePrefix, a.className = function(b) {
        return a.classNamePrefix + b
    }, a.classSelector = function(b) {
        return b.replace(/\./g, a.classSelectorPrefix)
    }, a.eventName = function(b, c) {
        return b + (a.namespace ? "." + a.namespace : "") + (c ? "." + c : "")
    }
}(mui), function(a, b) {
    a.EVENT_START = "touchstart", a.EVENT_MOVE = "touchmove", a.EVENT_END = "touchend", a.EVENT_CANCEL = "touchcancel", a.EVENT_CLICK = "click", a.preventDefault = function(a) {
        a.preventDefault()
    }, a.stopPropagation = function(a) {
        a.stopPropagation()
    }, a.registerGesture = function(b) {
        return a.regesterHandler("gestures", b)
    };
    var c = function(a, b) {
            var c = b.x - a.x,
                d = b.y - a.y;
            return Math.sqrt(c * c + d * d)
        },
        d = function(a, b) {
            return 180 * Math.atan2(b.y - a.y, b.x - a.x) / Math.PI
        },
        e = function(a) {
            return -45 > a && a > -135 ? "up" : a >= 45 && 135 > a ? "down" : a >= 135 || -135 >= a ? "left" : a >= -45 && 45 >= a ? "right" : null
        },
        f = function(b, c) {
            a.gestures.stoped || a.each(a.gestures, function(d, e) {
                a.gestures.stoped || a.options.gestureConfig[e.name] !== !1 && e.handle(b, c)
            })
        },
        g = {},
        h = function(b) {
            a.gestures.stoped = !1;
            var c = Date.now(),
                d = b.touches ? b.touches[0] : b;
            g = {
                target: b.target,
                lastTarget: g.lastTarget ? g.lastTarget : null,
                startTime: c,
                touchTime: 0,
                flickStartTime: c,
                lastTapTime: g.lastTapTime ? g.lastTapTime : 0,
                start: {
                    x: d.pageX,
                    y: d.pageY
                },
                flickStart: {
                    x: d.pageX,
                    y: d.pageY
                },
                flickDistanceX: 0,
                flickDistanceY: 0,
                move: {
                    x: 0,
                    y: 0
                },
                deltaX: 0,
                deltaY: 0,
                lastDeltaX: 0,
                lastDeltaY: 0,
                angle: "",
                direction: "",
                distance: 0,
                drag: !1,
                swipe: !1,
                gesture: b
            }, f(b, g)
        },
        i = function(b) {
            if (!a.gestures.stoped && b.target == g.target) {
                var h = Date.now(),
                    i = b.touches ? b.touches[0] : b;
                g.touchTime = h - g.startTime, g.move = {
                    x: i.pageX,
                    y: i.pageY
                }, h - g.flickStartTime > 300 && (g.flickStartTime = h, g.flickStart = g.move), g.distance = c(g.start, g.move), g.angle = d(g.start, g.move), g.direction = e(g.angle), g.lastDeltaX = g.deltaX, g.lastDeltaY = g.deltaY, g.deltaX = g.move.x - g.start.x, g.deltaY = g.move.y - g.start.y, g.gesture = b, f(b, g)
            }
        },
        j = function(b) {
            if (!a.gestures.stoped && b.target == g.target) {
                var c = Date.now();
                g.touchTime = c - g.startTime, g.flickTime = c - g.flickStartTime, g.flickDistanceX = g.move.x - g.flickStart.x, g.flickDistanceY = g.move.y - g.flickStart.y, g.gesture = b, f(b, g)
            }
        };
    b.addEventListener(a.EVENT_START, h), b.addEventListener(a.EVENT_MOVE, i), b.addEventListener(a.EVENT_END, j), b.addEventListener(a.EVENT_CANCEL, j), b.addEventListener(a.EVENT_CLICK, function(b) {
        (a.targets.popover || a.targets.tab && a.targets.tab.hash || a.targets.offcanvas || a.targets.modal) && b.preventDefault()
    }), a.fn.on = function(b, c, d) {
        this.each(function() {
            var e = this;
            e.addEventListener(b, function(b) {
                var f = a.qsa(c, e),
                    g = b.target;
                if (f && f.length > 0) for (; g && g !== document && g !== e; g = g.parentNode) g && ~f.indexOf(g) && (b.detail ? b.detail.currentTarget = g : b.detail = {
                    currentTarget: g
                }, d.call(g, b))
            }), e.removeEventListener(a.EVENT_CLICK, k), e.addEventListener(a.EVENT_CLICK, k)
        })
    };
    var k = function(a) {
        a.target && "INPUT" !== a.target.tagName && a.preventDefault()
    }
}(mui, window), function(a, b) {
    var c = function(c, d) {
        if (c.type === a.EVENT_END || c.type === a.EVENT_CANCEL) {
            var e = this.options;
            d.direction && e.flickMaxTime > d.flickTime && d.distance > e.flickMinDistince && (d.flick = !0, a.trigger(c.target, b, d), a.trigger(c.target, b + d.direction, d))
        }
    };
    a.registerGesture({
        name: b,
        index: 5,
        handle: c,
        options: {
            flickMaxTime: 200,
            flickMinDistince: 10
        }
    })
}(mui, "flick"), function(a, b) {
    var c = function(c, d) {
        if (c.type === a.EVENT_END || c.type === a.EVENT_CANCEL) {
            var e = this.options;
            d.direction && e.swipeMaxTime > d.touchTime && d.distance > e.swipeMinDistince && (d.swipe = !0, a.trigger(c.target, b + d.direction, d))
        }
    };
    a.registerGesture({
        name: b,
        index: 10,
        handle: c,
        options: {
            swipeMaxTime: 300,
            swipeMinDistince: 18
        }
    })
}(mui, "swipe"), function(a, b) {
    var c = function(c, d) {
        switch (c.type) {
            case a.EVENT_MOVE:
                d.direction && (d.drag || (d.drag = !0, a.trigger(c.target, b + "start", d)), a.trigger(c.target, b, d), a.trigger(c.target, b + d.direction, d));
                break;
            case a.EVENT_END:
            case a.EVENT_CANCEL:
                d.drag && a.trigger(c.target, b + "end", d)
        }
    };
    a.registerGesture({
        name: b,
        index: 20,
        handle: c,
        options: {}
    })
}(mui, "drag"), function(a, b) {
    var c = function(c, d) {
        if (c.type === a.EVENT_END) {
            var e = this.options;
            if (d.distance < e.tapMaxDistance && d.touchTime < e.tapMaxTime) {
                if (a.options.gestureConfig.doubletap && d.lastTarget && d.lastTarget === c.target && d.lastTapTime && d.startTime - d.lastTapTime < e.tapMaxInterval) return a.trigger(c.target, "doubletap", d), d.lastTapTime = Date.now(), void(d.lastTarget = c.target);
                a.trigger(c.target, b, d), d.lastTapTime = Date.now(), d.lastTarget = c.target
            }
        }
    };
    a.registerGesture({
        name: b,
        index: 30,
        handle: c,
        options: {
            tapMaxInterval: 300,
            tapMaxDistance: 5,
            tapMaxTime: 250
        }
    })
}(mui, "tap"), function(a, b) {
    var c, d = function(d, e) {
        var f = this.options;
        switch (d.type) {
            case a.EVENT_START:
                clearTimeout(c), c = setTimeout(function() {
                    e.drag || a.trigger(d.target, b, e)
                }, f.holdTimeout);
                break;
            case a.EVENT_MOVE:
                e.distance > f.holdThreshold && clearTimeout(c);
                break;
            case a.EVENT_END:
            case a.EVENT_CANCEL:
                clearTimeout(c)
        }
    };
    a.registerGesture({
        name: b,
        index: 10,
        handle: d,
        options: {
            holdTimeout: 500,
            holdThreshold: 2
        }
    })
}(mui, "longtap"), function(a, b) {
    function c(c) {
        this.os = {};
        var d = [function() {
            var a = c.match(/(Android);?[\s\/]+([\d.]+)?/);
            return a && (this.os.android = !0, this.os.version = a[2], this.os.isBadAndroid = !/Chrome\/\d/.test(b.navigator.appVersion)), this.os.android === !0
        }, function() {
            var a = c.match(/(iPhone\sOS)\s([\d_]+)/);
            if (a) this.os.ios = this.os.iphone = !0, this.os.version = a[2].replace(/_/g, ".");
            else {
                var b = c.match(/(iPad).*OS\s([\d_]+)/);
                b && (this.os.ios = this.os.ipad = !0, this.os.version = b[2].replace(/_/g, "."))
            }
            return this.os.ios === !0
        }];
        [].every.call(d, function(b) {
            return !b.call(a)
        })
    }
    c.call(a, navigator.userAgent)
}(mui, window), function(a) {
    function b(a) {
        this.os = this.os || {};
        var b = a.match(/Html5Plus/i);
        b && (this.os.plus = !0)
    }
    b.call(a, navigator.userAgent)
}(mui), function(a) {
    a.global = a.options = {
        gestureConfig: {
            tap: !0,
            doubletap: !1,
            longtap: !1,
            flick: !0,
            swipe: !0,
            drag: !0
        }
    }, a.initGlobal = function(b) {
        return a.options = a.extend(a.global, b, !0), this
    };
    var b = {};
    a.init = function(c) {
        return a.options = a.extend(a.global, c || {}, !0), a.ready(function() {
            a.each(a.inits, function(c, d) {
                var e = !(b[d.name] && !d.repeat);
                e && (d.handle.call(a), b[d.name] = !0)
            })
        }), this
    }, a.registerInit = function(b) {
        return a.regesterHandler("inits", b)
    }, a(function() {
        a.os.ios ? document.body.classList.add("mui-ios") : a.os.android && document.body.classList.add("mui-android")
    })
}(mui), function(a) {
    var b = {
            swipeBack: !1,
            preloadPages: [],
            preloadLimit: 10,
            keyEventBind: {
                backbutton: !0,
                menubutton: !0
            }
        },
        c = {
            autoShow: !0,
            duration: a.os.ios ? 200 : 100,
            aniShow: "slide-in-right"
        };
    a.options.show && (c = a.extend(c, a.options.show, !0)), a.currentWebview = null, a.isHomePage = !1, a.extend(a.global, b, !0), a.extend(a.options, b, !0), a.waitingOptions = function(b) {
        return a.extend({
            autoShow: !0,
            title: ""
        }, b)
    }, a.showOptions = function(b) {
        return a.extend(c, b)
    }, a.windowOptions = function(b) {
        return a.extend({
            scalable: !1,
            bounce: ""
        }, b)
    }, a.plusReady = function(a) {
        return window.plus ? a() : document.addEventListener("plusready", function() {
            a()
        }, !1), this
    }, a.fire = function(a, b, c) {
        a && a.evalJS("mui&&mui.receive('" + b + "','" + JSON.stringify(c || {}) + "')")
    }, a.receive = function(b, c) {
        b && (c = JSON.parse(c), a.trigger(document, b, c))
    };
    var d = function(b) {
            if (!b.preloaded) {
                a.fire(b, "preload");
                for (var c = b.children(), d = 0; d < c.length; d++) a.fire(c[d], "preload");
                b.preloaded = !0
            }
        },
        e = function(b, c, d) {
            if (d) {
                if (!b[c + "ed"]) {
                    a.fire(b, c);
                    for (var e = b.children(), f = 0; f < e.length; f++) a.fire(e[f], c);
                    b[c + "ed"] = !0
                }
            } else {
                a.fire(b, c);
                for (var e = b.children(), f = 0; f < e.length; f++) a.fire(e[f], c)
            }
        };
    a.openWindow = function(b, c, f) {
        if (window.plus) {
            "object" == typeof b ? (f = b, b = f.url, c = f.id || b) : "object" == typeof c ? (f = c, c = b) : c = c || b, f = f || {};
            var g, h, i, j = f.params || {};
            if (a.webviews[c]) {
                var k = a.webviews[c];
                return g = k.webview, g && g.getURL() || (f = a.extend(f, {
                    id: c,
                    url: b,
                    preload: !0
                }, !0), g = a.createWindow(f)), h = k.show, h = f.show ? a.extend(h, f.show) : h, g.show(h.aniShow, h.duration, function() {
                    d(g), e(g, "pagebeforeshow", !1)
                }), k.afterShowMethodName && g.evalJS(k.afterShowMethodName + "('" + JSON.stringify(j) + "')"), g
            }
            var l = a.waitingOptions(f.waiting);
            return l.autoShow && (i = plus.nativeUI.showWaiting(l.title, l.options)), f = a.extend(f, {
                id: c,
                url: b
            }), g = a.createWindow(f), h = a.showOptions(f.show), h.autoShow && g.addEventListener("loaded", function() {
                i && i.close(), g.show(h.aniShow, h.duration, function() {
                    d(g), e(g, "pagebeforeshow", !1)
                }), g.showed = !0, f.afterShowMethodName && g.evalJS(f.afterShowMethodName + "('" + JSON.stringify(j) + "')")
            }, !1), g
        }
    }, a.createWindow = function(b, c) {
        if (window.plus) {
            var d, e = b.id || b.url;
            if (b.preload) {
                a.webviews[e] && a.webviews[e].webview.getURL() ? d = a.webviews[e].webview : (d = plus.webview.create(b.url, e, a.windowOptions(b.styles), a.extend({
                    preload: !0
                }, b.extras)), b.subpages && a.each(b.subpages, function(b, c) {
                    var e = plus.webview.create(c.url, c.id || c.url, a.windowOptions(c.styles), a.extend({
                        preload: !0
                    }, c.extras));
                    d.append(e)
                })), a.webviews[e] = {
                    webview: d,
                    preload: !0,
                    show: a.showOptions(b.show),
                    afterShowMethodName: b.afterShowMethodName
                };
                var f = a.data.preloads,
                    g = f.indexOf(e);
                if (~g && f.splice(g, 1), f.push(e), f.length > a.options.preloadLimit) {
                    var h = a.data.preloads.shift(),
                        i = a.webviews[h];
                    i && i.webview && a.closeAll(i.webview), delete a.webviews[h]
                }
            } else c !== !1 && (d = plus.webview.create(b.url, e, a.windowOptions(b.styles), b.extras), b.subpages && a.each(b.subpages, function(b, c) {
                var e = plus.webview.create(c.url, c.id || c.url, a.windowOptions(c.styles), c.extras);
                d.append(e)
            }));
            return d
        }
    }, a.preload = function(b) {
        return b.preload || (b.preload = !0), a.createWindow(b)
    }, a.closeOpened = function(b) {
        var c = b.opened();
        if (c) for (var d = 0, e = c.length; e > d; d++) {
            var f = c[d],
                g = f.opened();
            g && g.length > 0 ? a.closeOpened(f) : f.parent() !== b && f.close("none")
        }
    }, a.closeAll = function(b, c) {
        a.closeOpened(b), c ? b.close(c) : b.close()
    }, a.createWindows = function(b) {
        a.each(b, function(b, c) {
            a.createWindow(c, !1)
        })
    }, a.appendWebview = function(b) {
        if (window.plus) {
            var c, d = b.id || b.url;
            return a.webviews[d] || (c = plus.webview.create(b.url, d, b.styles, b.extras), c.addEventListener("loaded", function() {
                a.currentWebview.append(c)
            }), a.webviews[d] = b), c
        }
    }, a.webviews = {}, a.data.preloads = [], a.plusReady(function() {
        a.currentWebview = plus.webview.currentWebview()
    }), a.registerInit({
        name: "5+",
        index: 100,
        handle: function() {
            var b = a.options,
                c = b.subpages || [];
            if (a.os.plus) a.plusReady(function() {
                a.each(c, function(b, c) {
                    a.appendWebview(c)
                }), a.currentWebview === plus.webview.getWebviewById(plus.runtime.appid) && (a.isHomePage = !0, setTimeout(function() {
                    d(a.currentWebview)
                }, 300)), a.os.ios && a.options.statusBarBackground && plus.navigator.setStatusBarBackground(a.options.statusBarBackground)
            });
            else if (c.length > 0) {
                var e = document.createElement("div");
                e.className = "mui-error";
                var f = document.createElement("span");
                f.innerHTML = "在该浏览器下，不支持创建子页面，具体参考", e.appendChild(f);
                var g = document.createElement("a");
                g.innerHTML = '"mui框架适用场景"', g.href = "http://ask.dcloud.net.cn/article/113", e.appendChild(g), document.body.appendChild(e), console.log("在该浏览器下，不支持创建子页面")
            }
        }
    }), window.addEventListener("preload", function() {
        var b = a.options.preloadPages || [];
        a.plusReady(function() {
            a.each(b, function(b, c) {
                a.createWindow(a.extend(c, {
                    preload: !0
                }))
            })
        })
    })
}(mui), function(a, b) {
    a.registerBack = function(b) {
        return a.regesterHandler("backs", b)
    }, a.registerBack({
        name: "browser",
        index: 100,
        handle: function() {
            return b.history.length > 1 ? (b.history.back(), !0) : !1
        }
    }), a.back = function() {
        ("function" != typeof a.options.back || a.options.back() !== !1) && a.each(a.backs, function(a, b) {
            return !b.handle()
        })
    }, b.addEventListener("tap", function() {
        var b = a.targets.action;
        b && b.classList.contains("mui-action-back") && a.back()
    }), b.addEventListener("swiperight", function(b) {
        var c = b.detail;
        a.options.swipeBack === !0 && Math.abs(c.angle) < 3 && a.back()
    })
}(mui, window), function(a, b) {
    a.os.plus && a.os.android && a.registerBack({
        name: "popover",
        index: 5,
        handle: function() {
            return a.targets._popover ? (a(a.targets._popover).popover("hide"), !0) : void 0
        }
    }), a.registerBack({
        name: "5+",
        index: 10,
        handle: function() {
            if (!b.plus) return !1;
            var c = a.currentWebview,
                d = c.parent();
            return d && (c = d), c.canBack(function(d) {
                if (d.canBack) b.history.back();
                else {
                    var e = c.opener();
                    e && (c.preload ? c.hide("auto") : a.closeAll(c))
                }
            }), !0
        }
    }), a.menu = function() {
        var c = document.querySelector(".mui-action-menu");
        if (c) a.trigger(c, "tap");
        else if (b.plus) {
            var d = a.currentWebview,
                e = d.parent();
            e && e.evalJS("mui&&mui.menu();")
        }
    }, a.registerInit({
        name: "keyEventBind",
        index: 1e3,
        handle: function() {
            a.plusReady(function() {
                a.options.keyEventBind.backbutton && plus.key.addEventListener("backbutton", a.back, !1), a.options.keyEventBind.menubutton && plus.key.addEventListener("menubutton", a.menu, !1)
            })
        }
    })
}(mui, window), function(a) {
    a.registerInit({
        name: "pullrefresh",
        index: 1e3,
        handle: function() {
            var b = a.options,
                c = b.pullRefresh || {},
                d = c.down && c.down.hasOwnProperty("callback"),
                e = c.up && c.up.hasOwnProperty("callback");
            if (d || e) {
                var f = c.container;
                if (f) {
                    var g = a(f);
                    1 === g.length && (a.os.plus && a.os.android ? a.plusReady(function() {
                        if (e) {
                            var b = {};
                            b.up = c.up, g.pullRefresh(b)
                        }
                        if (d) {
                            var f = plus.webview.currentWebview(),
                                h = f.parent();
                            if (h) {
                                e || g.pullRefresh();
                                var i = {
                                    webviewId: f.id
                                };
                                i.down = a.extend({}, c.down), i.down.callback = "_CALLBACK", h.evalJS("mui(document.querySelector('.mui-content')).pullRefresh('" + JSON.stringify(i) + "')")
                            }
                        }
                    }) : g.pullRefresh(c))
                }
            }
        }
    })
}(mui), function(a, b, c) {
    var d = "application/json",
        e = "text/html",
        f = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        g = /^(?:text|application)\/javascript/i,
        h = /^(?:text|application)\/xml/i,
        i = /^\s*$/;
    a.ajaxSettings = {
        type: "GET",
        success: a.noop,
        error: a.noop,
        complete: a.noop,
        context: null,
        xhr: function() {
            return new b.XMLHttpRequest
        },
        accepts: {
            script: "text/javascript, application/javascript, application/x-javascript",
            json: d,
            xml: "application/xml, text/xml",
            html: e,
            text: "text/plain"
        },
        timeout: 0,
        processData: !0,
        cache: !0
    };
    var j = function(a, b, c) {
            c.success.call(c.context, a, "success", b), l("success", b, c)
        },
        k = function(a, b, c, d) {
            d.error.call(d.context, c, b, a), l(b, c, d)
        },
        l = function(a, b, c) {
            c.complete.call(c.context, b, a)
        },
        m = function(b, c, d, e) {
            var f, g = a.isArray(c),
                h = a.isPlainObject(c);
            a.each(c, function(c, i) {
                f = a.type(i), e && (c = d ? e : e + "[" + (h || "object" === f || "array" === f ? c : "") + "]"), !e && g ? b.add(i.name, i.value) : "array" === f || !d && "object" === f ? m(b, i, d, c) : b.add(c, i)
            })
        },
        n = function(b) {
            b.processData && b.data && "string" != typeof b.data && (b.data = a.param(b.data, b.traditional)), !b.data || b.type && "GET" !== b.type.toUpperCase() || (b.url = o(b.url, b.data), b.data = c)
        },
        o = function(a, b) {
            return "" === b ? a : (a + "&" + b).replace(/[&?]{1,2}/, "?")
        },
        p = function(a) {
            return a && (a = a.split(";", 2)[0]), a && (a === e ? "html" : a === d ? "json" : g.test(a) ? "script" : h.test(a) && "xml") || "text"
        },
        q = function(b, d, e, f) {
            return a.isFunction(d) && (f = e, e = d, d = c), a.isFunction(e) || (f = e, e = c), {
                url: b,
                data: d,
                success: e,
                dataType: f
            }
        };
    a.ajax = function(d, e) {
        "object" == typeof d && (e = d, d = c);
        var f = e || {};
        f.url = d || f.url;
        for (key in a.ajaxSettings) f[key] === c && (f[key] = a.ajaxSettings[key]);
        n(f);
        var g = f.dataType;
        f.cache !== !1 && (e && e.cache === !0 || "script" !== g) || (f.url = o(f.url, "_=" + Date.now()));
        var h, l = f.accepts[g],
            m = {},
            q = function(a, b) {
                m[a.toLowerCase()] = [a, b]
            },
            r = /^([\w-]+:)\/\//.test(f.url) ? RegExp.$1 : b.location.protocol,
            s = f.xhr(),
            t = s.setRequestHeader;
        if (q("X-Requested-With", "XMLHttpRequest"), q("Accept", l || "*/*"), (l = f.mimeType || l) && (l.indexOf(",") > -1 && (l = l.split(",", 2)[0]), s.overrideMimeType && s.overrideMimeType(l)), (f.contentType || f.contentType !== !1 && f.data && "GET" !== f.type.toUpperCase()) && q("Content-Type", f.contentType || "application/x-www-form-urlencoded"), f.headers) for (name in f.headers) q(name, f.headers[name]);
        if (s.setRequestHeader = q, s.onreadystatechange = function() {
                if (4 === s.readyState) {
                    s.onreadystatechange = a.noop, clearTimeout(h);
                    var b, c = !1;
                    if (s.status >= 200 && s.status < 300 || 304 === s.status || 0 === s.status && "file:" === r) {
                        g = g || p(f.mimeType || s.getResponseHeader("content-type")), b = s.responseText;
                        try {
                            "script" === g ? (1, eval)(b) : "xml" === g ? b = s.responseXML : "json" === g && (b = i.test(b) ? null : a.parseJSON(b))
                        } catch (d) {
                            c = d
                        }
                        c ? k(c, "parsererror", s, f) : j(b, s, f)
                    } else k(s.statusText || null, s.status ? "error" : "abort", s, f)
                }
            }, f.xhrFields) for (name in f.xhrFields) s[name] = f.xhrFields[name];
        var u = "async" in f ? f.async : !0;
        s.open(f.type, f.url, u, f.username, f.password);
        for (name in m) t.apply(s, m[name]);
        return f.timeout > 0 && (h = setTimeout(function() {
            s.onreadystatechange = a.noop, s.abort(), k(null, "timeout", s, f)
        }, f.timeout)), s.send(f.data ? f.data : null), s
    }, a.param = function(a, b) {
        var c = [];
        return c.add = function(a, b) {
            this.push(encodeURIComponent(a) + "=" + encodeURIComponent(b))
        }, m(c, a, b), c.join("&").replace(/%20/g, "+")
    }, a.get = function() {
        return a.ajax(q.apply(null, arguments))
    }, a.post = function() {
        var b = q.apply(null, arguments);
        return b.type = "POST", a.ajax(b)
    }, a.getJSON = function() {
        var b = q.apply(null, arguments);
        return b.dataType = "json", a.ajax(b)
    }, a.fn.load = function(b, c, d) {
        if (!this.length) return this;
        var e, g = this,
            h = b.split(/\s/),
            i = q(b, c, d),
            j = i.success;
        return h.length > 1 && (i.url = h[0], e = h[1]), i.success = function(a) {
            if (e) {
                var b = document.createElement("div");
                b.innerHTML = a.replace(f, "");
                var c = document.createElement("div"),
                    d = b.querySelectorAll(e);
                if (d && d.length > 0) for (var h = 0, i = d.length; i > h; h++) c.appendChild(d[h]);
                g[0].innerHTML = c.innerHTML
            } else g[0].innerHTML = a;
            j && j.apply(g, arguments)
        }, a.ajax(i), this
    }
}(mui, window), function(a) {
    a.plusReady(function() {
        a.ajaxSettings = a.extend(a.ajaxSettings, {
            xhr: function() {
                return new plus.net.XMLHttpRequest
            }
        })
    })
}(mui), function(a, b, c) {
    a.offset = function(a) {
        var d = {
            top: 0,
            left: 0
        };
        return typeof a.getBoundingClientRect !== c && (d = a.getBoundingClientRect()), {
            top: d.top + b.pageYOffset - a.clientTop,
            left: d.left + b.pageXOffset - a.clientLeft
        }
    }
}(mui, window), function(a, b) {
    a.scrollTo = function(a, c, d) {
        c = c || 1e3;
        var e = function(c) {
            if (0 >= c) return void(d && d());
            var f = a - b.scrollY;
            setTimeout(function() {
                b.scrollTo(0, b.scrollY + f / c * 10), e(c - 10)
            }, 16.7)
        };
        e(c)
    }
}(mui, window), function(a) {
    var b = !1,
        c = /xyz/.test(function() {}) ? /\b_super\b/ : /.*/,
        d = function() {};
    d.extend = function(a) {
        function d() {
            !b && this.init && this.init.apply(this, arguments)
        }
        var e = this.prototype;
        b = !0;
        var f = new this;
        b = !1;
        for (var g in a) f[g] = "function" == typeof a[g] && "function" == typeof e[g] && c.test(a[g]) ?
            function(a, b) {
                return function() {
                    var c = this._super;
                    this._super = e[a];
                    var d = b.apply(this, arguments);
                    return this._super = c, d
                }
            }(g, a[g]) : a[g];
        return d.prototype = f, d.prototype.constructor = d, d.extend = arguments.callee, d
    }, a.Class = d
}(mui), function(a, b) {
    var c = "mui-pull-top-pocket",
        d = "mui-pull-bottom-pocket",
        e = "mui-pull",
        f = "mui-pull-loading",
        g = "mui-pull-caption",
        h = "mui-icon",
        i = "mui-spinner",
        j = "mui-icon-pulldown",
        k = "mui-in",
        l = "mui-block",
        m = "mui-visibility",
        n = f + " " + h + " " + j,
        o = f + " " + h + " " + j,
        p = f + " " + h + " " + i,
        q = ['<div class="' + e + '">', '<div class="{icon}"></div>', '<div class="' + g + '">{contentrefresh}</div>', "</div>"].join(""),
        r = {
            init: function(b, c) {
                this._super(b, a.extend({
                    scrollY: !0,
                    scrollX: !1,
                    indicators: !0,
                    down: {
                        height: 50,
                        contentdown: "下拉可以刷新",
                        contentover: "释放立即刷新",
                        contentrefresh: "正在刷新..."
                    },
                    up: {
                        height: 50,
                        contentdown: "上拉显示更多",
                        contentrefresh: "正在加载...",
                        contentnomore: "没有更多数据了",
                        duration: 300
                    }
                }, c, !0))
            },
            _init: function() {
                this._super(), this._initPocket()
            },
            _initPulldownRefresh: function() {
                this.pulldown = !0, this.pullPocket = this.topPocket, this.pullPocket.classList.add(l), this.pullPocket.classList.add(m), this.pullCaption = this.topCaption, this.pullLoading = this.topLoading
            },
            _initPullupRefresh: function() {
                this.pulldown = !1, this.pullPocket = this.bottomPocket, this.pullPocket.classList.add(l), this.pullPocket.classList.add(m), this.pullCaption = this.bottomCaption, this.pullLoading = this.bottomLoading
            },
            _initPocket: function() {
                var a = this.options;
                a.down && a.down.hasOwnProperty("callback") && (this.topPocket = this.scroller.querySelector("." + c), this.topPocket || (this.topPocket = this._createPocket(c, a.down, o), this.wrapper.insertBefore(this.topPocket, this.wrapper.firstChild), this.topLoading = this.topPocket.querySelector("." + f), this.topCaption = this.topPocket.querySelector("." + g))), a.up && a.up.hasOwnProperty("callback") && (this.bottomPocket = this.scroller.querySelector("." + d), this.bottomPocket || (this.bottomPocket = this._createPocket(d, a.up, p), this.scroller.appendChild(this.bottomPocket), this.bottomLoading = this.bottomPocket.querySelector("." + f), this.bottomCaption = this.bottomPocket.querySelector("." + g)), this.wrapper.addEventListener("scrollbottom", this))
            },
            _createPocket: function(a, c, d) {
                var e = b.createElement("div");
                return e.className = a, e.innerHTML = q.replace("{contentrefresh}", c.contentrefresh).replace("{icon}", d), e
            },
            _resetPullDownLoading: function() {
                var a = this.pullLoading;
                a && (this.pullCaption.innerHTML = this.options.down.contentdown, a.style.webkitTransition = "", a.style.webkitTransform = "", a.style.webkitAnimation = "", a.className = o)
            },
            _setCaption: function(a, b) {
                if (!this.loading) {
                    var c = this.options,
                        d = this.pullPocket,
                        e = this.pullCaption,
                        f = this.pullLoading,
                        g = this.pulldown;
                    d && (b ? setTimeout(function() {
                        e.innerHTML = a, f.className = g ? o : p, f.style.webkitAnimation = "", f.style.webkitTransition = "", f.style.webkitTransform = ""
                    }, 100) : a !== this.lastTitle && (e.innerHTML = a, g ? a === c.down.contentrefresh ? (f.className = p, f.style.webkitAnimation = "spinner-spin 1s step-end infinite") : a === c.down.contentover ? (f.className = n, f.style.webkitTransition = "-webkit-transform 0.3s ease-in", f.style.webkitTransform = "rotate(180deg)") : a === c.down.contentdown && (f.className = o, f.style.webkitTransition = "-webkit-transform 0.3s ease-in", f.style.webkitTransform = "rotate(0deg)") : f.className = a === c.up.contentrefresh ? p + " " + k : p, this.lastTitle = a))
                }
            }
        };
    a.PullRefresh = r
}(mui, document), function(a, b, c, d) {
    var e = "mui-scrollbar",
        f = "mui-scrollbar-indicator",
        g = e + "-vertical",
        h = e + "-horizontal",
        i = {
            quadratic: {
                style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                fn: function(a) {
                    return a * (2 - a)
                }
            },
            circular: {
                style: "cubic-bezier(0.1, 0.57, 0.1, 1)",
                fn: function(a) {
                    return Math.sqrt(1 - --a * a)
                }
            }
        },
        j = a.Class.extend({
            init: function(b, c) {
                this.wrapper = this.element = b, this.scroller = this.wrapper.children[0], this.scrollerStyle = this.scroller.style, this.stopped = !1, this.options = a.extend({
                    scrollY: !0,
                    scrollX: !1,
                    startX: 0,
                    startY: 0,
                    indicators: !0,
                    stopPropagation: !1,
                    hardwareAccelerated: !0,
                    fixedBadAndorid: !1,
                    preventDefaultException: {
                        tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
                    },
                    momentum: !0,
                    bounce: !0,
                    bounceTime: 300,
                    bounceEasing: i.circular.style,
                    directionLockThreshold: 5
                }, c, !0), this.x = 0, this.y = 0, this.translateZ = this.options.hardwareAccelerated ? " translateZ(0)" : "", this._init(), this.scroller && (this.refresh(), this.scrollTo(this.options.startX, this.options.startY))
            },
            _init: function() {
                this._initIndicators(), this._initEvent()
            },
            _initIndicators: function() {
                var a = this;
                if (a.indicators = [], this.options.indicators) {
                    var b, c = [];
                    a.options.scrollY && (b = {
                        el: this._createScrollBar(g),
                        listenX: !1
                    }, this.wrapper.appendChild(b.el), c.push(b)), this.options.scrollX && (b = {
                        el: this._createScrollBar(h),
                        listenY: !1
                    }, this.wrapper.appendChild(b.el), c.push(b));
                    for (var d = c.length; d--;) this.indicators.push(new k(this, c[d]));
                    this.wrapper.addEventListener("scrollend", function() {
                        a.indicators.map(function(a) {
                            a.fade()
                        })
                    }), this.wrapper.addEventListener("scrollstart", function() {
                        a.indicators.map(function(a) {
                            a.fade(1)
                        })
                    }), this.wrapper.addEventListener("refresh", function() {
                        a.indicators.map(function(a) {
                            a.refresh()
                        })
                    })
                }
            },
            _initEvent: function() {
                b.addEventListener("orientationchange", this), b.addEventListener("resize", this), this.scroller.addEventListener("webkitTransitionEnd", this), this.wrapper.addEventListener("touchstart", this), this.wrapper.addEventListener("touchcancel", this), this.wrapper.addEventListener("touchend", this), this.wrapper.addEventListener("drag", this), this.wrapper.addEventListener("dragend", this), this.wrapper.addEventListener("flick", this), this.wrapper.addEventListener("scrollend", this), this.options.scrollX && this.wrapper.addEventListener("swiperight", this)
            },
            handleEvent: function(a) {
                if (this.stopped) return void this.resetPosition();
                switch (a.type) {
                    case "touchstart":
                        this._start(a);
                        break;
                    case "drag":
                        this.options.stopPropagation && a.stopPropagation(), this._drag(a);
                        break;
                    case "dragend":
                    case "flick":
                        this.options.stopPropagation && a.stopPropagation(), this._flick(a);
                        break;
                    case "touchcancel":
                    case "touchend":
                        this._end(a);
                        break;
                    case "webkitTransitionEnd":
                        this._transitionEnd(a);
                        break;
                    case "scrollend":
                        this._scrollend(a);
                        break;
                    case "orientationchange":
                    case "resize":
                        this._resize();
                        break;
                    case "swiperight":
                        a.stopPropagation()
                }
            },
            _start: function(b) {
                if (this.moved = this.needReset = !1, this._transitionTime(), this.isInTransition) {
                    this.needReset = !0, this.isInTransition = !1;
                    var c = a.parseTranslateMatrix(a.getStyles(this.scroller, "webkitTransform"));
                    this.setTranslate(Math.round(c.x), Math.round(c.y)), this.resetPosition(), a.trigger(this.wrapper, "scrollend", this), b.preventDefault()
                }
                this.reLayout(), a.trigger(this.wrapper, "beforescrollstart", this)
            },
            _drag: function(c) {
                var d = c.detail;
                if (a.os.ios && parseFloat(a.os.version) >= 8 && d.gesture.touches[0].clientY + 10 > b.innerHeight) return void this.resetPosition(this.options.bounceTime);
                var e = isReturn = !1;
                if ("left" === d.direction || "right" === d.direction ? this.options.scrollX ? e = !0 : this.options.scrollY && !this.moved && (isReturn = !0) : ("up" === d.direction || "down" === d.direction) && (this.options.scrollY ? e = !0 : this.options.scrollX && !this.moved && (isReturn = !0)), e && (c.stopPropagation(), d.gesture && d.gesture.preventDefault()), !isReturn) {
                    this.moved ? c.stopPropagation() : a.trigger(this.wrapper, "scrollstart", this);
                    var f = d.deltaX - d.lastDeltaX,
                        g = d.deltaY - d.lastDeltaY,
                        h = Math.abs(d.deltaX),
                        i = Math.abs(d.deltaY);
                    h > i + this.options.directionLockThreshold ? g = 0 : i >= h + this.options.directionLockThreshold && (f = 0), f = this.hasHorizontalScroll ? f : 0, g = this.hasVerticalScroll ? g : 0;
                    var j = this.x + f,
                        k = this.y + g;
                    (j > 0 || j < this.maxScrollX) && (j = this.options.bounce ? this.x + f / 3 : j > 0 ? 0 : this.maxScrollX), (k > 0 || k < this.maxScrollY) && (k = this.options.bounce ? this.y + g / 3 : k > 0 ? 0 : this.maxScrollY), this.requestAnimationFrame || this._updateTranslate(), this.moved = !0, this.x = j, this.y = k
                }
            },
            _flick: function(b) {
                if (this.moved) {
                    var c = b.detail;
                    if (this._clearRequestAnimationFrame(), "dragend" !== b.type || !c.flick) {
                        var d = Math.round(this.x),
                            e = Math.round(this.y);
                        if (this.isInTransition = !1, !this.resetPosition(this.options.bounceTime)) {
                            if (this.scrollTo(d, e), "dragend" === b.type) return void a.trigger(this.wrapper, "scrollend", this);
                            var f = 0,
                                g = "";
                            if (this.options.momentum && c.flickTime < 300 && (momentumX = this.hasHorizontalScroll ? this._momentum(this.x, c.flickDistanceX, c.flickTime, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {
                                    destination: d,
                                    duration: 0
                                }, momentumY = this.hasVerticalScroll ? this._momentum(this.y, c.flickDistanceY, c.flickTime, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {
                                    destination: e,
                                    duration: 0
                                }, d = momentumX.destination, e = momentumY.destination, f = Math.max(momentumX.duration, momentumY.duration), this.isInTransition = !0), d != this.x || e != this.y) return (d > 0 || d < this.maxScrollX || e > 0 || e < this.maxScrollY) && (g = i.quadratic), void this.scrollTo(d, e, f, g);
                            a.trigger(this.wrapper, "scrollend", this), b.stopPropagation()
                        }
                    }
                }
            },
            _end: function(a) {
                this.needReset = !1, (!this.moved && this.needReset || "touchcancel" === a.type) && this.resetPosition()
            },
            _transitionEnd: function(b) {
                b.target == this.scroller && this.isInTransition && (this._transitionTime(), this.resetPosition(this.options.bounceTime) || (this.isInTransition = !1, a.trigger(this.wrapper, "scrollend", this)))
            },
            _scrollend: function() {
                Math.abs(this.y) > 0 && this.y <= this.maxScrollY && a.trigger(this.wrapper, "scrollbottom", this)
            },
            _resize: function() {
                var a = this;
                clearTimeout(a.resizeTimeout), a.resizeTimeout = setTimeout(function() {
                    a.refresh()
                }, a.options.resizePolling)
            },
            _transitionTime: function(b) {
                if (b = b || 0, this.scrollerStyle.webkitTransitionDuration = b + "ms", this.options.fixedBadAndorid && !b && a.os.isBadAndroid && (this.scrollerStyle.webkitTransitionDuration = "0.001s"), this.indicators) for (var c = this.indicators.length; c--;) this.indicators[c].transitionTime(b)
            },
            _transitionTimingFunction: function(a) {
                if (this.scrollerStyle.webkitTransitionTimingFunction = a, this.indicators) for (var b = this.indicators.length; b--;) this.indicators[b].transitionTimingFunction(a)
            },
            _translate: function(a, b) {
                this.x = a, this.y = b
            },
            _clearRequestAnimationFrame: function() {
                this.requestAnimationFrame && (cancelAnimationFrame(this.requestAnimationFrame), this.requestAnimationFrame = null)
            },
            _updateTranslate: function() {
                var a = this;
                (a.x !== a.lastX || a.y !== a.lastY) && a.setTranslate(a.x, a.y), a.requestAnimationFrame = requestAnimationFrame(function() {
                    a._updateTranslate()
                })
            },
            _createScrollBar: function(a) {
                var b = c.createElement("div"),
                    d = c.createElement("div");
                return b.className = e + " " + a, d.className = f, b.appendChild(d), a === g ? (this.scrollbarY = b, this.scrollbarIndicatorY = d) : a === h && (this.scrollbarX = b, this.scrollbarIndicatorX = d), this.wrapper.appendChild(b), b
            },
            _preventDefaultException: function(a, b) {
                for (var c in b) if (b[c].test(a[c])) return !0;
                return !1
            },
            _reLayout: function() {
                this.hasHorizontalScroll || (this.maxScrollX = 0, this.scrollerWidth = this.wrapperWidth), this.hasVerticalScroll || (this.maxScrollY = 0, this.scrollerHeight = this.wrapperHeight), this.indicators.map(function(a) {
                    a.refresh()
                })
            },
            _momentum: function(a, b, c, e, f, g) {
                var h, i, j = parseFloat(Math.abs(b) / c);
                return g = g === d ? 6e-4 : g, h = a + j * j / (2 * g) * (0 > b ? -1 : 1), i = j / g, e > h ? (h = f ? e - f / 2.5 * (j / 8) : e, b = Math.abs(h - a), i = b / j) : h > 0 && (h = f ? f / 2.5 * (j / 8) : 0, b = Math.abs(a) + h, i = b / j), {
                    destination: Math.round(h),
                    duration: i
                }
            },
            setStopped: function(a) {
                this.stopped = !! a
            },
            setTranslate: function(a, b) {
                if (this.x = a, this.y = b, this.scrollerStyle.webkitTransform = "translate3d(" + a + "px," + b + "px,0px)" + this.translateZ, this.indicators) for (var c = this.indicators.length; c--;) this.indicators[c].updatePosition();
                this.lastX = this.x, this.lastY = this.y
            },
            reLayout: function() {
                this.wrapper.offsetHeight;
                var b = parseFloat(a.getStyles(this.wrapper, "padding-left")) || 0,
                    c = parseFloat(a.getStyles(this.wrapper, "padding-right")) || 0,
                    d = parseFloat(a.getStyles(this.wrapper, "padding-top")) || 0,
                    e = parseFloat(a.getStyles(this.wrapper, "padding-bottom")) || 0,
                    f = this.wrapper.clientWidth,
                    g = this.wrapper.clientHeight;
                this.scrollerWidth = this.scroller.offsetWidth, this.scrollerHeight = this.scroller.offsetHeight, this.wrapperWidth = f - b - c, this.wrapperHeight = g - d - e, this.maxScrollX = Math.min(this.wrapperWidth - this.scrollerWidth, 0), this.maxScrollY = Math.min(this.wrapperHeight - this.scrollerHeight, 0), this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0, this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0, this._reLayout()
            },
            resetPosition: function(a) {
                var b = this.x,
                    c = this.y;
                return a = a || 0, !this.hasHorizontalScroll || this.x > 0 ? b = 0 : this.x < this.maxScrollX && (b = this.maxScrollX), !this.hasVerticalScroll || this.y > 0 ? c = 0 : this.y < this.maxScrollY && (c = this.maxScrollY), b == this.x && c == this.y ? !1 : (this.scrollTo(b, c, a, this.options.bounceEasing), !0)
            },
            refresh: function() {
                this.reLayout(), a.trigger(this.wrapper, "refresh", this), this.resetPosition()
            },
            scrollTo: function(a, b, c, d) {
                var d = d || i.circular;
                this.isInTransition = c > 0, this.isInTransition ? (this._clearRequestAnimationFrame(), this._transitionTimingFunction(d.style), this._transitionTime(c), this.setTranslate(a, b)) : this.setTranslate(a, b)
            },
            scrollToBottom: function(a, b) {
                a = a || this.options.bounceTime, this.scrollTo(0, this.maxScrollY, a, b)
            }
        }),
        k = function(b, d) {
            this.wrapper = "string" == typeof d.el ? c.querySelector(d.el) : d.el, this.wrapperStyle = this.wrapper.style, this.indicator = this.wrapper.children[0], this.indicatorStyle = this.indicator.style, this.scroller = b, this.options = a.extend({
                listenX: !0,
                listenY: !0,
                fade: !1,
                speedRatioX: 0,
                speedRatioY: 0
            }, d), this.sizeRatioX = 1, this.sizeRatioY = 1, this.maxPosX = 0, this.maxPosY = 0, this.options.fade && (this.wrapperStyle.webkitTransform = this.scroller.translateZ, this.wrapperStyle.webkitTransitionDuration = this.options.fixedBadAndorid && a.os.isBadAndroid ? "0.001s" : "0ms", this.wrapperStyle.opacity = "0")
        };
    k.prototype = {
        handleEvent: function() {},
        transitionTime: function(b) {
            b = b || 0, this.indicatorStyle.webkitTransitionDuration = b + "ms", this.scroller.options.fixedBadAndorid && !b && a.os.isBadAndroid && (this.indicatorStyle.webkitTransitionDuration = "0.001s")
        },
        transitionTimingFunction: function(a) {
            this.indicatorStyle.webkitTransitionTimingFunction = a
        },
        refresh: function() {
            this.transitionTime(), this.indicatorStyle.display = this.options.listenX && !this.options.listenY ? this.scroller.hasHorizontalScroll ? "block" : "none" : this.options.listenY && !this.options.listenX ? this.scroller.hasVerticalScroll ? "block" : "none" : this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? "block" : "none", this.wrapper.offsetHeight, this.options.listenX && (this.wrapperWidth = this.wrapper.clientWidth, this.indicatorWidth = Math.max(Math.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8), this.indicatorStyle.width = this.indicatorWidth + "px", this.maxPosX = this.wrapperWidth - this.indicatorWidth, this.minBoundaryX = 0, this.maxBoundaryX = this.maxPosX, this.sizeRatioX = this.options.speedRatioX || this.scroller.maxScrollX && this.maxPosX / this.scroller.maxScrollX), this.options.listenY && (this.wrapperHeight = this.wrapper.clientHeight, this.indicatorHeight = Math.max(Math.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8), this.indicatorStyle.height = this.indicatorHeight + "px", this.maxPosY = this.wrapperHeight - this.indicatorHeight, this.minBoundaryY = 0, this.maxBoundaryY = this.maxPosY, this.sizeRatioY = this.options.speedRatioY || this.scroller.maxScrollY && this.maxPosY / this.scroller.maxScrollY), this.updatePosition()
        },
        updatePosition: function() {
            var a = this.options.listenX && Math.round(this.sizeRatioX * this.scroller.x) || 0,
                b = this.options.listenY && Math.round(this.sizeRatioY * this.scroller.y) || 0;
            a < this.minBoundaryX ? (this.width = Math.max(this.indicatorWidth + a, 8), this.indicatorStyle.width = this.width + "px", a = this.minBoundaryX) : a > this.maxBoundaryX ? (this.width = Math.max(this.indicatorWidth - (a - this.maxPosX), 8), this.indicatorStyle.width = this.width + "px", a = this.maxPosX + this.indicatorWidth - this.width) : this.width != this.indicatorWidth && (this.width = this.indicatorWidth, this.indicatorStyle.width = this.width + "px"), b < this.minBoundaryY ? (this.height = Math.max(this.indicatorHeight + 3 * b, 8), this.indicatorStyle.height = this.height + "px", b = this.minBoundaryY) : b > this.maxBoundaryY ? (this.height = Math.max(this.indicatorHeight - 3 * (b - this.maxPosY), 8), this.indicatorStyle.height = this.height + "px", b = this.maxPosY + this.indicatorHeight - this.height) : this.height != this.indicatorHeight && (this.height = this.indicatorHeight, this.indicatorStyle.height = this.height + "px"), this.x = a, this.y = b, this.indicatorStyle.webkitTransform = "translate3d(" + a + "px," + b + "px,0px)" + this.scroller.translateZ
        },
        fade: function(a, b) {
            if (!b || this.visible) {
                clearTimeout(this.fadeTimeout), this.fadeTimeout = null;
                var c = a ? 250 : 500,
                    d = a ? 0 : 300;
                a = a ? "1" : "0", this.wrapperStyle.webkitTransitionDuration = c + "ms", this.fadeTimeout = setTimeout(function(a) {
                    this.wrapperStyle.opacity = a, this.visible = +a
                }.bind(this, a), d)
            }
        }
    }, a.Scroll = j, a.fn.scroll = function(b) {
        var c = [];
        return this.each(function() {
            var d = null,
                e = this,
                f = e.getAttribute("data-scroll");
            f ? d = a.data[f] : (f = ++a.uuid, a.data[f] = d = new j(e, b), e.setAttribute("data-scroll", f)), c.push(d)
        }), 1 === c.length ? c[0] : c
    }
}(mui, window, document), function(a) {
    var b = "mui-visibility",
        c = a.Scroll.extend(a.extend({
            handleEvent: function(a) {
                this._super(a), "scrollbottom" === a.type && this._scrollbottom()
            },
            _scrollbottom: function() {
                this.pulldown || this.loading || (this.pulldown = !1, this._initPullupRefresh(), this.pullupLoading())
            },
            _start: function(a) {
                this.loading || (this.pulldown = this.pullPocket = this.pullCaption = this.pullLoading = !1), this._super(a)
            },
            _drag: function(a) {
                this._super(a), !this.pulldown && !this.loading && this.topPocket && "down" === a.detail.direction && this.y >= 0 && this._initPulldownRefresh(), this.pulldown && this._setCaption(this.y > this.options.down.height ? this.options.down.contentover : this.options.down.contentdown)
            },
            _reLayout: function() {
                this.hasVerticalScroll = !0, this._super()
            },
            resetPosition: function(a) {
                return this.pulldown && this.y >= this.options.down.height ? (this.pulldownLoading(0, a || 0), !0) : this._super(a)
            },
            pulldownLoading: function(a, b) {
                if (a = a || 0, this.scrollTo(a, this.options.down.height, b, this.options.bounceEasing), !this.loading) {
                    this.pulldown || this._initPulldownRefresh(), this._setCaption(this.options.down.contentrefresh), this.loading = !0, this.indicators.map(function(a) {
                        a.fade(0)
                    });
                    var c = this.options.down.callback;
                    c && c.call(this)
                }
            },
            endPulldownToRefresh: function() {
                var a = this;
                a.topPocket && (a.scrollTo(0, 0, a.options.bounceTime, a.options.bounceEasing), a.loading = !1, a._setCaption(a.options.down.contentdown, !0), setTimeout(function() {
                    a.loading || a.topPocket.classList.remove(b)
                }, 350))
            },
            pullupLoading: function(a, b) {
                if (a = a || 0, this.scrollTo(a, this.maxScrollY, b, this.options.bounceEasing), !this.loading) {
                    this.pulldown !== !1 && this._initPullupRefresh(), this._setCaption(this.options.up.contentrefresh), this.indicators.map(function(a) {
                        a.fade(0)
                    }), this.loading = !0;
                    var c = this.options.up.callback;
                    c && c.call(this)
                }
            },
            endPullupToRefresh: function(a) {
                var c = this;
                c.bottomPocket && (c.loading = !1, a ? (c._setCaption(c.options.up.contentnomore), c.wrapper.removeEventListener("scrollbottom", c)) : (c._setCaption(c.options.up.contentdown), setTimeout(function() {
                    c.loading || c.bottomPocket.classList.remove(b)
                }, 350)))
            },
            refresh: function(a) {
                a && this.wrapper.addEventListener("scrollbottom", this), this._super()
            }
        }, a.PullRefresh));
    a.fn.pullRefresh = function(b) {
        if (1 === this.length) {
            var d = this[0],
                e = null,
                f = d.getAttribute("data-pullrefresh");
            return f ? e = a.data[f] : (f = ++a.uuid, a.data[f] = e = new c(d, b), d.setAttribute("data-pullrefresh", f)), e
        }
    }
}(mui, window, document), function(a, b) {
    var c = "mui-slider",
        d = "mui-slider-group",
        e = "mui-slider-loop",
        f = "mui-slider-indicator",
        g = "mui-action-previous",
        h = "mui-action-next",
        i = "mui-slider-item",
        j = "." + i,
        k = "." + f,
        l = ".mui-slider-progress-bar",
        m = a.Scroll.extend({
            init: function(b, c) {
                this._super(b, a.extend({
                    interval: 0,
                    scrollY: !1,
                    scrollX: !0,
                    indicators: !1,
                    bounceTime: 200,
                    startX: !1
                }, c, !0))
            },
            _init: function() {
                this.scroller = this.wrapper.querySelector("." + d), this.scroller && (this.scrollerStyle = this.scroller.style, this.progressBar = this.wrapper.querySelector(l), this.progressBar && (this.progressBarWidth = this.progressBar.offsetWidth, this.progressBarStyle = this.progressBar.style), this.x = this._getScroll(), this.options.startX === !1 && (this.options.startX = this.x), this._super(), this._initTimer())
            },
            _initEvent: function() {
                var b = this;
                b._super(), b.wrapper.addEventListener("swiperight", a.stopPropagation), b.wrapper.addEventListener("scrollend", function() {
                    b.isInTransition = !1, b.slideNumber = b._getSlideNumber();
                    var c = b.slideNumber;
                    b.loop && (0 === b.slideNumber ? (b.slideNumber = b.itemLength - 2, b.setTranslate(-b.wrapperWidth * (b.itemLength - 2), 0)) : b.slideNumber === b.itemLength - 1 && (b.slideNumber = 1, b.setTranslate(-b.wrapperWidth, 0)), c = b.slideNumber - 1), a.trigger(b.wrapper, "slide", {
                        slideNumber: c
                    })
                }), b.wrapper.addEventListener("slide", function(a) {
                    if (a.target === b.wrapper) {
                        var c = a.detail;
                        c.slideNumber = c.slideNumber || 0;
                        var d = b.wrapper.querySelector(".mui-slider-indicator");
                        if (d) {
                            var e = d.querySelectorAll(".mui-indicator");
                            if (e.length > 0) for (var f = 0, g = e.length; g > f; f++) e[f].classList[f === c.slideNumber ? "add" : "remove"]("mui-active");
                            else {
                                var h = d.querySelector(".mui-number span");
                                if (h) h.innerText = c.slideNumber + 1;
                                else for (var i = b.wrapper.querySelectorAll(".mui-control-item"), f = 0, g = i.length; g > f; f++) i[f].classList[f === c.slideNumber ? "add" : "remove"]("mui-active")
                            }
                        }
                        a.stopPropagation()
                    }
                }), b.wrapper.addEventListener(a.eventName("shown", "tab"), function(a) {
                    b.gotoItem(a.detail.tabNumber || 0, b.options.bounceTime)
                });
                var c = b.wrapper.querySelector(k);
                c && c.addEventListener("tap", function(a) {
                    var c = a.target;
                    (c.classList.contains(g) || c.classList.contains(h)) && (b[c.classList.contains(g) ? "prevItem" : "nextItem"](), a.stopPropagation())
                })
            },
            _drag: function(a) {
                this._super(a);
                var b = a.detail.direction;
                ("left" === b || "right" === b) && a.stopPropagation()
            },
            _initTimer: function() {
                var a = this,
                    c = a.wrapper,
                    d = a.options.interval,
                    e = c.getAttribute("data-slidershowTimer");
                e && b.clearTimeout(e), d && (e = b.setTimeout(function() {
                    c && ((c.offsetWidth || c.offsetHeight) && a.nextItem(!0), a._initTimer())
                }, d), c.setAttribute("data-slidershowTimer", e))
            },
            _reLayout: function() {
                this.hasHorizontalScroll = !0, this.loop = this.scroller.classList.contains(e);
                var a = this.scroller.querySelectorAll(j);
                this.itemLength = 0;
                for (var b = 0, c = a.length; c > b; b++) a[b].parentNode === this.scroller && this.itemLength++;
                this.scrollerWidth = this.itemLength * this.scrollerWidth, this.maxScrollX = Math.min(this.wrapperWidth - this.scrollerWidth, 0), this.slideNumber = this._getSlideNumber(), this._super()
            },
            _getScroll: function() {
                var b = a.parseTranslateMatrix(a.getStyles(this.scroller, "webkitTransform"));
                return b ? b.x : 0
            },
            _getSlideNumber: function() {
                return Math.abs(Math.round(Math.abs(this.x) / this.wrapperWidth))
            },
            _transitionEnd: function(b) {
                b.target === this.scroller && this.isInTransition && (this._transitionTime(), this.isInTransition = !1, a.trigger(this.wrapper, "scrollend", this))
            },
            _flick: function(a) {
                var b = a.detail,
                    c = b.direction;
                return this._clearRequestAnimationFrame(), this.isInTransition = !0, "up" === c || "down" === c ? void this.resetPosition(this.options.bounceTime) : ("flick" === a.type ? (b.touchTime < 200 && (this.x = -(this.slideNumber + ("left" === c ? 1 : -1)) * this.wrapperWidth), this.resetPosition(this.options.bounceTime)) : "dragend" !== a.type || b.flick || this.resetPosition(this.options.bounceTime), void a.stopPropagation())
            },
            _gotoItem: function(b, c) {
                this.scrollTo(-b * this.wrapperWidth, 0, c, this.options.bounceEasing), 0 === c && a.trigger(this.wrapper, "scrollend", this), this._initTimer()
            },
            _fixedSlideNumber: function(a) {
                return this.loop || (0 > a ? a = 0 : a >= this.itemLength && (a = this.itemLength - 1)), a
            },
            setTranslate: function(a, b) {
                this._super(a, b);
                var c = this.progressBar;
                c && (this.progressBarStyle.webkitTransform = "translate3d(" + -a * (this.progressBarWidth / this.wrapperWidth) + "px,0,0)")
            },
            resetPosition: function(a) {
                return a = a || 0, this.x > 0 ? this.x = 0 : this.x < this.maxScrollX && (this.x = this.maxScrollX), this._gotoItem(this._getSlideNumber(), a), !0
            },
            gotoItem: function(a, b) {
                this._gotoItem(this._fixedSlideNumber(this.loop ? a + 1 : a), b || this.options.bounceEasing)
            },
            nextItem: function(a) {
                var b = this._fixedSlideNumber(this.slideNumber + 1),
                    c = this.options.bounceTime;
                a && !this.loop && this.slideNumber + 1 >= this.itemLength && (c = b = 0), this._gotoItem(b, c)
            },
            prevItem: function() {
                this._gotoItem(this._fixedSlideNumber(this.slideNumber - 1), this.options.bounceTime)
            },
            refresh: function(b) {
                b ? (a.extend(this.options, b), this._super(), this._gotoItem(this._getSlideNumber() + 1, this.options.bounceTime)) : this._super()
            }
        });
    a.fn.slider = function(b) {
        var d = null;
        return this.each(function() {
            var e = this;
            if (this.classList.contains(c) || (e = this.querySelector("." + c)), e) {
                var f = e.getAttribute("data-slider");
                f ? (d = a.data[f], d && b && d.refresh(b)) : (f = ++a.uuid, a.data[f] = d = new m(e, b), e.setAttribute("data-slider", f))
            }
        }), d
    }, a.ready(function() {
        setTimeout(function() {
            a(".mui-slider").slider()
        }, 500)
    })
}(mui, window), function(a, b) {
    if (a.os.plus && a.os.android) {
        var c = "mui-plus-pullrefresh",
            d = "mui-in",
            e = "mui-block",
            f = a.Class.extend({
                init: function(a, b) {
                    this.element = a, this.options = b, this.wrapper = this.scroller = a, this._init(), this._initPulldownRefreshEvent()
                },
                _init: function() {
                    b.addEventListener("plusscrollbottom", this)
                },
                _initPulldownRefreshEvent: function() {
                    var b = this;
                    b.topPocket && b.options.webviewId && a.plusReady(function() {
                        var a = plus.webview.getWebviewById(b.options.webviewId);
                        if (a) {
                            b.options.webview = a;
                            var c = b.options.down,
                                d = c.height;
                            a.addEventListener("dragBounce", function(d) {
                                switch (b.pulldown ? b.pullPocket.classList.add(e) : b._initPulldownRefresh(), d.status) {
                                    case "beforeChangeOffset":
                                        b._setCaption(c.contentdown);
                                        break;
                                    case "afterChangeOffset":
                                        b._setCaption(c.contentover);
                                        break;
                                    case "dragEndAfterChangeOffset":
                                        a.evalJS("mui.options.pullRefresh.down.callback()"), b._setCaption(c.contentrefresh)
                                }
                            }, !1), a.setBounce({
                                position: {
                                    top: 2 * d + "px"
                                },
                                changeoffset: {
                                    top: d + "px"
                                }
                            })
                        }
                    })
                },
                handleEvent: function(a) {
                    this.stopped || "plusscrollbottom" === a.type && this.bottomPocket && this.pullupLoading()
                }
            }).extend(a.extend({
                setStopped: function(a) {
                    this.stopped = !! a;
                    var b = plus.webview.currentWebview();
                    if (this.stopped) b.setStyle({
                        bounce: "none"
                    }), b.setBounce({
                        position: {
                            top: "none"
                        }
                    });
                    else {
                        var c = this.options.down.height;
                        b.setStyle({
                            bounce: "vertical"
                        }), b.setBounce({
                            position: {
                                top: 2 * c + "px"
                            },
                            changeoffset: {
                                top: c + "px"
                            }
                        })
                    }
                },
                pulldownLoading: function() {
                    throw new Error("暂不支持")
                },
                endPulldownToRefresh: function() {
                    plus.webview.currentWebview().parent().evalJS("mui(document.querySelector('.mui-content')).pullRefresh()._endPulldownToRefresh()")
                },
                _endPulldownToRefresh: function() {
                    var a = this;
                    a.topPocket && a.options.webview && (a.options.webview.endPullToRefresh(), a.loading = !1, a._setCaption(a.options.down.contentdown, !0), setTimeout(function() {
                        a.loading || a.topPocket.classList.remove(e)
                    }, 350))
                },
                pullupLoading: function() {
                    var a = this;
                    a.isLoading || (a.isLoading = !0, a.pulldown !== !1 ? a._initPullupRefresh() : this.pullPocket.classList.add(e), setTimeout(function() {
                        a.pullLoading.classList.add(d), a.pullCaption.innerHTML = "", a.pullCaption.innerHTML = a.options.up.contentrefresh;
                        var b = a.options.up.callback;
                        b && b.call(a)
                    }, 300))
                },
                endPullupToRefresh: function(a) {
                    var c = this;
                    c.pullLoading && (c.pullLoading.classList.remove(d), c.isLoading = !1, a ? (c.pullCaption.innerHTML = c.options.up.contentnomore, b.removeEventListener("plusscrollbottom", c)) : c.pullCaption.innerHTML = c.options.up.contentdown)
                },
                refresh: function(a) {
                    a && b.addEventListener("plusscrollbottom", this)
                }
            }, a.PullRefresh));
        a.fn.pullRefresh = function(d) {
            var e;
            0 === this.length ? (e = b.createElement("div"), e.className = "mui-content", b.body.appendChild(e)) : e = this[0], "string" == typeof d && (d = a.parseJSON(d));
            var g = null,
                h = e.getAttribute("data-pullrefresh-plus");
            return h ? g = a.data[h] : (b.body.classList.add(c), h = ++a.uuid, a.data[h] = g = new f(e, d), e.setAttribute("data-pullrefresh-plus", h)), g
        }
    }
}(mui, document), function(a, b, c, d) {
    var e = "mui-off-canvas-left",
        f = "mui-off-canvas-right",
        g = "mui-off-canvas-backdrop",
        h = "mui-off-canvas-wrap",
        i = "mui-off-canvas-height-fixed",
        j = "mui-left",
        k = "mui-right",
        l = "mui-sliding",
        m = ".mui-inner-wrap",
        n = function(a) {
            if (parentNode = a.parentNode) {
                if (parentNode.classList.contains(h)) return parentNode;
                if (parentNode = parentNode.parentNode, parentNode.classList.contains(h)) return parentNode
            }
        },
        o = function(b, d) {
            if (d.classList && d.classList.contains(g)) {
                var e = n(d);
                if (e) return a.targets._container = e, d
            } else if ("A" === d.tagName && d.hash) {
                var f = c.getElementById(d.hash.replace("#", ""));
                if (f) {
                    var e = n(f);
                    if (e) return a.targets._container = e, b.preventDefault(), f
                }
            }
            return !1
        };
    a.registerTarget({
        name: d,
        index: 60,
        handle: o,
        target: !1,
        isReset: !1,
        isContinue: !0
    });
    var p = function(a, b) {
            var d = a.querySelector(".mui-content"),
                e = c.getElementsByTagName("html")[0],
                f = c.body;
            b ? (e.classList.add(i), f.classList.add(i), d && d.classList.add(i)) : (e.classList.remove(i), f.classList.remove(i), d && d.classList.remove(i))
        },
        q = function() {
            var a = this.parentNode;
            a.classList.remove(l), this.removeEventListener("webkitTransitionEnd", q), a.classList.contains(k) || a.classList.contains(j) || p(a, !1)
        },
        r = function(a, b) {
            if (a && b) {
                var c = b.classList;
                a.querySelector(m).addEventListener("webkitTransitionEnd", q), a.classList.contains(k) || a.classList.contains(j) || p(a, !0), c.contains(e) ? a.classList.toggle(k) : c.contains(f) ? a.classList.toggle(j) : c.contains(g) && (a.classList.remove(k), a.classList.remove(j)), a.classList.add(l)
            }
        };
    b.addEventListener("tap", function() {
        a.targets.offcanvas && r(a.targets._container, a.targets.offcanvas)
    }), a.fn.offCanvas = function() {
        var a = arguments;
        this.each(function() {
            if ("show" === a[0] || "hide" === a[0] || "toggle" === a[0]) {
                var b = this.classList;
                if (b.contains(e) || b.contains(f)) {
                    var c = n(this);
                    c && r(c, this)
                }
            }
        })
    }
}(mui, window, document, "offcanvas"), function(a, b, c) {
    if (!a.os.android) {
        var d, e, f, g, h = "mui-off-canvas-left",
            i = "mui-off-canvas-right",
            j = "mui-off-canvas-wrap",
            k = "mui-off-canvas-height-fixed",
            l = "mui-left",
            m = "mui-right",
            n = "mui-sliding",
            o = "mui-draggable",
            p = ".mui-inner-wrap",
            q = "." + h,
            r = "." + i,
            s = !1,
            t = 1,
            u = 0,
            v = 0,
            w = 0,
            x = 0,
            y = function() {
                u !== v && (e.style["-webkit-transition-duration"] = "0s", "right" === g && u > 0 ? (u = Math.min(u, x), 0 > w ? z(e, w + u) : z(e, u)) : "left" === g && 0 > u && (u = Math.max(u, -x), w > 0 ? z(e, w + u) : z(e, u)), v = u), f = requestAnimationFrame(function() {
                    y()
                })
            },
            z = function(a, b) {
                a && (a.style.webkitTransform = "translate3d(" + b + "px,0,0)")
            },
            A = function(a, b) {
                var d = a.querySelector(".mui-content"),
                    e = c.getElementsByTagName("html")[0],
                    f = c.body;
                b ? (e.classList.add(k), f.classList.add(k), d && d.classList.add(k)) : (e.classList.remove(k), f.classList.remove(k), d && d.classList.remove(k))
            },
            B = function() {
                var a = this.parentNode,
                    b = a.classList;
                b.remove(n), this.removeEventListener("webkitTransitionEnd", B), b.contains(m) || b.contains(l) || A(a, !1)
            };
        b.addEventListener("touchstart", function(a) {
            var b = a.target;
            for (s = !1, d = e = null; b && b !== c; b = b.parentNode) {
                var f = b.classList;
                if (f && f.contains(j) && f.contains(o)) {
                    if (d = b, e = d.querySelector(p), !e) return;
                    break
                }
            }
        }), b.addEventListener("dragstart", function(b) {
            if (d) {
                var c = b.detail;
                if ("left" === c.direction ? d.classList.contains(m) ? s = !0 : d.querySelector(r) && !d.classList.contains(l) && (s = !0) : "right" === c.direction && (d.classList.contains(l) ? s = !0 : d.querySelector(q) && !d.classList.contains(m) && (s = !0)), s) {
                    g = c.direction, x = .8 * d.offsetWidth;
                    var f = a.getStyles(e, "webkitTransform"),
                        h = a.parseTranslateMatrix(f);
                    w = u = h ? h.x : 0;
                    var i = d.classList;
                    i.add(n), i.contains(m) || i.contains(l) || A(d, !0), c.gesture.preventDefault()
                }
            }
        }), b.addEventListener("drag", function(a) {
            if (s) {
                var b = a.detail;
                f || y(), u = b.deltaX * t
            }
        }), b.addEventListener("dragend", function() {
            if (s) {
                f && (cancelAnimationFrame(f), f = null), e.setAttribute("style", ""), e.addEventListener("webkitTransitionEnd", B);
                var a, b = d.classList,
                    c = ["add", "remove"];
                "right" === g && u > 0 ? (a = m, 0 > w && (c.reverse(), a = l), u > x / 2 ? b[c[0]](a) : b[c[1]](a)) : "left" === g && 0 > u && (a = l, w > 0 && (c.reverse(), a = m), -u > x / 2 ? b[c[0]](a) : b[c[1]](a))
            }
        })
    }
}(mui, window, document), function(a, b) {
    var c = "mui-action",
        d = function(a, b) {
            return b.className && ~b.className.indexOf(c) ? b : !1
        };
    a.registerTarget({
        name: b,
        index: 50,
        handle: d,
        target: !1,
        isContinue: !0
    })
}(mui, "action"), function(a, b, c, d) {
    var e = "mui-modal",
        f = function(a, b) {
            if ("A" === b.tagName && b.hash) {
                var d = c.getElementById(b.hash.replace("#", ""));
                if (d && d.classList.contains(e)) return a.preventDefault(), d
            }
            return !1
        };
    a.registerTarget({
        name: d,
        index: 50,
        handle: f,
        target: !1,
        isReset: !1,
        isContinue: !0
    }), b.addEventListener("tap", function() {
        a.targets.modal && a.targets.modal.classList.toggle("mui-active")
    })
}(mui, window, document, "modal"), function(a, b, c, d) {
    var e = "mui-popover",
        f = "mui-popover-arrow",
        g = "mui-popover-action",
        h = "mui-backdrop",
        i = "mui-bar-popover",
        j = "mui-bar-backdrop",
        k = "mui-backdrop-action",
        l = "mui-active",
        m = "mui-bottom",
        n = function(b, d) {
            if ("A" === d.tagName && d.hash) {
                if (a.targets._popover = c.getElementById(d.hash.replace("#", "")), a.targets._popover && a.targets._popover.classList.contains(e)) return b.preventDefault(), d;
                a.targets._popover = null
            }
            return !1
        };
    a.registerTarget({
        name: d,
        index: 60,
        handle: n,
        target: !1,
        isReset: !1,
        isContinue: !0
    });
    var o = function() {},
        p = function() {
            this.setAttribute("style", ""), this.removeEventListener("webkitTransitionEnd", p), o(!1)
        },
        q = function() {
            var b = c.createElement("div");
            return b.classList.add(h), b.addEventListener("touchmove", a.preventDefault), b.addEventListener("tap", function() {
                var b = a.targets._popover;
                b && (b.addEventListener("webkitTransitionEnd", p), b.classList.remove(l), r(b), c.body.setAttribute("style", ""))
            }), b
        }(),
        r = function(b) {
            q.setAttribute("style", "opacity:0"), a.targets.popover = a.targets._popover = null, setTimeout(function() {
                !b.classList.contains(l) && q.parentNode && q.parentNode === c.body && c.body.removeChild(q)
            }, 350)
        };
    b.addEventListener("tap", function() {
        a.targets.popover && s(a.targets._popover, a.targets.popover)
    });
    var s = function(a, b) {
            q.classList.remove(j), q.classList.remove(k);
            var d = c.querySelector(".mui-popover.mui-active");
            if (d && (d.addEventListener("webkitTransitionEnd", p), d.classList.remove(l), a === d)) return void r(d);
            var e = !1;
            (a.classList.contains(i) || a.classList.contains(g)) && (a.classList.contains(g) ? (e = !0, q.classList.add(k)) : q.classList.add(j)), a.setAttribute("style", "display:block"), a.offsetHeight, a.classList.add(l), q.setAttribute("style", ""), c.body.appendChild(q), o(!0), t(a, b, e), q.classList.add(l)
        },
        t = function(d, e, h) {
            if (d && e) {
                var i = b.innerWidth,
                    j = b.innerHeight,
                    k = d.offsetWidth,
                    l = d.offsetHeight;
                if (h) return void d.setAttribute("style", "display:block;top:" + (j - l + b.pageYOffset) + "px;left:" + (i - k) / 2 + "px;");
                var n = e.offsetWidth,
                    o = e.offsetHeight,
                    p = a.offset(e),
                    q = d.querySelector("." + f);
                q || (q = c.createElement("div"), q.className = f, d.appendChild(q));
                var r = q && q.offsetWidth / 2 || 0,
                    s = 0,
                    t = 0,
                    u = 0,
                    v = 0,
                    w = d.classList.contains(g) ? 0 : 5,
                    x = "top";
                l + r < p.top - b.pageYOffset ? s = p.top - l - r : l + r < j - (p.top - b.pageYOffset) - o ? (x = "bottom", s = p.top + o + r) : (x = "middle", s = Math.max((j - l) / 2 + b.pageYOffset, 0), t = Math.max((i - k) / 2 + b.pageXOffset, 0)), "top" === x || "bottom" === x ? (t = n / 2 + p.left - k / 2, u = t, w > t && (t = w), t + k > i && (t = i - k - w), q && ("top" === x ? q.classList.add(m) : q.classList.remove(m), u -= t, v = k / 2 - r / 2 + u, v = Math.max(Math.min(v, k - 2 * r - 6), 6), q.setAttribute("style", "left:" + v + "px"))) : "middle" === x && q.setAttribute("style", "display:none"), d.setAttribute("style", "display:block;top:" + s + "px;left:" + t + "px;")
            }
        };
    a.createMask = function(b) {
        var d = c.createElement("div");
        d.classList.add(h), d.addEventListener("touchmove", a.preventDefault), d.addEventListener("tap", function() {
            b && b(), e.close()
        });
        var e = [d];
        return e._show = !1, e.show = function() {
            return this._show = !0, d.setAttribute("style", "opacity:1"), c.body.appendChild(d), this
        }, e._remove = function() {
            return this._show && (this._show = !1, d.setAttribute("style", "opacity:0"), setTimeout(function() {
                c.body.removeChild(d)
            }, 350)), this
        }, e.close = function() {
            return this._remove()
        }, e
    }, a.fn.popover = function() {
        var b = arguments;
        this.each(function() {
            a.targets._popover = this, ("show" === b[0] || "hide" === b[0] || "toggle" === b[0]) && s(this, b[1])
        })
    }
}(mui, window, document, "popover"), function(a, b, c, d) {
    var e = "mui-control-item",
        f = "mui-control-content",
        g = "mui-tab-item",
        h = function(a, b) {
            return b.classList && (b.classList.contains(e) || b.classList.contains(g)) ? b : !1
        };
    a.registerTarget({
        name: d,
        index: 80,
        handle: h,
        target: !1
    }), b.addEventListener("tap", function(b) {
        var e = a.targets.tab;
        if (e) {
            var g, h, i, j = "mui-active",
                k = "." + j;
            g = e.parentNode.querySelector(k), g && g.classList.remove(j);
            var l = e === g;
            if (e && e.classList.add(j), e.hash && (i = c.getElementById(e.hash.replace("#", "")))) {
                if (!i.classList.contains(f)) return void e.classList[l ? "remove" : "add"](j);
                if (!l) {
                    var m = i.parentNode;
                    h = m.querySelectorAll("." + f + k);
                    for (var n = 0; n < h.length; n++) {
                        var o = h[n];
                        o.parentNode === m && o.classList.remove(j)
                    }
                    i.classList.add(j);
                    var p = i.parentNode.querySelectorAll("." + f);
                    a.trigger(i, a.eventName("shown", d), {
                        tabNumber: Array.prototype.indexOf.call(p, i)
                    }), b.detail.gesture.preventDefault()
                }
            }
        }
    })
}(mui, window, document, "tab"), function(a, b, c) {
    var d = "mui-switch",
        e = "mui-switch-handle",
        f = "mui-active",
        g = "." + e,
        h = function(a, b) {
            return b.classList && b.classList.contains(d) ? b : !1
        };
    a.registerTarget({
        name: c,
        index: 100,
        handle: h,
        target: !1
    });
    var i, h, j, k, l, m = function(b) {
            if (i) {
                var c = b.detail;
                a.gestures.stoped = !0;
                var d = !c.drag && !i.classList.contains(f) || c.drag && c.deltaX > j / 2 - k / 2;
                h.style["-webkit-transition-duration"] = ".2s", d ? (h.style.webkitTransform = "translate3d(" + l + "px,0,0)", i.classList.add(f)) : (h.style.webkitTransform = "translate3d(0,0,0)", i.classList.remove(f)), a.trigger(i, "toggle", {
                    isActive: d
                }), i.removeEventListener("dragstart", a.stopPropagation), i.removeEventListener("swiperight", a.stopPropagation), b.stopPropagation()
            }
        },
        n = function(a) {
            if (i) {
                var b = a.detail.deltaX;
                if (0 > b) return h.style.webkitTransform = "translate3d(0,0,0)";
                if (b > l) return h.style.webkitTransform = "translate3d(" + l + "px,0,0)";
                h.style["-webkit-transition-duration"] = "0s", h.style.webkitTransform = "translate3d(" + b + "px,0,0)", i.classList[b > j / 2 - k / 2 ? "add" : "remove"](f), a.stopPropagation()
            }
        };
    b.addEventListener(a.EVENT_START, function(b) {
        i = a.targets.toggle, i && (i.addEventListener("dragstart", a.stopPropagation), i.addEventListener("swiperight", a.stopPropagation), h = i.querySelector(g), j = i.clientWidth, k = h.clientWidth, l = j - k + 3, b.preventDefault())
    }), b.addEventListener("tap", m), b.addEventListener("drag", n), b.addEventListener("dragend", m)
}(mui, window, "toggle"), function(a, b, c) {
    function d(a, b) {
        var c = b ? "removeEventListener" : "addEventListener";
        a[c]("drag", E), a[c]("dragend", E), a[c]("swiperight", E), a[c]("swipeleft", E), a[c]("flick", E)
    }
    var e, f, g = "mui-active",
        h = "mui-selected",
        i = "mui-grid-view",
        j = "mui-table-view-cell",
        k = "mui-collapse-content",
        l = "mui-disabled",
        m = "mui-switch",
        n = "mui-btn",
        o = "mui-slider-handle",
        p = "mui-slider-left",
        q = "mui-slider-right",
        r = "mui-transitioning",
        s = "." + o,
        t = "." + p,
        u = "." + q,
        v = "." + h,
        w = "." + n,
        x = .8,
        y = isOpened = openedActions = progress = !1,
        z = sliderActionLeft = sliderActionRight = buttonsLeft = buttonsRight = sliderDirection = sliderRequestAnimationFrame = !1,
        A = lastTranslateX = sliderActionLeftWidth = sliderActionRightWidth = 0,
        B = function(a) {
            a ? f ? f.classList.add(g) : e && e.classList.add(g) : f ? f.classList.remove(g) : e && e.classList.remove(g)
        },
        C = function() {
            if (A !== lastTranslateX) {
                if (buttonsRight && buttonsRight.length > 0) {
                    progress = A / sliderActionRightWidth, -sliderActionRightWidth > A && (A = -sliderActionRightWidth - Math.pow(-A - sliderActionRightWidth, x));
                    for (var a = 0, b = buttonsRight.length; b > a; a++) {
                        var c = buttonsRight[a];
                        "undefined" == typeof c._buttonOffset && (c._buttonOffset = c.offsetLeft), buttonOffset = c._buttonOffset, D(c, A - buttonOffset * (1 + Math.max(progress, -1)))
                    }
                }
                if (buttonsLeft && buttonsLeft.length > 0) for (progress = A / sliderActionLeftWidth, A > sliderActionLeftWidth && (A = sliderActionLeftWidth + Math.pow(A - sliderActionLeftWidth, x)), a = 0, b = buttonsLeft.length; b > a; a++) {
                    var d = buttonsLeft[a];
                    "undefined" == typeof d._buttonOffset && (d._buttonOffset = sliderActionLeftWidth - d.offsetLeft - d.offsetWidth), buttonOffset = d._buttonOffset, buttonsLeft.length > 1 && (d.style.zIndex = buttonsLeft.length - a), D(d, A + buttonOffset * (1 - Math.min(progress, 1)))
                }
                D(z, A), lastTranslateX = A
            }
            sliderRequestAnimationFrame = requestAnimationFrame(function() {
                C()
            })
        },
        D = function(a, b) {
            a && (a.style.webkitTransform = "translate3d(" + b + "px,0,0)")
        };
    b.addEventListener("touchstart", function(b) {
        e && B(!1), e = f = !1, y = isOpened = openedActions = !1;
        for (var g = b.target, h = !1; g && g !== c; g = g.parentNode) if (g.classList) {
            var o = g.classList;
            if (("INPUT" === g.tagName && "radio" !== g.type && "checkbox" !== g.type || "BUTTON" === g.tagName || o.contains(m) || o.contains(n) || o.contains(l)) && (h = !0), o.contains(k)) break;
            if (o.contains(j)) {
                e = g;
                var p = e.parentNode.querySelector(v);
                if (p && p !== e) return a.swipeoutClose(p), void(e = h = !1);
                if (!e.parentNode.classList.contains(i)) {
                    var q = e.querySelector("a");
                    q && q.parentNode === e && (f = q)
                }
                e.querySelector(s) && (d(e), b.stopPropagation()), h || B(!0);
                break
            }
        }
    }), b.addEventListener("touchmove", function() {
        B(!1)
    });
    var E = {
        handleEvent: function(a) {
            switch (a.type) {
                case "drag":
                    this.drag(a);
                    break;
                case "dragend":
                    this.dragend(a);
                    break;
                case "flick":
                    this.flick(a);
                    break;
                case "swiperight":
                    this.swiperight(a);
                    break;
                case "swipeleft":
                    this.swipeleft(a)
            }
        },
        drag: function(a) {
            if (e) {
                y || (z = sliderActionLeft = sliderActionRight = buttonsLeft = buttonsRight = sliderDirection = sliderRequestAnimationFrame = !1, z = e.querySelector(s), z && (sliderActionLeft = e.querySelector(t), sliderActionRight = e.querySelector(u), sliderActionLeft && (sliderActionLeftWidth = sliderActionLeft.offsetWidth, buttonsLeft = sliderActionLeft.querySelectorAll(w)), sliderActionRight && (sliderActionRightWidth = sliderActionRight.offsetWidth, buttonsRight = sliderActionRight.querySelectorAll(w)), e.classList.remove(r), isOpened = e.classList.contains(h), isOpened && (openedActions = e.querySelector(t + v) ? "left" : "right")));
                var b = a.detail,
                    c = b.direction,
                    d = b.angle;
                if ("left" === c && (d > 150 || -150 > d) ? (buttonsRight || buttonsLeft && isOpened) && (y = !0) : "right" === c && d > -30 && 30 > d && (buttonsLeft || buttonsRight && isOpened) && (y = !0), y) {
                    a.stopPropagation(), a.detail.gesture.preventDefault();
                    var f = a.detail.deltaX;
                    if (isOpened && ("right" === openedActions ? f -= sliderActionRightWidth : f += sliderActionLeftWidth), f > 0 && !buttonsLeft || 0 > f && !buttonsRight) {
                        if (!isOpened) return;
                        f = 0
                    }
                    0 > f ? sliderDirection = "toLeft" : f > 0 ? sliderDirection = "toRight" : sliderDirection || (sliderDirection = "toLeft"), sliderRequestAnimationFrame || C(), A = f
                }
            }
        },
        flick: function(a) {
            y && a.stopPropagation()
        },
        swipeleft: function(a) {
            y && a.stopPropagation()
        },
        swiperight: function(a) {
            y && a.stopPropagation()
        },
        dragend: function(b) {
            if (y) {
                b.stopPropagation(), sliderRequestAnimationFrame && (cancelAnimationFrame(sliderRequestAnimationFrame), sliderRequestAnimationFrame = null);
                var c = b.detail;
                y = !1;
                var d = "close",
                    f = "toLeft" === sliderDirection ? sliderActionRightWidth : sliderActionLeftWidth,
                    g = c.swipe || Math.abs(A) > f / 2;
                g && (isOpened ? "left" === c.direction && "right" === openedActions ? d = "open" : "right" === c.direction && "left" === openedActions && (d = "open") : d = "open"), e.classList.add(r);
                var i;
                if ("open" === d) {
                    var j = "toLeft" === sliderDirection ? -f : f;
                    if (D(z, j), i = "toLeft" === sliderDirection ? buttonsRight : buttonsLeft, "undefined" != typeof i) {
                        var k = null;
                        for (m = 0; m < i.length; m++) k = i[m], D(k, j);
                        k.parentNode.classList.add(h), e.classList.add(h), isOpened || a.trigger(e, "toLeft" === sliderDirection ? "slideleft" : "slideright")
                    }
                } else D(z, 0), sliderActionLeft && sliderActionLeft.classList.remove(h), sliderActionRight && sliderActionRight.classList.remove(h), e.classList.remove(h);
                var l;
                if (buttonsLeft && buttonsLeft.length > 0 && buttonsLeft !== i) for (var m = 0, n = buttonsLeft.length; n > m; m++) {
                    var o = buttonsLeft[m];
                    l = o._buttonOffset, "undefined" == typeof l && (o._buttonOffset = sliderActionLeftWidth - o.offsetLeft - o.offsetWidth), D(o, l)
                }
                if (buttonsRight && buttonsRight.length > 0 && buttonsRight !== i) for (var m = 0, n = buttonsRight.length; n > m; m++) {
                    var p = buttonsRight[m];
                    l = p._buttonOffset, "undefined" == typeof l && (p._buttonOffset = p.offsetLeft), D(p, -l)
                }
            }
        }
    };
    a.swipeoutOpen = function(b, c) {
        if (b) {
            var d = b.classList;
            if (!d.contains(h)) {
                c || (c = b.querySelector(u) ? "right" : "left");
                var e = b.querySelector(a.classSelector(".slider-" + c));
                if (e) {
                    e.classList.add(h), d.add(h), d.remove(r);
                    for (var f, g = e.querySelectorAll(w), i = e.offsetWidth, j = "right" === c ? -i : i, k = g.length, l = 0; k > l; l++) f = g[l], "right" === c ? D(f, -f.offsetLeft) : D(f, i - f.offsetWidth - f.offsetLeft);
                    d.add(r);
                    for (var l = 0; k > l; l++) D(g[l], j);
                    D(b.querySelector(s), j)
                }
            }
        }
    }, a.swipeoutClose = function(b) {
        if (b) {
            var c = b.classList;
            if (c.contains(h)) {
                var d = b.querySelector(u + v) ? "right" : "left",
                    e = b.querySelector(a.classSelector(".slider-" + d));
                if (e) {
                    e.classList.remove(h), c.remove(h), c.add(r);
                    var f, g = e.querySelectorAll(w),
                        i = e.offsetWidth,
                        j = g.length;
                    D(b.querySelector(s), 0);
                    for (var k = 0; j > k; k++) f = g[k], "right" === d ? D(f, -f.offsetLeft) : D(f, i - f.offsetWidth - f.offsetLeft)
                }
            }
        }
    }, b.addEventListener("touchend", function() {
        e && (B(!1), z && d(e, !0))
    }), b.addEventListener("touchcancel", function() {
        e && (B(!1), z && d(e, !0))
    });
    var F = function() {
        var a = e.classList;
        if (a.contains("mui-radio")) {
            var b = e.querySelector("input[type=radio]");
            b && b.click()
        } else if (a.contains("mui-checkbox")) {
            var b = e.querySelector("input[type=checkbox]");
            b && b.click()
        }
    };
    b.addEventListener(a.EVENT_CLICK, function(a) {
        e && e.classList.contains("mui-collapse") && a.preventDefault()
    }), b.addEventListener("doubletap", function() {
        e && F()
    }), b.addEventListener("tap", function(b) {
        if (e) {
            var c = !1,
                d = e.classList;
            if (d.contains("mui-collapse") && !e.parentNode.classList.contains("mui-unfold")) {
                if (b.detail.gesture.preventDefault(), !d.contains(g)) {
                    var f = e.parentNode.querySelector(".mui-collapse.mui-active");
                    f && f.classList.remove(g), c = !0
                }
                d.toggle(g), c && a.trigger(e, "expand")
            }
            F()
        }
    })
}(mui, window, document), function(a, b) {
    a.alert = function(c, d, e, f) {
        if (a.os.plus) {
            if (void 0 === typeof c) return;
            "function" == typeof d ? (f = d, d = null, e = "确定") : "function" == typeof e && (f = e, e = null), plus.nativeUI.alert(c, f, d, e)
        } else b.alert(c)
    }
}(mui, window), function(a, b) {
    a.confirm = function(c, d, e, f) {
        if (a.os.plus) {
            if (void 0 === typeof c) return;
            "function" == typeof d ? (f = d, d = null, e = null) : "function" == typeof e && (f = e, e = null), plus.nativeUI.confirm(c, f, d, e)
        } else b.confirm(c)
    }
}(mui, window), function(a, b) {
    a.prompt = function(c, d, e, f, g) {
        if (a.os.plus) {
            if (void 0 === typeof message) return;
            "function" == typeof d ? (g = d, d = null, e = null, f = null) : "function" == typeof e ? (g = e, e = null, f = null) : "function" == typeof f && (g = f, f = null), plus.nativeUI.prompt(c, g, e, d, f)
        } else b.prompt(c)
    }
}(mui, window), function(a) {
    a.toast = function(b) {
        if (a.os.plus && a.os.android) plus.nativeUI.toast(b, {
            verticalAlign: "bottom"
        });
        else {
            var c = document.createElement("div");
            c.classList.add("mui-toast-container"), c.innerHTML = '<div class="mui-toast-message">' + b + "</div>", document.body.appendChild(c), setTimeout(function() {
                document.body.removeChild(c)
            }, 2e3)
        }
    }
}(mui, window), function(a, b, c) {
    var d = "mui-icon",
        e = "mui-icon-clear",
        f = "mui-icon-speech",
        g = "mui-icon-search",
        h = "mui-input-row",
        i = "mui-placeholder",
        j = "mui-tooltip",
        k = "mui-hidden",
        l = "mui-focusin",
        m = "." + e,
        n = "." + f,
        o = "." + i,
        p = "." + j,
        q = function(a) {
            for (; a && a !== c; a = a.parentNode) if (a.classList && a.classList.contains(h)) return a;
            return null
        },
        r = function(a, b) {
            this.element = a, this.options = b || {
                actions: "clear"
            }, ~this.options.actions.indexOf("slider") ? (this.sliderActionClass = j + " " + k, this.sliderActionSelector = p) : (~this.options.actions.indexOf("clear") && (this.clearActionClass = d + " " + e + (a.value ? "" : " " + k), this.clearActionSelector = m), ~this.options.actions.indexOf("speech") && (this.speechActionClass = d + " " + f, this.speechActionSelector = n), ~this.options.actions.indexOf("search") && (this.searchActionClass = i, this.searchActionSelector = o)), this.init()
        };
    r.prototype.init = function() {
        this.initAction(), this.initElementEvent()
    }, r.prototype.initAction = function() {
        var b = this,
            c = b.element.parentNode;
        c && (b.sliderActionClass ? b.sliderAction = b.createAction(c, b.sliderActionClass, b.sliderActionSelector) : (b.searchActionClass && (b.searchAction = b.createAction(c, b.searchActionClass, b.searchActionSelector), b.searchAction.addEventListener("tap", function(c) {
            a.os.ios ? setTimeout(function() {
                b.element.focus()
            }, 10) : b.element.focus(), c.stopPropagation()
        })), b.speechActionClass && (b.speechAction = b.createAction(c, b.speechActionClass, b.speechActionSelector), b.speechAction.addEventListener("click", a.stopPropagation), b.speechAction.addEventListener("tap", function(a) {
            b.speechActionClick(a)
        })), b.clearActionClass && (b.clearAction = b.createAction(c, b.clearActionClass, b.clearActionSelector), b.clearAction.addEventListener("tap", function(a) {
            b.clearActionClick(a)
        }))))
    }, r.prototype.createAction = function(a, b, e) {
        var f = a.querySelector(e);
        if (!f) {
            var f = c.createElement("span");
            f.className = b, b === this.searchActionClass && (f.innerHTML = '<span class="' + d + " " + g + '"></span>' + this.element.getAttribute("placeholder"), this.element.setAttribute("placeholder", "")), a.insertBefore(f, this.element.nextSibling)
        }
        return f
    }, r.prototype.initElementEvent = function() {
        var b = this.element;
        if (this.sliderActionClass) {
            var c = this.sliderAction,
                d = b.offsetLeft,
                e = b.offsetWidth - 28,
                f = c.offsetWidth,
                g = Math.abs(b.max - b.min),
                h = null,
                i = function() {
                    c.classList.remove(k), f = f || c.offsetWidth;
                    var a = Math.abs(b.value) / g * e;
                    c.style.left = 14 + d + a - f / 2 + "px", c.innerText = b.value, h && clearTimeout(h), h = setTimeout(function() {
                        c.classList.add(k)
                    }, 1e3)
                };
            b.addEventListener("input", i), b.addEventListener("tap", i), b.addEventListener("touchmove", function(a) {
                a.stopPropagation()
            })
        } else {
            if (this.clearActionClass) {
                var j = this.clearAction;
                if (!j) return;
                a.each(["keyup", "change", "input", "focus", "blur", "cut", "paste"], function(a, c) {
                    !
                        function(a) {
                            b.addEventListener(a, function() {
                                j.classList[b.value.trim() ? "remove" : "add"](k)
                            })
                        }(c)
                })
            }
            this.searchActionClass && (b.addEventListener("focus", function() {
                b.parentNode.classList.add("mui-active")
            }), b.addEventListener("blur", function() {
                b.value.trim() || b.parentNode.classList.remove("mui-active")
            }))
        }
    }, r.prototype.clearActionClick = function(a) {
        var b = this;
        b.element.value = "", setTimeout(function() {
            b.element.focus()
        }, 0), b.clearAction.classList.add(k), a.preventDefault()
    }, r.prototype.speechActionClick = function(d) {
        if (b.plus) {
            var e = this;
            e.element.value = "", c.body.classList.add(l), plus.speech.startRecognize({
                engine: "iFly"
            }, function(b) {
                e.element.value += b, setTimeout(function() {
                    e.element.focus()
                }, 0), plus.speech.stopRecognize(), a.trigger(e.element, "recognized", {
                    value: e.element.value
                })
            }, function() {
                c.body.classList.remove(l)
            })
        } else alert("only for 5+");
        d.preventDefault()
    }, a.fn.input = function() {
        this.each(function() {
            var b = [],
                c = q(this.parentNode);
            if ("range" === this.type && c.classList.contains("mui-input-range")) b.push("slider");
            else {
                var d = this.classList;
                d.contains("mui-input-clear") && b.push("clear"), d.contains("mui-input-speech") && b.push("speech"), "search" === this.type && c.classList.contains("mui-search") && b.push("search")
            }
            var e = this.getAttribute("data-input-" + b[0]);
            if (!e) {
                e = ++a.uuid, a.data[e] = new r(this, {
                    actions: b.join(",")
                });
                for (var f = 0, g = b.length; g > f; f++) this.setAttribute("data-input-" + b[f], e)
            }
        })
    }, a.ready(function() {
        a(".mui-input-row input").input()
    })
}(mui, window, document);