var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var RoleRender = (function (_super) {
    __extends(RoleRender, _super);
    function RoleRender(stageW, stageH, roleNum) {
        _super.call(this);
        this.imgs = RES.getRes("asserts");
        this.w = 0;
        this.h = 0;
        this.roleNum = 0;
        this.role = new egret.Bitmap();
        this.roleName = new egret.Bitmap();
        this.checkNo = new egret.Bitmap();
        this.checkSect = new egret.Bitmap();
        this.kuang = new egret.Bitmap();
        this.w = stageW;
        this.h = stageH;
        this.roleNum = roleNum;
        this.createView();
    }
    RoleRender.prototype.createView = function () {
        this.kuang.texture = this.imgs.getTexture("guangQuanImg");
        this.kuang.x = -12;
        this.kuang.y = -12;
        this.addChild(this.kuang);
        this.kuang.visible = false;
        this.checkNo.texture = this.imgs.getTexture("kuang2");
        this.checkNo.x = -5;
        this.checkNo.y = -6;
        this.addChild(this.checkNo);
        this.role.texture = this.imgs.getTexture("role" + this.roleNum);
        this.addChild(this.role);
        this.roleName.texture = this.imgs.getTexture("roleName" + this.roleNum);
        this.roleName.y = 100;
        this.roleName.x = 85 / 2 - this.roleName.width / 2;
        this.addChild(this.roleName);
        this.checkSect.texture = this.imgs.getTexture("kuang2");
        this.checkSect.x = -5;
        this.checkSect.y = -6;
        this.addChild(this.checkSect);
        // this.checkSect.visible = false;      
        this.role.touchEnabled = true;
        this.role.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelectBtnTouchTap, this);
    };
    RoleRender.prototype.setSelect = function (bool) {
        // this.checkNo.visible = !bool;
        this.checkSect.visible = !bool;
        this.kuang.visible = bool;
    };
    RoleRender.prototype.onSelectBtnTouchTap = function (e) {
        // this.checkNo.visible = !this.checkNo.visible;
        this.kuang.visible = !this.kuang.visible;
        this.checkSect.visible = !this.checkSect.visible;
        this.dispatchEvent(new egret.Event("onSelectBtnEvent"));
    };
    return RoleRender;
})(egret.Sprite);
