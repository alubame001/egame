/**
  * 单行多颜色文本类
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved.
  * 多种颜色文本，超链接，回调
  * todo:超链接、下划线、回调等
  */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var HtmlText = (function (_super) {
    __extends(HtmlText, _super);
    /**
    * contentArr       多文本数组
    * fontSize         文本字体大小
    * isBold           是否加粗
    * stroke           描边宽度
    * strokeColor      描边颜色
    * 如：[["black",0x000000],["green",0x55ff00]]
    */
    function HtmlText(contentArr, fontSize, isBold, stroke, strokeColor) {
        if (fontSize === void 0) { fontSize = 30; }
        if (isBold === void 0) { isBold = false; }
        if (stroke === void 0) { stroke = 0; }
        if (strokeColor === void 0) { strokeColor = 0x000000; }
        _super.call(this);
        this.tfArr = [];
        this.setData(contentArr, fontSize, isBold, stroke, strokeColor);
    }
    HtmlText.prototype.setData = function (contentArr, fontSize, isBold, stroke, strokeColor) {
        if (fontSize === void 0) { fontSize = 30; }
        if (isBold === void 0) { isBold = false; }
        if (stroke === void 0) { stroke = 0; }
        if (strokeColor === void 0) { strokeColor = 0x000000; }
        var len1 = this.tfArr.length;
        for (var i = 0; i < len1; i++) {
            this.removeChild(this.tfArr[i]);
        }
        this.tfArr = [];
        var lastX = 0;
        //解析html标签
        var len2 = contentArr.length;
        for (var i = 0; i < len2; i++) {
            var contentRender = contentArr[i];
            var tf = new egret.TextField();
            this.addChild(tf);
            tf.size = fontSize;
            tf.text = contentRender[0];
            tf.textColor = contentRender[1];
            tf.bold = isBold;
            tf.stroke = stroke;
            tf.strokeColor = strokeColor;
            tf.x = lastX;
            lastX += tf.width;
            this.tfArr[i] = tf;
        }
    };
    return HtmlText;
})(egret.DisplayObjectContainer);
