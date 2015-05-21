var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Notice = (function (_super) {
    __extends(Notice, _super);
    function Notice(stageW, stageH) {
        _super.call(this);
        this.imgs = RES.getRes("asserts");
        this.w = 0;
        this.h = 0;
        this.bg2 = new egret.Sprite();
        this.notice = new egret.Bitmap();
        this.w = stageW;
        this.h = stageH;
        this.createView();
    }
    Notice.prototype.createView = function () {
        //绘制一个透明度为1的绿色矩形，宽高为100*80
        this.bg2.graphics.beginFill(0x000000, 0.5);
        this.bg2.graphics.drawRect(0, 0, this.w, this.h);
        this.bg2.graphics.endFill();
        this.bg2.width = this.w;
        this.bg2.height = this.h;
        this.addChild(this.bg2);
        this.touchEnabled = true;
        this.notice.texture = this.imgs.getTexture("desc");
        this.addChild(this.notice);
        this.notice.touchEnabled = true;
        this.notice.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNoticeClick, this);
    };
    Notice.prototype.onNoticeClick = function () {
        this.dispatchEvent(new egret.Event("readOver"));
    };
    return Notice;
})(egret.Sprite);
