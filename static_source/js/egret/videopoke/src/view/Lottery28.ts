
class Lottery28Panel extends     CrapPanel{

    public constructor(){
        super();
    }

/* ↓↓↓↓↓↓↓↓↓↓↓↓↓↓是引用此class需修改的*/
    //public initPanel():void{}
    //public initEffect():void{}
    //public showResult(str:string):void{}   
    public slot_assets_name : string = "lottery28"
    public min_bet : number = 0;
    public base_bet : number = 100;
    public websocket_delay : number = 500;
    public sound:egret.Sound = RES.getRes("sound");
    public slotNumber: number  =12

    public game_cname :string= "幸运28"
    public game_ename :string= "Lucky28"
    public game_kind :string="lottery28";
    public myBet : BetJson  = { name: "slot",kind:this.game_kind,total:0,lucky:"",shash:"",nonce:"",ckey:"",pick:[],pk:[]};
    //public odds :number[]=[1000,333,166,100,66,48,36,28,22,18]
/* ↑↑↑↑↑↑↑↑↑↑↑↑是引用此class需修改的*/
 
    public imgBtn1: EButton; //大转盘
    public imgBtn2: EButton; //中间转针
    public imgBtn3: EButton; //中间小转盘

    public e_number: ENumber; 
    public e_balance: ENumber; 
    public e_stake: ENumber; 
    public e_profit: ENumber; 

   // public imgSlot1_bottom: EButton; //
    public imgSlot1_cover: EButton; //

   // public imgSlot2_bottom: EButton; //
    public imgSlot2_cover: EButton; //
    public imgSlot3_cover: EButton; //
    public imgSlot4_cover: EButton; //
    public menu_select: ESelect; //


    public bet_mode_1: EButton; //
    public bet_mode_2: EButton; //



