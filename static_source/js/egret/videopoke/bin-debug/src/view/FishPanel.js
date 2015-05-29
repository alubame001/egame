var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var FishPanel = (function (_super) {
    __extends(FishPanel, _super);
    function FishPanel() {
        _super.call(this);
        this.isMoving = false;
        /**敌人的飞机*/
        this.enemyFighters = [];
        /**触发创建敌机的间隔*/
        this.enemyFightersTimer = new egret.Timer(100);
        this.min_bet = 1000;
        this.websocket_delay = 500;
        this.sound = RES.getRes("sound");
        this.game_id = "crap";
        this.game_cname = "魔九";
        this.game_kind = "3";
        this.uid = "0";
        /*
                name :string;
                kind :string;
                total:number;
                lucky:string;
                hash :string;
                nonce:string;
                ckey:string;
        */
        this.myBet = { name: "slot", kind: "crap", total: 0, lucky: "", shash: "", nonce: "", ckey: "", pick: [], pk: [] };
        this.isPlay = false;
    }
    // 初始化面板
    /*
        private  setLocalStoreage(key,value : string):void{
            var storage = window.localStorage;
            storage.setItem(key,value);//用localStorage保存转化好的的字符串
            console.log(storage[key])
        }
     
        public  getLocalStoreage(key:string):string{
            var storage = window.localStorage;
            return storage.getItem(key);​
        }
    */
    FishPanel.prototype.getLocalStoreage = function (key) {
        var storage = window.localStorage;
        var v = storage.getItem(key);
        if (v == "" || v == null) {
            console.log("nothing in LocalStorage", key);
        }
        else {
            var obj = JSON.parse(v);
            for (var i = 0; i < obj.length; i++) {
                var str = JSON.stringify(obj[i]);
                var s = this.parseWebsocketResult(str);
                $(".my").append(s);
                $(".all").append(s);
            }
        }
    };
    FishPanel.prototype.sendBet = function () {
        //var obj =this.makeJson("","")
        // printBetJson(obj);
        var str = JSON.stringify(this.myBet);
        egret.setTimeout(function () {
            SocketManager.sendMessage(str);
        }, this, this.websocket_delay);
        EffectUtils.slotObj("gem7", this.rpgslot_result, 50, 1);
    };
    FishPanel.prototype.initPanel = function () {
        //   this.setServerLisenter();
        this.bg = new egret.Bitmap();
        this.bg.texture = this.assets.getTexture("bg");
        this.addChild(this.bg);
        this.bg.touchEnabled = true;
        this.door_left = new EButton(this, "door_left", this.onBackToChooseStage, "", 2, 5, "rpg");
        this.door_left.x = 30;
        this.door_left.y = 0;
        this.addChild(this.door_left);
        this.door_left.touchEnabled = false;
        this.door_right = new EButton(this, "door_right", this.onChooseStage, "", 2, 5, "rpg");
        this.door_right.x = 200;
        this.door_right.y = 0;
        this.addChild(this.door_right);
        this.door_right.touchEnabled = true;
        this.btnStart = new EButton(this, "b1", this.gameStart, "start", 30, 4, "rpg"); //开始按钮
        this.btnStart.x = 0; //居中定位
        this.btnStart.y = 0; //居中定位
        this.btnStart.touchEnabled = true; //开启触碰           
        this.addChild(this.btnStart);
        this.btnTest = new EButton(this, "fish2-1", this.gameTest, "test", 30, 4, "fish"); //开始按钮
        this.btnTest.x = 300; //居中定位
        this.btnTest.y = 300; //居中定位
        this.btnTest.touchEnabled = true; //开启触碰           
        this.addChild(this.btnTest);
        this.btnTest.visible = false;
        this.myFighter = new fighter.Airplane(RES.getRes("f1"), 100);
        //this.myFighter.texture = this.assets.getTexture("b1");
        this.addChild(this.myFighter);
        this.initEffect();
    };
    FishPanel.prototype.initEffect = function () {
        //   EffectUtils.rotationEffect(this.rpgslot_1,1000);
        /*
          
        */
        //this.rpgslot_1.visible = true;
        /*
             egret.setTimeout(function () {
                 egret.Tween.get(this.buttonBet).to({alpha:1},600,egret.Ease.backOut);
             }, this, 150*1);
             egret.Tween.get(this.logoImg).to({y:60 + this.logoImg.height},600,egret.Ease.backOut);
             egret.setTimeout(function () {
                 egret.Tween.get(this.buttonBtn).to({x:this.w/2 - this.buttonBtn.width/2},600,egret.Ease.backOut);
             }, this, 150*1);
                    
             egret.setTimeout(function () {
                 egret.Tween.get(this.rpgslot_1).to({alpha:1},300,egret.Ease.backOut);
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
                 //egret.Tween.get(this.bottomCopyRight).to({alpha:1},600);
                // egret.Tween.get(this.addFriendBtn).to({alpha:1},600);
                 egret.Tween.get(this.setBtn).to({alpha:1},600);
             }, this, 150*7);
             */
    };
    /*
        public onPickIcon0(e:egret.TouchEvent):void{
         this.myBet = this.PutBet("pick","0",this.min_bet,this.myBet)
        }
    */
    FishPanel.prototype.onPickIcon1 = function (e) {
        this.myBet = this.PutBet(this.rpgslot_1, "pick", "1", this.min_bet, this.myBet);
    };
    FishPanel.prototype.onPickIcon2 = function (e) {
        this.myBet = this.PutBet(this.rpgslot_2, "pick", "2", this.min_bet, this.myBet);
    };
    FishPanel.prototype.onPickIcon3 = function (e) {
        this.myBet = this.PutBet(this.rpgslot_3, "pick", "3", this.min_bet, this.myBet);
    };
    FishPanel.prototype.onPickIcon4 = function (e) {
        this.myBet = this.PutBet(this.rpgslot_4, "pick", "4", this.min_bet, this.myBet);
    };
    FishPanel.prototype.onPickIcon5 = function (e) {
        this.myBet = this.PutBet(this.rpgslot_5, "pick", "5", this.min_bet, this.myBet);
    };
    FishPanel.prototype.onPickIcon6 = function (e) {
        this.myBet = this.PutBet(this.rpgslot_6, "pick", "6", this.min_bet, this.myBet);
    };
    FishPanel.prototype.onPickIcon7 = function (e) {
        this.myBet = this.PutBet(this.rpgslot_7, "pick", "7", this.min_bet, this.myBet);
    };
    FishPanel.prototype.onPickIcon8 = function (e) {
        this.myBet = this.PutBet(this.rpgslot_8, "pick", "8", this.min_bet, this.myBet);
    };
    /*
        public onPickIcon9(e:egret.TouchEvent):void{
         this.myBet = this.PutBet(this.rpgslot_9,"pick","9",this.min_bet,this.myBet)
        }
    */
    FishPanel.prototype.PutBet = function (obj, kind, beticon, betstake, myObj) {
        /* 已完成 : 需遍历检查之前同一相目是否投注了，不然会直接覆写*/
        if (kind == "pick") {
            var existed = false;
            for (var i = 0; i < myObj.pick.length; i++) {
                if (myObj.pick[i].icon == beticon) {
                    myObj.pick[i].stake = myObj.pick[i].stake + betstake;
                    myObj.total = myObj.total + betstake;
                    existed = true;
                }
            }
            if (existed == false) {
                var bet = { icon: beticon, stake: betstake, profit: 0 };
                myObj.pick.push(bet);
                myObj.total = myObj.total + betstake;
            }
        }
        return myObj;
    };
    /*
     private makeJson(category,icon:string ):BetJson {
            var myObj = { name: "",allprofit:0,balance:0,kind:this.game_kind,total:0,pick:[],pk:[],lucky:""};
            
            
            var bet = {icon:"1",stake:2,profit:0}
            myObj.pick.push(bet);
            myObj.total = myObj.total+ 2;
            var bet = {icon:"2",stake:10,profit:0}
            myObj.pick.push(bet);
            myObj.total = myObj.total+ 10;
           
           var bet = {icon:"3",stake:50,profit:0}
            myObj.pick.push(bet);
            myObj.total = myObj.total+ 50;
           var bet = {icon:"9",stake:20,profit:0}
            myObj.pick.push(bet);
            myObj.total = myObj.total+ 20;
            var bet = {icon:"big",stake:30,profit:0}
            myObj.pk.push(bet);
            myObj.total = myObj.total+ 30;
            return myObj;
        }
    */
    FishPanel.prototype.parseWebsocketResult = function (str) {
        var obj = JSON.parse(str);
        var contentStr = JSON.stringify(obj.Content);
        var contentObj = eval("(" + obj.Content + ")");
        var lucky = obj.Lucky[0];
        var isLose = true;
        var allprofit = contentObj.allprofit;
        var balance = parseFloat(contentObj.balance);
        //var shash =  parseFloat(contentObj.shash);
        //var shash =  parseFloat(contentObj.shash);
        var nonce = contentObj.nonce;
        var betid = contentObj.betid;
        var shash = contentObj.shash;
        shash = shash.substring(0, 10) + "....";
        console.log(betid);
        var unixTimestamp = new Date(obj.Timestamp * 1000);
        var commonTime = unixTimestamp.toLocaleString();
        var profit = "";
        if (allprofit < 0) {
            profit = "<div class='who red text-right'>" + allprofit + "</div>";
        }
        else if (allprofit > 0) {
            profit = "<div class='who green text-right'>" + allprofit + "</div>";
        }
        else {
            profit = "<div class='who text-right'>" + allprofit + "</div>";
        }
        var s = "<div class='result'>" + "<div class='who'>" + obj.Uid + "</div>" + profit + "<div class='who text-right'>" + contentObj.total + "</div>" + "<div class='who text-center'><div class='badge'>" + lucky + "</div></div>" + "<div class='commontime text-right'>" + commonTime + "</div>" + "<div class='who text-right'>" + nonce + "</div>" + "<div class='who text-right'>" + shash + "</div>";
        /*
                        if (contentObj.allprofit >= 0) {
                            var isLose = false
                        }
                        if (contentObj.allprofit == 0) {
                            //  EffectUtils.showTips("0", 4,isLose);
                        EffectUtils.showTips("0", 1,isLose,this.showTitle.x,this.showTitle.y+30);
                               
                        } else {
                            // EffectUtils.showTips(contentObj.allprofit, 4,isLose);
                              EffectUtils.showTips(contentObj.allprofit,1,isLose,this.showTitle.x,this.showTitle.y+30);
                        }
        */
        return s;
    };
    FishPanel.prototype.connetToServer = function (close) {
        console.log("connetToServer...");
        var m = $("meta[name=_xsrf]").attr('content');
        SocketManager.connectServer("192.168.1.104:8092/egame/ws/join?uname=" + m);
        var socketResultFun = function (e) {
            this.buttonBet.visible = true;
            this.buttonBet.touchEnabled = true;
            var str = JSON.stringify(e.param);
            var s = this.parseWebsocketResult(str);
            var obj = JSON.parse(str);
            $(".all").prepend(s);
            var len = $(".all .result").length;
            console.log("all .result:", len);
            for (var i = 0; i < len - 20; i++) {
                $(".all .result:last").remove();
            }
            if (obj.Uid == this.uid) {
                $(".my").prepend(s);
                this.showResult(str);
                egret.setTimeout(function () {
                }, this, 100 * 2);
                var len = $(".my .result").length;
                console.log(".my .result:", len);
                for (var i = 0; i < len - 20; i++) {
                    $(".my .result:last").remove();
                }
                if (e.param.Type == "2" && e.param.Cmd == "result") {
                    GameConfig.gameScene().maskLayer.removeChild(Global.waitPanel);
                    Global.waitPanel = null;
                    LocalStoreage.setLocalStoreage(this.game_id, str);
                }
            }
            //console.log(JSON.stringify(e.param));
            //    Global.alert("提示","socket数据收到了："+JSON.stringify(e.param));
            // Global.alert("提示","socket数据收到了："+contentObj.allprofit);
        };
        Global.addEventListener("result", socketResultFun, this);
        var socketJoinFun = function (e) {
            var n = $("meta[name=uid]").attr('content');
            if (e.param.Uid == n) {
            }
        };
        Global.addEventListener("join", socketJoinFun, this);
        var socketAlreadyOnlineFun = function (e) {
            this.buttonBet.visible = true;
            this.buttonBet.touchEnabled = true;
            this.closeDoor(true);
            // this.reconnect(false);
        };
        Global.addEventListener("already_online", socketAlreadyOnlineFun, this);
        var onSocketCloseFun = function (e) {
            this.buttonBet.visible = true;
            this.buttonBet.touchEnabled = true;
            this.closeDoor(true);
            //  this.reconnect(false);
            console.log("已断线");
            //Global.alert("提示","已断线");
            // Global.alert("提示","socket数据收到了："+contentObj.allprofit);
        };
        Global.addEventListener("onSocketClose", onSocketCloseFun, this);
        //
    };
    FishPanel.prototype.onChooseStage = function (e) {
        this.getLocalStoreage(this.game_id);
        this.closeDoor(false);
    };
    FishPanel.prototype.onBackToChooseStage = function (e) {
        this.closeDoor(true);
    };
    FishPanel.prototype.closeDoor = function (e) {
        if (e) {
            this.door_left.touchEnabled = false;
            this.door_right.touchEnabled = true;
            // this.connetToServer(false);
            egret.setTimeout(function () {
                egret.Tween.get(this.door_right).to({ x: 200 }, 600, egret.Ease.backOut);
            }, this, 500 * 2);
            egret.setTimeout(function () {
                egret.Tween.get(this.door_left).to({ x: 30 }, 600, egret.Ease.backOut);
            }, this, 500 * 2);
        }
        else {
            var m = $("meta[name=_xsrf]").attr('content');
            var n = $("meta[name=uid]").attr('content');
            this.uid = n;
            this.door_left.touchEnabled = true;
            this.door_right.touchEnabled = false;
            egret.setTimeout(function () {
                egret.Tween.get(this.door_right).to({ x: 500 + this.width / 2 }, 600, egret.Ease.backOut);
            }, this, 500 * 2);
            egret.setTimeout(function () {
                egret.Tween.get(this.door_left).to({ x: -430 }, 600, egret.Ease.backOut);
            }, this, 500 * 2);
        }
    };
    FishPanel.prototype.onButtonBetTouchTap = function (e) {
    };
    FishPanel.prototype.onButtonBtnTouchTap = function (e) {
        Global.dispatchEvent(MainNotify.openButtonPanelNotify, null, false);
        Global.dispatchEvent(MainNotify.closeStartPanelNotify, null, false);
        //  EffectUtils.slotObj(this.rpgslot_1,100,2)  
    };
    FishPanel.prototype.onImgBtnTouchTap = function (e) {
        // Global.dispatchEvent(MainNotify.openImgPanelNotify,null,false);
        // Global.dispatchEvent(MainNotify.closeStartPanelNotify,null,false);        
    };
    FishPanel.prototype.onPanelBtnTouchTap = function (e) {
        Global.dispatchEvent(MainNotify.openPanelPanelNotify, null, false);
        Global.dispatchEvent(MainNotify.closeStartPanelNotify, null, false);
    };
    FishPanel.prototype.onSceneBtnTouchTap = function (e) {
        Global.dispatchEvent(MainNotify.openScenePanelNotify, null, false);
        Global.dispatchEvent(MainNotify.closeStartPanelNotify, null, false);
    };
    FishPanel.prototype.onTipsBtnTouchTap = function (e) {
        Global.dispatchEvent(MainNotify.openTipsPanelNotify, null, false);
        Global.dispatchEvent(MainNotify.closeStartPanelNotify, null, false);
    };
    FishPanel.prototype.onShowTipsBtnTouchTap = function (e) {
        Global.dispatchEvent(MainNotify.openShowTipsPanelNotify, null, false);
        Global.dispatchEvent(MainNotify.closeStartPanelNotify, null, false);
    };
    FishPanel.prototype.onAddFriendBtnTouchTap = function (e) {
        Global.dispatchEvent(MainNotify.openAddFriendPanelNotify, 2, false);
    };
    FishPanel.prototype.onSetBtnTouchTap = function (e) {
        Global.dispatchEvent(MainNotify.openSetPanelNotify, 2, false);
    };
    FishPanel.prototype.resetBet = function () {
        //{ name: "slot",kind:"crap",total:0,lucky:"",shash:"",nonce:"",ckey:"",pick:[],pk:[]};
        this.myBet.total = 0;
        this.myBet.pick = [];
        this.myBet.pk = [];
        this.rpgslot_1.setText("1");
        this.rpgslot_2.setText("2");
        this.rpgslot_3.setText("3");
        this.rpgslot_4.setText("4");
        this.rpgslot_5.setText("5");
        this.rpgslot_6.setText("6");
        this.rpgslot_7.setText("7");
        this.rpgslot_8.setText("8");
        this.rpgslot_1.stake = 0;
        this.rpgslot_2.stake = 0;
        this.rpgslot_3.stake = 0;
        this.rpgslot_4.stake = 0;
        this.rpgslot_5.stake = 0;
        this.rpgslot_6.stake = 0;
        this.rpgslot_7.stake = 0;
        this.rpgslot_8.stake = 0;
    };
    FishPanel.prototype.startBet = function () {
        this.buttonBet.visible = false;
        this.buttonBet.touchEnabled = false;
        //this.testSocketServer();
        this.sendBet();
        /*
                    EffectUtils.slotObj("gem7_blur",this.rpgslot_1,50,1)
                    EffectUtils.slotObj("gem7_blur",this.rpgslot_2,50,1)
                    EffectUtils.slotObj("gem7_blur",this.rpgslot_3,50,1)
                    EffectUtils.slotObj("gem7_blur",this.rpgslot_4,50,1)
                    EffectUtils.slotObj("gem7_blur",this.rpgslot_5,50,1)
                    EffectUtils.slotObj("gem7_blur",this.rpgslot_6,50,1)
                    EffectUtils.slotObj("gem7_blur",this.rpgslot_7,50,1)
                    EffectUtils.slotObj("gem7_blur",this.rpgslot_8,50,1)
                    EffectUtils.slotObj("gem7_blur",this.rpgslot_9,50,1)
                       
          */
        // Global.alert("提示","我是一个提示栗子，哈哈",null,3);
    };
    FishPanel.prototype.onResourceLoadComplete = function (event) {
        //this.drawStopBtn();
        //this.sound = new RES.getRes("sound");
        this.sound.play();
    };
    FishPanel.prototype.blinkRpgslot = function (index, interval) {
        switch (index) {
            case "1":
                EffectUtils.blinkEffect(this.rpgslot_1, interval);
                break;
            case "2":
                EffectUtils.blinkEffect(this.rpgslot_2, interval);
                break;
            case "3":
                EffectUtils.blinkEffect(this.rpgslot_3, interval);
                break;
            case "4":
                EffectUtils.blinkEffect(this.rpgslot_4, interval);
                break;
            case "5":
                EffectUtils.blinkEffect(this.rpgslot_5, interval);
                break;
            case "6":
                EffectUtils.blinkEffect(this.rpgslot_6, interval);
                break;
            case "7":
                EffectUtils.blinkEffect(this.rpgslot_7, interval);
                break;
            case "8":
                EffectUtils.blinkEffect(this.rpgslot_8, interval);
                break;
            case "9":
                EffectUtils.blinkEffect(this.rpgslot_9, interval);
                break;
            case "result":
                EffectUtils.blinkEffect(this.rpgslot_result, interval);
                break;
            case "all":
                EffectUtils.blinkEffect(this.rpgslot_1, interval);
                EffectUtils.blinkEffect(this.rpgslot_2, interval);
                EffectUtils.blinkEffect(this.rpgslot_3, interval);
                EffectUtils.blinkEffect(this.rpgslot_4, interval);
                EffectUtils.blinkEffect(this.rpgslot_5, interval);
                EffectUtils.blinkEffect(this.rpgslot_6, interval);
                EffectUtils.blinkEffect(this.rpgslot_7, interval);
                EffectUtils.blinkEffect(this.rpgslot_8, interval);
                EffectUtils.blinkEffect(this.rpgslot_9, interval);
                break;
        }
    };
    FishPanel.prototype.showResult = function (str) {
        console.log(str);
        this.isPlay = false;
        var obj = JSON.parse(str);
        console.log(obj);
        var contentStr = JSON.stringify(obj.Content);
        var contentObj = eval("(" + obj.Content + ")");
        console.log(contentObj);
        console.log(contentObj.balance);
        var lucky = obj.Lucky;
        this.showTitle.setText(contentObj.balance);
        EffectUtils.setSlotObj("gem7", this.rpgslot_result, 2000, 1);
        for (var i = 0; i < 9; i++) {
            egret.setTimeout(function () {
                this.rpgslot_result.setBitmap("icon" + i);
            }, this, 10);
        }
        if (lucky[0] == "0") {
            this.blinkRpgslot("all", 1000);
        }
        else if (lucky[0] == "9") {
            egret.setTimeout(function () {
                this.blinkRpgslot("all", 300);
                //  egret.Tween.get(this.shot).to({x:this.rpgslot_1.x,y:this.rpgslot_1.y,alpha:1},100, egret.Ease.elasticOut);
                EffectUtils.showTips("-" + this.rpgslot_1.stake.toString(), 1, true, this.rpgslot_1.x + 30, this.rpgslot_1.y + 30);
            }, this, 500);
        }
        else {
            this.blinkRpgslot(lucky[0], 1000);
        }
        egret.setTimeout(function () {
            this.rpgslot_result.setBitmap("icon" + lucky.substr(0, 1));
        }, this, 100 + 20);
        if (contentObj.allprofit >= 0) {
            var isLose = false;
        }
        if (contentObj.allprofit == 0) {
            //  EffectUtils.showTips("0", 4,isLose);
            EffectUtils.showTips("0", 1, isLose, this.showTitle.x, this.showTitle.y + 30);
        }
        else {
            // EffectUtils.showTips(contentObj.allprofit, 4,isLose);
            EffectUtils.showTips(contentObj.allprofit, 1, isLose, this.showTitle.x, this.showTitle.y + 30);
        }
        // 
        //this.rpgslot_result.textField.text=lucky.substr(0,1)
    };
    /**游戏开始*/
    FishPanel.prototype.gameStart = function () {
        // this.myScore = 0;
        this.removeChild(this.btnStart);
        //this.bg.start();
        this.touchEnabled = true;
        // this.addEventListener(egret.Event.ENTER_FRAME,this.gameViewUpdate,this);
        //this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchHandler,this);
        //this.myFighter.x = (this.stageW-this.myFighter.width)/2;
        //this.myFighter.fire();//开火
        this.myFighter.blood = 10000000;
        //this.myFighter.addEventListener("createBullet",this.createBulletHandler,this);
        this.enemyFightersTimer.addEventListener(egret.TimerEvent.TIMER, this.createEnemyFighter, this);
        this.enemyFightersTimer.start();
    };
    FishPanel.prototype.createEnemyFighter = function (evt) {
        if (this.enemyFighters.length > 99)
            return;
        var enemyFighter = fighter.Airplane.produce("fish", 1000);
        enemyFighter.picIndex = Maths.RndNum(9) + 1;
        enemyFighter.anchorX = 0.5;
        enemyFighter.anchorY = 0.5;
        var i = Maths.RndNum(10);
        if (i > 6) {
            enemyFighter.speed = Math.random() * 10 + 2;
            enemyFighter.p = 0.4;
        }
        else if (i < 3) {
            enemyFighter.speed = Math.random() * 10 + 3;
            enemyFighter.p = 1;
        }
        else {
            enemyFighter.speed = Math.random() * 10 + 2;
            enemyFighter.p = -0.4;
        }
        enemyFighter.x = Math.log(Maths.RndNum(100));
        enemyFighter.y = Math.log(Maths.RndNum(100));
        enemyFighter.assetName = "fish";
        //      egret.Tween.get(enemyFighter, { loop: false }).to({ rotation: rate }, 100).wait(10);     
        this.addChildAt(enemyFighter, this.numChildren - 1);
        this.enemyFighters.push(enemyFighter);
        // enemyFighter.justSwim();
        enemyFighter.roaming(0.5);
    };
    /*
            private gameViewUpdate(evt:egret.Event):void{
                //为了防止FPS下降造成回收慢，生成快，进而导致DRAW数量失控，需要计算一个系数，当FPS下降的时候，让运动速度加快
                var nowTime:number = egret.getTimer();
                var fps:number = 1000/(nowTime-this._lastTime);
                this._lastTime = nowTime;
                var speedOffset:number = 60/fps;
                //我的子弹运动
                var i:number = 0;
                
                 var delArr:any[] = [];
                var onComplete1: Function = function () {
                    egret.Tween.get(theFighter, { loop: false }).to({ rotation: theFighter.rate }, 1000).wait(1000)
                    //.call(onComplete3, this);;
                    
                  
                };
            
               
                var theFighter:fighter.Airplane;
                var enemyFighterCount:number = this.enemyFighters.length;
                  console.log(enemyFighterCount)
                for(i=0;i<enemyFighterCount;i++) {
                      theFighter = this.enemyFighters[i]
                       // theFighter.changeAngle2();
                        var angle = this.getAngle(theFighter.x,theFighter.y,theFighter.x2,theFighter.y2);
                        console.log(angle)
                        egret.Tween.get(theFighter).to({ anchorX:0.5, anchorY:0.5,rotation: angle }, 100).wait(10)
                        
                  //if (theFighter.isMoving == true) {
                   //   egret.Tween.get(theFighter).to({ factor: 1 }, 20000).call(onComplete1, this);
                  //}
      
                }
               
            }
            public getAngle(x1, y1, x2, y2: number):number {
                // 直角的边长
                var x = Math.abs(x1 - x2);
                var y = Math.abs(y1 - y2);
                // 斜边长
                var z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
                // 余弦
                var cos = y / z;
                // 弧度
                var radina = Math.acos(cos);
                // 角度
                var angle =  180 / (Math.PI / radina);
                return angle;
            }
    */
    FishPanel.prototype.gameTest = function () {
        if (this.isMoving) {
            return;
        }
        this.isMoving = true;
        egret.Tween.get(this).to({ factor: 1 }, 20000).call(this.moveOver, this);
    };
    Object.defineProperty(FishPanel.prototype, "factor", {
        get: function () {
            return 0;
        },
        set: function (value) {
            this.btnTest.x = (1 - value) * (1 - value) * 0 + 2 * value * (1 - value) * 100 + value * value * 700;
            this.btnTest.y = (1 - value) * (1 - value) * 0 + 2 * value * (1 - value) * 400 + value * value * 400;
            var rate = 45 + (this.btnTest.x - 700) / (this.btnTest.y - 400);
            console.log(rate);
            //  egret.Tween.get(this.btnTest, { loop: false }).to({ rotation: rate }, 1000).wait(1000);               
        },
        enumerable: true,
        configurable: true
    });
    FishPanel.prototype.moveOver = function () {
        this.isMoving = false;
    };
    return FishPanel;
})(BasePanel);
FishPanel.prototype.__class__ = "FishPanel";
