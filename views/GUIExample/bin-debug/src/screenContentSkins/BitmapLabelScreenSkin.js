var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var screenContentSkins;
(function (screenContentSkins) {
    var BitmapLabelScreenSkin = (function (_super) {
        __extends(BitmapLabelScreenSkin, _super);
        function BitmapLabelScreenSkin() {
            _super.call(this);
            this.__s = egret.gui.setProperties;
            this.elementsContent = [this.__1_i()];
        }
        Object.defineProperty(BitmapLabelScreenSkin.prototype, "skinParts", {
            get: function () {
                return BitmapLabelScreenSkin._skinParts;
            },
            enumerable: true,
            configurable: true
        });
        BitmapLabelScreenSkin.prototype.bitmapLabel_i = function () {
            var t = new egret.gui.BitmapLabel();
            this.bitmapLabel = t;
            this.__s(t, ["font", "horizontalCenter", "text", "verticalCenter"], ["font_fnt", 0, "Hello Egret", 0]);
            return t;
        };
        BitmapLabelScreenSkin.prototype.__1_i = function () {
            var t = new egret.gui.Group();
            this.__s(t, ["bottom", "left", "right", "top"], [50, 50, 50, 50]);
            t.elementsContent = [this.bitmapLabel_i()];
            return t;
        };
        BitmapLabelScreenSkin._skinParts = ["bitmapLabel"];
        return BitmapLabelScreenSkin;
    })(egret.gui.Skin);
    screenContentSkins.BitmapLabelScreenSkin = BitmapLabelScreenSkin;
    BitmapLabelScreenSkin.prototype.__class__ = "screenContentSkins.BitmapLabelScreenSkin";
})(screenContentSkins || (screenContentSkins = {}));