    public initPanel():void{

        this.bg = new egret.Bitmap();
      //  this.bg.texture = this.assets.getTexture("lottery28bg");
       // this.bg.texture =  RES.getRes("lottery28bg");
        this.bg.texture =  RES.getRes("lottery28bg");


        this.addChild(this.bg);   
        this.bg.touchEnabled = true;
/*
        this.imgSlot1_bottom = new EButton(this,"slot_bottom",null,"",30,1,"lottery28");
        this.imgSlot1_bottom.x = 50;
        this.imgSlot1_bottom.y = 50;
        this.addChild(this.imgSlot1_bottom);
        this.imgSlot1_bottom.touchEnabled = false;  
*/
        //this.slot_1 = new ERpgslot(this,"icon1",null,"X1",30,1);
        /*
        this.menu_select =  new ESelect(this,"glass_blue_button",null,"1",20,4,"lottery28");
        this.menu_select.x =  645;// 82+5;
        this.menu_select.y = 46+50;//78+5;
        this.menu_select.alpha = 1;      
        this.addChild(this.menu_select.selects[0]);   
        this.addChild(this.menu_select.selects[1]);   
        this.addChild(this.menu_select.selects[2]);   
        */

        this.slot_0 =  new EButton(this,"glass_blue_button",this.onPickIcon0,"0",20,4,"lottery28");
     //   this.slot_0 =  new EButton(this,"glass_blue_button",this.addBetPanel,"0",20,4,"lottery28");
        this.slot_0.x =  45;// 82+5;
        this.slot_0.y = 50;//78+5;
        this.slot_0.alpha = 1;
        this.slot_0.odd = 1000;
        this.slot_0.isBetButton = true;        
       
        this.addChild(this.slot_0);   



        this.slot_1 = new EButton(this,"glass_blue_button",this.onPickIcon1,"1",20,4,"lottery28");
        this.slot_1.x =   this.slot_0.x+ 80;//187+5;
        this.slot_1.y =  this.slot_0.y ;//38+5;   
        this.slot_1.alpha = 1;
        this.slot_1.isBetButton = true;
        this.slot_1.odd = 333;
        this.addChild(this.slot_1);

        this.slot_2 = new EButton(this,"glass_blue_button",this.onPickIcon2,"2",20,4,"lottery28");
        this.slot_2.x =   this.slot_0.x+ 160;//187+5;
        this.slot_2.y =  this.slot_0.y ;//38+5;   
        this.slot_2.alpha = 1;
        this.slot_2.isBetButton = true;
        this.slot_2.odd = 166;
        this.addChild(this.slot_2);


        this.slot_3 = new EButton(this,"glass_blue_button",this.onPickIcon3,"3",20,4,"lottery28");
        this.slot_3.x =   this.slot_0.x+(80*3);//187+5;
        this.slot_3.y =  this.slot_0.y ;//38+5;   
        this.slot_3.alpha = 1;
        this.slot_3.isBetButton = true;
        this.slot_3.odd = 100;
        this.addChild(this.slot_3);

        this.slot_4 = new EButton(this,"glass_blue_button",this.onPickIcon4,"4",20,4,"lottery28");
        this.slot_4.x =   this.slot_0.x+(80*4);
        this.slot_4.y =  this.slot_0.y ;   
        this.slot_4.alpha = 1;
        this.slot_4.isBetButton = true;
        this.slot_4.odd = 66;
        this.addChild(this.slot_4);

        this.slot_5 = new EButton(this,"glass_blue_button",this.onPickIcon5,"5",20,4,"lottery28");
        this.slot_5.x =   this.slot_0.x+(80*5);
        this.slot_5.y =  this.slot_0.y ;   
        this.slot_5.alpha = 1;
        this.slot_5.isBetButton = true;
        this.slot_5.odd = 48;
        this.addChild(this.slot_5);

        this.slot_6 = new EButton(this,"glass_blue_button",this.onPickIcon6,"6",20,4,"lottery28");
        this.slot_6.x =   this.slot_0.x+(80*6);
        this.slot_6.y =  this.slot_0.y ;   
        this.slot_6.alpha = 1;
        this.slot_6.isBetButton = true;
        this.slot_6.odd = 36;
        this.addChild(this.slot_6);

      



        this.slot_7 = new EButton(this,"glass_blue_button",this.onPickIcon7,"7",20,4,"lottery28");
        this.slot_7.x =   this.slot_0.x+(80*0);
        this.slot_7.y =  this.slot_0.y+(95*1) ;   
        this.slot_7.alpha = 1;
        this.slot_7.odd = 28;
        this.addChild(this.slot_7);

        this.slot_8 = new EButton(this,"glass_blue_button",this.onPickIcon8,"8",20,4,"lottery28");
        this.slot_8.x =   this.slot_0.x+(80*1);
        this.slot_8.y =  this.slot_0.y+(95*1) ;   
        this.slot_8.alpha = 1;
        this.slot_8.isBetButton = true;
        this.slot_8.odd = 22;
        this.addChild(this.slot_8);


        this.slot_9 = new EButton(this,"glass_blue_button",this.onPickIcon9,"9",20,4,"lottery28");
        this.slot_9.x =   this.slot_0.x+(80*2);
        this.slot_9.y =  this.slot_0.y+(95*1) ;   
        this.slot_9.alpha = 1;
        this.slot_9.isBetButton = true;
        this.slot_9.odd = 18;
        this.addChild(this.slot_9);


        this.slot_10 = new EButton(this,"glass_blue_button",this.onPickIcon10,"10",20,4,"lottery28");
        this.slot_10.x =   this.slot_0.x+(80*3);
        this.slot_10.y =  this.slot_0.y+(95*1) ;   
        this.slot_10.alpha = 1;
        this.slot_10.isBetButton = true;
        this.slot_10.odd = 16;
        this.addChild(this.slot_10);



        this.slot_11 = new EButton(this,"glass_blue_button",this.onPickIcon11,"11",20,4,"lottery28");
        this.slot_11.x =   this.slot_0.x+(80*4);
        this.slot_11.y =  this.slot_0.y+(95*1) ;   
        this.slot_11.alpha = 1;
        this.slot_11.isBetButton = true;
        this.slot_11.odd = 15;
        this.addChild(this.slot_11);


        this.slot_12 = new EButton(this,"glass_blue_button",this.onPickIcon12,"12",20,4,"lottery28");
        this.slot_12.x =   this.slot_0.x+(80*5);
        this.slot_12.y =  this.slot_0.y+(95*1) ;   
        this.slot_12.alpha = 1;
        this.slot_12.isBetButton = true;
        this.slot_12.odd = 14;
        this.addChild(this.slot_12);


        this.slot_13 = new EButton(this,"glass_blue_button",this.onPickIcon13,"13",20,4,"lottery28");
        this.slot_13.x =   this.slot_0.x+(80*6);
        this.slot_13.y =  this.slot_0.y+(95*1) ;   
        this.slot_13.alpha = 1;
        this.slot_13.isBetButton = true;
        this.slot_13.odd = 13;
        this.addChild(this.slot_13);

        this.slot_14 = new EButton(this,"glass_blue_button",this.onPickIcon14,"14",20,4,"lottery28");
        this.slot_14.x =   this.slot_0.x+(80*0);
        this.slot_14.y =  this.slot_0.y+(95*2) ;   
        this.slot_14.alpha = 1;
        this.slot_14.isBetButton = true;
        this.slot_14.odd = 13;
        this.addChild(this.slot_14); 


        this.slot_15 = new EButton(this,"glass_blue_button",this.onPickIcon15,"15",20,4,"lottery28");
        this.slot_15.x =   this.slot_0.x+(80*1);
        this.slot_15.y =  this.slot_0.y+(95*2) ;   
        this.slot_15.alpha = 1;
        this.slot_15.isBetButton = true;
        this.slot_15.odd = 14;
        this.addChild(this.slot_15); 


        this.slot_16 = new EButton(this,"glass_blue_button",this.onPickIcon16,"16",20,4,"lottery28");
        this.slot_16.x =   this.slot_0.x+(80*2);
        this.slot_16.y =  this.slot_0.y+(95*2) ;   
        this.slot_16.alpha = 1;
        this.slot_16.isBetButton = true;
        this.slot_16.odd = 15;
        this.addChild(this.slot_16); 
 

        this.slot_17 = new EButton(this,"glass_blue_button",this.onPickIcon17,"17",20,4,"lottery28");
        this.slot_17.x =   this.slot_0.x+(80*3);
        this.slot_17.y =  this.slot_0.y+(95*2) ;   
        this.slot_17.alpha = 1;        
        this.slot_17.isBetButton = true;
        this.slot_17.odd = 16;
        this.addChild(this.slot_17); 



        this.slot_18 = new EButton(this,"glass_blue_button",this.onPickIcon18,"18",20,4,"lottery28");
        this.slot_18.x =   this.slot_0.x+(80*4);
        this.slot_18.y =  this.slot_0.y+(95*2) ;   
        this.slot_18.alpha = 1;        
        this.slot_18.isBetButton = true;
        this.slot_18.odd = 18;
        this.addChild(this.slot_18); 


        this.slot_19 = new EButton(this,"glass_blue_button",this.onPickIcon19,"19",20,4,"lottery28");
        this.slot_19.x =   this.slot_0.x+(80*5);
        this.slot_19.y =  this.slot_0.y+(95*2) ;   
        this.slot_19.alpha = 1;        
        this.slot_19.isBetButton = true;
        this.slot_19.odd = 22;
        this.addChild(this.slot_19); 


        this.slot_20 = new EButton(this,"glass_blue_button",this.onPickIcon20,"20",20,4,"lottery28");
        this.slot_20.x =   this.slot_0.x+(80*6);
        this.slot_20.y =  this.slot_0.y+(95*2) ;   
        this.slot_20.alpha = 1;        
        this.slot_20.isBetButton = true;
        this.slot_20.odd = 28;
        this.addChild(this.slot_20); 



        this.slot_21 = new EButton(this,"glass_blue_button",this.onPickIcon21,"21",20,4,"lottery28");
        this.slot_21.x =   this.slot_0.x+(80*0);
        this.slot_21.y =  this.slot_0.y+(95*3) ;   
        this.slot_21.alpha = 1;        
        this.slot_21.isBetButton = true;
        this.slot_21.odd = 36;
        this.addChild(this.slot_21);        

        this.slot_22 = new EButton(this,"glass_blue_button",this.onPickIcon22,"22",20,4,"lottery28");
        this.slot_22.x =   this.slot_0.x+(80*1);
        this.slot_22.y =  this.slot_0.y+(95*3) ;   
        this.slot_22.alpha = 1;        
        this.slot_22.isBetButton = true;
        this.slot_22.odd = 48;
        this.addChild(this.slot_22); 

        this.slot_23 = new EButton(this,"glass_blue_button",this.onPickIcon23,"23",20,4,"lottery28");
        this.slot_23.x =   this.slot_0.x+(80*2);
        this.slot_23.y =  this.slot_0.y+(95*3) ;   
        this.slot_23.alpha = 1;        
        this.slot_23.isBetButton = true;
        this.slot_23.odd = 66;
        this.addChild(this.slot_23); 

        this.slot_24 = new EButton(this,"glass_blue_button",this.onPickIcon24,"24",20,4,"lottery28");
        this.slot_24.x =   this.slot_0.x+(80*3);
        this.slot_24.y =  this.slot_0.y+(95*3) ;   
        this.slot_24.alpha = 1;        
        this.slot_24.isBetButton = true;
        this.slot_24.odd = 100;
        this.addChild(this.slot_24); 


        this.slot_25 = new EButton(this,"glass_blue_button",this.onPickIcon25,"25",20,4,"lottery28");
        this.slot_25.x =   this.slot_0.x+(80*4);
        this.slot_25.y =  this.slot_0.y+(95*3) ;   
        this.slot_25.alpha = 1;        
        this.slot_25.isBetButton = true;
        this.slot_25.odd = 166;
        this.addChild(this.slot_25); 

        this.slot_26 = new EButton(this,"glass_blue_button",this.onPickIcon26,"26",20,4,"lottery28");
        this.slot_26.x =   this.slot_0.x+(80*5);
        this.slot_26.y =  this.slot_0.y+(95*3) ;   
        this.slot_26.alpha = 1;        
        this.slot_26.isBetButton = true;
        this.slot_26.odd = 333;
        this.addChild(this.slot_26); 

        this.slot_27 = new EButton(this,"glass_blue_button",this.onPickIcon27,"27",20,4,"lottery28");
        this.slot_27.x =   this.slot_0.x+(80*6);
        this.slot_27.y =  this.slot_0.y+(95*3) ;   
        this.slot_27.alpha = 1;        
        this.slot_27.isBetButton = true;
        this.slot_27.odd = 1000;
        this.addChild(this.slot_27); 

        this.slot_result = new EButton(this,"item",null,"bet",20,4,"lottery28");
        this.slot_result.x = 170+30;
        this.slot_result.y = 165+30;
        this.addChild(this.slot_result);   
        this.slot_result.alpha = 0;
        this.slot_result.setScale(1,1);
        this.slot_result.visible = false;

        this.imgSlot1_cover = new EButton(this,"slot_cover",null,"",30,1,"lottery28");
        this.imgSlot1_cover.x = this.slot_0.x-8;
        this.imgSlot1_cover.y = this.slot_0.y-6;
        this.addChild(this.imgSlot1_cover);
        this.imgSlot1_cover.touchEnabled = false;    

        this.imgSlot2_cover = new EButton(this,"slot_cover",null,"",30,1,"lottery28");
        this.imgSlot2_cover.x = this.slot_0.x-8;
        this.imgSlot2_cover.y = this.slot_0.y-6+(95*1);
        this.addChild(this.imgSlot2_cover);
        this.imgSlot2_cover.touchEnabled = false;  


        this.imgSlot3_cover = new EButton(this,"slot_cover",null,"",30,1,"lottery28");
        this.imgSlot3_cover.x = this.slot_0.x-8;
        this.imgSlot3_cover.y = this.slot_0.y-6+(95*2);
        this.addChild(this.imgSlot3_cover);
        this.imgSlot3_cover.touchEnabled = false;   

        this.imgSlot4_cover = new EButton(this,"slot_cover",null,"",30,1,"lottery28");
        this.imgSlot4_cover.x = this.slot_0.x-8;
        this.imgSlot4_cover.y = this.slot_0.y-6+(95*3);
        this.addChild(this.imgSlot4_cover);
        this.imgSlot4_cover.touchEnabled = false;   



        this.shot =  new EButton(this,"shot_2",null,"",30,1,"lottery28");
        this.shot.x =  187+5;// 82+5;
        this.shot.y = 38+5;//78+5;
        this.shot.alpha = 0;
        this.shot.setScale(1,1);
        this.shot.touchEnabled = false;   
        this.addChild(this.shot);   
        this.shot.isPlayCartoon = false;

       this.showTitle = new EButton(this,"title",null,this.game_cname,20,4,"lottery28");
        this.showTitle.x = 300;
        this.showTitle.y = 2;   
        this.addChild(this.showTitle);       
        this.showTitle.visible = false;      



       this.buttonBet = new EButton(this,"return",this.startBet,"Bet",30,4,"lottery28");
        //this.buttonBet = new ImgButton("bigYellowBtn",this.onButtonBetTouchTap,"Bet!!",30);
        this.buttonBet.x = 650;
        this.buttonBet.y =  300;        
        this.addChild(this.buttonBet);   



       this.buttonReset = new EButton(this,"return",this.resetBet,"Reset",25,4,"lottery28");
        //this.buttonBet = new ImgButton("bigYellowBtn",this.onButtonBetTouchTap,"Bet!!",30);
        this.buttonReset.x = this.buttonBet.x+0 ;
        this.buttonReset.y =  this.buttonBet.y+60;        
        this.addChild(this.buttonReset);      

        this.stageBtn = new EButton(this,"return",this.onChooseStage,"返回",10,5,"lottery28");
        this.stageBtn.x = this.buttonBet.x+0 ;
        this.stageBtn.y = this.buttonBet.y+120;  
        this.addChild(this.stageBtn);
        this.stageBtn.touchEnabled = true;  



        this.bet_mode_1 = new EButton(this,"return",this.addAdvPanel,"进阶",30,4,"lottery28");
        //this.buttonBet = new ImgButton("bigYellowBtn",this.onButtonBetTouchTap,"Bet!!",30);
        this.bet_mode_1.x = this.buttonBet.x+0 ;
        this.bet_mode_1.y =  this.buttonBet.y-60;             
        this.addChild(this.bet_mode_1);   


        this.bet_mode_2 = new EButton(this,"return",this.addAdvPanel,"简易",30,4,"lottery28");
        //this.buttonBet = new ImgButton("bigYellowBtn",this.onButtonBetTouchTap,"Bet!!",30);
        this.bet_mode_2.x = this.buttonBet.x+0 ;
        this.bet_mode_2.y =  this.buttonBet.y-120;             
        this.addChild(this.bet_mode_2);   




        this.showTipsBtn = new EButton(this,"b1",this.onShowFishTouchTap,"test",30,1,"lottery28");
        this.showTipsBtn.x =0;
        this.showTipsBtn.y =430; 
        this.addChild(this.showTipsBtn);
        this.showTipsBtn.visible = false;

        this.coinBtn = new EButton(this,"coin_container",null,"Loading",25,1,"lottery28");
        this.coinBtn.x =180;
        this.coinBtn.y =5; 
        this.addChild(this.coinBtn);
        this.coinBtn.visible = false;

        this.logoImg = new egret.Bitmap();
        this.logoImg.texture = this.assets.getTexture("logoImg");
        this.logoImg.anchorX = 0.5;
        this.logoImg.anchorY = 1;
        this.logoImg.x = this.w/2;
        this.logoImg.y = - 550;;
        this.addChild(this.logoImg);   

        //this.stageBtn = new EButton(this,"return",null,"返回",10,4,"lottery28");
        this.e_stake = new ENumber(0,20,"投注","number",12);
        this.e_stake.x = 10;
        this.e_stake.y = 2;
        this.addChild(this.e_stake);

        this.e_balance = new ENumber(this.balance,20,"馀额","number",12);
        this.e_balance.x = 220;
        this.e_balance.y = 2;
        this.addChild(this.e_balance);

        this.e_profit = new ENumber(0,20,"中奖","number",12);
        this.e_profit.x = 430;
        this.e_profit.y = 2;
        this.addChild(this.e_profit);


        this.door_bg = new egret.Bitmap();
        this.door_bg.texture =  RES.getRes("lottery28_door_bg");
       // this.door_bg.texture =  RES.getRes("");
       //this.door_bg.scaleX = 2;
       // this.door_bg.scaleY = 2;
        this.door_bg.x =0;
        this.door_bg.y = 0;
        this.door_bg.touchEnabled = false;    

        this.addChild(this.door_bg);  


 

        this.door_left = new EButton(this,"door_left",null,"",2,5,"lottery28");
        this.door_left.x = 100;
        this.door_left.y = 100;
        this.addChild(this.door_left);
        this.door_left.touchEnabled = false; 

        this.door_right = new EButton(this,"door_right",null,"",2,5,"lottery28");
        this.door_right.x = 100;
        this.door_right.y = 100;
        this.addChild(this.door_right);
        this.door_right.touchEnabled = false; 




        this.stageBtn1 = new EButton(this,"stage",this.onChooseStage1,"入门区",30,5,"lottery28");
        this.stageBtn1.x = 500;
        this.stageBtn1.y = 50;
        this.addChild(this.stageBtn1);
        this.stageBtn1.touchEnabled = true;     

        this.stageBtn2 = new EButton(this,"stage",this.onChooseStage2,"熟手区",30,5,"lottery28");
        this.stageBtn2.x = 500;
        this.stageBtn2.y = this.stageBtn1.y+150;
        this.addChild(this.stageBtn2);
        this.stageBtn2.touchEnabled = true;    

        this.stageBtn3 = new EButton(this,"stage",this.onChooseStage3,"高额区",30,5,"lottery28");
        this.stageBtn3.x = 500;
        this.stageBtn3.y = this.stageBtn1.y+300;
        this.addChild(this.stageBtn3);
        this.stageBtn3.touchEnabled = true;    



        this.door_left_vertical = new EButton(this,"door_vertical",null,"",2,5,"lottery28");
        this.door_left_vertical.x = 0;
        this.door_left_vertical.y = 0;
        this.addChild(this.door_left_vertical);
        this.door_left_vertical.touchEnabled = false; 
        //

        this.door_right_vertical = new EButton(this,"door_vertical",null,"",2,5,"lottery28");
        this.door_right_vertical.x = 770;
        this.door_right_vertical.y = 0;
        this.addChild(this.door_right_vertical);
        this.door_right_vertical.touchEnabled = false; 






        this.initEffect();


            var onSelectMode: Function = function(e) {

                console.log("onSelectMode",Global.selectMode)
                if (Global.selectMode>0) {
                      this.removeAdvPanel();
                    //  this.resetBet();  
                       this.betMode(Global.selectMode)            
                }
               /*
                switch (Global.selectMode)
                {
                    case 0:                          
                         break;                    
                    case 1:                         
                        console.log("大")

                        break;
                    case 2: 
                        console.log("2")
                        break;
                    case 3: 
                        console.log("3")
                        break;                        
                    case 4: 
                        console.log("4")
                        break;                    
    
                }
                */



            }
            Global.addEventListener("selectMode", onSelectMode, this)
       
    }
    public setStake(odd: number): number {
        return Math.round(this.min_bet/odd*100)/100 * this.min_bet*10
    }
   public betMode(n:number):void{
        switch (n){    
            case 1: //14到27 大
                for (var i = 14; i < 28; i++) {
                    var obj = this.slots[i];
                    var icon = i.toString();
                    var bet =  this.setStake(obj.odd) 
                    bet  =Math.round(bet*10)/10
                    this.PutBet(obj, "pick", icon, bet, this.myBet)
                }
                break;   
            case 2: //0到13 小
                for (var i = 0; i < 14; i++) {
                    var obj = this.slots[i];
                    var icon = i.toString();
                    var bet =  this.setStake(obj.odd) 
                    bet  =Math.round(bet*10)/10
                    this.PutBet(obj, "pick", icon, bet, this.myBet)
                }
              
                break;   

            case 3: //单
                for (var i = 1; i < 28; i+=2){
                   
                        var obj = this.slots[i];
                        var icon = i.toString();
                        var bet = this.setStake(obj.odd) 
                        
                        this.PutBet(obj, "pick", icon, bet, this.myBet)
                    
                }
              
                break;   

            case 4: //双
                for (var i = 0; i < 28; i+=2){
                   
                        var obj = this.slots[i];
                        var icon = i.toString();
                        var bet = this.setStake(obj.odd) 
                        
                        this.PutBet(obj, "pick", icon, bet, this.myBet)
                    
                }
              
                break;   

            case 5: //中 10~17
                for (var i = 10; i < 18; i++){
                   
                        var obj = this.slots[i];
                        var icon = i.toString();
                        var bet = this.setStake(obj.odd) 
                        
                        this.PutBet(obj, "pick", icon, bet, this.myBet)
                    
                }
                  break; 

            case 6: //边 0~9 ，18~27
                for (var i = 0; i < 10; i++){
                   
                        var obj = this.slots[i];
                        var icon = i.toString();
                        var bet = this.setStake(obj.odd) 
                        
                        this.PutBet(obj, "pick", icon, bet, this.myBet)
                    
                }  
                for (var i = 18; i < 28; i++){
                   
                        var obj = this.slots[i];
                        var icon = i.toString();
                        var bet = this.setStake(obj.odd) 
                        
                        this.PutBet(obj, "pick", icon, bet, this.myBet)
                    
                }  

                break; 

            case 7: //0尾
                for (var i = 0; i < 28; i++){
                     var j = i % 10
                     if (j == 0) {
                         var obj = this.slots[i];
                         var icon = i.toString();
                         var bet = this.setStake(obj.odd) 
                         
                         this.PutBet(obj, "pick", icon, bet, this.myBet)
                     }                 
                }                  
                break; 

            case 8: //1尾
                for (var i = 0; i < 28; i++){
                     var j = i % 10
                     if (j == 1) {
                         var obj = this.slots[i];
                         var icon = i.toString();
                         var bet = this.setStake(obj.odd) 
                         
                         this.PutBet(obj, "pick", icon, bet, this.myBet)
                     }                 
                }                  
                break; 

            case 9: //2尾
                for (var i = 0; i < 28; i++){
                     var j = i % 10
                     if (j == 2) {
                         var obj = this.slots[i];
                         var icon = i.toString();
                         var bet = this.setStake(obj.odd) 
                         
                         this.PutBet(obj, "pick", icon, bet, this.myBet)
                     }                 
                }                  
                break; 

            case 10: //3尾
                for (var i = 0; i < 28; i++){
                     var j = i % 10
                     if (j == 3) {
                         var obj = this.slots[i];
                         var icon = i.toString();
                         var bet = this.setStake(obj.odd) 
                         
                         this.PutBet(obj, "pick", icon, bet, this.myBet)
                     }                 
                }                  
                break; 
            case 11: //4尾
                for (var i = 0; i < 28; i++){
                     var j = i % 10
                     if (j == 4) {
                         var obj = this.slots[i];
                         var icon = i.toString();
                         var bet = this.setStake(obj.odd) 
                         
                         this.PutBet(obj, "pick", icon, bet, this.myBet)
                     }                 
                }                  
                break; 
            case 12: //5尾
                for (var i = 0; i < 28; i++){
                     var j = i % 10
                     if (j == 5) {
                         var obj = this.slots[i];
                         var icon = i.toString();
                         var bet = this.setStake(obj.odd) 
                         
                         this.PutBet(obj, "pick", icon, bet, this.myBet)
                     }                 
                }                  
                break; 

            case 13: //6尾
                for (var i = 0; i < 28; i++){
                     var j = i % 10
                     if (j == 6) {
                         var obj = this.slots[i];
                         var icon = i.toString();
                         var bet = this.setStake(obj.odd) 
                         
                         this.PutBet(obj, "pick", icon, bet, this.myBet)
                     }                 
                }                  
                break; 
            case 14: //7尾
                for (var i = 0; i < 28; i++){
                     var j = i % 10
                     if (j == 7) {
                         var obj = this.slots[i];
                         var icon = i.toString();
                         var bet = this.setStake(obj.odd) 
                         
                         this.PutBet(obj, "pick", icon, bet, this.myBet)
                     }                 
                }                  
                break; 

            case 15: //8尾
                for (var i = 0; i < 28; i++){
                     var j = i % 10
                     if (j == 8) {
                         var obj = this.slots[i];
                         var icon = i.toString();
                         var bet = this.setStake(obj.odd) 
                         
                         this.PutBet(obj, "pick", icon, bet, this.myBet)
                     }                 
                }                  
                break; 
            case 16: //9尾
                for (var i = 0; i < 28; i++){
                     var j = i % 10
                     if (j == 9) {
                         var obj = this.slots[i];
                         var icon = i.toString();
                         var bet = this.setStake(obj.odd) 
                         
                         this.PutBet(obj, "pick", icon, bet, this.myBet)
                     }                 
                }                  
                break; 

            case 17: //小尾
                for (var i = 0; i < 28; i++){
                     var j = i % 10
                     if (j == 0 || j == 1 || j == 2 || j == 3 || j == 4 ) {
                         var obj = this.slots[i];
                         var icon = i.toString();
                         var bet = this.setStake(obj.odd) 
                         
                         this.PutBet(obj, "pick", icon, bet, this.myBet)
                     }                 
                }                  
                break; 
            case 18: //大尾
                for (var i = 0; i < 28; i++){
                     var j = i % 10
                     if (j == 5 || j == 6 || j == 7 || j == 8 || j == 9 ) {
                         var obj = this.slots[i];
                         var icon = i.toString();
                         var bet = this.setStake(obj.odd) 
                         
                         this.PutBet(obj, "pick", icon, bet, this.myBet)
                     }                 
                }                  
                break; 

            case 19: //3馀0
                for (var i = 0; i < 28; i++){
                     var j = i % 3
                     if (j == 0) {
                         var obj = this.slots[i];
                         var icon = i.toString();
                         var bet = this.setStake(obj.odd) 
                         
                         this.PutBet(obj, "pick", icon, bet, this.myBet)
                     }                 
                }                  
                break; 


            case 20: //3馀1
                for (var i = 0; i < 28; i++){
                     var j = i % 3
                     if (j == 1) {
                         var obj = this.slots[i];
                         var icon = i.toString();
                         var bet = this.setStake(obj.odd) 
                         
                         this.PutBet(obj, "pick", icon, bet, this.myBet)
                     }                 
                }                  
                break; 

            case 21: //3馀2
                for (var i = 0; i < 28; i++){
                     var j = i % 3
                     if (j == 2) {
                         var obj = this.slots[i];
                         var icon = i.toString();
                         var bet = this.setStake(obj.odd) 
                         
                         this.PutBet(obj, "pick", icon, bet, this.myBet)
                     }                 
                }                  
                break; 

            case 22: //4馀0
                for (var i = 0; i < 28; i++){
                     var j = i % 4
                     if (j == 0) {
                         var obj = this.slots[i];
                         var icon = i.toString();
                         var bet = this.setStake(obj.odd) 
                         
                         this.PutBet(obj, "pick", icon, bet, this.myBet)
                     }                 
                }                  
                break; 

            case 23: //4馀1
                for (var i = 0; i < 28; i++){
                     var j = i % 4
                     if (j == 1) {
                         var obj = this.slots[i];
                         var icon = i.toString();
                         var bet = this.setStake(obj.odd) 
                         
                         this.PutBet(obj, "pick", icon, bet, this.myBet)
                     }                 
                }                  
                break; 


            case 24: //4馀2
                for (var i = 0; i < 28; i++){
                     var j = i % 4
                     if (j == 2) {
                         var obj = this.slots[i];
                         var icon = i.toString();
                         var bet = this.setStake(obj.odd) 
                         
                         this.PutBet(obj, "pick", icon, bet, this.myBet)
                     }                 
                }                  
                break; 
            case 25: //4馀3
                for (var i = 0; i < 28; i++){
                     var j = i % 4
                     if (j == 3) {
                         var obj = this.slots[i];
                         var icon = i.toString();
                         var bet = this.setStake(obj.odd) 
                         
                         this.PutBet(obj, "pick", icon, bet, this.myBet)
                     }                 
                }                  
                break; 

            case 26: //5馀0
                for (var i = 0; i < 28; i++){
                     var j = i % 5
                     if (j == 0) {
                         var obj = this.slots[i];
                         var icon = i.toString();
                         var bet = this.setStake(obj.odd) 
                         
                         this.PutBet(obj, "pick", icon, bet, this.myBet)
                     }                 
                }                  
                break; 
            case 27: //5馀1
                for (var i = 0; i < 28; i++){
                     var j = i % 5
                     if (j == 1) {
                         var obj = this.slots[i];
                         var icon = i.toString();
                         var bet = this.setStake(obj.odd) 
                         
                         this.PutBet(obj, "pick", icon, bet, this.myBet)
                     }                 
                }                  
                break; 
            case 28: //5馀2
                for (var i = 0; i < 28; i++){
                     var j = i % 5
                     if (j == 2) {
                         var obj = this.slots[i];
                         var icon = i.toString();
                         var bet = this.setStake(obj.odd) 
                         
                         this.PutBet(obj, "pick", icon, bet, this.myBet)
                     }                 
                }                  
                break; 

            case 29: //5馀3
                for (var i = 0; i < 28; i++){
                     var j = i % 5
                     if (j == 3) {
                         var obj = this.slots[i];
                         var icon = i.toString();
                         var bet = this.setStake(obj.odd) 
                         
                         this.PutBet(obj, "pick", icon, bet, this.myBet)
                     }                 
                }                  
                break; 

            case 30: //5馀4
                for (var i = 0; i < 28; i++){
                     var j = i % 5
                     if (j == 4) {
                         var obj = this.slots[i];
                         var icon = i.toString();
                         var bet = this.setStake(obj.odd) 
                         //bet  = Math.round(bet * 10) / 10
                         this.PutBet(obj, "pick", icon, bet, this.myBet)
                     }                 
                }                  
                break; 

        }

   }

/*
    public easyMode():void{
        this.addWaitPanel();
       
    }


    public advMode():void{
        this.addWaitPanel();
       
    }
*/
    public addAdvPanel():void{    
        if (Global.advPanel == null) {
            Global.advPanel = new AdvPanel(this, 1);
            GameConfig.gameScene().maskLayer.addChild(Global.advPanel);
        }
    }
    public removeAdvPanel():void{   
        if (Global.advPanel != undefined) {
            GameConfig.gameScene().maskLayer.removeChild(Global.advPanel);
            Global.advPanel = null;
        }
    }

