
class CrapPanel extends     BasePanel{

    public constructor(){
        super();
    }
    //private betXML:JsonpReq;
    private bg:egret.Bitmap;
    private betJson :BetJson;
    private logoImg:egret.Bitmap;
    private buttonBtn:ImgButton;    
    private imgBtn:EButton;    
    private panelBtn:ImgButton;    
    private sceneBtn:ImgButton;    
    private tipsBtn:ImgButton;    
    private showTipsBtn:EButton;    
    private addFriendBtn:ImgButton;    
    private setBtn:ImgButton;    
    private bottomCopyRight:egret.Bitmap;

 

    private door_right:EButton;   
    private door_left:EButton;   

    public rpgslot_1:EBet;
    public rpgslot_2:EBet;
    public rpgslot_3:EBet;
    public rpgslot_4:EBet;
    public rpgslot_5:EBet;
    public rpgslot_6:EBet;
    public rpgslot_7:EBet;
    public rpgslot_8:EBet;
    public rpgslot_9:EBet;
    public rpgslot_result:EBet;

    public put_bet_0:EBet;
    public put_bet_1:EBet;
    public put_bet_2:EBet;
    public put_bet_3:EBet;
    public put_bet_4:EBet;
    public put_bet_5:EBet;
    public put_bet_6:EBet;
    public put_bet_7:EBet;
    public put_bet_8:EBet;
    public put_bet_9:EBet;
    public put_bet_10:EBet;

    public min_bet : number = 1000;
    public websocket_delay : number = 500;
    public sound:egret.Sound = RES.getRes("sound");

    private game_id :string="crap";
    private game_cname :string= "魔九"
    private game_kind :string="3";
    private uid : string="0";

    private shot:EButton;
/*
        name :string;
        kind :string;       
        total:number;
        lucky:string;
        hash :string;
        nonce:string;
        ckey:string;
*/
    public myBet : BetJson  = { name: "slot",kind:"crap",total:0,lucky:"",shash:"",nonce:"",ckey:"",pick:[],pk:[]};
    private showTitle:EButton;   
    private buttonBet:EButton;  
    private buttonReset:EButton;  
    private isPlay :boolean = false;

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


    public sendBet():void{

        //var obj =this.makeJson("","")
       // printBetJson(obj);
        var str =JSON.stringify(this.myBet);

        egret.setTimeout(function () {     
                 SocketManager.sendMessage(str)
            }, this, this.websocket_delay);  
        EffectUtils.slotObj("gem7",this.rpgslot_result,50,1)   
    }


