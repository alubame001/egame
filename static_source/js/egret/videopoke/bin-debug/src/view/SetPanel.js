var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var SetPanel = (function (_super) {
    __extends(SetPanel, _super);
    function SetPanel() {
        _super.call(this);
    }
    // 初始化面板
    SetPanel.prototype.initPanel = function () {
        this.bg = new egret.Bitmap();
        this.bg.texture = this.assets.getTexture("alertBg");
        this.addChild(this.bg);
        this.bg.touchEnabled = true;
        this.cancelBtn = new ImgButton("cancelBtn", this.onCancelBtnTouchTap);
        this.cancelBtn.x = this.getWidth() - this.cancelBtn.width - 20;
        this.cancelBtn.y = 20;
        this.addChild(this.cancelBtn);
        this.htmlTF1 = new HtmlText([["如果是程序员选择", 0xFFFFFF, 22], ["俺是程序猿", 0x5eff00, 22]], 30, false, 1, 0xFFFFFF);
        this.htmlTF1.x = this.getWidth() / 2 - this.htmlTF1.width / 2;
        this.htmlTF1.y = 70;
        this.addChild(this.htmlTF1);
        this.htmlTF2 = new HtmlText([["如果不是程序员请选择", 0xFFFFFF, 22], ["策划萌妹子", 0x5eff00, 22]], 30, false, 1, 0xFFFFFF);
        this.htmlTF2.x = this.getWidth() / 2 - this.htmlTF2.width / 2;
        this.htmlTF2.y = 110;
        this.addChild(this.htmlTF2);
        if (GlobalData.isEngineer) {
            this.softEngineerBtn = new ImgButton("bigYellowBtn", null, "俺是程序猿", 30);
        }
        else {
            this.softEngineerBtn = new ImgButton("bigYellowBtn", null, "策划萌妹子", 30);
        }
        this.softEngineerBtn.x = this.getWidth() / 2 - this.softEngineerBtn.width / 2;
        this.softEngineerBtn.y = 155;
        this.addChild(this.softEngineerBtn);
        this.softEngineerBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSoftEngineerBtnTouchTap, this);
    };
    SetPanel.prototype.onCancelBtnTouchTap = function (e) {
        Global.dispatchEvent(MainNotify.closeSetPanelNotify, 1, false);
    };
    SetPanel.prototype.onSoftEngineerBtnTouchTap = function (e) {
        if (GlobalData.isEngineer) {
            // this.softEngineerBtn.setSelect(false);
            GlobalData.isEngineer = false;
            this.softEngineerBtn.setText("策划萌妹子");
        }
        else {
            GlobalData.isEngineer = true;
            ;
            // this.softEngineerBtn.setSelect(true);
            this.softEngineerBtn.setText("俺是程序猿");
        }
        egret.localStorage.setItem("isEngineer", GlobalData.isEngineer + "");
    };
    return SetPanel;
})(BasePanel);
SetPanel.prototype.__class__ = "SetPanel";
