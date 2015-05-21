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
        this.isPlay = false;
        this.sound = RES.getRes("sound");
    }
    // 初始化面板
    StartPanel.prototype.initPanel = function () {
        this.bg = new egret.Bitmap();
        this.bg.texture = this.assets.getTexture("bg");
        this.addChild(this.bg);
        this.bg.touchEnabled = true;
        this.slot_1 = new ESlot(this, "seven", null, "", 30, 1);
        this.slot_1.x = 20;
        this.slot_1.y = 18;
        this.addChild(this.slot_1);
        this.slot_1.alpha = 0;
        this.slot_1.setScale(3, 3);
        this.slot_2 = new ESlot(this, "seven", null, "", 30, 1);
        this.slot_2.x = this.slot_1.x + 150;
        this.slot_2.y = this.slot_1.y;
        this.addChild(this.slot_2);
        this.slot_2.alpha = 0;
        this.slot_2.setScale(3, 3);
        this.slot_3 = new ESlot(this, "seven", null, "", 30, 1);
        this.slot_3.x = this.slot_2.x + 150;
        this.slot_3.y = this.slot_1.y;
        this.addChild(this.slot_3);
        this.slot_3.alpha = 0;
        this.slot_3.setScale(3, 3);
        this.slot_4 = new ESlot(this, "seven", null, "", 30, 1);
        this.slot_4.x = this.slot_1.x + 0;
        this.slot_4.y = this.slot_1.y + 150;
        this.addChild(this.slot_4);
        this.slot_4.alpha = 0;
        this.slot_4.setScale(3, 3);
        this.slot_5 = new ESlot(this, "seven", null, "", 30, 1);
        this.slot_5.x = this.slot_2.x + 0;
        this.slot_5.y = this.slot_2.y + 150;
        this.addChild(this.slot_5);
        this.slot_5.alpha = 0;
        this.slot_5.setScale(3, 3);
        this.slot_6 = new ESlot(this, "seven", null, "", 30, 1);
        this.slot_6.x = this.slot_3.x + 0;
        this.slot_6.y = this.slot_3.y + 150;
        this.addChild(this.slot_6);
        this.slot_6.alpha = 0;
        this.slot_6.setScale(3, 3);
        this.slot_7 = new ESlot(this, "bar", null, "", 30, 1);
        this.slot_7.x = this.slot_4.x + 0;
        this.slot_7.y = this.slot_4.y + 150;
        this.addChild(this.slot_7);
        this.slot_7.alpha = 0;
        this.slot_7.setScale(3, 3);
        this.slot_8 = new ESlot(this, "seven", null, "", 30, 1);
        this.slot_8.x = this.slot_5.x + 0;
        this.slot_8.y = this.slot_5.y + 150;
        this.addChild(this.slot_8);
        this.slot_8.alpha = 0;
        this.slot_8.setScale(3, 3);
        this.slot_9 = new ESlot(this, "orange", null, "", 30, 1);
        this.slot_9.x = this.slot_6.x + 0;
        this.slot_9.y = this.slot_6.y + 150;
        this.addChild(this.slot_9);
        this.slot_9.alpha = 0;
        this.slot_9.setScale(3, 3);
        this.buttonBet = new EButton(this, "bigYellowBtn", this.bet, "Bet", 30, 2);
        //this.buttonBet = new ImgButton("bigYellowBtn",this.onButtonBetTouchTap,"Bet!!",30);
        this.buttonBet.x = this.w / 2 - 50;
        this.buttonBet.y = this.slot_8.y + 150;
        this.addChild(this.buttonBet);
        this.logoImg = new egret.Bitmap();
        this.logoImg.texture = this.assets.getTexture("logoImg");
        this.logoImg.anchorX = 0.5;
        this.logoImg.anchorY = 1;
        this.logoImg.x = this.w / 2;
        this.logoImg.y = -550;
        ;
        this.addChild(this.logoImg);
        this.buttonBtn = new ImgButton("bigYellowBtn", this.onButtonBtnTouchTap, "按钮特效!!", 30);
        this.buttonBtn.x = -300;
        this.buttonBtn.y = 230;
        this.addChild(this.buttonBtn);
        /*
                this.imgBtn = new ImgButton("bigYellowBtn",this.onImgBtnTouchTap,"图片特效",30);
                this.imgBtn.x = -300;
                this.imgBtn.y = this.buttonBtn.y + 90;
                this.addChild(this.imgBtn);
        
                this.panelBtn = new ImgButton("bigYellowBtn",this.onPanelBtnTouchTap,"面板特效",30);
                this.panelBtn.x = -300;
                this.panelBtn.y = this.imgBtn.y + 90;
                this.addChild(this.panelBtn);
        
                this.sceneBtn = new ImgButton("bigYellowBtn",this.onSceneBtnTouchTap,"场景特效",30);
                this.sceneBtn.x = -300;
                this.sceneBtn.y = this.panelBtn.y + 90;
                this.addChild(this.sceneBtn);
        
                this.tipsBtn = new ImgButton("bigYellowBtn",this.onTipsBtnTouchTap,"提示特效",30);
                this.tipsBtn.x = -300;
                this.tipsBtn.y = this.sceneBtn.y + 90;
                this.addChild(this.tipsBtn);
        
                this.showTipsBtn = new ImgButton("bigYellowBtn",this.onShowTipsBtnTouchTap,"飘字特效",30);
                this.showTipsBtn.x = -300;
                this.showTipsBtn.y = this.tipsBtn.y + 90;
                this.addChild(this.showTipsBtn);
        
                this.addFriendBtn = new ImgButton("addFriend",this.onAddFriendBtnTouchTap);
                this.addFriendBtn.x = 20;
                this.addFriendBtn.y = this.h - this.addFriendBtn.height - 60;
                this.addChild(this.addFriendBtn);
                this.addFriendBtn.alpha = 0;
        
                this.setBtn = new ImgButton("setBtn",this.onSetBtnTouchTap);
                this.setBtn.x = this.w - this.setBtn.width - 20;
                this.setBtn.y = this.h - this.setBtn.height - 60;
                this.addChild(this.setBtn);
                this.setBtn.alpha = 0;
        
                this.bottomCopyRight = new egret.Bitmap();
                this.bottomCopyRight.texture = this.assets.getTexture("bottomCopyRight");
                this.bottomCopyRight.x = this.w/2 - this.bottomCopyRight.width/2;
                this.bottomCopyRight.y = this.h - this.bottomCopyRight.height;
                this.addChild(this.bottomCopyRight);
                this.bottomCopyRight.alpha = 0;
        */
        this.initEffect();
    };
    StartPanel.prototype.initEffect = function () {
        egret.Tween.get(this.slot_1).to({ alpha: 1 }, 300);
        egret.Tween.get(this.slot_2).to({ alpha: 1 }, 300);
        egret.Tween.get(this.slot_3).to({ alpha: 1 }, 300);
        egret.Tween.get(this.slot_4).to({ alpha: 1 }, 300);
        egret.Tween.get(this.slot_5).to({ alpha: 1 }, 300);
        egret.Tween.get(this.slot_6).to({ alpha: 1 }, 300);
        egret.Tween.get(this.slot_7).to({ alpha: 1 }, 300);
        egret.Tween.get(this.slot_8).to({ alpha: 1 }, 300);
        egret.Tween.get(this.slot_9).to({ alpha: 1 }, 300);
        //this.slot_1.visible = true;
        egret.setTimeout(function () {
            egret.Tween.get(this.buttonBet).to({ x: this.w / 2 - this.buttonBet.width / 2 }, 600, egret.Ease.backOut);
        }, this, 150 * 1);
        /*
                egret.Tween.get(this.logoImg).to({y:60 + this.logoImg.height},600,egret.Ease.backOut);
        
                egret.setTimeout(function () {
                    egret.Tween.get(this.buttonBtn).to({x:this.w/2 - this.buttonBtn.width/2},600,egret.Ease.backOut);
                }, this, 150*1);
        */
        /*
   egret.setTimeout(function () {
       egret.Tween.get(this.slot_1).to({alpha:1},300,egret.Ease.backOut);
   }, this, 150*1);



   egret.setTimeout(function () {
       egret.Tween.get(this.imgBtn).to({x:this.w/2 - this.imgBtn.width/2},600,egret.Ease.backOut);
   }, this, 150*2);
   egret.setTimeout(function () {
       egret.Tween.get(this.panelBtn).to({x:this.w/2 - this.panelBtn.width/2},600,egret.Ease.backOut);
   }, this, 150*3);
   egret.setTimeout(function () {
       egret.Tween.get(this.sceneBtn).to({x:this.w/2 - this.sceneBtn.width/2},600,egret.Ease.backOut);
   }, this, 150*4);
   egret.setTimeout(function () {
       egret.Tween.get(this.tipsBtn).to({x:this.w/2 - this.tipsBtn.width/2},600,egret.Ease.backOut);
   }, this, 150*5);
   egret.setTimeout(function () {
       egret.Tween.get(this.showTipsBtn).to({x:this.w/2 - this.showTipsBtn.width/2},600,egret.Ease.backOut);
   }, this, 150*6);
   egret.setTimeout(function () {
       egret.Tween.get(this.bottomCopyRight).to({alpha:1},600);
       egret.Tween.get(this.addFriendBtn).to({alpha:1},600);
       egret.Tween.get(this.setBtn).to({alpha:1},600);
   }, this, 150*7);
   */
    };
    /*
    public onButtonBetTouchTap(e:egret.TouchEvent):void{
      //  console.log("onButtonBetTouchTap")
               EffectUtils.slotObj(this.slot_1,100,2)
    }
    */
    StartPanel.prototype.onButtonBtnTouchTap = function (e) {
        Global.dispatchEvent(MainNotify.openButtonPanelNotify, null, false);
        Global.dispatchEvent(MainNotify.closeStartPanelNotify, null, false);
        //  EffectUtils.slotObj(this.slot_1,100,2)  
    };
    /*
    public onImgBtnTouchTap(e:egret.TouchEvent):void{
        Global.dispatchEvent(MainNotify.openImgPanelNotify,null,false);
        Global.dispatchEvent(MainNotify.closeStartPanelNotify,null,false);
    }

    public onPanelBtnTouchTap(e:egret.TouchEvent):void{
        Global.dispatchEvent(MainNotify.openPanelPanelNotify,null,false);
        Global.dispatchEvent(MainNotify.closeStartPanelNotify,null,false);
    }

    public onSceneBtnTouchTap(e:egret.TouchEvent):void{
        Global.dispatchEvent(MainNotify.openScenePanelNotify,null,false);
        Global.dispatchEvent(MainNotify.closeStartPanelNotify,null,false);
    }

    public onTipsBtnTouchTap(e:egret.TouchEvent):void{
        Global.dispatchEvent(MainNotify.openTipsPanelNotify,null,false);
        Global.dispatchEvent(MainNotify.closeStartPanelNotify,null,false);
    }

    public onShowTipsBtnTouchTap(e:egret.TouchEvent):void{
        Global.dispatchEvent(MainNotify.openShowTipsPanelNotify,null,false);
        Global.dispatchEvent(MainNotify.closeStartPanelNotify,null,false);
    }


    public onAddFriendBtnTouchTap(e:egret.TouchEvent):void{
        Global.dispatchEvent(MainNotify.openAddFriendPanelNotify,2,false);
    }


    public onSetBtnTouchTap(e:egret.TouchEvent):void{
        Global.dispatchEvent(MainNotify.openSetPanelNotify,2,false);
    }
*/
    StartPanel.prototype.bet = function () {
        console.log(this.isPlay);
        if (this.isPlay) {
            EffectUtils.setSlotObj(this.slot_1, 2000, 1);
            EffectUtils.setSlotObj(this.slot_2, 2000, 1);
            EffectUtils.setSlotObj(this.slot_3, 2000, 1);
            EffectUtils.setSlotObj(this.slot_4, 2000, 1);
            EffectUtils.setSlotObj(this.slot_5, 2000, 1);
            EffectUtils.setSlotObj(this.slot_6, 2000, 1);
            EffectUtils.setSlotObj(this.slot_7, 2000, 1);
            EffectUtils.setSlotObj(this.slot_8, 2000, 1);
            EffectUtils.setSlotObj(this.slot_9, 2000, 1);
            this.isPlay = false;
        }
        else {
            this.isPlay = true;
            EffectUtils.slotObj(this.slot_1, 50, 1);
            EffectUtils.slotObj(this.slot_2, 50, 1);
            EffectUtils.slotObj(this.slot_3, 50, 1);
            EffectUtils.slotObj(this.slot_4, 50, 1);
            EffectUtils.slotObj(this.slot_5, 50, 1);
            EffectUtils.slotObj(this.slot_6, 50, 1);
            EffectUtils.slotObj(this.slot_7, 50, 1);
            EffectUtils.slotObj(this.slot_8, 50, 1);
            EffectUtils.slotObj(this.slot_9, 50, 1);
        }
        // Global.alert("提示","我是一个提示栗子，哈哈",null,3);
    };
    StartPanel.prototype.onResourceLoadComplete = function (event) {
        //this.drawStopBtn();
        //this.sound = new RES.getRes("sound");
        this.sound.play();
    };
    return StartPanel;
})(BasePanel);
StartPanel.prototype.__class__ = "StartPanel";
