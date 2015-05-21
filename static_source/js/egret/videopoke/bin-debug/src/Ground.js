var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Ground = (function (_super) {
    __extends(Ground, _super);
    function Ground(stageW, stageH) {
        _super.call(this);
        this.imgs = RES.getRes("asserts");
        this.w = 0;
        this.h = 0;
        this.spr = new egret.Sprite();
        this.stopBtn = new egret.Bitmap();
        this.stopOffBtn = new egret.Bitmap();
        this.scoreDescTF = new egret.TextField();
        this.scoreTF = new egret.TextField();
        this.tipsTF = new egret.TextField();
        this.testBtn1 = new egret.Bitmap();
        this.testBtn2 = new egret.Bitmap();
        this.endBtn1 = new egret.Bitmap();
        this.endBtn2 = new egret.Bitmap();
        this.levelArr1 = [
            [["w", 1, 4], ["z", 1, 2], ["w", 4, 2], ["w", 2, 3], ["w", 2, 1], ["w", 4, 0]],
            [["z", 2, 1], ["z", 3, 0], ["w", 2, 0], ["w", 1, 0], ["z", 2, 1], ["w", 4, 0]],
            [["z", 3, 1], ["z", 2, 0], ["w", 2, 0], ["w", 2, 0], ["z", 2, 1], ["w", 2, 0]],
            [["w", 1, 3], ["z", 1, 2], ["w", 4, 1], ["w", 2, 0], ["z", 2, 1], ["w", 4, 0]],
            [["w", 1, 0], ["z", 1, 0], ["z", 4, 1], ["w", 2, 0], ["z", 2, 1], ["w", 4, 0]],
            [["w", 1, 0], ["z", 1, 0], ["z", 4, 1], ["w", 2, 4], ["w", 2, 2], ["w", 4, 0]],
            [["w", 1, 0], ["z", 1, 0], ["z", 4, 1], ["z", 2, 1], ["w", 2, 2], ["w", 4, 0]]
        ];
        this.gridArr = [];
        this.num = 0;
        this.isRetry = true;
        this.timeNum = 0;
        this.isPlay = false;
        this.w = stageW;
        this.h = stageH;
        this.createView();
    }
    Ground.prototype.createView = function () {
        // this.removeChildren();
        //绘制一个透明度为1的绿色矩形，宽高为100*80
        this.spr.graphics.beginFill(0x000000, 0);
        this.spr.graphics.drawRect(0, 0, this.w, this.h);
        this.spr.graphics.endFill();
        this.spr.width = this.w;
        this.spr.height = this.h;
        this.addChild(this.spr);

        // this.spr.visible = false;
        this.testBtn1.texture = this.imgs.getTexture("testBtn1");
        this.addChild(this.testBtn1);
        this.testBtn1.x = 168;
        this.testBtn1.y = -51;

        // this.testBtn1.visible = false;
        this.testBtn2.texture = this.imgs.getTexture("testBtn2");
        this.addChild(this.testBtn2);
        this.testBtn2.x = 267;
        this.testBtn2.y = -51;

        // this.testBtn2.visible = false;
        this.endBtn1.texture = this.imgs.getTexture("bottom1");
        this.addChild(this.endBtn1);
        this.endBtn1.x = 150 + 17;
        this.endBtn1.y = 385 + 67;

        // this.endBtn1.visible = false;
        this.endBtn2.texture = this.imgs.getTexture("bottom2");
        this.addChild(this.endBtn2);
        this.endBtn2.x = 225 + 42;
        this.endBtn2.y = 385 + 67;

        for (var i = 1; i <= 6; i++) {
            if (this.gridArr[i - 1] == null) {
                this.gridArr[i - 1] = [];
            }
            for (var j = 1; j <= 6; j++) {
                var grid = new Grid(this.levelArr1[i - 1][j - 1][0], this.levelArr1[i - 1][j - 1][1]);
                this.addChild(grid);
                if (j > 3) {
                    grid.x = 75 * (j - 1) + 22;
                } else {
                    grid.x = 75 * (j - 1) - 3;
                }
                grid.y = 75 * (i - 1);
                grid.addEventListener("step", this.onStep, this);
                this.gridArr[i - 1][j - 1] = grid;
            }
        }

        // this.gridCon = new GridCon(this.w,this.h);
        // this.gridCon.initData();
        // this.addChild(this.gridCon);
        // this.gridCon.x = this.w/2 - this.gridCon.width/2;
        // this.gridCon.y = this.gridCon.getHeight();
        this.tipsTF.size = 40;

        // this.scoreTF.width = 400;
        this.tipsTF.textColor = 0xff0000;
        this.tipsTF.x = this.w / 2;
        this.tipsTF.y = -110;
        this.tipsTF.text = "用时：";

        // this.tipsTF.strokeColor = 0x000000;
        // this.tipsTF.stroke  = 1;
        // this.tipsTF.bold = true;
        this.tipsTF.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(this.tipsTF);

        this.scoreTF.size = 40;

        // this.scoreTF.width = 400;
        this.scoreTF.textColor = 0xff0000;
        this.scoreTF.x = this.w / 2 + 100;
        this.scoreTF.y = -110;
        this.scoreTF.text = "0'00''";
        this.scoreTF.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(this.scoreTF);
        // this.gridCon.addEventListener("nextGrid" , this.onStarGame ,this);
        // this.gridCon.addEventListener("wrong" , this.onWrongNotice ,this);
        // this.gridCon.addEventListener("resumNotice" , this.onResumNotice ,this);
        // this.gridCon.addEventListener("resumNotice" , this.onResumNotice ,this);
        // this.gridCon.addEventListener("resumNotice" , this.onResumNotice ,this);
    };

    Ground.prototype.onStep = function () {
        this.num = this.num + 1;

        // this.scoreTF.text = this.num + "步";
        if (this.chargeFuc()) {
            this.onWrongNotice();
        }
    };
    Ground.prototype.chargeFuc = function () {
        var tempNum = 0;

        var bool = true;
        for (var i = 1; i <= 6; i++) {
            for (var j = 1; j <= 6; j++) {
                if (this.levelArr1[i - 1][j - 1][2] == 0) {
                    console.log("continue---i:" + i + "--j" + j);
                    continue;
                }
                console.log("NOcontinue---i:" + i + "--j" + j);
                var grid = new Grid(this.levelArr1[i - 1][j - 1][0], this.levelArr1[i - 1][j - 1][1]);
                if (!this.tempFuc(i, j)) {
                    bool = false;
                    console.log("Break---i:" + i + "--j" + j);
                    break;
                }
                console.log("i:" + i + "--j" + j);
            }
            if (!bool) {
                break;
            }
        }

        return bool;
    };
    Ground.prototype.tempFuc = function (i, j) {
        var bool = false;
        var grid = this.gridArr[i - 1][j - 1];
        if (grid.typeStr == "w") {
            if (("w" == this.levelArr1[i - 1][j - 1][0]) && (grid.num == this.levelArr1[i - 1][j - 1][2])) {
                bool = true;
            }
        } else {
            if ("z" == this.levelArr1[i - 1][j - 1][0]) {
                if ((this.levelArr1[i - 1][j - 1][2] == 1) || (this.levelArr1[i - 1][j - 1][2] == 3)) {
                    if ((grid.num == 1) || (grid.num == 3)) {
                        bool = true;
                    }
                } else {
                    if ((grid.num == 2) || (grid.num == 4)) {
                        bool = true;
                    }
                }
            }
        }
        return bool;
    };

    //点击事件
    Ground.prototype.onStarGame = function () {
        this.playTimer();
        egret.Tween.get(this.gridCon).to({ y: this.gridCon.y + 200 }, 100);
    };
    Ground.prototype.onWrongNotice = function () {
        // this.stopTimer();
        this.dispatchEvent(new egret.Event("wrong"));
    };

    Ground.prototype.onRetry = function () {
        this.timeNum = 0;
        this.num = 0;
        this.scoreTF.text = "0'00''";

        // this.gridCon.y = this.gridCon.getHeight();
        // this.gridCon.initData();
        this.isRetry = true;
        for (var i = 1; i <= 7; i++) {
            for (var j = 1; j <= 6; j++) {
                var grid = this.gridArr[i - 1][j - 1];
                grid.typeStr = this.levelArr1[i - 1][j - 1][0];
                grid.num = this.levelArr1[i - 1][j - 1][1];
                grid.setNum(grid.num);
            }
        }
        this.playTimer();
    };

    Ground.prototype.playTimer = function () {
        if (this.isPlay || (!this.isRetry)) {
            return;
        }
        this.isPlay = true;
        this.timeNum = 0;
        this.scoreTF.text = "00'00''";

        // this.scoreTF.text = "0";
        // this.timeTF.text = "0秒";
        //创建一个计时器对象
        this.timer = new egret.Timer(20, 0);

        //注册事件侦听器
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);

        //开始计时
        this.timer.start();
    };
    Ground.prototype.timerFunc = function () {
        this.timeNum++;

        // this.scoreTF.text = this.timeNum+"秒";
        var sec = Math.ceil((this.timeNum * 20) / 1000);
        var mSec = 100 - (sec * 1000 - this.timeNum * 20) / 10;

        // console.log("------"+this.timeNum*50);
        this.scoreTF.text = sec + "'" + mSec + "''";
        if ((sec >= 20) && (mSec <= 0)) {
            this.scoreTF.text = "0'00'";
            this.stopTimer();
            this.dispatchEvent(new egret.Event("wrong"));
        }
    };
    Ground.prototype.stopTimer = function () {
        this.timer.stop();
        this.isPlay = false;
        this.isRetry = false;
    };

    Ground.prototype.getScore = function () {
        return Math.ceil(this.timeNum * 20 / 1000);
    };
    return Ground;
})(egret.Sprite);
Ground.prototype.__class__ = "Ground";
