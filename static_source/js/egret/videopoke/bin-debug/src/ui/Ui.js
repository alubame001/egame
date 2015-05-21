var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by shaorui on 14-6-7.
 */
var ui;
(function (ui) {
    var Bet = (function (_super) {
        __extends(Bet, _super);
        function Bet(texture, fireDelay) {
            _super.call(this);
            // private static cacheDict: Object = {};
            this.speed = 1;
            this.pic = 1;
            this.p = -1;
            this.path = [-100, -100, 0, 0, 1000, 700];
            this.skinIndex = 1;
            this.picIndex = 1;
            this.assetName = "fish";
            this.justBorn = true;
            this.skinMaxNumber = 3;
            this.bmpOffset = -90;
            /**生命值*/
            this.blood = 10;
            this.isPlayCartoon = false;
            this.cartoonType = 5;
            this.param = { context: null, data: null }; //回调参数
            this.scaleXSize = 1;
            this.scaleYSize = 1;
            this.isRunning = false;
            this.seed = 0;
            this.maxSeed = 9; // range from 0 to 4
            this.fireDelay = fireDelay;
            this.bmp = new egret.Bitmap(texture);
            this.bmp.anchorX = 0;
            this.bmp.anchorY = 0;
            //this.bmp.texture = texture;
            this.addChild(this.bmp);
            this.fireTimer = new egret.Timer(fireDelay);
            this.fireTimer.addEventListener(egret.TimerEvent.TIMER, this.createBullet, this);
            this.touchEnabled = true;
            this.sound = RES.getRes("click");
            if (this.touchEnabled) {
                this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onbuttonTouchTap, this);
            }
        }
        /**生产*/
        Bet.produce = function (textureName, fireDelay) {
            var theui;
            var assets = RES.getRes(textureName);
            theui = new ui.Bet(assets.getTexture(textureName), fireDelay);
            return theui;
        };
        Bet.prototype.onbuttonTouchTap = function (e) {
            this.touchEnabled = false;
            this.sound.play();
            if (this.isPlayCartoon) {
                return;
            }
            this.isPlayCartoon = true;
            var onComplete2 = function () {
                this.isPlayCartoon = false;
            };
            var onComplete1 = function () {
                /*
                if (this.cartoonType == 1) {
                    egret.Tween.get(this).to({ scaleX: 1, scaleY: 1, x: this.x - this.btnImg.width / 4, y: this.y - this.btnImg.height / 4 }, 500, egret.Ease.elasticOut).call(onComplete2, this);
                } else if (this.cartoonType == 2) {
                    egret.Tween.get(this).to({ scaleX: 1, scaleY: 1, x: this.x - this.btnImg.width / 4, y: this.y - this.btnImg.height / 4 }, 500, egret.Ease.backOut).call(onComplete2, this);
                } else if (this.cartoonType == 3) {
                    egret.Tween.get(this).to({ scaleX: 1, scaleY: 1, x: this.x - this.btnImg.width / 4, y: this.y - this.btnImg.height / 4 }, 100).call(onComplete2, this);
                }else if (this.cartoonType == 4) {
                    egret.Tween.get(this).to({ scaleX: this.scaleXSize, scaleY: this.scaleYSize, x: this.x - this.btnImg.width /20, y: this.y - this.btnImg.height / 20 }, 100, egret.Ease.elasticOut).call(onComplete2, this);
                }else if (this.cartoonType == 5) {
                    egret.Tween.get(this).to({ scaleX: this.scaleXSize, scaleY: this.scaleYSize, x: this.x -1, y: this.y - 1 }, 100, egret.Ease.elasticOut).call(onComplete2, this);
                }
                */
            };
            /*
        if (this.cartoonType == 4) {
              egret.Tween.get(this).to({ scaleX: this.scaleXSize, scaleY: this.scaleYSize, x: this.x + this.btnImg.width / 20, y: this.y + this.btnImg.height / 20 }, 100, egret.Ease.sineIn).call(onComplete1, this);
        } else if (this.cartoonType == 5) {
            egret.Tween.get(this).to({ scaleX: this.scaleXSize, scaleY: this.scaleYSize, x: this.x + 1, y: this.y+1  }, 100, egret.Ease.elasticOut).call(onComplete2, this);
        }   else{
           egret.Tween.get(this).to({ scaleX: this.scaleXSize, scaleY: this.scaleYSize, x: this.x + this.btnImg.width / 4, y: this.y + this.btnImg.height / 10 }, 100, egret.Ease.sineIn).call(onComplete1, this);
        }
        */
            egret.setTimeout(function () {
                if (this.backFun != null) {
                    this.backFun.apply(this.param.context, [this.param.data]);
                    this.touchEnabled = true;
                }
            }, this, 100);
        };
        /**开火*/
        Bet.prototype.fire = function () {
            this.fireTimer.start();
        };
        /**停火*/
        Bet.prototype.stopFire = function () {
            this.fireTimer.stop();
        };
        /**创建子弹*/
        Bet.prototype.createBullet = function (evt) {
            this.changeSkin(100 / this.speed);
            this.dispatchEventWith("createBullet");
        };
        /*
        
                public getPosition(x1, y1, x2, y2,angle: number):number {
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
        
        
                    angle = 180/(Math.Pi/radina)
        
                    angle *(Math.Pi/radina) = 180
        
        
                    var radina = (180/angle)/Math.Pi
                    //var z =
        
        
        
                }
        */
        Bet.prototype.getAngle = function (x1, y1, x2, y2) {
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
            var angle = 180 / (Math.PI / radina);
            return angle;
        };
        Bet.prototype.getZoneOffset = function (x1, y1, x2, y2) {
            var angle = 90;
            if (x1 < x2 && y1 < y2) {
                return angle * 1;
            }
            if (x1 < x2 && y1 > y2) {
                return angle * 0;
            }
            if (x1 > x2 && y1 > y2) {
                return angle * 3;
            }
            if (x1 > x2 && y1 < y2) {
                return angle * 2;
            }
        };
        Bet.prototype.changeSkin = function (chance) {
            if (chance == 0 || Maths.RndNum(chance) < 1) {
                var result = this.assetName + this.picIndex + "-" + this.skinIndex;
                //console.log(result)
                var assets = RES.getRes(this.assetName);
                this.bmp.texture = assets.getTexture(result);
                this.skinIndex += 1;
                if (this.skinIndex > this.skinMaxNumber) {
                    this.skinIndex = 1;
                }
            }
        };
        Object.defineProperty(Bet.prototype, "pathFactor", {
            get: function () {
                return 0;
            },
            set: function (value) {
                this.x = (1 - value) * (1 - value) * (this.path[0] + this.x) + 2 * value * (1 - value) * this.path[2] * (this.p) + value * value * (this.path[4]);
                this.y = (1 - value) * (1 - value) * (this.path[1] + this.y) + 2 * value * (1 - value) * this.path[3] * (this.p) + value * value * (this.path[5]);
                this.changeSkin(10000 / this.speed);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Bet.prototype, "flyFactor", {
            get: function () {
                return 0;
            },
            set: function (value) {
                this.x = (1 - value) * (1 - value) * (this.path[0]) + 2 * value * (1 - value) * this.path[2] + value * value * (this.path[4]);
                this.y = (1 - value) * (1 - value) * (this.path[1]) + 2 * value * (1 - value) * this.path[3] + value * value * (this.path[5]);
                this.changeSkin(1000 / this.speed);
            },
            enumerable: true,
            configurable: true
        });
        Bet.prototype.justSwim = function () {
            var onComplete0 = function () {
                this.path = [-200, -200, 100, 400, 1000, 600];
                egret.Tween.get(this).to({ anchorX: 0.5, anchorY: 0.5, rotation: 62 }, 100).to({ pathFactor: 1, scaleX: 0.5, scaleY: 0.5 }, 200000 / this.speed).call(onComplete1, this);
            };
            var onComplete1 = function () {
                this.path = [1000, 600, 400, 100, -200, -200];
                egret.Tween.get(this).to({ anchorX: 0.5, anchorY: 0.5, rotation: 225 }, 100).to({ pathFactor: 1, scaleX: 0.5, scaleY: 0.5 }, 200000 / this.speed).call(onComplete2, this);
            };
            var onComplete2 = function () {
                this.path = [400, -200, 200, 240, 400, 700];
                egret.Tween.get(this).to({ anchorX: 0.5, anchorY: 0.5, rotation: 90 }, 100).to({ pathFactor: 1, scaleX: 0.5, scaleY: 0.5 }, 200000 / this.speed).call(onComplete3, this);
            };
            var onComplete3 = function () {
                this.path = [400, 900, 200, 240, 400, -200];
                egret.Tween.get(this).to({ anchorX: 0.5, anchorY: 0.5, rotation: 270 }, 100).to({ pathFactor: 1, scaleX: 0.5, scaleY: 0.5 }, 200000 / this.speed).call(onComplete4, this);
            };
            var onComplete4 = function () {
                this.path = [-200, 300, 200, 50, 1000, 300];
                egret.Tween.get(this).to({ anchorX: 0.5, anchorY: 0.5, rotation: 0 }, 100).to({ pathFactor: 1, scaleX: 0.5, scaleY: 0.5 }, 200000 / this.speed).call(onComplete5, this);
            };
            var onComplete5 = function () {
                this.path = [1000, 100, 50, 240, -200, 100];
                egret.Tween.get(this).to({ anchorX: 0.5, anchorY: 0.5, rotation: 180 }, 100).to({ pathFactor: 1, scaleX: 0.5, scaleY: 0.5 }, 200000 / this.speed).call(onComplete6, this);
            };
            var onComplete6 = function () {
                this.path = [-200, 800, 150, 150, 1000, -50];
                egret.Tween.get(this).to({ anchorX: 0.5, anchorY: 0.5, rotation: 297 }, 100).to({ pathFactor: 1, scaleX: 0.5, scaleY: 0.5 }, 200000 / this.speed).call(onComplete7, this);
            };
            var onComplete7 = function () {
                this.path = [600, -200, 50, 50, -200, 800];
                egret.Tween.get(this).to({ anchorX: 0.5, anchorY: 0.5, rotation: 125 }, 100).to({ pathFactor: 1, scaleX: 0.5, scaleY: 0.5 }, 200000 / this.speed).call(onComplete0, this);
            };
            var rnd = Maths.RndNum(7);
            switch (rnd) {
                case 0:
                    egret.Tween.get(this).to({ scaleX: 0.5, scaleY: 0.5 }, 10).call(onComplete0, this);
                    break;
                case 1:
                    egret.Tween.get(this).to({ scaleX: 0.5, scaleY: 0.5 }, 10).call(onComplete1, this);
                    break;
                case 2:
                    egret.Tween.get(this).to({ scaleX: 0.5, scaleY: 0.5 }, 10).call(onComplete2, this);
                    break;
                case 3:
                    egret.Tween.get(this).to({ scaleX: 0.5, scaleY: 0.5 }, 10).call(onComplete3, this);
                    break;
                case 4:
                    egret.Tween.get(this).to({ scaleX: 0.5, scaleY: 0.5 }, 10).call(onComplete4, this);
                    break;
                case 5:
                    egret.Tween.get(this).to({ scaleX: 0.5, scaleY: 0.5 }, 10).call(onComplete5, this);
                    break;
                case 6:
                    egret.Tween.get(this).to({ scaleX: 0.5, scaleY: 0.5 }, 10).call(onComplete6, this);
                    break;
                case 7:
                    egret.Tween.get(this).to({ scaleX: 0.5, scaleY: 0.5 }, 10).call(onComplete7, this);
                    break;
            }
        };
        Bet.prototype.fly = function (x1, y1, x2, y2, x3, y3, period, scale) {
            var onComplete1 = function () {
                this.path = [x1, y1, x2, y2, x3, y3];
                egret.Tween.get(this).to({ alpha: 1 }, 100).wait(period).to({ flyFactor: 1, scaleX: scale, scaleY: scale }, period).to({ alpha: 0 }, 100);
            };
            egret.Tween.get(this).to({ alpha: 0 }, 100).to({ scaleX: scale, scaleY: scale }, 10).call(onComplete1, this);
        };
        Bet.prototype.roaming = function (scale) {
            if (scale === void 0) { scale = 1; }
            var onComplete1 = function () {
                var x1 = 0;
                var y1 = 0;
                var x2 = 0;
                var y2 = 0;
                var x3 = 0;
                var y3 = 0;
                if (this.justBorn) {
                    x1 = Maths.RndNum(800);
                    y1 = Maths.RndNum(480);
                    x3 = Maths.RndNum(800);
                    y3 = Maths.RndNum(480);
                    x2 = (x1 + x3) / 2;
                    y2 = (y1 + y3) / 2;
                    this.justBorn = false;
                }
                else {
                    x1 = this.x;
                    y1 = this.y;
                    x3 = Maths.RndNum(800);
                    y3 = Maths.RndNum(480);
                    x2 = (x1 + x3) / 2;
                    y2 = (y1 + y3) / 2;
                }
                var angle = this.getAngle(x1, y1, x3, y3) + this.getZoneOffset(x1, y1, x3, y3);
                console.log(angle);
                console.log(this.getZoneOffset(x1, y1, x3, y3));
                console.log(x1, y1);
                console.log(x3, y3);
                this.path = [x1, y1, x2, y2, x3, y3];
                egret.Tween.get(this).to({ anchorX: 0, anchorY: 0, rotation: angle + this.bmpOffset }, 1000).wait(1000).to({ flyFactor: 1, scaleX: scale, scaleY: scale }, 200000 / this.speed).wait(1000).call(onComplete1, this);
            };
            egret.Tween.get(this).to({ alpha: 1 }, 100).to({ scaleX: scale, scaleY: scale }, 10).call(onComplete1, this);
        };
        return Bet;
    })(egret.DisplayObjectContainer);
    ui.Bet = Bet;
    Bet.prototype.__class__ = "ui.Bet";
})(ui || (ui = {}));
