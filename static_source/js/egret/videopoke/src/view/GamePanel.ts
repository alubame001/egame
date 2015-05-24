
class GamePanel extends     BasePanel{

    public constructor(){
        super();
    }

    public coins:fighter.Airplane[] = [];
    public coinsTimer:egret.Timer = new egret.Timer(1);
    //public uis:ui.Bet[] = [];
  //  public uisTimer:egret.Timer = new egret.Timer(1);

  //  public items:EButton[] = [];
   // public itemsTimer:egret.Timer = new egret.Timer(1);

    public bg:egret.Bitmap;
    public betJson :BetJson;
    public logoImg:egret.Bitmap;
    public buttonBtn:ImgButton;    
    public imgBtn:EButton;    
    public panelBtn:ImgButton;    
    public sceneBtn:ImgButton;    
    public tipsBtn:ImgButton;    
    public showTipsBtn:EButton;    
    public addFriendBtn:ImgButton;    
    public setBtn:ImgButton;    
    public bottomCopyRight:egret.Bitmap;

 
    
    public stageBtn1:EButton;   //新手区
    public stageBtn2:EButton;   //小额
    public stageBtn3:EButton;   //大额
    public stageBtn4:EButton;   //私人
    public stageBtn5:EButton;   //比赛

    public door_bg:egret.Bitmap;
    public door_right:EButton;   
    public door_left:EButton;   


    public door_right_vertical:EButton;   
    public door_left_vertical:EButton;   

    public coinBtn:EButton;   
    public stageBtn:EButton;   

    public slot_0:EBet;
    public slot_1:EBet;
    public slot_2:EBet;
    public slot_3:EBet;
    public slot_4:EBet;
    public slot_5:EBet;
    public slot_6:EBet;
    public slot_7:EBet;
    public slot_8:EBet;
    public slot_9:EBet;
    public slot_10:EBet;
    public slot_11:EBet;
    public slot_12:EBet;
    public slot_13:EBet;
    public slot_14:EBet;
    public slot_15:EBet;
    public slot_16:EBet;
    public slot_17:EBet;
    public slot_18:EBet;
    public slot_19:EBet;
    public slot_20:EBet;
    public slot_21:EBet;
    public slot_22:EBet;
    public slot_23:EBet;
    public slot_24:EBet;
    public slot_25:EBet;
    public slot_26:EBet;
    public slot_27:EBet;
    public slot_28:EBet;

    public slots: EBet[];


    public slot_result:EBet;

/* ↓↓↓↓↓↓↓↓↓↓↓↓↓↓是引用此class需修改的*/
   // public initPanel():void{}
    public initEffect():void{}
    public showResult(str:string):void{}   
    public slot_assets_name : string = "gem7";
    public min_bet : number = 0;
    public base_bet : number = 100;
    public websocket_delay : number = 500;
    public sound:egret.Sound = RES.getRes("sound");

    public slotNumber: number  =12
    public game_cname :string= "魔九"
    public game_ename :string= "Crap9"
    public game_kind :string="crap";
     public myBet : BetJson  = { name: "slot",kind:this.game_kind,total:0,lucky:"",shash:"",nonce:"",ckey:"",pick:[],pk:[]};

/* ↑↑↑↑↑↑↑↑↑↑↑↑是引用此class需修改的*/


    public balance : number = 0;
    public uid : string="0";

    public first_login: boolean= true;

    public shot:EButton;

     public showTitle:EButton;   
    public buttonBet:EButton;  
    public buttonReset:EButton;  
    public isPlay :boolean = false;


    public e_number: ENumber; 
    public e_balance: ENumber; 
    public e_stake: ENumber; 
    public e_profit: ENumber; 



    public gameStart():void{

        //this.myFighter.addEventListener("createBullet",this.createBulletHandler,this);
        this.coinsTimer.addEventListener(egret.TimerEvent.TIMER,this.createCoin,this);
        this.coinsTimer.start();
/*
        this.uisTimer.addEventListener(egret.TimerEvent.TIMER,this.createUi,this);
        this.uisTimer.start();      

        this.itemsTimer.addEventListener(egret.TimerEvent.TIMER,this.createItem,this);
        this.itemsTimer.start();              
*/  
    }
    public createCoin(evt:egret.TimerEvent):void{
        if (this.coins.length >19) return
        var coin:fighter.Airplane = fighter.Airplane.produce("coin",1000);
       // coin.picIndex = Maths.RndNum(9)+1   
        coin.picIndex = 1;//btc
        coin.anchorX = 0.5;
        coin.anchorY = 0.5;            
        coin.speed = 2;            
        coin.x = this.coins.length*20
        coin.y = 0
        coin.assetName = "coin"   
        this.addChildAt(coin, this.numChildren - 1);
        this.coins.push(coin);
        //coin.justSwim();
        //coin.roaming(0.5);
    }
/*
    public createUi(vt:egret.TimerEvent):void{

        
        if (this.uis.length >12) return
        var newUi:ui.Bet = ui.Bet.produce("12",1000);
       // var ui:fighter.Airplane = fighter.Airplane.produce("coin",1000);
       // coin.picIndex = Maths.RndNum(9)+1   
        newUi.picIndex = 1;//btc
        newUi.anchorX = 0.5;
        newUi.anchorY = 0.5;            
        newUi.speed = 2;            
        newUi.bmpOffset = 0;            
        newUi.x = this.uis.length*20
        newUi.picIndex = this.uis.length+1
        newUi.y = 0
        newUi.assetName = "12"   
        this.addChildAt(newUi, this.numChildren - 1);
        this.uis.push(newUi);

    }

    public createItem(vt:egret.TimerEvent):void{

        
        if (this.items.length >12) return
        var newitem= new EButton(this,"122-1",this.onPickIcon,"2",20,4,"12");
 
        newitem.picIndex = 1;//btc
        newitem.anchorX = 0.5;
        newitem.anchorY = 0.5;            
        newitem.speed = 2;            
      
        newitem.x = this.items.length*20
        newitem.picIndex = this.items.length+1
        newitem.y = 0
        newitem.assetName = "12"   
        this.addChildAt(newitem, this.numChildren - 1);
        this.items.push(newitem);

        // console.log("createItem");
    }

*/

