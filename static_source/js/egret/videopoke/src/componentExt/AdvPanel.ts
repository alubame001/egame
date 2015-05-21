  /**b65b8302-8543-4a50-a964-b0264b816f8d
    * 通讯等待类
    * by dily
    * (c) copyright 2014 - 2035
    * All Rights Reserved. 
    * 和服务端通讯时的显示效果
    */
class AdvPanel extends egret.Sprite {
    private selects: EButton[];
    private mySheet: egret.SpriteSheet;
    private waitImg: egret.Bitmap;
    private bg: egret.Sprite = new egret.Sprite();
    private cartoonType:string = "loading_1";
    private w: number = 0;
    private h: number = 0;
    public param = { context: null, data: null };//回调参数
    public panel : GamePanel;
    public select_type: number = 0;

    //type 1:白色等待 2：蓝色等待
    constructor(context: any,type:number = 0) {
        super();
        this.param.context = context;  //this.param.context = lottery28Panel
        switch (type)
        {
            case 1: {
                this.cartoonType = "loading_1";
                 this.createView_1();
                break;
            }
            case 2: {
                this.cartoonType = "loading_1";
                 this.createView_2();
                break;
            }
            default: {
                this.cartoonType = "loading_1";
                break;
            }
        }
       // this.mySheet = RES.getRes("rpg");
       

    }


