
class ImgPanel extends BasePanel{

    public constructor(){
        super();
    }

    private bg:egret.Bitmap;
    private menuBtn:ImgButton;
    private setBtn:ImgButton; 
    // private logoImg:egret.Bitmap;
    private img1:egret.Bitmap;
    private img2:egret.Bitmap;
    private img3:egret.Bitmap;
    private img4:egret.Bitmap;
    private img5:egret.Bitmap;
    private img6:egret.Bitmap;
    private img7:egret.Bitmap;
    private img8:egret.Bitmap;
    private img9:egret.Bitmap;
    private img10:egret.Bitmap;
    private img11:egret.Bitmap;
    private btn1:ImgButton;    
    private btn2:ImgButton;    
    private btn3:ImgButton;    
    private btn4:ImgButton;    
    private btn5:ImgButton;    
    private btn6:ImgButton;    
    private btn7:ImgButton;    
    private btn8:ImgButton;    
    private btn9:ImgButton;    
    private btn10:ImgButton;    
    private btn11:ImgButton;    
    private bottomCopyRight:egret.Bitmap;
    // 初始化面板
    public initPanel():void{
        this.bg = new egret.Bitmap();
        this.bg.texture = this.assets.getTexture("bg");
        this.addChild(this.bg);   
        this.bg.touchEnabled = true;   

        this.menuBtn = new ImgButton("menueBtn",this.onMenuBtnTouchTap,"",30,1);
        this.menuBtn.x = 20;
        this.menuBtn.y = 20;
        this.addChild(this.menuBtn); 
        this.menuBtn.alpha = 0;

        this.setBtn = new ImgButton("setBtn",this.onSetBtnTouchTap);
        this.setBtn.x = this.w - this.setBtn.width - 20;
        this.setBtn.y = 20;    
        this.addChild(this.setBtn);
        this.setBtn.alpha = 0;

        var baseHeight:number = 15;
        var baseSpace:number = 70;

        this.img1 = new egret.Bitmap();
        this.img1.texture = this.assets.getTexture("acceptBtn");
        this.img1.x = 15;
        this.img1.y = baseHeight + baseSpace*1;
        this.addChild(this.img1); 

        this.btn1 = new ImgButton("smallYellowBtn",null,"图片特效1",24,1);
        this.btn1.x = this.img1.x + this.img1.width + 20;
        this.btn1.y = baseHeight + baseSpace*1;      
        this.addChild(this.btn1);
        this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn1TouchTap, this);

        this.img2 = new egret.Bitmap();
        this.img2.texture = this.assets.getTexture("acceptBtn");
        this.img2.anchorX = 0.5;
        this.img2.anchorY = 0.5;
        this.img2.x = 15 + this.img2.width/2;
        this.img2.y = baseHeight + baseSpace*2 + this.img2.height/2;
        this.addChild(this.img2); 

