/**
  * 图片button类
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved.
  * 可以有图片，文字，动画
  * todo:九宫格、多动画、图字等
  */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ECircle = (function (_super) {
    __extends(ECircle, _super);
    function ECircle() {
        _super.apply(this, arguments);
    }
    ECircle.prototype.init = function (imgName, backFun, descStr, fontSize, cartoonType, assetsName) {
        if (backFun === void 0) { backFun = null; }
        if (descStr === void 0) { descStr = ""; }
        if (fontSize === void 0) { fontSize = 30; }
        if (cartoonType === void 0) { cartoonType = 1; }
        if (assetsName === void 0) { assetsName = "assets"; }
        this.assetName = assetsName;
        this.cartoonType = cartoonType;
        this.backFun = backFun;
        this.assets = RES.getRes(assetsName);
        this.btnImg = new egret.Bitmap();
        this.btnImg.texture = this.assets.getTexture("big_circle");
        this.addChild(this.btnImg);
        this.effectImg = new egret.Bitmap();
        this.effectImg.texture = this.assets.getTexture("ring");
        //  this.effectImg.x = this.btnImg.width/2;
        //  this.effectImg.y = this.btnImg.height/2;
        this.addChild(this.effectImg);
        this.iconImg = new egret.Bitmap();
        this.iconImg.texture = this.assets.getTexture(imgName);
        this.addChild(this.iconImg);
        this.btnImg2 = new egret.Bitmap();
        this.btnImg2.texture = this.assets.getTexture("small_circle");
        this.addChild(this.btnImg2);
        this.btnImg3 = new egret.Bitmap();
        this.btnImg3.texture = this.assets.getTexture("small_circle_2");
        this.addChild(this.btnImg3);
        this.btnImg3.visible = false;
        // this.effectImg.visible = false;
        this.sound = RES.getRes("click");
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.size = fontSize;
        this.textField.textAlign = "center";
        this.textField.stroke = 1;
        this.textField.strokeColor = 0x000000;
        this.textField.textColor = 0xffffff;
        this.textField.text = descStr;
        this.textField.width = this.btnImg.width;
        this.textField.x = this.btnImg.width / 2 - this.textField.width / 2;
        this.textField.y = this.btnImg.height / 2 - this.textField.height / 2;
        this.textField2 = new egret.TextField();
        this.addChild(this.textField2);
        this.textField2.size = 30;
        this.textField2.textAlign = "center";
        this.textField2.stroke = 1;
        this.textField2.textColor = 0x000000;
        //this.textField2.textColor = 0xdeff00;
        this.textField2.strokeColor = 0xffffff;
        this.textField2.text = "";
        this.textField2.width = this.btnImg.width;
        this.textField2.x = this.btnImg.width - this.textField2.width;
        this.textField2.y = this.btnImg.height - this.textField2.height + 5;
        this.touchEnabled = true;
        if (this.touchEnabled) {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onbuttonTouchTap, this);
        }
        this.effectImg.anchorX = 0.5;
        this.effectImg.anchorY = 0.5;
        this.effectImg.x = this.btnImg.width / 2;
        this.effectImg.y = this.btnImg.height / 2;
        EffectUtils.rotationEffect(this.effectImg, Maths.RndNum(1000) + 100);
    };
    return ECircle;
})(EButton);
ECircle.prototype.__class__ = "ECircle";
