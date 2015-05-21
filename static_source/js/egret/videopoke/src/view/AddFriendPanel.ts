
class AddFriendPanel extends BasePanel{

    public constructor(){
        super();
    }

    private bg:egret.Bitmap;
    private cancelBtn:ImgButton;
    // 初始化面板
    public initPanel():void{
        this.bg = new egret.Bitmap();
        this.bg.texture = this.assets.getTexture("addBg");
        this.addChild(this.bg);   
        this.bg.touchEnabled = true;   

        this.cancelBtn = new ImgButton("cancelBtn",this.onCancelBtnTouchTap);
        this.cancelBtn.x = this.getWidth() - this.cancelBtn.width - 10;
        this.cancelBtn.y = 10;    
        this.addChild(this.cancelBtn);
    }

    public onCancelBtnTouchTap(e:egret.TouchEvent):void{
        Global.dispatchEvent(MainNotify.closeAddFriendPanelNotify,1,false);      
    }




}