   public initPanel():void{

 

        this.bg = new egret.Bitmap();
        this.bg.texture = this.assets.getTexture("bg");
        this.addChild(this.bg);   
        this.bg.touchEnabled = true;   

        this.imgBtn = new EButton(this,"ui_roulette_002-hd",this.onImgBtnTouchTap,"",30,1,"wheel");
        this.imgBtn.x = 0;
        this.imgBtn.y = 0;
        this.addChild(this.imgBtn);
         this.imgBtn.touchEnabled = false; 

        

        //this.slot_1 = new ERpgslot(this,"icon1",null,"X1",30,1);
        this.slot_1 =  new EButton(this,"121-1",this.onPickIcon1,"1",20,4,"12");
        this.slot_1.x =  240;// 82+5;
        this.slot_1.y = 50;//78+5;
        this.slot_1.alpha = 0;
        this.slot_1.setScale(1,1);
        this.slot_1.isBetButton = true;

      //  this.slot_1.touchEnabled = false; 
        
        this.addChild(this.slot_1);   



        this.slot_2 = new EButton(this,"122-1",this.onPickIcon2,"2",20,4,"12");
        this.slot_2.x =  310;//187+5;
        this.slot_2.y =  85;//38+5;
        this.addChild(this.slot_2);   
        this.slot_2.alpha = 0;
         this.slot_2.isBetButton = true;
         this.slot_2.setScale(1,1);
         this.slot_2.picIndex = 2;


        this.slot_3 = new EButton(this,"123-1",this.onPickIcon3,"3",20,4,"12");
        this.slot_3.x = 350;//294+5;
        this.slot_3.y = 170;//78+5;
        this.addChild(this.slot_3);   
        this.slot_3.alpha = 0;
         this.slot_3.isBetButton = true;
        this.slot_3.setScale(1,1);
        this.slot_3.picIndex = 3;


        this.slot_4 =new EButton(this,"124-1",this.onPickIcon4,"4",20,4,"12");
        this.slot_4.x = 355;//336+5;//38+5;
        this.slot_4.y = 240;//186+5; //186+5;
        this.addChild(this.slot_4);   
        this.slot_4.alpha = 0;
         this.slot_4.isBetButton = true;
        this.slot_4.setScale(1,1);
         this.slot_4.picIndex = 4;
 //this.slot_4.min_bet= this.min_bet

        this.slot_5 =new EButton(this,"125-1",this.onPickIcon5,"5",20,4,"12");
        this.slot_5.x =310;//296+5;// 170+30;
        this.slot_5.y =310;//296+5;// 165+30;
        this.addChild(this.slot_5);   
        this.slot_5.alpha = 0;
         this.slot_5.isBetButton = true;
        this.slot_5.setScale(1,1);
         this.slot_5.picIndex = 5;
 //this.slot_5.min_bet= this.min_bet

        this.slot_6 = new EButton(this,"126-1",this.onPickIcon6,"6",20,4,"12");
        this.slot_6.x = 240//190+5;// 336+5;
        this.slot_6.y = 360;//333+5;// 186+5;
        this.addChild(this.slot_6);   
        this.slot_6.alpha = 0;
         this.slot_6.isBetButton = true;
        this.slot_6.setScale(1,1); 
         this.slot_6.picIndex = 6;  
 //this.slot_6.min_bet= this.min_bet


        this.slot_7 = new EButton(this,"127-1",this.onPickIcon7,"7",20,4,"12");
        this.slot_7.x = 160;//82+5;
        this.slot_7.y = 360;//290+5;

        this.addChild(this.slot_7);   
        this.slot_7.alpha = 0;
         this.slot_7.isBetButton = true;
        this.slot_7.setScale(1,1);
         this.slot_7.picIndex = 7;
      



        this.slot_8 = new EButton(this,"128-1",this.onPickIcon8,"8",20,4,"12");
        this.slot_8.x =95;//38+5;
        this.slot_8.y =310;// 186+5;
        this.addChild(this.slot_8);   
        this.slot_8.alpha = 0;
         this.slot_8.isBetButton = true;
        this.slot_8.setScale(1,1);
        this.slot_8.picIndex = 8;       


        this.slot_result = new EButton(this,"item",null,"bet",20,4,"gem7");
        this.slot_result.x = 170+30;
        this.slot_result.y = 165+30;
        this.addChild(this.slot_result);   
        this.slot_result.alpha = 0;
        this.slot_result.setScale(1,1);
        this.slot_result.visible = false;

        this.slot_9 = new EButton(this,"icon9",null,"",20,4,"gem7");
/*
        this.slot_9.x = 296+5;
        this.slot_9.y =296+5;
        this.addChild(this.slot_9);   
        this.slot_9.alpha = 0;
        this.slot_9.setScale(1,1);   
*/
        this.shot =  new EButton(this,"shot_2",null,"",30,1,"rpg");
        this.shot.x =  187+5;// 82+5;
        this.shot.y = 38+5;//78+5;
        this.shot.alpha = 0;
        this.shot.setScale(1,1);
        this.shot.touchEnabled = false;   
        this.addChild(this.shot);   
        this.shot.isPlayCartoon = false;

       this.showTitle = new EButton(this,"title",null,this.game_cname,20,4,"rpg");
        this.showTitle.x = 342 ;
        this.showTitle.y = 2;   
        this.addChild(this.showTitle);       

       this.buttonBet = new EButton(this,"b1",this.startBet,"Bet",30,4,"rpg");
        //this.buttonBet = new ImgButton("bigYellowBtn",this.onButtonBetTouchTap,"Bet!!",30);
        this.buttonBet.x = this.slot_3.x+150 ;
        this.buttonBet.y =  this.slot_3.y+50;        
        this.addChild(this.buttonBet);   
       this.buttonReset = new EButton(this,"b2",this.resetBet,"Reset",30,4,"rpg");
        //this.buttonBet = new ImgButton("bigYellowBtn",this.onButtonBetTouchTap,"Bet!!",30);
        this.buttonReset.x = this.slot_3.x+250 ;
        this.buttonReset.y =  this.slot_3.y+50;        
        this.addChild(this.buttonReset);               

        this.showTipsBtn = new EButton(this,"b1",this.onShowFishTouchTap,"test",30,1,"rpg");
        this.showTipsBtn.x =800;
        this.showTipsBtn.y =0; 
        this.addChild(this.showTipsBtn);
          this.showTipsBtn.visible = false;

        this.coinBtn = new EButton(this,"btc",null,"Loading",30,1,"coin");
        this.showTipsBtn.x =0;
        this.showTipsBtn.y =430; 
        this.addChild(this.coinBtn);

        this.logoImg = new egret.Bitmap();
        this.logoImg.texture = this.assets.getTexture("logoImg");
        this.logoImg.anchorX = 0.5;
        this.logoImg.anchorY = 1;
        this.logoImg.x = this.w/2;
        this.logoImg.y = - 550;;
        this.addChild(this.logoImg);   







        this.stageBtn = new EButton(this,"title2",this.onChooseStage,"返回",10,5,"rpg");
        this.stageBtn.x = 700;
        this.stageBtn.y = 50;
        this.addChild(this.stageBtn);
        this.stageBtn.touchEnabled = true;    


        this.door_bg = new egret.Bitmap();
        this.door_bg.texture =  RES.getRes("lottery28_door_bg");
        this.door_bg.x =0;
        this.door_bg.y = 0;
        this.door_bg.touchEnabled = false;    
        this.door_bg.visible = false;    

        this.addChild(this.door_bg);  


        this.door_left = new EButton(this,"door_left",null,"",2,5,"rpg");
        this.door_left.x = 30;
        this.door_left.y = 0;
        this.addChild(this.door_left);
        this.door_left.touchEnabled = false; 

        this.door_right = new EButton(this,"door_right",null,"",2,5,"rpg");
        this.door_right.x = 200;
        this.door_right.y = 0;
        this.addChild(this.door_right);
        this.door_right.touchEnabled = false; 




        this.stageBtn1 = new EButton(this,"title",this.onChooseStage1,"入门区",30,5,"rpg");
        this.stageBtn1.x = 500;
        this.stageBtn1.y = 50;
        this.addChild(this.stageBtn1);
        this.stageBtn1.touchEnabled = true;     

        this.stageBtn2 = new EButton(this,"title",this.onChooseStage2,"熟手区",30,5,"rpg");
        this.stageBtn2.x = 500;
        this.stageBtn2.y = this.stageBtn1.y+80;
        this.addChild(this.stageBtn2);
        this.stageBtn2.touchEnabled = true;    

        this.stageBtn3 = new EButton(this,"title",this.onChooseStage3,"高额区",30,5,"rpg");
        this.stageBtn3.x = 500;
        this.stageBtn3.y = this.stageBtn1.y+160;
        this.addChild(this.stageBtn3);
        this.stageBtn3.touchEnabled = true;    



        this.door_left_vertical = new EButton(this,"door_vertical",null,"",2,5,"rpg");
        this.door_left_vertical.x = 0;
        this.door_left_vertical.y = 0;
        this.addChild(this.door_left_vertical);
        this.door_left_vertical.touchEnabled = false; 
        //

        this.door_right_vertical = new EButton(this,"door_vertical",null,"",2,5,"rpg");
        this.door_right_vertical.x = 770;
        this.door_right_vertical.y = 0;
        this.addChild(this.door_right_vertical);
        this.door_right_vertical.touchEnabled = false; 


        this.initEffect();

       // this.imgBtn.roulette(1000,1);
       // this.imgBtn1.roulette(250,250,0.5,0.5,20,1,true);
       
    }


/*
    public  setLocalStoreage(key,value : string):void{
        var storage = window.localStorage;
        storage.setItem(key,value);//用localStorage保存转化好的的字符串
        console.log(storage[key])
    }

 
    public  getLocalStoreage(key:string):string{
        var storage = window.localStorage;
        return storage.getItem(key);​
    }
*/
    public  getLocalStoreage(key:string):void{
        var storage = window.localStorage;

        var v = storage.getItem(key);​
        
        if (v =="" || v==null){ 
            console.log("nothing in LocalStorage",key)
        }else{
            var obj =JSON.parse(v)
            for(var i=0;i<obj.length;i++){             
                 
                     var str =    JSON.stringify( obj[i]) 
               var s = this.parseWebsocketResult(str)      

              $(".my").append(s)
              $(".all").append(s)
            }
        }

    } 
    public disconnenct():void{
        this.resetBet();
        var msg : BetJson  = { name: "slot",kind:this.game_kind,total:0,lucky:"",shash:"",nonce:"",ckey:"disconnect",pick:[],pk:[]};
        var str =JSON.stringify(msg);
        egret.setTimeout(function () {     
            SocketManager.sendMessage(str)
        }, this, this.websocket_delay);  
    }

