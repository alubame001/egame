
class StartPanel extends BasePanel{

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

    public rpgslot_1:ERpgslot;
    public rpgslot_2:ERpgslot;
    public rpgslot_3:ERpgslot;
    public rpgslot_4:ERpgslot;
    public rpgslot_5:ERpgslot;
    public rpgslot_6:ERpgslot;
    public rpgslot_7:ERpgslot;
    public rpgslot_8:ERpgslot;
    public rpgslot_9:ERpgslot;

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


    private gamekind :string="4";
  public myBet : BetJson  = { name: "slot",kind:"crap",total:0,lucky:"",shash:"",nonce:"",ckey:"",pick:[],pk:[]};
    private showTitle:EButton;   
    private buttonBet:EButton;  
    private isPlay :boolean = false;
     private sound:egret.Sound = RES.getRes("sound");
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
    public  setLocalStoreage(key,value : string):void{
        var storage = window.localStorage;
        var v = storage.getItem(key);​
        console.log(v)
        if (v =="" || v==null){ 
            var new_value = '['+value+']'
            storage.setItem(key,new_value);//用localStorage保存转化好的的字符串
        }else{
           
            var obj =JSON.parse(v)
            var newitem = JSON.parse(value)

            var i = obj.unshift(newitem)  //添加到数组的开头
            if (i>20){                  
               obj.pop()  //移除数组最後一个
            }           
            var newstr =    JSON.stringify(obj)  
            storage.setItem(key,newstr);
        }
       
    }  
    public  getLocalStoreage(key:string):void{
        var storage = window.localStorage;
        var v = storage.getItem(key);​
        console.log(v)
        if (v =="" || v==null){ 
            console.log("nothing in LocalStorage")
        }else{
            var obj =JSON.parse(v)
            for(var i=0;i<obj.length;i++){             
                 
                     var str =    JSON.stringify( obj[i]) 
               var s = this.parseWebsocketResult(str)      

               $("#result").append(s)
            }
        }

    }




    public SendBet():void{

        //var obj =this.makeJson("","")
       // printBetJson(obj);
        var str =JSON.stringify(this.myBet);
        console.log(str)
        egret.setTimeout(function () {     
                 SocketManager.sendMessage(str)
            }, this, this.websocket_delay);   
    }


