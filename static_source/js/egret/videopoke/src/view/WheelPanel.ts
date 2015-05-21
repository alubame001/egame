
class WheelPanel extends     CrapPanel{

    public constructor(){
        super();
    }

/* ↓↓↓↓↓↓↓↓↓↓↓↓↓↓是引用此class需修改的*/
    //public initPanel():void{}
    //public initEffect():void{}
    //public showResult(str:string):void{}   
    public slot_assets_name : string = "gem7"
    public min_bet : number = 0;
    public base_bet : number = 100;
    public websocket_delay : number = 500;
    public sound:egret.Sound = RES.getRes("sound");
    public slotNumber: number  =12

    public game_cname :string= "十二生肖"
    public game_ename :string= "Chinese Zodiac"
    public game_kind :string="wheel";
    public myBet : BetJson  = { name: "slot",kind:this.game_kind,total:0,lucky:"",shash:"",nonce:"",ckey:"",pick:[],pk:[]};

/* ↑↑↑↑↑↑↑↑↑↑↑↑是引用此class需修改的*/
    public onImgBtnTouchTap(e:egret.TouchEvent):void{
        //  this.imgBtn1.test_roulette(60,60,250,250,0,10000,1,true);
     // this.imgBtn2.roulette(250,250,1,10000,1,false);  
    }
    public imgBtn1: EButton; //大转盘
    public imgBtn2: EButton; //中间转针
    public imgBtn3: EButton; //中间小转盘
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

         //中间转盘
        this.imgBtn1 = new EButton(this,"ui_roulette_001-hd",this.onImgBtnTouchTap,"",30,1,"wheel");
        this.imgBtn1.x = 250;
        this.imgBtn1.y = 250;
        this.imgBtn1.anchorX = 0.5;
        this.imgBtn1.anchorY = 0.5;
        this.addChild(this.imgBtn1);
         this.imgBtn1.touchEnabled = false; 
          this.imgBtn1.visible = false; 

        this.imgBtn2 = new EButton(this,"ui_roulette_004-hd",this.onImgBtnTouchTap,"",30,1,"wheel");
        this.imgBtn2.x = 227;
        this.imgBtn2.y = 229;
          this.imgBtn2.anchorX = 0.5;
        this.imgBtn2.anchorY = 0.5;      
        this.addChild(this.imgBtn2);
         this.imgBtn2.touchEnabled = false; 


         this.imgBtn3 = new EButton(this,"ui_roulette_003-hd",this.onImgBtnTouchTap,"",30,1,"wheel");
        this.imgBtn3.x = 227;
        this.imgBtn3.y = 229;
          this.imgBtn3.anchorX = 0.5;
        this.imgBtn3.anchorY = 0.5;      
        this.addChild(this.imgBtn3);
         this.imgBtn3.touchEnabled = false; 
       

        //this.slot_1 = new ERpgslot(this,"icon1",null,"X1",30,1);
        this.slot_1 =  new EButton(this,"121-1",this.onPickIcon1,"1",20,4,"12");
        this.slot_1.x =  240;// 82+5;
        this.slot_1.y = 50;//78+5;
        this.slot_1.alpha = 0;
        this.slot_1.setScale(1,1);
        this.slot_1.isBetButton = true;


        
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
        this.slot_3.x = 355;//294+5;
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

        this.slot_9 = new EButton(this,"129-1",this.onPickIcon9,"9",20,4,"12");
        this.slot_9.x =65;//38+5;
        this.slot_9.y =240;// 186+5;
        this.addChild(this.slot_9);   
        this.slot_9.alpha = 1;
        this.slot_9.isBetButton = true;
        this.slot_9.setScale(1,1);
        this.slot_9.picIndex = 9;  

        this.slot_10 = new EButton(this,"1210-1",this.onPickIcon10,"10",20,4,"12");
        this.slot_10.x =50;//38+5;
        this.slot_10.y =170;// 186+5;
        this.addChild(this.slot_10);   
        this.slot_10.alpha = 1;
        this.slot_10.isBetButton = true;
        this.slot_10.setScale(1,1);
        this.slot_10.picIndex = 10;  


        this.slot_11 = new EButton(this,"1211-1",this.onPickIcon11,"11",20,4,"12");
        this.slot_11.x =90;//38+5;
        this.slot_11.y =85;// 186+5;
        this.addChild(this.slot_11);   
        this.slot_11.alpha = 1;
        this.slot_11.isBetButton = true;
        this.slot_11.setScale(1,1);
        this.slot_11.picIndex = 11;  