    public initPanel():void{

        //var myBet = { name: "",kind:"4",total:0,pick:[],pk:[]};
        /*
              $(document).on('click', '#sendbtn', function(){
                 console.log('sendChat')
              });
*/      
        




        this.connetToServer(true);

 

        this.bg = new egret.Bitmap();
        this.bg.texture = this.assets.getTexture("bg");
        this.addChild(this.bg);   
        this.bg.touchEnabled = true;   

        this.imgBtn = new EButton(this,"rpg_panel",this.onImgBtnTouchTap,"",30,1,"rpg");
        this.imgBtn.x = 0;
        this.imgBtn.y = 0;
        this.addChild(this.imgBtn);
         this.imgBtn.touchEnabled = false; 

        this.put_bet_0 = new EButton(this,"icon0",null,"",20,4,"gem7");
        this.put_bet_0.x = 480;
        this.put_bet_0.y = 120;
        this.put_bet_0.setScale(0.5,0.5);
        this.addChild(this.put_bet_0);
           this.put_bet_0.alpha = 0;


        this.put_bet_1 = new EButton(this,"icon1",this.onPickIcon1,"",20,4,"gem7");
        this.put_bet_1.x = this.put_bet_0.x+60;
        this.put_bet_1.y = this.put_bet_0.y;
        this.put_bet_1.setScale(0.5,0.5);
        this.addChild(this.put_bet_1);
           this.put_bet_1.alpha = 0;

        this.put_bet_2 = new EButton(this,"icon2",this.onPickIcon2,"",20,4,"gem7");
        this.put_bet_2.x = this.put_bet_0.x+120;
        this.put_bet_2.y =this.put_bet_0.y;
        this.put_bet_2.setScale(0.5,0.5);
        this.addChild(this.put_bet_2);
           this.put_bet_2.alpha = 0;


        this.put_bet_3 = new EButton(this,"icon3",this.onPickIcon3,"",20,4,"gem7");
        this.put_bet_3.x = this.put_bet_0.x+180;
        this.put_bet_3.y =this.put_bet_0.y;
        this.put_bet_3.setScale(0.5,0.5);
        this.addChild(this.put_bet_3);
           this.put_bet_3.alpha = 0;



        this.put_bet_4 = new EButton(this,"icon4",this.onPickIcon4,"",20,4,"gem7");
        this.put_bet_4.x = this.put_bet_0.x+240;
        this.put_bet_4.y =this.put_bet_0.y;
        this.put_bet_4.setScale(0.5,0.5);
        this.addChild(this.put_bet_4);
           this.put_bet_4.alpha = 0;
        




          this.put_bet_5 = new EButton(this,"icon5",this.onPickIcon5,"",20,4,"gem7");
        this.put_bet_5.x = this.put_bet_0.x+0;
        this.put_bet_5.y = this.put_bet_0.y+60;
        this.put_bet_5.setScale(0.5,0.5);
        this.addChild(this.put_bet_5);
           this.put_bet_5.alpha = 0;


          this.put_bet_6 = new EButton(this,"icon6",this.onPickIcon6,"",20,4,"gem7");
        this.put_bet_6.x = this.put_bet_0.x+60;
        this.put_bet_6.y = this.put_bet_0.y+60;
        this.put_bet_6.setScale(0.5,0.5);
        this.addChild(this.put_bet_6);
           this.put_bet_6.alpha = 0;

          this.put_bet_7 = new EButton(this,"icon7",this.onPickIcon7,"",20,4,"gem7");
        this.put_bet_7.x = this.put_bet_0.x+120;
        this.put_bet_7.y = this.put_bet_0.y+60;
        this.put_bet_7.setScale(0.5,0.5);
        this.addChild(this.put_bet_7);
           this.put_bet_7.alpha = 0;




   
          this.put_bet_8 = new EButton(this,"icon8",this.onPickIcon8,"",20,4,"gem7");
        this.put_bet_8.x = this.put_bet_0.x+180;
        this.put_bet_8.y = this.put_bet_0.y+60;
        this.put_bet_8.setScale(0.5,0.5);
        this.addChild(this.put_bet_8);
           this.put_bet_8.alpha = 0;



           this.put_bet_9 = new EButton(this,"icon9",null,"",20,4,"gem7");
        this.put_bet_9.x = this.put_bet_0.x+240;
        this.put_bet_9.y = this.put_bet_0.y+60;
        this.put_bet_9.setScale(0.5,0.5);
        this.addChild(this.put_bet_9);      
           this.put_bet_9.alpha = 0;




        //this.rpgslot_1 = new ERpgslot(this,"icon1",null,"X1",30,1);
        this.rpgslot_1 =  new EButton(this,"icon1",this.onPickIcon1,"1",30,4,"gem7");
        this.rpgslot_1.x =  187+5;// 82+5;
        this.rpgslot_1.y = 38+5;//78+5;
        this.rpgslot_1.alpha = 0;
        this.rpgslot_1.setScale(1,1);
        this.rpgslot_1.isBetButton = true;
      //  this.rpgslot_1.touchEnabled = false;   
        this.addChild(this.rpgslot_1);   


        this.rpgslot_2 = new EButton(this,"icon2",this.onPickIcon2,"2",30,4,"gem7");
        this.rpgslot_2.x =  294+5;//187+5;
        this.rpgslot_2.y =  78+5;//38+5;
        this.addChild(this.rpgslot_2);   
        this.rpgslot_2.alpha = 0;
         this.rpgslot_2.isBetButton = true;
         this.rpgslot_2.setScale(1,1);

        this.rpgslot_3 = new EButton(this,"icon3",this.onPickIcon3,"3",30,4,"gem7");
        this.rpgslot_3.x = 336+5;//294+5;
        this.rpgslot_3.y = 186+5;//78+5;
        this.addChild(this.rpgslot_3);   
        this.rpgslot_3.alpha = 0;
         this.rpgslot_3.isBetButton = true;
        this.rpgslot_3.setScale(1,1);


        this.rpgslot_4 =new EButton(this,"icon4",this.onPickIcon4,"4",30,4,"gem7");
        this.rpgslot_4.x = 296+5;//336+5;//38+5;
        this.rpgslot_4.y = 296+5;//186+5; //186+5;
        this.addChild(this.rpgslot_4);   
        this.rpgslot_4.alpha = 0;
         this.rpgslot_4.isBetButton = true;
        this.rpgslot_4.setScale(1,1);

        this.rpgslot_5 =new EButton(this,"icon5",this.onPickIcon5,"5",30,4,"gem7");
        this.rpgslot_5.x =190+5;//296+5;// 170+30;
        this.rpgslot_5.y =333+5;//296+5;// 165+30;
        this.addChild(this.rpgslot_5);   
        this.rpgslot_5.alpha = 0;
         this.rpgslot_5.isBetButton = true;
        this.rpgslot_5.setScale(1,1);

        this.rpgslot_6 = new EButton(this,"icon6",this.onPickIcon6,"6",30,4,"gem7");
        this.rpgslot_6.x = 82+5//190+5;// 336+5;
        this.rpgslot_6.y = 290+5;//333+5;// 186+5;
        this.addChild(this.rpgslot_6);   
        this.rpgslot_6.alpha = 0;
         this.rpgslot_6.isBetButton = true;
        this.rpgslot_6.setScale(1,1);    

        this.rpgslot_7 = new EButton(this,"icon7",this.onPickIcon7,"7",30,4,"gem7");
        this.rpgslot_7.x = 38+5;//82+5;
        this.rpgslot_7.y = 186+5;//290+5;
        this.addChild(this.rpgslot_7);   
        this.rpgslot_7.alpha = 0;
         this.rpgslot_7.isBetButton = true;
        this.rpgslot_7.setScale(1,1);

        this.rpgslot_8 = new EButton(this,"icon8",this.onPickIcon8,"8",30,4,"gem7");
        this.rpgslot_8.x =82+5;//38+5;
        this.rpgslot_8.y =78+5;// 186+5;
        this.addChild(this.rpgslot_8);   
        this.rpgslot_8.alpha = 0;
         this.rpgslot_8.isBetButton = true;
        this.rpgslot_8.setScale(1,1);

        this.rpgslot_result = new EButton(this,"item",null,"bet",30,4,"gem7");
        this.rpgslot_result.x = 170+30;
        this.rpgslot_result.y = 165+30;
        this.addChild(this.rpgslot_result);   
        this.rpgslot_result.alpha = 0;
        this.rpgslot_result.setScale(1,1);

        this.rpgslot_9 = new EButton(this,"icon9",null,"",30,4,"gem7");
/*
        this.rpgslot_9.x = 296+5;
        this.rpgslot_9.y =296+5;
        this.addChild(this.rpgslot_9);   
        this.rpgslot_9.alpha = 0;
        this.rpgslot_9.setScale(1,1);   
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
        this.buttonBet.x = this.rpgslot_3.x+150 ;
        this.buttonBet.y =  this.rpgslot_3.y+50;        
        this.addChild(this.buttonBet);   
       this.buttonReset = new EButton(this,"b2",this.resetBet,"Reset",30,4,"rpg");
        //this.buttonBet = new ImgButton("bigYellowBtn",this.onButtonBetTouchTap,"Bet!!",30);
        this.buttonReset.x = this.rpgslot_3.x+250 ;
        this.buttonReset.y =  this.rpgslot_3.y+50;        
        this.addChild(this.buttonReset);               

        this.showTipsBtn = new EButton(this,"b1",this.onShowTipsBtnTouchTap,"test",30,1,"rpg");
        this.showTipsBtn.x =800;
        this.showTipsBtn.y =0; 
        this.addChild(this.showTipsBtn);


        this.logoImg = new egret.Bitmap();
        this.logoImg.texture = this.assets.getTexture("logoImg");
        this.logoImg.anchorX = 0.5;
        this.logoImg.anchorY = 1;
        this.logoImg.x = this.w/2;
        this.logoImg.y = - 550;;
        this.addChild(this.logoImg);   
/*
        this.buttonBtn = new ImgButton("bigYellowBtn",this.onButtonBtnTouchTap,"按钮特效!!",30);
        this.buttonBtn.x = 700;
        this.buttonBtn.y = 20;        
        this.addChild(this.buttonBtn);

        this.setBtn = new ImgButton("bigYellowBtn",this.onSetBtnTouchTap,"setup",30,2);
       // this.setBtn =    new EButton(this,"bigYellowBtn",this.onSetBtnTouchTap,30,2,"rpg");
        this.setBtn.x = 100
        this.setBtn.y =100
        this.addChild(this.setBtn);
        this.setBtn.alpha = 0;

        this.imgBtn = new ImgButton("bigYellowBtn",this.onSetBtnTouchTap,"图片特效",30,2);
       // this.imgBtn = new ImgButton("bigYellowBtn",this.onImgBtnTouchTap,"图片特效",30);
        this.imgBtn.x = -300;
        this.imgBtn.y = this.buttonBtn.y + 90;        
        this.addChild(this.imgBtn);


        this.panelBtn = new ImgButton("bigYellowBtn",this.onPanelBtnTouchTap,"面板特效",30,2);
 
       // this.panelBtn = new ImgButton("bigYellowBtn",this.onPanelBtnTouchTap,"面板特效",30);
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

 

        this.addFriendBtn = new ImgButton("addFriend",this.onAddFriendBtnTouchTap);
        this.addFriendBtn.x = 20;
        this.addFriendBtn.y = this.h - this.addFriendBtn.height - 60;   
        this.addChild(this.addFriendBtn);
        this.addFriendBtn.alpha = 0;



        this.bottomCopyRight = new egret.Bitmap();
        this.bottomCopyRight.texture = this.assets.getTexture("bottomCopyRight");
        this.bottomCopyRight.x = this.w/2 - this.bottomCopyRight.width/2;
        this.bottomCopyRight.y = this.h - this.bottomCopyRight.height;
        this.addChild(this.bottomCopyRight);  
        this.bottomCopyRight.alpha = 0;
*/
        //this.showTipsBtn = new ImgButton("bigYellowBtn",this.onShowTipsBtnTouchTap,"飘字特效",30);
        /*

*/


        this.door_left = new EButton(this,"door_left",this.onBackToChooseStage,"",2,5,"rpg");
        this.door_left.x = 30;
        this.door_left.y = 0;
        this.addChild(this.door_left);
        this.door_left.touchEnabled = false; 

        this.door_right = new EButton(this,"door_right",this.onChooseStage,"",2,5,"rpg");
        this.door_right.x = 200;
        this.door_right.y = 0;
        this.addChild(this.door_right);
        this.door_right.touchEnabled = true;       





        this.initEffect();
 


    }

