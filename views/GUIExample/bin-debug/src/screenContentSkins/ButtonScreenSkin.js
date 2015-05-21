var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var screenContentSkins;
(function (screenContentSkins) {
    var ButtonScreenSkin = (function (_super) {
        __extends(ButtonScreenSkin, _super);
        function ButtonScreenSkin() {
            _super.call(this);
            this.__s = egret.gui.setProperties;
            this.elementsContent = [this.__7_i()];
        }
        ButtonScreenSkin.prototype.__1_i = function () {
            var t = new egret.gui.VerticalLayout();
            this.__s(t, ["horizontalAlign", "verticalAlign"], ["contentJustify", "middle"]);
            return t;
        };
        ButtonScreenSkin.prototype.__2_i = function () {
            var t = new egret.gui.Button();
            this.__s(t, ["icon", "label"], ["app_iconbutton_icon_png", "Icon Button"]);
            return t;
        };
        ButtonScreenSkin.prototype.__3_i = function () {
            var t = new egret.gui.Button();
            t.label = "Normal Button";
            return t;
        };
        ButtonScreenSkin.prototype.__4_i = function () {
            var t = new egret.gui.Button();
            this.__s(t, ["enabled", "label"], [false, "Disabled Button"]);
            return t;
        };
        ButtonScreenSkin.prototype.__5_i = function () {
            var t = new egret.gui.ToggleButton();
            t.label = "Normal ToggleButton";
            return t;
        };
        ButtonScreenSkin.prototype.__6_i = function () {
            var t = new egret.gui.ToggleButton();
            this.__s(t, ["enabled", "label", "selected"], [false, "Disabled ToggleButton", true]);
            return t;
        };
        ButtonScreenSkin.prototype.__7_i = function () {
            var t = new egret.gui.Group();
            this.__s(t, ["horizontalCenter", "verticalCenter"], [0, 0]);
            t.layout = this.__1_i();
            t.elementsContent = [this.__2_i(), this.__3_i(), this.__4_i(), this.__5_i(), this.__6_i()];
            return t;
        };
        return ButtonScreenSkin;
    })(egret.gui.Skin);
    screenContentSkins.ButtonScreenSkin = ButtonScreenSkin;
    ButtonScreenSkin.prototype.__class__ = "screenContentSkins.ButtonScreenSkin";
})(screenContentSkins || (screenContentSkins = {}));