    public sendBet():void{
        this.addWaitPanel();
        var bet_stake = 0;
        for(var i = 0; i < this.slots.length; i++){
            var obj = this.getSlot(i)
            if (obj != undefined) {
               bet_stake+= obj.stake
            }        
        }

        if (bet_stake> this.balance) {
                return
            }else{
                this.gameStart();
               // this.buttonBet.visible = false;
                //this.buttonBet.touchEnabled = false; 
                var str =JSON.stringify(this.myBet);
                egret.setTimeout(function () {     
                         SocketManager.sendMessage(str)                          
                }, this, this.websocket_delay);  
                EffectUtils.slotObj(this.slot_assets_name,this.slot_result,50,1)
        }   
    }

    public onPickIcon(e:egret.TouchEvent):void{     
     
     this.PutBet(this.slot_1,"pick","1",this.min_bet,this.myBet)
    }

    public onPickIcon0(e:egret.TouchEvent):void{        
     this.PutBet(this.slot_0,"pick","0",this.min_bet,this.myBet)
     
    }

    public onPickIcon1(e:egret.TouchEvent):void{     
   
     this.PutBet(this.slot_1,"pick","1",this.min_bet,this.myBet)
    }
    public onPickIcon2(e:egret.TouchEvent):void{        
     this.PutBet(this.slot_2,"pick","2",this.min_bet,this.myBet)
    }
    public onPickIcon3(e:egret.TouchEvent):void{        
     this.PutBet(this.slot_3,"pick","3",this.min_bet,this.myBet)
    }
    public onPickIcon4(e:egret.TouchEvent):void{        
    this.PutBet(this.slot_4,"pick","4",this.min_bet,this.myBet)
    }

