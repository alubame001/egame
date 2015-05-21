var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MenueUI = (function (_super) {
    __extends(MenueUI, _super);
    function MenueUI(stageW, stageH) {
        _super.call(this);
        this.imgs = RES.getRes("asserts");
        this.w = 0;
        this.h = 0;
        this.spr = new egret.Sprite();
        this.w = stageW;
        this.h = stageH;
        this.createView();
    }
    MenueUI.prototype.createView = function () {
        //绘制一个透明度为1的绿色矩形，宽高为100*80
        this.spr.graphics.beginFill(0x403e3e, 0);
        this.spr.graphics.drawRect(0, 0, 400, 400);
        this.spr.graphics.endFill();
        this.spr.width = 400;
        this.spr.height = 400;
        this.addChild(this.spr);
        this.spr.alpha = 0;

        this.bg2 = new LineUI(72, 400, "", "gun07_1");
        this.bg2.x = this.spr.width / 2 - this.bg2.width / 2 + 7;
        this.bg2.y = 3;
        this.addChild(this.bg2);

        this.bg1 = new LineUI(72, 350, "", "gun06_1");
        this.bg1.x = this.bg2.x - this.bg2.width - 18;
        this.bg1.y = 32;
        this.addChild(this.bg1);

        this.bg3 = new LineUI(72, 350, "", "gun08_1");
        this.bg3.x = this.bg2.x + this.bg2.width + 12 + 8;
        this.addChild(this.bg3);
        this.bg3.y = 32;

        this.startBtn1 = new LineUI(400, 72, "开始玩耍", "gun02_2");
        this.startBtn1.x = this.spr.width / 2 - this.startBtn1.width / 2 + 8;
        this.startBtn1.y = 52;
        this.addChild(this.startBtn1);
        this.startBtn1.touchEnabled = true;
        this.startBtn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartBtn1TouchTap, this);

        this.startBtn2 = new LineUI(400, 72, "更多玩法【即将到来】", "gun09_2");
        this.startBtn2.x = this.spr.width / 2 - this.startBtn1.width / 2 + 8;
        this.startBtn2.y = this.startBtn1.y + this.startBtn1.height + 6;
        this.addChild(this.startBtn2);
        this.startBtn2.touchEnabled = true;
        this.startBtn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartBtn2TouchTap, this);

        this.startBtn3 = new LineUI(400, 72, "召唤小伙伴", "gun10_2");
        this.startBtn3.x = this.spr.width / 2 - this.startBtn1.width / 2 + 8;
        this.startBtn3.y = this.startBtn2.y + this.startBtn2.height + 6;
        this.addChild(this.startBtn3);
        this.startBtn3.touchEnabled = true;
        this.startBtn3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartBtn3TouchTap, this);

        this.startBtn4 = new LineUI(400, 72, "关于我们", "gun05_2");
        this.startBtn4.x = this.spr.width / 2 - this.startBtn1.width / 2 + 8;
        this.startBtn4.y = this.startBtn3.y + this.startBtn3.height + 6;
        this.addChild(this.startBtn4);
        this.startBtn4.touchEnabled = true;
        this.startBtn4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartBtn4TouchTap, this);
    };

    //经典
    MenueUI.prototype.onStartBtn1TouchTap = function (e) {
        this.hideCartoon();
        this.dispatchEvent(new egret.Event("hideMenue1"));
    };

    //限时
    MenueUI.prototype.onStartBtn2TouchTap = function (e) {
        //    this.hideCartoon();
        // this.dispatchEvent(new egret.Event("hideMenue2"));
    };

    //无尽
    MenueUI.prototype.onStartBtn3TouchTap = function (e) {
        // this.hideCartoon();
        this.dispatchEvent(new egret.Event("onShare"));
    };

    //connect
    MenueUI.prototype.onStartBtn4TouchTap = function (e) {
        //    this.hideCartoon();
        // this.dispatchEvent(new egret.Event("hideMenue4"));
    };

    //消失动画
    MenueUI.prototype.hideCartoon = function () {
        egret.Tween.get(this.startBtn1).to({ x: this.startBtn1.x - 500 }, 500, egret.Ease.backInOut);
        egret.Tween.get(this.startBtn3).to({ x: this.startBtn3.x - 500 }, 500, egret.Ease.backInOut);

        egret.Tween.get(this.startBtn2).to({ x: this.startBtn2.x + 500 }, 500, egret.Ease.backInOut);
        egret.Tween.get(this.startBtn4).to({ x: this.startBtn4.x + 500 }, 500, egret.Ease.backInOut);

        egret.Tween.get(this.bg1).to({ y: this.bg1.y - 800 }, 500, egret.Ease.backInOut);
        egret.Tween.get(this.bg3).to({ y: this.bg3.y - 800 }, 500, egret.Ease.backInOut);

        egret.Tween.get(this.bg2).to({ y: this.bg2.y + 800 }, 500, egret.Ease.backInOut);
    };

    //显示动画
    MenueUI.prototype.showCartoon = function () {
        egret.Tween.get(this.startBtn1).to({ x: this.startBtn1.x + 500 }, 500, egret.Ease.backInOut);
        egret.Tween.get(this.startBtn3).to({ x: this.startBtn3.x + 500 }, 500, egret.Ease.backInOut);

        egret.Tween.get(this.startBtn2).to({ x: this.startBtn2.x - 500 }, 500, egret.Ease.backInOut);
        egret.Tween.get(this.startBtn4).to({ x: this.startBtn4.x - 500 }, 500, egret.Ease.backInOut);

        egret.Tween.get(this.bg1).to({ y: this.bg1.y + 800 }, 500, egret.Ease.backInOut);
        egret.Tween.get(this.bg3).to({ y: this.bg3.y + 800 }, 500, egret.Ease.backInOut);

        egret.Tween.get(this.bg2).to({ y: this.bg2.y - 800 }, 500, egret.Ease.backInOut);
    };
    return MenueUI;
})(egret.Sprite);