        this.btn2 = new ImgButton("smallYellowBtn",null,"图片特效2",24,1);
        this.btn2.x = this.img1.x + this.img1.width + 20;
        this.btn2.y = baseHeight + baseSpace*2;       
        this.addChild(this.btn2);
        this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn2TouchTap, this);

        this.img3 = new egret.Bitmap();
        this.img3.texture = this.assets.getTexture("acceptBtn");
        this.img3.x = 15;
        this.img3.y = baseHeight + baseSpace*3;
        this.addChild(this.img3); 

        this.btn3 = new ImgButton("smallYellowBtn",null,"图片特效3",24,1);
        this.btn3.x = this.img1.x + this.img1.width + 20;
        this.btn3.y = baseHeight + baseSpace*3;       
        this.addChild(this.btn3);
        this.btn3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn3TouchTap, this);

        this.img4 = new egret.Bitmap();
        this.img4.texture = this.assets.getTexture("acceptBtn");
        this.img4.x = 15;
        this.img4.y = baseHeight + baseSpace*4;
        this.addChild(this.img4); 

        this.btn4 = new ImgButton("smallYellowBtn",null,"图片特效4",24,1);
        this.btn4.x = this.img1.x + this.img1.width + 20;
        this.btn4.y = baseHeight + baseSpace*4;       
        this.addChild(this.btn4);
        this.btn4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn4TouchTap, this);

        this.img5 = new egret.Bitmap();
        this.img5.texture = this.assets.getTexture("acceptBtn");
        this.img5.x = 15;
        this.img5.y = baseHeight + baseSpace*5;
        this.addChild(this.img5); 

        this.btn5 = new ImgButton("smallYellowBtn",null,"图片特效5",24,1);
        this.btn5.x = this.img1.x + this.img1.width + 20;
        this.btn5.y = baseHeight + baseSpace*5;       
        this.addChild(this.btn5);
        this.btn5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn5TouchTap, this);

        this.img6 = new egret.Bitmap();
        this.img6.texture = this.assets.getTexture("acceptBtn");
        this.img6.x = 15;
        this.img6.y = baseHeight + baseSpace*6;
        this.addChild(this.img6); 

        this.btn6 = new ImgButton("smallYellowBtn",null,"图片特效6",24,1);
        this.btn6.x = this.img1.x + this.img1.width + 20;
        this.btn6.y = baseHeight + baseSpace*6;       
        this.addChild(this.btn6);
        this.btn6.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn6TouchTap, this);

        this.img7 = new egret.Bitmap();
        this.img7.texture = this.assets.getTexture("acceptBtn");
        this.img7.x = 15;
        this.img7.y = baseHeight + baseSpace*7;
        this.addChild(this.img7); 

        this.btn7 = new ImgButton("smallYellowBtn",null,"图片特效7",24,1);
        this.btn7.x = this.img1.x + this.img1.width + 20;
        this.btn7.y = baseHeight + baseSpace*7;       
        this.addChild(this.btn7);
        this.btn7.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn7TouchTap, this);

        this.img8 = new egret.Bitmap();
        this.img8.texture = this.assets.getTexture("acceptBtn");
        this.img8.anchorX = 0.5;
        this.img8.anchorY = 0.5;
        this.img8.x = 15 + this.img8.width/2;
        this.img8.y = baseHeight + baseSpace*8 + this.img8.height/2;
        this.addChild(this.img8); 

        this.btn8 = new ImgButton("smallYellowBtn",null,"图片特效8",24,1);
        this.btn8.x = this.img1.x + this.img1.width + 20;
        this.btn8.y = baseHeight + baseSpace*8;       
        this.addChild(this.btn8);
        this.btn8.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn8TouchTap, this);

        this.img9 = new egret.Bitmap();
        this.img9.texture = this.assets.getTexture("acceptBtn");
        this.img9.x = 15;
        this.img9.y = baseHeight + baseSpace*9;
        this.addChild(this.img9); 

        this.btn9 = new ImgButton("smallYellowBtn",null,"图片特效9",24,1);
        this.btn9.x = this.img1.x + this.img1.width + 20;
        this.btn9.y = baseHeight + baseSpace*9;       
        this.addChild(this.btn9);
        this.btn9.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn9TouchTap, this);

        this.img10 = new egret.Bitmap();
        this.img10.texture = this.assets.getTexture("acceptBtn");
        this.img10.anchorX = 0.5;
        this.img10.anchorY = 1;
        this.img10.x = 15 + this.img10.width/2;
        this.img10.y = baseHeight + baseSpace*10 + this.img10.height;
        this.addChild(this.img10); 

        this.btn10 = new ImgButton("smallYellowBtn",null,"图片特效10",24,1);
        this.btn10.x = this.img1.x + this.img1.width + 20;
        this.btn10.y = baseHeight + baseSpace*10;       
        this.addChild(this.btn10);
        this.btn10.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn10TouchTap, this);

        this.img11 = new egret.Bitmap();
        this.img11.texture = this.assets.getTexture("acceptBtn");
        this.img11.anchorX = 0.5;
        this.img11.anchorY = 0;
        this.img11.x = 15 + this.img11.width/2 + 245;
        this.img11.y = baseHeight + baseSpace*1;
        this.addChild(this.img11); 

        this.btn11 = new ImgButton("smallYellowBtn",null,"图片特效10",24,1);
        this.btn11.x = this.img1.x + this.img1.width + 20 + 245;
        this.btn11.y = baseHeight + baseSpace*1;       
        this.addChild(this.btn11);
        this.btn11.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn11TouchTap, this);

        this.initEffect();
    }

    private isPlay1:boolean = false;
    public onBtn1TouchTap(e:egret.TouchEvent):void{
        if(!this.isPlay1){
            EffectUtils.showTips("旋转特效",5);
            EffectUtils.rotationEffect(this.img1,1000);
            this.isPlay1 = true;
            if(GlobalData.isEngineer){
                Global.alert("用法",'EffectUtils.rotationEffect(this.img1,1000);',null,1);
            } 
        }else{
            EffectUtils.showTips("取消旋转特效",5);
            EffectUtils.removeRotationEffect(this.img1);
            this.isPlay1 = false;
            if(GlobalData.isEngineer){
                Global.alert("用法",'EffectUtils.removeRotationEffect(this.img1);',null,1);
            } 
        }
    }

    private isPlay2:boolean = false;
    public onBtn2TouchTap(e:egret.TouchEvent):void{
        if(!this.isPlay2){
            EffectUtils.showTips("中心旋转特效",5);
            EffectUtils.rotationEffect(this.img2,1000);
            this.isPlay2 = true;
            if(GlobalData.isEngineer){
                Global.alert("用法",'this.img2.anchorX = 0.5;\nthis.img2.anchorY = 0.5;\nEffectUtils.rotationEffect(this.img2,1000);',null,1);
            } 
        }else{
            EffectUtils.showTips("取消中心旋转特效",5);
            EffectUtils.removeRotationEffect(this.img2);
            this.isPlay2 = false;
            if(GlobalData.isEngineer){
                Global.alert("用法",'EffectUtils.removeRotationEffect(this.img2);',null,1);
            } 
        }
    }

    public onBtn3TouchTap(e:egret.TouchEvent):void{
        EffectUtils.showTips("闪烁特效",5);
        EffectUtils.blinkEffect(this.img3,1000);  
        if(GlobalData.isEngineer){
            Global.alert("用法",'EffectUtils.blinkEffect(this.img3,1000);',null,1);
        }  
    }

    public onBtn4TouchTap(e:egret.TouchEvent):void{
        EffectUtils.showTips("抖动特效",5);
        EffectUtils.shakeObj(this.img4);   
        if(GlobalData.isEngineer){
            Global.alert("用法",'EffectUtils.shakeObj(this.img4);',null,1);
        }  
    }

    public onBtn5TouchTap(e:egret.TouchEvent):void{
        EffectUtils.showTips("按下弹大",5);
        EffectUtils.playEffect(this.img5,1); 
        if(GlobalData.isEngineer){
            Global.alert("用法",'EffectUtils.playEffect(this.img5,1); ',null,1);
        }  
    }

    public onBtn6TouchTap(e:egret.TouchEvent):void{
        EffectUtils.showTips("按下轻微弹大",5);
        EffectUtils.playEffect(this.img6,2); 
        if(GlobalData.isEngineer){
            Global.alert("用法",'EffectUtils.playEffect(this.img6,2); ',null,1);
        }  
    }

    public onBtn7TouchTap(e:egret.TouchEvent):void{
        EffectUtils.showTips("按下变小放开变大",5);
        EffectUtils.playEffect(this.img7,3); 
        if(GlobalData.isEngineer){
            Global.alert("用法",'EffectUtils.playEffect(this.img7,3); ',null,1);
        }  
    }

    private isPlay8:boolean = false; 
    public onBtn8TouchTap(e:egret.TouchEvent):void{
        if(!this.isPlay8){
            this.isPlay8 = true;
            EffectUtils.showTips("持续变大变小",5);
            EffectUtils.playScaleEffect(this.img8);
        }else{
            EffectUtils.showTips("正在持续变大变小呢！",5);
        } 
        if(GlobalData.isEngineer){
            Global.alert("用法",'EffectUtils.playScaleEffect(this.img8);',null,1);
        }  
    }

    private isPlay9:boolean = false;   
    public onBtn9TouchTap(e:egret.TouchEvent):void{
        if(!this.isPlay9){
            this.isPlay9 = true;
            EffectUtils.showTips("上下浮动特效",5);
            EffectUtils.flyObj(this.img9,1000,15); 
        }else{
            EffectUtils.showTips("正在上下浮动呢！",5);
        }
        if(GlobalData.isEngineer){
            Global.alert("用法",'EffectUtils.flyObj(this.img9,1000,15); ',null,1);
        }  
    }

    private isPlay10:boolean = false;   
    public onBtn10TouchTap(e:egret.TouchEvent):void{
        if(!this.isPlay10){
            this.isPlay10 = true;
            EffectUtils.showTips("摇头特效",5);
            EffectUtils.rockObj(this.img10,500); 
        }else{
            EffectUtils.showTips("正在摇头呢！",5);
        }
        if(GlobalData.isEngineer){
            Global.alert("用法",'EffectUtils.rockObj(this.img10,500); ',null,1);
        }  
    }

    private isPlay11:boolean = false;
    public onBtn11TouchTap(e:egret.TouchEvent):void{
        if(!this.isPlay11){
            this.isPlay11 = true;
            EffectUtils.showTips("摇摆特效",5);
            EffectUtils.rockObj(this.img11,500); 
        }else{
            EffectUtils.showTips("正在摇摆呢！",5);
        }
        if(GlobalData.isEngineer){
            Global.alert("用法",'EffectUtils.rockObj(this.img11,500); ',null,1);
        }  
    }




    public onImgBtnTouchTap(e:egret.TouchEvent):void{

    }

    public onPanelBtnTouchTap(e:egret.TouchEvent):void{
    
    }

    public onSceneBtnTouchTap(e:egret.TouchEvent):void{
    
    }

    public onTipsBtnTouchTap(e:egret.TouchEvent):void{
    
    }

    private initEffect():void{
        egret.Tween.get(this.menuBtn).to({alpha:1},600); 
        egret.Tween.get(this.setBtn).to({alpha:1},600);
        // egret.Tween.get(this.logoImg).to({y:60 + this.logoImg.height},600,egret.Ease.backOut); 

        // egret.setTimeout(function () {              
        //     egret.Tween.get(this.buttonBtn).to({x:this.w/2 - this.buttonBtn.width/2},600,egret.Ease.backOut); 
        // }, this, 150*1);         
        // egret.setTimeout(function () {              
        //     egret.Tween.get(this.imgBtn).to({x:this.w/2 - this.imgBtn.width/2},600,egret.Ease.backOut); 
        // }, this, 150*2);   
        // egret.setTimeout(function () {              
        //     egret.Tween.get(this.panelBtn).to({x:this.w/2 - this.panelBtn.width/2},600,egret.Ease.backOut); 
        // }, this, 150*3);   
        // egret.setTimeout(function () {              
        //     egret.Tween.get(this.sceneBtn).to({x:this.w/2 - this.sceneBtn.width/2},600,egret.Ease.backOut); 
        // }, this, 150*4);   
        // egret.setTimeout(function () {              
        //     egret.Tween.get(this.tipsBtn).to({x:this.w/2 - this.tipsBtn.width/2},600,egret.Ease.backOut); 
        // }, this, 150*5);   
        // egret.setTimeout(function () {              
        //     egret.Tween.get(this.bottomCopyRight).to({alpha:1},600); 
        // }, this, 150*6);    
    }

    private onMenuBtnTouchTap():void{
        Global.dispatchEvent(MainNotify.openStartPanelNotify,null,false);
        Global.dispatchEvent(MainNotify.closeImgPanelNotify,null,false);            
    }

    public onSetBtnTouchTap(e:egret.TouchEvent):void{
        Global.dispatchEvent(MainNotify.openSetPanelNotify,2,false);
    }
}

