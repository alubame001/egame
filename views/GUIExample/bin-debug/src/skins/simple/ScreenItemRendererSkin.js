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
        var ScreenItemRendererSkin = (function (_super) {
            __extends(ScreenItemRendererSkin, _super);
            function ScreenItemRendererSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.height = 75;
                this.elementsContent = [this.__4_i(), this.__5_i(), this.labelDisplay_i()];
                this.states = [
                    new egret.gui.State("up", []),
                    new egret.gui.State("down", [
                        new egret.gui.SetProperty("__4", "source", "app_list_item_select_png"),
                        new egret.gui.SetProperty("labelDisplay", "textColor", 0xf0f0f0)
                    ]),
                    new egret.gui.State("disabled", [])
                ];
            }
            Object.defineProperty(ScreenItemRendererSkin.prototype, "skinParts", {
                get: function () {
                    return ScreenItemRendererSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            ScreenItemRendererSkin.prototype.__5_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillAlpha", "height", "strokeAlpha", "strokeColor", "strokeWeight", "percentWidth"], [0, .5, 1, 0x888888, .5, 100]);
                return t;
            };
            ScreenItemRendererSkin.prototype.labelDisplay_i = function () {
                var t = new egret.gui.Label();
                this.labelDisplay = t;
                this.__s(t, ["fontFamily", "left", "size", "textColor", "verticalCenter"], ["Tahoma", 32, 24, 0x111111, 0]);
                return t;
            };
            ScreenItemRendererSkin.prototype.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__4 = t;
                this.__s(t, ["percentHeight", "source", "percentWidth"], [100, "app_list_item_up_png", 100]);
                return t;
            };
            ScreenItemRendererSkin._skinParts = ["labelDisplay"];
            return ScreenItemRendererSkin;
        })(egret.gui.Skin);
        simple.ScreenItemRendererSkin = ScreenItemRendererSkin;
        ScreenItemRendererSkin.prototype.__class__ = "skins.simple.ScreenItemRendererSkin";
    })(simple = skins.simple || (skins.simple = {}));
})(skins || (skins = {}));
