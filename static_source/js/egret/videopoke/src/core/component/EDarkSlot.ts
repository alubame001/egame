/**
  * 图片button类
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  * 可以有图片，文字，动画
  * todo:九宫格、多动画、图字等
  */

class EDarkSlot extends EButton {

    public testState: boolean=false;

    public slotImg: egret.Bitmap;
    public slotImg1: egret.Bitmap;
    public slotImg2: egret.Bitmap;
    public slotImg3: egret.Bitmap;
    public slotImg4: egret.Bitmap;
    public slotImg5: egret.Bitmap;
    public slotImg6: egret.Bitmap;
    public slotImg7: egret.Bitmap;
    public slotImg8: egret.Bitmap;
    public slotImg9: egret.Bitmap;
    public slotImg10: egret.Bitmap;
    public iconImg: egret.Bitmap;
    public init(imgName: string, backFun: Function = null, descStr: string = "", fontSize: number = 30, cartoonType: number = 1, assetsName: string = "assets"): void {
        this.assetName = assetsName;
        this.cartoonType = cartoonType;
        this.backFun = backFun;
        this.assets = RES.getRes(assetsName);


       
        this.slotImg = new egret.Bitmap();
        this.slotImg.texture = this.assets.getTexture("symbol_run");
        this.addChild(this.slotImg);
        
     
        this.slotImg.alpha = 1  ;







     //  this.sound = RES.getRes("click");




        this.touchEnabled = true;

        if (this.touchEnabled) {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onbuttonTouchTap, this);
        }
/*
        this.effectImg.anchorX = 0.5;
        this.effectImg.anchorY = 0.5;
        this.effectImg.x = this.btnImg.width/2;
        this.effectImg.y = this.btnImg.height/2;      
        EffectUtils.rotationEffect(this.effectImg, Maths.RndNum(1000)+100);        
*/       
    }
    public onbuttonTouchTap(e): void {

       // EffectUtils.moveDownObj(this.btnImg);  
       var time = 200;   
       var symbol = Maths.RndNum(5)+1;
       //symbol = 10;
       console.log(symbol);
        egret.setTimeout(function () {              
            EffectUtils.slotDown(this.slotImg,500,symbol);        
            }, this, time*0); 
       /*   
       if (this.testState==false){
            this.testState = true;
            egret.setTimeout(function () {              
            EffectUtils.moveDown(this.slotImg,580,100);        
            }, this, time*0); 

        }else {
            this.testState = true;
            egret.setTimeout(function () {              
            EffectUtils.moveToObj(this.slotImg,500);        
            }, this, time*0);

        }
        */

 


      
    }

   
   
} 