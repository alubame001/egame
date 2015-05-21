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
var EMenu = (function (_super) {
    __extends(EMenu, _super);
    function EMenu() {
        _super.apply(this, arguments);
    }
    EMenu.prototype.init = function (imgName, backFun, descStr, fontSize, cartoonType, assetsName) {
        if (backFun === void 0) { backFun = null; }
        if (descStr === void 0) { descStr = ""; }
        if (fontSize === void 0) { fontSize = 30; }
        if (cartoonType === void 0) { cartoonType = 1; }
        if (assetsName === void 0) { assetsName = "assets"; }
        this.assetName = assetsName;
        this.cartoonType = cartoonType;
        this.backFun = backFun;
        this.btnImg = new egret.Bitmap();
        if (assetsName != "assets") {
            this.assets = RES.getRes(assetsName);
        }
        this.btnImg.texture = this.assets.getTexture(imgName);
        this.addChild(this.btnImg);
        this.effectImg = new egret.Bitmap();
        this.effectImg.texture = this.assets.getTexture("loading_1");
        this.addChild(this.effectImg);
        this.effectImg.visible = false;
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
        // this.setScale(this.scaleXSize,this.scaleYSize);  
    };
    return EMenu;
})(EButton);
EMenu.prototype.__class__ = "EMenu";
