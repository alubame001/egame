
class Notice extends egret.Sprite{

    private imgs:egret.SpriteSheet = RES.getRes("asserts1");
    private w:number = 0;
    private h:number = 0;
    public constructor(stageW,stageH){
        super();
        this.w = stageW;
        this.h = stageH;
        this.createView();
    }
    private bg2:egret.Sprite = new egret.Sprite();
    private notice:egret.Bitmap = new egret.Bitmap();
    public createView():void {
        //绘制一个透明度为1的绿色矩形，宽高为100*80
        this.bg2.graphics.beginFill(0x000000, 0.5);
        this.bg2.graphics.drawRect(0, 0, this.w, this.h);
        this.bg2.graphics.endFill();
        this.bg2.width = this.w;
        this.bg2.height = this.h;
        this.addChild( this.bg2 );
        this.touchEnabled = true;

        this.notice.texture = this.imgs.getTexture("notice");
        this.notice.x = this.w/2 - this.notice.width/2;
        this.notice.y = this.h/2 - this.notice.height/2;
        this.addChild(this.notice);  
        this.notice.touchEnabled =  true;

        this.notice.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNoticeClick, this);

    }

    private onNoticeClick():void{
        this.dispatchEvent(new egret.Event("readOver")); 
    }
}