    private initEffect():void{

        egret.setTimeout(function () {     
            egret.Tween.get(this.rpgslot_1).to({alpha:1},300);
            egret.Tween.get(this.rpgslot_1).to({alpha:1},300);
            egret.Tween.get(this.rpgslot_2).to({alpha:1},300);
            egret.Tween.get(this.rpgslot_3).to({alpha:1},300);
            egret.Tween.get(this.rpgslot_4).to({alpha:1},300);
            egret.Tween.get(this.rpgslot_5).to({alpha:1},300);
            egret.Tween.get(this.rpgslot_6).to({alpha:1},300);
            egret.Tween.get(this.rpgslot_7).to({alpha:1},300);
            egret.Tween.get(this.rpgslot_8).to({alpha:1},300);
           // egret.Tween.get(this.rpgslot_9).to({alpha:1},300);
            egret.Tween.get(this.rpgslot_result).to({alpha:1},300);
            
    }, this, 500*2);   

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
    }

/*
    public onPickIcon0(e:egret.TouchEvent):void{        
     this.myBet = this.PutBet("pick","0",this.min_bet,this.myBet)
    }
*/
    public onPickIcon1(e:egret.TouchEvent):void{        
     this.myBet = this.PutBet(this.rpgslot_1,"pick","1",this.min_bet,this.myBet)
    }
    public onPickIcon2(e:egret.TouchEvent):void{        
     this.myBet = this.PutBet(this.rpgslot_2,"pick","2",this.min_bet,this.myBet)
    }
    public onPickIcon3(e:egret.TouchEvent):void{        
     this.myBet = this.PutBet(this.rpgslot_3,"pick","3",this.min_bet,this.myBet)
    }
    public onPickIcon4(e:egret.TouchEvent):void{        
     this.myBet = this.PutBet(this.rpgslot_4,"pick","4",this.min_bet,this.myBet)
    }