    public onPickIcon5(e:egret.TouchEvent):void{        
     this.PutBet(this.slot_5,"pick","5",this.min_bet,this.myBet)
    }
    public onPickIcon6(e:egret.TouchEvent):void{        
     this.PutBet(this.slot_6,"pick","6",this.min_bet,this.myBet)
    }
    public onPickIcon7(e:egret.TouchEvent):void{        
     this.PutBet(this.slot_7,"pick","7",this.min_bet,this.myBet)
    }
    public onPickIcon8(e:egret.TouchEvent):void{        
     this.PutBet(this.slot_8,"pick","8",this.min_bet,this.myBet)
    }

    public onPickIcon9(e:egret.TouchEvent):void{        
     this.PutBet(this.slot_9,"pick","9",this.min_bet,this.myBet)
    }
    public onPickIcon10(e:egret.TouchEvent):void{        
     this.PutBet(this.slot_10,"pick","10",this.min_bet,this.myBet)
    }
    public onPickIcon11(e:egret.TouchEvent):void{        
     this.PutBet(this.slot_11,"pick","11",this.min_bet,this.myBet)
    }
    public onPickIcon12(e:egret.TouchEvent):void{        
     this.PutBet(this.slot_12,"pick","12",this.min_bet,this.myBet)
    }
    public onPickIcon13(e:egret.TouchEvent):void{        
     this.PutBet(this.slot_13,"pick","13",this.min_bet,this.myBet)
    }
    public onPickIcon14(e:egret.TouchEvent):void{        
    this.PutBet(this.slot_14,"pick","14",this.min_bet,this.myBet)
    }

