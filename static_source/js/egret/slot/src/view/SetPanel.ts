
class SetPanel extends BasePanel{

    public constructor(){
        super();
    }

    private bg:egret.Bitmap;
    private cancelBtn:ImgButton;
    private softEngineerBtn:ImgButton;
    private htmlTF1:HtmlText;
    private htmlTF2:HtmlText;
    // 初始化面板
    public initPanel():void{
        this.bg = new egret.Bitmap();
        this.bg.texture = this.assets.getTexture("alertBg");
        this.addChild(this.bg);   
        this.bg.touchEnabled = true;   

        this.cancelBtn = new ImgButton("cancelBtn",this.onCancelBtnTouchTap);
        this.cancelBtn.x = this.getWidth() - this.cancelBtn.width - 20;
        this.cancelBtn.y = 20;    
        this.addChild(this.cancelBtn);

        this.htmlTF1 = new HtmlText([["如果是程序员选择",0xFFFFFF,22],["俺是程序猿",0x5eff00,22]],30,false,1,0xFFFFFF);
        this.htmlTF1.x = this.getWidth()/2 - this.htmlTF1.width/2;
        this.htmlTF1.y = 70;
        this.addChild(this.htmlTF1);

        this.htmlTF2 = new HtmlText([["如果不是程序员请选择",0xFFFFFF,22],["策划萌妹子",0x5eff00,22]],30,false,1,0xFFFFFF);
        this.htmlTF2.x = this.getWidth()/2 - this.htmlTF2.width/2;
        this.htmlTF2.y = 110;
        this.addChild(this.htmlTF2);

        if(GlobalData.isEngineer){
            this.softEngineerBtn = new ImgButton("bigYellowBtn",null,"俺是程序猿",30);    
        }else{
            this.softEngineerBtn = new ImgButton("bigYellowBtn",null,"策划萌妹子",30);
        }
        this.softEngineerBtn.x = this.getWidth()/2 - this.softEngineerBtn.width/2;
        this.softEngineerBtn.y = 155;        
        this.addChild(this.softEngineerBtn);
        this.softEngineerBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSoftEngineerBtnTouchTap, this);

    }

    public onCancelBtnTouchTap(e:egret.TouchEvent):void{
        Global.dispatchEvent(MainNotify.closeSetPanelNotify,1,false);      
    }

    public onSoftEngineerBtnTouchTap(e:egret.TouchEvent):void{
        if(GlobalData.isEngineer){
            // this.softEngineerBtn.setSelect(false);
            GlobalData.isEngineer = false;
            this.softEngineerBtn.setText("策划萌妹子");
        }else{
            GlobalData.isEngineer = true;;
            // this.softEngineerBtn.setSelect(true);
            this.softEngineerBtn.setText("俺是程序猿");
        }
        egret.localStorage.setItem("isEngineer",GlobalData.isEngineer+"");
    }




}

