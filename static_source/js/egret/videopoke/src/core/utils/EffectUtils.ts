  /**
    * 游戏特效汇总
    * by zhaoxin
    * (c) copyright 2014 - 2035
    * All Rights Reserved. 
    * 使用方法如：EffectUtils.rotationEffect()
    */

module EffectUtils {

    // 存储旋转对象
    var rotationArr:Array<any> = [];





    //对象旋转特效
    //obj   旋转对象
    //time  旋转一周用时，毫秒
    export function rotationEffect(obj,time:number = 1000):void{
        if(this.rotationArr == null){
            this.rotationArr = [];
        }
        if(this.rotationArr[obj.hashCode]){
            return;
        }
        if((this.rotationArr[obj.hashCode] == null)||!this.rotationArr[obj.hashCode]){
            this.rotationArr[obj.hashCode] = true;
        }
        var onComplete1:Function = function(){
            if(this.rotationArr[obj.hashCode]&&(obj != null)){
                obj.rotation = 0;
                egret.Tween.get(obj).to({rotation:360},time).call(onComplete1,this);   
            }
        };
        obj.rotation = 0;
        egret.Tween.get(obj).to({rotation:360},time).call(onComplete1,this);   
    }

    //取消对象旋转
    //obj    旋转对象
    export function removeRotationEffect(obj):void{
        if(this.rotationArr == null){
            this.rotationArr = [];
        }
        this.rotationArr[obj.hashCode] = false;
    }

    //对象闪烁特效
    //obj         闪烁对象
    //interval    闪烁总工时间
    export function blinkEffect(obj,interval:number = 1000):void{
        new BitmapBlink(obj,interval); 
    }

    //抖动对象特效
    //类似ios密码输入错误的特效
    export function shakeObj(obj):void{

        var shakeNum = 80;
        var oldX:number = obj.x;
        egret.Tween.get(obj).to({x:obj.x - 10},shakeNum); 

        egret.setTimeout(function () {              
            egret.Tween.get(obj).to({x:obj.x + 20},shakeNum); 
        }, this, shakeNum*2); 
        egret.setTimeout(function () {              
            egret.Tween.get(obj).to({x:obj.x - 20},shakeNum); 
        }, this, shakeNum*3); 
        egret.setTimeout(function () {              
            egret.Tween.get(obj).to({x:obj.x + 20},shakeNum); 
        }, this, shakeNum*4); 
        egret.setTimeout(function () {              
            egret.Tween.get(obj).to({x:oldX},shakeNum); 
        }, this, shakeNum*5);           
    }

    export function moveToObj(obj,position):void{
    
        var shakeNum = 80;
        var oldX:number = obj.x;
        var oldY:number = obj.y;
        egret.Tween.get(obj).to({y:oldY + 10},shakeNum); 

        egret.setTimeout(function () {              
            egret.Tween.get(obj).to({y:oldY + 30},shakeNum); 
        }, this, shakeNum*2); 
        egret.setTimeout(function () {              
            egret.Tween.get(obj).to({y:oldY + 50},shakeNum); 
        }, this, shakeNum*3); 
        egret.setTimeout(function () {              
            egret.Tween.get(obj).to({y:oldY + 70},shakeNum); 
        }, this, shakeNum*4); 
        egret.setTimeout(function () {              
            egret.Tween.get(obj).to({y:oldY+position},shakeNum); 
        }, this, shakeNum*5);           
    }
 
    export function slotDown(obj,period,symbol):void{
        var py  = 0;
        var  oldY = obj.y;

        var onComplete3:Function = function(){
                egret.Tween.get(obj)
               .to({y:-8},0)
               .to({y:-900},period)
               .call(onComplete4,this); 
        };   
        var onComplete4:Function = function(){
                
            py = ((symbol-1)*-150)-0 -150
            egret.Tween.get(obj).to({y:py},period)
            .call(onComplete5,this); 
        };   

        var onComplete5:Function = function(){                
            py =py+150              
            egret.Tween.get(obj).to({y:py},1000,   egret.Ease.backOut);
        };   



      // egret.Tween.get(obj).to({y:oldY -35},500,   egret.Ease.backOut).call(onComplete3,this);              
       egret.Tween.get(obj).to({y:oldY -35},500,   egret.Ease.backOut).call(onComplete3,this);              
                  
    }