    public onPickIcon15(e:egret.TouchEvent):void{        
     this.PutBet(this.slot_15,"pick","15",this.min_bet,this.myBet)
    }
    public onPickIcon16(e:egret.TouchEvent):void{        
     this.PutBet(this.slot_16,"pick","16",this.min_bet,this.myBet)
    }
    public onPickIcon17(e:egret.TouchEvent):void{        
     this.PutBet(this.slot_17,"pick","17",this.min_bet,this.myBet)
    }
    public onPickIcon18(e:egret.TouchEvent):void{        
     this.PutBet(this.slot_18,"pick","18",this.min_bet,this.myBet)
    }

    public onPickIcon19(e:egret.TouchEvent):void{        
     this.PutBet(this.slot_19,"pick","19",this.min_bet,this.myBet)
    }



    public onPickIcon20(e:egret.TouchEvent):void{        
     this.PutBet(this.slot_20,"pick","20",this.min_bet,this.myBet)
    }
    public onPickIcon21(e:egret.TouchEvent):void{        
     this.PutBet(this.slot_21,"pick","21",this.min_bet,this.myBet)
    }
    public onPickIcon22(e:egret.TouchEvent):void{        
     this.PutBet(this.slot_22,"pick","22",this.min_bet,this.myBet)
    }
    public onPickIcon23(e:egret.TouchEvent):void{        
     this.PutBet(this.slot_23,"pick","23",this.min_bet,this.myBet)
    }
    public onPickIcon24(e:egret.TouchEvent):void{        
    this.PutBet(this.slot_24,"pick","24",this.min_bet,this.myBet)
    }

    public onPickIcon25(e:egret.TouchEvent):void{        
     this.PutBet(this.slot_25,"pick","25",this.min_bet,this.myBet)
    }
    public onPickIcon26(e:egret.TouchEvent):void{        
     this.PutBet(this.slot_26,"pick","26",this.min_bet,this.myBet)
    }
    public onPickIcon27(e:egret.TouchEvent):void{        
     this.PutBet(this.slot_27,"pick","27",this.min_bet,this.myBet)
    }
    public onPickIcon28(e:egret.TouchEvent):void{        
     this.PutBet(this.slot_28,"pick","28",this.min_bet,this.myBet)
    }


 public PutBet(obj:EButton,kind,beticon:string,betstake:number,myObj:BetJson ):BetJson {   
    var nowBalance = this.balance- myObj.total 

        if (nowBalance < betstake){
            EffectUtils.blinkEffect(this.coinBtn,2000);
            EffectUtils.blinkEffect(this.e_balance,2000);
           // TipsManager.addTips(this.coinBtn,"馀额不足",0);

            return myObj
        } else {
            obj.stake += betstake;
            //obj.textField.text =  obj.stake.toString();   
            obj.textField2.text =  obj.stake.toString();   

        }

        if (kind =="pick"){
            var existed = false;
                  for(var i = 0; i < myObj.pick.length; i++){
                      if (myObj.pick[i].icon==beticon){
                         myObj.pick[i].stake +=  betstake;
                         myObj.total += betstake;
                         existed = true
                      }
                  }
            if (existed==false){      
                var bet = {icon:beticon,stake:betstake,profit:0}
                myObj.pick.push(bet);
                myObj.total += betstake;
            }

                this.e_stake.initNumber = myObj.total;
                this.e_stake.setNumber(myObj.total);

                this.e_balance.setNumber(this.e_balance.initNumber-myObj.total);                

        } 
        //console.log(myObj)
        return myObj;
        
 }   