    public onPickIcon5(e:egret.TouchEvent):void{        
     this.myBet = this.PutBet(this.rpgslot_5,"pick","5",this.min_bet,this.myBet)
    }
    public onPickIcon6(e:egret.TouchEvent):void{        
     this.myBet = this.PutBet(this.rpgslot_6,"pick","6",this.min_bet,this.myBet)
    }
    public onPickIcon7(e:egret.TouchEvent):void{        
     this.myBet = this.PutBet(this.rpgslot_7,"pick","7",this.min_bet,this.myBet)
    }
    public onPickIcon8(e:egret.TouchEvent):void{        
     this.myBet = this.PutBet(this.rpgslot_8,"pick","8",this.min_bet,this.myBet)
    }
/*
    public onPickIcon9(e:egret.TouchEvent):void{        
     this.myBet = this.PutBet(this.rpgslot_9,"pick","9",this.min_bet,this.myBet)
    }
*/

 private PutBet(obj:EButton,kind,beticon:string,betstake:number,myObj:BetJson ):BetJson {   
 /* 已完成 : 需遍历检查之前同一相目是否投注了，不然会直接覆写*/
        if (kind =="pick"){
            var existed = false;
                  for(var i = 0; i < myObj.pick.length; i++){
                      if (myObj.pick[i].icon==beticon){
                         myObj.pick[i].stake =  myObj.pick[i].stake+betstake;
                         myObj.total = myObj.total+ betstake;
                         existed = true
                      }
                  }
            if (existed==false){      
                var bet = {icon:beticon,stake:betstake,profit:0}
                myObj.pick.push(bet);
                myObj.total = myObj.total+ betstake;
            }
        } 
        return myObj;
        
    }   
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
    public parseWebsocketResult(str:string):string{
        var obj =JSON.parse(str)
        var contentStr =    JSON.stringify(obj.Content) 
        var contentObj = eval("(" + obj.Content+ ")")
        var lucky = obj.Lucky[0]
        var isLose =true

        var allprofit = contentObj.allprofit;
        var balance =  parseFloat(contentObj.balance);
        //var shash =  parseFloat(contentObj.shash);
        //var shash =  parseFloat(contentObj.shash);
        var nonce =  contentObj.nonce
        var betid = contentObj.betid;
        var shash = contentObj.shash;
         shash = shash.substring(0,10)+"....";
        console.log(betid)
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
        "<div class='who text-center'><div class='badge'>"+lucky+"</div></div>"+
        "<div class='commontime text-right'>"+commonTime+"</div>" +
        "<div class='who text-right'>"+nonce+"</div>" +        
        "<div class='who text-right'>"+shash+"</div>" 


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
    }

