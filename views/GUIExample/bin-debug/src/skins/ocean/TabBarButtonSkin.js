var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var skins;
(function (skins) {
    var ocean;
    (function (ocean) {
        var TabBarButtonSkin = (function (_super) {
            __extends(TabBarButtonSkin, _super);
            function TabBarButtonSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "minWidth"], [60, 140]);
                this.elementsContent = [this.__7_i(), this.labelDisplay_i()];
                this.states = [
                    new egret.gui.State("up", [
                        new egret.gui.SetProperty("labelDisplay", "textColor", 0xffffff)
                    ]),
                    new egret.gui.State("down", [
                        new egret.gui.SetProperty("__7", "source", "button_down_png"),
                        new egret.gui.SetProperty("labelDisplay", "textColor", 0xf0f0f0)
                    ]),
                    new egret.gui.State("disabled", [
                        new egret.gui.SetProperty("__7", "source", "button_disabled_png"),
                        new egret.gui.SetProperty("labelDisplay", "textColor", 0xdfe6e9)
                    ]),
                    new egret.gui.State("upAndSelected", [
                        new egret.gui.SetProperty("__7", "source", "button_down_png"),
                        new egret.gui.SetProperty("labelDisplay", "textColor", 0xf0f0f0)
                    ]),
                    new egret.gui.State("downAndSelected", [
                        new egret.gui.SetProperty("__7", "source", "button_down_png"),
                        new egret.gui.SetProperty("labelDisplay", "textColor", 0xf0f0f0)
                    ]),
                    new egret.gui.State("disabledAndSelected", [
                        new egret.gui.SetProperty("__7", "source", "button_down_png"),
                        new egret.gui.SetProperty("labelDisplay", "textColor", 0xf0f0f0)
                    ])
                ];
            }
            Object.defineProperty(TabBarButtonSkin.prototype, "skinParts", {
                get: function () {
                    return TabBarButtonSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            TabBarButtonSkin.prototype.labelDisplay_i = function () {
                var t = new egret.gui.Label();
                this.labelDisplay = t;
                this.__s(t, ["bottom", "fontFamily", "left", "right", "size", "textAlign", "top", "verticalAlign"], [12, "Tahoma", 10, 10, 20, "center", 8, "middle"]);
                return t;
            };
            TabBarButtonSkin.prototype.__7_i = function () {
                var t = new egret.gui.UIAsset();
                this.__7 = t;
                this.__s(t, ["percentHeight", "source", "percentWidth"], [100, "button_normal_png", 100]);
                return t;
            };
            TabBarButtonSkin._skinParts = ["labelDisplay"];
            return TabBarButtonSkin;
        })(egret.gui.Skin);
        ocean.TabBarButtonSkin = TabBarButtonSkin;
        TabBarButtonSkin.prototype.__class__ = "skins.ocean.TabBarButtonSkin";
    })(ocean = skins.ocean || (skins.ocean = {}));
})(skins || (skins = {}));