    public parseWebsocketResult(str:string):string{
        var obj =JSON.parse(str)
        var contentStr =    JSON.stringify(obj.Content) 
        var contentObj = eval("(" + obj.Content+ ")")
        var lucky = obj.Lucky[0]
        var isLose =true

        this.balance = contentObj.balance;
        var allprofit = contentObj.allprofit;
        var balance =  parseFloat(contentObj.balance);
        //var shash =  parseFloat(contentObj.shash);
        //var shash =  parseFloat(contentObj.shash);
        var nonce =  contentObj.nonce
        var betid = contentObj.betid;
        var shash = contentObj.shash;
         shash = shash.substring(0,10)+"..";
       // console.log(betid)
        var unixTimestamp = new Date(obj.Timestamp * 1000) 
        var  commonTime = unixTimestamp.toLocaleString()
        var profit = ""
        if (allprofit < 0 ){
          profit =  "<div class='who red text-right'>"+allprofit+"</div>"
        } else if (allprofit > 0 ){
           profit =  "<div class='who green text-right'>"+allprofit+"</div>"
        } else {
           profit =  "<div class='who text-right'>"+allprofit+"</div>"
        }

        var s = "<div class='result'>"+
        "<div class='who'>"+obj.Uid+"</div>"+profit+
        "<div class='who text-right'>"+contentObj.total+"</div>"+
        "<div class='who text-center'><div class='badge'>"+contentObj.icon+"</div></div>"+
        "<div class='commontime text-right'>"+commonTime+"</div>" +
        "<div class='who text-right'>"+nonce+"</div>" +        
        "<div class='who text-right'>"+obj.Lucky+"</div>" 


        return s;     
    }
    public setSlot(): void {
        this.slots = [];
        //for (var i = 0; i < this.slotNumber; i++) {

            this.slots.push(this.slot_0)
            this.slots.push(this.slot_1)
            this.slots.push(this.slot_2)
            this.slots.push(this.slot_3)
            this.slots.push(this.slot_4)
            this.slots.push(this.slot_5)
            this.slots.push(this.slot_6)
            this.slots.push(this.slot_7)
            this.slots.push(this.slot_8)
            this.slots.push(this.slot_9)
            this.slots.push(this.slot_10)
            this.slots.push(this.slot_11)
            this.slots.push(this.slot_12)
            this.slots.push(this.slot_13)
            this.slots.push(this.slot_14)
            this.slots.push(this.slot_15)
            this.slots.push(this.slot_16)
            this.slots.push(this.slot_17)
            this.slots.push(this.slot_18)
            this.slots.push(this.slot_19)
            this.slots.push(this.slot_20)
            this.slots.push(this.slot_21)
            this.slots.push(this.slot_22)
            this.slots.push(this.slot_23)
            this.slots.push(this.slot_24)
            this.slots.push(this.slot_25)
            this.slots.push(this.slot_26)
            this.slots.push(this.slot_27)
           // this.slots.push(this.slot_28)          
        //}

        console.log(this.slots)
    }    
    public getSlot(icon:number): any {
        
       // var i = parseInt(icon);
        var slot = this.slots[icon]
        return slot;       
    }    
    public connetToServer(close: boolean,stage:string):void{
        this.setSlot();
       console.log(this.slots)
        console.log("connetToServer...")
                var m = $("meta[name=_xsrf]").attr('content');
                var host = $("meta[name=_host]").attr('content');
        SocketManager.connectServer(host+"/egame/ws/join?uname="+m+"?kind="+this.game_kind+"?stage="+stage);
        if (this.first_login) {

            this.first_login = false;
            var socketResultFun: Function = function(e) {
                this.buttonBet.visible = true;
                this.buttonBet.touchEnabled = true;


                var str = JSON.stringify(e.param)
                var s = this.parseWebsocketResult(str)
                var obj = JSON.parse(str)
                $(".all").prepend(s)
                var len = $(".all .result").length;
                // console.log("all .result:",len)
                for (var i = 0; i < len - 20; i++) {
                    $(".all .result:last").remove();
                }

                if (obj.Uid == this.uid) {

                    this.removeWaitPanel();
                    $(".my").prepend(s)
                    this.showResult(str);
                    egret.setTimeout(function() {

                    }, this, 100 * 2);

                    var len = $(".my .result").length;
                    //console.log(".my .result:",len)
                    for (var i = 0; i < len - 20; i++) {
                        $(".my .result:last").remove();
                    }
                    if (e.param.Type == "2" && e.param.Cmd == "result") {
                        //GameConfig.gameScene().maskLayer.removeChild(Global.waitPanel);
                        //  Global.waitPanel = null;
                        LocalStoreage.setLocalStoreage(this.game_kind, str)
                    }

                }

            }
            Global.addEventListener("result", socketResultFun, this)



            var socketAlreadyOnlineFun: Function = function(e) {
                this.buttonBet.visible = true;
                this.buttonBet.touchEnabled = true;   
                //this.closeDoor(true);    
                // this.reconnect(false);


            }
            Global.addEventListener("already_online", socketAlreadyOnlineFun, this)

            var onSocketCloseFun: Function = function(e) {
                this.buttonBet.visible = true;
                this.buttonBet.touchEnabled = true;   

                console.log("SocketClose");      
               

            }
            Global.addEventListener("onSocketClose", onSocketCloseFun, this)

            var onDisconnectFun: Function = function(e) {


                console.log("onDisconnectFun");


            }
            Global.addEventListener("disconnect", onDisconnectFun, this)
            var onJoinFun: Function = function(e) {
                var str = JSON.stringify(e.param)
                var obj = JSON.parse(str)
                this.balance = obj.Content
                this.coinBtn.textField.text = obj.Content
               
                this.e_balance.initNumber =Number(obj.Content);
                this.e_balance.setNumber(this.e_balance.initNumber)
                //console.log("join",obj)
                console.log("this.e_balance.initNumber",this.e_balance.initNumber)

            }
            Global.addEventListener("join", onJoinFun, this)



        }
        //

    }
     public onChooseStage(e:egret.TouchEvent):void{

            this.openDoor(false,"1");
    }

