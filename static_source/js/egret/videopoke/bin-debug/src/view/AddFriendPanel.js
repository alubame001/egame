var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AddFriendPanel = (function (_super) {
    __extends(AddFriendPanel, _super);
    function AddFriendPanel() {
        _super.call(this);
    }
    // 初始化面板
    AddFriendPanel.prototype.initPanel = function () {
        this.bg = new egret.Bitmap();
        this.bg.texture = this.assets.getTexture("addBg");
        this.addChild(this.bg);
        this.bg.touchEnabled = true;
        this.cancelBtn = new ImgButton("cancelBtn", this.onCancelBtnTouchTap);
        this.cancelBtn.x = this.getWidth() - this.cancelBtn.width - 10;
        this.cancelBtn.y = 10;
        this.addChild(this.cancelBtn);
    };
    AddFriendPanel.prototype.onCancelBtnTouchTap = function (e) {
        Global.dispatchEvent(MainNotify.closeAddFriendPanelNotify, 1, false);
    };
    return AddFriendPanel;
})(BasePanel);
AddFriendPanel.prototype.__class__ = "AddFriendPanel";