    export function moveDown(obj,period,symbol):void{
        var py  = 0;
        var  oldY = obj.y;

        var onComplete3:Function = function(){
                egret.Tween.get(obj)
               .to({y:-8},0)
               .to({y:-900},period)
               .call(onComplete4,this); 
        };   
        var onComplete4:Function = function(){
                
            py = ((symbol-1)*-70)-8 -200
            egret.Tween.get(obj).to({y:py},period)
            .call(onComplete5,this); 
        };   

        var onComplete5:Function = function(){                
            py =py+200                
            egret.Tween.get(obj).to({y:py},1000,   egret.Ease.backOut);
        };   



      // egret.Tween.get(obj).to({y:oldY -35},500,   egret.Ease.backOut).call(onComplete3,this);              
       egret.Tween.get(obj).to({y:oldY -35},500,   egret.Ease.backOut).call(onComplete3,this);              
                  
    }

    //抖动对象特效
    // 1：抖动  2：震动
    export function shakeScreen(effectType:number = 1):void{
        var panel = GameConfig.curPanel;
        var shakeNum = 40;
        var oldX:number = panel.x;
        var oldY:number = panel.y;

        if(effectType == 1){
            egret.Tween.get(panel).to({x:panel.x - 10},shakeNum); 

            egret.setTimeout(function () {              
                egret.Tween.get(panel).to({x:panel.x + 20},shakeNum); 
            }, this, shakeNum*2); 
            egret.setTimeout(function () {              
                egret.Tween.get(panel).to({x:panel.x - 20},shakeNum); 
            }, this, shakeNum*3); 
            egret.setTimeout(function () {              
                egret.Tween.get(panel).to({x:panel.x + 20},shakeNum); 
            }, this, shakeNum*4); 
            egret.setTimeout(function () {              
                egret.Tween.get(panel).to({x:oldX},shakeNum); 
            }, this, shakeNum*5);      
        }else{
            egret.Tween.get(panel).to({x:panel.x - 10,y:panel.y},shakeNum); 

            egret.setTimeout(function () {              
                egret.Tween.get(panel).to({x:panel.x + 20,y:panel.y},shakeNum); 
            }, this, shakeNum*2); 
            egret.setTimeout(function () {              
                egret.Tween.get(panel).to({x:panel.x,y:panel.y + 15},shakeNum); 
            }, this, shakeNum*3); 
            egret.setTimeout(function () {              
                egret.Tween.get(panel).to({x:panel.x,y:panel.y - 20},shakeNum); 
            }, this, shakeNum*4); 
            egret.setTimeout(function () {              
                egret.Tween.get(panel).to({x:panel.x,y:panel.y + 10},shakeNum); 
            }, this, shakeNum*5); 
            egret.setTimeout(function () {              
                egret.Tween.get(panel).to({x:oldX,y:oldY},shakeNum); 
            }, this, shakeNum*6);      
        }
    }

    /**
    * str             提示内容
    * effectType      动画类型 1：从下到上弹出 2：从左至右弹出 3：从右至左弹出 4：从中间弹出渐渐消失 5：从大变小 等等
    * isWarning       是否是警告，警告是红色
    */
    export function showTips(str:string = "",effectType:number = 1,isWarning:boolean = false,x:number=0,y:number=0):void{
        switch (effectType)
        {
            case 1: {
                TipsUtils.showTipsDownToUp(str,isWarning,x,y);
                break;
            }
            case 2: {
                TipsUtils.showTipsLeftOrRight(str,isWarning,true);
                break;
            }
            case 3: {
                TipsUtils.showTipsLeftOrRight(str,isWarning,false);
                break;
            }
            case 4: {
                TipsUtils.showTipsFromCenter(str,isWarning);
                break;
            }
            case 5: {
                TipsUtils.showTipsBigToSmall(str,isWarning);
                break;
            }
            default: {
                // TODO: Implemente default case
            }
        }

    }    

    //========================== a lot of effect will coming! ============================
   
