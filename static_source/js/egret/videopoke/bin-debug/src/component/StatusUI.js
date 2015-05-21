var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var StatusUI = (function (_super) {
    __extends(StatusUI, _super);
    function StatusUI(stageW, stageH) {
        _super.call(this);
        this.imgs = RES.getRes("asserts");
        this.imgBg = new egret.Bitmap();
        this.menueBtn = new egret.Bitmap();
        this.w = 0;
        this.h = 0;
        this.scoreDescTF = new egret.TextField();
        this.timeDescTF = new egret.TextField();
        this.scoreTF = new egret.TextField();
        this.timeTF = new egret.TextField();
        this.menueTF = new egret.TextField();
        this.timeNum = 0;
        this.w = stageW;
        this.h = stageH;
        this.createView();
    }
    StatusUI.prototype.createView = function () {
        this.imgBg.texture = this.imgs.getTexture("top_bar");
        this.addChild(this.imgBg);

        var tfSize = 24;
        var yNum = 16;

        this.menueTF.size = tfSize;
        this.menueTF.x = 5;
        this.menueTF.y = yNum;
        this.menueTF.text = "菜单";
        this.menueTF.textColor = 0x000000;
        this.menueTF.bold = true;
        this.menueTF.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(this.menueTF);
        this.menueTF.touchEnabled = true;
        this.menueTF.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMenueTFTouchTap, this);

        this.scoreDescTF.size = tfSize;
        this.scoreDescTF.x = 100;
        this.scoreDescTF.y = yNum;
        this.scoreDescTF.textColor = 0x000000;
        this.scoreDescTF.text = "冰棍儿数：";
        this.scoreDescTF.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(this.scoreDescTF);

        this.scoreTF.size = tfSize;
        this.scoreTF.x = this.scoreDescTF.x + this.scoreDescTF.width;
        this.scoreTF.y = yNum;
        this.scoreTF.textColor = 0x000000;
        this.scoreTF.text = "0/30";
        this.scoreTF.bold = true;
        this.scoreTF.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(this.scoreTF);

        this.timeDescTF.size = tfSize;
        this.timeDescTF.x = this.imgBg.width - 150;
        this.timeDescTF.y = yNum;
        this.timeDescTF.textColor = 0x000000;
        this.timeDescTF.text = "用时：";
        this.timeDescTF.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(this.timeDescTF);

        this.timeTF.size = tfSize;
        this.timeTF.x = this.timeDescTF.x + this.timeDescTF.width;
        this.timeTF.y = yNum;
        this.timeTF.textColor = 0x000000;
        this.timeTF.text = "0秒";
        this.timeTF.bold = true;
        this.timeTF.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(this.timeTF);
    };

    StatusUI.prototype.onMenueTFTouchTap = function (e) {
        this.menueTF.scaleX = 1.1;
        this.menueTF.scaleY = 1.1;
        this.menueTF.textColor = 0xffffff;
        egret.setTimeout(function () {
            this.menueTF.scaleX = 1;
            this.menueTF.scaleY = 1;
            this.menueTF.textColor = 0x000000;
        }, this, 200);
        this.dispatchEvent(new egret.Event("showMenue"));
    };

    StatusUI.prototype.updateScore = function (num) {
        this.scoreTF.text = num + "";
        this.scoreTF.textColor = 0xffffff;
        egret.setTimeout(function () {
            this.scoreTF.textColor = 0x000000;
        }, this, 100);
        egret.setTimeout(function () {
            this.scoreTF.textColor = 0xffffff;
        }, this, 200);
        egret.setTimeout(function () {
            this.scoreTF.textColor = 0x000000;
        }, this, 300);
        egret.setTimeout(function () {
            this.scoreTF.textColor = 0xffffff;
        }, this, 400);
        egret.setTimeout(function () {
            this.scoreTF.textColor = 0x000000;
        }, this, 500);
    };

    StatusUI.prototype.playTimer = function () {
        this.timeNum = 0;
        this.scoreTF.text = "0";
        this.timeTF.text = "0秒";

        //创建一个计时器对象
        this.timer = new egret.Timer(1000, 0);

        //注册事件侦听器
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);

        //开始计时
        this.timer.start();
    };

    StatusUI.prototype.timerFunc = function () {
        this.timeNum++;
        this.timeTF.text = this.timeNum + "秒";
    };
    StatusUI.prototype.stopTimer = function () {
        this.timer.stop();
    };

    StatusUI.prototype.getTime = function () {
        return this.timeNum;
    };

    StatusUI.prototype.addTime = function () {
        this.timeNum = this.timeNum + 3;
        this.timeTF.text = this.timeNum + "秒";
    };
    return StatusUI;
})(egret.Sprite);
