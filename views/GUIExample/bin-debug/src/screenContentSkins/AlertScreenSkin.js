var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var screenContentSkins;
(function (screenContentSkins) {
    var AlertScreenSkin = (function (_super) {
        __extends(AlertScreenSkin, _super);
        function AlertScreenSkin() {
            _super.call(this);
            this.__s = egret.gui.setProperties;
            this.elementsContent = [this.button_i()];
        }
        Object.defineProperty(AlertScreenSkin.prototype, "skinParts", {
            get: function () {
                return AlertScreenSkin._skinParts;
            },
            enumerable: true,
            configurable: true
        });
        AlertScreenSkin.prototype.button_i = function () {
            var t = new egret.gui.Button();
            this.button = t;
            this.__s(t, ["horizontalCenter", "label", "verticalCenter"], [0, "Show Alert", 0]);
            return t;
        };
        AlertScreenSkin._skinParts = ["button"];
        return AlertScreenSkin;
    })(egret.gui.Skin);
    screenContentSkins.AlertScreenSkin = AlertScreenSkin;
    AlertScreenSkin.prototype.__class__ = "screenContentSkins.AlertScreenSkin";
})(screenContentSkins || (screenContentSkins = {}));
