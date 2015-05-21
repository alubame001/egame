/**
  * 图片button类
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  * 可以有图片，文字，动画
  * todo:九宫格、多动画、图字等
  */

class EBet extends EButton {

    public textField: egret.TextField;
    public assets: egret.SpriteSheet = RES.getRes("assets");//名称不一样的话需要修改
    public btnImg: egret.Bitmap;
    public backFun: Function;
    public isPlayCartoon: Boolean = false;
    public cartoonType: number = 1;
    public param = { context: null, data: null };//回调参数
    public scaleXSize: number = 1;
    public scaleYSize: number = 1;
    public  sound:egret.Sound;
    //private iconPress :string=""
    //public touchEnabled: Boolean = true;
    /**
    * imgName       图片
    * backFun       点击方法 如果需要在backFun中使用this的，小心使用这个
    * descStr       按钮描述
    * fontSize      字体大小
    * cartoonType   动画类型 1:【可爱】按下变小，放开弹大 2:按下变小，放开轻微弹大 3：按下变小，放开变大
    * 注意：如果有动画的话，只有动画结束才会触发click事件
    */


    
    public onbuttonTouchTap(e): void {
        console.log(e)
           this.sound.play();     
        if (this.isPlayCartoon) {
            return;
        }
        this.isPlayCartoon = true;
        var onComplete2: Function = function () {
            this.isPlayCartoon = false;
        };
        var onComplete1: Function = function () {
            egret.Tween.get(this).to({ scaleX: this.scaleXSize, scaleY: this.scaleYSize, x: this.x - this.btnImg.width /20, y: this.y - this.btnImg.height / 20 }, 100, egret.Ease.elasticOut).call(onComplete2, this);
        };
        egret.Tween.get(this).to({ scaleX: this.scaleXSize, scaleY: this.scaleYSize, x: this.x + this.btnImg.width / 20, y: this.y + this.btnImg.height / 20 }, 100, egret.Ease.sineIn).call(onComplete1, this);


      
        egret.setTimeout(function () {
            if (this.backFun != null) {
                console.log(this.param.context)
                console.log(this.param.data)
                this.backFun.apply(this.param.context, [this.param.data]);
            }
        }, this, 300);
    }



}
   