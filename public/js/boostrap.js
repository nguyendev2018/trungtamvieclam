!(function (t, e) {
    "object" == typeof exports && "undefined" != typeof module
      ? e(exports, require("jquery"), require("popper.js"))
      : "function" == typeof define && define.amd
      ? define(["exports", "jquery", "popper.js"], e)
      : e(
          ((t =
            "undefined" != typeof globalThis ? globalThis : t || self).bootstrap =
            {}),
          t.jQuery,
          t.Popper
        );
  })(this, function (t, e, n) {
    "use strict";
    function i(t, e) {
      for (var n = 0; n < e.length; n++) {
        var i = e[n];
        (i.enumerable = i.enumerable || !1),
          (i.configurable = !0),
          "value" in i && (i.writable = !0),
          Object.defineProperty(t, i.key, i);
      }
    }
    function o(t, e, n) {
      return e && i(t.prototype, e), n && i(t, n), t;
    }
    function s() {
      return (s =
        Object.assign ||
        function (t) {
          for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var i in n)
              Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
          }
          return t;
        }).apply(this, arguments);
    }
    (e = e && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e),
      (n =
        n && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n);
    function r(t) {
      var n = this,
        i = !1;
      return (
        e(this).one(a.TRANSITION_END, function () {
          i = !0;
        }),
        setTimeout(function () {
          i || a.triggerTransitionEnd(n);
        }, t),
        this
      );
    }
    var a = {
      TRANSITION_END: "bsTransitionEnd",
      getUID: function (t) {
        do {
          t += ~~(1e6 * Math.random());
        } while (document.getElementById(t));
        return t;
      },
      getSelectorFromElement: function (t) {
        var e = t.getAttribute("data-target");
        if (!e || "#" === e) {
          var n = t.getAttribute("href");
          e = n && "#" !== n ? n.trim() : "";
        }
        try {
          return document.querySelector(e) ? e : null;
        } catch (t) {
          return null;
        }
      },
      getTransitionDurationFromElement: function (t) {
        if (!t) return 0;
        var n = e(t).css("transition-duration"),
          i = e(t).css("transition-delay"),
          o = parseFloat(n),
          s = parseFloat(i);
        return o || s
          ? ((n = n.split(",")[0]),
            (i = i.split(",")[0]),
            1e3 * (parseFloat(n) + parseFloat(i)))
          : 0;
      },
      reflow: function (t) {
        return t.offsetHeight;
      },
      triggerTransitionEnd: function (t) {
        e(t).trigger("transitionend");
      },
      supportsTransitionEnd: function () {
        return Boolean("transitionend");
      },
      isElement: function (t) {
        return (t[0] || t).nodeType;
      },
      typeCheckConfig: function (t, e, n) {
        for (var i in n)
          if (Object.prototype.hasOwnProperty.call(n, i)) {
            var o = n[i],
              s = e[i],
              r =
                s && a.isElement(s)
                  ? "element"
                  : null === (l = s) || "undefined" == typeof l
                  ? "" + l
                  : {}.toString
                      .call(l)
                      .match(/\s([a-z]+)/i)[1]
                      .toLowerCase();
            if (!new RegExp(o).test(r))
              throw new Error(
                t.toUpperCase() +
                  ': Option "' +
                  i +
                  '" provided type "' +
                  r +
                  '" but expected type "' +
                  o +
                  '".'
              );
          }
        var l;
      },
      findShadowRoot: function (t) {
        if (!document.documentElement.attachShadow) return null;
        if ("function" == typeof t.getRootNode) {
          var e = t.getRootNode();
          return e instanceof ShadowRoot ? e : null;
        }
        return t instanceof ShadowRoot
          ? t
          : t.parentNode
          ? a.findShadowRoot(t.parentNode)
          : null;
      },
      jQueryDetection: function () {
        if ("undefined" == typeof e)
          throw new TypeError(
            "Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript."
          );
        var t = e.fn.jquery.split(" ")[0].split(".");
        if (
          (t[0] < 2 && t[1] < 9) ||
          (1 === t[0] && 9 === t[1] && t[2] < 1) ||
          t[0] >= 4
        )
          throw new Error(
            "Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0"
          );
      },
    };
    a.jQueryDetection(),
      (e.fn.emulateTransitionEnd = r),
      (e.event.special[a.TRANSITION_END] = {
        bindType: "transitionend",
        delegateType: "transitionend",
        handle: function (t) {
          if (e(t.target).is(this))
            return t.handleObj.handler.apply(this, arguments);
        },
      });
    var l = "alert",
      c = e.fn[l],
      h = (function () {
        function t(t) {
          this._element = t;
        }
        var n = t.prototype;
        return (
          (n.close = function (t) {
            var e = this._element;
            t && (e = this._getRootElement(t)),
              this._triggerCloseEvent(e).isDefaultPrevented() ||
                this._removeElement(e);
          }),
          (n.dispose = function () {
            e.removeData(this._element, "bs.alert"), (this._element = null);
          }),
          (n._getRootElement = function (t) {
            var n = a.getSelectorFromElement(t),
              i = !1;
            return (
              n && (i = document.querySelector(n)),
              i || (i = e(t).closest(".alert")[0]),
              i
            );
          }),
          (n._triggerCloseEvent = function (t) {
            var n = e.Event("close.bs.alert");
            return e(t).trigger(n), n;
          }),
          (n._removeElement = function (t) {
            var n = this;
            if ((e(t).removeClass("show"), e(t).hasClass("fade"))) {
              var i = a.getTransitionDurationFromElement(t);
              e(t)
                .one(a.TRANSITION_END, function (e) {
                  return n._destroyElement(t, e);
                })
                .emulateTransitionEnd(i);
            } else this._destroyElement(t);
          }),
          (n._destroyElement = function (t) {
            e(t).detach().trigger("closed.bs.alert").remove();
          }),
          (t._jQueryInterface = function (n) {
            return this.each(function () {
              var i = e(this),
                o = i.data("bs.alert");
              o || ((o = new t(this)), i.data("bs.alert", o)),
                "close" === n && o[n](this);
            });
          }),
          (t._handleDismiss = function (t) {
            return function (e) {
              e && e.preventDefault(), t.close(this);
            };
          }),
          o(t, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.5.2";
              },
            },
          ]),
          t
        );
      })();
    e(document).on(
      "click.bs.alert.data-api",
      '[data-dismiss="alert"]',
      h._handleDismiss(new h())
    ),
      (e.fn[l] = h._jQueryInterface),
      (e.fn[l].Constructor = h),
      (e.fn[l].noConflict = function () {
        return (e.fn[l] = c), h._jQueryInterface;
      });
    var u = e.fn.button,
      d = (function () {
        function t(t) {
          this._element = t;
        }
        var n = t.prototype;
        return (
          (n.toggle = function () {
            var t = !0,
              n = !0,
              i = e(this._element).closest('[data-toggle="buttons"]')[0];
            if (i) {
              var o = this._element.querySelector('input:not([type="hidden"])');
              if (o) {
                if ("radio" === o.type)
                  if (o.checked && this._element.classList.contains("active"))
                    t = !1;
                  else {
                    var s = i.querySelector(".active");
                    s && e(s).removeClass("active");
                  }
                t &&
                  (("checkbox" !== o.type && "radio" !== o.type) ||
                    (o.checked = !this._element.classList.contains("active")),
                  e(o).trigger("change")),
                  o.focus(),
                  (n = !1);
              }
            }
            this._element.hasAttribute("disabled") ||
              this._element.classList.contains("disabled") ||
              (n &&
                this._element.setAttribute(
                  "aria-pressed",
                  !this._element.classList.contains("active")
                ),
              t && e(this._element).toggleClass("active"));
          }),
          (n.dispose = function () {
            e.removeData(this._element, "bs.button"), (this._element = null);
          }),
          (t._jQueryInterface = function (n) {
            return this.each(function () {
              var i = e(this).data("bs.button");
              i || ((i = new t(this)), e(this).data("bs.button", i)),
                "toggle" === n && i[n]();
            });
          }),
          o(t, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.5.2";
              },
            },
          ]),
          t
        );
      })();
    e(document)
      .on("click.bs.button.data-api", '[data-toggle^="button"]', function (t) {
        var n = t.target,
          i = n;
        if (
          (e(n).hasClass("btn") || (n = e(n).closest(".btn")[0]),
          !n || n.hasAttribute("disabled") || n.classList.contains("disabled"))
        )
          t.preventDefault();
        else {
          var o = n.querySelector('input:not([type="hidden"])');
          if (
            o &&
            (o.hasAttribute("disabled") || o.classList.contains("disabled"))
          )
            return void t.preventDefault();
          ("LABEL" !== i.tagName || (o && "checkbox" !== o.type)) &&
            d._jQueryInterface.call(e(n), "toggle");
        }
      })
      .on(
        "focus.bs.button.data-api blur.bs.button.data-api",
        '[data-toggle^="button"]',
        function (t) {
          var n = e(t.target).closest(".btn")[0];
          e(n).toggleClass("focus", /^focus(in)?$/.test(t.type));
        }
      ),
      e(window).on("load.bs.button.data-api", function () {
        for (
          var t = [].slice.call(
              document.querySelectorAll('[data-toggle="buttons"] .btn')
            ),
            e = 0,
            n = t.length;
          e < n;
          e++
        ) {
          var i = t[e],
            o = i.querySelector('input:not([type="hidden"])');
          o.checked || o.hasAttribute("checked")
            ? i.classList.add("active")
            : i.classList.remove("active");
        }
        for (
          var s = 0,
            r = (t = [].slice.call(
              document.querySelectorAll('[data-toggle="button"]')
            )).length;
          s < r;
          s++
        ) {
          var a = t[s];
          "true" === a.getAttribute("aria-pressed")
            ? a.classList.add("active")
            : a.classList.remove("active");
        }
      }),
      (e.fn.button = d._jQueryInterface),
      (e.fn.button.Constructor = d),
      (e.fn.button.noConflict = function () {
        return (e.fn.button = u), d._jQueryInterface;
      });
    var f = "carousel",
      g = ".bs.carousel",
      m = e.fn[f],
      p = {
        interval: 5e3,
        keyboard: !0,
        slide: !1,
        pause: "hover",
        wrap: !0,
        touch: !0,
      },
      _ = {
        interval: "(number|boolean)",
        keyboard: "boolean",
        slide: "(boolean|string)",
        pause: "(string|boolean)",
        wrap: "boolean",
        touch: "boolean",
      },
      v = { TOUCH: "touch", PEN: "pen" },
      b = (function () {
        function t(t, e) {
          (this._items = null),
            (this._interval = null),
            (this._activeElement = null),
            (this._isPaused = !1),
            (this._isSliding = !1),
            (this.touchTimeout = null),
            (this.touchStartX = 0),
            (this.touchDeltaX = 0),
            (this._config = this._getConfig(e)),
            (this._element = t),
            (this._indicatorsElement = this._element.querySelector(
              ".carousel-indicators"
            )),
            (this._touchSupported =
              "ontouchstart" in document.documentElement ||
              navigator.maxTouchPoints > 0),
            (this._pointerEvent = Boolean(
              window.PointerEvent || window.MSPointerEvent
            )),
            this._addEventListeners();
        }
        var n = t.prototype;
        return (
          (n.next = function () {
            this._isSliding || this._slide("next");
          }),
          (n.nextWhenVisible = function () {
            !document.hidden &&
              e(this._element).is(":visible") &&
              "hidden" !== e(this._element).css("visibility") &&
              this.next();
          }),
          (n.prev = function () {
            this._isSliding || this._slide("prev");
          }),
          (n.pause = function (t) {
            t || (this._isPaused = !0),
              this._element.querySelector(
                ".carousel-item-next, .carousel-item-prev"
              ) && (a.triggerTransitionEnd(this._element), this.cycle(!0)),
              clearInterval(this._interval),
              (this._interval = null);
          }),
          (n.cycle = function (t) {
            t || (this._isPaused = !1),
              this._interval &&
                (clearInterval(this._interval), (this._interval = null)),
              this._config.interval &&
                !this._isPaused &&
                (this._interval = setInterval(
                  (document.visibilityState
                    ? this.nextWhenVisible
                    : this.next
                  ).bind(this),
                  this._config.interval
                ));
          }),
          (n.to = function (t) {
            var n = this;
            this._activeElement = this._element.querySelector(
              ".active.carousel-item"
            );
            var i = this._getItemIndex(this._activeElement);
            if (!(t > this._items.length - 1 || t < 0))
              if (this._isSliding)
                e(this._element).one("slid.bs.carousel", function () {
                  return n.to(t);
                });
              else {
                if (i === t) return this.pause(), void this.cycle();
                var o = t > i ? "next" : "prev";
                this._slide(o, this._items[t]);
              }
          }),
          (n.dispose = function () {
            e(this._element).off(g),
              e.removeData(this._element, "bs.carousel"),
              (this._items = null),
              (this._config = null),
              (this._element = null),
              (this._interval = null),
              (this._isPaused = null),
              (this._isSliding = null),
              (this._activeElement = null),
              (this._indicatorsElement = null);
          }),
          (n._getConfig = function (t) {
            return (t = s({}, p, t)), a.typeCheckConfig(f, t, _), t;
          }),
          (n._handleSwipe = function () {
            var t = Math.abs(this.touchDeltaX);
            if (!(t <= 40)) {
              var e = t / this.touchDeltaX;
              (this.touchDeltaX = 0), e > 0 && this.prev(), e < 0 && this.next();
            }
          }),
          (n._addEventListeners = function () {
            var t = this;
            this._config.keyboard &&
              e(this._element).on("keydown.bs.carousel", function (e) {
                return t._keydown(e);
              }),
              "hover" === this._config.pause &&
                e(this._element)
                  .on("mouseenter.bs.carousel", function (e) {
                    return t.pause(e);
                  })
                  .on("mouseleave.bs.carousel", function (e) {
                    return t.cycle(e);
                  }),
              this._config.touch && this._addTouchEventListeners();
          }),
          (n._addTouchEventListeners = function () {
            var t = this;
            if (this._touchSupported) {
              var n = function (e) {
                  t._pointerEvent && v[e.originalEvent.pointerType.toUpperCase()]
                    ? (t.touchStartX = e.originalEvent.clientX)
                    : t._pointerEvent ||
                      (t.touchStartX = e.originalEvent.touches[0].clientX);
                },
                i = function (e) {
                  t._pointerEvent &&
                    v[e.originalEvent.pointerType.toUpperCase()] &&
                    (t.touchDeltaX = e.originalEvent.clientX - t.touchStartX),
                    t._handleSwipe(),
                    "hover" === t._config.pause &&
                      (t.pause(),
                      t.touchTimeout && clearTimeout(t.touchTimeout),
                      (t.touchTimeout = setTimeout(function (e) {
                        return t.cycle(e);
                      }, 500 + t._config.interval)));
                };
              e(this._element.querySelectorAll(".carousel-item img")).on(
                "dragstart.bs.carousel",
                function (t) {
                  return t.preventDefault();
                }
              ),
                this._pointerEvent
                  ? (e(this._element).on("pointerdown.bs.carousel", function (t) {
                      return n(t);
                    }),
                    e(this._element).on("pointerup.bs.carousel", function (t) {
                      return i(t);
                    }),
                    this._element.classList.add("pointer-event"))
                  : (e(this._element).on("touchstart.bs.carousel", function (t) {
                      return n(t);
                    }),
                    e(this._element).on("touchmove.bs.carousel", function (e) {
                      return (function (e) {
                        e.originalEvent.touches &&
                        e.originalEvent.touches.length > 1
                          ? (t.touchDeltaX = 0)
                          : (t.touchDeltaX =
                              e.originalEvent.touches[0].clientX - t.touchStartX);
                      })(e);
                    }),
                    e(this._element).on("touchend.bs.carousel", function (t) {
                      return i(t);
                    }));
            }
          }),
          (n._keydown = function (t) {
            if (!/input|textarea/i.test(t.target.tagName))
              switch (t.which) {
                case 37:
                  t.preventDefault(), this.prev();
                  break;
                case 39:
                  t.preventDefault(), this.next();
              }
          }),
          (n._getItemIndex = function (t) {
            return (
              (this._items =
                t && t.parentNode
                  ? [].slice.call(t.parentNode.querySelectorAll(".carousel-item"))
                  : []),
              this._items.indexOf(t)
            );
          }),
          (n._getItemByDirection = function (t, e) {
            var n = "next" === t,
              i = "prev" === t,
              o = this._getItemIndex(e),
              s = this._items.length - 1;
            if (((i && 0 === o) || (n && o === s)) && !this._config.wrap)
              return e;
            var r = (o + ("prev" === t ? -1 : 1)) % this._items.length;
            return -1 === r
              ? this._items[this._items.length - 1]
              : this._items[r];
          }),
          (n._triggerSlideEvent = function (t, n) {
            var i = this._getItemIndex(t),
              o = this._getItemIndex(
                this._element.querySelector(".active.carousel-item")
              ),
              s = e.Event("slide.bs.carousel", {
                relatedTarget: t,
                direction: n,
                from: o,
                to: i,
              });
            return e(this._element).trigger(s), s;
          }),
          (n._setActiveIndicatorElement = function (t) {
            if (this._indicatorsElement) {
              var n = [].slice.call(
                this._indicatorsElement.querySelectorAll(".active")
              );
              e(n).removeClass("active");
              var i = this._indicatorsElement.children[this._getItemIndex(t)];
              i && e(i).addClass("active");
            }
          }),
          (n._slide = function (t, n) {
            var i,
              o,
              s,
              r = this,
              l = this._element.querySelector(".active.carousel-item"),
              c = this._getItemIndex(l),
              h = n || (l && this._getItemByDirection(t, l)),
              u = this._getItemIndex(h),
              d = Boolean(this._interval);
            if (
              ("next" === t
                ? ((i = "carousel-item-left"),
                  (o = "carousel-item-next"),
                  (s = "left"))
                : ((i = "carousel-item-right"),
                  (o = "carousel-item-prev"),
                  (s = "right")),
              h && e(h).hasClass("active"))
            )
              this._isSliding = !1;
            else if (
              !this._triggerSlideEvent(h, s).isDefaultPrevented() &&
              l &&
              h
            ) {
              (this._isSliding = !0),
                d && this.pause(),
                this._setActiveIndicatorElement(h);
              var f = e.Event("slid.bs.carousel", {
                relatedTarget: h,
                direction: s,
                from: c,
                to: u,
              });
              if (e(this._element).hasClass("slide")) {
                e(h).addClass(o), a.reflow(h), e(l).addClass(i), e(h).addClass(i);
                var g = parseInt(h.getAttribute("data-interval"), 10);
                g
                  ? ((this._config.defaultInterval =
                      this._config.defaultInterval || this._config.interval),
                    (this._config.interval = g))
                  : (this._config.interval =
                      this._config.defaultInterval || this._config.interval);
                var m = a.getTransitionDurationFromElement(l);
                e(l)
                  .one(a.TRANSITION_END, function () {
                    e(h)
                      .removeClass(i + " " + o)
                      .addClass("active"),
                      e(l).removeClass("active " + o + " " + i),
                      (r._isSliding = !1),
                      setTimeout(function () {
                        return e(r._element).trigger(f);
                      }, 0);
                  })
                  .emulateTransitionEnd(m);
              } else
                e(l).removeClass("active"),
                  e(h).addClass("active"),
                  (this._isSliding = !1),
                  e(this._element).trigger(f);
              d && this.cycle();
            }
          }),
          (t._jQueryInterface = function (n) {
            return this.each(function () {
              var i = e(this).data("bs.carousel"),
                o = s({}, p, e(this).data());
              "object" == typeof n && (o = s({}, o, n));
              var r = "string" == typeof n ? n : o.slide;
              if (
                (i || ((i = new t(this, o)), e(this).data("bs.carousel", i)),
                "number" == typeof n)
              )
                i.to(n);
              else if ("string" == typeof r) {
                if ("undefined" == typeof i[r])
                  throw new TypeError('No method named "' + r + '"');
                i[r]();
              } else o.interval && o.ride && (i.pause(), i.cycle());
            });
          }),
          (t._dataApiClickHandler = function (n) {
            var i = a.getSelectorFromElement(this);
            if (i) {
              var o = e(i)[0];
              if (o && e(o).hasClass("carousel")) {
                var r = s({}, e(o).data(), e(this).data()),
                  l = this.getAttribute("data-slide-to");
                l && (r.interval = !1),
                  t._jQueryInterface.call(e(o), r),
                  l && e(o).data("bs.carousel").to(l),
                  n.preventDefault();
              }
            }
          }),
          o(t, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.5.2";
              },
            },
            {
              key: "Default",
              get: function () {
                return p;
              },
            },
          ]),
          t
        );
      })();
    e(document).on(
      "click.bs.carousel.data-api",
      "[data-slide], [data-slide-to]",
      b._dataApiClickHandler
    ),
      e(window).on("load.bs.carousel.data-api", function () {
        for (
          var t = [].slice.call(
              document.querySelectorAll('[data-ride="carousel"]')
            ),
            n = 0,
            i = t.length;
          n < i;
          n++
        ) {
          var o = e(t[n]);
          b._jQueryInterface.call(o, o.data());
        }
      }),
      (e.fn[f] = b._jQueryInterface),
      (e.fn[f].Constructor = b),
      (e.fn[f].noConflict = function () {
        return (e.fn[f] = m), b._jQueryInterface;
      });
    var y = "collapse",
      E = e.fn[y],
      w = { toggle: !0, parent: "" },
      T = { toggle: "boolean", parent: "(string|element)" },
      C = (function () {
        function t(t, e) {
          (this._isTransitioning = !1),
            (this._element = t),
            (this._config = this._getConfig(e)),
            (this._triggerArray = [].slice.call(
              document.querySelectorAll(
                '[data-toggle="collapse"][href="#' +
                  t.id +
                  '"],[data-toggle="collapse"][data-target="#' +
                  t.id +
                  '"]'
              )
            ));
          for (
            var n = [].slice.call(
                document.querySelectorAll('[data-toggle="collapse"]')
              ),
              i = 0,
              o = n.length;
            i < o;
            i++
          ) {
            var s = n[i],
              r = a.getSelectorFromElement(s),
              l = [].slice
                .call(document.querySelectorAll(r))
                .filter(function (e) {
                  return e === t;
                });
            null !== r &&
              l.length > 0 &&
              ((this._selector = r), this._triggerArray.push(s));
          }
          (this._parent = this._config.parent ? this._getParent() : null),
            this._config.parent ||
              this._addAriaAndCollapsedClass(this._element, this._triggerArray),
            this._config.toggle && this.toggle();
        }
        var n = t.prototype;
        return (
          (n.toggle = function () {
            e(this._element).hasClass("show") ? this.hide() : this.show();
          }),
          (n.show = function () {
            var n,
              i,
              o = this;
            if (
              !this._isTransitioning &&
              !e(this._element).hasClass("show") &&
              (this._parent &&
                0 ===
                  (n = [].slice
                    .call(this._parent.querySelectorAll(".show, .collapsing"))
                    .filter(function (t) {
                      return "string" == typeof o._config.parent
                        ? t.getAttribute("data-parent") === o._config.parent
                        : t.classList.contains("collapse");
                    })).length &&
                (n = null),
              !(
                n &&
                (i = e(n).not(this._selector).data("bs.collapse")) &&
                i._isTransitioning
              ))
            ) {
              var s = e.Event("show.bs.collapse");
              if ((e(this._element).trigger(s), !s.isDefaultPrevented())) {
                n &&
                  (t._jQueryInterface.call(e(n).not(this._selector), "hide"),
                  i || e(n).data("bs.collapse", null));
                var r = this._getDimension();
                e(this._element).removeClass("collapse").addClass("collapsing"),
                  (this._element.style[r] = 0),
                  this._triggerArray.length &&
                    e(this._triggerArray)
                      .removeClass("collapsed")
                      .attr("aria-expanded", !0),
                  this.setTransitioning(!0);
                var l = "scroll" + (r[0].toUpperCase() + r.slice(1)),
                  c = a.getTransitionDurationFromElement(this._element);
                e(this._element)
                  .one(a.TRANSITION_END, function () {
                    e(o._element)
                      .removeClass("collapsing")
                      .addClass("collapse show"),
                      (o._element.style[r] = ""),
                      o.setTransitioning(!1),
                      e(o._element).trigger("shown.bs.collapse");
                  })
                  .emulateTransitionEnd(c),
                  (this._element.style[r] = this._element[l] + "px");
              }
            }
          }),
          (n.hide = function () {
            var t = this;
            if (!this._isTransitioning && e(this._element).hasClass("show")) {
              var n = e.Event("hide.bs.collapse");
              if ((e(this._element).trigger(n), !n.isDefaultPrevented())) {
                var i = this._getDimension();
                (this._element.style[i] =
                  this._element.getBoundingClientRect()[i] + "px"),
                  a.reflow(this._element),
                  e(this._element)
                    .addClass("collapsing")
                    .removeClass("collapse show");
                var o = this._triggerArray.length;
                if (o > 0)
                  for (var s = 0; s < o; s++) {
                    var r = this._triggerArray[s],
                      l = a.getSelectorFromElement(r);
                    if (null !== l)
                      e([].slice.call(document.querySelectorAll(l))).hasClass(
                        "show"
                      ) || e(r).addClass("collapsed").attr("aria-expanded", !1);
                  }
                this.setTransitioning(!0);
                this._element.style[i] = "";
                var c = a.getTransitionDurationFromElement(this._element);
                e(this._element)
                  .one(a.TRANSITION_END, function () {
                    t.setTransitioning(!1),
                      e(t._element)
                        .removeClass("collapsing")
                        .addClass("collapse")
                        .trigger("hidden.bs.collapse");
                  })
                  .emulateTransitionEnd(c);
              }
            }
          }),
          (n.setTransitioning = function (t) {
            this._isTransitioning = t;
          }),
          (n.dispose = function () {
            e.removeData(this._element, "bs.collapse"),
              (this._config = null),
              (this._parent = null),
              (this._element = null),
              (this._triggerArray = null),
              (this._isTransitioning = null);
          }),
          (n._getConfig = function (t) {
            return (
              ((t = s({}, w, t)).toggle = Boolean(t.toggle)),
              a.typeCheckConfig(y, t, T),
              t
            );
          }),
          (n._getDimension = function () {
            return e(this._element).hasClass("width") ? "width" : "height";
          }),
          (n._getParent = function () {
            var n,
              i = this;
            a.isElement(this._config.parent)
              ? ((n = this._config.parent),
                "undefined" != typeof this._config.parent.jquery &&
                  (n = this._config.parent[0]))
              : (n = document.querySelector(this._config.parent));
            var o =
                '[data-toggle="collapse"][data-parent="' +
                this._config.parent +
                '"]',
              s = [].slice.call(n.querySelectorAll(o));
            return (
              e(s).each(function (e, n) {
                i._addAriaAndCollapsedClass(t._getTargetFromElement(n), [n]);
              }),
              n
            );
          }),
          (n._addAriaAndCollapsedClass = function (t, n) {
            var i = e(t).hasClass("show");
            n.length &&
              e(n).toggleClass("collapsed", !i).attr("aria-expanded", i);
          }),
          (t._getTargetFromElement = function (t) {
            var e = a.getSelectorFromElement(t);
            return e ? document.querySelector(e) : null;
          }),
          (t._jQueryInterface = function (n) {
            return this.each(function () {
              var i = e(this),
                o = i.data("bs.collapse"),
                r = s({}, w, i.data(), "object" == typeof n && n ? n : {});
              if (
                (!o &&
                  r.toggle &&
                  "string" == typeof n &&
                  /show|hide/.test(n) &&
                  (r.toggle = !1),
                o || ((o = new t(this, r)), i.data("bs.collapse", o)),
                "string" == typeof n)
              ) {
                if ("undefined" == typeof o[n])
                  throw new TypeError('No method named "' + n + '"');
                o[n]();
              }
            });
          }),
          o(t, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.5.2";
              },
            },
            {
              key: "Default",
              get: function () {
                return w;
              },
            },
          ]),
          t
        );
      })();
    e(document).on(
      "click.bs.collapse.data-api",
      '[data-toggle="collapse"]',
      function (t) {
        "A" === t.currentTarget.tagName && t.preventDefault();
        var n = e(this),
          i = a.getSelectorFromElement(this),
          o = [].slice.call(document.querySelectorAll(i));
        e(o).each(function () {
          var t = e(this),
            i = t.data("bs.collapse") ? "toggle" : n.data();
          C._jQueryInterface.call(t, i);
        });
      }
    ),
      (e.fn[y] = C._jQueryInterface),
      (e.fn[y].Constructor = C),
      (e.fn[y].noConflict = function () {
        return (e.fn[y] = E), C._jQueryInterface;
      });
    var S = "dropdown",
      k = e.fn[S],
      D = new RegExp("38|40|27"),
      N = {
        offset: 0,
        flip: !0,
        boundary: "scrollParent",
        reference: "toggle",
        display: "dynamic",
        popperConfig: null,
      },
      A = {
        offset: "(number|string|function)",
        flip: "boolean",
        boundary: "(string|element)",
        reference: "(string|element)",
        display: "string",
        popperConfig: "(null|object)",
      },
      I = (function () {
        function t(t, e) {
          (this._element = t),
            (this._popper = null),
            (this._config = this._getConfig(e)),
            (this._menu = this._getMenuElement()),
            (this._inNavbar = this._detectNavbar()),
            this._addEventListeners();
        }
        var i = t.prototype;
        return (
          (i.toggle = function () {
            if (
              !this._element.disabled &&
              !e(this._element).hasClass("disabled")
            ) {
              var n = e(this._menu).hasClass("show");
              t._clearMenus(), n || this.show(!0);
            }
          }),
          (i.show = function (i) {
            if (
              (void 0 === i && (i = !1),
              !(
                this._element.disabled ||
                e(this._element).hasClass("disabled") ||
                e(this._menu).hasClass("show")
              ))
            ) {
              var o = { relatedTarget: this._element },
                s = e.Event("show.bs.dropdown", o),
                r = t._getParentFromElement(this._element);
              if ((e(r).trigger(s), !s.isDefaultPrevented())) {
                if (!this._inNavbar && i) {
                  if ("undefined" == typeof n)
                    throw new TypeError(
                      "Bootstrap's dropdowns require Popper.js (https://popper.js.org/)"
                    );
                  var l = this._element;
                  "parent" === this._config.reference
                    ? (l = r)
                    : a.isElement(this._config.reference) &&
                      ((l = this._config.reference),
                      "undefined" != typeof this._config.reference.jquery &&
                        (l = this._config.reference[0])),
                    "scrollParent" !== this._config.boundary &&
                      e(r).addClass("position-static"),
                    (this._popper = new n(
                      l,
                      this._menu,
                      this._getPopperConfig()
                    ));
                }
                "ontouchstart" in document.documentElement &&
                  0 === e(r).closest(".navbar-nav").length &&
                  e(document.body).children().on("mouseover", null, e.noop),
                  this._element.focus(),
                  this._element.setAttribute("aria-expanded", !0),
                  e(this._menu).toggleClass("show"),
                  e(r)
                    .toggleClass("show")
                    .trigger(e.Event("shown.bs.dropdown", o));
              }
            }
          }),
          (i.hide = function () {
            if (
              !this._element.disabled &&
              !e(this._element).hasClass("disabled") &&
              e(this._menu).hasClass("show")
            ) {
              var n = { relatedTarget: this._element },
                i = e.Event("hide.bs.dropdown", n),
                o = t._getParentFromElement(this._element);
              e(o).trigger(i),
                i.isDefaultPrevented() ||
                  (this._popper && this._popper.destroy(),
                  e(this._menu).toggleClass("show"),
                  e(o)
                    .toggleClass("show")
                    .trigger(e.Event("hidden.bs.dropdown", n)));
            }
          }),
          (i.dispose = function () {
            e.removeData(this._element, "bs.dropdown"),
              e(this._element).off(".bs.dropdown"),
              (this._element = null),
              (this._menu = null),
              null !== this._popper &&
                (this._popper.destroy(), (this._popper = null));
          }),
          (i.update = function () {
            (this._inNavbar = this._detectNavbar()),
              null !== this._popper && this._popper.scheduleUpdate();
          }),
          (i._addEventListeners = function () {
            var t = this;
            e(this._element).on("click.bs.dropdown", function (e) {
              e.preventDefault(), e.stopPropagation(), t.toggle();
            });
          }),
          (i._getConfig = function (t) {
            return (
              (t = s({}, this.constructor.Default, e(this._element).data(), t)),
              a.typeCheckConfig(S, t, this.constructor.DefaultType),
              t
            );
          }),
          (i._getMenuElement = function () {
            if (!this._menu) {
              var e = t._getParentFromElement(this._element);
              e && (this._menu = e.querySelector(".dropdown-menu"));
            }
            return this._menu;
          }),
          (i._getPlacement = function () {
            var t = e(this._element.parentNode),
              n = "bottom-start";
            return (
              t.hasClass("dropup")
                ? (n = e(this._menu).hasClass("dropdown-menu-right")
                    ? "top-end"
                    : "top-start")
                : t.hasClass("dropright")
                ? (n = "right-start")
                : t.hasClass("dropleft")
                ? (n = "left-start")
                : e(this._menu).hasClass("dropdown-menu-right") &&
                  (n = "bottom-end"),
              n
            );
          }),
          (i._detectNavbar = function () {
            return e(this._element).closest(".navbar").length > 0;
          }),
          (i._getOffset = function () {
            var t = this,
              e = {};
            return (
              "function" == typeof this._config.offset
                ? (e.fn = function (e) {
                    return (
                      (e.offsets = s(
                        {},
                        e.offsets,
                        t._config.offset(e.offsets, t._element) || {}
                      )),
                      e
                    );
                  })
                : (e.offset = this._config.offset),
              e
            );
          }),
          (i._getPopperConfig = function () {
            var t = {
              placement: this._getPlacement(),
              modifiers: {
                offset: this._getOffset(),
                flip: { enabled: this._config.flip },
                preventOverflow: { boundariesElement: this._config.boundary },
              },
            };
            return (
              "static" === this._config.display &&
                (t.modifiers.applyStyle = { enabled: !1 }),
              s({}, t, this._config.popperConfig)
            );
          }),
          (t._jQueryInterface = function (n) {
            return this.each(function () {
              var i = e(this).data("bs.dropdown");
              if (
                (i ||
                  ((i = new t(this, "object" == typeof n ? n : null)),
                  e(this).data("bs.dropdown", i)),
                "string" == typeof n)
              ) {
                if ("undefined" == typeof i[n])
                  throw new TypeError('No method named "' + n + '"');
                i[n]();
              }
            });
          }),
          (t._clearMenus = function (n) {
            if (!n || (3 !== n.which && ("keyup" !== n.type || 9 === n.which)))
              for (
                var i = [].slice.call(
                    document.querySelectorAll('[data-toggle="dropdown"]')
                  ),
                  o = 0,
                  s = i.length;
                o < s;
                o++
              ) {
                var r = t._getParentFromElement(i[o]),
                  a = e(i[o]).data("bs.dropdown"),
                  l = { relatedTarget: i[o] };
                if ((n && "click" === n.type && (l.clickEvent = n), a)) {
                  var c = a._menu;
                  if (
                    e(r).hasClass("show") &&
                    !(
                      n &&
                      (("click" === n.type &&
                        /input|textarea/i.test(n.target.tagName)) ||
                        ("keyup" === n.type && 9 === n.which)) &&
                      e.contains(r, n.target)
                    )
                  ) {
                    var h = e.Event("hide.bs.dropdown", l);
                    e(r).trigger(h),
                      h.isDefaultPrevented() ||
                        ("ontouchstart" in document.documentElement &&
                          e(document.body)
                            .children()
                            .off("mouseover", null, e.noop),
                        i[o].setAttribute("aria-expanded", "false"),
                        a._popper && a._popper.destroy(),
                        e(c).removeClass("show"),
                        e(r)
                          .removeClass("show")
                          .trigger(e.Event("hidden.bs.dropdown", l)));
                  }
                }
              }
          }),
          (t._getParentFromElement = function (t) {
            var e,
              n = a.getSelectorFromElement(t);
            return n && (e = document.querySelector(n)), e || t.parentNode;
          }),
          (t._dataApiKeydownHandler = function (n) {
            if (
              !(/input|textarea/i.test(n.target.tagName)
                ? 32 === n.which ||
                  (27 !== n.which &&
                    ((40 !== n.which && 38 !== n.which) ||
                      e(n.target).closest(".dropdown-menu").length))
                : !D.test(n.which)) &&
              !this.disabled &&
              !e(this).hasClass("disabled")
            ) {
              var i = t._getParentFromElement(this),
                o = e(i).hasClass("show");
              if (o || 27 !== n.which) {
                if (
                  (n.preventDefault(),
                  n.stopPropagation(),
                  !o || (o && (27 === n.which || 32 === n.which)))
                )
                  return (
                    27 === n.which &&
                      e(i.querySelector('[data-toggle="dropdown"]')).trigger(
                        "focus"
                      ),
                    void e(this).trigger("click")
                  );
                var s = [].slice
                  .call(
                    i.querySelectorAll(
                      ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)"
                    )
                  )
                  .filter(function (t) {
                    return e(t).is(":visible");
                  });
                if (0 !== s.length) {
                  var r = s.indexOf(n.target);
                  38 === n.which && r > 0 && r--,
                    40 === n.which && r < s.length - 1 && r++,
                    r < 0 && (r = 0),
                    s[r].focus();
                }
              }
            }
          }),
          o(t, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.5.2";
              },
            },
            {
              key: "Default",
              get: function () {
                return N;
              },
            },
            {
              key: "DefaultType",
              get: function () {
                return A;
              },
            },
          ]),
          t
        );
      })();
    e(document)
      .on(
        "keydown.bs.dropdown.data-api",
        '[data-toggle="dropdown"]',
        I._dataApiKeydownHandler
      )
      .on(
        "keydown.bs.dropdown.data-api",
        ".dropdown-menu",
        I._dataApiKeydownHandler
      )
      .on("click.bs.dropdown.data-api keyup.bs.dropdown.data-api", I._clearMenus)
      .on("click.bs.dropdown.data-api", '[data-toggle="dropdown"]', function (t) {
        t.preventDefault(),
          t.stopPropagation(),
          I._jQueryInterface.call(e(this), "toggle");
      })
      .on("click.bs.dropdown.data-api", ".dropdown form", function (t) {
        t.stopPropagation();
      }),
      (e.fn[S] = I._jQueryInterface),
      (e.fn[S].Constructor = I),
      (e.fn[S].noConflict = function () {
        return (e.fn[S] = k), I._jQueryInterface;
      });
    var O = e.fn.modal,
      j = { backdrop: !0, keyboard: !0, focus: !0, show: !0 },
      x = {
        backdrop: "(boolean|string)",
        keyboard: "boolean",
        focus: "boolean",
        show: "boolean",
      },
      P = (function () {
        function t(t, e) {
          (this._config = this._getConfig(e)),
            (this._element = t),
            (this._dialog = t.querySelector(".modal-dialog")),
            (this._backdrop = null),
            (this._isShown = !1),
            (this._isBodyOverflowing = !1),
            (this._ignoreBackdropClick = !1),
            (this._isTransitioning = !1),
            (this._scrollbarWidth = 0);
        }
        var n = t.prototype;
        return (
          (n.toggle = function (t) {
            return this._isShown ? this.hide() : this.show(t);
          }),
          (n.show = function (t) {
            var n = this;
            if (!this._isShown && !this._isTransitioning) {
              e(this._element).hasClass("fade") && (this._isTransitioning = !0);
              var i = e.Event("show.bs.modal", { relatedTarget: t });
              e(this._element).trigger(i),
                this._isShown ||
                  i.isDefaultPrevented() ||
                  ((this._isShown = !0),
                  this._checkScrollbar(),
                  this._setScrollbar(),
                  this._adjustDialog(),
                  this._setEscapeEvent(),
                  this._setResizeEvent(),
                  e(this._element).on(
                    "click.dismiss.bs.modal",
                    '[data-dismiss="modal"]',
                    function (t) {
                      return n.hide(t);
                    }
                  ),
                  e(this._dialog).on("mousedown.dismiss.bs.modal", function () {
                    e(n._element).one("mouseup.dismiss.bs.modal", function (t) {
                      e(t.target).is(n._element) && (n._ignoreBackdropClick = !0);
                    });
                  }),
                  this._showBackdrop(function () {
                    return n._showElement(t);
                  }));
            }
          }),
          (n.hide = function (t) {
            var n = this;
            if (
              (t && t.preventDefault(), this._isShown && !this._isTransitioning)
            ) {
              var i = e.Event("hide.bs.modal");
              if (
                (e(this._element).trigger(i),
                this._isShown && !i.isDefaultPrevented())
              ) {
                this._isShown = !1;
                var o = e(this._element).hasClass("fade");
                if (
                  (o && (this._isTransitioning = !0),
                  this._setEscapeEvent(),
                  this._setResizeEvent(),
                  e(document).off("focusin.bs.modal"),
                  e(this._element).removeClass("show"),
                  e(this._element).off("click.dismiss.bs.modal"),
                  e(this._dialog).off("mousedown.dismiss.bs.modal"),
                  o)
                ) {
                  var s = a.getTransitionDurationFromElement(this._element);
                  e(this._element)
                    .one(a.TRANSITION_END, function (t) {
                      return n._hideModal(t);
                    })
                    .emulateTransitionEnd(s);
                } else this._hideModal();
              }
            }
          }),
          (n.dispose = function () {
            [window, this._element, this._dialog].forEach(function (t) {
              return e(t).off(".bs.modal");
            }),
              e(document).off("focusin.bs.modal"),
              e.removeData(this._element, "bs.modal"),
              (this._config = null),
              (this._element = null),
              (this._dialog = null),
              (this._backdrop = null),
              (this._isShown = null),
              (this._isBodyOverflowing = null),
              (this._ignoreBackdropClick = null),
              (this._isTransitioning = null),
              (this._scrollbarWidth = null);
          }),
          (n.handleUpdate = function () {
            this._adjustDialog();
          }),
          (n._getConfig = function (t) {
            return (t = s({}, j, t)), a.typeCheckConfig("modal", t, x), t;
          }),
          (n._triggerBackdropTransition = function () {
            var t = this;
            if ("static" === this._config.backdrop) {
              var n = e.Event("hidePrevented.bs.modal");
              if ((e(this._element).trigger(n), n.defaultPrevented)) return;
              var i =
                this._element.scrollHeight >
                document.documentElement.clientHeight;
              i || (this._element.style.overflowY = "hidden"),
                this._element.classList.add("modal-static");
              var o = a.getTransitionDurationFromElement(this._dialog);
              e(this._element).off(a.TRANSITION_END),
                e(this._element)
                  .one(a.TRANSITION_END, function () {
                    t._element.classList.remove("modal-static"),
                      i ||
                        e(t._element)
                          .one(a.TRANSITION_END, function () {
                            t._element.style.overflowY = "";
                          })
                          .emulateTransitionEnd(t._element, o);
                  })
                  .emulateTransitionEnd(o),
                this._element.focus();
            } else this.hide();
          }),
          (n._showElement = function (t) {
            var n = this,
              i = e(this._element).hasClass("fade"),
              o = this._dialog ? this._dialog.querySelector(".modal-body") : null;
            (this._element.parentNode &&
              this._element.parentNode.nodeType === Node.ELEMENT_NODE) ||
              document.body.appendChild(this._element),
              (this._element.style.display = "block"),
              this._element.removeAttribute("aria-hidden"),
              this._element.setAttribute("aria-modal", !0),
              this._element.setAttribute("role", "dialog"),
              e(this._dialog).hasClass("modal-dialog-scrollable") && o
                ? (o.scrollTop = 0)
                : (this._element.scrollTop = 0),
              i && a.reflow(this._element),
              e(this._element).addClass("show"),
              this._config.focus && this._enforceFocus();
            var s = e.Event("shown.bs.modal", { relatedTarget: t }),
              r = function () {
                n._config.focus && n._element.focus(),
                  (n._isTransitioning = !1),
                  e(n._element).trigger(s);
              };
            if (i) {
              var l = a.getTransitionDurationFromElement(this._dialog);
              e(this._dialog).one(a.TRANSITION_END, r).emulateTransitionEnd(l);
            } else r();
          }),
          (n._enforceFocus = function () {
            var t = this;
            e(document)
              .off("focusin.bs.modal")
              .on("focusin.bs.modal", function (n) {
                document !== n.target &&
                  t._element !== n.target &&
                  0 === e(t._element).has(n.target).length &&
                  t._element.focus();
              });
          }),
          (n._setEscapeEvent = function () {
            var t = this;
            this._isShown
              ? e(this._element).on("keydown.dismiss.bs.modal", function (e) {
                  t._config.keyboard && 27 === e.which
                    ? (e.preventDefault(), t.hide())
                    : t._config.keyboard ||
                      27 !== e.which ||
                      t._triggerBackdropTransition();
                })
              : this._isShown || e(this._element).off("keydown.dismiss.bs.modal");
          }),
          (n._setResizeEvent = function () {
            var t = this;
            this._isShown
              ? e(window).on("resize.bs.modal", function (e) {
                  return t.handleUpdate(e);
                })
              : e(window).off("resize.bs.modal");
          }),
          (n._hideModal = function () {
            var t = this;
            (this._element.style.display = "none"),
              this._element.setAttribute("aria-hidden", !0),
              this._element.removeAttribute("aria-modal"),
              this._element.removeAttribute("role"),
              (this._isTransitioning = !1),
              this._showBackdrop(function () {
                e(document.body).removeClass("modal-open"),
                  t._resetAdjustments(),
                  t._resetScrollbar(),
                  e(t._element).trigger("hidden.bs.modal");
              });
          }),
          (n._removeBackdrop = function () {
            this._backdrop &&
              (e(this._backdrop).remove(), (this._backdrop = null));
          }),
          (n._showBackdrop = function (t) {
            var n = this,
              i = e(this._element).hasClass("fade") ? "fade" : "";
            if (this._isShown && this._config.backdrop) {
              if (
                ((this._backdrop = document.createElement("div")),
                (this._backdrop.className = "modal-backdrop"),
                i && this._backdrop.classList.add(i),
                e(this._backdrop).appendTo(document.body),
                e(this._element).on("click.dismiss.bs.modal", function (t) {
                  n._ignoreBackdropClick
                    ? (n._ignoreBackdropClick = !1)
                    : t.target === t.currentTarget &&
                      n._triggerBackdropTransition();
                }),
                i && a.reflow(this._backdrop),
                e(this._backdrop).addClass("show"),
                !t)
              )
                return;
              if (!i) return void t();
              var o = a.getTransitionDurationFromElement(this._backdrop);
              e(this._backdrop).one(a.TRANSITION_END, t).emulateTransitionEnd(o);
            } else if (!this._isShown && this._backdrop) {
              e(this._backdrop).removeClass("show");
              var s = function () {
                n._removeBackdrop(), t && t();
              };
              if (e(this._element).hasClass("fade")) {
                var r = a.getTransitionDurationFromElement(this._backdrop);
                e(this._backdrop)
                  .one(a.TRANSITION_END, s)
                  .emulateTransitionEnd(r);
              } else s();
            } else t && t();
          }),
          (n._adjustDialog = function () {
            var t =
              this._element.scrollHeight > document.documentElement.clientHeight;
            !this._isBodyOverflowing &&
              t &&
              (this._element.style.paddingLeft = this._scrollbarWidth + "px"),
              this._isBodyOverflowing &&
                !t &&
                (this._element.style.paddingRight = this._scrollbarWidth + "px");
          }),
          (n._resetAdjustments = function () {
            (this._element.style.paddingLeft = ""),
              (this._element.style.paddingRight = "");
          }),
          (n._checkScrollbar = function () {
            var t = document.body.getBoundingClientRect();
            (this._isBodyOverflowing =
              Math.round(t.left + t.right) < window.innerWidth),
              (this._scrollbarWidth = this._getScrollbarWidth());
          }),
          (n._setScrollbar = function () {
            var t = this;
            if (this._isBodyOverflowing) {
              var n = [].slice.call(
                  document.querySelectorAll(
                    ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top"
                  )
                ),
                i = [].slice.call(document.querySelectorAll(".sticky-top"));
              e(n).each(function (n, i) {
                var o = i.style.paddingRight,
                  s = e(i).css("padding-right");
                e(i)
                  .data("padding-right", o)
                  .css("padding-right", parseFloat(s) + t._scrollbarWidth + "px");
              }),
                e(i).each(function (n, i) {
                  var o = i.style.marginRight,
                    s = e(i).css("margin-right");
                  e(i)
                    .data("margin-right", o)
                    .css(
                      "margin-right",
                      parseFloat(s) - t._scrollbarWidth + "px"
                    );
                });
              var o = document.body.style.paddingRight,
                s = e(document.body).css("padding-right");
              e(document.body)
                .data("padding-right", o)
                .css(
                  "padding-right",
                  parseFloat(s) + this._scrollbarWidth + "px"
                );
            }
            e(document.body).addClass("modal-open");
          }),
          (n._resetScrollbar = function () {
            var t = [].slice.call(
              document.querySelectorAll(
                ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top"
              )
            );
            e(t).each(function (t, n) {
              var i = e(n).data("padding-right");
              e(n).removeData("padding-right"), (n.style.paddingRight = i || "");
            });
            var n = [].slice.call(document.querySelectorAll(".sticky-top"));
            e(n).each(function (t, n) {
              var i = e(n).data("margin-right");
              "undefined" != typeof i &&
                e(n).css("margin-right", i).removeData("margin-right");
            });
            var i = e(document.body).data("padding-right");
            e(document.body).removeData("padding-right"),
              (document.body.style.paddingRight = i || "");
          }),
          (n._getScrollbarWidth = function () {
            var t = document.createElement("div");
            (t.className = "modal-scrollbar-measure"),
              document.body.appendChild(t);
            var e = t.getBoundingClientRect().width - t.clientWidth;
            return document.body.removeChild(t), e;
          }),
          (t._jQueryInterface = function (n, i) {
            return this.each(function () {
              var o = e(this).data("bs.modal"),
                r = s({}, j, e(this).data(), "object" == typeof n && n ? n : {});
              if (
                (o || ((o = new t(this, r)), e(this).data("bs.modal", o)),
                "string" == typeof n)
              ) {
                if ("undefined" == typeof o[n])
                  throw new TypeError('No method named "' + n + '"');
                o[n](i);
              } else r.show && o.show(i);
            });
          }),
          o(t, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.5.2";
              },
            },
            {
              key: "Default",
              get: function () {
                return j;
              },
            },
          ]),
          t
        );
      })();
    e(document).on(
      "click.bs.modal.data-api",
      '[data-toggle="modal"]',
      function (t) {
        var n,
          i = this,
          o = a.getSelectorFromElement(this);
        o && (n = document.querySelector(o));
        var r = e(n).data("bs.modal")
          ? "toggle"
          : s({}, e(n).data(), e(this).data());
        ("A" !== this.tagName && "AREA" !== this.tagName) || t.preventDefault();
        var l = e(n).one("show.bs.modal", function (t) {
          t.isDefaultPrevented() ||
            l.one("hidden.bs.modal", function () {
              e(i).is(":visible") && i.focus();
            });
        });
        P._jQueryInterface.call(e(n), r, this);
      }
    ),
      (e.fn.modal = P._jQueryInterface),
      (e.fn.modal.Constructor = P),
      (e.fn.modal.noConflict = function () {
        return (e.fn.modal = O), P._jQueryInterface;
      });
    var R = [
        "background",
        "cite",
        "href",
        "itemtype",
        "longdesc",
        "poster",
        "src",
        "xlink:href",
      ],
      L = {
        "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
        a: ["target", "href", "title", "rel"],
        area: [],
        b: [],
        br: [],
        col: [],
        code: [],
        div: [],
        em: [],
        hr: [],
        h1: [],
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
        i: [],
        img: ["src", "srcset", "alt", "title", "width", "height"],
        li: [],
        ol: [],
        p: [],
        pre: [],
        s: [],
        small: [],
        span: [],
        sub: [],
        sup: [],
        strong: [],
        u: [],
        ul: [],
      },
      q = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi,
      F =
        /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;
    function Q(t, e, n) {
      if (0 === t.length) return t;
      if (n && "function" == typeof n) return n(t);
      for (
        var i = new window.DOMParser().parseFromString(t, "text/html"),
          o = Object.keys(e),
          s = [].slice.call(i.body.querySelectorAll("*")),
          r = function (t, n) {
            var i = s[t],
              r = i.nodeName.toLowerCase();
            if (-1 === o.indexOf(i.nodeName.toLowerCase()))
              return i.parentNode.removeChild(i), "continue";
            var a = [].slice.call(i.attributes),
              l = [].concat(e["*"] || [], e[r] || []);
            a.forEach(function (t) {
              (function (t, e) {
                var n = t.nodeName.toLowerCase();
                if (-1 !== e.indexOf(n))
                  return (
                    -1 === R.indexOf(n) ||
                    Boolean(t.nodeValue.match(q) || t.nodeValue.match(F))
                  );
                for (
                  var i = e.filter(function (t) {
                      return t instanceof RegExp;
                    }),
                    o = 0,
                    s = i.length;
                  o < s;
                  o++
                )
                  if (n.match(i[o])) return !0;
                return !1;
              })(t, l) || i.removeAttribute(t.nodeName);
            });
          },
          a = 0,
          l = s.length;
        a < l;
        a++
      )
        r(a);
      return i.body.innerHTML;
    }
    var B = "tooltip",
      H = e.fn[B],
      U = new RegExp("(^|\\s)bs-tooltip\\S+", "g"),
      M = ["sanitize", "whiteList", "sanitizeFn"],
      W = {
        animation: "boolean",
        template: "string",
        title: "(string|element|function)",
        trigger: "string",
        delay: "(number|object)",
        html: "boolean",
        selector: "(string|boolean)",
        placement: "(string|function)",
        offset: "(number|string|function)",
        container: "(string|element|boolean)",
        fallbackPlacement: "(string|array)",
        boundary: "(string|element)",
        sanitize: "boolean",
        sanitizeFn: "(null|function)",
        whiteList: "object",
        popperConfig: "(null|object)",
      },
      V = {
        AUTO: "auto",
        TOP: "top",
        RIGHT: "right",
        BOTTOM: "bottom",
        LEFT: "left",
      },
      z = {
        animation: !0,
        template:
          '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        selector: !1,
        placement: "top",
        offset: 0,
        container: !1,
        fallbackPlacement: "flip",
        boundary: "scrollParent",
        sanitize: !0,
        sanitizeFn: null,
        whiteList: L,
        popperConfig: null,
      },
      K = {
        HIDE: "hide.bs.tooltip",
        HIDDEN: "hidden.bs.tooltip",
        SHOW: "show.bs.tooltip",
        SHOWN: "shown.bs.tooltip",
        INSERTED: "inserted.bs.tooltip",
        CLICK: "click.bs.tooltip",
        FOCUSIN: "focusin.bs.tooltip",
        FOCUSOUT: "focusout.bs.tooltip",
        MOUSEENTER: "mouseenter.bs.tooltip",
        MOUSELEAVE: "mouseleave.bs.tooltip",
      },
      X = (function () {
        function t(t, e) {
          if ("undefined" == typeof n)
            throw new TypeError(
              "Bootstrap's tooltips require Popper.js (https://popper.js.org/)"
            );
          (this._isEnabled = !0),
            (this._timeout = 0),
            (this._hoverState = ""),
            (this._activeTrigger = {}),
            (this._popper = null),
            (this.element = t),
            (this.config = this._getConfig(e)),
            (this.tip = null),
            this._setListeners();
        }
        var i = t.prototype;
        return (
          (i.enable = function () {
            this._isEnabled = !0;
          }),
          (i.disable = function () {
            this._isEnabled = !1;
          }),
          (i.toggleEnabled = function () {
            this._isEnabled = !this._isEnabled;
          }),
          (i.toggle = function (t) {
            if (this._isEnabled)
              if (t) {
                var n = this.constructor.DATA_KEY,
                  i = e(t.currentTarget).data(n);
                i ||
                  ((i = new this.constructor(
                    t.currentTarget,
                    this._getDelegateConfig()
                  )),
                  e(t.currentTarget).data(n, i)),
                  (i._activeTrigger.click = !i._activeTrigger.click),
                  i._isWithActiveTrigger()
                    ? i._enter(null, i)
                    : i._leave(null, i);
              } else {
                if (e(this.getTipElement()).hasClass("show"))
                  return void this._leave(null, this);
                this._enter(null, this);
              }
          }),
          (i.dispose = function () {
            clearTimeout(this._timeout),
              e.removeData(this.element, this.constructor.DATA_KEY),
              e(this.element).off(this.constructor.EVENT_KEY),
              e(this.element)
                .closest(".modal")
                .off("hide.bs.modal", this._hideModalHandler),
              this.tip && e(this.tip).remove(),
              (this._isEnabled = null),
              (this._timeout = null),
              (this._hoverState = null),
              (this._activeTrigger = null),
              this._popper && this._popper.destroy(),
              (this._popper = null),
              (this.element = null),
              (this.config = null),
              (this.tip = null);
          }),
          (i.show = function () {
            var t = this;
            if ("none" === e(this.element).css("display"))
              throw new Error("Please use show on visible elements");
            var i = e.Event(this.constructor.Event.SHOW);
            if (this.isWithContent() && this._isEnabled) {
              e(this.element).trigger(i);
              var o = a.findShadowRoot(this.element),
                s = e.contains(
                  null !== o ? o : this.element.ownerDocument.documentElement,
                  this.element
                );
              if (i.isDefaultPrevented() || !s) return;
              var r = this.getTipElement(),
                l = a.getUID(this.constructor.NAME);
              r.setAttribute("id", l),
                this.element.setAttribute("aria-describedby", l),
                this.setContent(),
                this.config.animation && e(r).addClass("fade");
              var c =
                  "function" == typeof this.config.placement
                    ? this.config.placement.call(this, r, this.element)
                    : this.config.placement,
                h = this._getAttachment(c);
              this.addAttachmentClass(h);
              var u = this._getContainer();
              e(r).data(this.constructor.DATA_KEY, this),
                e.contains(
                  this.element.ownerDocument.documentElement,
                  this.tip
                ) || e(r).appendTo(u),
                e(this.element).trigger(this.constructor.Event.INSERTED),
                (this._popper = new n(this.element, r, this._getPopperConfig(h))),
                e(r).addClass("show"),
                "ontouchstart" in document.documentElement &&
                  e(document.body).children().on("mouseover", null, e.noop);
              var d = function () {
                t.config.animation && t._fixTransition();
                var n = t._hoverState;
                (t._hoverState = null),
                  e(t.element).trigger(t.constructor.Event.SHOWN),
                  "out" === n && t._leave(null, t);
              };
              if (e(this.tip).hasClass("fade")) {
                var f = a.getTransitionDurationFromElement(this.tip);
                e(this.tip).one(a.TRANSITION_END, d).emulateTransitionEnd(f);
              } else d();
            }
          }),
          (i.hide = function (t) {
            var n = this,
              i = this.getTipElement(),
              o = e.Event(this.constructor.Event.HIDE),
              s = function () {
                "show" !== n._hoverState &&
                  i.parentNode &&
                  i.parentNode.removeChild(i),
                  n._cleanTipClass(),
                  n.element.removeAttribute("aria-describedby"),
                  e(n.element).trigger(n.constructor.Event.HIDDEN),
                  null !== n._popper && n._popper.destroy(),
                  t && t();
              };
            if ((e(this.element).trigger(o), !o.isDefaultPrevented())) {
              if (
                (e(i).removeClass("show"),
                "ontouchstart" in document.documentElement &&
                  e(document.body).children().off("mouseover", null, e.noop),
                (this._activeTrigger.click = !1),
                (this._activeTrigger.focus = !1),
                (this._activeTrigger.hover = !1),
                e(this.tip).hasClass("fade"))
              ) {
                var r = a.getTransitionDurationFromElement(i);
                e(i).one(a.TRANSITION_END, s).emulateTransitionEnd(r);
              } else s();
              this._hoverState = "";
            }
          }),
          (i.update = function () {
            null !== this._popper && this._popper.scheduleUpdate();
          }),
          (i.isWithContent = function () {
            return Boolean(this.getTitle());
          }),
          (i.addAttachmentClass = function (t) {
            e(this.getTipElement()).addClass("bs-tooltip-" + t);
          }),
          (i.getTipElement = function () {
            return (this.tip = this.tip || e(this.config.template)[0]), this.tip;
          }),
          (i.setContent = function () {
            var t = this.getTipElement();
            this.setElementContent(
              e(t.querySelectorAll(".tooltip-inner")),
              this.getTitle()
            ),
              e(t).removeClass("fade show");
          }),
          (i.setElementContent = function (t, n) {
            "object" != typeof n || (!n.nodeType && !n.jquery)
              ? this.config.html
                ? (this.config.sanitize &&
                    (n = Q(n, this.config.whiteList, this.config.sanitizeFn)),
                  t.html(n))
                : t.text(n)
              : this.config.html
              ? e(n).parent().is(t) || t.empty().append(n)
              : t.text(e(n).text());
          }),
          (i.getTitle = function () {
            var t = this.element.getAttribute("data-original-title");
            return (
              t ||
                (t =
                  "function" == typeof this.config.title
                    ? this.config.title.call(this.element)
                    : this.config.title),
              t
            );
          }),
          (i._getPopperConfig = function (t) {
            var e = this;
            return s(
              {},
              {
                placement: t,
                modifiers: {
                  offset: this._getOffset(),
                  flip: { behavior: this.config.fallbackPlacement },
                  arrow: { element: ".arrow" },
                  preventOverflow: { boundariesElement: this.config.boundary },
                },
                onCreate: function (t) {
                  t.originalPlacement !== t.placement &&
                    e._handlePopperPlacementChange(t);
                },
                onUpdate: function (t) {
                  return e._handlePopperPlacementChange(t);
                },
              },
              this.config.popperConfig
            );
          }),
          (i._getOffset = function () {
            var t = this,
              e = {};
            return (
              "function" == typeof this.config.offset
                ? (e.fn = function (e) {
                    return (
                      (e.offsets = s(
                        {},
                        e.offsets,
                        t.config.offset(e.offsets, t.element) || {}
                      )),
                      e
                    );
                  })
                : (e.offset = this.config.offset),
              e
            );
          }),
          (i._getContainer = function () {
            return !1 === this.config.container
              ? document.body
              : a.isElement(this.config.container)
              ? e(this.config.container)
              : e(document).find(this.config.container);
          }),
          (i._getAttachment = function (t) {
            return V[t.toUpperCase()];
          }),
          (i._setListeners = function () {
            var t = this;
            this.config.trigger.split(" ").forEach(function (n) {
              if ("click" === n)
                e(t.element).on(
                  t.constructor.Event.CLICK,
                  t.config.selector,
                  function (e) {
                    return t.toggle(e);
                  }
                );
              else if ("manual" !== n) {
                var i =
                    "hover" === n
                      ? t.constructor.Event.MOUSEENTER
                      : t.constructor.Event.FOCUSIN,
                  o =
                    "hover" === n
                      ? t.constructor.Event.MOUSELEAVE
                      : t.constructor.Event.FOCUSOUT;
                e(t.element)
                  .on(i, t.config.selector, function (e) {
                    return t._enter(e);
                  })
                  .on(o, t.config.selector, function (e) {
                    return t._leave(e);
                  });
              }
            }),
              (this._hideModalHandler = function () {
                t.element && t.hide();
              }),
              e(this.element)
                .closest(".modal")
                .on("hide.bs.modal", this._hideModalHandler),
              this.config.selector
                ? (this.config = s({}, this.config, {
                    trigger: "manual",
                    selector: "",
                  }))
                : this._fixTitle();
          }),
          (i._fixTitle = function () {
            var t = typeof this.element.getAttribute("data-original-title");
            (this.element.getAttribute("title") || "string" !== t) &&
              (this.element.setAttribute(
                "data-original-title",
                this.element.getAttribute("title") || ""
              ),
              this.element.setAttribute("title", ""));
          }),
          (i._enter = function (t, n) {
            var i = this.constructor.DATA_KEY;
            (n = n || e(t.currentTarget).data(i)) ||
              ((n = new this.constructor(
                t.currentTarget,
                this._getDelegateConfig()
              )),
              e(t.currentTarget).data(i, n)),
              t &&
                (n._activeTrigger["focusin" === t.type ? "focus" : "hover"] = !0),
              e(n.getTipElement()).hasClass("show") || "show" === n._hoverState
                ? (n._hoverState = "show")
                : (clearTimeout(n._timeout),
                  (n._hoverState = "show"),
                  n.config.delay && n.config.delay.show
                    ? (n._timeout = setTimeout(function () {
                        "show" === n._hoverState && n.show();
                      }, n.config.delay.show))
                    : n.show());
          }),
          (i._leave = function (t, n) {
            var i = this.constructor.DATA_KEY;
            (n = n || e(t.currentTarget).data(i)) ||
              ((n = new this.constructor(
                t.currentTarget,
                this._getDelegateConfig()
              )),
              e(t.currentTarget).data(i, n)),
              t &&
                (n._activeTrigger["focusout" === t.type ? "focus" : "hover"] =
                  !1),
              n._isWithActiveTrigger() ||
                (clearTimeout(n._timeout),
                (n._hoverState = "out"),
                n.config.delay && n.config.delay.hide
                  ? (n._timeout = setTimeout(function () {
                      "out" === n._hoverState && n.hide();
                    }, n.config.delay.hide))
                  : n.hide());
          }),
          (i._isWithActiveTrigger = function () {
            for (var t in this._activeTrigger)
              if (this._activeTrigger[t]) return !0;
            return !1;
          }),
          (i._getConfig = function (t) {
            var n = e(this.element).data();
            return (
              Object.keys(n).forEach(function (t) {
                -1 !== M.indexOf(t) && delete n[t];
              }),
              "number" ==
                typeof (t = s(
                  {},
                  this.constructor.Default,
                  n,
                  "object" == typeof t && t ? t : {}
                )).delay && (t.delay = { show: t.delay, hide: t.delay }),
              "number" == typeof t.title && (t.title = t.title.toString()),
              "number" == typeof t.content && (t.content = t.content.toString()),
              a.typeCheckConfig(B, t, this.constructor.DefaultType),
              t.sanitize &&
                (t.template = Q(t.template, t.whiteList, t.sanitizeFn)),
              t
            );
          }),
          (i._getDelegateConfig = function () {
            var t = {};
            if (this.config)
              for (var e in this.config)
                this.constructor.Default[e] !== this.config[e] &&
                  (t[e] = this.config[e]);
            return t;
          }),
          (i._cleanTipClass = function () {
            var t = e(this.getTipElement()),
              n = t.attr("class").match(U);
            null !== n && n.length && t.removeClass(n.join(""));
          }),
          (i._handlePopperPlacementChange = function (t) {
            (this.tip = t.instance.popper),
              this._cleanTipClass(),
              this.addAttachmentClass(this._getAttachment(t.placement));
          }),
          (i._fixTransition = function () {
            var t = this.getTipElement(),
              n = this.config.animation;
            null === t.getAttribute("x-placement") &&
              (e(t).removeClass("fade"),
              (this.config.animation = !1),
              this.hide(),
              this.show(),
              (this.config.animation = n));
          }),
          (t._jQueryInterface = function (n) {
            return this.each(function () {
              var i = e(this).data("bs.tooltip"),
                o = "object" == typeof n && n;
              if (
                (i || !/dispose|hide/.test(n)) &&
                (i || ((i = new t(this, o)), e(this).data("bs.tooltip", i)),
                "string" == typeof n)
              ) {
                if ("undefined" == typeof i[n])
                  throw new TypeError('No method named "' + n + '"');
                i[n]();
              }
            });
          }),
          o(t, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.5.2";
              },
            },
            {
              key: "Default",
              get: function () {
                return z;
              },
            },
            {
              key: "NAME",
              get: function () {
                return B;
              },
            },
            {
              key: "DATA_KEY",
              get: function () {
                return "bs.tooltip";
              },
            },
            {
              key: "Event",
              get: function () {
                return K;
              },
            },
            {
              key: "EVENT_KEY",
              get: function () {
                return ".bs.tooltip";
              },
            },
            {
              key: "DefaultType",
              get: function () {
                return W;
              },
            },
          ]),
          t
        );
      })();
    (e.fn[B] = X._jQueryInterface),
      (e.fn[B].Constructor = X),
      (e.fn[B].noConflict = function () {
        return (e.fn[B] = H), X._jQueryInterface;
      });
    var Y = "popover",
      $ = e.fn[Y],
      J = new RegExp("(^|\\s)bs-popover\\S+", "g"),
      G = s({}, X.Default, {
        placement: "right",
        trigger: "click",
        content: "",
        template:
          '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
      }),
      Z = s({}, X.DefaultType, { content: "(string|element|function)" }),
      tt = {
        HIDE: "hide.bs.popover",
        HIDDEN: "hidden.bs.popover",
        SHOW: "show.bs.popover",
        SHOWN: "shown.bs.popover",
        INSERTED: "inserted.bs.popover",
        CLICK: "click.bs.popover",
        FOCUSIN: "focusin.bs.popover",
        FOCUSOUT: "focusout.bs.popover",
        MOUSEENTER: "mouseenter.bs.popover",
        MOUSELEAVE: "mouseleave.bs.popover",
      },
      et = (function (t) {
        var n, i;
        function s() {
          return t.apply(this, arguments) || this;
        }
        (i = t),
          ((n = s).prototype = Object.create(i.prototype)),
          (n.prototype.constructor = n),
          (n.__proto__ = i);
        var r = s.prototype;
        return (
          (r.isWithContent = function () {
            return this.getTitle() || this._getContent();
          }),
          (r.addAttachmentClass = function (t) {
            e(this.getTipElement()).addClass("bs-popover-" + t);
          }),
          (r.getTipElement = function () {
            return (this.tip = this.tip || e(this.config.template)[0]), this.tip;
          }),
          (r.setContent = function () {
            var t = e(this.getTipElement());
            this.setElementContent(t.find(".popover-header"), this.getTitle());
            var n = this._getContent();
            "function" == typeof n && (n = n.call(this.element)),
              this.setElementContent(t.find(".popover-body"), n),
              t.removeClass("fade show");
          }),
          (r._getContent = function () {
            return (
              this.element.getAttribute("data-content") || this.config.content
            );
          }),
          (r._cleanTipClass = function () {
            var t = e(this.getTipElement()),
              n = t.attr("class").match(J);
            null !== n && n.length > 0 && t.removeClass(n.join(""));
          }),
          (s._jQueryInterface = function (t) {
            return this.each(function () {
              var n = e(this).data("bs.popover"),
                i = "object" == typeof t ? t : null;
              if (
                (n || !/dispose|hide/.test(t)) &&
                (n || ((n = new s(this, i)), e(this).data("bs.popover", n)),
                "string" == typeof t)
              ) {
                if ("undefined" == typeof n[t])
                  throw new TypeError('No method named "' + t + '"');
                n[t]();
              }
            });
          }),
          o(s, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.5.2";
              },
            },
            {
              key: "Default",
              get: function () {
                return G;
              },
            },
            {
              key: "NAME",
              get: function () {
                return Y;
              },
            },
            {
              key: "DATA_KEY",
              get: function () {
                return "bs.popover";
              },
            },
            {
              key: "Event",
              get: function () {
                return tt;
              },
            },
            {
              key: "EVENT_KEY",
              get: function () {
                return ".bs.popover";
              },
            },
            {
              key: "DefaultType",
              get: function () {
                return Z;
              },
            },
          ]),
          s
        );
      })(X);
    (e.fn[Y] = et._jQueryInterface),
      (e.fn[Y].Constructor = et),
      (e.fn[Y].noConflict = function () {
        return (e.fn[Y] = $), et._jQueryInterface;
      });
    var nt = "scrollspy",
      it = e.fn[nt],
      ot = { offset: 10, method: "auto", target: "" },
      st = { offset: "number", method: "string", target: "(string|element)" },
      rt = (function () {
        function t(t, n) {
          var i = this;
          (this._element = t),
            (this._scrollElement = "BODY" === t.tagName ? window : t),
            (this._config = this._getConfig(n)),
            (this._selector =
              this._config.target +
              " .nav-link," +
              this._config.target +
              " .list-group-item," +
              this._config.target +
              " .dropdown-item"),
            (this._offsets = []),
            (this._targets = []),
            (this._activeTarget = null),
            (this._scrollHeight = 0),
            e(this._scrollElement).on("scroll.bs.scrollspy", function (t) {
              return i._process(t);
            }),
            this.refresh(),
            this._process();
        }
        var n = t.prototype;
        return (
          (n.refresh = function () {
            var t = this,
              n =
                this._scrollElement === this._scrollElement.window
                  ? "offset"
                  : "position",
              i = "auto" === this._config.method ? n : this._config.method,
              o = "position" === i ? this._getScrollTop() : 0;
            (this._offsets = []),
              (this._targets = []),
              (this._scrollHeight = this._getScrollHeight()),
              [].slice
                .call(document.querySelectorAll(this._selector))
                .map(function (t) {
                  var n,
                    s = a.getSelectorFromElement(t);
                  if ((s && (n = document.querySelector(s)), n)) {
                    var r = n.getBoundingClientRect();
                    if (r.width || r.height) return [e(n)[i]().top + o, s];
                  }
                  return null;
                })
                .filter(function (t) {
                  return t;
                })
                .sort(function (t, e) {
                  return t[0] - e[0];
                })
                .forEach(function (e) {
                  t._offsets.push(e[0]), t._targets.push(e[1]);
                });
          }),
          (n.dispose = function () {
            e.removeData(this._element, "bs.scrollspy"),
              e(this._scrollElement).off(".bs.scrollspy"),
              (this._element = null),
              (this._scrollElement = null),
              (this._config = null),
              (this._selector = null),
              (this._offsets = null),
              (this._targets = null),
              (this._activeTarget = null),
              (this._scrollHeight = null);
          }),
          (n._getConfig = function (t) {
            if (
              "string" !=
                typeof (t = s({}, ot, "object" == typeof t && t ? t : {}))
                  .target &&
              a.isElement(t.target)
            ) {
              var n = e(t.target).attr("id");
              n || ((n = a.getUID(nt)), e(t.target).attr("id", n)),
                (t.target = "#" + n);
            }
            return a.typeCheckConfig(nt, t, st), t;
          }),
          (n._getScrollTop = function () {
            return this._scrollElement === window
              ? this._scrollElement.pageYOffset
              : this._scrollElement.scrollTop;
          }),
          (n._getScrollHeight = function () {
            return (
              this._scrollElement.scrollHeight ||
              Math.max(
                document.body.scrollHeight,
                document.documentElement.scrollHeight
              )
            );
          }),
          (n._getOffsetHeight = function () {
            return this._scrollElement === window
              ? window.innerHeight
              : this._scrollElement.getBoundingClientRect().height;
          }),
          (n._process = function () {
            var t = this._getScrollTop() + this._config.offset,
              e = this._getScrollHeight(),
              n = this._config.offset + e - this._getOffsetHeight();
            if ((this._scrollHeight !== e && this.refresh(), t >= n)) {
              var i = this._targets[this._targets.length - 1];
              this._activeTarget !== i && this._activate(i);
            } else {
              if (
                this._activeTarget &&
                t < this._offsets[0] &&
                this._offsets[0] > 0
              )
                return (this._activeTarget = null), void this._clear();
              for (var o = this._offsets.length; o--; ) {
                this._activeTarget !== this._targets[o] &&
                  t >= this._offsets[o] &&
                  ("undefined" == typeof this._offsets[o + 1] ||
                    t < this._offsets[o + 1]) &&
                  this._activate(this._targets[o]);
              }
            }
          }),
          (n._activate = function (t) {
            (this._activeTarget = t), this._clear();
            var n = this._selector.split(",").map(function (e) {
                return (
                  e + '[data-target="' + t + '"],' + e + '[href="' + t + '"]'
                );
              }),
              i = e([].slice.call(document.querySelectorAll(n.join(","))));
            i.hasClass("dropdown-item")
              ? (i
                  .closest(".dropdown")
                  .find(".dropdown-toggle")
                  .addClass("active"),
                i.addClass("active"))
              : (i.addClass("active"),
                i
                  .parents(".nav, .list-group")
                  .prev(".nav-link, .list-group-item")
                  .addClass("active"),
                i
                  .parents(".nav, .list-group")
                  .prev(".nav-item")
                  .children(".nav-link")
                  .addClass("active")),
              e(this._scrollElement).trigger("activate.bs.scrollspy", {
                relatedTarget: t,
              });
          }),
          (n._clear = function () {
            [].slice
              .call(document.querySelectorAll(this._selector))
              .filter(function (t) {
                return t.classList.contains("active");
              })
              .forEach(function (t) {
                return t.classList.remove("active");
              });
          }),
          (t._jQueryInterface = function (n) {
            return this.each(function () {
              var i = e(this).data("bs.scrollspy");
              if (
                (i ||
                  ((i = new t(this, "object" == typeof n && n)),
                  e(this).data("bs.scrollspy", i)),
                "string" == typeof n)
              ) {
                if ("undefined" == typeof i[n])
                  throw new TypeError('No method named "' + n + '"');
                i[n]();
              }
            });
          }),
          o(t, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.5.2";
              },
            },
            {
              key: "Default",
              get: function () {
                return ot;
              },
            },
          ]),
          t
        );
      })();
    e(window).on("load.bs.scrollspy.data-api", function () {
      for (
        var t = [].slice.call(document.querySelectorAll('[data-spy="scroll"]')),
          n = t.length;
        n--;
  
      ) {
        var i = e(t[n]);
        rt._jQueryInterface.call(i, i.data());
      }
    }),
      (e.fn[nt] = rt._jQueryInterface),
      (e.fn[nt].Constructor = rt),
      (e.fn[nt].noConflict = function () {
        return (e.fn[nt] = it), rt._jQueryInterface;
      });
    var at = e.fn.tab,
      lt = (function () {
        function t(t) {
          this._element = t;
        }
        var n = t.prototype;
        return (
          (n.show = function () {
            var t = this;
            if (
              !(
                (this._element.parentNode &&
                  this._element.parentNode.nodeType === Node.ELEMENT_NODE &&
                  e(this._element).hasClass("active")) ||
                e(this._element).hasClass("disabled")
              )
            ) {
              var n,
                i,
                o = e(this._element).closest(".nav, .list-group")[0],
                s = a.getSelectorFromElement(this._element);
              if (o) {
                var r =
                  "UL" === o.nodeName || "OL" === o.nodeName
                    ? "> li > .active"
                    : ".active";
                i = (i = e.makeArray(e(o).find(r)))[i.length - 1];
              }
              var l = e.Event("hide.bs.tab", { relatedTarget: this._element }),
                c = e.Event("show.bs.tab", { relatedTarget: i });
              if (
                (i && e(i).trigger(l),
                e(this._element).trigger(c),
                !c.isDefaultPrevented() && !l.isDefaultPrevented())
              ) {
                s && (n = document.querySelector(s)),
                  this._activate(this._element, o);
                var h = function () {
                  var n = e.Event("hidden.bs.tab", { relatedTarget: t._element }),
                    o = e.Event("shown.bs.tab", { relatedTarget: i });
                  e(i).trigger(n), e(t._element).trigger(o);
                };
                n ? this._activate(n, n.parentNode, h) : h();
              }
            }
          }),
          (n.dispose = function () {
            e.removeData(this._element, "bs.tab"), (this._element = null);
          }),
          (n._activate = function (t, n, i) {
            var o = this,
              s = (
                !n || ("UL" !== n.nodeName && "OL" !== n.nodeName)
                  ? e(n).children(".active")
                  : e(n).find("> li > .active")
              )[0],
              r = i && s && e(s).hasClass("fade"),
              l = function () {
                return o._transitionComplete(t, s, i);
              };
            if (s && r) {
              var c = a.getTransitionDurationFromElement(s);
              e(s)
                .removeClass("show")
                .one(a.TRANSITION_END, l)
                .emulateTransitionEnd(c);
            } else l();
          }),
          (n._transitionComplete = function (t, n, i) {
            if (n) {
              e(n).removeClass("active");
              var o = e(n.parentNode).find("> .dropdown-menu .active")[0];
              o && e(o).removeClass("active"),
                "tab" === n.getAttribute("role") &&
                  n.setAttribute("aria-selected", !1);
            }
            if (
              (e(t).addClass("active"),
              "tab" === t.getAttribute("role") &&
                t.setAttribute("aria-selected", !0),
              a.reflow(t),
              t.classList.contains("fade") && t.classList.add("show"),
              t.parentNode && e(t.parentNode).hasClass("dropdown-menu"))
            ) {
              var s = e(t).closest(".dropdown")[0];
              if (s) {
                var r = [].slice.call(s.querySelectorAll(".dropdown-toggle"));
                e(r).addClass("active");
              }
              t.setAttribute("aria-expanded", !0);
            }
            i && i();
          }),
          (t._jQueryInterface = function (n) {
            return this.each(function () {
              var i = e(this),
                o = i.data("bs.tab");
              if (
                (o || ((o = new t(this)), i.data("bs.tab", o)),
                "string" == typeof n)
              ) {
                if ("undefined" == typeof o[n])
                  throw new TypeError('No method named "' + n + '"');
                o[n]();
              }
            });
          }),
          o(t, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.5.2";
              },
            },
          ]),
          t
        );
      })();
    e(document).on(
      "click.bs.tab.data-api",
      '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
      function (t) {
        t.preventDefault(), lt._jQueryInterface.call(e(this), "show");
      }
    ),
      (e.fn.tab = lt._jQueryInterface),
      (e.fn.tab.Constructor = lt),
      (e.fn.tab.noConflict = function () {
        return (e.fn.tab = at), lt._jQueryInterface;
      });
    var ct = e.fn.toast,
      ht = { animation: "boolean", autohide: "boolean", delay: "number" },
      ut = { animation: !0, autohide: !0, delay: 500 },
      dt = (function () {
        function t(t, e) {
          (this._element = t),
            (this._config = this._getConfig(e)),
            (this._timeout = null),
            this._setListeners();
        }
        var n = t.prototype;
        return (
          (n.show = function () {
            var t = this,
              n = e.Event("show.bs.toast");
            if ((e(this._element).trigger(n), !n.isDefaultPrevented())) {
              this._clearTimeout(),
                this._config.animation && this._element.classList.add("fade");
              var i = function () {
                t._element.classList.remove("showing"),
                  t._element.classList.add("show"),
                  e(t._element).trigger("shown.bs.toast"),
                  t._config.autohide &&
                    (t._timeout = setTimeout(function () {
                      t.hide();
                    }, t._config.delay));
              };
              if (
                (this._element.classList.remove("hide"),
                a.reflow(this._element),
                this._element.classList.add("showing"),
                this._config.animation)
              ) {
                var o = a.getTransitionDurationFromElement(this._element);
                e(this._element).one(a.TRANSITION_END, i).emulateTransitionEnd(o);
              } else i();
            }
          }),
          (n.hide = function () {
            if (this._element.classList.contains("show")) {
              var t = e.Event("hide.bs.toast");
              e(this._element).trigger(t),
                t.isDefaultPrevented() || this._close();
            }
          }),
          (n.dispose = function () {
            this._clearTimeout(),
              this._element.classList.contains("show") &&
                this._element.classList.remove("show"),
              e(this._element).off("click.dismiss.bs.toast"),
              e.removeData(this._element, "bs.toast"),
              (this._element = null),
              (this._config = null);
          }),
          (n._getConfig = function (t) {
            return (
              (t = s(
                {},
                ut,
                e(this._element).data(),
                "object" == typeof t && t ? t : {}
              )),
              a.typeCheckConfig("toast", t, this.constructor.DefaultType),
              t
            );
          }),
          (n._setListeners = function () {
            var t = this;
            e(this._element).on(
              "click.dismiss.bs.toast",
              '[data-dismiss="toast"]',
              function () {
                return t.hide();
              }
            );
          }),
          (n._close = function () {
            var t = this,
              n = function () {
                t._element.classList.add("hide"),
                  e(t._element).trigger("hidden.bs.toast");
              };
            if (
              (this._element.classList.remove("show"), this._config.animation)
            ) {
              var i = a.getTransitionDurationFromElement(this._element);
              e(this._element).one(a.TRANSITION_END, n).emulateTransitionEnd(i);
            } else n();
          }),
          (n._clearTimeout = function () {
            clearTimeout(this._timeout), (this._timeout = null);
          }),
          (t._jQueryInterface = function (n) {
            return this.each(function () {
              var i = e(this),
                o = i.data("bs.toast");
              if (
                (o ||
                  ((o = new t(this, "object" == typeof n && n)),
                  i.data("bs.toast", o)),
                "string" == typeof n)
              ) {
                if ("undefined" == typeof o[n])
                  throw new TypeError('No method named "' + n + '"');
                o[n](this);
              }
            });
          }),
          o(t, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.5.2";
              },
            },
            {
              key: "DefaultType",
              get: function () {
                return ht;
              },
            },
            {
              key: "Default",
              get: function () {
                return ut;
              },
            },
          ]),
          t
        );
      })();
    (e.fn.toast = dt._jQueryInterface),
      (e.fn.toast.Constructor = dt),
      (e.fn.toast.noConflict = function () {
        return (e.fn.toast = ct), dt._jQueryInterface;
      }),
      (t.Alert = h),
      (t.Button = d),
      (t.Carousel = b),
      (t.Collapse = C),
      (t.Dropdown = I),
      (t.Modal = P),
      (t.Popover = et),
      (t.Scrollspy = rt),
      (t.Tab = lt),
      (t.Toast = dt),
      (t.Tooltip = X),
      (t.Util = a),
      Object.defineProperty(t, "__esModule", { value: !0 });
  });
  !(function (t, e, n, o) {
    "use strict";
    function i(t) {
      var e = t.currentTarget,
        o = t.data ? t.data.options : {},
        i = t.data ? t.data.items : [],
        a = n(e).attr("data-fancybox") || "",
        s = 0;
      t.preventDefault(),
        t.stopPropagation(),
        a
          ? ((i = i.length
              ? i.filter('[data-fancybox="' + a + '"]')
              : n('[data-fancybox="' + a + '"]')),
            (s = i.index(e)),
            s < 0 && (s = 0))
          : (i = [e]),
        n.fancybox.open(i, o, s);
    }
    if (n) {
      if (n.fn.fancybox) return void n.error("fancyBox already initialized");
      var a = {
          loop: !1,
          margin: [44, 0],
          gutter: 50,
          keyboard: !0,
          arrows: !0,
          infobar: !1,
          toolbar: !0,
          buttons: ["slideShow", "fullScreen", "thumbs", "close"],
          idleTime: 4,
          smallBtn: "auto",
          protect: !1,
          modal: !1,
          image: { preload: "auto" },
          ajax: { settings: { data: { fancybox: !0 } } },
          iframe: {
            tpl: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen allowtransparency="true" src=""></iframe>',
            preload: !0,
            css: {},
            attr: { scrolling: "auto" },
          },
          animationEffect: "zoom",
          animationDuration: 366,
          zoomOpacity: "auto",
          transitionEffect: "fade",
          transitionDuration: 366,
          slideClass: "",
          baseClass: "",
          baseTpl:
            '<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-infobar"><button data-fancybox-prev title="{{PREV}}" class="fancybox-button fancybox-button--left"></button><div class="fancybox-infobar__body"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><button data-fancybox-next title="{{NEXT}}" class="fancybox-button fancybox-button--right"></button></div><div class="fancybox-toolbar">{{BUTTONS}}</div><div class="fancybox-navigation"><button data-fancybox-prev title="{{PREV}}" class="fancybox-arrow fancybox-arrow--left" /><button data-fancybox-next title="{{NEXT}}" class="fancybox-arrow fancybox-arrow--right" /></div><div class="fancybox-stage"></div><div class="fancybox-caption-wrap"><div class="fancybox-caption"></div></div></div></div>',
          spinnerTpl: '<div class="fancybox-loading"></div>',
          errorTpl: '<div class="fancybox-error"><p>{{ERROR}}<p></div>',
          btnTpl: {
            slideShow:
              '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"></button>',
            fullScreen:
              '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fullscreen" title="{{FULL_SCREEN}}"></button>',
            thumbs:
              '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"></button>',
            close:
              '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"></button>',
            smallBtn:
              '<button data-fancybox-close class="fancybox-close-small" title="{{CLOSE}}"></button>',
          },
          parentEl: "body",
          autoFocus: !0,
          backFocus: !0,
          trapFocus: !0,
          fullScreen: { autoStart: !1 },
          touch: { vertical: !0, momentum: !0 },
          hash: null,
          media: {},
          slideShow: { autoStart: !1, speed: 4e3 },
          thumbs: { autoStart: !1, hideOnClose: !0 },
          onInit: n.noop,
          beforeLoad: n.noop,
          afterLoad: n.noop,
          beforeShow: n.noop,
          afterShow: n.noop,
          beforeClose: n.noop,
          afterClose: n.noop,
          onActivate: n.noop,
          onDeactivate: n.noop,
          clickContent: function (t, e) {
            return "image" === t.type && "zoom";
          },
          clickSlide: "close",
          clickOutside: "close",
          dblclickContent: !1,
          dblclickSlide: !1,
          dblclickOutside: !1,
          mobile: {
            clickContent: function (t, e) {
              return "image" === t.type && "toggleControls";
            },
            clickSlide: function (t, e) {
              return "image" === t.type ? "toggleControls" : "close";
            },
            dblclickContent: function (t, e) {
              return "image" === t.type && "zoom";
            },
            dblclickSlide: function (t, e) {
              return "image" === t.type && "zoom";
            },
          },
          lang: "en",
          i18n: {
            en: {
              CLOSE: "Close",
              NEXT: "Next",
              PREV: "Previous",
              ERROR:
                "The requested content cannot be loaded. <br/> Please try again later.",
              PLAY_START: "Start slideshow",
              PLAY_STOP: "Pause slideshow",
              FULL_SCREEN: "Full screen",
              THUMBS: "Thumbnails",
            },
            de: {
              CLOSE: "Schliessen",
              NEXT: "Weiter",
              PREV: "Zurück",
              ERROR:
                "Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es später nochmal.",
              PLAY_START: "Diaschau starten",
              PLAY_STOP: "Diaschau beenden",
              FULL_SCREEN: "Vollbild",
              THUMBS: "Vorschaubilder",
            },
          },
        },
        s = n(t),
        r = n(e),
        c = 0,
        l = function (t) {
          return t && t.hasOwnProperty && t instanceof n;
        },
        u = (function () {
          return (
            t.requestAnimationFrame ||
            t.webkitRequestAnimationFrame ||
            t.mozRequestAnimationFrame ||
            t.oRequestAnimationFrame ||
            function (e) {
              return t.setTimeout(e, 1e3 / 60);
            }
          );
        })(),
        d = (function () {
          var t,
            n = e.createElement("fakeelement"),
            i = {
              transition: "transitionend",
              OTransition: "oTransitionEnd",
              MozTransition: "transitionend",
              WebkitTransition: "webkitTransitionEnd",
            };
          for (t in i) if (n.style[t] !== o) return i[t];
        })(),
        f = function (t) {
          return t && t.length && t[0].offsetHeight;
        },
        h = function (t, o, i) {
          var s = this;
          (s.opts = n.extend(!0, { index: i }, a, o || {})),
            o && n.isArray(o.buttons) && (s.opts.buttons = o.buttons),
            (s.id = s.opts.id || ++c),
            (s.group = []),
            (s.currIndex = parseInt(s.opts.index, 10) || 0),
            (s.prevIndex = null),
            (s.prevPos = null),
            (s.currPos = 0),
            (s.firstRun = null),
            s.createGroup(t),
            s.group.length &&
              ((s.$lastFocus = n(e.activeElement).blur()),
              (s.slides = {}),
              s.init(t));
        };
      n.extend(h.prototype, {
        init: function () {
          var t,
            e,
            o,
            i = this,
            a = i.group[i.currIndex].opts;
          (i.scrollTop = r.scrollTop()),
            (i.scrollLeft = r.scrollLeft()),
            n.fancybox.getInstance() ||
              n.fancybox.isMobile ||
              "hidden" === n("body").css("overflow") ||
              ((t = n("body").width()),
              n("html").addClass("fancybox-enabled"),
              (t = n("body").width() - t),
              t > 1 &&
                n("head").append(
                  '<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar, .fancybox-enabled body { margin-right: ' +
                    t +
                    "px; }</style>"
                )),
            (o = ""),
            n.each(a.buttons, function (t, e) {
              o += a.btnTpl[e] || "";
            }),
            (e = n(i.translate(i, a.baseTpl.replace("{{BUTTONS}}", o)))
              .addClass("fancybox-is-hidden")
              .attr("id", "fancybox-container-" + i.id)
              .addClass(a.baseClass)
              .data("FancyBox", i)
              .prependTo(a.parentEl)),
            (i.$refs = { container: e }),
            ["bg", "inner", "infobar", "toolbar", "stage", "caption"].forEach(
              function (t) {
                i.$refs[t] = e.find(".fancybox-" + t);
              }
            ),
            (!a.arrows || i.group.length < 2) &&
              e.find(".fancybox-navigation").remove(),
            a.infobar || i.$refs.infobar.remove(),
            a.toolbar || i.$refs.toolbar.remove(),
            i.trigger("onInit"),
            i.activate(),
            i.jumpTo(i.currIndex);
        },
        translate: function (t, e) {
          var n = t.opts.i18n[t.opts.lang];
          return e.replace(/\{\{(\w+)\}\}/g, function (t, e) {
            var i = n[e];
            return i === o ? t : i;
          });
        },
        createGroup: function (t) {
          var e = this,
            i = n.makeArray(t);
          n.each(i, function (t, i) {
            var a,
              s,
              r,
              c,
              l = {},
              u = {},
              d = [];
            n.isPlainObject(i)
              ? ((l = i), (u = i.opts || i))
              : "object" === n.type(i) && n(i).length
              ? ((a = n(i)),
                (d = a.data()),
                (u = "options" in d ? d.options : {}),
                (u = "object" === n.type(u) ? u : {}),
                (l.src = "src" in d ? d.src : u.src || a.attr("href")),
                ["width", "height", "thumb", "type", "filter"].forEach(function (
                  t
                ) {
                  t in d && (u[t] = d[t]);
                }),
                "srcset" in d && (u.image = { srcset: d.srcset }),
                (u.$orig = a),
                l.type || l.src || ((l.type = "inline"), (l.src = i)))
              : (l = { type: "html", src: i + "" }),
              (l.opts = n.extend(!0, {}, e.opts, u)),
              n.fancybox.isMobile &&
                (l.opts = n.extend(!0, {}, l.opts, l.opts.mobile)),
              (s = l.type || l.opts.type),
              (r = l.src || ""),
              !s &&
                r &&
                (r.match(
                  /(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i
                )
                  ? (s = "image")
                  : r.match(/\.(pdf)((\?|#).*)?$/i)
                  ? (s = "pdf")
                  : "#" === r.charAt(0) && (s = "inline")),
              (l.type = s),
              (l.index = e.group.length),
              l.opts.$orig && !l.opts.$orig.length && delete l.opts.$orig,
              !l.opts.$thumb &&
                l.opts.$orig &&
                (l.opts.$thumb = l.opts.$orig.find("img:first")),
              l.opts.$thumb && !l.opts.$thumb.length && delete l.opts.$thumb,
              "function" === n.type(l.opts.caption)
                ? (l.opts.caption = l.opts.caption.apply(i, [e, l]))
                : "caption" in d && (l.opts.caption = d.caption),
              (l.opts.caption = l.opts.caption === o ? "" : l.opts.caption + ""),
              "ajax" === s &&
                ((c = r.split(/\s+/, 2)),
                c.length > 1 &&
                  ((l.src = c.shift()), (l.opts.filter = c.shift()))),
              "auto" == l.opts.smallBtn &&
                (n.inArray(s, ["html", "inline", "ajax"]) > -1
                  ? ((l.opts.toolbar = !1), (l.opts.smallBtn = !0))
                  : (l.opts.smallBtn = !1)),
              "pdf" === s && ((l.type = "iframe"), (l.opts.iframe.preload = !1)),
              l.opts.modal &&
                (l.opts = n.extend(!0, l.opts, {
                  infobar: 0,
                  toolbar: 0,
                  smallBtn: 0,
                  keyboard: 0,
                  slideShow: 0,
                  fullScreen: 0,
                  thumbs: 0,
                  touch: 0,
                  clickContent: !1,
                  clickSlide: !1,
                  clickOutside: !1,
                  dblclickContent: !1,
                  dblclickSlide: !1,
                  dblclickOutside: !1,
                })),
              e.group.push(l);
          });
        },
        addEvents: function () {
          var o = this;
          o.removeEvents(),
            o.$refs.container
              .on("click.fb-close", "[data-fancybox-close]", function (t) {
                t.stopPropagation(), t.preventDefault(), o.close(t);
              })
              .on(
                "click.fb-prev touchend.fb-prev",
                "[data-fancybox-prev]",
                function (t) {
                  t.stopPropagation(), t.preventDefault(), o.previous();
                }
              )
              .on(
                "click.fb-next touchend.fb-next",
                "[data-fancybox-next]",
                function (t) {
                  t.stopPropagation(), t.preventDefault(), o.next();
                }
              ),
            s.on("orientationchange.fb resize.fb", function (t) {
              t && t.originalEvent && "resize" === t.originalEvent.type
                ? u(function () {
                    o.update();
                  })
                : (o.$refs.stage.hide(),
                  setTimeout(function () {
                    o.$refs.stage.show(), o.update();
                  }, 500));
            }),
            r.on("focusin.fb", function (t) {
              var i = n.fancybox ? n.fancybox.getInstance() : null;
              i.isClosing ||
                !i.current ||
                !i.current.opts.trapFocus ||
                n(t.target).hasClass("fancybox-container") ||
                n(t.target).is(e) ||
                (i &&
                  "fixed" !== n(t.target).css("position") &&
                  !i.$refs.container.has(t.target).length &&
                  (t.stopPropagation(),
                  i.focus(),
                  s.scrollTop(o.scrollTop).scrollLeft(o.scrollLeft)));
            }),
            r.on("keydown.fb", function (t) {
              var e = o.current,
                i = t.keyCode || t.which;
              if (
                e &&
                e.opts.keyboard &&
                !n(t.target).is("input") &&
                !n(t.target).is("textarea")
              )
                return 8 === i || 27 === i
                  ? (t.preventDefault(), void o.close(t))
                  : 37 === i || 38 === i
                  ? (t.preventDefault(), void o.previous())
                  : 39 === i || 40 === i
                  ? (t.preventDefault(), void o.next())
                  : void o.trigger("afterKeydown", t, i);
            }),
            o.group[o.currIndex].opts.idleTime &&
              ((o.idleSecondsCounter = 0),
              r.on(
                "mousemove.fb-idle mouseenter.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle",
                function () {
                  (o.idleSecondsCounter = 0),
                    o.isIdle && o.showControls(),
                    (o.isIdle = !1);
                }
              ),
              (o.idleInterval = t.setInterval(function () {
                o.idleSecondsCounter++,
                  o.idleSecondsCounter >= o.group[o.currIndex].opts.idleTime &&
                    ((o.isIdle = !0),
                    (o.idleSecondsCounter = 0),
                    o.hideControls());
              }, 1e3)));
        },
        removeEvents: function () {
          var e = this;
          s.off("orientationchange.fb resize.fb"),
            r.off("focusin.fb keydown.fb .fb-idle"),
            this.$refs.container.off(".fb-close .fb-prev .fb-next"),
            e.idleInterval &&
              (t.clearInterval(e.idleInterval), (e.idleInterval = null));
        },
        previous: function (t) {
          return this.jumpTo(this.currPos - 1, t);
        },
        next: function (t) {
          return this.jumpTo(this.currPos + 1, t);
        },
        jumpTo: function (t, e, i) {
          var a,
            s,
            r,
            c,
            l,
            u,
            d,
            h = this,
            p = h.group.length;
          if (!(h.isSliding || h.isClosing || (h.isAnimating && h.firstRun))) {
            if (
              ((t = parseInt(t, 10)),
              (s = h.current ? h.current.opts.loop : h.opts.loop),
              !s && (t < 0 || t >= p))
            )
              return !1;
            if (
              ((a = h.firstRun = null === h.firstRun),
              !(p < 2 && !a && h.isSliding))
            ) {
              if (
                ((c = h.current),
                (h.prevIndex = h.currIndex),
                (h.prevPos = h.currPos),
                (r = h.createSlide(t)),
                p > 1 &&
                  ((s || r.index > 0) && h.createSlide(t - 1),
                  (s || r.index < p - 1) && h.createSlide(t + 1)),
                (h.current = r),
                (h.currIndex = r.index),
                (h.currPos = r.pos),
                h.trigger("beforeShow", a),
                h.updateControls(),
                (u = n.fancybox.getTranslate(r.$slide)),
                (r.isMoved =
                  (0 !== u.left || 0 !== u.top) &&
                  !r.$slide.hasClass("fancybox-animated")),
                (r.forcedDuration = o),
                n.isNumeric(e)
                  ? (r.forcedDuration = e)
                  : (e = r.opts[a ? "animationDuration" : "transitionDuration"]),
                (e = parseInt(e, 10)),
                a)
              )
                return (
                  r.opts.animationEffect &&
                    e &&
                    h.$refs.container.css("transition-duration", e + "ms"),
                  h.$refs.container.removeClass("fancybox-is-hidden"),
                  f(h.$refs.container),
                  h.$refs.container.addClass("fancybox-is-open"),
                  r.$slide.addClass("fancybox-slide--current"),
                  h.loadSlide(r),
                  void h.preload()
                );
              n.each(h.slides, function (t, e) {
                n.fancybox.stop(e.$slide);
              }),
                r.$slide
                  .removeClass("fancybox-slide--next fancybox-slide--previous")
                  .addClass("fancybox-slide--current"),
                r.isMoved
                  ? ((l = Math.round(r.$slide.width())),
                    n.each(h.slides, function (t, o) {
                      var i = o.pos - r.pos;
                      n.fancybox.animate(
                        o.$slide,
                        { top: 0, left: i * l + i * o.opts.gutter },
                        e,
                        function () {
                          o.$slide
                            .removeAttr("style")
                            .removeClass(
                              "fancybox-slide--next fancybox-slide--previous"
                            ),
                            o.pos === h.currPos &&
                              ((r.isMoved = !1), h.complete());
                        }
                      );
                    }))
                  : h.$refs.stage.children().removeAttr("style"),
                r.isLoaded ? h.revealContent(r) : h.loadSlide(r),
                h.preload(),
                c.pos !== r.pos &&
                  ((d =
                    "fancybox-slide--" + (c.pos > r.pos ? "next" : "previous")),
                  c.$slide.removeClass(
                    "fancybox-slide--complete fancybox-slide--current fancybox-slide--next fancybox-slide--previous"
                  ),
                  (c.isComplete = !1),
                  e &&
                    (r.isMoved || r.opts.transitionEffect) &&
                    (r.isMoved
                      ? c.$slide.addClass(d)
                      : ((d =
                          "fancybox-animated " +
                          d +
                          " fancybox-fx-" +
                          r.opts.transitionEffect),
                        n.fancybox.animate(c.$slide, d, e, function () {
                          c.$slide.removeClass(d).removeAttr("style");
                        }))));
            }
          }
        },
        createSlide: function (t) {
          var e,
            o,
            i = this;
          return (
            (o = t % i.group.length),
            (o = o < 0 ? i.group.length + o : o),
            !i.slides[t] &&
              i.group[o] &&
              ((e = n('<div class="fancybox-slide"></div>').appendTo(
                i.$refs.stage
              )),
              (i.slides[t] = n.extend(!0, {}, i.group[o], {
                pos: t,
                $slide: e,
                isLoaded: !1,
              })),
              i.updateSlide(i.slides[t])),
            i.slides[t]
          );
        },
        scaleToActual: function (t, e, i) {
          var a,
            s,
            r,
            c,
            l,
            u = this,
            d = u.current,
            f = d.$content,
            h = parseInt(d.$slide.width(), 10),
            p = parseInt(d.$slide.height(), 10),
            g = d.width,
            b = d.height;
          "image" != d.type ||
            d.hasError ||
            !f ||
            u.isAnimating ||
            (n.fancybox.stop(f),
            (u.isAnimating = !0),
            (t = t === o ? 0.5 * h : t),
            (e = e === o ? 0.5 * p : e),
            (a = n.fancybox.getTranslate(f)),
            (c = g / a.width),
            (l = b / a.height),
            (s = 0.5 * h - 0.5 * g),
            (r = 0.5 * p - 0.5 * b),
            g > h &&
              ((s = a.left * c - (t * c - t)),
              s > 0 && (s = 0),
              s < h - g && (s = h - g)),
            b > p &&
              ((r = a.top * l - (e * l - e)),
              r > 0 && (r = 0),
              r < p - b && (r = p - b)),
            u.updateCursor(g, b),
            n.fancybox.animate(
              f,
              { top: r, left: s, scaleX: c, scaleY: l },
              i || 330,
              function () {
                u.isAnimating = !1;
              }
            ),
            u.SlideShow && u.SlideShow.isActive && u.SlideShow.stop());
        },
        scaleToFit: function (t) {
          var e,
            o = this,
            i = o.current,
            a = i.$content;
          "image" != i.type ||
            i.hasError ||
            !a ||
            o.isAnimating ||
            (n.fancybox.stop(a),
            (o.isAnimating = !0),
            (e = o.getFitPos(i)),
            o.updateCursor(e.width, e.height),
            n.fancybox.animate(
              a,
              {
                top: e.top,
                left: e.left,
                scaleX: e.width / a.width(),
                scaleY: e.height / a.height(),
              },
              t || 330,
              function () {
                o.isAnimating = !1;
              }
            ));
        },
        getFitPos: function (t) {
          var e,
            o,
            i,
            a,
            r,
            c = this,
            l = t.$content,
            u = t.width,
            d = t.height,
            f = t.opts.margin;
          return (
            !(!l || !l.length || (!u && !d)) &&
            ("number" === n.type(f) && (f = [f, f]),
            2 == f.length && (f = [f[0], f[1], f[0], f[1]]),
            s.width() < 800 && (f = [0, 0, 0, 0]),
            (e = parseInt(c.$refs.stage.width(), 10) - (f[1] + f[3])),
            (o = parseInt(c.$refs.stage.height(), 10) - (f[0] + f[2])),
            (i = Math.min(1, e / u, o / d)),
            (a = Math.floor(i * u)),
            (r = Math.floor(i * d)),
            {
              top: Math.floor(0.5 * (o - r)) + f[0],
              left: Math.floor(0.5 * (e - a)) + f[3],
              width: a,
              height: r,
            })
          );
        },
        update: function () {
          var t = this;
          n.each(t.slides, function (e, n) {
            t.updateSlide(n);
          });
        },
        updateSlide: function (t) {
          var e = this,
            o = t.$content;
          o &&
            (t.width || t.height) &&
            (n.fancybox.stop(o),
            n.fancybox.setTranslate(o, e.getFitPos(t)),
            t.pos === e.currPos && e.updateCursor()),
            t.$slide.trigger("refresh"),
            e.trigger("onUpdate", t);
        },
        updateCursor: function (t, e) {
          var n,
            i = this,
            a = i.$refs.container.removeClass(
              "fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-drag fancybox-can-zoomOut"
            );
          i.current &&
            !i.isClosing &&
            (i.isZoomable()
              ? (a.addClass("fancybox-is-zoomable"),
                (n =
                  t !== o && e !== o
                    ? t < i.current.width && e < i.current.height
                    : i.isScaledDown()),
                n
                  ? a.addClass("fancybox-can-zoomIn")
                  : i.current.opts.touch
                  ? a.addClass("fancybox-can-drag")
                  : a.addClass("fancybox-can-zoomOut"))
              : i.current.opts.touch && a.addClass("fancybox-can-drag"));
        },
        isZoomable: function () {
          var t,
            e = this,
            o = e.current;
          if (o && !e.isClosing)
            return !!(
              "image" === o.type &&
              o.isLoaded &&
              !o.hasError &&
              ("zoom" === o.opts.clickContent ||
                (n.isFunction(o.opts.clickContent) &&
                  "zoom" === o.opts.clickContent(o))) &&
              ((t = e.getFitPos(o)), o.width > t.width || o.height > t.height)
            );
        },
        isScaledDown: function () {
          var t = this,
            e = t.current,
            o = e.$content,
            i = !1;
          return (
            o &&
              ((i = n.fancybox.getTranslate(o)),
              (i = i.width < e.width || i.height < e.height)),
            i
          );
        },
        canPan: function () {
          var t = this,
            e = t.current,
            n = e.$content,
            o = !1;
          return (
            n &&
              ((o = t.getFitPos(e)),
              (o =
                Math.abs(n.width() - o.width) > 1 ||
                Math.abs(n.height() - o.height) > 1)),
            o
          );
        },
        loadSlide: function (t) {
          var e,
            o,
            i,
            a = this;
          if (!t.isLoading && !t.isLoaded) {
            switch (
              ((t.isLoading = !0),
              a.trigger("beforeLoad", t),
              (e = t.type),
              (o = t.$slide),
              o
                .off("refresh")
                .trigger("onReset")
                .addClass("fancybox-slide--" + (e || "unknown"))
                .addClass(t.opts.slideClass),
              e)
            ) {
              case "image":
                a.setImage(t);
                break;
              case "iframe":
                a.setIframe(t);
                break;
              case "html":
                a.setContent(t, t.src || t.content);
                break;
              case "inline":
                n(t.src).length ? a.setContent(t, n(t.src)) : a.setError(t);
                break;
              case "ajax":
                a.showLoading(t),
                  (i = n.ajax(
                    n.extend({}, t.opts.ajax.settings, {
                      url: t.src,
                      success: function (e, n) {
                        "success" === n && a.setContent(t, e);
                      },
                      error: function (e, n) {
                        e && "abort" !== n && a.setError(t);
                      },
                    })
                  )),
                  o.one("onReset", function () {
                    i.abort();
                  });
                break;
              default:
                a.setError(t);
            }
            return !0;
          }
        },
        setImage: function (e) {
          var o,
            i,
            a,
            s,
            r = this,
            c = e.opts.image.srcset;
          if (c) {
            (a = t.devicePixelRatio || 1),
              (s = t.innerWidth * a),
              (i = c.split(",").map(function (t) {
                var e = {};
                return (
                  t
                    .trim()
                    .split(/\s+/)
                    .forEach(function (t, n) {
                      var o = parseInt(t.substring(0, t.length - 1), 10);
                      return 0 === n
                        ? (e.url = t)
                        : void (
                            o && ((e.value = o), (e.postfix = t[t.length - 1]))
                          );
                    }),
                  e
                );
              })),
              i.sort(function (t, e) {
                return t.value - e.value;
              });
            for (var l = 0; l < i.length; l++) {
              var u = i[l];
              if (
                ("w" === u.postfix && u.value >= s) ||
                ("x" === u.postfix && u.value >= a)
              ) {
                o = u;
                break;
              }
            }
            !o && i.length && (o = i[i.length - 1]),
              o &&
                ((e.src = o.url),
                e.width &&
                  e.height &&
                  "w" == o.postfix &&
                  ((e.height = (e.width / e.height) * o.value),
                  (e.width = o.value)));
          }
          (e.$content = n('<div class="fancybox-image-wrap"></div>')
            .addClass("fancybox-is-hidden")
            .appendTo(e.$slide)),
            e.opts.preload !== !1 &&
            e.opts.width &&
            e.opts.height &&
            (e.opts.thumb || e.opts.$thumb)
              ? ((e.width = e.opts.width),
                (e.height = e.opts.height),
                (e.$ghost = n("<img />")
                  .one("error", function () {
                    n(this).remove(), (e.$ghost = null), r.setBigImage(e);
                  })
                  .one("load", function () {
                    r.afterLoad(e), r.setBigImage(e);
                  })
                  .addClass("fancybox-image")
                  .appendTo(e.$content)
                  .attr("src", e.opts.thumb || e.opts.$thumb.attr("src"))))
              : r.setBigImage(e);
        },
        setBigImage: function (t) {
          var e = this,
            o = n("<img />");
          (t.$image = o
            .one("error", function () {
              e.setError(t);
            })
            .one("load", function () {
              clearTimeout(t.timouts),
                (t.timouts = null),
                e.isClosing ||
                  ((t.width = this.naturalWidth),
                  (t.height = this.naturalHeight),
                  t.opts.image.srcset &&
                    o.attr("sizes", "100vw").attr("srcset", t.opts.image.srcset),
                  e.hideLoading(t),
                  t.$ghost
                    ? (t.timouts = setTimeout(function () {
                        (t.timouts = null), t.$ghost.hide();
                      }, Math.min(300, Math.max(1e3, t.height / 1600))))
                    : e.afterLoad(t));
            })
            .addClass("fancybox-image")
            .attr("src", t.src)
            .appendTo(t.$content)),
            o[0].complete
              ? o.trigger("load")
              : o[0].error
              ? o.trigger("error")
              : (t.timouts = setTimeout(function () {
                  o[0].complete || t.hasError || e.showLoading(t);
                }, 100));
        },
        setIframe: function (t) {
          var e,
            i = this,
            a = t.opts.iframe,
            s = t.$slide;
          (t.$content = n(
            '<div class="fancybox-content' +
              (a.preload ? " fancybox-is-hidden" : "") +
              '"></div>'
          )
            .css(a.css)
            .appendTo(s)),
            (e = n(a.tpl.replace(/\{rnd\}/g, new Date().getTime()))
              .attr(a.attr)
              .appendTo(t.$content)),
            a.preload
              ? (i.showLoading(t),
                e.on("load.fb error.fb", function (e) {
                  (this.isReady = 1), t.$slide.trigger("refresh"), i.afterLoad(t);
                }),
                s.on("refresh.fb", function () {
                  var n,
                    i,
                    s,
                    r,
                    c,
                    l = t.$content;
                  if (1 === e[0].isReady) {
                    try {
                      (n = e.contents()), (i = n.find("body"));
                    } catch (t) {}
                    i &&
                      i.length &&
                      (a.css.width === o || a.css.height === o) &&
                      ((s =
                        e[0].contentWindow.document.documentElement.scrollWidth),
                      (r = Math.ceil(i.outerWidth(!0) + (l.width() - s))),
                      (c = Math.ceil(i.outerHeight(!0))),
                      l.css({
                        width:
                          a.css.width === o
                            ? r + (l.outerWidth() - l.innerWidth())
                            : a.css.width,
                        height:
                          a.css.height === o
                            ? c + (l.outerHeight() - l.innerHeight())
                            : a.css.height,
                      })),
                      l.removeClass("fancybox-is-hidden");
                  }
                }))
              : this.afterLoad(t),
            e.attr("src", t.src),
            t.opts.smallBtn === !0 &&
              t.$content.prepend(i.translate(t, t.opts.btnTpl.smallBtn)),
            s.one("onReset", function () {
              try {
                n(this).find("iframe").hide().attr("src", "//about:blank");
              } catch (t) {}
              n(this).empty(), (t.isLoaded = !1);
            });
        },
        setContent: function (t, e) {
          var o = this;
          o.isClosing ||
            (o.hideLoading(t),
            t.$slide.empty(),
            l(e) && e.parent().length
              ? (e.parent(".fancybox-slide--inline").trigger("onReset"),
                (t.$placeholder = n("<div></div>").hide().insertAfter(e)),
                e.css("display", "inline-block"))
              : t.hasError ||
                ("string" === n.type(e) &&
                  ((e = n("<div>").append(n.trim(e)).contents()),
                  3 === e[0].nodeType && (e = n("<div>").html(e))),
                t.opts.filter && (e = n("<div>").html(e).find(t.opts.filter))),
            t.$slide.one("onReset", function () {
              t.$placeholder &&
                (t.$placeholder.after(e.hide()).remove(),
                (t.$placeholder = null)),
                t.$smallBtn && (t.$smallBtn.remove(), (t.$smallBtn = null)),
                t.hasError || (n(this).empty(), (t.isLoaded = !1));
            }),
            (t.$content = n(e).appendTo(t.$slide)),
            t.opts.smallBtn &&
              !t.$smallBtn &&
              (t.$smallBtn = n(o.translate(t, t.opts.btnTpl.smallBtn)).appendTo(
                t.$content
              )),
            this.afterLoad(t));
        },
        setError: function (t) {
          (t.hasError = !0),
            t.$slide.removeClass("fancybox-slide--" + t.type),
            this.setContent(t, this.translate(t, t.opts.errorTpl));
        },
        showLoading: function (t) {
          var e = this;
          (t = t || e.current),
            t &&
              !t.$spinner &&
              (t.$spinner = n(e.opts.spinnerTpl).appendTo(t.$slide));
        },
        hideLoading: function (t) {
          var e = this;
          (t = t || e.current),
            t && t.$spinner && (t.$spinner.remove(), delete t.$spinner);
        },
        afterLoad: function (t) {
          var e = this;
          e.isClosing ||
            ((t.isLoading = !1),
            (t.isLoaded = !0),
            e.trigger("afterLoad", t),
            e.hideLoading(t),
            t.opts.protect &&
              t.$content &&
              !t.hasError &&
              (t.$content.on("contextmenu.fb", function (t) {
                return 2 == t.button && t.preventDefault(), !0;
              }),
              "image" === t.type &&
                n('<div class="fancybox-spaceball"></div>').appendTo(t.$content)),
            e.revealContent(t));
        },
        revealContent: function (t) {
          var e,
            i,
            a,
            s,
            r,
            c = this,
            l = t.$slide,
            u = !1;
          return (
            (e = t.opts[c.firstRun ? "animationEffect" : "transitionEffect"]),
            (a = t.opts[c.firstRun ? "animationDuration" : "transitionDuration"]),
            (a = parseInt(t.forcedDuration === o ? a : t.forcedDuration, 10)),
            (!t.isMoved && t.pos === c.currPos && a) || (e = !1),
            "zoom" !== e ||
              (t.pos === c.currPos &&
                a &&
                "image" === t.type &&
                !t.hasError &&
                (u = c.getThumbPos(t))) ||
              (e = "fade"),
            "zoom" === e
              ? ((r = c.getFitPos(t)),
                (r.scaleX = Math.round((r.width / u.width) * 100) / 100),
                (r.scaleY = Math.round((r.height / u.height) * 100) / 100),
                delete r.width,
                delete r.height,
                (s = t.opts.zoomOpacity),
                "auto" == s &&
                  (s = Math.abs(t.width / t.height - u.width / u.height) > 0.1),
                s && ((u.opacity = 0.1), (r.opacity = 1)),
                n.fancybox.setTranslate(
                  t.$content.removeClass("fancybox-is-hidden"),
                  u
                ),
                f(t.$content),
                void n.fancybox.animate(t.$content, r, a, function () {
                  c.complete();
                }))
              : (c.updateSlide(t),
                e
                  ? (n.fancybox.stop(l),
                    (i =
                      "fancybox-animated fancybox-slide--" +
                      (t.pos > c.prevPos ? "next" : "previous") +
                      " fancybox-fx-" +
                      e),
                    l
                      .removeAttr("style")
                      .removeClass(
                        "fancybox-slide--current fancybox-slide--next fancybox-slide--previous"
                      )
                      .addClass(i),
                    t.$content.removeClass("fancybox-is-hidden"),
                    f(l),
                    void n.fancybox.animate(
                      l,
                      "fancybox-slide--current",
                      a,
                      function (e) {
                        l.removeClass(i).removeAttr("style"),
                          t.pos === c.currPos && c.complete();
                      },
                      !0
                    ))
                  : (f(l),
                    t.$content.removeClass("fancybox-is-hidden"),
                    void (t.pos === c.currPos && c.complete())))
          );
        },
        getThumbPos: function (o) {
          var i,
            a = this,
            s = !1,
            r = function (e) {
              for (
                var o, i = e[0], a = i.getBoundingClientRect(), s = [];
                null !== i.parentElement;
  
              )
                ("hidden" !== n(i.parentElement).css("overflow") &&
                  "auto" !== n(i.parentElement).css("overflow")) ||
                  s.push(i.parentElement.getBoundingClientRect()),
                  (i = i.parentElement);
              return (
                (o = s.every(function (t) {
                  var e = Math.min(a.right, t.right) - Math.max(a.left, t.left),
                    n = Math.min(a.bottom, t.bottom) - Math.max(a.top, t.top);
                  return e > 0 && n > 0;
                })),
                o &&
                  a.bottom > 0 &&
                  a.right > 0 &&
                  a.left < n(t).width() &&
                  a.top < n(t).height()
              );
            },
            c = o.opts.$thumb,
            l = c ? c.offset() : 0;
          return (
            l &&
              c[0].ownerDocument === e &&
              r(c) &&
              ((i = a.$refs.stage.offset()),
              (s = {
                top: l.top - i.top + parseFloat(c.css("border-top-width") || 0),
                left:
                  l.left - i.left + parseFloat(c.css("border-left-width") || 0),
                width: c.width(),
                height: c.height(),
                scaleX: 1,
                scaleY: 1,
              })),
            s
          );
        },
        complete: function () {
          var t = this,
            o = t.current,
            i = {};
          o.isMoved ||
            !o.isLoaded ||
            o.isComplete ||
            ((o.isComplete = !0),
            o.$slide.siblings().trigger("onReset"),
            f(o.$slide),
            o.$slide.addClass("fancybox-slide--complete"),
            n.each(t.slides, function (e, o) {
              o.pos >= t.currPos - 1 && o.pos <= t.currPos + 1
                ? (i[o.pos] = o)
                : o && (n.fancybox.stop(o.$slide), o.$slide.unbind().remove());
            }),
            (t.slides = i),
            t.updateCursor(),
            t.trigger("afterShow"),
            (n(e.activeElement).is("[disabled]") ||
              (o.opts.autoFocus && "image" != o.type && "iframe" !== o.type)) &&
              t.focus());
        },
        preload: function () {
          var t,
            e,
            n = this;
          n.group.length < 2 ||
            ((t = n.slides[n.currPos + 1]),
            (e = n.slides[n.currPos - 1]),
            t && "image" === t.type && n.loadSlide(t),
            e && "image" === e.type && n.loadSlide(e));
        },
        focus: function () {
          var t,
            e = this.current;
          this.isClosing ||
            ((t =
              e && e.isComplete
                ? e.$slide
                    .find("button,:input,[tabindex],a")
                    .filter(":not([disabled]):visible:first")
                : null),
            (t = t && t.length ? t : this.$refs.container),
            t.focus());
        },
        activate: function () {
          var t = this;
          n(".fancybox-container").each(function () {
            var e = n(this).data("FancyBox");
            e && e.uid !== t.uid && !e.isClosing && e.trigger("onDeactivate");
          }),
            t.current &&
              (t.$refs.container.index() > 0 &&
                t.$refs.container.prependTo(e.body),
              t.updateControls()),
            t.trigger("onActivate"),
            t.addEvents();
        },
        close: function (t, e) {
          var o,
            i,
            a,
            s,
            r,
            c,
            l = this,
            f = l.current,
            h = function () {
              l.cleanUp(t);
            };
          return (
            !l.isClosing &&
            ((l.isClosing = !0),
            l.trigger("beforeClose", t) === !1
              ? ((l.isClosing = !1),
                u(function () {
                  l.update();
                }),
                !1)
              : (l.removeEvents(),
                f.timouts && clearTimeout(f.timouts),
                (a = f.$content),
                (o = f.opts.animationEffect),
                (i = n.isNumeric(e) ? e : o ? f.opts.animationDuration : 0),
                f.$slide
                  .off(d)
                  .removeClass(
                    "fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated"
                  ),
                f.$slide.siblings().trigger("onReset").remove(),
                i &&
                  l.$refs.container
                    .removeClass("fancybox-is-open")
                    .addClass("fancybox-is-closing"),
                l.hideLoading(f),
                l.hideControls(),
                l.updateCursor(),
                "zoom" !== o ||
                  (t !== !0 &&
                    a &&
                    i &&
                    "image" === f.type &&
                    !f.hasError &&
                    (c = l.getThumbPos(f))) ||
                  (o = "fade"),
                "zoom" === o
                  ? (n.fancybox.stop(a),
                    (r = n.fancybox.getTranslate(a)),
                    (r.width = r.width * r.scaleX),
                    (r.height = r.height * r.scaleY),
                    (s = f.opts.zoomOpacity),
                    "auto" == s &&
                      (s =
                        Math.abs(f.width / f.height - c.width / c.height) > 0.1),
                    s && (c.opacity = 0),
                    (r.scaleX = r.width / c.width),
                    (r.scaleY = r.height / c.height),
                    (r.width = c.width),
                    (r.height = c.height),
                    n.fancybox.setTranslate(f.$content, r),
                    n.fancybox.animate(f.$content, c, i, h),
                    !0)
                  : (o && i
                      ? t === !0
                        ? setTimeout(h, i)
                        : n.fancybox.animate(
                            f.$slide.removeClass("fancybox-slide--current"),
                            "fancybox-animated fancybox-slide--previous fancybox-fx-" +
                              o,
                            i,
                            h
                          )
                      : h(),
                    !0)))
          );
        },
        cleanUp: function (t) {
          var e,
            o = this;
          o.current.$slide.trigger("onReset"),
            o.$refs.container.empty().remove(),
            o.trigger("afterClose", t),
            o.$lastFocus && !o.current.focusBack && o.$lastFocus.focus(),
            (o.current = null),
            (e = n.fancybox.getInstance()),
            e
              ? e.activate()
              : (s.scrollTop(o.scrollTop).scrollLeft(o.scrollLeft),
                n("html").removeClass("fancybox-enabled"),
                n("#fancybox-style-noscroll").remove());
        },
        trigger: function (t, e) {
          var o,
            i = Array.prototype.slice.call(arguments, 1),
            a = this,
            s = e && e.opts ? e : a.current;
          return (
            s ? i.unshift(s) : (s = a),
            i.unshift(a),
            n.isFunction(s.opts[t]) && (o = s.opts[t].apply(s, i)),
            o === !1
              ? o
              : void ("afterClose" === t
                  ? r.trigger(t + ".fb", i)
                  : a.$refs.container.trigger(t + ".fb", i))
          );
        },
        updateControls: function (t) {
          var e = this,
            o = e.current,
            i = o.index,
            a = o.opts,
            s = a.caption,
            r = e.$refs.caption;
          o.$slide.trigger("refresh"),
            (e.$caption = s && s.length ? r.html(s) : null),
            e.isHiddenControls || e.showControls(),
            n("[data-fancybox-count]").html(e.group.length),
            n("[data-fancybox-index]").html(i + 1),
            n("[data-fancybox-prev]").prop("disabled", !a.loop && i <= 0),
            n("[data-fancybox-next]").prop(
              "disabled",
              !a.loop && i >= e.group.length - 1
            );
        },
        hideControls: function () {
          (this.isHiddenControls = !0),
            this.$refs.container.removeClass(
              "fancybox-show-infobar fancybox-show-toolbar fancybox-show-caption fancybox-show-nav"
            );
        },
        showControls: function () {
          var t = this,
            e = t.current ? t.current.opts : t.opts,
            n = t.$refs.container;
          (t.isHiddenControls = !1),
            (t.idleSecondsCounter = 0),
            n
              .toggleClass("fancybox-show-toolbar", !(!e.toolbar || !e.buttons))
              .toggleClass(
                "fancybox-show-infobar",
                !!(e.infobar && t.group.length > 1)
              )
              .toggleClass(
                "fancybox-show-nav",
                !!(e.arrows && t.group.length > 1)
              )
              .toggleClass("fancybox-is-modal", !!e.modal),
            t.$caption
              ? n.addClass("fancybox-show-caption ")
              : n.removeClass("fancybox-show-caption");
        },
        toggleControls: function () {
          this.isHiddenControls ? this.showControls() : this.hideControls();
        },
      }),
        (n.fancybox = {
          version: "3.1.20",
          defaults: a,
          getInstance: function (t) {
            var e = n(
                '.fancybox-container:not(".fancybox-is-closing"):first'
              ).data("FancyBox"),
              o = Array.prototype.slice.call(arguments, 1);
            return (
              e instanceof h &&
              ("string" === n.type(t)
                ? e[t].apply(e, o)
                : "function" === n.type(t) && t.apply(e, o),
              e)
            );
          },
          open: function (t, e, n) {
            return new h(t, e, n);
          },
          close: function (t) {
            var e = this.getInstance();
            e && (e.close(), t === !0 && this.close());
          },
          destroy: function () {
            this.close(!0), r.off("click.fb-start");
          },
          isMobile:
            e.createTouch !== o &&
            /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(
              navigator.userAgent
            ),
          use3d: (function () {
            var n = e.createElement("div");
            return (
              t.getComputedStyle &&
              t.getComputedStyle(n).getPropertyValue("transform") &&
              !(e.documentMode && e.documentMode < 11)
            );
          })(),
          getTranslate: function (t) {
            var e;
            if (!t || !t.length) return !1;
            if (
              ((e = t.eq(0).css("transform")),
              e && e.indexOf("matrix") !== -1
                ? ((e = e.split("(")[1]),
                  (e = e.split(")")[0]),
                  (e = e.split(",")))
                : (e = []),
              e.length)
            )
              (e =
                e.length > 10
                  ? [e[13], e[12], e[0], e[5]]
                  : [e[5], e[4], e[0], e[3]]),
                (e = e.map(parseFloat));
            else {
              e = [0, 0, 1, 1];
              var n = /\.*translate\((.*)px,(.*)px\)/i,
                o = n.exec(t.eq(0).attr("style"));
              o && ((e[0] = parseFloat(o[2])), (e[1] = parseFloat(o[1])));
            }
            return {
              top: e[0],
              left: e[1],
              scaleX: e[2],
              scaleY: e[3],
              opacity: parseFloat(t.css("opacity")),
              width: t.width(),
              height: t.height(),
            };
          },
          setTranslate: function (t, e) {
            var n = "",
              i = {};
            if (t && e)
              return (
                (e.left === o && e.top === o) ||
                  ((n =
                    (e.left === o ? t.position().left : e.left) +
                    "px, " +
                    (e.top === o ? t.position().top : e.top) +
                    "px"),
                  (n = this.use3d
                    ? "translate3d(" + n + ", 0px)"
                    : "translate(" + n + ")")),
                e.scaleX !== o &&
                  e.scaleY !== o &&
                  (n =
                    (n.length ? n + " " : "") +
                    "scale(" +
                    e.scaleX +
                    ", " +
                    e.scaleY +
                    ")"),
                n.length && (i.transform = n),
                e.opacity !== o && (i.opacity = e.opacity),
                e.width !== o && (i.width = e.width),
                e.height !== o && (i.height = e.height),
                t.css(i)
              );
          },
          animate: function (t, e, i, a, s) {
            var r = d || "transitionend";
            n.isFunction(i) && ((a = i), (i = null)),
              n.isPlainObject(e) || t.removeAttr("style"),
              t.on(r, function (i) {
                (!i ||
                  !i.originalEvent ||
                  (t.is(i.originalEvent.target) &&
                    "z-index" != i.originalEvent.propertyName)) &&
                  (t.off(r),
                  n.isPlainObject(e)
                    ? e.scaleX !== o &&
                      e.scaleY !== o &&
                      (t.css("transition-duration", "0ms"),
                      (e.width = t.width() * e.scaleX),
                      (e.height = t.height() * e.scaleY),
                      (e.scaleX = 1),
                      (e.scaleY = 1),
                      n.fancybox.setTranslate(t, e))
                    : s !== !0 && t.removeClass(e),
                  n.isFunction(a) && a(i));
              }),
              n.isNumeric(i) && t.css("transition-duration", i + "ms"),
              n.isPlainObject(e) ? n.fancybox.setTranslate(t, e) : t.addClass(e),
              t.data(
                "timer",
                setTimeout(function () {
                  t.trigger("transitionend");
                }, i + 16)
              );
          },
          stop: function (t) {
            clearTimeout(t.data("timer")), t.off(d);
          },
        }),
        (n.fn.fancybox = function (t) {
          var e;
          return (
            (t = t || {}),
            (e = t.selector || !1),
            e
              ? n("body")
                  .off("click.fb-start", e)
                  .on("click.fb-start", e, { items: n(e), options: t }, i)
              : this.off("click.fb-start").on(
                  "click.fb-start",
                  { items: this, options: t },
                  i
                ),
            this
          );
        }),
        r.on("click.fb-start", "[data-fancybox]", i);
    }
  })(window, document, window.jQuery),
    (function (t) {
      "use strict";
      var e = function (e, n, o) {
          if (e)
            return (
              (o = o || ""),
              "object" === t.type(o) && (o = t.param(o, !0)),
              t.each(n, function (t, n) {
                e = e.replace("$" + t, n || "");
              }),
              o.length && (e += (e.indexOf("?") > 0 ? "&" : "?") + o),
              e
            );
        },
        n = {
          youtube: {
            matcher:
              /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
            params: {
              autoplay: 1,
              autohide: 1,
              fs: 1,
              rel: 0,
              hd: 1,
              wmode: "transparent",
              enablejsapi: 1,
              html5: 1,
            },
            paramPlace: 8,
            type: "iframe",
            url: "//www.youtube.com/embed/$4",
            thumb: "//img.youtube.com/vi/$4/hqdefault.jpg",
          },
          vimeo: {
            matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
            params: {
              autoplay: 1,
              hd: 1,
              show_title: 1,
              show_byline: 1,
              show_portrait: 0,
              fullscreen: 1,
              api: 1,
            },
            paramPlace: 3,
            type: "iframe",
            url: "//player.vimeo.com/video/$2",
          },
          metacafe: {
            matcher: /metacafe.com\/watch\/(\d+)\/(.*)?/,
            type: "iframe",
            url: "//www.metacafe.com/embed/$1/?ap=1",
          },
          dailymotion: {
            matcher: /dailymotion.com\/video\/(.*)\/?(.*)/,
            params: { additionalInfos: 0, autoStart: 1 },
            type: "iframe",
            url: "//www.dailymotion.com/embed/video/$1",
          },
          vine: {
            matcher: /vine.co\/v\/([a-zA-Z0-9\?\=\-]+)/,
            type: "iframe",
            url: "//vine.co/v/$1/embed/simple",
          },
          instagram: {
            matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
            type: "image",
            url: "//$1/p/$2/media/?size=l",
          },
          google_maps: {
            matcher:
              /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
            type: "iframe",
            url: function (t) {
              return (
                "//maps.google." +
                t[2] +
                "/?ll=" +
                (t[9]
                  ? t[9] +
                    "&z=" +
                    Math.floor(t[10]) +
                    (t[12] ? t[12].replace(/^\//, "&") : "")
                  : t[12]) +
                "&output=" +
                (t[12] && t[12].indexOf("layer=c") > 0 ? "svembed" : "embed")
              );
            },
          },
        };
      t(document).on("onInit.fb", function (o, i) {
        t.each(i.group, function (o, i) {
          var a,
            s,
            r,
            c,
            l,
            u,
            d,
            f = i.src || "",
            h = !1;
          i.type ||
            ((a = t.extend(!0, {}, n, i.opts.media)),
            t.each(a, function (n, o) {
              if (((r = f.match(o.matcher)), (u = {}), (d = n), r)) {
                if (((h = o.type), o.paramPlace && r[o.paramPlace])) {
                  (l = r[o.paramPlace]),
                    "?" == l[0] && (l = l.substring(1)),
                    (l = l.split("&"));
                  for (var a = 0; a < l.length; ++a) {
                    var p = l[a].split("=", 2);
                    2 == p.length &&
                      (u[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " ")));
                  }
                }
                return (
                  (c = t.extend(!0, {}, o.params, i.opts[n], u)),
                  (f =
                    "function" === t.type(o.url)
                      ? o.url.call(this, r, c, i)
                      : e(o.url, r, c)),
                  (s =
                    "function" === t.type(o.thumb)
                      ? o.thumb.call(this, r, c, i)
                      : e(o.thumb, r)),
                  "vimeo" === d && (f = f.replace("&%23", "#")),
                  !1
                );
              }
            }),
            h
              ? ((i.src = f),
                (i.type = h),
                i.opts.thumb ||
                  (i.opts.$thumb && i.opts.$thumb.length) ||
                  (i.opts.thumb = s),
                "iframe" === h &&
                  (t.extend(!0, i.opts, {
                    iframe: { preload: !1, attr: { scrolling: "no" } },
                  }),
                  (i.contentProvider = d),
                  (i.opts.slideClass +=
                    " fancybox-slide--" +
                    ("google_maps" == d ? "map" : "video"))))
              : (i.type = "image"));
        });
      });
    })(window.jQuery),
    (function (t, e, n) {
      "use strict";
      var o = (function () {
          return (
            t.requestAnimationFrame ||
            t.webkitRequestAnimationFrame ||
            t.mozRequestAnimationFrame ||
            t.oRequestAnimationFrame ||
            function (e) {
              return t.setTimeout(e, 1e3 / 60);
            }
          );
        })(),
        i = (function () {
          return (
            t.cancelAnimationFrame ||
            t.webkitCancelAnimationFrame ||
            t.mozCancelAnimationFrame ||
            t.oCancelAnimationFrame ||
            function (e) {
              t.clearTimeout(e);
            }
          );
        })(),
        a = function (e) {
          var n = [];
          (e = e.originalEvent || e || t.e),
            (e =
              e.touches && e.touches.length
                ? e.touches
                : e.changedTouches && e.changedTouches.length
                ? e.changedTouches
                : [e]);
          for (var o in e)
            e[o].pageX
              ? n.push({ x: e[o].pageX, y: e[o].pageY })
              : e[o].clientX && n.push({ x: e[o].clientX, y: e[o].clientY });
          return n;
        },
        s = function (t, e, n) {
          return e && t
            ? "x" === n
              ? t.x - e.x
              : "y" === n
              ? t.y - e.y
              : Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2))
            : 0;
        },
        r = function (t) {
          if (
            t.is("a,button,input,select,textarea") ||
            n.isFunction(t.get(0).onclick)
          )
            return !0;
          for (var e = 0, o = t[0].attributes, i = o.length; e < i; e++)
            if ("data-fancybox-" === o[e].nodeName.substr(0, 14)) return !0;
          return !1;
        },
        c = function (e) {
          var n = t.getComputedStyle(e)["overflow-y"],
            o = t.getComputedStyle(e)["overflow-x"],
            i =
              ("scroll" === n || "auto" === n) && e.scrollHeight > e.clientHeight,
            a = ("scroll" === o || "auto" === o) && e.scrollWidth > e.clientWidth;
          return i || a;
        },
        l = function (t) {
          for (var e = !1; ; ) {
            if ((e = c(t.get(0)))) break;
            if (
              ((t = t.parent()),
              !t.length || t.hasClass("fancybox-stage") || t.is("body"))
            )
              break;
          }
          return e;
        },
        u = function (t) {
          var e = this;
          (e.instance = t),
            (e.$bg = t.$refs.bg),
            (e.$stage = t.$refs.stage),
            (e.$container = t.$refs.container),
            e.destroy(),
            e.$container.on(
              "touchstart.fb.touch mousedown.fb.touch",
              n.proxy(e, "ontouchstart")
            );
        };
      (u.prototype.destroy = function () {
        this.$container.off(".fb.touch");
      }),
        (u.prototype.ontouchstart = function (o) {
          var i = this,
            c = n(o.target),
            u = i.instance,
            d = u.current,
            f = d.$content,
            h = "touchstart" == o.type;
          if (
            (h && i.$container.off("mousedown.fb.touch"),
            !d || i.instance.isAnimating || i.instance.isClosing)
          )
            return o.stopPropagation(), void o.preventDefault();
          if (
            (!o.originalEvent || 2 != o.originalEvent.button) &&
            c.length &&
            !r(c) &&
            !r(c.parent()) &&
            !(o.originalEvent.clientX > c[0].clientWidth + c.offset().left) &&
            ((i.startPoints = a(o)),
            i.startPoints && !(i.startPoints.length > 1 && u.isSliding))
          ) {
            if (
              ((i.$target = c),
              (i.$content = f),
              (i.canTap = !0),
              n(e).off(".fb.touch"),
              n(e).on(
                h
                  ? "touchend.fb.touch touchcancel.fb.touch"
                  : "mouseup.fb.touch mouseleave.fb.touch",
                n.proxy(i, "ontouchend")
              ),
              n(e).on(
                h ? "touchmove.fb.touch" : "mousemove.fb.touch",
                n.proxy(i, "ontouchmove")
              ),
              o.stopPropagation(),
              (!u.current.opts.touch && !u.canPan()) ||
                (!c.is(i.$stage) && !i.$stage.find(c).length))
            )
              return void (c.is("img") && o.preventDefault());
            (n.fancybox.isMobile && (l(i.$target) || l(i.$target.parent()))) ||
              o.preventDefault(),
              (i.canvasWidth = Math.round(d.$slide[0].clientWidth)),
              (i.canvasHeight = Math.round(d.$slide[0].clientHeight)),
              (i.startTime = new Date().getTime()),
              (i.distanceX = i.distanceY = i.distance = 0),
              (i.isPanning = !1),
              (i.isSwiping = !1),
              (i.isZooming = !1),
              (i.sliderStartPos = i.sliderLastPos || { top: 0, left: 0 }),
              (i.contentStartPos = n.fancybox.getTranslate(i.$content)),
              (i.contentLastPos = null),
              1 !== i.startPoints.length ||
                i.isZooming ||
                ((i.canTap = !u.isSliding),
                "image" === d.type &&
                (i.contentStartPos.width > i.canvasWidth + 1 ||
                  i.contentStartPos.height > i.canvasHeight + 1)
                  ? (n.fancybox.stop(i.$content),
                    i.$content.css("transition-duration", "0ms"),
                    (i.isPanning = !0))
                  : (i.isSwiping = !0),
                i.$container.addClass("fancybox-controls--isGrabbing")),
              2 !== i.startPoints.length ||
                u.isAnimating ||
                d.hasError ||
                "image" !== d.type ||
                (!d.isLoaded && !d.$ghost) ||
                ((i.isZooming = !0),
                (i.isSwiping = !1),
                (i.isPanning = !1),
                n.fancybox.stop(i.$content),
                i.$content.css("transition-duration", "0ms"),
                (i.centerPointStartX =
                  0.5 * (i.startPoints[0].x + i.startPoints[1].x) -
                  n(t).scrollLeft()),
                (i.centerPointStartY =
                  0.5 * (i.startPoints[0].y + i.startPoints[1].y) -
                  n(t).scrollTop()),
                (i.percentageOfImageAtPinchPointX =
                  (i.centerPointStartX - i.contentStartPos.left) /
                  i.contentStartPos.width),
                (i.percentageOfImageAtPinchPointY =
                  (i.centerPointStartY - i.contentStartPos.top) /
                  i.contentStartPos.height),
                (i.startDistanceBetweenFingers = s(
                  i.startPoints[0],
                  i.startPoints[1]
                )));
          }
        }),
        (u.prototype.ontouchmove = function (t) {
          var e = this;
          if (
            ((e.newPoints = a(t)),
            n.fancybox.isMobile && (l(e.$target) || l(e.$target.parent())))
          )
            return t.stopPropagation(), void (e.canTap = !1);
          if (
            (e.instance.current.opts.touch || e.instance.canPan()) &&
            e.newPoints &&
            e.newPoints.length &&
            ((e.distanceX = s(e.newPoints[0], e.startPoints[0], "x")),
            (e.distanceY = s(e.newPoints[0], e.startPoints[0], "y")),
            (e.distance = s(e.newPoints[0], e.startPoints[0])),
            e.distance > 0)
          ) {
            if (!e.$target.is(e.$stage) && !e.$stage.find(e.$target).length)
              return;
            t.stopPropagation(),
              t.preventDefault(),
              e.isSwiping
                ? e.onSwipe()
                : e.isPanning
                ? e.onPan()
                : e.isZooming && e.onZoom();
          }
        }),
        (u.prototype.onSwipe = function () {
          var e,
            a = this,
            s = a.isSwiping,
            r = a.sliderStartPos.left || 0;
          s === !0
            ? Math.abs(a.distance) > 10 &&
              ((a.canTap = !1),
              a.instance.group.length < 2 && a.instance.opts.touch.vertical
                ? (a.isSwiping = "y")
                : a.instance.isSliding ||
                  a.instance.opts.touch.vertical === !1 ||
                  ("auto" === a.instance.opts.touch.vertical &&
                    n(t).width() > 800)
                ? (a.isSwiping = "x")
                : ((e = Math.abs(
                    (180 * Math.atan2(a.distanceY, a.distanceX)) / Math.PI
                  )),
                  (a.isSwiping = e > 45 && e < 135 ? "y" : "x")),
              (a.instance.isSliding = a.isSwiping),
              (a.startPoints = a.newPoints),
              n.each(a.instance.slides, function (t, e) {
                n.fancybox.stop(e.$slide),
                  e.$slide.css("transition-duration", "0ms"),
                  (e.inTransition = !1),
                  e.pos === a.instance.current.pos &&
                    (a.sliderStartPos.left = n.fancybox.getTranslate(
                      e.$slide
                    ).left);
              }),
              a.instance.SlideShow &&
                a.instance.SlideShow.isActive &&
                a.instance.SlideShow.stop())
            : ("x" == s &&
                (a.distanceX > 0 &&
                (a.instance.group.length < 2 ||
                  (0 === a.instance.current.index &&
                    !a.instance.current.opts.loop))
                  ? (r += Math.pow(a.distanceX, 0.8))
                  : a.distanceX < 0 &&
                    (a.instance.group.length < 2 ||
                      (a.instance.current.index === a.instance.group.length - 1 &&
                        !a.instance.current.opts.loop))
                  ? (r -= Math.pow(-a.distanceX, 0.8))
                  : (r += a.distanceX)),
              (a.sliderLastPos = {
                top: "x" == s ? 0 : a.sliderStartPos.top + a.distanceY,
                left: r,
              }),
              a.requestId && (i(a.requestId), (a.requestId = null)),
              (a.requestId = o(function () {
                a.sliderLastPos &&
                  (n.each(a.instance.slides, function (t, e) {
                    var o = e.pos - a.instance.currPos;
                    n.fancybox.setTranslate(e.$slide, {
                      top: a.sliderLastPos.top,
                      left:
                        a.sliderLastPos.left +
                        o * a.canvasWidth +
                        o * e.opts.gutter,
                    });
                  }),
                  a.$container.addClass("fancybox-is-sliding"));
              })));
        }),
        (u.prototype.onPan = function () {
          var t,
            e,
            a,
            s = this;
          (s.canTap = !1),
            (t =
              s.contentStartPos.width > s.canvasWidth
                ? s.contentStartPos.left + s.distanceX
                : s.contentStartPos.left),
            (e = s.contentStartPos.top + s.distanceY),
            (a = s.limitMovement(
              t,
              e,
              s.contentStartPos.width,
              s.contentStartPos.height
            )),
            (a.scaleX = s.contentStartPos.scaleX),
            (a.scaleY = s.contentStartPos.scaleY),
            (s.contentLastPos = a),
            s.requestId && (i(s.requestId), (s.requestId = null)),
            (s.requestId = o(function () {
              n.fancybox.setTranslate(s.$content, s.contentLastPos);
            }));
        }),
        (u.prototype.limitMovement = function (t, e, n, o) {
          var i,
            a,
            s,
            r,
            c = this,
            l = c.canvasWidth,
            u = c.canvasHeight,
            d = c.contentStartPos.left,
            f = c.contentStartPos.top,
            h = c.distanceX,
            p = c.distanceY;
          return (
            (i = Math.max(0, 0.5 * l - 0.5 * n)),
            (a = Math.max(0, 0.5 * u - 0.5 * o)),
            (s = Math.min(l - n, 0.5 * l - 0.5 * n)),
            (r = Math.min(u - o, 0.5 * u - 0.5 * o)),
            n > l &&
              (h > 0 && t > i && (t = i - 1 + Math.pow(-i + d + h, 0.8) || 0),
              h < 0 && t < s && (t = s + 1 - Math.pow(s - d - h, 0.8) || 0)),
            o > u &&
              (p > 0 && e > a && (e = a - 1 + Math.pow(-a + f + p, 0.8) || 0),
              p < 0 && e < r && (e = r + 1 - Math.pow(r - f - p, 0.8) || 0)),
            { top: e, left: t }
          );
        }),
        (u.prototype.limitPosition = function (t, e, n, o) {
          var i = this,
            a = i.canvasWidth,
            s = i.canvasHeight;
          return (
            n > a
              ? ((t = t > 0 ? 0 : t), (t = t < a - n ? a - n : t))
              : (t = Math.max(0, a / 2 - n / 2)),
            o > s
              ? ((e = e > 0 ? 0 : e), (e = e < s - o ? s - o : e))
              : (e = Math.max(0, s / 2 - o / 2)),
            { top: e, left: t }
          );
        }),
        (u.prototype.onZoom = function () {
          var e = this,
            a = e.contentStartPos.width,
            r = e.contentStartPos.height,
            c = e.contentStartPos.left,
            l = e.contentStartPos.top,
            u = s(e.newPoints[0], e.newPoints[1]),
            d = u / e.startDistanceBetweenFingers,
            f = Math.floor(a * d),
            h = Math.floor(r * d),
            p = (a - f) * e.percentageOfImageAtPinchPointX,
            g = (r - h) * e.percentageOfImageAtPinchPointY,
            b = (e.newPoints[0].x + e.newPoints[1].x) / 2 - n(t).scrollLeft(),
            m = (e.newPoints[0].y + e.newPoints[1].y) / 2 - n(t).scrollTop(),
            y = b - e.centerPointStartX,
            v = m - e.centerPointStartY,
            x = c + (p + y),
            w = l + (g + v),
            $ = {
              top: w,
              left: x,
              scaleX: e.contentStartPos.scaleX * d,
              scaleY: e.contentStartPos.scaleY * d,
            };
          (e.canTap = !1),
            (e.newWidth = f),
            (e.newHeight = h),
            (e.contentLastPos = $),
            e.requestId && (i(e.requestId), (e.requestId = null)),
            (e.requestId = o(function () {
              n.fancybox.setTranslate(e.$content, e.contentLastPos);
            }));
        }),
        (u.prototype.ontouchend = function (t) {
          var o = this,
            s = Math.max(new Date().getTime() - o.startTime, 1),
            r = o.isSwiping,
            c = o.isPanning,
            l = o.isZooming;
          return (
            (o.endPoints = a(t)),
            o.$container.removeClass("fancybox-controls--isGrabbing"),
            n(e).off(".fb.touch"),
            o.requestId && (i(o.requestId), (o.requestId = null)),
            (o.isSwiping = !1),
            (o.isPanning = !1),
            (o.isZooming = !1),
            o.canTap
              ? o.onTap(t)
              : ((o.speed = 366),
                (o.velocityX = (o.distanceX / s) * 0.5),
                (o.velocityY = (o.distanceY / s) * 0.5),
                (o.speedX = Math.max(
                  0.5 * o.speed,
                  Math.min(1.5 * o.speed, (1 / Math.abs(o.velocityX)) * o.speed)
                )),
                void (c ? o.endPanning() : l ? o.endZooming() : o.endSwiping(r)))
          );
        }),
        (u.prototype.endSwiping = function (t) {
          var e = this,
            o = !1;
          (e.instance.isSliding = !1),
            (e.sliderLastPos = null),
            "y" == t && Math.abs(e.distanceY) > 50
              ? (n.fancybox.animate(
                  e.instance.current.$slide,
                  {
                    top: e.sliderStartPos.top + e.distanceY + 150 * e.velocityY,
                    opacity: 0,
                  },
                  150
                ),
                (o = e.instance.close(!0, 300)))
              : "x" == t && e.distanceX > 50 && e.instance.group.length > 1
              ? (o = e.instance.previous(e.speedX))
              : "x" == t &&
                e.distanceX < -50 &&
                e.instance.group.length > 1 &&
                (o = e.instance.next(e.speedX)),
            o !== !1 ||
              ("x" != t && "y" != t) ||
              e.instance.jumpTo(e.instance.current.index, 150),
            e.$container.removeClass("fancybox-is-sliding");
        }),
        (u.prototype.endPanning = function () {
          var t,
            e,
            o,
            i = this;
          i.contentLastPos &&
            (i.instance.current.opts.touch.momentum === !1
              ? ((t = i.contentLastPos.left), (e = i.contentLastPos.top))
              : ((t = i.contentLastPos.left + i.velocityX * i.speed),
                (e = i.contentLastPos.top + i.velocityY * i.speed)),
            (o = i.limitPosition(
              t,
              e,
              i.contentStartPos.width,
              i.contentStartPos.height
            )),
            (o.width = i.contentStartPos.width),
            (o.height = i.contentStartPos.height),
            n.fancybox.animate(i.$content, o, 330));
        }),
        (u.prototype.endZooming = function () {
          var t,
            e,
            o,
            i,
            a = this,
            s = a.instance.current,
            r = a.newWidth,
            c = a.newHeight;
          a.contentLastPos &&
            ((t = a.contentLastPos.left),
            (e = a.contentLastPos.top),
            (i = { top: e, left: t, width: r, height: c, scaleX: 1, scaleY: 1 }),
            n.fancybox.setTranslate(a.$content, i),
            r < a.canvasWidth && c < a.canvasHeight
              ? a.instance.scaleToFit(150)
              : r > s.width || c > s.height
              ? a.instance.scaleToActual(
                  a.centerPointStartX,
                  a.centerPointStartY,
                  150
                )
              : ((o = a.limitPosition(t, e, r, c)),
                n.fancybox.setTranslate(
                  a.content,
                  n.fancybox.getTranslate(a.$content)
                ),
                n.fancybox.animate(a.$content, o, 150)));
        }),
        (u.prototype.onTap = function (t) {
          var e,
            o = this,
            i = n(t.target),
            s = o.instance,
            r = s.current,
            c = (t && a(t)) || o.startPoints,
            l = c[0] ? c[0].x - o.$stage.offset().left : 0,
            u = c[0] ? c[0].y - o.$stage.offset().top : 0,
            d = function (e) {
              var i = r.opts[e];
              if ((n.isFunction(i) && (i = i.apply(s, [r, t])), i))
                switch (i) {
                  case "close":
                    s.close(o.startEvent);
                    break;
                  case "toggleControls":
                    s.toggleControls(!0);
                    break;
                  case "next":
                    s.next();
                    break;
                  case "nextOrClose":
                    s.group.length > 1 ? s.next() : s.close(o.startEvent);
                    break;
                  case "zoom":
                    "image" == r.type &&
                      (r.isLoaded || r.$ghost) &&
                      (s.canPan()
                        ? s.scaleToFit()
                        : s.isScaledDown()
                        ? s.scaleToActual(l, u)
                        : s.group.length < 2 && s.close(o.startEvent));
                }
            };
          if (
            !(
              (t.originalEvent && 2 == t.originalEvent.button) ||
              s.isSliding ||
              l > i[0].clientWidth + i.offset().left
            )
          ) {
            if (
              i.is(
                ".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container"
              )
            )
              e = "Outside";
            else if (i.is(".fancybox-slide")) e = "Slide";
            else {
              if (!s.current.$content || !s.current.$content.has(t.target).length)
                return;
              e = "Content";
            }
            if (o.tapped) {
              if (
                (clearTimeout(o.tapped),
                (o.tapped = null),
                Math.abs(l - o.tapX) > 50 ||
                  Math.abs(u - o.tapY) > 50 ||
                  s.isSliding)
              )
                return this;
              d("dblclick" + e);
            } else
              (o.tapX = l),
                (o.tapY = u),
                r.opts["dblclick" + e] &&
                r.opts["dblclick" + e] !== r.opts["click" + e]
                  ? (o.tapped = setTimeout(function () {
                      (o.tapped = null), d("click" + e);
                    }, 300))
                  : d("click" + e);
            return this;
          }
        }),
        n(e).on("onActivate.fb", function (t, e) {
          e && !e.Guestures && (e.Guestures = new u(e));
        }),
        n(e).on("beforeClose.fb", function (t, e) {
          e && e.Guestures && e.Guestures.destroy();
        });
    })(window, document, window.jQuery),
    (function (t, e) {
      "use strict";
      var n = function (t) {
        (this.instance = t), this.init();
      };
      e.extend(n.prototype, {
        timer: null,
        isActive: !1,
        $button: null,
        speed: 3e3,
        init: function () {
          var t = this;
          (t.$button = t.instance.$refs.toolbar
            .find("[data-fancybox-play]")
            .on("click", function () {
              t.toggle();
            })),
            (t.instance.group.length < 2 ||
              !t.instance.group[t.instance.currIndex].opts.slideShow) &&
              t.$button.hide();
        },
        set: function () {
          var t = this;
          t.instance &&
          t.instance.current &&
          (t.instance.current.opts.loop ||
            t.instance.currIndex < t.instance.group.length - 1)
            ? (t.timer = setTimeout(function () {
                t.instance.next();
              }, t.instance.current.opts.slideShow.speed || t.speed))
            : (t.stop(),
              (t.instance.idleSecondsCounter = 0),
              t.instance.showControls());
        },
        clear: function () {
          var t = this;
          clearTimeout(t.timer), (t.timer = null);
        },
        start: function () {
          var t = this,
            e = t.instance.current;
          t.instance &&
            e &&
            (e.opts.loop || e.index < t.instance.group.length - 1) &&
            ((t.isActive = !0),
            t.$button
              .attr("title", e.opts.i18n[e.opts.lang].PLAY_STOP)
              .addClass("fancybox-button--pause"),
            e.isComplete && t.set());
        },
        stop: function () {
          var t = this,
            e = t.instance.current;
          t.clear(),
            t.$button
              .attr("title", e.opts.i18n[e.opts.lang].PLAY_START)
              .removeClass("fancybox-button--pause"),
            (t.isActive = !1);
        },
        toggle: function () {
          var t = this;
          t.isActive ? t.stop() : t.start();
        },
      }),
        e(t).on({
          "onInit.fb": function (t, e) {
            e && !e.SlideShow && (e.SlideShow = new n(e));
          },
          "beforeShow.fb": function (t, e, n, o) {
            var i = e && e.SlideShow;
            o
              ? i && n.opts.slideShow.autoStart && i.start()
              : i && i.isActive && i.clear();
          },
          "afterShow.fb": function (t, e, n) {
            var o = e && e.SlideShow;
            o && o.isActive && o.set();
          },
          "afterKeydown.fb": function (n, o, i, a, s) {
            var r = o && o.SlideShow;
            !r ||
              !i.opts.slideShow ||
              (80 !== s && 32 !== s) ||
              e(t.activeElement).is("button,a,input") ||
              (a.preventDefault(), r.toggle());
          },
          "beforeClose.fb onDeactivate.fb": function (t, e) {
            var n = e && e.SlideShow;
            n && n.stop();
          },
        }),
        e(t).on("visibilitychange", function () {
          var n = e.fancybox.getInstance(),
            o = n && n.SlideShow;
          o && o.isActive && (t.hidden ? o.clear() : o.set());
        });
    })(document, window.jQuery),
    (function (t, e) {
      "use strict";
      var n = (function () {
        var e,
          n,
          o,
          i = [
            [
              "requestFullscreen",
              "exitFullscreen",
              "fullscreenElement",
              "fullscreenEnabled",
              "fullscreenchange",
              "fullscreenerror",
            ],
            [
              "webkitRequestFullscreen",
              "webkitExitFullscreen",
              "webkitFullscreenElement",
              "webkitFullscreenEnabled",
              "webkitfullscreenchange",
              "webkitfullscreenerror",
            ],
            [
              "webkitRequestFullScreen",
              "webkitCancelFullScreen",
              "webkitCurrentFullScreenElement",
              "webkitCancelFullScreen",
              "webkitfullscreenchange",
              "webkitfullscreenerror",
            ],
            [
              "mozRequestFullScreen",
              "mozCancelFullScreen",
              "mozFullScreenElement",
              "mozFullScreenEnabled",
              "mozfullscreenchange",
              "mozfullscreenerror",
            ],
            [
              "msRequestFullscreen",
              "msExitFullscreen",
              "msFullscreenElement",
              "msFullscreenEnabled",
              "MSFullscreenChange",
              "MSFullscreenError",
            ],
          ],
          a = {};
        for (n = 0; n < i.length; n++)
          if (((e = i[n]), e && e[1] in t)) {
            for (o = 0; o < e.length; o++) a[i[0][o]] = e[o];
            return a;
          }
        return !1;
      })();
      if (!n) return void (e.fancybox.defaults.btnTpl.fullScreen = !1);
      var o = {
        request: function (e) {
          (e = e || t.documentElement),
            e[n.requestFullscreen](e.ALLOW_KEYBOARD_INPUT);
        },
        exit: function () {
          t[n.exitFullscreen]();
        },
        toggle: function (e) {
          (e = e || t.documentElement),
            this.isFullscreen() ? this.exit() : this.request(e);
        },
        isFullscreen: function () {
          return Boolean(t[n.fullscreenElement]);
        },
        enabled: function () {
          return Boolean(t[n.fullscreenEnabled]);
        },
      };
      e(t).on({
        "onInit.fb": function (t, e) {
          var n,
            i = e.$refs.toolbar.find("[data-fancybox-fullscreen]");
          e && !e.FullScreen && e.group[e.currIndex].opts.fullScreen
            ? ((n = e.$refs.container),
              n.on(
                "click.fb-fullscreen",
                "[data-fancybox-fullscreen]",
                function (t) {
                  t.stopPropagation(), t.preventDefault(), o.toggle(n[0]);
                }
              ),
              e.opts.fullScreen &&
                e.opts.fullScreen.autoStart === !0 &&
                o.request(n[0]),
              (e.FullScreen = o))
            : i.hide();
        },
        "afterKeydown.fb": function (t, e, n, o, i) {
          e &&
            e.FullScreen &&
            70 === i &&
            (o.preventDefault(), e.FullScreen.toggle(e.$refs.container[0]));
        },
        "beforeClose.fb": function (t) {
          t && t.FullScreen && o.exit();
        },
      }),
        e(t).on(n.fullscreenchange, function () {
          var t = e.fancybox.getInstance();
          t.current &&
            "image" === t.current.type &&
            t.isAnimating &&
            (t.current.$content.css("transition", "none"),
            (t.isAnimating = !1),
            t.update(!0, !0, 0));
        });
    })(document, window.jQuery),
    (function (t, e) {
      "use strict";
      var n = function (t) {
        (this.instance = t), this.init();
      };
      e.extend(n.prototype, {
        $button: null,
        $grid: null,
        $list: null,
        isVisible: !1,
        init: function () {
          var t = this,
            e = t.instance.group[0],
            n = t.instance.group[1];
          (t.$button = t.instance.$refs.toolbar.find("[data-fancybox-thumbs]")),
            t.instance.group.length > 1 &&
            t.instance.group[t.instance.currIndex].opts.thumbs &&
            ("image" == e.type || e.opts.thumb || e.opts.$thumb) &&
            ("image" == n.type || n.opts.thumb || n.opts.$thumb)
              ? (t.$button.on("click", function () {
                  t.toggle();
                }),
                (t.isActive = !0))
              : (t.$button.hide(), (t.isActive = !1));
        },
        create: function () {
          var t,
            n,
            o = this.instance;
          (this.$grid = e('<div class="fancybox-thumbs"></div>').appendTo(
            o.$refs.container
          )),
            (t = "<ul>"),
            e.each(o.group, function (e, o) {
              (n =
                o.opts.thumb ||
                (o.opts.$thumb ? o.opts.$thumb.attr("src") : null)),
                n || "image" !== o.type || (n = o.src),
                n &&
                  n.length &&
                  (t +=
                    '<li data-index="' +
                    e +
                    '"  tabindex="0" class="fancybox-thumbs-loading"><img data-src="' +
                    n +
                    '" /></li>');
            }),
            (t += "</ul>"),
            (this.$list = e(t)
              .appendTo(this.$grid)
              .on("click", "li", function () {
                o.jumpTo(e(this).data("index"));
              })),
            this.$list
              .find("img")
              .hide()
              .one("load", function () {
                var t,
                  n,
                  o,
                  i,
                  a = e(this).parent().removeClass("fancybox-thumbs-loading"),
                  s = a.outerWidth(),
                  r = a.outerHeight();
                (t = this.naturalWidth || this.width),
                  (n = this.naturalHeight || this.height),
                  (o = t / s),
                  (i = n / r),
                  o >= 1 &&
                    i >= 1 &&
                    (o > i ? ((t /= i), (n = r)) : ((t = s), (n /= o))),
                  e(this)
                    .css({
                      width: Math.floor(t),
                      height: Math.floor(n),
                      "margin-top": Math.min(0, Math.floor(0.3 * r - 0.3 * n)),
                      "margin-left": Math.min(0, Math.floor(0.5 * s - 0.5 * t)),
                    })
                    .show();
              })
              .each(function () {
                this.src = e(this).data("src");
              });
        },
        focus: function () {
          this.instance.current &&
            this.$list
              .children()
              .removeClass("fancybox-thumbs-active")
              .filter('[data-index="' + this.instance.current.index + '"]')
              .addClass("fancybox-thumbs-active")
              .focus();
        },
        close: function () {
          this.$grid.hide();
        },
        update: function () {
          this.instance.$refs.container.toggleClass(
            "fancybox-show-thumbs",
            this.isVisible
          ),
            this.isVisible
              ? (this.$grid || this.create(),
                this.instance.trigger("onThumbsShow"),
                this.focus())
              : this.$grid && this.instance.trigger("onThumbsHide"),
            this.instance.update();
        },
        hide: function () {
          (this.isVisible = !1), this.update();
        },
        show: function () {
          (this.isVisible = !0), this.update();
        },
        toggle: function () {
          (this.isVisible = !this.isVisible), this.update();
        },
      }),
        e(t).on({
          "onInit.fb": function (t, e) {
            e && !e.Thumbs && (e.Thumbs = new n(e));
          },
          "beforeShow.fb": function (t, e, n, o) {
            var i = e && e.Thumbs;
            if (i && i.isActive) {
              if (n.modal) return i.$button.hide(), void i.hide();
              o && e.opts.thumbs.autoStart === !0 && i.show(),
                i.isVisible && i.focus();
            }
          },
          "afterKeydown.fb": function (t, e, n, o, i) {
            var a = e && e.Thumbs;
            a && a.isActive && 71 === i && (o.preventDefault(), a.toggle());
          },
          "beforeClose.fb": function (t, e) {
            var n = e && e.Thumbs;
            n && n.isVisible && e.opts.thumbs.hideOnClose !== !1 && n.close();
          },
        });
    })(document, window.jQuery),
    (function (t, e, n) {
      "use strict";
      function o() {
        var t = e.location.hash.substr(1),
          n = t.split("-"),
          o =
            n.length > 1 && /^\+?\d+$/.test(n[n.length - 1])
              ? parseInt(n.pop(-1), 10) || 1
              : 1,
          i = n.join("-");
        return o < 1 && (o = 1), { hash: t, index: o, gallery: i };
      }
      function i(t) {
        var e;
        "" !== t.gallery &&
          ((e = n("[data-fancybox='" + n.escapeSelector(t.gallery) + "']").eq(
            t.index - 1
          )),
          e.length
            ? e.trigger("click")
            : n("#" + n.escapeSelector(t.gallery)).trigger("click"));
      }
      function a(t) {
        var e;
        return (
          !!t &&
          ((e = t.current ? t.current.opts : t.opts),
          e.$orig ? e.$orig.data("fancybox") : e.hash || "")
        );
      }
      n.escapeSelector ||
        (n.escapeSelector = function (t) {
          var e = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,
            n = function (t, e) {
              return e
                ? "\0" === t
                  ? "�"
                  : t.slice(0, -1) +
                    "\\" +
                    t.charCodeAt(t.length - 1).toString(16) +
                    " "
                : "\\" + t;
            };
          return (t + "").replace(e, n);
        });
      var s = null,
        r = null;
      n(function () {
        setTimeout(function () {
          n.fancybox.defaults.hash !== !1 &&
            (n(t).on({
              "onInit.fb": function (t, e) {
                var n, i;
                e.group[e.currIndex].opts.hash !== !1 &&
                  ((n = o()),
                  (i = a(e)),
                  i &&
                    n.gallery &&
                    i == n.gallery &&
                    (e.currIndex = n.index - 1));
              },
              "beforeShow.fb": function (n, o, i, c) {
                var l;
                i.opts.hash !== !1 &&
                  ((l = a(o)),
                  l &&
                    "" !== l &&
                    (e.location.hash.indexOf(l) < 0 &&
                      (o.opts.origHash = e.location.hash),
                    (s = l + (o.group.length > 1 ? "-" + (i.index + 1) : "")),
                    "replaceState" in e.history
                      ? (r && clearTimeout(r),
                        (r = setTimeout(function () {
                          e.history[c ? "pushState" : "replaceState"](
                            {},
                            t.title,
                            e.location.pathname + e.location.search + "#" + s
                          ),
                            (r = null);
                        }, 300)))
                      : (e.location.hash = s)));
              },
              "beforeClose.fb": function (o, i, c) {
                var l, u;
                r && clearTimeout(r),
                  c.opts.hash !== !1 &&
                    ((l = a(i)),
                    (u = i && i.opts.origHash ? i.opts.origHash : ""),
                    l &&
                      "" !== l &&
                      ("replaceState" in history
                        ? e.history.replaceState(
                            {},
                            t.title,
                            e.location.pathname + e.location.search + u
                          )
                        : ((e.location.hash = u),
                          n(e).scrollTop(i.scrollTop).scrollLeft(i.scrollLeft))),
                    (s = null));
              },
            }),
            n(e).on("hashchange.fb", function () {
              var t = o();
              n.fancybox.getInstance()
                ? !s ||
                  s === t.gallery + "-" + t.index ||
                  (1 === t.index && s == t.gallery) ||
                  ((s = null), n.fancybox.close())
                : "" !== t.gallery && i(t);
            }),
            n(e).one("unload.fb popstate.fb", function () {
              n.fancybox.getInstance("close", !0, 0);
            }),
            i(o()));
        }, 50);
      });
    })(document, window, window.jQuery);