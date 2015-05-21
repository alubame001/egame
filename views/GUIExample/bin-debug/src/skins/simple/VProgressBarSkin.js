var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var skins;
(function (skins) {
    var simple;
    (function (simple) {
        var VProgressBarSkin = (function (_super) {
            __extends(VProgressBarSkin, _super);
            function VProgressBarSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.elementsContent = [this.__3_i(), this.thumb_i(), this.track_i(), this.labelDisplay_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            Object.defineProperty(VProgressBarSkin.prototype, "skinParts", {
                get: function () {
                    return VProgressBarSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            VProgressBarSkin.prototype.labelDisplay_i = function () {
                var t = new egret.gui.Label();
                this.labelDisplay = t;
                this.__s(t, ["left", "maxDisplayedLines", "right", "size", "textAlign", "textColor", "verticalAlign", "verticalCenter"], [5, 1, 5, 20, "center", 0x707070, "middle", 0]);
                return t;
            };
            VProgressBarSkin.prototype.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["percentHeight", "source", "percentWidth"], [100, "progressbar_track_png", 100]);
                return t;
            };
            VProgressBarSkin.prototype.thumb_i = function () {
                var t = new egret.gui.UIAsset();
                this.thumb = t;
                t.source = "progressbar_fill_png";
                return t;
            };
            VProgressBarSkin.prototype.track_i = function () {
                var t = new egret.gui.UIComponent();
                this.track = t;
                this.__s(t, ["percentHeight", "percentWidth"], [100, 100]);
                return t;
            };
            VProgressBarSkin._skinParts = ["thumb", "track", "labelDisplay"];
            return VProgressBarSkin;
        })(egret.gui.Skin);
        simple.VProgressBarSkin = VProgressBarSkin;
        VProgressBarSkin.prototype.__class__ = "skins.simple.VProgressBarSkin";
    })(simple = skins.simple || (skins.simple = {}));
})(skins || (skins = {}));
