
class StartPanel extends BasePanel{

    public constructor(){
        super();
    }
    //private betXML:JsonpReq;
    private loadingView:LoadingUI;
     private loadingPanel:LoadingPanel;
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


    private lottery28Btn:EMenu;   
    private blackjackBtn:EMenu;   
    private baccaratBtn:EMenu;   
    private crap9Btn:EMenu;   
    private fishBtn:EMenu;   
    private wheelBtn:EMenu;   
    private slotBtn:EMenu;   
    private niuniuBtn:EMenu;   



    public initPanel(): void {

        this.bg = new egret.Bitmap();
        this.bg.texture = RES.getRes("");
        this.addChild(this.bg);
        this.bg.touchEnabled =     false;

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

        this.initEffect();

    }

    private initEffect():void{
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
        /*      
        egret.setTimeout(function () {              
            egret.Tween.get(this.btn2).to({x:this.w/2 - this.btn2.width/2},600,egret.Ease.backOut); 
        }, this, 150*2);   
        egret.setTimeout(function () {              
            egret.Tween.get(this.btn3).to({x:this.w/2 - this.btn3.width/2},600,egret.Ease.backOut); 
        }, this, 150*3);   
        egret.setTimeout(function () {              
            egret.Tween.get(this.btn4).to({x:this.w/2 - this.btn4.width/2},600,egret.Ease.backOut); 
        }, this, 150*4);   
        egret.setTimeout(function () {              
            egret.Tween.get(this.btn5).to({x:this.w/2 - this.btn5.width/2},600,egret.Ease.backOut); 
        }, this, 150*5);   
        egret.setTimeout(function () {              
            egret.Tween.get(this.btn6).to({x:this.w/2 - this.btn6.width/2},600,egret.Ease.backOut); 
        }, this, 150*6);     
        egret.setTimeout(function () {              
            egret.Tween.get(this.btn7).to({x:this.w/2 - this.btn7.width/2},600,egret.Ease.backOut); 
        }, this, 150*7);     
        egret.setTimeout(function () {              
            egret.Tween.get(this.btn8).to({x:this.w/2 - this.btn8.width/2},600,egret.Ease.backOut); 
        }, this, 150*8);     
        egret.setTimeout(function () {              
            egret.Tween.get(this.btn9).to({x:this.w/2 - this.btn9.width/2},600,egret.Ease.backOut); 
        }, this, 150*9);     
        egret.setTimeout(function () {              
            egret.Tween.get(this.btn10).to({x:this.w/2 - this.btn10.width/2},600,egret.Ease.backOut); 
        }, this, 150*10);   
        egret.setTimeout(function () {              
            egret.Tween.get(this.bottomCopyRight).to({alpha:1},600); 
            egret.Tween.get(this.menuBtn).to({alpha:1},600); 
            egret.Tween.get(this.setBtn).to({alpha:1},600);
        }, this, 150*11);           
        */
    }
    private onSubResourceLoadComplete(event:RES.ResourceEvent):void {

        console.log("onSubResourceLoadComplete:",event.groupName)
         if(event.groupName=="lottery28_load"){     
              PopUpManager.removePopUp(this.loadingView);
            this.loadingPanel = new LoadingPanel();
            PopUpManager.addPopUp(this.loadingPanel);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onSubResourceLoadComplete,this);
            Global.dispatchEvent(MainNotify.openLottery28PanelNotify,null,false);
            Global.dispatchEvent(MainNotify.closeStartPanelNotify,null,false);
        }

        else if(event.groupName=="crap9_load"){     
              PopUpManager.removePopUp(this.loadingView);
            this.loadingPanel = new LoadingPanel();
            PopUpManager.addPopUp(this.loadingPanel);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onSubResourceLoadComplete,this);
            Global.dispatchEvent(MainNotify.openCrapPanelNotify,null,false);
            Global.dispatchEvent(MainNotify.closeStartPanelNotify,null,false);
        }

        else if(event.groupName=="wheel_load"){     
              PopUpManager.removePopUp(this.loadingView);
            this.loadingPanel = new LoadingPanel();
            PopUpManager.addPopUp(this.loadingPanel);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onSubResourceLoadComplete,this);
            Global.dispatchEvent(MainNotify.openWheelPanelNotify,null,false);
            Global.dispatchEvent(MainNotify.closeStartPanelNotify,null,false);
        }


        


    }
    public onLottery28BtnTouchTap(e:egret.TouchEvent):void{
         this.loadingView  = new LoadingUI();
        PopUpManager.addPopUp(this.loadingView);

        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onSubResourceLoadComplete,this);
        RES.loadGroup("lottery28_load");

    }

    public onBlackjackBtnTouchTap(e:egret.TouchEvent):void{
       // Global.dispatchEvent(MainNotify.openLottery28PanelNotify,null,false);
       // Global.dispatchEvent(MainNotify.closeStartPanelNotify,null,false);
    }
    public onBaccaratBtnTouchTap(e:egret.TouchEvent):void{
       // Global.dispatchEvent(MainNotify.openLottery28PanelNotify,null,false);
       // Global.dispatchEvent(MainNotify.closeStartPanelNotify,null,false);
    }    
    public onCrap9BtnTouchTap(e:egret.TouchEvent):void{
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onSubResourceLoadComplete,this);
        RES.loadGroup("crap9_load");

       // Global.dispatchEvent(MainNotify.openCrapPanelNotify,null,false);
       // Global.dispatchEvent(MainNotify.closeStartPanelNotify,null,false);
    }

    public onFishBtnTouchTap(e:egret.TouchEvent):void{
        Global.dispatchEvent(MainNotify.openFishPanelNotify,null,false);
        Global.dispatchEvent(MainNotify.closeStartPanelNotify,null,false);
    }
    public onWheelBtnTouchTap(e:egret.TouchEvent):void{
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onSubResourceLoadComplete,this);
        RES.loadGroup("wheel_load");

        //Global.dispatchEvent(MainNotify.openWheelPanelNotify,null,false);
       // Global.dispatchEvent(MainNotify.closeStartPanelNotify,null,false);
    }

    public onSlotBtnTouchTap(e:egret.TouchEvent):void{
       // Global.dispatchEvent(MainNotify.openFishPanelNotify,null,false);
       // Global.dispatchEvent(MainNotify.closeStartPanelNotify,null,false);
    }
    public onNiuniuBtnTouchTap(e:egret.TouchEvent):void{
       // Global.dispatchEvent(MainNotify.openFishPanelNotify,null,false);
       // Global.dispatchEvent(MainNotify.closeStartPanelNotify,null,false);
    }
    public onButtonBtnTouchTap(e:egret.TouchEvent):void{
        Global.dispatchEvent(MainNotify.openButtonPanelNotify,null,false);
          Global.dispatchEvent(MainNotify.closeStartPanelNotify,null,false);    
             
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

   
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
   
   // this.sound.play();
    }



}

