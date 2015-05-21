var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var SharePanel = (function (_super) {
    __extends(SharePanel, _super);
    function SharePanel(stageW, stageH) {
        _super.call(this);
        this.imgs = RES.getRes("asserts");
        this.w = 0;
        this.h = 0;
        this.arrorImg = new egret.Bitmap();
        this.spr2 = new egret.Sprite();
        this.w = stageW;
        this.h = stageH;
        this.createView();
    }
    // private noticeTF = new egret.TextField();
    SharePanel.prototype.createView = function () {
        //绘制一个透明度为1的绿色矩形，宽高为100*80
        this.spr2.graphics.beginFill(0x000000, 0.8);
        this.spr2.graphics.drawRect(0, 0, this.w, this.h);
        this.spr2.graphics.endFill();
        this.spr2.width = this.w;
        this.spr2.height = this.h;
        this.addChild(this.spr2);
        this.spr2.visible = false;
        this.spr2.touchEnabled = true;
        this.arrorImg.texture = this.imgs.getTexture("shareImg");
        this.arrorImg.x = this.w - this.arrorImg.width;
        this.arrorImg.y = 0;
        this.addChild(this.arrorImg);
        this.arrorImg.visible = false;
        // this.noticeTF.size = 30;
        // this.noticeTF.width = 350;
        // this.noticeTF.height = 150;
        // this.noticeTF.text = "点击右上角\n【分享到朋友圈】\n和好基友一较高下吧！";
        // this.noticeTF.x = this.w/2 - this.noticeTF.width/2;
        // this.noticeTF.y = this.h/2  - 100;
        // this.noticeTF.strokeColor = 0x000000;
        // this.noticeTF.stroke  = 1;
        // this.noticeTF.bold = true;
        // this.noticeTF.textAlign = egret.HorizontalAlign.CENTER;
        // this.addChild( this.noticeTF );
        // this.noticeTF.visible = false;
        this.spr2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showOver, this);
    };
    SharePanel.prototype.showOver = function () {
        this.spr2.visible = false;
        this.arrorImg.visible = false;
        // this.noticeTF.visible = false;
    };
    SharePanel.prototype.show = function () {
        this.spr2.visible = true;
        this.arrorImg.visible = true;
        // this.noticeTF.visible = true;
        egret.setTimeout(function () {
            if (this.spr2.visible) {
                this.showOver();
            }
        }, this, 8000);
    };
    return SharePanel;
})(egret.Sprite);
