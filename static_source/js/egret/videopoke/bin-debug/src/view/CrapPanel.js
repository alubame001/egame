var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CrapPanel = (function (_super) {
    __extends(CrapPanel, _super);
    function CrapPanel() {
        _super.call(this);
        this.coins = [];
        /**触发创建敌机的间隔*/
        this.coinsTimer = new egret.Timer(1);
        /* ↓↓↓↓↓↓↓↓↓↓↓↓↓↓是引用此class需修改的*/
        // public initPanel():void{}
        //public initEffect():void{}
        //public showResult(str:string):void{}   
        this.slot_assets_name = "gem7";
        this.min_bet = 0;
        this.base_bet = 100;
        this.websocket_delay = 500;
        this.sound = RES.getRes("sound");
        //public game_id :string="crap";
        this.game_cname = "魔九";
        this.game_ename = "Crap9";
        this.game_kind = "crap";
        this.slotNumber = 8;
    }
    /* ↑↑↑↑↑↑↑↑↑↑↑↑是引用此class需修改的*/
    CrapPanel.prototype.initPanel = function () {
        this.bg = new egret.Bitmap();
        this.bg.texture = this.assets.getTexture("bg");
        this.addChild(this.bg);
        this.bg.touchEnabled = true;
        this.imgBtn = new EButton(this, "rpg_panel", this.onImgBtnTouchTap, "", 30, 1, "rpg");
        this.imgBtn.x = 0;
        this.imgBtn.y = 0;
        this.addChild(this.imgBtn);
        this.imgBtn.touchEnabled = false;
        //this.slot_1 = new ERpgslot(this,"icon1",null,"X1",30,1);
        this.slot_1 = new EButton(this, "icon1", this.onPickIcon1, "1", 20, 4, "gem7");
        this.slot_1.x = 187 + 5; // 82+5;
        this.slot_1.y = 38 + 5; //78+5;
        this.slot_1.alpha = 0;
        this.slot_1.setScale(1, 1);
        this.slot_1.isBetButton = true;
        //  this.slot_1.touchEnabled = false; 
        this.addChild(this.slot_1);
        this.slot_2 = new EButton(this, "icon2", this.onPickIcon2, "2", 20, 4, "gem7");
        this.slot_2.x = 294 + 5; //187+5;
        this.slot_2.y = 78 + 5; //38+5;
        this.addChild(this.slot_2);
        this.slot_2.alpha = 0;
        this.slot_2.isBetButton = true;
        this.slot_2.setScale(1, 1);
        this.slot_3 = new EButton(this, "icon3", this.onPickIcon3, "3", 20, 4, "gem7");
        this.slot_3.x = 336 + 5; //294+5;
        this.slot_3.y = 186 + 5; //78+5;
        this.addChild(this.slot_3);
        this.slot_3.alpha = 0;
        this.slot_3.isBetButton = true;
        this.slot_3.setScale(1, 1);
        this.slot_4 = new EButton(this, "icon4", this.onPickIcon4, "4", 20, 4, "gem7");
        this.slot_4.x = 296 + 5; //336+5;//38+5;
        this.slot_4.y = 296 + 5; //186+5; //186+5;
        this.addChild(this.slot_4);
        this.slot_4.alpha = 0;
        this.slot_4.isBetButton = true;
        this.slot_4.setScale(1, 1);
        //this.slot_4.min_bet= this.min_bet
        this.slot_5 = new EButton(this, "icon5", this.onPickIcon5, "5", 20, 4, "gem7");
        this.slot_5.x = 190 + 5; //296+5;// 170+30;
        this.slot_5.y = 333 + 5; //296+5;// 165+30;
        this.addChild(this.slot_5);
        this.slot_5.alpha = 0;
        this.slot_5.isBetButton = true;
        this.slot_5.setScale(1, 1);
        //this.slot_5.min_bet= this.min_bet
        this.slot_6 = new EButton(this, "icon6", this.onPickIcon6, "6", 20, 4, "gem7");
        this.slot_6.x = 82 + 5; //190+5;// 336+5;
        this.slot_6.y = 290 + 5; //333+5;// 186+5;
        this.addChild(this.slot_6);
        this.slot_6.alpha = 0;
        this.slot_6.isBetButton = true;
        this.slot_6.setScale(1, 1);
        //this.slot_6.min_bet= this.min_bet
        this.slot_7 = new EButton(this, "icon7", this.onPickIcon7, "7", 20, 4, "gem7");
        this.slot_7.x = 38 + 5; //82+5;
        this.slot_7.y = 186 + 5; //290+5;
        this.addChild(this.slot_7);
        this.slot_7.alpha = 0;
        this.slot_7.isBetButton = true;
        this.slot_7.setScale(1, 1);
        this.slot_8 = new EButton(this, "icon8", this.onPickIcon8, "8", 20, 4, "gem7");
        this.slot_8.x = 82 + 5; //38+5;
        this.slot_8.y = 78 + 5; // 186+5;
        this.addChild(this.slot_8);
        this.slot_8.alpha = 0;
        this.slot_8.isBetButton = true;
        this.slot_8.setScale(1, 1);
        this.slot_result = new EButton(this, "item", null, "bet", 20, 4, "gem7");
        this.slot_result.x = 170 + 30;
        this.slot_result.y = 165 + 30;
        this.addChild(this.slot_result);
        this.slot_result.alpha = 0;
        this.slot_result.setScale(1, 1);
        this.slot_9 = new EButton(this, "icon9", null, "", 20, 4, "gem7");
        /*
                this.slot_9.x = 296+5;
                this.slot_9.y =296+5;
                this.addChild(this.slot_9);
                this.slot_9.alpha = 0;
                this.slot_9.setScale(1,1);
        */
        this.shot = new EButton(this, "shot_2", null, "", 30, 1, "rpg");
        this.shot.x = 187 + 5; // 82+5;
        this.shot.y = 38 + 5; //78+5;
        this.shot.alpha = 0;
        this.shot.setScale(1, 1);
        this.shot.touchEnabled = false;
        this.addChild(this.shot);
        this.shot.isPlayCartoon = false;
        this.showTitle = new EButton(this, "title", null, this.game_cname, 20, 4, "rpg");
        this.showTitle.x = 342;
        this.showTitle.y = 2;
        this.addChild(this.showTitle);
        this.buttonBet = new EButton(this, "b1", this.startBet, "Bet", 30, 4, "rpg");
        //this.buttonBet = new ImgButton("bigYellowBtn",this.onButtonBetTouchTap,"Bet!!",30);
        this.buttonBet.x = this.slot_3.x + 150;
        this.buttonBet.y = this.slot_3.y + 50;
        this.addChild(this.buttonBet);
        this.buttonReset = new EButton(this, "b2", this.resetBet, "Reset", 30, 4, "rpg");
        //this.buttonBet = new ImgButton("bigYellowBtn",this.onButtonBetTouchTap,"Bet!!",30);
        this.buttonReset.x = this.slot_3.x + 250;
        this.buttonReset.y = this.slot_3.y + 50;
        this.addChild(this.buttonReset);
        this.showTipsBtn = new EButton(this, "b1", this.onShowFishTouchTap, "test", 30, 1, "rpg");
        this.showTipsBtn.x = 800;
        this.showTipsBtn.y = 0;
        this.addChild(this.showTipsBtn);
        this.coinBtn = new EButton(this, "btc", null, "Loading", 30, 1, "coin");
        this.showTipsBtn.x = 0;
        this.showTipsBtn.y = 430;
        this.addChild(this.coinBtn);
        this.logoImg = new egret.Bitmap();
        this.logoImg.texture = this.assets.getTexture("logoImg");
        this.logoImg.anchorX = 0.5;
        this.logoImg.anchorY = 1;
        this.logoImg.x = this.w / 2;
        this.logoImg.y = -550;
        ;
        this.addChild(this.logoImg);
        /**********   ENumber*****************/
        this.e_stake = new ENumber(0, 20, "投注", "number", 12);
        this.e_stake.x = 10;
        this.e_stake.y = 20;
        this.addChild(this.e_stake);
        this.e_stake.visible = false;
        this.e_balance = new ENumber(this.balance, 20, "馀额", "number", 12);
        this.e_balance.x = 220;
        this.e_balance.y = 20;
        this.addChild(this.e_balance);
        this.e_balance.visible = false;
        this.e_profit = new ENumber(0, 20, "中奖", "number", 12);
        this.e_profit.x = 430;
        this.e_profit.y = 20;
        this.addChild(this.e_profit);
        this.e_profit.visible = false;
        /**********   ENumber*****************/
        this.stageBtn = new EButton(this, "title2", this.onChooseStage, "返回", 10, 5, "rpg");
        this.stageBtn.x = 700;
        this.stageBtn.y = 50;
        this.addChild(this.stageBtn);
        this.stageBtn.touchEnabled = true;
        this.door_bg = new egret.Bitmap();
        this.door_bg.texture = RES.getRes("");
        this.door_bg.x = 0;
        this.door_bg.y = 0;
        this.door_bg.touchEnabled = false;
        this.door_bg.visible = false;
        this.addChild(this.door_bg);
        this.door_left = new EButton(this, "door_left", null, "", 2, 5, "rpg");
        this.door_left.x = 30;
        this.door_left.y = 0;
        this.addChild(this.door_left);
        this.door_left.touchEnabled = false;
        this.door_right = new EButton(this, "door_right", null, "", 2, 5, "rpg");
        this.door_right.x = 200;
        this.door_right.y = 0;
        this.addChild(this.door_right);
        this.door_right.touchEnabled = false;
        this.stageBtn1 = new EButton(this, "title", this.onChooseStage1, "入门区", 30, 5, "rpg");
        this.stageBtn1.x = 500;
        this.stageBtn1.y = 50;
        this.addChild(this.stageBtn1);
        this.stageBtn1.touchEnabled = true;
        this.stageBtn2 = new EButton(this, "title", this.onChooseStage2, "熟手区", 30, 5, "rpg");
        this.stageBtn2.x = 500;
        this.stageBtn2.y = this.stageBtn1.y + 80;
        this.addChild(this.stageBtn2);
        this.stageBtn2.touchEnabled = true;
        this.stageBtn3 = new EButton(this, "title", this.onChooseStage3, "高额区", 30, 5, "rpg");
        this.stageBtn3.x = 500;
        this.stageBtn3.y = this.stageBtn1.y + 160;
        this.addChild(this.stageBtn3);
        this.stageBtn3.touchEnabled = true;
        this.door_left_vertical = new EButton(this, "door_vertical", null, "", 2, 5, "rpg");
        this.door_left_vertical.x = 0;
        this.door_left_vertical.y = 0;
        this.addChild(this.door_left_vertical);
        this.door_left_vertical.touchEnabled = false;
        //
        this.door_right_vertical = new EButton(this, "door_vertical", null, "", 2, 5, "rpg");
        this.door_right_vertical.x = 768;
        this.door_right_vertical.y = 0;
        this.addChild(this.door_right_vertical);
        this.door_right_vertical.touchEnabled = false;
        this.initEffect();
    };
    CrapPanel.prototype.initEffect = function () {
        egret.setTimeout(function () {
            egret.Tween.get(this.slot_1).to({ alpha: 1 }, 1000);
            egret.Tween.get(this.slot_1).to({ alpha: 1 }, 1000);
            egret.Tween.get(this.slot_2).to({ alpha: 1 }, 1000);
            egret.Tween.get(this.slot_3).to({ alpha: 1 }, 1000);
            egret.Tween.get(this.slot_4).to({ alpha: 1 }, 1000);
            egret.Tween.get(this.slot_5).to({ alpha: 1 }, 1000);
            egret.Tween.get(this.slot_6).to({ alpha: 1 }, 1000);
            egret.Tween.get(this.slot_7).to({ alpha: 1 }, 1000);
            egret.Tween.get(this.slot_8).to({ alpha: 1 }, 1000);
            // egret.Tween.get(this.slot_9).to({alpha:1},300);
            egret.Tween.get(this.slot_result).to({ alpha: 1 }, 1000);
            //egret.Tween.get(this.coinBtn).to({x:0,y:430,alpha:0},1).to({x:500,y:430,alpha:1},1000,egret.Ease.sineIn);
        }, this, 500 * 2);
    };
    CrapPanel.prototype.showResult = function (str) {
        this.isPlay = false;
        var obj = JSON.parse(str);
        var contentStr = JSON.stringify(obj.Content);
        var contentObj = eval("(" + obj.Content + ")");
        var lucky = obj.Lucky;
        EffectUtils.setSlotObj("gem7", this.slot_result, 2000, 1);
        for (var i = 0; i < 9; i++) {
            egret.setTimeout(function () {
                this.slot_result.setBitmap("icon" + i);
            }, this, 10);
        }
        var gold = 0;
        if (lucky[0] == "0") {
            this.blinkRpgslot("all", 0, 1000);
            gold = Math.ceil(parseInt(contentObj.allprofit) / this.min_bet);
            this.showPickResult("all", gold, 500, this.slot_result);
        }
        else if (lucky[0] == "9") {
            gold = Math.ceil(parseInt(contentObj.allprofit) * -1 / this.min_bet);
            this.showPickResult("kill", gold, 500, this.slot_result);
            this.blinkRpgslot("kill", 0, 300);
        }
        else {
            this.blinkRpgslot(lucky[0], 0, 1000);
            for (var i = 0; i < contentObj.pick.length; i++) {
                if (contentObj.pick[i].profit > 0) {
                    console.log(contentObj.pick[i].profit);
                    gold = Math.ceil(parseInt(contentObj.pick[i].profit) / this.min_bet);
                    this.showPickResult(lucky[0], gold, 500, this.slot_result);
                }
            }
        }
        egret.setTimeout(function () {
            this.slot_result.setBitmap("icon" + lucky.substr(0, 1));
        }, this, 300);
        egret.setTimeout(function () {
            var isLose = false;
            if (contentObj.allprofit < 0) {
                isLose = true;
            }
            if (contentObj.allprofit == 0) {
                //  EffectUtils.showTips("0", 4,isLose);
                EffectUtils.showTips("0", 1, isLose, this.coinBtn.x, this.coinBtn.y);
            }
            else {
                // EffectUtils.showTips(contentObj.allprofit, 4,isLose);
                EffectUtils.showTips(contentObj.allprofit, 1, isLose, this.coinBtn.x, this.coinBtn.y);
            }
            this.coinBtn.setText(contentObj.balance);
        }, this, 1250);
        // 
        //this.slot_result.textField.text=lucky.substr(0,1)
    };
    return CrapPanel;
})(GamePanel);
CrapPanel.prototype.__class__ = "CrapPanel";
