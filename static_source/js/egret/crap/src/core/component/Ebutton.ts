/**
  * 图片button类
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  * 可以有图片，文字，动画
  * todo:九宫格、多动画、图字等
  */

class EButton extends egret.DisplayObjectContainer {

    public textField: egret.TextField;
    public textField2: egret.TextField;
   // public stake: egret.TextField;
    public assets: egret.SpriteSheet = RES.getRes("assets");//名称不一样的话需要修改
    public btnImg: egret.Bitmap;
    public backFun: Function;
    public isPlayCartoon: Boolean = false;
    public isBetButton :Boolean = false;
    public stake :number = 0;
    public minBet :number = 1000;

    public cartoonType: number = 1;
    public param = { context: null, data: null };//回调参数
    public scaleXSize: number = 1;
    public scaleYSize: number = 1;
    public  sound:egret.Sound;
    private isRunning: boolean = false;
        private seed: number = 0;
    private maxSeed :number = 9; // range from 0 to 4

    //public touchEnabled: Boolean = true;
    /**
    * imgName       图片
    * backFun       点击方法 如果需要在backFun中使用this的，小心使用这个
    * descStr       按钮描述
    * fontSize      字体大小
    * cartoonType   动画类型 1:【可爱】按下变小，放开弹大 2:按下变小，放开轻微弹大 3：按下变小，放开变大
    * 注意：如果有动画的话，只有动画结束才会触发click事件
    */
    public constructor(context: any, imgName: string, backFun: Function = null, descStr: string = "", fontSize: number = 30, cartoonType: number = 1, assetsName: string = "assets") {
        super();
        this.param.context = context;
        this.init(imgName, backFun, descStr, fontSize, cartoonType, assetsName);
    }

