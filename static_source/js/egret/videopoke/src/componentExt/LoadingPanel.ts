/**
 * Created by xiangtao on 2014.11.29.
 */
class LoadingPanel extends egret.Sprite{

    private mySheet:egret.SpriteSheet;
    private bgImg:egret.Bitmap;
    private logoImg:egret.Bitmap;
    private pgBg:egret.Bitmap;
    private pgBar:egret.Bitmap;
    private textField:egret.TextField;
    private bg:egret.Sprite = new egret.Sprite();
    private w:number = 0;
    private h:number = 0;
    constructor(){
        super();
        this.mySheet = RES.getRes("load");
        this.createView();
    }

    private createView():void{
      //  this.w = egret.MainContext.instance.stage.stageWidth;
       // this.h = egret.MainContext.instance.stage.stageHeight;
        this.bgImg = new egret.Bitmap();
        this.bgImg.texture = RES.getRes("bg");
        //this.bgImg.anchorX = 0.5;
        //this.bgImg.anchorY = 1;
        this.bgImg.x = 0;
        this.bgImg.y = 0;
        this.addChild(this.bgImg);   

        this.logoImg = new egret.Bitmap();
        this.logoImg.texture = RES.getRes("logo");
        //this.bgImg.anchorX = 0.5;
        //this.bgImg.anchorY = 1;
        this.logoImg.x = 200;
        this.logoImg.y = 100;
        this.addChild(this.logoImg);   




        this.w = 800;
        this.h = 480;

/*       
        this.bg.graphics.beginFill(0x313131, 1);
        this.bg.graphics.drawRect(0, 0, this.w, this.h);
        this.bg.graphics.endFill();
        this.bg.width = this.w;
        this.bg.height = this.h;
        this.addChild( this.bg );
        this.touchEnabled = true;
*/
        this.pgBg = new egret.Bitmap;
        this.pgBg.anchorX = 0.5;
        this.pgBg.anchorY = 0.5;
        this.pgBg.texture = this.mySheet.getTexture("pgBg");
        this.pgBg.x = this.w/2;
        this.pgBg.y = this.h/2+150;
        this.addChild(this.pgBg);

        this.pgBar = new egret.Bitmap;
        this.pgBar.anchorX = 0.5;
        this.pgBar.anchorY = 0.5;
        this.pgBar.texture = this.mySheet.getTexture("pgBar");
        this.pgBar.x = this.w/2 ;
        this.pgBar.y = this.h/2+150;
        this.addChild(this.pgBar);

        this.textField = new egret.TextField();
        this.textField.size = 24;
        this.textField.textColor = 0xFFFFFF;
        this.textField.bold = true;
        this.textField.stroke = 1;
        this.textField.strokeColor = 0x000000;
        this.addChild(this.textField);
        this.textField.width = 100;
        this.textField.x = this.w/2 - this.textField.width/2;
        this.textField.y = this.h/2 - this.textField.height/2 - 10;
        this.textField.textAlign = "center";
        this.textField.text = "0%";
    }

    public setProgress(current, total):void {

         //egret.setTimeout(function () {                   

            var rate:number = Math.round((current/total)*100);
            this.textField.text = rate + "%";
            this.pgBar.width = 282 * (current/total);
            console.log( this.pgBar.width)
            this.pgBar.x = this.w/2 +(this.pgBar.width/2) -141;
        // }, this, 11250); 


    }
}