    var isPlayEffectPlay:Boolean = false; 
    /**
    * 给显示对象增加特效
    * obj           对象
    * cartoonType   动画类型 1:【可爱】按下变小，放开弹大 2:按下变小，放开轻微弹大 3：按下变小，放开变大
    */
    export function playEffect(obj,cartoonType:number = 1):void{
        if(this.isPlayEffectPlay){
            return;
        }
        this.isPlayEffectPlay = true;
        var onComplete2:Function = function(){
            this.isPlayEffectPlay = false;
        }; 
        var onComplete1:Function = function(){
            if(cartoonType == 1){
                egret.Tween.get(obj).to({scaleX:1,scaleY:1,x:obj.x - obj.width/4,y:obj.y - obj.height/4},500,egret.Ease.elasticOut).call(onComplete2,this); 
            }else if(cartoonType == 2){
                egret.Tween.get(obj).to({scaleX:1,scaleY:1,x:obj.x - obj.width/4,y:obj.y - obj.height/4},500,egret.Ease.backOut).call(onComplete2,this); 
            }else if(cartoonType == 3){
                egret.Tween.get(obj).to({scaleX:1,scaleY:1,x:obj.x - obj.width/4,y:obj.y - obj.height/4},100).call(onComplete2,this); 
            }
        };   
        egret.Tween.get(obj).to({scaleX:0.5,scaleY:0.5,x:obj.x + obj.width/4,y:obj.y + obj.height/4},100,egret.Ease.sineIn).call(onComplete1,this);                    
    }    


    /**
    * 给显示对象增加持续放大特效
    * obj           对象
    */
    export function playScaleEffect(obj):void{
        var onComplete1:Function = function(){
            if(obj != null){
                var onComplete2:Function = function(){
                    obj.scaleX = 1;
                    obj.scaleY = 1;
                    egret.Tween.get(obj).to({ alpha:1}, 1000).call(onComplete1,self)  
                };  
                obj.alpha = 1;
                egret.Tween.get(obj).to({ scaleX:1.5,scaleY:1.5,alpha:0}, 1000).call(onComplete2,self)   
            }
        };  

        onComplete1();

    }  

    /**
    * 显示对象上线浮动特效
    * obj           对象
    * time          浮动时间 毫秒
    * space         浮动高度
    * todo          多个对象跳动
    */    
    export function flyObj(obj,time,space:number = 50):void{
        var onComplete1:Function = function(){
            if(obj != null){

                var onComplete2:Function = function(){
                    egret.Tween.get(obj).to({y:obj.y - space},time).call(onComplete1,this);
                };  
                egret.Tween.get(obj).to({y:obj.y + space},time).call(onComplete2,this);
            }
        };  
        onComplete1();
    }

    /**
    * 显示对象摇头特效
    * obj           对象
    * time          浮动时间 毫秒
    * space         摇头幅度
    * todo          多个对象摇头
    * 注意：需要将对象的注册点位置：0.5,1
    */    
    export function rockObj(obj,time,space:number = 20):void{
        var onComplete1:Function = function(){
            if(obj != null){
                var onComplete2:Function = function(){
                    egret.Tween.get(obj).to({rotation:-space},time).call(onComplete1,this);
                };  
                egret.Tween.get(obj).to({rotation:space},time).call(onComplete2,this);
            }
        };  
        onComplete1();
    }

    /**
    * 显示对象上线浮动特效
    * obj           对象
    * time          浮动时间 毫秒
    * space         浮动高度
    * todo          多个对象跳动
    */    
    export function slotObj(assets:string,obj,time,space:number = 50):void{
         obj.assets= RES.getRes(assets);
         //obj.setBitmap("diamond")
        obj.setIsRunning(true);
        var onComplete1:Function = function(){
            if(obj != null){  
                if (obj.isRunning== false){
                    obj.setRandomImg(false);
                        return
                    } else {
                          obj.setRandomImg(true);   
                    }
                     

                var onComplete2:Function = function(){
                      if (obj.isRunning== true){
                            obj.setRandomImg(true);
                         }
                    // obj.setBitmap("orange_blur") 
                    // obj.setRandomImg(4,true);
                    egret.Tween.get(obj).to({y:obj.y - space},time).call(onComplete1,this);
                };  
                egret.Tween.get(obj).to({y:obj.y + space},time).call(onComplete2,this);
            }
        };  
        onComplete1();
    }

    export function setSlotObj(assets:string,obj,time,result:number = 0):void{
                  // obj.assets= RES.getRes("gem3");
       // this.rpgslot_1.setBitmap("diamond_blur")  
           obj.assets= RES.getRes(assets);

            obj.setIsRunning(false) 
        switch (result)
        {
            case 0: {
                // TODO: Implement case content
               // obj.setBitmap("seven") 
               // egret.Tween.get(this.obj).to({alpha:1},300);  
                break;
            }
            case 1: {
                // TODO: Implement case content
               // obj.setBitmap("bar") 
               
                //egret.Tween.get(obj).to({y:obj.y},time)
                break;
            }
            case 2: {
                // TODO: Implement case content
                //obj.setBitmap("orange") 
                //egret.Tween.get(this.obj).to({alpha:1},300);  
                break;
            }
        }


    }

}