var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var screenContentSkins;
(function (screenContentSkins) {
    var LabelScreenSkin = (function (_super) {
        __extends(LabelScreenSkin, _super);
        function LabelScreenSkin() {
            _super.call(this);
            this.__s = egret.gui.setProperties;
            this.elementsContent = [this.__8_i()];
        }
        LabelScreenSkin.prototype.__1_i = function () {
            var t = new egret.gui.Label();
            this.__s(t, ["fontFamily", "percentHeight", "text", "textColor", "percentWidth"], ["微软雅黑", 100, "左对齐文本", 0x727070, 100]);
            return t;
        };
        LabelScreenSkin.prototype.__2_i = function () {
            var t = new egret.gui.Label();
            this.__s(t, ["fontFamily", "percentHeight", "text", "textAlign", "textColor", "percentWidth"], ["微软雅黑", 100, "水平居中文本", "center", 0x727070, 100]);
            return t;
        };
        LabelScreenSkin.prototype.__3_i = function () {
            var t = new egret.gui.Label();
            this.__s(t, ["fontFamily", "percentHeight", "text", "textAlign", "textColor", "percentWidth"], ["微软雅黑", 100, "右对齐文本", "right", 0x727070, 100]);
            return t;
        };
        LabelScreenSkin.prototype.__4_i = function () {
            var t = new egret.gui.Label();
            this.__s(t, ["fontFamily", "percentHeight", "text", "textColor", "verticalAlign", "percentWidth"], ["微软雅黑", 100, "垂直居中文本", 0x727070, "middle", 100]);
            return t;
        };
        LabelScreenSkin.prototype.__5_i = function () {
            var t = new egret.gui.Label();
            this.__s(t, ["fontFamily", "percentHeight", "text", "textColor", "verticalAlign", "percentWidth"], ["微软雅黑", 100, "底对齐文本", 0x727070, "bottom", 100]);
            return t;
        };
        LabelScreenSkin.prototype.__6_i = function () {
            var t = new egret.gui.Label();
            this.__s(t, ["bold", "fontFamily", "percentHeight", "text", "textAlign", "textColor", "verticalAlign", "percentWidth"], [true, "微软雅黑", 100, "粗体文本", "right", 0x727070, "bottom", 100]);
            return t;
        };
        LabelScreenSkin.prototype.__7_i = function () {
            var t = new egret.gui.Label();
            this.__s(t, ["fontFamily", "percentHeight", "italic", "text", "textAlign", "textColor", "verticalAlign", "percentWidth"], ["微软雅黑", 100, true, "斜体文本", "center", 0x727070, "middle", 100]);
            return t;
        };
        LabelScreenSkin.prototype.__8_i = function () {
            var t = new egret.gui.Group();
            this.__s(t, ["bottom", "left", "right", "top"], [50, 50, 50, 50]);
            t.elementsContent = [this.__1_i(), this.__2_i(), this.__3_i(), this.__4_i(), this.__5_i(), this.__6_i(), this.__7_i()];
            return t;
        };
        return LabelScreenSkin;
    })(egret.gui.Skin);
    screenContentSkins.LabelScreenSkin = LabelScreenSkin;
    LabelScreenSkin.prototype.__class__ = "screenContentSkins.LabelScreenSkin";
})(screenContentSkins || (screenContentSkins = {}));
