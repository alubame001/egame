var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var screenContentSkins;
(function (screenContentSkins) {
    var TabBarScreenSkin = (function (_super) {
        __extends(TabBarScreenSkin, _super);
        function TabBarScreenSkin() {
            _super.call(this);
            this.__s = egret.gui.setProperties;
            this.elementsContent = [this.bar_i(), this.label_i()];
        }
        Object.defineProperty(TabBarScreenSkin.prototype, "skinParts", {
            get: function () {
                return TabBarScreenSkin._skinParts;
            },
            enumerable: true,
            configurable: true
        });
        TabBarScreenSkin.prototype.label_i = function () {
            var t = new egret.gui.Label();
            this.label = t;
            this.__s(t, ["fontFamily", "horizontalCenter", "maxDisplayedLines", "text", "textColor", "verticalCenter"], ["微软雅黑", 0, 1, "选中第1项", 0x727070, -100]);
            return t;
        };
        TabBarScreenSkin.prototype.bar_i = function () {
            var t = new egret.gui.TabBar();
            this.bar = t;
            this.__s(t, ["horizontalCenter", "verticalCenter"], [0, 0]);
            return t;
        };
        TabBarScreenSkin._skinParts = ["bar", "label"];
        return TabBarScreenSkin;
    })(egret.gui.Skin);
    screenContentSkins.TabBarScreenSkin = TabBarScreenSkin;
    TabBarScreenSkin.prototype.__class__ = "screenContentSkins.TabBarScreenSkin";
})(screenContentSkins || (screenContentSkins = {}));
