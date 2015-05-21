var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameOverPanel = (function (_super) {
    __extends(GameOverPanel, _super);
    function GameOverPanel() {
        _super.call(this);
    }
    // 初始化面板
    GameOverPanel.prototype.initPanel = function () {
        this.bg = new egret.Bitmap();
        this.bg.texture = this.assets.getTexture("bg");
        this.addChild(this.bg);
        this.bg.touchEnabled = true;
        this.htmlTF = new HtmlText([["我是", 0xff0000], ["多颜色", 0x55ff00], ["文本", 0xff0000], ["组件", 0x55ff00]], 30, false, 1, 0xFFFFFF);
        this.htmlTF.x = this.w / 2 - this.htmlTF.width / 2;
        this.htmlTF.y = -350;
        this.addChild(this.htmlTF);
        this.alertTF = new HtmlText([["下面", 0xff0000], ["是", 0x55ff00], ["confirm", 0xff0000], ["组件", 0x55ff00]], 30, false, 1, 0xFFFFFF);
        this.alertTF.x = this.w / 2 - this.alertTF.width / 2;
        this.alertTF.y = 120;
        this.addChild(this.alertTF);
        this.alertTF.alpha = 0;
        this.tipsTF = new HtmlText([["下面", 0xff0000], ["是", 0x55ff00], ["tips飘字", 0xff0000], ["组件", 0x55ff00]], 30, false, 1, 0xFFFFFF);
        this.tipsTF.x = this.w / 2 - this.tipsTF.width / 2;
        this.tipsTF.y = this.h - 170;
        this.addChild(this.tipsTF);
        this.tipsTF.alpha = 0;
        this.helpBtn2 = new ImgButton("helpBtn", this.alert1, "", 30, 1);
        this.helpBtn2.x = 20;
        this.helpBtn2.y = 200;
        this.addChild(this.helpBtn2);
        this.helpBtn2.alpha = 0;
        this.shopBtn2 = new ImgButton("shopBtn", this.alert2, "", 30, 2);
        this.shopBtn2.x = 150;
        this.shopBtn2.y = 200;
        this.addChild(this.shopBtn2);
        this.shopBtn2.alpha = 0;
        this.fbBtn2 = new ImgButton("fbBtn", this.alert3, "", 30, 3);
        this.fbBtn2.x = 270;
        this.fbBtn2.y = 200;
        this.addChild(this.fbBtn2);
        this.fbBtn2.alpha = 0;
        this.setBtn2 = new ImgButton("setBtn", this.alert4, "设置", 30, 1);
        this.setBtn2.x = this.w - this.setBtn2.width - 20;
        this.setBtn2.y = 200;
        this.addChild(this.setBtn2);
        this.setBtn2.alpha = 0;
        this.startBtn = new ImgButton("startBtn", this.onStartBtnTouchTap);
        this.startBtn.x = this.w / 2 - this.startBtn.width / 2;
        this.startBtn.y = this.h / 2 - this.startBtn.height / 2;
        this.addChild(this.startBtn);
        this.startBtn.visible = false;
        this.helpBtn = new ImgButton("helpBtn", null, "", 30, 1);
        this.helpBtn.x = 20;
        this.helpBtn.y = this.h - this.helpBtn.height - 20;
        this.addChild(this.helpBtn);
        this.helpBtn.visible = false;
        this.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tipsEffect1, this);
        this.shopBtn = new ImgButton("shopBtn", this.tipsEffect2, "", 30, 2);
        this.shopBtn.x = 150;
        this.shopBtn.y = this.h - this.shopBtn.height - 20;
        this.addChild(this.shopBtn);
        this.shopBtn.visible = false;
        this.fbBtn = new ImgButton("fbBtn", this.tipsEffect3, "", 30, 3);
        this.fbBtn.x = 270;
        this.fbBtn.y = this.h - this.fbBtn.height - 20;
        this.addChild(this.fbBtn);
        this.fbBtn.visible = false;
        this.setBtn = new ImgButton("setBtn", this.tipsEffect4, "设置", 30, 1);
        this.setBtn.x = this.w - this.setBtn.width - 20;
        this.setBtn.y = this.h - this.setBtn.height - 20;
        this.addChild(this.setBtn);
        this.setBtn.visible = false;
        this.initEffect();
    };
    GameOverPanel.prototype.alert1 = function () {
        Global.confirm("提示", "我是一个confirm栗子，哈哈", null, null, 1);
    };
    GameOverPanel.prototype.alert2 = function () {
        Global.confirm("提示", "我是一个confirm栗子，哈哈", null, null, 2);
    };
    GameOverPanel.prototype.alert3 = function () {
        Global.confirm("提示", "我是一个confirm栗子，哈哈", null, null, 3);
    };
    GameOverPanel.prototype.alert4 = function () {
        Global.confirm("提示", "我是一个confirm栗子，哈哈", null, null, 4);
    };
    GameOverPanel.prototype.tipsEffect1 = function () {
        EffectUtils.showTips("this.startBtn", 1);
        window["grayscale"](this.helpBtn);
        this.helpBtn;
    };
    GameOverPanel.prototype.tipsEffect2 = function () {
        EffectUtils.showTips("this.startBtn", 2);
    };
    GameOverPanel.prototype.tipsEffect3 = function () {
        EffectUtils.showTips("this.startBtn", 4);
    };
    GameOverPanel.prototype.tipsEffect4 = function () {
        EffectUtils.showTips("this.startBtn", 5);
        egret.setTimeout(function () {
            EffectUtils.shakeScreen(2);
        }, this, 500);
    };
    GameOverPanel.prototype.initEffect = function () {
        this.htmlTF.y = -350;
        this.startBtn.alpha = 0;
        this.helpBtn.y = this.h + 150;
        this.shopBtn.y = this.h + 150;
        this.fbBtn.y = this.h + 150;
        this.setBtn.y = this.h + 150;
        var onComplete = function () {
            egret.Tween.get(this.startBtn).to({ alpha: 1 }, 300);
            egret.Tween.get(this.alertTF).to({ alpha: 1 }, 300);
            egret.Tween.get(this.tipsTF).to({ alpha: 1 }, 300);
            egret.Tween.get(this.setBtn2).to({ alpha: 1 }, 300);
            egret.Tween.get(this.fbBtn2).to({ alpha: 1 }, 300);
            egret.Tween.get(this.shopBtn2).to({ alpha: 1 }, 300);
            egret.Tween.get(this.helpBtn2).to({ alpha: 1 }, 300);
            egret.Tween.get(this.setBtn).to({ y: this.h - this.setBtn.height - 20 }, 300, egret.Ease.backOut);
            egret.Tween.get(this.fbBtn).to({ y: this.h - this.fbBtn.height - 20 }, 300, egret.Ease.backOut);
            egret.Tween.get(this.shopBtn).to({ y: this.h - this.shopBtn.height - 20 }, 300, egret.Ease.backOut);
            egret.Tween.get(this.helpBtn).to({ y: this.h - this.helpBtn.height - 20 }, 300, egret.Ease.backOut);
        };
        this.htmlTF.visible = true;
        this.startBtn.visible = true;
        this.helpBtn.visible = true;
        this.shopBtn.visible = true;
        this.fbBtn.visible = true;
        this.setBtn.visible = true;
        egret.Tween.get(this.htmlTF).to({ y: 60 }, 600, egret.Ease.backOut).call(onComplete, this);
    };
    GameOverPanel.prototype.onStartBtnTouchTap = function (e) {
        Global.dispatchEvent(MainNotify.openStartPanelNotify, null, false);
        Global.dispatchEvent(MainNotify.closeGameOverPanelNotify, null, false);
    };
    return GameOverPanel;
})(BasePanel);
GameOverPanel.prototype.__class__ = "GameOverPanel";
