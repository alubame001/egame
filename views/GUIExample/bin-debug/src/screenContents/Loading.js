var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by yn on 2014/9/1.
 */
var Loading = (function (_super) {
    __extends(Loading, _super);
    function Loading() {
        _super.call(this);
        this.contentWidth = 0;
        this.contentHeight = 0;
        this.createChildren();
    }
    Loading.prototype.contentSize = function (width, height) {
        this.contentWidth = width;
        this.contentHeight = height;
        this.drawBack();
    };
    Loading.prototype.drawBack = function () {
        this.graphics.clear();
        this.graphics.beginFill(0x000000, .3);
        this.graphics.drawRect(0, 0, this.contentWidth, this.contentHeight);
        this.graphics.endFill();
    };
    Loading.prototype.createChildren = function () {
        this.display = new egret.TextField();
        this.display.size = 50;
        this.display.textColor = 0x222222;
        this.display.bold = true;
        this.display.visible = false;
        this.addChild(this.display);
    };
    Loading.prototype.setProgress = function (v, info) {
        this.display.x = (this.contentWidth - this.display.width) / 2;
        this.display.y = (this.contentHeight - this.display.height) / 2;
        this.display.text = info + v.toString() + "%";
        this.display.visible = true;
    };
    return Loading;
})(egret.Sprite);
Loading.prototype.__class__ = "Loading";
