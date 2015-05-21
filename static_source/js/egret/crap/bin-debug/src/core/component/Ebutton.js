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
        // public stake: egret.TextField;
        this.assets = RES.getRes("assets"); //名称不一样的话需要修改
        this.isPlayCartoon = false;
        this.isBetButton = false;
        this.stake = 0;
        this.minBet = 1000;
        this.cartoonType = 1;
        this.param = { context: null, data: null }; //回调参数
        this.scaleXSize = 1;
        this.scaleYSize = 1;
        this.isRunning = false;
        this.seed = 0;
        this.maxSeed = 9; // range from 0 to 4
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
        // if (descStr != "") {
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
        /*
                    this.textField2 = new egret.TextField();
                    this.addChild(this.textField2);
                    this.textField2.size = fontSize;
                    this.textField2.textAlign = "center";
                    this.textField2.stroke = 2;
                    this.textField2.strokeColor = 0xFFFFFF;
                    this.textField2.text = "title2";
                    this.textField2.width = this.btnImg.width;
                    this.textField2.x = this.btnImg.width / 2 - this.textField2.width / 2;
                    this.textField2.y = this.btnImg.height / 2 - this.textField2.height / 2 -30;
        */
        //}
        /*
         if (true) {
            this.stake = new egret.TextField();
            this.addChild(this.stake);
            this.stake.size = fontSize;
            this.stake.textAlign = "center";
            this.stake.stroke = 1;
            this.stake.strokeColor = 0x000000;
            this.stake.text = descStr;
            this.stake.width = this.btnImg.width;
            this.stake.x = this.btnImg.width / 2 - this.textField.width / 2  -10;
            this.stake.y = this.btnImg.height / 2 - this.textField.height /2 -10;
        }
        */
        this.touchEnabled = true;
        if (this.touchEnabled) {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onbuttonTouchTap, this);
        }
        // this.setScale(this.scaleXSize,this.scaleYSize);  
    };
    EButton.prototype.onbuttonTouchTap = function (e) {
        if (this.isBetButton) {
            this.stake = this.stake + this.minBet;
            this.textField.text = this.stake.toString();
        }
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
            else if (this.cartoonType == 4) {
                egret.Tween.get(this).to({ scaleX: this.scaleXSize, scaleY: this.scaleYSize, x: this.x - this.btnImg.width / 20, y: this.y - this.btnImg.height / 20 }, 100, egret.Ease.elasticOut).call(onComplete2, this);
            }
            else if (this.cartoonType == 5) {
                egret.Tween.get(this).to({ scaleX: this.scaleXSize, scaleY: this.scaleYSize, x: this.x - 1, y: this.y - 1 }, 100, egret.Ease.elasticOut).call(onComplete2, this);
            }
        };
        if (this.cartoonType == 4) {
            egret.Tween.get(this).to({ scaleX: this.scaleXSize, scaleY: this.scaleYSize, x: this.x + this.btnImg.width / 20, y: this.y + this.btnImg.height / 20 }, 100, egret.Ease.sineIn).call(onComplete1, this);
        }
        else if (this.cartoonType == 5) {
            egret.Tween.get(this).to({ scaleX: this.scaleXSize, scaleY: this.scaleYSize, x: this.x + 1, y: this.y + 1 }, 100, egret.Ease.elasticOut).call(onComplete2, this);
        }
        else {
            egret.Tween.get(this).to({ scaleX: this.scaleXSize, scaleY: this.scaleYSize, x: this.x + this.btnImg.width / 4, y: this.y + this.btnImg.height / 10 }, 100, egret.Ease.sineIn).call(onComplete1, this);
        }
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
    EButton.prototype.setIsRunning = function (result) {
        this.isRunning = result;
    };
    EButton.prototype.setScale = function (x, y) {
        this.scaleXSize = x;
        this.scaleYSize = y;
        egret.Tween.get(this).to({ scaleX: x, scaleY: y }, 0, egret.Ease.elasticOut);
    };
    EButton.prototype.setText = function (str) {
        // this.textField.text = str.toString();
        this.textField.text = str;
    };
    EButton.prototype.setRandomImg = function (isBlur) {
        var rnd = Maths.RndNum(this.maxSeed);
        var result = this.getImageName(rnd, isBlur);
        this.btnImg.texture = this.assets.getTexture(result);
        this.addChild(this.btnImg);
        //console.log(result);
    };
    EButton.prototype.getImageName = function (imgIndex, isBlur) {
        if (isBlur) {
            this.seed = Maths.RndNum(this.maxSeed);
        }
        else {
            this.seed = imgIndex;
        }
        var result = "";
        switch (this.seed) {
            case 0: {
                result = "icon0";
                //   if (isBlur){  result = result+"_blur"}         
                return result;
            }
            case 1: {
                result = "icon1";
                //  if (isBlur){  result = result+"_blur"}         
                return result;
            }
            case 2: {
                result = "icon2";
                //if (isBlur){  result = result+"_blur"}         
                return result;
            }
            case 3: {
                result = "icon3";
                //  if (isBlur){  result = result+"_blur"}         
                return result;
            }
            case 4: {
                result = "icon4";
                // if (isBlur){  result = result+"_blur"}         
                return result;
            }
            case 5: {
                return "icon5";
            }
            case 6: {
                return "icon6";
            }
            case 7: {
                return "icon7";
            }
            case 8: {
                return "icon8";
            }
            case 9: {
                return "icon9";
            }
        }
    };
    return EButton;
})(egret.DisplayObjectContainer);
EButton.prototype.__class__ = "EButton";
