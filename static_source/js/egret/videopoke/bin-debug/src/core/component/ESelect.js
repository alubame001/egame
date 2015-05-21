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
var ESelect = (function (_super) {
    __extends(ESelect, _super);
    function ESelect(context, imgName, backFun, descStr, fontSize, cartoonType, assetsName) {
        if (backFun === void 0) { backFun = null; }
        if (descStr === void 0) { descStr = ""; }
        if (fontSize === void 0) { fontSize = 30; }
        if (cartoonType === void 0) { cartoonType = 1; }
        if (assetsName === void 0) { assetsName = "assets"; }
        _super.call(this);
        /*
            public textField: egret.TextField;
            public textField2: egret.TextField;
           // public stake: egret.TextField;
            public assets: egret.SpriteSheet = RES.getRes("assets");//名称不一样的话需要修改
            public btnImg: egret.Bitmap;
         //   public btnImg_bottom: egret.Bitmap;
          //  public btnImg_cover: egret.Bitmap;
            public effectImg: egret.Bitmap;
            public backFun: Function;
        
            public isBetButton :Boolean = false;
            public stake :number = 0;
            public min_bet :number = 0;
        
            public isPlayCartoon: Boolean = false;
          
           
            public scaleXSize: number = 1;
            public scaleYSize: number = 1;
            public  sound:egret.Sound;
            public time: number = 0;
            public speed: number = 0;
            public angle : number =0
            public targetAngle : number =0
        
            public picIndex: number = 1;
            public skinIndex: number = 1;
            public skinMaxNumber: number = 3;
           
            public slotNumber: number  =12
        
        
        
            private isRunning: boolean = false;
            private seed: number = 0;
            private maxSeed :number = 9; // range from 0 to 4
            public path :any[]= [0,0,0,0,0,0]
        */
        this.assetsName = "fish";
        this.cartoonType = 1;
        this.param = { context: null, data: null }; //回调参数
        this.param.context = context;
        this.init(imgName, backFun, descStr, fontSize, cartoonType, assetsName);
    }
    ESelect.prototype.init = function (imgName, backFun, descStr, fontSize, cartoonType, assetsName) {
        // console.log(minBet);
        // this.min_bet = minBet;
        if (backFun === void 0) { backFun = null; }
        if (descStr === void 0) { descStr = ""; }
        if (fontSize === void 0) { fontSize = 30; }
        if (cartoonType === void 0) { cartoonType = 1; }
        if (assetsName === void 0) { assetsName = "assets"; }
        this.assetsName = assetsName;
        this.cartoonType = cartoonType;
        /*
                this.backFun = backFun;
                this.btnImg = new egret.Bitmap();
                if (assetsName != "assets") {
                    this.assets = RES.getRes(assetsName);
                }
        
                this.btnImg.texture = this.assets.getTexture(imgName);
                this.addChild(this.btnImg);
        */
    };
    ESelect.prototype.createView = function () {
        this.selects = [];
        for (var i = 0; i < 4; i++) {
            var obj = new EButton(this, "return", null, "1", 20, this.cartoonType, this.assetsName);
            obj.x = 630 + (i * 20); // 82+5;
            obj.y = 46 + 50; //78+5;
            obj.alpha = 1;
            this.selects.push(obj);
            this.addChild(this.selects[i]);
        }
        console.log(this.selects);
    };
    return ESelect;
})(egret.DisplayObjectContainer);
ESelect.prototype.__class__ = "ESelect";
