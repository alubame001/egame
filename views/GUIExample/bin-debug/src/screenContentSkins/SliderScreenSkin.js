var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var screenContentSkins;
(function (screenContentSkins) {
    var SliderScreenSkin = (function (_super) {
        __extends(SliderScreenSkin, _super);
        function SliderScreenSkin() {
            _super.call(this);
            this.__s = egret.gui.setProperties;
            this.elementsContent = [this.hSlider_i(), this.vSlider_i(), this.label_i()];
        }
        Object.defineProperty(SliderScreenSkin.prototype, "skinParts", {
            get: function () {
                return SliderScreenSkin._skinParts;
            },
            enumerable: true,
            configurable: true
        });
        SliderScreenSkin.prototype.label_i = function () {
            var t = new egret.gui.Label();
            this.label = t;
            this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "textColor", "verticalCenter"], ["微软雅黑", 0, 20, "拖拽滑块以改变值", 0x727070, 0]);
            return t;
        };
        SliderScreenSkin.prototype.hSlider_i = function () {
            var t = new egret.gui.HSlider();
            this.hSlider = t;
            this.__s(t, ["horizontalCenter", "maximum", "value", "verticalCenter", "width"], [0, 100, 50, 135, 250]);
            return t;
        };
        SliderScreenSkin.prototype.vSlider_i = function () {
            var t = new egret.gui.VSlider();
            this.vSlider = t;
            this.__s(t, ["height", "horizontalCenter", "maximum", "value", "verticalCenter"], [250, -135, 100, 70, 0]);
            return t;
        };
        SliderScreenSkin._skinParts = ["hSlider", "vSlider", "label"];
        return SliderScreenSkin;
    })(egret.gui.Skin);
    screenContentSkins.SliderScreenSkin = SliderScreenSkin;
    SliderScreenSkin.prototype.__class__ = "screenContentSkins.SliderScreenSkin";
})(screenContentSkins || (screenContentSkins = {}));
