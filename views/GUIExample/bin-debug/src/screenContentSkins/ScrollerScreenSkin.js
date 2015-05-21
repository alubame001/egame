var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var screenContentSkins;
(function (screenContentSkins) {
    var ScrollerScreenSkin = (function (_super) {
        __extends(ScrollerScreenSkin, _super);
        function ScrollerScreenSkin() {
            _super.call(this);
            this.__s = egret.gui.setProperties;
            this.elementsContent = [this.__1_i(), this.__4_i()];
        }
        ScrollerScreenSkin.prototype.__1_i = function () {
            var t = new egret.gui.Rect();
            this.__s(t, ["bottom", "fillAlpha", "left", "right", "strokeAlpha", "strokeColor", "top"], [99, 0, 99, 99, 1, 0x009aff, 99]);
            return t;
        };
        ScrollerScreenSkin.prototype.__2_i = function () {
            var t = new egret.gui.UIAsset();
            t.source = "app_egret_labs_jpg";
            return t;
        };
        ScrollerScreenSkin.prototype.__3_i = function () {
            var t = new egret.gui.Group();
            t.elementsContent = [this.__2_i()];
            return t;
        };
        ScrollerScreenSkin.prototype.__4_i = function () {
            var t = new egret.gui.Scroller();
            this.__s(t, ["bottom", "left", "right", "top"], [100, 100, 100, 100]);
            t.viewport = this.__3_i();
            return t;
        };
        return ScrollerScreenSkin;
    })(egret.gui.Skin);
    screenContentSkins.ScrollerScreenSkin = ScrollerScreenSkin;
    ScrollerScreenSkin.prototype.__class__ = "screenContentSkins.ScrollerScreenSkin";
})(screenContentSkins || (screenContentSkins = {}));
