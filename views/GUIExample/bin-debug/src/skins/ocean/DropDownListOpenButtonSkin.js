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
        var DropDownListOpenButtonSkin = (function (_super) {
            __extends(DropDownListOpenButtonSkin, _super);
            function DropDownListOpenButtonSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "minWidth"], [60, 140]);
                this.elementsContent = [this.__4_i(), this.__5_i()];
                this.states = [
                    new egret.gui.State("up", []),
                    new egret.gui.State("down", [
                        new egret.gui.SetProperty("__4", "source", "button_down_png")
                    ]),
                    new egret.gui.State("disabled", [
                        new egret.gui.SetProperty("__4", "source", "button_disabled_png")
                    ])
                ];
            }
            DropDownListOpenButtonSkin.prototype.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__4 = t;
                this.__s(t, ["percentHeight", "source", "percentWidth"], [100, "button_normal_png", 100]);
                return t;
            };
            DropDownListOpenButtonSkin.prototype.__5_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["right", "source", "verticalCenter"], [5, "dropdownlist_dropbutton_png", 0]);
                return t;
            };
            return DropDownListOpenButtonSkin;
        })(egret.gui.Skin);
        ocean.DropDownListOpenButtonSkin = DropDownListOpenButtonSkin;
        DropDownListOpenButtonSkin.prototype.__class__ = "skins.ocean.DropDownListOpenButtonSkin";
    })(ocean = skins.ocean || (skins.ocean = {}));
})(skins || (skins = {}));
