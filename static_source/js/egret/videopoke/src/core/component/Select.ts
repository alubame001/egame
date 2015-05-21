/**
  * 图片button类
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  * 可以有图片，文字，动画
  * todo:九宫格、多动画、图字等
  */

class Select extends egret.DisplayObjectContainer {

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
    public slotNumber: number  =12



    private isRunning: boolean = false;
    private seed: number = 0;
    private maxSeed :number = 9; // range from 0 to 4
    public path :any[]= [0,0,0,0,0,0]


     public selects: EButton[];

    public constructor(context: any, imgName: string, backFun: Function = null, descStr: string = "", fontSize: number = 30, cartoonType: number = 1, assetsName: string = "assets") {
        super();
        this.param.context = context;
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


        for (var i = 0; i < 40; i++) {
           var obj = new EButton(this,"yellow_button",null,i,20,cartoonType,assetsName);
               this.selects.push(obj)
          

        }

        console.log(this.selects)
       
    }

    
  
}
   