    public connetToServer(close:boolean):void{
        console.log("connetToServer...")
                var m = $("meta[name=_xsrf]").attr('content');
        SocketManager.connectServer("192.168.1.106:8092/egame/ws/join?uname="+m);
  
        var socketResultFun:Function = function(e){
            this.buttonBet.visible = true;
            this.buttonBet.touchEnabled = true;   
               
         
                var str = JSON.stringify(e.param)
                var s = this.parseWebsocketResult(str)
                var obj =JSON.parse(str)
                $(".all").prepend(s)
                var len=$(".all .result").length;
                console.log("all .result:",len)
                for(var i = 0; i < len-20; i++){
                     $(".all .result:last").remove();
                }         

                if (obj.Uid == this.uid) {
                    $(".my").prepend(s)
                     this.showResult(str);  
                    egret.setTimeout(function () { 
                        
                    }, this, 100*2);  

                    var len=$(".my .result").length;
                    console.log(".my .result:",len)
                    for(var i = 0; i < len-20; i++){
                         $(".my .result:last").remove();
                    }     
                    if (e.param.Type =="2" && e.param.Cmd=="result"){
                        GameConfig.gameScene().maskLayer.removeChild(Global.waitPanel);
                        Global.waitPanel = null;
                        LocalStoreage.setLocalStoreage(this.game_id,str)       
                    }

                }

                    //console.log(JSON.stringify(e.param));
               //    Global.alert("提示","socket数据收到了："+JSON.stringify(e.param));
                 // Global.alert("提示","socket数据收到了："+contentObj.allprofit);
        }
        Global.addEventListener("result",socketResultFun,this)

        var socketJoinFun:Function = function(e){

     
            var n = $("meta[name=uid]").attr('content');
              
    
            if (e.param.Uid == n) {
                GameConfig.gameScene().maskLayer.removeChild(Global.waitPanel);
                Global.waitPanel = null;
            }
        }
        Global.addEventListener("join",socketJoinFun,this)

        var socketAlreadyOnlineFun:Function = function(e){
            this.buttonBet.visible = true;
            this.buttonBet.touchEnabled = true;   
            this.closeDoor(true);    
           // this.reconnect(false);


        }
        Global.addEventListener("already_online",socketAlreadyOnlineFun,this)

        var onSocketCloseFun:Function = function(e){
            this.buttonBet.visible = true;
            this.buttonBet.touchEnabled = true;   
            this.closeDoor(true);    
          //  this.reconnect(false);

                    console.log("已断线");
                   //Global.alert("提示","已断线");
                 // Global.alert("提示","socket数据收到了："+contentObj.allprofit);
        }
        Global.addEventListener("onSocketClose",onSocketCloseFun,this)
        //

    }
     public onChooseStage(e:egret.TouchEvent):void{
             this.getLocalStoreage(this.game_id)
        this.closeDoor(false);
    }
      public onBackToChooseStage(e:egret.TouchEvent):void{

       
            this.closeDoor(true);
    }