     public onChooseStage1(e:egret.TouchEvent):void{
            this.min_bet =this.base_bet *1;
            this.getLocalStoreage(this.game_kind)
            this.openDoor(true,"1");
    }
     public onChooseStage2(e:egret.TouchEvent):void{
            this.min_bet = this.base_bet *100;
            this.getLocalStoreage(this.game_kind)
            this.openDoor(true,"2");
    }
     public onChooseStage3(e:egret.TouchEvent):void{
            this.min_bet = this.base_bet *10000;
            this.getLocalStoreage(this.game_kind)
            this.openDoor(true,"3");
    }
     public onChooseStage4(e:egret.TouchEvent):void{
            this.min_bet = this.base_bet *100;
            this.getLocalStoreage(this.game_kind)
            this.openDoor(true,"4");
    }
     public onChooseStage5(e:egret.TouchEvent):void{
            this.min_bet = this.base_bet *100;
            this.getLocalStoreage(this.game_kind)
            this.openDoor(true,"5");
    }



      public onBackToChooseStage(e:egret.TouchEvent):void{

       
            this.openDoor(false,"0");
    }

    public openDoor(e:boolean,stage:string):void{
        if (e!=true){
            this.disconnenct();
            this.door_left.touchEnabled = false; 
            this.door_right.touchEnabled = false;       
    
            this.door_bg.alpha = 1
             //  egret.setTimeout(function() { this.door_bg.alpha = 1 }, this, 2000);         

             egret.setTimeout(function () {              
           this.stageBtn1.visible =true
           this.stageBtn2.visible =true
           this.stageBtn3.visible =true
               }, this, 2000);          
             egret.setTimeout(function () {     
                 egret.Tween.get(this.door_left).to({x:30},100,egret.Ease.backOut);          
                egret.Tween.get(this.door_right).to({x:200},100,egret.Ease.backOut); 
                egret.Tween.get(this.door_right_vertical).to({x:770},100,egret.Ease.backOut); 
                egret.Tween.get(this.door_left_vertical).to({x:0},100,egret.Ease.backOut); 
                
            }, this, 500*2);   

             egret.setTimeout(function () {     
                 this.door_bg.visible = true; 
                
            }, this, 1000);   



        } else {
            this.connetToServer(true,stage);
            var m = $("meta[name=_xsrf]").attr('content');

            var n = $("meta[name=uid]").attr('content');

           this.uid = n;
           this.slot_1.setMinBet(this.min_bet);
           this.slot_2.setMinBet(this.min_bet);
           this.slot_3.setMinBet(this.min_bet);
           this.slot_4.setMinBet(this.min_bet);
           this.slot_5.setMinBet(this.min_bet);
           this.slot_6.setMinBet(this.min_bet);
           this.slot_7.setMinBet(this.min_bet);
           this.slot_8.setMinBet(this.min_bet);
           this.stageBtn1.visible =false
           this.stageBtn2.visible =false
           this.stageBtn3.visible =false
        //   egret.setTimeout(function() { this.door_bg.alpha = 0.1 }, this, 100);  
           // this.door_bg.alpha = 0.9
           egret.setTimeout(function() { this.door_bg.alpha = 0.9 }, this, 2000);
          // egret.setTimeout(function() { this.door_bg.alpha = 0.9 }, this, 900);   
        
          // egret.setTimeout(function() { this.door_bg.alpha = 1 }, this, 2000);  




   
        //var md5Str:string = new md5().hex_md5(str);

               

            this.door_left.touchEnabled = true; 
            this.door_right.touchEnabled = false; 
             
             egret.setTimeout(function () {              
                egret.Tween.get(this.door_right).to({x:500 + this.width/2},500,egret.Ease.sineIn);                        
                egret.Tween.get(this.door_left).to({x:-430},500,egret.Ease.sineIn); 

                egret.Tween.get(this.door_right_vertical).to({x:900},500,egret.Ease.sineIn); 
                egret.Tween.get(this.door_left_vertical).to({x:-100},500,egret.Ease.sineIn); 
                 this.door_bg.visible = false;   
            }, this, 500*2);               
        }
    }
     
    public onButtonBetTouchTap(e:egret.TouchEvent):void{
  

    }
    

    public onButtonBtnTouchTap(e:egret.TouchEvent):void{
        Global.dispatchEvent(MainNotify.openButtonPanelNotify,null,false);
      Global.dispatchEvent(MainNotify.closeStartPanelNotify,null,false);    
              //  EffectUtils.slotObj(this.slot_1,100,2)  
    }
   
