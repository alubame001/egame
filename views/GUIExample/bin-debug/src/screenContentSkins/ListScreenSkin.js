var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var screenContentSkins;
(function (screenContentSkins) {
    var ListScreenSkin = (function (_super) {
        __extends(ListScreenSkin, _super);
        function ListScreenSkin() {
            _super.call(this);
            this.__s = egret.gui.setProperties;
            this.elementsContent = [this.__1_i(), this.list_i()];
        }
        Object.defineProperty(ListScreenSkin.prototype, "skinParts", {
            get: function () {
                return ListScreenSkin._skinParts;
            },
            enumerable: true,
            configurable: true
        });
        ListScreenSkin.prototype.list_i = function () {
            var t = new egret.gui.List();
            this.list = t;
            this.__s(t, ["bottom", "left", "right", "top"], [110, 50, 50, 110]);
            return t;
        };
        ListScreenSkin.prototype.__1_i = function () {
            var t = new egret.gui.Rect();
            this.__s(t, ["bottom", "left", "right", "top"], [110, 50, 50, 110]);
            return t;
        };
        ListScreenSkin._skinParts = ["list"];
        return ListScreenSkin;
    })(egret.gui.Skin);
    screenContentSkins.ListScreenSkin = ListScreenSkin;
    ListScreenSkin.prototype.__class__ = "screenContentSkins.ListScreenSkin";
})(screenContentSkins || (screenContentSkins = {}));