    public init(imgName: string, backFun: Function = null, descStr: string = "", fontSize: number = 30, cartoonType: number = 1, assetsName: string = "assets"): void {
        this.cartoonType = cartoonType;
        this.backFun = backFun;
        this.btnImg = new egret.Bitmap();
        if (assetsName != "assets") {
            this.assets = RES.getRes(assetsName);
        }

        this.btnImg.texture = this.assets.getTexture(imgName);
        this.addChild(this.btnImg);

        this.sound =  RES.getRes("click");

       // if (descStr != "") {
            this.textField = new egret.TextField();
            this.addChild(this.textField);
            this.textField.size = fontSize;
            this.textField.textAlign = "center";
            this.textField.stroke = 1;
            this.textField.strokeColor = 0x000000;
            this.textField.text = descStr;
            this.textField.width = this.btnImg.width;
            this.textField.x = this.btnImg.width / 2 - this.textField.width / 2;
            this.textField.y = this.btnImg.height / 2 - this.textField.height / 2;
/*
            this.textField2 = new egret.TextField();
            this.addChild(this.textField2);
            this.textField2.size = fontSize;
            this.textField2.textAlign = "center";
            this.textField2.stroke = 2;
            this.textField2.strokeColor = 0xFFFFFF;
            this.textField2.text = "title2";
            this.textField2.width = this.btnImg.width;
            this.textField2.x = this.btnImg.width / 2 - this.textField2.width / 2;
            this.textField2.y = this.btnImg.height / 2 - this.textField2.height / 2 -30;
*/
        //}
        /*
         if (true) {
            this.stake = new egret.TextField();
            this.addChild(this.stake);
            this.stake.size = fontSize;
            this.stake.textAlign = "center";
            this.stake.stroke = 1;
            this.stake.strokeColor = 0x000000;
            this.stake.text = descStr;
            this.stake.width = this.btnImg.width;
            this.stake.x = this.btnImg.width / 2 - this.textField.width / 2  -10;
            this.stake.y = this.btnImg.height / 2 - this.textField.height /2 -10;
        }       
        */

        this.touchEnabled = true;
        
       if (this.touchEnabled){
         this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onbuttonTouchTap, this);
        }
       // this.setScale(this.scaleXSize,this.scaleYSize);  
    }

    public onbuttonTouchTap(e): void {
        if (this.isBetButton){
            this.stake = this.stake+this.minBet;
            this.textField.text =  this.stake.toString();
        }
           this.sound.play();     
        if (this.isPlayCartoon) {
            return;
        }
        this.isPlayCartoon = true;
        var onComplete2: Function = function () {
            this.isPlayCartoon = false;
        };
        var onComplete1: Function = function () {
            if (this.cartoonType == 1) {
                egret.Tween.get(this).to({ scaleX: 1, scaleY: 1, x: this.x - this.btnImg.width / 4, y: this.y - this.btnImg.height / 4 }, 500, egret.Ease.elasticOut).call(onComplete2, this);
            } else if (this.cartoonType == 2) {
                egret.Tween.get(this).to({ scaleX: 1, scaleY: 1, x: this.x - this.btnImg.width / 4, y: this.y - this.btnImg.height / 4 }, 500, egret.Ease.backOut).call(onComplete2, this);
            } else if (this.cartoonType == 3) {
                egret.Tween.get(this).to({ scaleX: 1, scaleY: 1, x: this.x - this.btnImg.width / 4, y: this.y - this.btnImg.height / 4 }, 100).call(onComplete2, this);
            }else if (this.cartoonType == 4) {
                egret.Tween.get(this).to({ scaleX: this.scaleXSize, scaleY: this.scaleYSize, x: this.x - this.btnImg.width /20, y: this.y - this.btnImg.height / 20 }, 100, egret.Ease.elasticOut).call(onComplete2, this);
            }else if (this.cartoonType == 5) {
                egret.Tween.get(this).to({ scaleX: this.scaleXSize, scaleY: this.scaleYSize, x: this.x -1, y: this.y - 1 }, 100, egret.Ease.elasticOut).call(onComplete2, this);
            }            
        };

            if (this.cartoonType == 4) {
                  egret.Tween.get(this).to({ scaleX: this.scaleXSize, scaleY: this.scaleYSize, x: this.x + this.btnImg.width / 20, y: this.y + this.btnImg.height / 20 }, 100, egret.Ease.sineIn).call(onComplete1, this);
            } else if (this.cartoonType == 5) {
                egret.Tween.get(this).to({ scaleX: this.scaleXSize, scaleY: this.scaleYSize, x: this.x + 1, y: this.y+1  }, 100, egret.Ease.elasticOut).call(onComplete2, this);
            }   else{
               egret.Tween.get(this).to({ scaleX: this.scaleXSize, scaleY: this.scaleYSize, x: this.x + this.btnImg.width / 4, y: this.y + this.btnImg.height / 10 }, 100, egret.Ease.sineIn).call(onComplete1, this);
            } 
            

      
        egret.setTimeout(function () {
            if (this.backFun != null) {
                this.backFun.apply(this.param.context, [this.param.data]);
            }
        }, this, 300);
    }

    //设置绑定数据
    public setBindData(data): void {
        this.param.data = data;
    }

    //获取绑定数据
    public getBindData(): any {
        return this.param.data;
    }

    public getBitmap(): egret.Bitmap {
        return this.btnImg;
    }


    public setBitmap(newImgName): void {
        this.btnImg.texture = this.assets.getTexture(newImgName);
        this.addChild(this.btnImg);
    }


    public setIsRunning(result): void {
        this.isRunning= result;      
      
        
    }    
    public setScale(x,y): void {
        this.scaleXSize =x
        this.scaleYSize =y
         egret.Tween.get(this).to({ scaleX:x, scaleY: y }, 0, egret.Ease.elasticOut);
    }
    public setText(str): void {
       // this.textField.text = str.toString();



        this.textField.text = str;
    }
    public setRandomImg(isBlur:boolean): void {
            
            var rnd = Maths.RndNum(this.maxSeed)
            var result =this.getImageName(rnd,isBlur);   
                     
            this.btnImg.texture = this.assets.getTexture(result);
            this.addChild(this.btnImg);
            //console.log(result);
            
    }
    public getImageName(imgIndex:number,isBlur:boolean): string {
        if (isBlur){
         this.seed =  Maths.RndNum(this.maxSeed) ;
        } else {
           this.seed =  imgIndex;  
        }
        
        var result ="";
        switch (this.seed)
        {
            case 0: { 
                 result = "icon0"
              //   if (isBlur){  result = result+"_blur"}         
                 return result;
            }
            case 1: { 
                 result = "icon1"
               //  if (isBlur){  result = result+"_blur"}         
                 return result;
            }
            case 2: { 
                 result = "icon2"
                 //if (isBlur){  result = result+"_blur"}         
                 return result;
            }            
            case 3: { 
                 result = "icon3"
                //  if (isBlur){  result = result+"_blur"}         
                 return result;   
            }
             case 4: { 
                 result = "icon4"
                // if (isBlur){  result = result+"_blur"}         
                 return result;
            }     
            case 5: {      
                 return "icon5";
            }     
            case 6: {      
                 return "icon6";
            }  

            case 7: {      
                 return "icon7";
            }   

            case 8: {      
                 return "icon8";
            }                   
            case 9: {      
                 return "icon9";
            }   

        }

    }
}
   