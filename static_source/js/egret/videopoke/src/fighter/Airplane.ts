/**
 * Created by shaorui on 14-6-7.
 */
module fighter
{
    /**
     * 飞机，利用对象池
     */
    export class Airplane extends egret.DisplayObjectContainer {


       // private static cacheDict: Object = {};
        public speed: number = 1
        public pic: number = 1
        public p: number = -1
        public path :any[]= [-100,-100,0,0,1000,700]
        public skinIndex: number = 1;
        public picIndex: number = 1;
        public assetName: string ="fish"
        public justBorn: boolean = true;
        //public x1: number = 0;
        //public y1: number = 0; 
        /**飞机位图*/
        private bmp: egret.Bitmap;
        /**创建子弹的时间间隔*/
        private fireDelay: number;
        /**定时射*/
        private fireTimer: egret.Timer;
        /**飞机生命值*/
        public blood: number = 10;
       // public assets: egret.SpriteSheet = RES.getRes("fish");//名称不一样的话需要修改
        /**生产*/
        public static produce(textureName: string, fireDelay: number): fighter.Airplane {
            var theFighter: fighter.Airplane;
            var assets: egret.SpriteSheet = RES.getRes(textureName);
            theFighter = new fighter.Airplane(assets.getTexture(textureName), fireDelay);
            return theFighter;
        }

        
        


        public constructor(texture: egret.Texture, fireDelay: number) {
            super();
            this.fireDelay = fireDelay;
            this.bmp = new egret.Bitmap(texture);
            this.bmp.anchorX = 0.5;
            this.bmp.anchorY = 0.5;
            //this.bmp.texture = texture;
  
            this.addChild(this.bmp);
            this.fireTimer = new egret.Timer(fireDelay);
            this.fireTimer.addEventListener(egret.TimerEvent.TIMER, this.createBullet, this);
        }
        /**开火*/
        public fire(): void {
            this.fireTimer.start();
        }
        /**停火*/
        public stopFire(): void {
            this.fireTimer.stop();
        }

      
        /**创建子弹*/
        private createBullet(evt:egret.TimerEvent):void {
            this.dispatchEventWith("createBullet");
        }







        public getAngle(x1, y1, x2, y2: number):number {
            // 直角的边长
            var x = Math.abs(x1 - x2);
            var y = Math.abs(y1 - y2);
            // 斜边长
            var z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
            // 余弦
            var cos = y / z;
            // 弧度
            var radina = Math.acos(cos);
            // 角度
            var angle =  180 / (Math.PI / radina);
            return angle;
        }

         public getZoneOffset(x1, y1, x2, y2: number):number {
             var angle = 90;
           if (x1<x2 && y1<y2){ //右下//fine
             return angle*1;  
           }
            if (x1<x2 && y1>y2){//右上 //fine
                return angle * 0;  
           }    
           if (x1>x2 && y1>y2){//左下
             return angle*3;  
           }                 
             if (x1>x2 && y1<y2){//左上
             return angle*2;  
           }             
        }
       


        public changeSkin(chance: number): void {
 
            if (chance == 0 || Maths.RndNum(chance) < 1) {
                var result =this.assetName+this.picIndex+"-" + this.skinIndex
                //console.log(result)
                  var assets: egret.SpriteSheet = RES.getRes(this.assetName);
                this.bmp.texture = assets.getTexture(result);
                this.skinIndex += 1;

                if (this.skinIndex > 7) {
                    this.skinIndex = 1
                }
            }
        }    
        public get pathFactor(): number {
            return 0;
        }    

        public set pathFactor(value: number) {
            this.x = (1 - value) * (1 - value) *  (this.path[0]+this.x)  + 2 * value * (1 - value) * this.path[2]*(this.p) + value * value * (this.path[4]);
            this.y = (1 - value) * (1 - value) *  (this.path[1]+this.y)  + 2 * value * (1 - value) * this.path[3]*(this.p) + value * value * (this.path[5]);      
            this.changeSkin(100/this.speed);           
        } 
 
        public get flyFactor(): number {
            return 0;
        }    

        public set flyFactor(value: number) {
            this.x = (1 - value) * (1 - value) *  (this.path[0])  + 2 * value * (1 - value) * this.path[2] + value * value * (this.path[4]);
            this.y = (1 - value) * (1 - value) *  (this.path[1])  + 2 * value * (1 - value) * this.path[3]+ value * value * (this.path[5]);      
            this.changeSkin(this.speed);           
        } 
 
