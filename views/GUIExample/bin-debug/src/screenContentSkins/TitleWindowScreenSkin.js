var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var screenContentSkins;
(function (screenContentSkins) {
    var TitleWindowScreenSkin = (function (_super) {
        __extends(TitleWindowScreenSkin, _super);
        function TitleWindowScreenSkin() {
            _super.call(this);
            this.__s = egret.gui.setProperties;
            this.elementsContent = [this.button_i()];
        }
        Object.defineProperty(TitleWindowScreenSkin.prototype, "skinParts", {
            get: function () {
                return TitleWindowScreenSkin._skinParts;
            },
            enumerable: true,
            configurable: true
        });
        TitleWindowScreenSkin.prototype.button_i = function () {
            var t = new egret.gui.Button();
            this.button = t;
            this.__s(t, ["horizontalCenter", "label", "verticalCenter"], [0, "Show TitleWindow", 0]);
            return t;
        };
        TitleWindowScreenSkin._skinParts = ["button"];
        return TitleWindowScreenSkin;
    })(egret.gui.Skin);
    screenContentSkins.TitleWindowScreenSkin = TitleWindowScreenSkin;
    TitleWindowScreenSkin.prototype.__class__ = "screenContentSkins.TitleWindowScreenSkin";
})(screenContentSkins || (screenContentSkins = {}));