    private test():void{
      // console.log(i)
     //   console.log(this.panel)
    //   this.param.context.resetBet();
    }
    private createView_1(): void {

        this.w = egret.MainContext.instance.stage.stageWidth;
        this.h = egret.MainContext.instance.stage.stageHeight;

        this.bg.graphics.beginFill(0x000000, 0.8);
        this.bg.graphics.drawRect(0, 0, this.w, this.h);
        this.bg.graphics.endFill();
        this.bg.width = this.w;
        this.bg.height = this.h;
        this.addChild(this.bg);
        this.touchEnabled = true;


        this.selects = [];


        for (var i = 0; i < 6; i++) {
          var obj = new EButton(this,"button_green",this.test,"1",24,4,"lottery28");
          //var obj = new EButton(this,"return",null,"1",20,this.cartoonType,this.assetsName);
          obj.modeNumber = i+1;
          obj.x = 80;// 82+5;
          obj.y = 50+(i*60);//78+5;
          obj.alpha = 1;  
          this.selects.push(obj)
          this.addChild(this.selects[i]);   

        }
        this.selects[0].textField.text="大";
        this.selects[1].textField.text="小";
        this.selects[2].textField.text="单";
        this.selects[3].textField.text="双";
        this.selects[4].textField.text="中";
        this.selects[5].textField.text="边";
        for (var i = 6; i < 12; i++) {
          var obj = new EButton(this,"button_blue_s",this.test,"1",16,4,"lottery28");
          //var obj = new EButton(this,"return",null,"1",20,this.cartoonType,this.assetsName);
          obj.modeNumber = i+1;
          obj.x = this.selects[0].x+(this.selects[0].width/2)+((i-5)*70)// 82+5;
          obj.y = this.selects[0].y+(this.selects[0].height/4)
          obj.alpha = 1;  
         // obj.scaleX = 0.6;
         // obj.scaleY = 0.6;
          this.selects.push(obj)
          this.addChild(this.selects[i]);   

        }
        this.selects[6].textField.text="0尾";
        this.selects[7].textField.text="1尾";
        this.selects[8].textField.text="2尾";
        this.selects[9].textField.text="3尾";
        this.selects[10].textField.text="4尾";
        this.selects[11].textField.text="5尾";

       for (var i = 12; i < 18; i++) {
          var obj = new EButton(this,"button_blue_s",this.test,"1",16,4,"lottery28");
          //var obj = new EButton(this,"return",null,"1",20,this.cartoonType,this.assetsName);
          obj.modeNumber = i+1;
          obj.x = this.selects[1].x+(this.selects[1].width/2)+((i-11)*70)// 82+5;
          obj.y = this.selects[1].y+(this.selects[1].height/4)
          obj.alpha = 1;  
          //obj.scaleX = 0.6;
          //obj.scaleY = 0.6;
          this.selects.push(obj)
          this.addChild(this.selects[i]);   

        }
        this.selects[12].textField.text="6尾";
        this.selects[13].textField.text="7尾";
        this.selects[14].textField.text="8尾";
        this.selects[15].textField.text="9尾";
        this.selects[16].textField.text="小尾";
        this.selects[17].textField.text="大尾";

       for (var i = 18; i < 24; i++) {
          var obj = new EButton(this,"button_blue_s",this.test,"1",16,4,"lottery28");
          //var obj = new EButton(this,"return",null,"1",20,this.cartoonType,this.assetsName);
          obj.modeNumber = i+1;
          obj.x = this.selects[2].x+(this.selects[2].width/2)+((i-17)*70)// 82+5;
          obj.y = this.selects[2].y+(this.selects[2].height/4)
          obj.alpha = 1;  
          //obj.scaleX = 0.6;
          //obj.scaleY = 0.6;
          this.selects.push(obj)
          this.addChild(this.selects[i]);   

        }
        this.selects[18].textField.text="3馀0";
        this.selects[19].textField.text="3馀1";
        this.selects[20].textField.text="3馀2";
        this.selects[21].textField.text="4馀0";
        this.selects[22].textField.text="4馀1";
        this.selects[23].textField.text="4馀2";

       for (var i = 24; i < 30; i++) {
          var obj = new EButton(this,"button_blue_s",this.test,"1",16,4,"lottery28");
          //var obj = new EButton(this,"return",null,"1",20,this.cartoonType,this.assetsName);
          obj.modeNumber = i+1;
          obj.x = this.selects[3].x+(this.selects[3].width/2)+((i-23)*70)// 82+5;
          obj.y = this.selects[3].y+(this.selects[3].height/4)
          obj.alpha = 1;  
          //obj.scaleX = 0.6;
          //obj.scaleY = 0.6;
          this.selects.push(obj)
          this.addChild(this.selects[i]);   

        }
        this.selects[24].textField.text="4馀3";
        this.selects[25].textField.text="5馀0";
        this.selects[26].textField.text="5馀1";
        this.selects[27].textField.text="5馀2";
        this.selects[28].textField.text="5馀3";
        this.selects[29].textField.text="5馀4";

        //this.selects[6].textField.text="大";
               
        /*
        this.w = egret.MainContext.instance.stage.stageWidth;
        this.h = egret.MainContext.instance.stage.stageHeight;

        this.bg.graphics.beginFill(0x000000, 0.1);
        this.bg.graphics.drawRect(0, 0, this.w, this.h);
        this.bg.graphics.endFill();
        this.bg.width = this.w;
        this.bg.height = this.h;
        this.addChild(this.bg);
        this.touchEnabled = true;
    
        this.waitImg = new egret.Bitmap;
        this.waitImg.anchorX = 0.5;
        this.waitImg.anchorY = 0.5;
        this.waitImg.texture = this.mySheet.getTexture(this.cartoonType);
        this.waitImg.x =800 / 2;
        this.waitImg.y = 480 / 2;
        this.addChild(this.waitImg);
        egret.setTimeout(function () {          
               
            EffectUtils.rotationEffect(this.waitImg,1000);

            }, this, 100);   
          */
    }
    private createView_2(): void {

        this.w = egret.MainContext.instance.stage.stageWidth;
        this.h = egret.MainContext.instance.stage.stageHeight;

        this.bg.graphics.beginFill(0x000000, 0.5);
        this.bg.graphics.drawRect(0, 0, this.w, this.h);
        this.bg.graphics.endFill();
        this.bg.width = this.w;
        this.bg.height = this.h;
        this.addChild(this.bg);
        this.touchEnabled = true;


        this.selects = [];


        for (var i = 0; i < 4; i++) {
          var obj = new EButton(this,"1-4",this.test,"1",24,4,"lottery28");
          //var obj = new EButton(this,"return",null,"1",20,this.cartoonType,this.assetsName);
          obj.modeNumber = i+1;
          obj.x = 280;// 82+5;
          obj.y = 250;//78+5;
          obj.rotation = 90*i;
          obj.anchorX = 0;
          obj.anchorY = 1;
          obj.alpha = 1;  
          this.selects.push(obj)
          this.addChild(this.selects[i]);  
          //  egret.Tween.get(this)           
           // .to({anchorX: 0, anchorY: 1, rotation: 90*i }, 100 , egret.Ease.circIn) 


        }
        this.selects[0].textField.text="大";
        this.selects[1].textField.text="小";
        this.selects[2].textField.text="单";
        this.selects[3].textField.text="双";
        
       
    }
}