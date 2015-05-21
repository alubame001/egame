var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var LogoUI = (function (_super) {
    __extends(LogoUI, _super);
    function LogoUI(stageW, stageH) {
        _super.call(this);
        this.imgs = RES.getRes("asserts");
        this.logo = new egret.Bitmap();
        this.chLogo = new egret.Bitmap();
        // private cutSound:egret.Sound = new egret.Sound();
        // private die:egret.Sound = new egret.Sound();
        this.w = 0;
        this.h = 0;
        this.spr1 = new egret.Sprite();
        this.w = stageW;
        this.h = stageH;
        this.createView();
    }
    LogoUI.prototype.createView = function () {
        this.spr1.graphics.beginFill(0x000000, 1);
        this.spr1.graphics.drawRect(0, 0, this.w, this.h);
        this.spr1.graphics.endFill();
        this.addChild(this.spr1);

        //开启spr1的Touch开关
        this.logo.texture = this.imgs.getTexture("logo");
        this.addChild(this.logo);
        this.logo.x = this.w / 2 - this.logo.width;
        this.logo.y = 150;
        this.logo.alpha = 0;

        this.chLogo.texture = this.imgs.getTexture("chLogo");
        this.addChild(this.chLogo);
        this.chLogo.x = this.w / 2 - this.chLogo.width;
        this.chLogo.y = this.logo.y + this.logo.height + 20;
        this.chLogo.alpha = 0;
        var onComplete2 = function () {
            this.dispatchEvent(new egret.Event("showLogoOver"));
        };
        var onComplete1 = function () {
            egret.Tween.get(this.logo, { loop: false }).to({ alpha: 1 }, 500).call(onComplete2, this);
        };

        egret.Tween.get(this.logo, { loop: false }).to({ alpha: 1 }, 1000).call(onComplete1, this);
        egret.Tween.get(this.chLogo, { loop: false }).to({ alpha: 1 }, 1000);
    };
    return LogoUI;
})(egret.Sprite);
LogoUI.prototype.__class__ = "LogoUI";
