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
var EDarkSlot = (function (_super) {
    __extends(EDarkSlot, _super);
    function EDarkSlot() {
        _super.apply(this, arguments);
        this.testState = false;
    }
    EDarkSlot.prototype.init = function (imgName, backFun, descStr, fontSize, cartoonType, assetsName) {
        if (backFun === void 0) { backFun = null; }
        if (descStr === void 0) { descStr = ""; }
        if (fontSize === void 0) { fontSize = 30; }
        if (cartoonType === void 0) { cartoonType = 1; }
        if (assetsName === void 0) { assetsName = "assets"; }
        this.assetName = assetsName;
        this.cartoonType = cartoonType;
        this.backFun = backFun;
        this.assets = RES.getRes(assetsName);
        this.slotImg = new egret.Bitmap();
        this.slotImg.texture = this.assets.getTexture("symbol_run");
        this.addChild(this.slotImg);
        this.slotImg.alpha = 1;
        //  this.sound = RES.getRes("click");
        this.touchEnabled = true;
        if (this.touchEnabled) {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onbuttonTouchTap, this);
        }
        /*
                this.effectImg.anchorX = 0.5;
                this.effectImg.anchorY = 0.5;
                this.effectImg.x = this.btnImg.width/2;
                this.effectImg.y = this.btnImg.height/2;
                EffectUtils.rotationEffect(this.effectImg, Maths.RndNum(1000)+100);
        */
    };
    EDarkSlot.prototype.onbuttonTouchTap = function (e) {
        // EffectUtils.moveDownObj(this.btnImg);  
        var time = 200;
        var symbol = Maths.RndNum(5) + 1;
        //symbol = 10;
        console.log(symbol);
        egret.setTimeout(function () {
            EffectUtils.slotDown(this.slotImg, 500, symbol);
        }, this, time * 0);
        /*
        if (this.testState==false){
             this.testState = true;
             egret.setTimeout(function () {
             EffectUtils.moveDown(this.slotImg,580,100);
             }, this, time*0);
 
         }else {
             this.testState = true;
             egret.setTimeout(function () {
             EffectUtils.moveToObj(this.slotImg,500);
             }, this, time*0);
 
         }
         */
    };
    return EDarkSlot;
})(EButton);
EDarkSlot.prototype.__class__ = "EDarkSlot";
