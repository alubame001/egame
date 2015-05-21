/**
  * 图片button类
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  * 可以有图片，文字，动画
  * todo:九宫格、多动画、图字等
  */

class ENumber extends egret.DisplayObjectContainer {


    public assets: egret.SpriteSheet = RES.getRes("number");//名称不一样的话需要修改
    public numberImg: egret.Bitmap;
    public numberFg: egret.Bitmap;
    public numberBg: egret.Bitmap;
    public numbers: egret.Bitmap[];
    public zeros: egret.Bitmap[];
    public initNumber: number;
    public initString: string;
    public newNumber: number;
    public position: number;
    public offsetX: number = 80;
    public offsetY: number = 5;
    public textField: egret.TextField;
    public  sound:egret.Sound;
    public assetsName: string;
  
    public constructor( descNum: number = 0,fontSize:number=20,titleStr:string="", assetsName: string = "number",position:number = 10) {
        super();
        //this.param.context = context;

        this.init(descNum, fontSize,titleStr, assetsName);
    }
    public setNumber(descNum: number =0):void{
      var descStr = descNum.toString();
      var l = descStr.length;
      for (var i = 0; i < this.position-l; i++) {
          descStr = "z" + descStr;           
      }   
 console.log("descStr:",descStr);
      for (var i = 0; i < this.numbers.length; i++) {

        var obj = this.numbers[i];
        var imgName = descStr.substring(i,i+1)
        obj.texture = this.assets.getTexture(imgName);
       
       
      }           
    }
    public init(descNum: number =0, fontSize:number=20,titleStr:string="", assetsName: string = "number",position:number = 10): void {
       // console.log(minBet);
       // this.min_bet = minBet;
        this.assetsName = assetsName;
        this.position = position;
        var descStr = descNum.toString();

     

        
        this.numberBg = new egret.Bitmap();
        this.numberBg.texture = this.assets.getTexture("glass210X28_bg"); 
        this.numberBg.x = this.x;
        this.numberBg.y = this.y;
        this.addChild(this.numberBg);
        var l = descStr.length;
        for (var i = 0; i < position-l; i++) {
            this.initString = "z" + descStr;           
        }       
        console.log(this.initString)
       this.initNumber = Number(descStr); //这段很重
       console.log(this.initNumber)
       this.numbers = [];
     
        for (var i = 0; i < position-descStr.length; i++) {

          var obj = new egret.Bitmap();
          var imgName = "z"//descStr.substring(i,i+1)
          obj.texture = this.assets.getTexture(imgName);
          this.numbers.push(obj);
          this.addChild(this.numbers[i]);
         
        } 

        for (var i = 0; i < descStr.length; i++) {

          var obj = new egret.Bitmap();
         // obj.x = this.x + ((i+position-l) * 11);
          //obj.y = this.y;
          var imgName = descStr.substring(i,i+1)
          obj.texture = this.assets.getTexture(imgName);
          this.numbers.push(obj);
        //  this.addChild(this.numbers[l+i-1]);
         
        }   
        for (var i = 0; i < this.numbers.length; i++) {
            var obj = this.numbers[i];
           obj.x = this.offsetX+this.x + (i * 11);   
           obj.y = this.offsetY+this.y;
            this.addChild(this.numbers[i]);
        }

        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.size = fontSize;
        this.textField.textAlign = "left";
        this.textField.stroke = 1;
        this.textField.strokeColor = 0x000000;
        this.textField.textColor = 0xffffff;
        this.textField.text = titleStr;
        this.textField.width = this.numberBg.width;
        this.textField.x = this.numberBg.width / 2 - this.textField.width / 2 +8;
        this.textField.y = this.numberBg.height / 2 - this.textField.height / 2;


        this.numberFg = new egret.Bitmap();  
        this.numberFg.texture = this.assets.getTexture("glass210X28"); 
        this.numberFg.x = this.x+5;
        this.numberFg.y = this.y+1;        
        this.addChild(this.numberFg);


      

      //  this.sound =  RES.getRes("click");


    
       

        this.touchEnabled = true;
        
       if (this.touchEnabled){
         this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onbuttonTouchTap, this);
        }
       
    }

    public onbuttonTouchTap(e): void {
      this.addAnimatedNumber(-1000.1)
     // for (var i = 0; i < 10000; i+10) {




      //  }     
    
    }
  public addAnimatedNumber(n: number): void {
        var range = Math.floor(n / 5)
        var m = n - (range * 5);
        console.log(range)
        console.log(m)
        var delay =50

         egret.setTimeout(function() {
           this.addNumber(range);   
            }, this, delay*1); 

         egret.setTimeout(function() {
           this.addNumber(range);   
            }, this,  delay*2); 

         egret.setTimeout(function() {
           this.addNumber(range);   
            }, this,  delay*3); 

         egret.setTimeout(function() {
           this.addNumber(range);   
            }, this,  delay*4); 

         egret.setTimeout(function() {
           this.addNumber(range);   
            }, this,  delay*5);  
         egret.setTimeout(function() {
           this.addNumber(m);   
            }, this,  delay*6);                 
  }
   public addNumber(n:number):void{
       console.log(" this.initNumber", this.initNumber)
      var descStr = n.toString();
      this.initNumber += Number(descStr);
      descStr = this.initNumber.toString();

      console.log("descStr:",descStr)

      var l = descStr.length;
        for (var i = 0; i < this.position-l; i++) {
            descStr = "z" + descStr;           
        }       
        for (var i = 0; i < this.position; i++) {
                     
          var obj = this.numbers[i];
          var newName = descStr.substring(i,i+1)
          var initName = this.initString.substring(i,i+1)
        // console.log(newName,initName)
         // this.animateNumber(obj,initName,newName,200)
            obj.texture = this.assets.getTexture(newName);
        }  

     
        for (var i = 0; i < this.position-l; i++) {
            this.initString = "z" + descStr;           
        }   


   }




}
   