    public closeDoor(e:boolean):void{
        if (e){
            this.door_left.touchEnabled = false; 
            this.door_right.touchEnabled = true;       
            // this.connetToServer(false);
             egret.setTimeout(function () {              
                egret.Tween.get(this.door_right).to({x:200},600,egret.Ease.backOut); 
            }, this, 500*2);   
             egret.setTimeout(function () {              
                egret.Tween.get(this.door_left).to({x:30},600,egret.Ease.backOut); 
            }, this, 500*2);            
        } else {
            var m = $("meta[name=_xsrf]").attr('content');

            var n = $("meta[name=uid]").attr('content');

            this.uid = n;
   

            this.door_left.touchEnabled = true; 
            this.door_right.touchEnabled = false; 
             
             egret.setTimeout(function () {              
                egret.Tween.get(this.door_right).to({x:500 + this.width/2},600,egret.Ease.backOut); 
            }, this, 500*2);   
             egret.setTimeout(function () {              
                egret.Tween.get(this.door_left).to({x:-430},600,egret.Ease.backOut); 
            }, this, 500*2);               
        }
    }
     
    public onButtonBetTouchTap(e:egret.TouchEvent):void{
  

    }
    

    public onButtonBtnTouchTap(e:egret.TouchEvent):void{
        Global.dispatchEvent(MainNotify.openButtonPanelNotify,null,false);
      Global.dispatchEvent(MainNotify.closeStartPanelNotify,null,false);    
              //  EffectUtils.slotObj(this.rpgslot_1,100,2)  
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
        this.rpgslot_8  .stake = 0;
    }
    public startBet():void{
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
    }
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
    //this.drawStopBtn();

