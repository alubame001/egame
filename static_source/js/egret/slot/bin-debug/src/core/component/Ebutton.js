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
var EButton = (function (_super) {
    __extends(EButton, _super);
    //public touchEnabled: Boolean = true;
    /**
    * imgName       图片
    * backFun       点击方法 如果需要在backFun中使用this的，小心使用这个
    * descStr       按钮描述
    * fontSize      字体大小
    * cartoonType   动画类型 1:【可爱】按下变小，放开弹大 2:按下变小，放开轻微弹大 3：按下变小，放开变大
    * 注意：如果有动画的话，只有动画结束才会触发click事件
    */
    function EButton(context, imgName, backFun, descStr, fontSize, cartoonType, assetsName) {
        if (backFun === void 0) { backFun = null; }
        if (descStr === void 0) { descStr = ""; }
        if (fontSize === void 0) { fontSize = 30; }
        if (cartoonType === void 0) { cartoonType = 1; }
        if (assetsName === void 0) { assetsName = "assets"; }
        _super.call(this);
        this.assets = RES.getRes("assets"); //名称不一样的话需要修改
        this.isPlayCartoon = false;
        this.cartoonType = 1;
        this.param = { context: null, data: null }; //回调参数
        this.scaleXSize = 1;
        this.scaleYSize = 1;
        this.param.context = context;
        this.init(imgName, backFun, descStr, fontSize, cartoonType, assetsName);
    }
    EButton.prototype.init = function (imgName, backFun, descStr, fontSize, cartoonType, assetsName) {
        if (backFun === void 0) { backFun = null; }
        if (descStr === void 0) { descStr = ""; }
        if (fontSize === void 0) { fontSize = 30; }
        if (cartoonType === void 0) { cartoonType = 1; }
        if (assetsName === void 0) { assetsName = "assets"; }
        this.cartoonType = cartoonType;
        this.backFun = backFun;
        this.btnImg = new egret.Bitmap();
        if (assetsName != "assets") {
            this.assets = RES.getRes(assetsName);
        }
        this.btnImg.texture = this.assets.getTexture(imgName);
        this.addChild(this.btnImg);
        this.sound = RES.getRes("click");
        if (descStr != "") {
            this.textField = new egret.TextField();
            this.addChild(this.textField);
            this.textField.size = fontSize;
            this.textField.textAlign = "center";
            this.textField.stroke = 1;
            this.textField.strokeColor = 0x000000;
            this.textField.text = descStr;
            this.textField.width = this.btnImg.width;
            this.textField.x = this.btnImg.width / 2 - this.textField.width / 2;
            this.textField.y = this.btnImg.height / 2 - this.textField.height / 2;
        }
        this.touchEnabled = true;
        if (this.touchEnabled) {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onbuttonTouchTap, this);
        }
        // this.setScale(this.scaleXSize,this.scaleYSize);  
    };
    EButton.prototype.onbuttonTouchTap = function (e) {
        this.sound.play();
        if (this.isPlayCartoon) {
            return;
        }
        this.isPlayCartoon = true;
        var onComplete2 = function () {
            this.isPlayCartoon = false;
        };
        var onComplete1 = function () {
            if (this.cartoonType == 1) {
                egret.Tween.get(this).to({ scaleX: 1, scaleY: 1, x: this.x - this.btnImg.width / 4, y: this.y - this.btnImg.height / 4 }, 500, egret.Ease.elasticOut).call(onComplete2, this);
            }
            else if (this.cartoonType == 2) {
                egret.Tween.get(this).to({ scaleX: 1, scaleY: 1, x: this.x - this.btnImg.width / 4, y: this.y - this.btnImg.height / 4 }, 500, egret.Ease.backOut).call(onComplete2, this);
            }
            else if (this.cartoonType == 3) {
                egret.Tween.get(this).to({ scaleX: 1, scaleY: 1, x: this.x - this.btnImg.width / 4, y: this.y - this.btnImg.height / 4 }, 100).call(onComplete2, this);
            }
        };
        egret.Tween.get(this).to({ scaleX: 0.5, scaleY: 0.5, x: this.x + this.btnImg.width / 4, y: this.y + this.btnImg.height / 4 }, 100, egret.Ease.sineIn).call(onComplete1, this);
        egret.setTimeout(function () {
            if (this.backFun != null) {
                this.backFun.apply(this.param.context, [this.param.data]);
            }
        }, this, 300);
    };
    //设置绑定数据
    EButton.prototype.setBindData = function (data) {
        this.param.data = data;
    };
    //获取绑定数据
    EButton.prototype.getBindData = function () {
        return this.param.data;
    };
    EButton.prototype.getBitmap = function () {
        return this.btnImg;
    };
    EButton.prototype.setBitmap = function (newImgName) {
        this.btnImg.texture = this.assets.getTexture(newImgName);
        this.addChild(this.btnImg);
    };
    EButton.prototype.setScale = function (x, y) {
        egret.Tween.get(this).to({ scaleX: x, scaleY: y }, 0, egret.Ease.elasticOut);
    };
    return EButton;
})(egret.DisplayObjectContainer);
EButton.prototype.__class__ = "EButton";
