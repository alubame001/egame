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
        var CustomItemRendererSkin = (function (_super) {
            __extends(CustomItemRendererSkin, _super);
            function CustomItemRendererSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.height = 85;
                this.elementsContent = [this.__4_i(), this.__5_i(), this.__6_i(), this.labelDisplay_i(), this.toggleSwitch_i()];
                this.states = [
                    new egret.gui.State("up", [
                        new egret.gui.SetProperty("labelDisplay", "textColor", 0x727070)
                    ]),
                    new egret.gui.State("down", [
                        new egret.gui.SetProperty("__4", "source", "app_list_item_select_png"),
                        new egret.gui.SetProperty("labelDisplay", "textColor", 0xeeedec)
                    ]),
                    new egret.gui.State("disabled", [])
                ];
            }
            Object.defineProperty(CustomItemRendererSkin.prototype, "skinParts", {
                get: function () {
                    return CustomItemRendererSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            CustomItemRendererSkin.prototype.__5_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillAlpha", "height", "strokeAlpha", "strokeColor", "strokeWeight", "percentWidth"], [0, .5, 1, 0x888888, .5, 100]);
                return t;
            };
            CustomItemRendererSkin.prototype.__6_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["left", "source", "verticalCenter"], [20, "app_iconbutton_icon2_png", 0]);
                return t;
            };
            CustomItemRendererSkin.prototype.labelDisplay_i = function () {
                var t = new egret.gui.Label();
                this.labelDisplay = t;
                this.__s(t, ["fontFamily", "left", "right", "size", "verticalCenter"], ["Tahoma", 60, 80, 26, 0]);
                return t;
            };
            CustomItemRendererSkin.prototype.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__4 = t;
                this.__s(t, ["percentHeight", "source", "percentWidth"], [100, "app_list_item_up_png", 100]);
                return t;
            };
            CustomItemRendererSkin.prototype.toggleSwitch_i = function () {
                var t = new egret.gui.ToggleSwitch();
                this.toggleSwitch = t;
                this.__s(t, ["right", "selected", "verticalCenter"], [30, true, 0]);
                return t;
            };
            CustomItemRendererSkin._skinParts = ["labelDisplay", "toggleSwitch"];
            return CustomItemRendererSkin;
        })(egret.gui.Skin);
        simple.CustomItemRendererSkin = CustomItemRendererSkin;
        CustomItemRendererSkin.prototype.__class__ = "skins.simple.CustomItemRendererSkin";
    })(simple = skins.simple || (skins.simple = {}));
})(skins || (skins = {}));