    public initPanel():void{
        //var myBet = { name: "",kind:"4",total:0,pick:[],pk:[]};
        /*
              $(document).on('click', '#sendbtn', function(){
                 console.log('sendChat')
              });
*/      
         this.getLocalStoreage("slot");   
        this.connetToServer(true);

        var str ="test"
        $('#sendbtn').click(function () {
        //console.log('sendbtn')
         var str =JSON.stringify(this.myBet);
        SocketManager.sendMessage(str)
        });

        this.bg = new egret.Bitmap();
        this.bg.texture = this.assets.getTexture("bg");
        this.addChild(this.bg);   
        this.bg.touchEnabled = true;   

        this.imgBtn = new EButton(this,"rpg_panel",this.onImgBtnTouchTap,"",30,1,"rpg");
        this.imgBtn.x = 0;
        this.imgBtn.y = 0;
        this.addChild(this.imgBtn);
         this.imgBtn.touchEnabled = false; 

        this.put_bet_0 = new EButton(this,"icon0",this.onPickIcon0,"",20,4,"gem6");
        this.put_bet_0.x = 480;
        this.put_bet_0.y = 120;
        this.put_bet_0.setScale(0.5,0.5);
        this.addChild(this.put_bet_0);

          this.put_bet_1 = new EButton(this,"icon1",this.onPickIcon1,"",20,4,"gem6");
        this.put_bet_1.x = this.put_bet_0.x+60;
        this.put_bet_1.y = this.put_bet_0.y;
        this.put_bet_1.setScale(0.5,0.5);
        this.addChild(this.put_bet_1);

        this.put_bet_2 = new EButton(this,"icon2",this.onPickIcon2,"",20,4,"gem6");
        this.put_bet_2.x = this.put_bet_0.x+120;
        this.put_bet_2.y =this.put_bet_0.y;
        this.put_bet_2.setScale(0.5,0.5);
        this.addChild(this.put_bet_2);

        this.put_bet_3 = new EButton(this,"icon3",this.onPickIcon3,"",20,4,"gem6");
        this.put_bet_3.x = this.put_bet_0.x+180;
        this.put_bet_3.y =this.put_bet_0.y;
        this.put_bet_3.setScale(0.5,0.5);
        this.addChild(this.put_bet_3);



        this.put_bet_4 = new EButton(this,"icon4",this.onPickIcon4,"",20,4,"gem6");
        this.put_bet_4.x = this.put_bet_0.x+240;
        this.put_bet_4.y =this.put_bet_0.y;
        this.put_bet_4.setScale(0.5,0.5);
        this.addChild(this.put_bet_4);
        




          this.put_bet_5 = new EButton(this,"icon5",this.onPickIcon5,"",20,4,"gem6");
        this.put_bet_5.x = this.put_bet_0.x+0;
        this.put_bet_5.y = this.put_bet_0.y+60;
        this.put_bet_5.setScale(0.5,0.5);
        this.addChild(this.put_bet_5);


          this.put_bet_6 = new EButton(this,"icon6",this.onPickIcon6,"",20,4,"gem6");
        this.put_bet_6.x = this.put_bet_0.x+60;
        this.put_bet_6.y = this.put_bet_0.y+60;
        this.put_bet_6.setScale(0.5,0.5);
        this.addChild(this.put_bet_6);

          this.put_bet_7 = new EButton(this,"icon7",this.onPickIcon7,"",20,4,"gem6");
        this.put_bet_7.x = this.put_bet_0.x+120;
        this.put_bet_7.y = this.put_bet_0.y+60;
        this.put_bet_7.setScale(0.5,0.5);
        this.addChild(this.put_bet_7);




   
          this.put_bet_8 = new EButton(this,"icon8",this.onPickIcon8,"",20,4,"gem6");
        this.put_bet_8.x = this.put_bet_0.x+180;
        this.put_bet_8.y = this.put_bet_0.y+60;
        this.put_bet_8.setScale(0.5,0.5);
        this.addChild(this.put_bet_8);
           this.put_bet_9 = new EButton(this,"icon9",this.onPickIcon9,"",20,4,"gem6");
        this.put_bet_9.x = this.put_bet_0.x+240;
        this.put_bet_9.y = this.put_bet_0.y+60;
        this.put_bet_9.setScale(0.5,0.5);
        this.addChild(this.put_bet_9);      

        this.rpgslot_1 = new ERpgslot(this,"icon1",null,"X1",30,1);
        this.rpgslot_1.x = 82+5;
        this.rpgslot_1.y = 78+5;
        this.rpgslot_1.alpha = 0;
        this.rpgslot_1.setScale(1,1);
      //  this.rpgslot_1.touchEnabled = false;   
        this.addChild(this.rpgslot_1);   


        this.rpgslot_2 = new ERpgslot(this,"icon1",null,"X1",30,1);
        this.rpgslot_2.x = 187+5;
        this.rpgslot_2.y = 38+5;
        this.addChild(this.rpgslot_2);   
        this.rpgslot_2.alpha = 0;
         this.rpgslot_2.setScale(1,1);

        this.rpgslot_3 = new ERpgslot(this,"icon1",null,"X1",30,1);
        this.rpgslot_3.x = 294+5;
        this.rpgslot_3.y = 78+5;
        this.addChild(this.rpgslot_3);   
        this.rpgslot_3.alpha = 0;
        this.rpgslot_3.setScale(1,1);


        this.rpgslot_4 = new ERpgslot(this,"icon1",null,"X1",30,1);
        this.rpgslot_4.x = 38+5;
        this.rpgslot_4.y = 186+5;
        this.addChild(this.rpgslot_4);   
        this.rpgslot_4.alpha = 0;
        this.rpgslot_4.setScale(1,1);

        this.rpgslot_5 = new ERpgslot(this,"icon1",null,"X1",30,1);
        this.rpgslot_5.x = 170+30;
        this.rpgslot_5.y = 165+30;
        this.addChild(this.rpgslot_5);   
        this.rpgslot_5.alpha = 0;
        this.rpgslot_5.setScale(1,1);

        this.rpgslot_6 = new ERpgslot(this,"icon1",null,"X1",30,1);
        this.rpgslot_6.x = 336+5;
        this.rpgslot_6.y = 186+5;
        this.addChild(this.rpgslot_6);   
        this.rpgslot_6.alpha = 0;
        this.rpgslot_6.setScale(1,1);    

        this.rpgslot_7 = new ERpgslot(this,"icon1",null,"X1",30,1);
        this.rpgslot_7.x = 82+5;
        this.rpgslot_7.y = 290+5;
        this.addChild(this.rpgslot_7);   
        this.rpgslot_7.alpha = 0;
        this.rpgslot_7.setScale(1,1);

        this.rpgslot_8 = new ERpgslot(this,"icon1",null,"X1",30,1);
        this.rpgslot_8.x = 190+5;
        this.rpgslot_8.y = 333+5;
        this.addChild(this.rpgslot_8);   
        this.rpgslot_8.alpha = 0;
        this.rpgslot_8.setScale(1,1);

        this.rpgslot_9 = new ERpgslot(this,"icon1",null,"X1",30,1);
        this.rpgslot_9.x = 296+5;
        this.rpgslot_9.y =296+5;
        this.addChild(this.rpgslot_9);   
        this.rpgslot_9.alpha = 0;
        this.rpgslot_9.setScale(1,1);   



       this.showTitle = new EButton(this,"title",null,"",30,4,"rpg");
        this.showTitle.x = 342 ;
        this.showTitle.y = 12;   
        this.addChild(this.showTitle);       

       this.buttonBet = new EButton(this,"b1",this.bet,"Bet",30,4,"rpg");
        //this.buttonBet = new ImgButton("bigYellowBtn",this.onButtonBetTouchTap,"Bet!!",30);
        this.buttonBet.x = this.rpgslot_6.x+150 ;
        this.buttonBet.y =  this.rpgslot_6.y+50;        
        this.addChild(this.buttonBet);       

        this.showTipsBtn = new EButton(this,"b1",this.onShowTipsBtnTouchTap,"tipsPanel",30,1,"rpg");
        this.showTipsBtn.x =300;
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
        this.door_left = new EButton(this,"door_left",this.onBackToChooseStage,"",2,4,"rpg");
        this.door_left.x = 30;
        this.door_left.y = 0;
        this.addChild(this.door_left);
        this.door_left.touchEnabled = false; 

        this.door_right = new EButton(this,"door_right",this.onChooseStage,"",2,4,"rpg");
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
            egret.Tween.get(this.rpgslot_9).to({alpha:1},300);
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


    public onPickIcon0(e:egret.TouchEvent):void{        
     this.myBet = this.PutBet("pick","0",this.min_bet,this.myBet)
    }
    public onPickIcon1(e:egret.TouchEvent):void{        
     this.myBet = this.PutBet("pick","1",this.min_bet,this.myBet)
    }
    public onPickIcon2(e:egret.TouchEvent):void{        
     this.myBet = this.PutBet("pick","2",this.min_bet,this.myBet)
    }
    public onPickIcon3(e:egret.TouchEvent):void{        
     this.myBet = this.PutBet("pick","3",this.min_bet,this.myBet)
    }
    public onPickIcon4(e:egret.TouchEvent):void{        
     this.myBet = this.PutBet("pick","4",this.min_bet,this.myBet)
    }

    public onPickIcon5(e:egret.TouchEvent):void{        
     this.myBet = this.PutBet("pick","5",this.min_bet,this.myBet)
    }
    public onPickIcon6(e:egret.TouchEvent):void{        
     this.myBet = this.PutBet("pick","6",this.min_bet,this.myBet)
    }
    public onPickIcon7(e:egret.TouchEvent):void{        
     this.myBet = this.PutBet("pick","7",this.min_bet,this.myBet)
    }
    public onPickIcon8(e:egret.TouchEvent):void{        
     this.myBet = this.PutBet("pick","8",this.min_bet,this.myBet)
    }
    public onPickIcon9(e:egret.TouchEvent):void{        
     this.myBet = this.PutBet("pick","9",this.min_bet,this.myBet)
    }


 private PutBet(kind,beticon:string,betstake:number,myObj:BetJson ):BetJson {   
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

    public parseWebsocketResult(str:string):string{
        var obj =JSON.parse(str)
        var contentStr =    JSON.stringify(obj.Content) 
        var contentObj = eval("(" + obj.Content+ ")")
        var lucky = contentObj.lucky
        var isLose =true
        //console.log(this.$("#result"))
        var allprofit = contentObj.allprofit;
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

        var s = "<div class='result win'>"+
        "<div class='who'>"+obj.User+"</div>"+
        profit+
        "<div class='who text-right'>"+contentObj.total+"</div>"+
        "<div class='who text-right'>"+lucky+"</div>"+
        "<div class='commontime text-right'>"+commonTime+"</div>" 
        return s;     
    }

    public connetToServer(close:boolean):void{
//SocketManager.connectServer("192.168.1.101:8092/egame/ws/join?uname=visitor");
        console.log("connecting")
        var socketFun:Function = function(e){
        this.buttonBet.visible = true;
        this.buttonBet.touchEnabled = true;   
            //console.log("socketFun");
            //var json = JSON.parse(e)
            var str = JSON.stringify(e.param)
            //      console.log(str)
            this.setLocalStoreage("slot",str)            
             var obj =JSON.parse(str)
            var contentStr =    JSON.stringify(obj.Content) 
            var contentObj = eval("(" + obj.Content+ ")")
            var lucky = contentObj.lucky
            var isLose =true
            //console.log(this.$("#result"))
            var allprofit = contentObj.allprofit;
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

            var s = "<div class='result win'>"+
            "<div class='who'>"+obj.User+"</div>"+
            profit+
            "<div class='who text-right'>"+contentObj.total+"</div>"+
            "<div class='who text-right'>"+lucky+"</div>"+
            "<div class='commontime text-right'>"+commonTime+"</div>"       
     
           $("#result").prepend(s)
            var len=$(".result").length;
                  console.log(len)
                   for(var i = 0; i < len-20; i++){
                   $(".result:last").remove();
                  }
            //console.log("pick length:",contentObj.pick.length)
            for(var i = 0; i < contentObj.pick.length; i++){
             //  console.log("pick",contentObj.pick[i].icon)
               switch (contentObj.pick[i].icon) {
                    case "0":
                        
                         if (contentObj.pick[i].profit > 0) {
                            EffectUtils.showTips(contentObj.pick[i].profit, 1,false,this.put_bet_0.x,this.put_bet_0.y);
                        }else if (contentObj.pick[i].profit < 0) {
                            EffectUtils.showTips(contentObj.pick[i].profit, 1,true,this.put_bet_0.x,this.put_bet_0.y);
                        } else {
                             EffectUtils.showTips("0", 1,true,this.put_bet_0.x,this.put_bet_0.y);     
                        }
                       //  EffectUtils.blinkEffect(this.put_bet_0,1000)
                        break;
                    case "1":
                         if (contentObj.pick[i].profit > 0) {
                            EffectUtils.showTips(contentObj.pick[i].profit, 1,false,this.put_bet_1.x,this.put_bet_1.y);
                        }else if (contentObj.pick[i].profit < 0) {
                            EffectUtils.showTips(contentObj.pick[i].profit, 1,true,this.put_bet_1.x,this.put_bet_1.y);
                        } else {
                             EffectUtils.showTips("0", 1,true,this.put_bet_1.x,this.put_bet_1.y);     
                        }
                       //  EffectUtils.blinkEffect(this.put_bet_1,1000)
                        break;               
                    case "2":
                         if (contentObj.pick[i].profit > 0) {
                            EffectUtils.showTips(contentObj.pick[i].profit, 1,false,this.put_bet_2.x,this.put_bet_2.y);
                        }else if (contentObj.pick[i].profit < 0 ){
                            EffectUtils.showTips(contentObj.pick[i].profit, 1,true,this.put_bet_2.x,this.put_bet_2.y);
                        } else {
                             EffectUtils.showTips("0", 1,true,this.put_bet_2.x,this.put_bet_2.y);     
                        }
                        // EffectUtils.blinkEffect(this.put_bet_2,1000)
                        break;
                    case "3":
                                if (contentObj.pick[i].profit > 0) {
                            EffectUtils.showTips(contentObj.pick[i].profit, 1,false,this.put_bet_3.x,this.put_bet_3.y);
                        }else if (contentObj.pick[i].profit < 0 ){
                            EffectUtils.showTips(contentObj.pick[i].profit, 1,true,this.put_bet_3.x,this.put_bet_3.y);
                        } else {
                             EffectUtils.showTips("0", 1,true,this.put_bet_3.x,this.put_bet_3.y);     
                        }
                       //  EffectUtils.blinkEffect(this.put_bet_3,1000)
                        break;
                    case "4":
                         if (contentObj.pick[i].profit > 0) {
                            EffectUtils.showTips(contentObj.pick[i].profit, 1,false,this.put_bet_4.x,this.put_bet_4.y);
                        }else if (contentObj.pick[i].profit < 0 ){
                            EffectUtils.showTips(contentObj.pick[i].profit, 1,true,this.put_bet_4.x,this.put_bet_4.y);
                        } else {
                             EffectUtils.showTips("0", 1,true,this.put_bet_4.x,this.put_bet_4.y);     
                        }
                      //   EffectUtils.blinkEffect(this.put_bet_4,1000)
                        break;

                    case "5":
                       
                         if (contentObj.pick[i].profit > 0) {
                            EffectUtils.showTips(contentObj.pick[i].profit, 1,false,this.put_bet_5.x,this.put_bet_5.y);
                        }else if (contentObj.pick[i].profit < 0 ){
                            EffectUtils.showTips(contentObj.pick[i].profit, 1,true,this.put_bet_5.x,this.put_bet_5.y);
                        } else {
                             EffectUtils.showTips("0", 1,true,this.put_bet_5.x,this.put_bet_5.y);     
                        }
                       //  EffectUtils.blinkEffect(this.put_bet_5,1000)
                        break;               
                    case "6":
                         if (contentObj.pick[i].profit > 0) {
                            EffectUtils.showTips(contentObj.pick[i].profit, 1,false,this.put_bet_6.x,this.put_bet_6.y);
                        }else if (contentObj.pick[i].profit < 0 ){
                            EffectUtils.showTips(contentObj.pick[i].profit, 1,true,this.put_bet_6.x,this.put_bet_6.y);
                        } else {
                             EffectUtils.showTips("0", 1,true,this.put_bet_6.x,this.put_bet_6.y);     
                        }
                         EffectUtils.blinkEffect(this.put_bet_6,1000)
                        break;
                    case "7":
                         if (contentObj.pick[i].profit > 0) {
                            EffectUtils.showTips(contentObj.pick[i].profit, 1,false,this.put_bet_7.x,this.put_bet_7.y);
                        }else if (contentObj.pick[i].profit < 0 ){
                            EffectUtils.showTips(contentObj.pick[i].profit, 1,true,this.put_bet_7.x,this.put_bet_7.y);
                        } else {
                             EffectUtils.showTips("0", 1,true,this.put_bet_7.x,this.put_bet_7.y);     
                        }
                        // EffectUtils.blinkEffect(this.put_bet_7,1000)
                        break;
                    case "8":
                         if (contentObj.pick[i].profit > 0) {
                            EffectUtils.showTips(contentObj.pick[i].profit, 1,false,this.put_bet_8.x,this.put_bet_8.y);
                        }else if (contentObj.pick[i].profit < 0) {
                            EffectUtils.showTips(contentObj.pick[i].profit, 1,true,this.put_bet_8.x,this.put_bet_8.y);
                        } else {
                             EffectUtils.showTips("0", 1,true,this.put_bet_8.x,this.put_bet_8.y);     
                        }
                         EffectUtils.blinkEffect(this.put_bet_8,1000)
                        break;


                    case "8":
                         if (contentObj.pick[i].profit > 0) {
                            EffectUtils.showTips(contentObj.pick[i].profit, 1,false,this.put_bet_9.x,this.put_bet_9.y);
                        }else if (contentObj.pick[i].profit < 0) {
                            EffectUtils.showTips(contentObj.pick[i].profit, 1,true,this.put_bet_9.x,this.put_bet_9.y);
                        } else {
                             EffectUtils.showTips("0", 1,true,this.put_bet_9.x,this.put_bet_9.y);     
                        }
                        // EffectUtils.blinkEffect(this.put_bet_9,1000)
                        break;



                }


            }


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




           this.recover();
             egret.setTimeout(function () {   



            this.rpgslot_1.setBitmap("icon"+lucky.substr(0,1))
            this.rpgslot_2.setBitmap("icon"+lucky.substr(1,1))
            this.rpgslot_3.setBitmap("icon"+lucky.substr(2,1))
            this.rpgslot_4.setBitmap("icon"+lucky.substr(3,1))
            this.rpgslot_5.setBitmap("icon"+lucky.substr(4,1))
            this.rpgslot_6.setBitmap("icon"+lucky.substr(5,1))
            this.rpgslot_7.setBitmap("icon"+lucky.substr(6,1))
            this.rpgslot_8.setBitmap("icon"+lucky.substr(7,1))
            this.rpgslot_9.setBitmap("icon"+lucky.substr(8,1))
               }, this, 100*2);  

            for(var i = 0; i < contentObj.lucky.length; i++){
        
                 
                       switch (contentObj.lucky[i]) {
                            case "0":
                                EffectUtils.blinkEffect(this.put_bet_0,2000) 
                            break;
                            case "1":
                                EffectUtils.blinkEffect(this.put_bet_1,2000) 
                            break;                          
                            case "2":
                                EffectUtils.blinkEffect(this.put_bet_2,2000) 
                            break;    
                            case "3":
                                EffectUtils.blinkEffect(this.put_bet_3,2000) 
                            break;    
                            case "4":
                                EffectUtils.blinkEffect(this.put_bet_4,2000) 
                            break;    
                            case "5":
                                EffectUtils.blinkEffect(this.put_bet_5,2000) 
                            break;    
                            case "6":
                                EffectUtils.blinkEffect(this.put_bet_6,2000) 
                            break;    
                            case "7":
                                EffectUtils.blinkEffect(this.put_bet_7,2000) 
                            break;    
                             case "8":
                                EffectUtils.blinkEffect(this.put_bet_8,2000) 
                            break;   

                            case "9":
                                EffectUtils.blinkEffect(this.put_bet_9,2000) 
                            break;    

                        }

                    


            }


                //console.log(JSON.stringify(e.param));
           //    Global.alert("提示","socket数据收到了："+JSON.stringify(e.param));
             // Global.alert("提示","socket数据收到了："+contentObj.allprofit);
        }
        Global.addEventListener("slot_result",socketFun,this)

    }
     public onChooseStage(e:egret.TouchEvent):void{
        this.door_left.touchEnabled = true; 
        this.door_right.touchEnabled = false; 
         
         egret.setTimeout(function () {              
            egret.Tween.get(this.door_right).to({x:500 + this.width/2},600,egret.Ease.backOut); 
        }, this, 500*2);   
         egret.setTimeout(function () {              
            egret.Tween.get(this.door_left).to({x:-230},600,egret.Ease.backOut); 
        }, this, 500*2);     
          //EffectUtils.removeRotationEffect(this.rpgslot_1);
          //  EffectUtils.blinkEffect(this.rpgslot_1,2000);
          //    EffectUtils.blinkEffect(this.rpgslot_2,2000);
    }
      public onBackToChooseStage(e:egret.TouchEvent):void{
         this.door_left.touchEnabled = false; 
        this.door_right.touchEnabled = true;       
        // this.connetToServer(false);
         egret.setTimeout(function () {              
            egret.Tween.get(this.door_right).to({x:200},600,egret.Ease.backOut); 
        }, this, 500*2);   
         egret.setTimeout(function () {              
            egret.Tween.get(this.door_left).to({x:30},600,egret.Ease.backOut); 
        }, this, 500*2);     
       
        
    }
     
    public onButtonBetTouchTap(e:egret.TouchEvent):void{
      //console.log("onButtonBetTouchTap")

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

    public bet():void{
        this.buttonBet.visible = false;
        this.buttonBet.touchEnabled = false;   

            //this.testSocketServer();
            this.SendBet();
            EffectUtils.slotObj("gem6_blur",this.rpgslot_1,50,1)   


            EffectUtils.slotObj("gem6_blur",this.rpgslot_1,50,1)     
            EffectUtils.slotObj("gem6_blur",this.rpgslot_2,50,1)     
            EffectUtils.slotObj("gem6_blur",this.rpgslot_3,50,1)     
            EffectUtils.slotObj("gem6_blur",this.rpgslot_4,50,1)     
            EffectUtils.slotObj("gem6_blur",this.rpgslot_5,50,1)     
            EffectUtils.slotObj("gem6_blur",this.rpgslot_6,50,1)     
            EffectUtils.slotObj("gem6_blur",this.rpgslot_7,50,1)     
            EffectUtils.slotObj("gem6_blur",this.rpgslot_8,50,1)     
            EffectUtils.slotObj("gem6_blur",this.rpgslot_9,50,1)     
               
        
             
       // Global.alert("提示","我是一个提示栗子，哈哈",null,3);
    }
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
    //this.drawStopBtn();

    //this.sound = new RES.getRes("sound");
    this.sound.play();
    }

    private recover():void{
        this.isPlay = false;

    //SocketManager.sendMessage('{"name":"Ray_game","kind":4,"from":"guzwan","userId":"3565526"}')
 
        EffectUtils.setSlotObj("gem6",this.rpgslot_1,2000,1)     
        EffectUtils.setSlotObj("gem6",this.rpgslot_2,2000,1)     
        EffectUtils.setSlotObj("gem6",this.rpgslot_3,2000,1)     
        EffectUtils.setSlotObj("gem6",this.rpgslot_4,2000,1)     
        EffectUtils.setSlotObj("gem6",this.rpgslot_5,2000,1)     
        EffectUtils.setSlotObj("gem6",this.rpgslot_6,2000,1)     
        EffectUtils.setSlotObj("gem6",this.rpgslot_7,2000,1)     
        EffectUtils.setSlotObj("gem6",this.rpgslot_8,2000,1)     
        EffectUtils.setSlotObj("gem6",this.rpgslot_9,2000,1) 

    }
 


}