        this.slot_12 = new EButton(this,"1212-1",this.onPickIcon12,"12",20,4,"12");
        this.slot_12.x =160;//38+5;
        this.slot_12.y =50;// 186+5;
        this.addChild(this.slot_12);   
        this.slot_12.alpha = 1;
        this.slot_12.isBetButton = true;
        this.slot_12.setScale(1,1);
        this.slot_12.picIndex = 11;  




        this.slot_result = new EButton(this,"item",null,"bet",20,4,"gem7");
        this.slot_result.x = 170+30;
        this.slot_result.y = 165+30;
        this.addChild(this.slot_result);   
        this.slot_result.alpha = 0;
        this.slot_result.setScale(1,1);
        this.slot_result.visible = false;

      //  this.slot_9 = new EButton(this,"icon9",null,"",20,4,"gem7");
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

        this.coinBtn = new EButton(this,"btc",null,"Loading",30,1,"coin");
        this.coinBtn.x =600;
        this.coinBtn.y =0; 
        this.addChild(this.coinBtn);
        this.coinBtn.touchEnabled = false; 


        this.logoImg = new egret.Bitmap();
        this.logoImg.texture = this.assets.getTexture("logoImg");
        this.logoImg.anchorX = 0.5;
        this.logoImg.anchorY = 1;
        this.logoImg.x = this.w/2;
        this.logoImg.y = - 550;;
        this.addChild(this.logoImg);
        this.logoImg.visible = false;   

        this.stageBtn = new EButton(this,"title2",this.onChooseStage,"返回",10,5,"rpg");
        this.stageBtn.x = 700;
        this.stageBtn.y = 50;
        this.addChild(this.stageBtn);
        this.stageBtn.touchEnabled = true;    

          this.door_bg = new egret.Bitmap();
        this.door_bg.texture =  RES.getRes("");
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
        this.door_right_vertical.x = 768;
        this.door_right_vertical.y = 0;
        this.addChild(this.door_right_vertical);
        this.door_right_vertical.touchEnabled = false; 


        this.initEffect();


       
    }



    public startBet():void{

        this.sendBet();        
        
        this.imgBtn2.rouletteBegin(false)
        this.imgBtn3.rouletteBegin(false)
        this.showTipsBtn.rollBegin(100,460,300,200,600,100,500,1)
        
     
    }



    public showResult(str:string):void{

        this.isPlay = false;
        var obj =JSON.parse(str)
        var contentStr =    JSON.stringify(obj.Content) 
        var contentObj = eval("(" + obj.Content+ ")")
        var lucky = obj.Lucky      
         this.imgBtn2.roulette(parseInt(contentObj.icon),500,true);   
         this.imgBtn3.roulette(parseInt(contentObj.icon),500,true);   

        var gold = 0;
            // this.flyGold(this.slot_1,this.coinBtn,golds,interval);

        this.blinkRpgslot(contentObj.icon,0,1000);
        for (var i = 0; i < contentObj.pick.length; i++) {
             var obj = this.getSlot(contentObj.pick[i].icon-1);
             if (obj != "undefined") {
                 if (contentObj.pick[i].profit > 0) {

                     gold = Math.ceil(parseInt(contentObj.pick[i].profit) / this.min_bet);
                     this.flyGold(obj, this.coinBtn, gold, 500);
                 }
             }
           

        }


         if (contentObj.allprofit < 0) {
               
               gold = Math.ceil(parseInt(contentObj.allprofit)*-1 /this.min_bet);
                 this.flyGold(this.coinBtn,this.imgBtn3,gold,500);
            }
                     
        egret.setTimeout(function () { 
            this.slot_result.setBitmap("icon"+lucky.substr(0,1))          
          }, this, 300); 
          egret.setTimeout(function () {                   
              var isLose = false
            if (contentObj.allprofit < 0) {
               isLose = true
            }  
            if (contentObj.allprofit == 0) {
                //  EffectUtils.showTips("0", 4,isLose);
            EffectUtils.showTips("0", 1,isLose,this.coinBtn.x,this.coinBtn.y);
                   
            } else {
                // EffectUtils.showTips(contentObj.allprofit, 4,isLose);
                  EffectUtils.showTips(contentObj.allprofit,1,isLose,this.coinBtn.x,this.coinBtn.y);
            }
                   this.coinBtn.setText(contentObj.balance)
         }, this, 1250); 



    }






}