    //this.sound = new RES.getRes("sound");
    this.sound.play();
    }

    private blinkRpgslot(index:string,interval:number):void{
         switch (index) {
           // case 0:
              //  return this.rpgslot_0
            case "1":
                EffectUtils.blinkEffect(this.rpgslot_1,interval);
                EffectUtils.showTips(this.rpgslot_1.stake.toString(),1,false,this.rpgslot_1.x,this.rpgslot_1.y+30);
                break         
            case "2":
                EffectUtils.blinkEffect(this.rpgslot_2,interval);
                break 
            case "3":
                EffectUtils.blinkEffect(this.rpgslot_3,interval);
                break 
            case "4":
                EffectUtils.blinkEffect(this.rpgslot_4,interval);
                break 
            case "5":
                EffectUtils.blinkEffect(this.rpgslot_5,interval);
                break 
            case "6":
                EffectUtils.blinkEffect(this.rpgslot_6,interval);
                break               
            case "7":
                EffectUtils.blinkEffect(this.rpgslot_7,interval);
                break 
            case "8":
                EffectUtils.blinkEffect(this.rpgslot_8,interval);
                break 
            case "9":
                EffectUtils.blinkEffect(this.rpgslot_9,interval);
                break 
            case "result":
                EffectUtils.blinkEffect(this.rpgslot_result,interval);
                break 
            case "all":
               EffectUtils.blinkEffect(this.rpgslot_1,interval);
               EffectUtils.blinkEffect(this.rpgslot_2,interval);
               EffectUtils.blinkEffect(this.rpgslot_3,interval);
               EffectUtils.blinkEffect(this.rpgslot_4,interval);
               EffectUtils.blinkEffect(this.rpgslot_5,interval);
               EffectUtils.blinkEffect(this.rpgslot_6,interval);
               EffectUtils.blinkEffect(this.rpgslot_7,interval);
               EffectUtils.blinkEffect(this.rpgslot_8,interval);
               EffectUtils.blinkEffect(this.rpgslot_9,interval);
                break 

        }
    }
    private showResult(str:string):void{
    console.log(str)
        this.isPlay = false;
        var obj =JSON.parse(str)
    console.log(obj)
        var contentStr =    JSON.stringify(obj.Content) 
        var contentObj = eval("(" + obj.Content+ ")")


     console.log(contentObj)
     console.log(contentObj.balance)
        var lucky = obj.Lucky
       this.showTitle.setText(contentObj.balance)
        EffectUtils.setSlotObj("gem7",this.rpgslot_result,2000,1)       
        
        for(var i=0;i<9;i++){             
            egret.setTimeout(function () { 
                this.rpgslot_result.setBitmap("icon"+i)          
            }, this, 10);  
        }
        

         
        if (lucky[0]=="0"){
            this.blinkRpgslot("all",1000);

        } else if (lucky[0]=="9"){
            egret.setTimeout(function () { 
                 this.blinkRpgslot("all",300);
             //  egret.Tween.get(this.shot).to({x:this.rpgslot_1.x,y:this.rpgslot_1.y,alpha:1},100, egret.Ease.elasticOut);
                
                 EffectUtils.showTips("-"+this.rpgslot_1.stake.toString(),1,true,this.rpgslot_1.x+30,this.rpgslot_1.y+30);
                 
            }, this, 500);    

             //egret.Tween.get(this.shot).to({alpha:0},100, egret.Ease.elasticOut);
        }
        else {
            
              this.blinkRpgslot(lucky[0],1000);
        }
        
        egret.setTimeout(function () { 
            this.rpgslot_result.setBitmap("icon"+lucky.substr(0,1))          
        }, this, 100+20);     
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
        
       // 


         //this.rpgslot_result.textField.text=lucky.substr(0,1)

    }

}