    public addBetPanel():void{    
        if (Global.advPanel == null) {
            Global.advPanel = new AdvPanel(this, 2);
            GameConfig.gameScene().maskLayer.addChild(Global.advPanel);
        }
    }


/*
    public startBet():void{

        this.sendBet();        
        
       // this.imgBtn2.rouletteBegin(false)
       // this.imgBtn3.rouletteBegin(false)
       //this.showTipsBtn.rollBegin(100,460,300,200,600,100,500,1)
        
     
    }
*/


    public showResult(str:string):void{

        this.isPlay = false;
        var obj =JSON.parse(str)
        var contentStr =    JSON.stringify(obj.Content) 
        var contentObj = eval("(" + obj.Content+ ")")
        var lucky = obj.Lucky   
        var icon = contentObj.icon;

        var luckyIconObj = this.getSlot(icon);
        EffectUtils.blinkEffect(luckyIconObj, 2000);  
        var gold = 0;
        egret.setTimeout(function () {   
            for (var i = 0; i < contentObj.pick.length; i++) {
                 


                 var obj = this.getSlot(contentObj.pick[i].icon);

                var isLose = false
                if (obj.profit < 0) {isLose = true  }  


                if (contentObj.pick[i].profit < 0) {                
                   
                       
                } else {
                      // 显示单项中奖金额
                     // EffectUtils.showTips(contentObj.pick[i].profit,1,false,obj.x,obj.y+30);
                }
                     

                if (contentObj.pick[i].profit > 0 && contentObj.allprofit >0) {
                  
                    gold = Math.ceil(parseInt(contentObj.pick[i].profit) /this.min_bet);
                    gold = 10;
                    this.flyGold(obj,this.e_profit,gold,500);               
                }           

            }
        }, this, 100);         

        egret.setTimeout(function () {                   
            var isLose = false
            if (contentObj.allprofit < 0) {
                isLose = true
            }
            if (contentObj.allprofit > 0) {
                this.e_profit.addAnimatedNumber(contentObj.allprofit);
            }
        //EffectUtils.showTips(contentObj.allprofit,1,isLose,this.coinBtn.x,this.coinBtn.y+30);

              
        }, this, 950); 

        egret.setTimeout(function () {              
            this.coinBtn.setText(contentObj.balance)
              this.e_balance.addAnimatedNumber(contentObj.allprofit)
             if (contentObj.allprofit > 0) {  
                this.e_profit.addAnimatedNumber(contentObj.allprofit * -1);
            }
        }, this, 1550); 

    }






}

