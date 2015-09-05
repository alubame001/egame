var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DarkSlotPanel = (function (_super) {
    __extends(DarkSlotPanel, _super);
    function DarkSlotPanel() {
        _super.call(this);
        /* ↓↓↓↓↓↓↓↓↓↓↓↓↓↓是引用此class需修改的*/
        //public initPanel():void{}
        //public initEffect():void{}
        //public showResult(str:string):void{}   
        //public odds :number[]=[1000,333,166,100,66,48,36,28,22,18]
        /* ↑↑↑↑↑↑↑↑↑↑↑↑是引用此class需修改的*/
        this.slot_assets_name = "lottery28";
        this.min_bet = 0;
        this.base_bet = 100;
        this.websocket_delay = 500;
        this.sound = RES.getRes("sound");
        this.slotNumber = 12;
        this.game_cname = "幸运28";
        this.game_ename = "Lucky28";
        this.game_kind = "lottery28";
        this.myBet = { name: "slot", kind: this.game_kind, total: 0, lucky: "", shash: "", nonce: "", ckey: "", pick: [], pk: [] };
    }
    DarkSlotPanel.prototype.initPanel = function () {
        this.bg = new egret.Bitmap();
        this.bg.texture = RES.getRes("darkslot_bg");
        this.addChild(this.bg);
        this.bg.touchEnabled = false;
        this.slot1 = new EDarkSlot(this, "1", null, "", 20, 4, "darkslot3");
        this.slot1.x = 145;
        this.slot1.y = 167;
        this.slot1.alpha = 1; //78+5;
        this.addChild(this.slot1);
        this.slot2 = new EDarkSlot(this, "1", null, "", 20, 4, "darkslot3");
        this.slot2.x = 323;
        this.slot2.y = 167;
        this.slot2.alpha = 1; //78+5;
        this.addChild(this.slot2);
        this.slot3 = new EDarkSlot(this, "1", null, "", 20, 4, "darkslot3");
        this.slot3.x = 501;
        this.slot3.y = 167;
        this.slot3.alpha = 1; //78+5;
        this.addChild(this.slot3);
        this.frame1 = new EButton(this, "frame1", null, "", 20, 4, "darkslot3");
        this.frame1.x = 0; //38+5;
        this.frame1.y = 0; // 186+5;
        this.addChild(this.frame1);
        this.frame1.alpha = 1;
        this.frame1.touchEnabled = false;
        this.frame2 = new EButton(this, "frame2", null, "", 20, 4, "darkslot3");
        this.frame2.x = 0; //38+5;
        this.frame2.y = 0; // 186+5;
        this.addChild(this.frame2);
        this.frame2.alpha = 1;
        this.frame2.touchEnabled = false;
        this.frame3 = new EButton(this, "frame3", null, "", 20, 4, "darkslot3");
        this.frame3.x = 0; //38+5;
        this.frame3.y = 0; // 186+5;
        this.addChild(this.frame3);
        this.frame3.alpha = 1;
        this.frame3.touchEnabled = false;
        this.eBackGround = new EButton(this, "base_frame", null, "", 20, 4, "darkslot3");
        this.eBackGround.x = 0; //38+5;
        this.eBackGround.y = 0; // 186+5;
        this.addChild(this.eBackGround);
        this.eBackGround.alpha = 1;
        this.eBackGround.touchEnabled = false;
        this.frame1.alpha = 0;
        this.frame2.alpha = 0;
        this.frame3.alpha = 0;
    };
    DarkSlotPanel.prototype.onChooseStage = function (e) {
        this.disconnenct();
        Global.dispatchEvent(MainNotify.openStartPanelNotify, null, false);
        Global.dispatchEvent(MainNotify.closeDarkSlotPanelNotify, null, false);
    };
    return DarkSlotPanel;
})(GamePanel);
DarkSlotPanel.prototype.__class__ = "DarkSlotPanel";