        public justSwim(): void {
             var onComplete0: Function = function() {
                  this.path = [-200,-200,100,400,1000,600];
                 egret.Tween.get(this)
                 .to({ anchorX:0.5, anchorY:0.5,rotation: 62 }, 100)
                 .to({pathFactor: 1,scaleX:0.5,scaleY:0.5 }, 200000/this.speed)                 
                 .call(onComplete1, this);
            }
            var onComplete1: Function = function() {
                 this.path = [1000,600,400,100,-200,-200];
                 egret.Tween.get(this)
                 .to({anchorX:0.5, anchorY:0.5,rotation: 225 }, 100)
                 .to({pathFactor: 1 ,scaleX:0.5,scaleY:0.5}, 200000/this.speed)                
                 .call(onComplete2, this);
            }
            var onComplete2: Function = function() {
                 this.path = [400,-200,200,240,400,700];
                 egret.Tween.get(this)
                 .to({anchorX:0.5, anchorY:0.5,rotation: 90 }, 100)
                 .to({pathFactor: 1 ,scaleX:0.5,scaleY:0.5}, 200000/this.speed)                
                 .call(onComplete3, this);
            }
            var onComplete3: Function = function() {
                 this.path = [400,900,200,240,400,-200];
                 egret.Tween.get(this)
                 .to({anchorX:0.5, anchorY:0.5,rotation: 270 }, 100)
                 .to({pathFactor: 1 ,scaleX:0.5,scaleY:0.5}, 200000/this.speed)                
                 .call(onComplete4, this);
            }
            var onComplete4: Function = function() {//左到右
                             this.path = [-200,300,200,50,1000,300];
                 egret.Tween.get(this)
                 .to({anchorX:0.5, anchorY:0.5,rotation: 0 }, 100)
                 .to({pathFactor: 1 ,scaleX:0.5,scaleY:0.5}, 200000/this.speed)                
                 .call(onComplete5, this);
            }
            var onComplete5: Function = function() {//从右到左
                 this.path = [1000,100,50,240,-200,100];
                 egret.Tween.get(this)
                 .to({anchorX:0.5, anchorY:0.5,rotation: 180 }, 100)
                 .to({pathFactor: 1 ,scaleX:0.5,scaleY:0.5}, 200000/this.speed)                
                 .call(onComplete6, this);
            }            
            var onComplete6: Function = function() { //左下到右上
                this.path = [-200,800,150,150,1000,-50];
                 egret.Tween.get(this)
                 .to({anchorX:0.5, anchorY:0.5,rotation: 297 }, 100)
                 .to({pathFactor: 1 ,scaleX:0.5,scaleY:0.5}, 200000/this.speed)                
                 .call(onComplete7, this);
            }
            var onComplete7: Function = function() {//右上到左下
                 this.path = [600,-200,50,50,-200,800];
                 egret.Tween.get(this)
                 .to({anchorX:0.5, anchorY:0.5,rotation: 125}, 100)
                 .to({pathFactor: 1 ,scaleX:0.5,scaleY:0.5}, 200000/this.speed)                
                 .call(onComplete0, this);
            }
           
           

         


                var rnd =Maths.RndNum(7)
                  
                    switch (rnd) {   
                        case 0:
                            egret.Tween.get(this).to({ scaleX: 0.5, scaleY: 0.5 }, 10).call(onComplete0, this);
                            break;
                        case 1:
                            egret.Tween.get(this).to({scaleX:0.5,scaleY:0.5}, 10).call(onComplete1, this);
                            break; 
                        case 2:
                            egret.Tween.get(this).to({scaleX:0.5,scaleY:0.5}, 10).call(onComplete2, this); 
                            break;
                        case 3:
                            egret.Tween.get(this).to({scaleX:0.5,scaleY:0.5}, 10).call(onComplete3, this); 
                            break;

                        case 4:
                            egret.Tween.get(this).to({scaleX:0.5,scaleY:0.5}, 10).call(onComplete4, this); 
                            break;
                        case 5:
                            egret.Tween.get(this).to({scaleX:0.5,scaleY:0.5}, 10).call(onComplete5, this); 
                            break;

                        case 6:
                            egret.Tween.get(this).to({scaleX:0.5,scaleY:0.5}, 10).call(onComplete6, this); 
                            break;
                        case 7:
                            egret.Tween.get(this).to({scaleX:0.5,scaleY:0.5}, 10).call(onComplete7, this); 
                            break;

                    }
        }  





        public fly(x1,y1,x2,y2,x3,y3,period,scale:number): void {    
             var onComplete1: Function = function() {
                 this.path = [x1,y1,x2,y2,x3,y3];
                 egret.Tween.get(this)  
                 .to({alpha:1},100).wait(period)                       
                 .to({flyFactor: 1,scaleX:scale,scaleY:scale }, period) 
                 .to({alpha:0},100)  
            }
            egret.Tween.get(this)
            .to({alpha:0},100)              
            .to({ scaleX: scale, scaleY: scale }, 10)
            .call(onComplete1, this);         
        }   


        public roaming(scale:number=1):void{
            var onComplete1: Function = function() {
                var x1 = 0;
                var y1 = 0;
                var x2 = 0;
                var y2 = 0;
                var x3 = 0;
                var y3 = 0;
                if (this.justBorn){
                     x1 = Maths.RndNum(800);
                     y1 = Maths.RndNum(480);
                     x3 = Maths.RndNum(800);
                     y3 = Maths.RndNum(480);
                     x2 = (x1 + x3) / 2;
                     y2 = (y1 + y3) / 2;
                   
                    this.justBorn = false;
                   //this.x1 = x3;
                    //this.y1 = y3;
                }else {

                    x1 = this.x;
                     y1 = this.y;
                    x3 = Maths.RndNum(800);
                     y3 = Maths.RndNum(480);
                     x2 = (x1 + x3) / 2;
                     y2 = (y1 + y3) / 2;
                                     

                }
                var angle = this.getAngle(x1, y1, x3, y3) +this.getZoneOffset(x1, y1, x3, y3);
                console.log(angle)
                console.log(this.getZoneOffset(x1, y1, x3, y3))
                console.log(x1, y1) 
                console.log(x3, y3) 
                this.path = [x1,y1,x2,y2,x3,y3];
                egret.Tween.get(this)
                .to({ anchorX:0, anchorY:0,rotation: angle-90 }, 1000).wait(1000)
                .to({flyFactor: 1 ,scaleX:0.5,scaleY:0.5}, 200000/this.speed)         
                //.call(this.fly(x1,y1,x2,y2,x3,y3,10000,scale))
                .wait(1000)
                .call(onComplete1, this)


     
            }

            egret.Tween.get(this)
            .to({alpha:1},100)              
            .to({ scaleX: scale, scaleY: scale }, 10)
            .call(onComplete1, this);           
        }

  
    }
}