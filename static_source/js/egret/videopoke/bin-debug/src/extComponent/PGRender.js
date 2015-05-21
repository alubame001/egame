var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PGRender = (function (_super) {
    __extends(PGRender, _super);
    function PGRender(stageW, stageH, isRight) {
        _super.call(this);
        this.imgs = RES.getRes("asserts");
        this.w = 0;
        this.h = 0;
        this.isRight = false;
        this.pgBG = new egret.Bitmap();
        this.greenPG = new egret.Bitmap();
        this.contentTF = new egret.TextField();
        this.maxWidth = 194;
        this.w = stageW;
        this.h = stageH;
        this.isRight = isRight;
        this.createView();
    }
    PGRender.prototype.createView = function () {
        this.pgBG.texture = this.imgs.getTexture("pgBG");
        this.addChild(this.pgBG);
        this.greenPG.texture = this.imgs.getTexture("greenPG");
        if (this.isRight) {
            this.greenPG.anchorX = 1;
            this.greenPG.x = 2 + 194;
        }
        else {
            this.greenPG.anchorX = 0;
            this.greenPG.x = 2;
        }
        this.greenPG.y = 2;
        this.addChild(this.greenPG);
        this.contentTF.size = 10;
        this.contentTF.width = 163;
        this.contentTF.x = 194 / 2 - 163 / 2;
        // this.contentTF.y = ;
        // this.contentTF.textColor = 0xffdd00;
        this.contentTF.strokeColor = 0x000000;
        this.contentTF.stroke = 1;
        this.contentTF.bold = false;
        this.contentTF.text = "1055/269999";
        this.contentTF.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(this.contentTF);
    };
    PGRender.prototype.playEffect = function () {
        this.contentTF.textColor = 0xff0505;
        egret.setTimeout(function () {
            this.contentTF.textColor = 0xFFFFFF;
        }, this, 200);
        egret.setTimeout(function () {
            this.contentTF.textColor = 0xff0505;
        }, this, 400);
        egret.setTimeout(function () {
            this.contentTF.textColor = 0xFFFFFF;
        }, this, 600);
    };
    PGRender.prototype.setHP = function (init, curNum, maxNum) {
        if (!init) {
            this.playEffect();
        }
        var rate = Math.floor((curNum / maxNum) * 10);
        if (rate <= 3) {
            this.greenPG.texture = this.imgs.getTexture("redPG");
        }
        else {
            this.greenPG.texture = this.imgs.getTexture("greenPG");
        }
        this.greenPG.width = this.maxWidth * (curNum / maxNum);
        this.contentTF.text = "" + curNum + "/" + maxNum + "";
    };
    return PGRender;
})(egret.Sprite);
