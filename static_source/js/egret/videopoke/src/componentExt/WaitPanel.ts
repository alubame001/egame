  /**
    * 通讯等待类
    * by dily
    * (c) copyright 2014 - 2035
    * All Rights Reserved. 
    * 和服务端通讯时的显示效果
    */
class WaitPanel extends egret.Sprite {

    private mySheet: egret.SpriteSheet;
    private waitImg: egret.Bitmap;
    private bg: egret.Sprite = new egret.Sprite();
    private cartoonType:string = "loading_1";
    private w: number = 0;
    private h: number = 0;
    //type 1:白色等待 2：蓝色等待
    constructor(type:number = 1) {
        super();
        switch (type)
        {

            case 0: {
                this.cartoonType = "loading_1";
                break;
            }            
            case 1: {
                this.cartoonType = "loading_cir1";
                break;
            }
            case 2: {
                this.cartoonType = "loading_cir2";
                break;
            }
            default: {
                this.cartoonType = "loading_1";
                break;
            }
        }
        this.mySheet = RES.getRes("menu");
        this.createView();
    }

    private createView(): void {
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
    }

}