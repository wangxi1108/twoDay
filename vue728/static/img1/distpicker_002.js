/*!
 * Distpicker v1.0.4
 * https://github.com/fengyuanchen/distpicker
 *
 * Copyright (c) 2014-2016 Fengyuan Chen
 * Released under the MIT license
 *
 * Date: 2016-06-01T15:05:52.606Z
 */
!function (t) {
    "function" == typeof define && define.amd ? define(["jquery", "ChineseDistricts"], t) : "object" == typeof exports ? t(require("jquery"), require("ChineseDistricts")) : t(jQuery, ChineseDistricts)
}(function (t, i) {
    "use strict";
    function e(i, s) {
        this.$element = t(i), this.options = t.extend({}, e.DEFAULTS, t.isPlainObject(s) && s), this.placeholders = t.extend({}, e.DEFAULTS), this.active = !1, this.init()
    }

    if ("undefined" == typeof i)throw new Error('The file "distpicker.data.js" must be included first!');
    var s = "distpicker", n = "change." + s, c = "province", o = "city", r = "district";
    e.prototype = {
        constructor: e, init: function () {
            var i = this.options, e = this.$element.find("select"), s = e.length, n = {};
            e.each(function () {
                t.extend(n, t(this).data())
            }), t.each([c, o, r], t.proxy(function (t, c) {
                n[c] ? (i[c] = n[c], this["$" + c] = e.filter("[data-" + c + "]")) : this["$" + c] = s > t ? e.eq(t) : null
            }, this)), this.bind(), this.reset(), this.active = !0
        }, bind: function () {
            this.$province && this.$province.on(n, this._changeProvince = t.proxy(function () {
                this.output(o), this.output(r)
            }, this)), this.$city && this.$city.on(n, this._changeCity = t.proxy(function () {
                this.output(r)
            }, this))
        }, unbind: function () {
            this.$province && this.$province.off(n, this._changeProvince), this.$city && this.$city.off(n, this._changeCity)
        }, output: function (e) {
            var s, n, h, d = this.options, u = this.placeholders, a = this["$" + e], f = {}, p = [];
            a && a.length && (h = d[e], s = e === c ? 86 : e === o ? this.$province && this.$province.find(":selected").data("code") : e === r ? this.$city && this.$city.find(":selected").data("code") : s, f = t.isNumeric(s) ? i[s] : null, t.isPlainObject(f) && t.each(f, function (t, i) {
                var e = i === h;
                e && (n = !0), p.push({code: t, address: i, selected: e})
            }), n || (p.length && (d.autoSelect || d.autoselect) && (p[0].selected = !0), !this.active && h && (u[e] = h)), d.placeholder && p.unshift({
                code: "",
                address: u[e],
                selected: !1
            }), a.html(this.getList(p)))
        }, getList: function (i) {
            var e = [];
            return t.each(i, function (t, i) {
                e.push('<option value="' + (i.address && i.code ? i.address : "") + '" data-code="' + (i.code || "") + '"' + (i.selected ? " selected" : "") + ">" + (i.address || "") + "</option>")
            }), e.join("")
        }, reset: function (t) {
            t ? this.$province && this.$province.find(":first").prop("selected", !0).trigger(n) : (this.output(c), this.output(o), this.output(r))
        }, destroy: function () {
            this.unbind(), this.$element.removeData(s)
        }
    }, e.DEFAULTS = {
        autoSelect: !0,
        placeholder: !0,
        province: "—— 省 ——",
        city: "—— 市 ——",
        district: "—— 区 ——"
    }, e.setDefaults = function (i) {
        t.extend(e.DEFAULTS, i)
    }, e.other = t.fn.distpicker, t.fn.distpicker = function (i) {
        var n = [].slice.call(arguments, 1);
        return this.each(function () {
            var c, o, r = t(this), h = r.data(s);
            if (!h) {
                if (/destroy/.test(i))return;
                c = t.extend({}, r.data(), t.isPlainObject(i) && i), r.data(s, h = new e(this, c))
            }
            "string" == typeof i && t.isFunction(o = h[i]) && o.apply(h, n)
        })
    }, t.fn.distpicker.Constructor = e, t.fn.distpicker.setDefaults = e.setDefaults, t.fn.distpicker.noConflict = function () {
        return t.fn.distpicker = e.other, this
    }, t(function () {
        t('[data-toggle="distpicker"]').distpicker()
    })
});