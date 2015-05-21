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
 //   public btnImg_bottom: egret.Bitmap;
  //  public btnImg_cover: egret.Bitmap;
    public effectImg: egret.Bitmap;
    public backFun: Function;

    public isBetButton :Boolean = false;
    public stake :number = 0;
    public min_bet :number = 0;

    public isPlayCartoon: Boolean = false;
    public cartoonType: number = 1;
    public param = { context: null, data: null };//回调参数
    public scaleXSize: number = 1;
    public scaleYSize: number = 1;
    public  sound:egret.Sound;
    public time: number = 0;
    public speed: number = 0;
    public angle : number =0
    public targetAngle : number =0

    public picIndex: number = 1;    
    public skinIndex: number = 1;
    public skinMaxNumber: number = 3;
    public assetName: string ="fish"
    public slotNumber: number  =0
    public modeNumber: number  =0
    public odd: number = 0;//赔率



    private isRunning: boolean = false;
        private seed: number = 0;
    private maxSeed :number = 9; // range from 0 to 4
  public path :any[]= [0,0,0,0,0,0]
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
        //console.log("context:",context)
        this.init(imgName, backFun, descStr, fontSize, cartoonType, assetsName);
    }

    public init(imgName: string, backFun: Function = null, descStr: string = "", fontSize: number = 30, cartoonType: number = 1, assetsName: string = "assets"): void {
       // console.log(minBet);
       // this.min_bet = minBet;
        this.assetName = assetsName;
        this.cartoonType = cartoonType;
        this.backFun = backFun;
        this.btnImg = new egret.Bitmap();
        if (assetsName != "assets") {
            this.assets = RES.getRes(assetsName);
        }

        this.btnImg.texture = this.assets.getTexture(imgName);
        this.addChild(this.btnImg);



      


        this.effectImg = new egret.Bitmap();
        this.effectImg.texture = this.assets.getTexture("loading_1");
        this.addChild(this.effectImg);
        this.effectImg.visible = false;


        this.sound =  RES.getRes("click");

            this.textField = new egret.TextField();
            this.addChild(this.textField);
            this.textField.size = fontSize;
            this.textField.textAlign = "center";
            this.textField.stroke = 1;
            this.textField.strokeColor = 0x000000;
            this.textField.textColor = 0xffffff;
            this.textField.text = descStr;
            this.textField.width = this.btnImg.width;
            this.textField.x = this.btnImg.width / 2 - this.textField.width / 2;
            this.textField.y = this.btnImg.height / 2 - this.textField.height / 2;


           

                this.textField2 = new egret.TextField();
                this.addChild(this.textField2);
                this.textField2.size = fontSize - 10;
                this.textField2.textAlign = "center";
                this.textField2.stroke = 1;
                this.textField2.strokeColor = 0x000000;
                this.textField2.textColor = 0xdeff00;
                this.textField2.text = "";
                this.textField2.width = this.btnImg.width;
                this.textField2.x = this.btnImg.width - this.textField2.width;
                this.textField2.y = this.btnImg.height - this.textField2.height+5;
            


    
       

        this.touchEnabled = true;
        
       if (this.touchEnabled){
         this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onbuttonTouchTap, this);
        }
       // this.setScale(this.scaleXSize,this.scaleYSize);  
    }

    public onbuttonTouchTap(e): void {
        this.touchEnabled = false;
        Global.selectMode = this.modeNumber;
        if (Global.selectMode > 0) {
            lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent("selectMode", this.modeNumber, false));
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
                egret.Tween.get(this).to({ scaleX: this.scaleXSize, scaleY: this.scaleYSize, x: this.x - this.btnImg.width /40, y: this.y - this.btnImg.height / 40 }, 100, egret.Ease.elasticOut).call(onComplete2, this);
            }else if (this.cartoonType == 5) {
                egret.Tween.get(this).to({ scaleX: this.scaleXSize, scaleY: this.scaleYSize, x: this.x -1, y: this.y - 1 }, 100, egret.Ease.elasticOut).call(onComplete2, this);
            }            
        };

            if (this.cartoonType == 4) {
                  egret.Tween.get(this).to({ scaleX: this.scaleXSize, scaleY: this.scaleYSize, x: this.x + this.btnImg.width / 40, y: this.y + this.btnImg.height / 40 }, 100, egret.Ease.sineIn).call(onComplete1, this);
            } else if (this.cartoonType == 5) {
                egret.Tween.get(this).to({ scaleX: this.scaleXSize, scaleY: this.scaleYSize, x: this.x + 1, y: this.y+1  }, 100, egret.Ease.elasticOut).call(onComplete2, this);
            }   else{
               egret.Tween.get(this).to({ scaleX: this.scaleXSize, scaleY: this.scaleYSize, x: this.x + this.btnImg.width / 4, y: this.y + this.btnImg.height / 10 }, 100, egret.Ease.sineIn).call(onComplete1, this);
            } 
            

      
        egret.setTimeout(function () {
            if (this.backFun != null) {
                this.backFun.apply(this.param.context, [this.param.data]);

                this.touchEnabled = true;
            }
        }, this, 100);

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
    public setMinBet(minBet): void {
        this.min_bet = minBet;
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
    public setText2(str): void {
       // this.textField.text = str.toString();



        this.textField2.text = str;
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

    public get pathFactor(): number {
        return 0;
    }    

    public set pathFactor(value: number) {
        this.x = (1 - value) * (1 - value) *  (this.path[0]+this.time)  + 2 * value * (1 - value) * this.path[2] + value * value * (this.path[4]);
        this.y = (1 - value) * (1 - value) *  (this.path[1]+this.speed)  + 2 * value * (1 - value) * this.path[3] + value * value * (this.path[5]);      
          //   console.log(this.time)
            // console.log(this.speed)
    } 


    public rollBegin(x1,y1,x2,y2,x3,y3,period,scale:number): void {    
         var onComplete1: Function = function() {
            // console.log("c1")
           //   this.path = [x1,y1,x2,y2,x3,y3];
              this.path = [x1,y1,x1,0,x2,y2];
            //  this.path = [x1,y1,x3,y3,x2,y2];
             egret.Tween.get(this)  
             .to({alpha:1},100)                 
             .to({pathFactor: 1,scaleX:0.9,scaleY:0.9 }, period,egret.Ease.sineIn) 
             
           // .to({alpha:0},100) 
             .call(onComplete2, this);      
        }
         var onComplete2: Function = function() {
               // console.log("c2")
           //   this.path = [x1,y1,x2,y2,x3,y3];
              this.path = [x2,y2,x2,0,x3+Maths.RndNum(200),y3+Maths.RndNum(200)];
             egret.Tween.get(this)  
                               
             .to({pathFactor: 0.5,scaleX:0.8,scaleY:0.8, }, period,egret.Ease.sineInOut) 
             .to({alpha:1},100).wait(period)     
            // .to({alpha:0},100) 
            // .call(onComplete2, this);      
        }
        egret.Tween.get(this)
        .to({alpha:1},100)              
       //.to({ scaleX: scale, scaleY: scale }, 10)
        .call(onComplete1, this);         
    }   


    public rouletteBegin(toright:boolean): void {  
        if (this.isRunning) return
        this.isRunning = true;
         var angle = 0;  
         this.speed = 0;
         this.time = 0;
         //var i = (bingo-1)*30+15;  
            if (toright) {
                angle -= 1080
            }else {
                angle +=1080
            }       
               
            egret.Tween.get(this)

            .to({anchorX: 0.5, anchorY: 0.5, rotation: 0 }, 10 , egret.Ease.sineOut)
            //.to({anchorX: 0.5, anchorY: 0.5, rotation: angle+i }, period , egret.Ease.circInOut)
            this.isRunning = false;  
    }  



    public roulette_angle(toangle,period:number,toright:boolean): void {  
      /*
        if (this.isRunning) return
        this.isRunning = true;
         var angle = 0;  
         this.speed = 0;
         this.time = 0;         
         var i = (bingo-1)*30+15;  
            if (toright) {
                angle -= 360*5
            }else {
                angle +=360*5
            }       
               
            egret.Tween.get(this)

            .to({anchorX: 0.5, anchorY: 0.5, rotation: 0 }, 10 , egret.Ease.sineOut)
            .to({anchorX: 0.5, anchorY: 0.5, rotation: angle+i }, period , egret.Ease.circInOut)
            this.isRunning = false;  
    */
    }  

    public roulette(bingo,period:number,toright:boolean): void {  
        if (this.isRunning) return
        this.isRunning = true;
         var angle = 0;  
         this.speed = 0;
         this.time = 0;         
         var i = (bingo-1)*30+15;  
            if (toright) {
                angle -= 360*5
            }else {
                angle +=360*5
            }       
               
            egret.Tween.get(this)

            .to({anchorX: 0.5, anchorY: 0.5, rotation: 0 }, 10 , egret.Ease.sineOut)
            .to({anchorX: 0.5, anchorY: 0.5, rotation: angle+i }, period , egret.Ease.circInOut)
            this.isRunning = false;  
    } 

    public test_roulette(x1,y1,circle_x,circle_y,type,period,scale:number,toright:boolean): void {  
        if (this.isRunning) return
        this.isRunning = true;

         var angle = 0;  
         this.speed = 0;
         this.time = 0;
         var i = (Maths.RndNum(12))*30+15;  
            if (toright) {
                angle -= 1080
            }else {
                angle +=1080
            }       
               
            egret.Tween.get(this)
            //.to({alpha:1},0)
            .to({anchorX: 0.5, anchorY: 0.5, rotation: 0 }, 10 , egret.Ease.sineOut)
            .to({anchorX: 0.5, anchorY: 0.5, rotation: angle+i }, 2000 , egret.Ease.circInOut)
           // .to({ anchorX: 0.5, anchorY: 0.5, rotation: this.speed }, 2000 )
              this.isRunning = false;
             

               
    }   
/*
    public changeFace(chance,interval: number): void {

        if (chance == 0 || Maths.RndNum(chance) < 1) {
            var result =this.assetName+this.picIndex+"-" + this.skinIndex
            console.log(result)
            this.setBitmap(result);
            this.skinIndex += 1;

            if (this.skinIndex > this.skinMaxNumber) {
                this.skinIndex = 1
            }
        }




    } 
    */
    public changeFace(chance,interval: number): void {

        var onComplete1: Function = function() {
            var result = this.assetName + this.picIndex + "-" + this.skinIndex
            console.log(result)
            this.setBitmap(result);
            this.skinIndex += 1;

            if (this.skinIndex > this.skinMaxNumber) {
                this.skinIndex = 1
            }
              egret.Tween.get(this)
                .wait(1000)                
                .call(onComplete1, this)        
        }

         egret.Tween.get(this)                
                .call(onComplete1, this)        
        
   } 
  
}
   