    public onImgBtnTouchTap(e:egret.TouchEvent):void{
       // Global.dispatchEvent(MainNotify.openImgPanelNotify,null,false);
       // Global.dispatchEvent(MainNotify.closeStartPanelNotify,null,false);        
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


    public onShowFishTouchTap(e:egret.TouchEvent):void{
        Global.dispatchEvent(MainNotify.openFishPanelNotify,null,false);
        Global.dispatchEvent(MainNotify.closeStartPanelNotify,null,false);      
    }


    public onAddFriendBtnTouchTap(e:egret.TouchEvent):void{
        Global.dispatchEvent(MainNotify.openAddFriendPanelNotify,2,false);
    }

    public onSetBtnTouchTap(e:egret.TouchEvent):void{
        Global.dispatchEvent(MainNotify.openSetPanelNotify,2,false);
    }
    public resetBet():void{
      //{ name: "slot",kind:"crap",total:0,lucky:"",shash:"",nonce:"",ckey:"",pick:[],pk:[]};
        this.myBet.total= 0;
        this.myBet.pick =[];
        this.myBet.pk =[];


        for (var i = 0; i < this.slots.length; i++) {
            var obj = this.getSlot(i)
            if (obj != undefined) {
               // console.log(obj)
                obj.textField2.text = "";            
                obj.stake = 0;
            }
        }
          this.e_balance.setNumber(this.e_balance.initNumber);      
          this.e_stake.initNumber = 0; 
          this.e_stake.setNumber(0);       
    }

    public startBet():void{

        this.sendBet();        
     
    }       

    public onResourceLoadComplete(event:RES.ResourceEvent):void {
       this.sound.play();
    }
    public setGoldPosition(obj: EButton, gold: number): EButton {
         switch (gold) {
           // case 0:
              //  return this.slot_0
             case 1 :
                 obj.x+=20
             break
           case 2 :
                 obj.x+=40
             break
           case 3 :
                 obj.x+=60
             break
           case 4 :
                 obj.x+=80
             break
           case 5 :
                 obj.x+=100
             break
           case 6 :
                 obj.x+=20
                 obj.y+=20
            break
           case 7 :
                 obj.x+=40
                 obj.y+=20
            break

           case 8 :
                 obj.x+=60
                 obj.y+=20
            break
           case 9 :
                 obj.x+=80
                 obj.y+=20
            break


        }     

        return obj
    }
    public flyGold(obj,target: EButton, gold,interval: number):void{
       // gold=  Maths.RndNum(99)+1   
              console.log(gold)
          
            var targetNewX=target.x+target.width/2
            var targetNewY=target.y+target.height/2

          
        var tips = 0;
        var bucks = 0;
        var offsetX = 0;
        var offsetY = 0;
          if (gold < 10) {
              tips = gold
          } else {
              tips =gold%10 //馀数
              bucks = Math.floor(gold/10) //丢弃小数部分，保留整数部分

              offsetY =  Math.ceil(Math.ceil(gold/50)) *25 //向上取整，有小数，则整数部分加1
        

          }
                    for(var i=0;i<bucks;i++){  
                       //  var coin:fighter.Airplane = fighter.Airplane.produce("coin",1000); 
                         var  coin = this.coins[10+i];
                                //this.setGoldPosition(coin,i+1)

                                // coin.fly(obj.x,obj.y,800,100,700,450,1000,0.25);
                                if (i < 5){
                                 coin.fly(obj.x+40+(i*20)+10,obj.y+40,800,100,targetNewX,targetNewY,interval,0.4);
                                } else {
                                  coin.fly(obj.x+40+((i-5)*20)+10,obj.y+25+40,800,100,targetNewX,targetNewY,interval,0.4);  
                                }

                                
                           
                        
                   }       

                   for(var i=0;i<tips;i++){  
                       //  var coin:fighter.Airplane = fighter.Airplane.produce("coin",1000); 
                         var  coin = this.coins[i];
                                //this.setGoldPosition(coin,i+1)

                                // coin.fly(obj.x,obj.y,800,100,700,450,1000,0.25);
                                if (i < 5){
                                 coin.fly(obj.x+40+(i*20),obj.y+offsetY+40,800,100,targetNewX,targetNewY,interval,0.25);
                                } else {

                                  coin.fly(obj.x+40+((i-5)*20),obj.y+offsetY+25+40,800,100,targetNewX,targetNewY,interval,0.25);  
                                }

                                
                           
                        
                   }

               
    }
    public blinkRpgslot(index:string,gold,interval:number):void{

        var obj = this.getSlot(parseInt(index)-1)
        if (obj != undefined) {
             EffectUtils.blinkEffect(obj,interval);
        }        
       
    }

    public showPickResult(index:string,golds,interval:number,target:EButton):void{      
            //console.log(index)
            //console.log(parseInt(index)-1)
        var obj = this.getSlot(parseInt(index)-1)
        if (obj != undefined) {
             this.flyGold(obj,this.coinBtn,golds,interval);
        }

    }

    public addWaitPanel():void{      
        Global.waitPanel = new WaitPanel(1);
        GameConfig.gameScene().maskLayer.addChild(Global.waitPanel);
    }
    public removeWaitPanel():void{      
      GameConfig.gameScene().maskLayer.removeChild(Global.waitPanel);
      Global.waitPanel = null;
    }








}

