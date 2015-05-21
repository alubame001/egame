var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by shaorui on 14-6-7.
 */
var fighter;
(function (fighter) {
    /**
     * 飞机，利用对象池
     */
    var Airplane = (function (_super) {
        __extends(Airplane, _super);
        function Airplane(texture, fireDelay) {
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
            /**飞机生命值*/
            this.blood = 10;
            this.fireDelay = fireDelay;
            this.bmp = new egret.Bitmap(texture);
            this.bmp.anchorX = 0.5;
            this.bmp.anchorY = 0.5;
            //this.bmp.texture = texture;
            this.addChild(this.bmp);
            this.fireTimer = new egret.Timer(fireDelay);
            this.fireTimer.addEventListener(egret.TimerEvent.TIMER, this.createBullet, this);
        }
        // public assets: egret.SpriteSheet = RES.getRes("fish");//名称不一样的话需要修改
        /**生产*/
        Airplane.produce = function (textureName, fireDelay) {
            var theFighter;
            var assets = RES.getRes(textureName);
            theFighter = new fighter.Airplane(assets.getTexture(textureName), fireDelay);
            return theFighter;
        };
        /**开火*/
        Airplane.prototype.fire = function () {
            this.fireTimer.start();
        };
        /**停火*/
        Airplane.prototype.stopFire = function () {
            this.fireTimer.stop();
        };
        /**创建子弹*/
        Airplane.prototype.createBullet = function (evt) {
            this.dispatchEventWith("createBullet");
        };
        Airplane.prototype.getAngle = function (x1, y1, x2, y2) {
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
        Airplane.prototype.getZoneOffset = function (x1, y1, x2, y2) {
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
        Airplane.prototype.changeSkin = function (chance) {
            if (chance == 0 || Maths.RndNum(chance) < 1) {
                var result = this.assetName + this.picIndex + "-" + this.skinIndex;
                //console.log(result)
                var assets = RES.getRes(this.assetName);
                this.bmp.texture = assets.getTexture(result);
                this.skinIndex += 1;
                if (this.skinIndex > 7) {
                    this.skinIndex = 1;
                }
            }
        };
        Object.defineProperty(Airplane.prototype, "pathFactor", {
            get: function () {
                return 0;
            },
            set: function (value) {
                this.x = (1 - value) * (1 - value) * (this.path[0] + this.x) + 2 * value * (1 - value) * this.path[2] * (this.p) + value * value * (this.path[4]);
                this.y = (1 - value) * (1 - value) * (this.path[1] + this.y) + 2 * value * (1 - value) * this.path[3] * (this.p) + value * value * (this.path[5]);
                this.changeSkin(100 / this.speed);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Airplane.prototype, "flyFactor", {
            get: function () {
                return 0;
            },
            set: function (value) {
                this.x = (1 - value) * (1 - value) * (this.path[0]) + 2 * value * (1 - value) * this.path[2] + value * value * (this.path[4]);
                this.y = (1 - value) * (1 - value) * (this.path[1]) + 2 * value * (1 - value) * this.path[3] + value * value * (this.path[5]);
                this.changeSkin(this.speed);
            },
            enumerable: true,
            configurable: true
        });
        Airplane.prototype.justSwim = function () {
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
        Airplane.prototype.fly = function (x1, y1, x2, y2, x3, y3, period, scale) {
            var onComplete1 = function () {
                this.path = [x1, y1, x2, y2, x3, y3];
                egret.Tween.get(this).to({ alpha: 1 }, 100).wait(period).to({ flyFactor: 1, scaleX: scale, scaleY: scale }, period).to({ alpha: 0 }, 100);
            };
            egret.Tween.get(this).to({ alpha: 0 }, 100).to({ scaleX: scale, scaleY: scale }, 10).call(onComplete1, this);
        };
        Airplane.prototype.roaming = function (scale) {
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
                egret.Tween.get(this).to({ anchorX: 0, anchorY: 0, rotation: angle - 90 }, 1000).wait(1000).to({ flyFactor: 1, scaleX: 0.5, scaleY: 0.5 }, 200000 / this.speed).wait(1000).call(onComplete1, this);
            };
            egret.Tween.get(this).to({ alpha: 1 }, 100).to({ scaleX: scale, scaleY: scale }, 10).call(onComplete1, this);
        };
        return Airplane;
    })(egret.DisplayObjectContainer);
    fighter.Airplane = Airplane;
    Airplane.prototype.__class__ = "fighter.Airplane";
})(fighter || (fighter = {}));
