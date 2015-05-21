var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ButtonPanel = (function (_super) {
    __extends(ButtonPanel, _super);
    function ButtonPanel() {
        _super.call(this);
    }
    // 初始化面板
    ButtonPanel.prototype.initPanel = function () {
        this.bg = new egret.Bitmap();
        this.bg.texture = this.assets.getTexture("bg");
        this.addChild(this.bg);
        this.bg.touchEnabled = true;
        this.logoImg = new egret.Bitmap();
        this.logoImg.texture = this.assets.getTexture("logoImg");
        this.logoImg.anchorX = 0.5;
        this.logoImg.anchorY = 1;
        this.logoImg.x = this.w / 2;
        this.logoImg.y = -350;
        ;
        this.addChild(this.logoImg);
        this.menuBtn = new ImgButton("menueBtn", this.onMenuBtnTouchTap, "", 30, 1);
        this.menuBtn.x = 20;
        this.menuBtn.y = 20;
        this.addChild(this.menuBtn);
        this.menuBtn.alpha = 0;
        this.setBtn = new ImgButton("setBtn", this.onSetBtnTouchTap);
        this.setBtn.x = this.w - this.setBtn.width - 20;
        this.setBtn.y = 20;
        this.addChild(this.setBtn);
        this.setBtn.alpha = 0;
        this.buttonBtn = new ImgButton("bigYellowBtn", this.onButtonBtnTouchTap, "按钮特效1", 30, 1);
        this.buttonBtn.x = -300;
        this.buttonBtn.y = 270;
        this.addChild(this.buttonBtn);
        this.imgBtn = new ImgButton("bigYellowBtn", this.onImgBtnTouchTap, "按钮特效2", 30, 2);
        this.imgBtn.x = -300;
        this.imgBtn.y = this.buttonBtn.y + 90;
        this.addChild(this.imgBtn);
        this.panelBtn = new ImgButton("bigYellowBtn", this.onPanelBtnTouchTap, "按钮特效3", 30, 3);
        this.panelBtn.x = -300;
        this.panelBtn.y = this.imgBtn.y + 90;
        this.addChild(this.panelBtn);
        this.sceneBtn = new ImgButton("bigYellowBtn", this.onSceneBtnTouchTap, "待续", 30);
        this.sceneBtn.x = -300;
        this.sceneBtn.y = this.panelBtn.y + 90;
        this.addChild(this.sceneBtn);
        this.tipsBtn = new ImgButton("bigYellowBtn", this.onTipsBtnTouchTap, "待续", 30);
        this.tipsBtn.x = -300;
        this.tipsBtn.y = this.h / 2 - this.tipsBtn.height / 2;
        this.tipsBtn.y = this.sceneBtn.y + 90;
        this.addChild(this.tipsBtn);
        this.bottomCopyRight = new egret.Bitmap();
        this.bottomCopyRight.texture = this.assets.getTexture("bottomCopyRight");
        this.bottomCopyRight.x = this.w / 2 - this.bottomCopyRight.width / 2;
        this.bottomCopyRight.y = this.h - this.bottomCopyRight.height;
        this.addChild(this.bottomCopyRight);
        this.bottomCopyRight.alpha = 0;
        this.initEffect();
    };
    ButtonPanel.prototype.initEffect = function () {
        egret.Tween.get(this.logoImg).to({ y: 60 + this.logoImg.height }, 600, egret.Ease.backOut);
        egret.setTimeout(function () {
            egret.Tween.get(this.buttonBtn).to({ x: this.w / 2 - this.buttonBtn.width / 2 }, 600, egret.Ease.backOut);
        }, this, 150 * 1);
        egret.setTimeout(function () {
            egret.Tween.get(this.imgBtn).to({ x: this.w / 2 - this.imgBtn.width / 2 }, 600, egret.Ease.backOut);
        }, this, 150 * 2);
        egret.setTimeout(function () {
            egret.Tween.get(this.panelBtn).to({ x: this.w / 2 - this.panelBtn.width / 2 }, 600, egret.Ease.backOut);
        }, this, 150 * 3);
        egret.setTimeout(function () {
            egret.Tween.get(this.sceneBtn).to({ x: this.w / 2 - this.sceneBtn.width / 2 }, 600, egret.Ease.backOut);
        }, this, 150 * 4);
        egret.setTimeout(function () {
            egret.Tween.get(this.tipsBtn).to({ x: this.w / 2 - this.tipsBtn.width / 2 }, 600, egret.Ease.backOut);
        }, this, 150 * 5);
        egret.setTimeout(function () {
            egret.Tween.get(this.bottomCopyRight).to({ alpha: 1 }, 600);
            egret.Tween.get(this.menuBtn).to({ alpha: 1 }, 600);
            egret.Tween.get(this.setBtn).to({ alpha: 1 }, 600);
        }, this, 150 * 6);
    };
    ButtonPanel.prototype.onButtonBtnTouchTap = function (e) {
        if (GlobalData.isEngineer) {
            Global.alert("用法", 'new ImgButton("bigYellowBtn",this.onButtonBtnTouchTap,"按钮特效1",30,1);', null, 1);
        }
    };
    ButtonPanel.prototype.onImgBtnTouchTap = function (e) {
        if (GlobalData.isEngineer) {
            Global.alert("用法", 'new ImgButton("bigYellowBtn",this.onButtonBtnTouchTap,"按钮特效1",30,2);', null, 1);
        }
    };
    ButtonPanel.prototype.onPanelBtnTouchTap = function (e) {
        if (GlobalData.isEngineer) {
            Global.alert("用法", 'new ImgButton("bigYellowBtn",this.onButtonBtnTouchTap,"按钮特效1",30,3);', null, 1);
        }
    };
    ButtonPanel.prototype.onSceneBtnTouchTap = function (e) {
    };
    ButtonPanel.prototype.onTipsBtnTouchTap = function (e) {
    };
    ButtonPanel.prototype.onMenuBtnTouchTap = function () {
        Global.dispatchEvent(MainNotify.openStartPanelNotify, null, false);
        Global.dispatchEvent(MainNotify.closeButtonPanelNotify, null, false);
    };
    ButtonPanel.prototype.onSetBtnTouchTap = function (e) {
        Global.dispatchEvent(MainNotify.openSetPanelNotify, 2, false);
    };
    return ButtonPanel;
})(BasePanel);
ButtonPanel.prototype.__class__ = "ButtonPanel";
