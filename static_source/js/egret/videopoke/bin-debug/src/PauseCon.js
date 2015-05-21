var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PauseCon = (function (_super) {
    __extends(PauseCon, _super);
    function PauseCon(stageW, stageH) {
        _super.call(this);
        this.imgs = RES.getRes("asserts");
        this.w = 0;
        this.h = 0;
        this.spr = new egret.Sprite();
        this.resumBtn = new egret.Bitmap();
        this.menueBtn = new egret.Bitmap();
        this.retryBtn = new egret.Bitmap();
        this.titleTF = new egret.TextField();
        this.darkSpr = new egret.Sprite();
        this.w = stageW;
        this.h = stageH;
        this.initData();
    }
    PauseCon.prototype.initData = function () {
        this.darkSpr.graphics.beginFill(0x000000, 0.1);
        this.darkSpr.graphics.drawRect(0, 0, this.w, this.h);
        this.darkSpr.graphics.endFill();
        this.darkSpr.width = this.w;
        this.darkSpr.height = this.h;
        this.addChild(this.darkSpr);

        // this.removeChildren();
        //绘制一个透明度为1的绿色矩形，宽高为100*80
        this.spr.graphics.beginFill(0xe42691, 1);
        this.spr.graphics.drawRect(0, 0, this.w, this.h / 2 + 50);
        this.spr.graphics.endFill();
        this.spr.width = this.w;
        this.spr.height = this.h / 2 + 50;
        this.spr.y = this.darkSpr.height / 2 - this.spr.height / 2;
        this.addChild(this.spr);

        this.titleTF.size = 40;
        this.titleTF.width = 190;
        this.titleTF.textColor = 0xffffff;
        this.titleTF.x = this.w / 2 - this.titleTF.width / 2;
        this.titleTF.y = this.spr.y + 25;
        this.titleTF.bold = true;
        this.titleTF.text = "暂停游戏";
        this.titleTF.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(this.titleTF);

        this.resumBtn.texture = this.imgs.getTexture("resume");
        this.addChild(this.resumBtn);
        this.resumBtn.x = this.spr.width / 2 - this.resumBtn.width / 2;
        this.resumBtn.y = this.h / 2 - this.resumBtn.height / 2;
        this.resumBtn.touchEnabled = true;

        this.menueBtn.texture = this.imgs.getTexture("menue");
        this.addChild(this.menueBtn);
        this.menueBtn.x = this.spr.width / 2 - this.menueBtn.width - 20;
        this.menueBtn.y = this.spr.y + this.spr.height - this.menueBtn.height - 10;
        this.menueBtn.touchEnabled = true;

        this.retryBtn.texture = this.imgs.getTexture("retry");
        this.addChild(this.retryBtn);
        this.retryBtn.x = this.spr.width / 2 + 20;
        this.retryBtn.y = this.spr.y + this.spr.height - this.retryBtn.height - 10;
        this.retryBtn.touchEnabled = true;

        this.resumBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onResumBtn, this);
        this.menueBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMenueBtn, this);
        this.retryBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRetryBtn, this);
    };

    //点击事件
    PauseCon.prototype.onResumBtn = function (e) {
        this.dispatchEvent(new egret.Event("resumNotice"));
    };
    PauseCon.prototype.onMenueBtn = function (e) {
        this.dispatchEvent(new egret.Event("menueNotice"));
    };
    PauseCon.prototype.onRetryBtn = function (e) {
    };
    return PauseCon;
})(egret.Sprite);
