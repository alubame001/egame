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
        this.w = 998;
        this.h = 480;
        this.bg = new egret.Bitmap();
        this.bg.texture = RES.getRes("");
        this.addChild(this.bg);
        this.bg.touchEnabled = false;
        this.progress1 = new ECircle(this, "icon_lucky28", this.onLottery28BtnTouchTap, "", 20, 4, "circle");
        this.progress1.x = 600; //294+5;
        this.progress1.y = 0; //78+5;
        this.progress1.alpha = 0; //78+5;
        this.progress1.textField2.text = "幸运28";
        this.addChild(this.progress1);
        this.progress2 = new ECircle(this, "icon_ghost", this.onCrap9BtnTouchTap, "", 20, 4, "circle");
        this.progress2.x = 600; //294+5;
        this.progress2.y = 0; //78+5;
        this.progress2.alpha = 0; //78+5;
        this.progress2.textField2.text = "魔九";
        this.addChild(this.progress2);
        this.progress3 = new ECircle(this, "icon_12", this.onWheelBtnTouchTap, "", 20, 4, "circle");
        this.progress3.x = 600; //294+5;
        this.progress3.y = 0; //78+5;
        this.progress3.alpha = 0; //78+5;
        this.progress3.textField2.text = "十二生肖";
        this.addChild(this.progress3);
        this.progress4 = new ECircle(this, "icon_fish", this.onWheelBtnTouchTap, "", 20, 4, "circle");
        this.progress4.x = 600; //294+5;
        this.progress4.y = 0; //78+5;
        this.progress4.alpha = 0; //78+5;
        this.progress4.textField2.text = "捕鱼达人";
        this.addChild(this.progress4);
        this.progress5 = new ECircle(this, "icon_coming", this.onDarkSlotBtnTouchTap, "", 20, 4, "circle");
        this.progress5.x = 600; //294+5;
        this.progress5.y = 245; //78+5;
        this.progress5.alpha = 0; //78+5;
        this.progress5.textField2.text = "老虎机";
        this.addChild(this.progress5);
        this.progress6 = new ECircle(this, "icon_coming", this.onTitanSlotBtnTouchTap, "", 20, 4, "circle");
        this.progress6.x = 600; //294+5;
        this.progress6.y = 245; //78+5;
        this.progress6.alpha = 0; //78+5;
        this.progress6.textField2.text = "泰坦";
        this.addChild(this.progress6);
        this.progress7 = new ECircle(this, "icon_coming", null, "", 20, 4, "circle");
        this.progress7.x = 600; //294+5;
        this.progress7.y = 245; //78+5;
        this.progress7.alpha = 0; //78+5;
        this.progress7.textField2.text = "21点";
        this.addChild(this.progress7);
        this.progress8 = new ECircle(this, "icon_coming", null, "", 20, 4, "circle");
        this.progress8.x = 600; //294+5;
        this.progress8.y = 245; //78+5;
        this.progress8.alpha = 0; //78+5;
        this.progress8.textField2.text = "牛牛";
        this.addChild(this.progress8);
        /*
        this.progress2 = new ECircle(this,"icon_ghost",this.onCrap9BtnTouchTap,"",20,4,"circle");
        this.progress2.x = 600;//294+5;
        this.progress2.y = 0;//78+5;
        this.progress2.alpha = 0;//78+5;
         this.progress2.textField2.text ="魔九";
        this.addChild(this.progress2);

        
        this.progress3 = new ECircle(this,"icon_12",this.onWheelBtnTouchTap,"",20,4,"circle");
        this.progress3.x = 600;//294+5;
        this.progress3.y = 0;//78+5;
        this.progress3.alpha = 0;//78+5;
         this.progress3.textField2.text ="十二生肖";
        this.addChild(this.progress3);

        this.progress4 = new ECircle(this,"icon_fish",this.onWheelBtnTouchTap,"",20,4,"circle");
        this.progress4.x = 600;//294+5;
        this.progress4.y = 0;//78+5;
        this.progress4.alpha = 0;//78+5;
         this.progress4.textField2.text ="捕鱼达人";
        this.addChild(this.progress4);
        */
        /*
                this.lottery28Btn = new EMenu(this,"lottery28",this.onLottery28BtnTouchTap,"",20,4,"menu");
                this.lottery28Btn.x = 0;//294+5;
                this.lottery28Btn.y = 0;//78+5;
                this.lottery28Btn.alpha = 0;//78+5;
                this.lottery28Btn.textField2.text ="幸运28";
               // this.lottery28Btn.textField2.size =20;
        
                this.addChild(this.lottery28Btn);
        
                this.crap9Btn = new EMenu(this,"crap9",this.onCrap9BtnTouchTap,"",20,4,"menu");
                this.crap9Btn.x = 20+200;//294+5;
                this.crap9Btn.y = 0;//78+5;
                this.crap9Btn.alpha = 0;//78+5;
                 this.crap9Btn.textField2.text ="魔九";
                this.addChild(this.crap9Btn);
        
                this.fishBtn = new EMenu(this,"fish",this.onFishBtnTouchTap,"",20,4,"menu");
                this.fishBtn.x = 20+400;//294+5;
                this.fishBtn.y = 0;//78+5;
                this.fishBtn.alpha = 0;//78+5;
                this.fishBtn.textField2.text ="捕鱼达人";
                this.addChild(this.fishBtn);
                
                this.wheelBtn = new EMenu(this,"12",this.onWheelBtnTouchTap,"",20,4,"menu");
                this.wheelBtn.x = 20+600;//294+5;
                this.wheelBtn.y = 0;//78+5;
                this.wheelBtn.alpha = 0;//78+5;
                 this.wheelBtn.textField2.text ="十二生肖";
                this.addChild(this.wheelBtn);
        
        
        
                this.blackjackBtn = new EMenu(this,"blackjack",null,"",20,4,"menu");
                this.blackjackBtn.x = 0;//294+5;
                this.blackjackBtn.y = 220;//78+5;
                this.blackjackBtn.alpha = 0;//78+5;
                this.blackjackBtn.textField2.text ="21点";
                this.addChild(this.blackjackBtn);
        
                this.baccaratBtn = new EMenu(this,"baccarat",null,"",20,4,"menu");
                this.baccaratBtn.x = 20+200;//294+5;
                this.baccaratBtn.y = 220;//78+5;
                this.baccaratBtn.alpha = 0;//78+5;
                 this.baccaratBtn.textField2.text ="百家乐";
                this.addChild(this.baccaratBtn);
        
                this.slotBtn = new EMenu(this,"slot",null,"",20,4,"menu");
                this.slotBtn.x = 20+400;//294+5;
                this.slotBtn.y = 220;//78+5;
                this.slotBtn.alpha = 0;//78+5;
                this.slotBtn.textField2.text ="海盗船";
                this.addChild(this.slotBtn);
                
                this.niuniuBtn = new EMenu(this,"niuniu",null,"",20,4,"menu");
                this.niuniuBtn.x = 20+600;//294+5;
                this.niuniuBtn.y = 220;//78+5;
                this.niuniuBtn.alpha = 0;//78+5;
                 this.niuniuBtn.textField2.text ="牛牛";
                this.addChild(this.niuniuBtn);
        */
        this.initEffect();
    };
    StartPanel.prototype.initEffect = function () {
        egret.setTimeout(function () {
            egret.Tween.get(this.progress1).to({ x: 0, y: 5, alpha: 1 }, 600, egret.Ease.backOut);
        }, this, 550 * 1);
        egret.setTimeout(function () {
            egret.Tween.get(this.progress2).to({ x: 200, y: 5, alpha: 1 }, 600, egret.Ease.backOut);
        }, this, 550 * 1 + 200);
        egret.setTimeout(function () {
            egret.Tween.get(this.progress3).to({ x: 400, y: 5, alpha: 1 }, 600, egret.Ease.backOut);
        }, this, 550 * 1 + 400);
        egret.setTimeout(function () {
            egret.Tween.get(this.progress4).to({ x: 600, y: 5, alpha: 1 }, 600, egret.Ease.backOut);
        }, this, 550 * 1 + 600);
        egret.setTimeout(function () {
            egret.Tween.get(this.progress5).to({ x: 0, y: 245, alpha: 1 }, 600, egret.Ease.backOut);
        }, this, 550 * 1 + 800);
        egret.setTimeout(function () {
            egret.Tween.get(this.progress6).to({ x: 200, y: 245, alpha: 1 }, 600, egret.Ease.backOut);
        }, this, 550 * 1 + 1000);
        egret.setTimeout(function () {
            egret.Tween.get(this.progress7).to({ x: 400, y: 245, alpha: 1 }, 600, egret.Ease.backOut);
        }, this, 550 * 1 + 1200);
        egret.setTimeout(function () {
            egret.Tween.get(this.progress8).to({ x: 600, y: 245, alpha: 1 }, 600, egret.Ease.backOut);
        }, this, 550 * 1 + 1400);
        /*





        egret.setTimeout(function () {
            egret.Tween.get(this.lottery28Btn)
            .to({ x: 0, y:5,alpha:1},600,egret.Ease.backOut);
        }, this, 550*1);

        egret.setTimeout(function () {
            egret.Tween.get(this.crap9Btn)
            .to({ x: 20+200, y:5,alpha:1},600,egret.Ease.backOut);
        }, this, 550*1+200);

        egret.setTimeout(function () {
            egret.Tween.get(this.fishBtn)
            .to({ x: 20+400, y:5,alpha:1},600,egret.Ease.backOut);
        }, this, 550*1+400);


        egret.setTimeout(function () {
            egret.Tween.get(this.wheelBtn)
            .to({ x: 20+600, y:5,alpha:1},600,egret.Ease.backOut);
        }, this, 550*1+600);




        egret.setTimeout(function () {
            egret.Tween.get(this.blackjackBtn)
            .to({ x: 0, y:245,alpha:1},600,egret.Ease.backOut);
        }, this, 550*1+800);
        egret.setTimeout(function () {
            egret.Tween.get(this.baccaratBtn)
            .to({ x: 20+200, y:245,alpha:1},600,egret.Ease.backOut);
        }, this, 550*1+1000);

        egret.setTimeout(function () {
            egret.Tween.get(this.slotBtn)
            .to({ x: 20+400, y:245,alpha:1},600,egret.Ease.backOut);
        }, this, 550*1+1200);


        egret.setTimeout(function () {
            egret.Tween.get(this.niuniuBtn)
            .to({ x: 20+600, y:245,alpha:1},600,egret.Ease.backOut);
        }, this, 550*1+1400);
*/
    };
    StartPanel.prototype.onSubResourceLoadComplete = function (event) {
        // console.log("onSubResourceLoadComplete:",event.groupName)
        //   PopUpManager.removePopUp(this.loadingView);
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onSubResourceLoadComplete, this);
        if (event.groupName == "lottery28_load") {
            Global.dispatchEvent(MainNotify.openLottery28PanelNotify, null, false);
            Global.dispatchEvent(MainNotify.closeStartPanelNotify, null, false);
        }
        else if (event.groupName == "crap9_load") {
            Global.dispatchEvent(MainNotify.openCrapPanelNotify, null, false);
            Global.dispatchEvent(MainNotify.closeStartPanelNotify, null, false);
        }
        else if (event.groupName == "wheel_load") {
            Global.dispatchEvent(MainNotify.openWheelPanelNotify, null, false);
            Global.dispatchEvent(MainNotify.closeStartPanelNotify, null, false);
        }
        else if (event.groupName == "fish_load") {
            Global.dispatchEvent(MainNotify.openFishPanelNotify, null, false);
            Global.dispatchEvent(MainNotify.closeStartPanelNotify, null, false);
        }
        else if (event.groupName == "darkslot_load") {
            Global.dispatchEvent(MainNotify.openDarkSlotPanelNotify, null, false);
            Global.dispatchEvent(MainNotify.closeStartPanelNotify, null, false);
        }
        else if (event.groupName == "darkslot3_load") {
            Global.dispatchEvent(MainNotify.openDarkSlotPanelNotify, null, false);
            Global.dispatchEvent(MainNotify.closeStartPanelNotify, null, false);
        }
        else if (event.groupName == "titanslot_load") {
            Global.dispatchEvent(MainNotify.openTitanSlotPanelNotify, null, false);
            Global.dispatchEvent(MainNotify.closeStartPanelNotify, null, false);
        }
    };
    StartPanel.prototype.onLottery28BtnTouchTap = function (e) {
        //  PopUpManager.removePopUp(this.loadingView);
        //     this.loadingPanel = new LoadingPanel();
        //   PopUpManager.addPopUp(this.loadingPanel);
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onSubResourceLoadComplete, this);
        RES.loadGroup("lottery28_load");
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
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onSubResourceLoadComplete, this);
        RES.loadGroup("crap9_load");
        // Global.dispatchEvent(MainNotify.openCrapPanelNotify,null,false);
        // Global.dispatchEvent(MainNotify.closeStartPanelNotify,null,false);
    };
    StartPanel.prototype.onFishBtnTouchTap = function (e) {
        /*
          RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onSubResourceLoadComplete,this);
          RES.loadGroup("fish_load");
          */
    };
    StartPanel.prototype.onWheelBtnTouchTap = function (e) {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onSubResourceLoadComplete, this);
        RES.loadGroup("wheel_load");
    };
    StartPanel.prototype.onDarkSlotBtnTouchTap = function (e) {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onSubResourceLoadComplete, this);
        RES.loadGroup("darkslot3_load");
    };
    StartPanel.prototype.onTitanSlotBtnTouchTap = function (e) {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onSubResourceLoadComplete, this);
        RES.loadGroup("titanslot_load");
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
