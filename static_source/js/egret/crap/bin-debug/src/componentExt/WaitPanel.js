var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
  * 通讯等待类
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved.
  * 和服务端通讯时的显示效果
  */
var WaitPanel = (function (_super) {
    __extends(WaitPanel, _super);
    //type 1:白色等待 2：蓝色等待
    function WaitPanel(type) {
        if (type === void 0) { type = 1; }
        _super.call(this);
        this.bg = new egret.Sprite();
        this.cartoonType = "loading_1";
        this.w = 0;
        this.h = 0;
        switch (type) {
            case 1: {
                this.cartoonType = "loading_1";
                break;
            }
            case 2: {
                this.cartoonType = "loading_1";
                break;
            }
            default: {
            }
        }
        this.mySheet = RES.getRes("rpg");
        this.createView();
    }
    WaitPanel.prototype.createView = function () {
        this.w = egret.MainContext.instance.stage.stageWidth;
        this.h = egret.MainContext.instance.stage.stageHeight;
        this.bg.graphics.beginFill(0x000000, 0);
        this.bg.graphics.drawRect(0, 0, this.w, this.h);
        this.bg.graphics.endFill();
        this.bg.width = this.w;
        this.bg.height = this.h;
        this.addChild(this.bg);
        this.touchEnabled = true;
        this.waitImg = new egret.Bitmap;
        this.waitImg.anchorX = 0.5;
        this.waitImg.anchorY = 0.5;
        this.waitImg.texture = this.mySheet.getTexture(this.cartoonType);
        this.waitImg.x = 800 / 2;
        this.waitImg.y = 480 / 2;
        this.addChild(this.waitImg);
        egret.setTimeout(function () {
            EffectUtils.rotationEffect(this.waitImg, 1000);
        }, this, 5000 * 2);
    };
    return WaitPanel;
})(egret.Sprite);
WaitPanel.prototype.__class__ = "WaitPanel";
