var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var screenContentSkins;
(function (screenContentSkins) {
    var ProgressBarScreenSkin = (function (_super) {
        __extends(ProgressBarScreenSkin, _super);
        function ProgressBarScreenSkin() {
            _super.call(this);
            this.__s = egret.gui.setProperties;
            this.elementsContent = [this.hProgressBar1_i(), this.hProgressBar2_i(), this.vProgressBar_i()];
        }
        Object.defineProperty(ProgressBarScreenSkin.prototype, "skinParts", {
            get: function () {
                return ProgressBarScreenSkin._skinParts;
            },
            enumerable: true,
            configurable: true
        });
        ProgressBarScreenSkin.prototype.hProgressBar2_i = function () {
            var t = new egret.gui.ProgressBar();
            this.hProgressBar2 = t;
            this.__s(t, ["direction", "height", "horizontalCenter", "verticalCenter", "width"], ["rightToLeft", 21, 120, 50, 250]);
            return t;
        };
        ProgressBarScreenSkin.prototype.hProgressBar1_i = function () {
            var t = new egret.gui.ProgressBar();
            this.hProgressBar1 = t;
            this.__s(t, ["height", "horizontalCenter", "verticalCenter", "width"], [21, 120, -50, 250]);
            return t;
        };
        ProgressBarScreenSkin.prototype.vProgressBar_i = function () {
            var t = new egret.gui.ProgressBar();
            this.vProgressBar = t;
            this.__s(t, ["direction", "height", "horizontalCenter", "hostComponentKey", "verticalCenter", "width"], ["bottomToTop", 250, -120, "VProgressBar", 0, 100]);
            return t;
        };
        ProgressBarScreenSkin._skinParts = ["hProgressBar1", "hProgressBar2", "vProgressBar"];
        return ProgressBarScreenSkin;
    })(egret.gui.Skin);
    screenContentSkins.ProgressBarScreenSkin = ProgressBarScreenSkin;
    ProgressBarScreenSkin.prototype.__class__ = "screenContentSkins.ProgressBarScreenSkin";
})(screenContentSkins || (screenContentSkins = {}));
