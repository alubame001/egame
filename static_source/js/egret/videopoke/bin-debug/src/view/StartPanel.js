var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var StartPanel = (function (_super) {
    __extends(StartPanel, _super);
    function StartPanel() {
        _super.call(this);
    }
    StartPanel.prototype.initPanel = function () {
        this.bg = new egret.Bitmap();
        this.bg.texture = RES.getRes("");
        this.addChild(this.bg);
        this.bg.touchEnabled = false;
        this.lottery28Btn = new EMenu(this, "lottery28", this.onLottery28BtnTouchTap, "", 20, 4, "menu");
        this.lottery28Btn.x = 0; //294+5;
        this.lottery28Btn.y = 0; //78+5;
        this.lottery28Btn.alpha = 0; //78+5;
        this.lottery28Btn.textField2.text = "幸运28";
        // this.lottery28Btn.textField2.size =20;
        this.addChild(this.lottery28Btn);
        this.crap9Btn = new EMenu(this, "crap9", this.onCrap9BtnTouchTap, "", 20, 4, "menu");
        this.crap9Btn.x = 20 + 200; //294+5;
        this.crap9Btn.y = 0; //78+5;
        this.crap9Btn.alpha = 0; //78+5;
        this.crap9Btn.textField2.text = "魔九";
        this.addChild(this.crap9Btn);
        this.fishBtn = new EMenu(this, "fish", this.onFishBtnTouchTap, "", 20, 4, "menu");
        this.fishBtn.x = 20 + 400; //294+5;
        this.fishBtn.y = 0; //78+5;
        this.fishBtn.alpha = 0; //78+5;
        this.fishBtn.textField2.text = "捕鱼达人";
        this.addChild(this.fishBtn);
        this.wheelBtn = new EMenu(this, "12", this.onWheelBtnTouchTap, "", 20, 4, "menu");
        this.wheelBtn.x = 20 + 600; //294+5;
        this.wheelBtn.y = 0; //78+5;
        this.wheelBtn.alpha = 0; //78+5;
        this.wheelBtn.textField2.text = "十二生肖";
        this.addChild(this.wheelBtn);
        this.blackjackBtn = new EMenu(this, "blackjack", null, "", 20, 4, "menu");
        this.blackjackBtn.x = 0; //294+5;
        this.blackjackBtn.y = 220; //78+5;
        this.blackjackBtn.alpha = 0; //78+5;
        this.blackjackBtn.textField2.text = "21点";
        this.addChild(this.blackjackBtn);
        this.baccaratBtn = new EMenu(this, "baccarat", null, "", 20, 4, "menu");
        this.baccaratBtn.x = 20 + 200; //294+5;
        this.baccaratBtn.y = 220; //78+5;
        this.baccaratBtn.alpha = 0; //78+5;
        this.baccaratBtn.textField2.text = "百家乐";
        this.addChild(this.baccaratBtn);
        this.slotBtn = new EMenu(this, "slot", null, "", 20, 4, "menu");
        this.slotBtn.x = 20 + 400; //294+5;
        this.slotBtn.y = 220; //78+5;
        this.slotBtn.alpha = 0; //78+5;
        this.slotBtn.textField2.text = "海盗船";
        this.addChild(this.slotBtn);
        this.niuniuBtn = new EMenu(this, "niuniu", null, "", 20, 4, "menu");
        this.niuniuBtn.x = 20 + 600; //294+5;
        this.niuniuBtn.y = 220; //78+5;
        this.niuniuBtn.alpha = 0; //78+5;
        this.niuniuBtn.textField2.text = "牛牛";
        this.addChild(this.niuniuBtn);
        this.initEffect();
    };
    StartPanel.prototype.initEffect = function () {
        egret.setTimeout(function () {
            egret.Tween.get(this.lottery28Btn).to({ x: 0, y: 5, alpha: 1 }, 600, egret.Ease.backOut);
        }, this, 550 * 1);
        egret.setTimeout(function () {
            egret.Tween.get(this.crap9Btn).to({ x: 20 + 200, y: 5, alpha: 1 }, 600, egret.Ease.backOut);
        }, this, 550 * 1 + 200);
        egret.setTimeout(function () {
            egret.Tween.get(this.fishBtn).to({ x: 20 + 400, y: 5, alpha: 1 }, 600, egret.Ease.backOut);
        }, this, 550 * 1 + 400);
        egret.setTimeout(function () {
            egret.Tween.get(this.wheelBtn).to({ x: 20 + 600, y: 5, alpha: 1 }, 600, egret.Ease.backOut);
        }, this, 550 * 1 + 600);
        egret.setTimeout(function () {
            egret.Tween.get(this.blackjackBtn).to({ x: 0, y: 245, alpha: 1 }, 600, egret.Ease.backOut);
        }, this, 550 * 1 + 800);
        egret.setTimeout(function () {
            egret.Tween.get(this.baccaratBtn).to({ x: 20 + 200, y: 245, alpha: 1 }, 600, egret.Ease.backOut);
        }, this, 550 * 1 + 1000);
        egret.setTimeout(function () {
            egret.Tween.get(this.slotBtn).to({ x: 20 + 400, y: 245, alpha: 1 }, 600, egret.Ease.backOut);
        }, this, 550 * 1 + 1200);
        egret.setTimeout(function () {
            egret.Tween.get(this.niuniuBtn).to({ x: 20 + 600, y: 245, alpha: 1 }, 600, egret.Ease.backOut);
        }, this, 550 * 1 + 1400);
        /*
        egret.setTimeout(function () {
            egret.Tween.get(this.btn2).to({x:this.w/2 - this.btn2.width/2},600,egret.Ease.backOut);
        }, this, 150*2);
        egret.setTimeout(function () {
            egret.Tween.get(this.btn3).to({x:this.w/2 - this.btn3.width/2},600,egret.Ease.backOut);
        }, this, 150*3);
        egret.setTimeout(function () {
            egret.Tween.get(this.btn4).to({x:this.w/2 - this.btn4.width/2},600,egret.Ease.backOut);
        }, this, 150*4);
        egret.setTimeout(function () {
            egret.Tween.get(this.btn5).to({x:this.w/2 - this.btn5.width/2},600,egret.Ease.backOut);
        }, this, 150*5);
        egret.setTimeout(function () {
            egret.Tween.get(this.btn6).to({x:this.w/2 - this.btn6.width/2},600,egret.Ease.backOut);
        }, this, 150*6);
        egret.setTimeout(function () {
            egret.Tween.get(this.btn7).to({x:this.w/2 - this.btn7.width/2},600,egret.Ease.backOut);
        }, this, 150*7);
        egret.setTimeout(function () {
            egret.Tween.get(this.btn8).to({x:this.w/2 - this.btn8.width/2},600,egret.Ease.backOut);
        }, this, 150*8);
        egret.setTimeout(function () {
            egret.Tween.get(this.btn9).to({x:this.w/2 - this.btn9.width/2},600,egret.Ease.backOut);
        }, this, 150*9);
        egret.setTimeout(function () {
            egret.Tween.get(this.btn10).to({x:this.w/2 - this.btn10.width/2},600,egret.Ease.backOut);
        }, this, 150*10);
        egret.setTimeout(function () {
            egret.Tween.get(this.bottomCopyRight).to({alpha:1},600);
            egret.Tween.get(this.menuBtn).to({alpha:1},600);
            egret.Tween.get(this.setBtn).to({alpha:1},600);
        }, this, 150*11);
        */
    };
    StartPanel.prototype.onLottery28BtnTouchTap = function (e) {
        Global.dispatchEvent(MainNotify.openLottery28PanelNotify, null, false);
        Global.dispatchEvent(MainNotify.closeStartPanelNotify, null, false);
    };
    StartPanel.prototype.onBlackjackBtnTouchTap = function (e) {
        // Global.dispatchEvent(MainNotify.openLottery28PanelNotify,null,false);
        // Global.dispatchEvent(MainNotify.closeStartPanelNotify,null,false);
    };
    StartPanel.prototype.onBaccaratBtnTouchTap = function (e) {
        // Global.dispatchEvent(MainNotify.openLottery28PanelNotify,null,false);
        // Global.dispatchEvent(MainNotify.closeStartPanelNotify,null,false);
    };
    StartPanel.prototype.onCrap9BtnTouchTap = function (e) {
        Global.dispatchEvent(MainNotify.openCrapPanelNotify, null, false);
        Global.dispatchEvent(MainNotify.closeStartPanelNotify, null, false);
    };
    StartPanel.prototype.onFishBtnTouchTap = function (e) {
        Global.dispatchEvent(MainNotify.openFishPanelNotify, null, false);
        Global.dispatchEvent(MainNotify.closeStartPanelNotify, null, false);
    };
    StartPanel.prototype.onWheelBtnTouchTap = function (e) {
        Global.dispatchEvent(MainNotify.openWheelPanelNotify, null, false);
        Global.dispatchEvent(MainNotify.closeStartPanelNotify, null, false);
    };
    StartPanel.prototype.onSlotBtnTouchTap = function (e) {
        // Global.dispatchEvent(MainNotify.openFishPanelNotify,null,false);
        // Global.dispatchEvent(MainNotify.closeStartPanelNotify,null,false);
    };
    StartPanel.prototype.onNiuniuBtnTouchTap = function (e) {
        // Global.dispatchEvent(MainNotify.openFishPanelNotify,null,false);
        // Global.dispatchEvent(MainNotify.closeStartPanelNotify,null,false);
    };
    StartPanel.prototype.onButtonBtnTouchTap = function (e) {
        Global.dispatchEvent(MainNotify.openButtonPanelNotify, null, false);
        Global.dispatchEvent(MainNotify.closeStartPanelNotify, null, false);
    };
    StartPanel.prototype.onImgBtnTouchTap = function (e) {
        // Global.dispatchEvent(MainNotify.openImgPanelNotify,null,false);
        // Global.dispatchEvent(MainNotify.closeStartPanelNotify,null,false);        
    };
    StartPanel.prototype.onPanelBtnTouchTap = function (e) {
        Global.dispatchEvent(MainNotify.openPanelPanelNotify, null, false);
        Global.dispatchEvent(MainNotify.closeStartPanelNotify, null, false);
    };
    StartPanel.prototype.onSceneBtnTouchTap = function (e) {
        Global.dispatchEvent(MainNotify.openScenePanelNotify, null, false);
        Global.dispatchEvent(MainNotify.closeStartPanelNotify, null, false);
    };
    StartPanel.prototype.onTipsBtnTouchTap = function (e) {
        Global.dispatchEvent(MainNotify.openTipsPanelNotify, null, false);
        Global.dispatchEvent(MainNotify.closeStartPanelNotify, null, false);
    };
    StartPanel.prototype.onShowTipsBtnTouchTap = function (e) {
        Global.dispatchEvent(MainNotify.openShowTipsPanelNotify, null, false);
        Global.dispatchEvent(MainNotify.closeStartPanelNotify, null, false);
    };
    StartPanel.prototype.onAddFriendBtnTouchTap = function (e) {
        Global.dispatchEvent(MainNotify.openAddFriendPanelNotify, 2, false);
    };
    StartPanel.prototype.onSetBtnTouchTap = function (e) {
        Global.dispatchEvent(MainNotify.openSetPanelNotify, 2, false);
    };
    StartPanel.prototype.onResourceLoadComplete = function (event) {
        // this.sound.play();
    };
    return StartPanel;
})(BasePanel);
StartPanel.prototype.__class__ = "StartPanel";
