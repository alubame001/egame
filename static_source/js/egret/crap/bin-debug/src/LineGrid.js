var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var LineGrid = (function (_super) {
    __extends(LineGrid, _super);
    function LineGrid(stageW, stageH) {
        _super.call(this);
        this.imgs = RES.getRes("asserts");
        this.w = 0;
        this.h = 0;
        this.spr = new egret.Sprite();
        this.curNum = 1;
        this.gridArr = [];
        //点击事件
        this.isPlay = false;
        this.w = stageW;
        this.h = stageH;
        // this.createView();
    }
    LineGrid.prototype.initData = function (curNum) {
        // this.removeChildren();
        //绘制一个透明度为1的绿色矩形，宽高为100*80
        // this.spr.graphics.beginFill(0xffffff, 0);
        // this.spr.graphics.drawRect(0, 0, this.w, this.h);
        // this.spr.graphics.endFill();
        // this.spr.width = this.w;
        // this.spr.height = this.h;
        // this.addChild( this.spr );
        // this.spr.visible = false;
        var num = Math.ceil(Math.random() * 4);
        for (var j = 1; j <= 4; j++) {
            var grid;
            if (j == num) {
                grid = new Grid(1);
            } else {
                grid = new Grid(4);
            }
            this.addChild(grid);
            grid.x = grid.width * (j - 1);

            // grid.y = -grid.height*i;
            grid.touchEnabled = true;
            grid.setCurNum(curNum);
            grid.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGridTouchTap, this);
            this.gridArr.push(grid);
        }
        // this.curNum = curNum;
        // console.log("curNumInit"+curNum);
    };

    // private tempArr:Array<any> = [];
    LineGrid.prototype.onGridTouchTap = function (e) {
        var grid = e.currentTarget;
        console.log("curNum" + grid.getCurNum() + "--" + this.curNum);
        if (grid.getCurNum() != this.curNum) {
            return;
        }

        if ((this.curNum == 1) && (grid.getNum() == 1)) {
            this.dispatchEvent(new egret.Event("nextGrid"));
            // this.curNum ++;
        } else if (this.curNum != 1) {
            if (grid.getNum() == 4) {
                this.dispatchEvent(new egret.Event("wrong"));
                grid.warning();
            } else {
                this.dispatchEvent(new egret.Event("nextGrid"));
                // this.curNum ++;
            }
        }
    };

    LineGrid.prototype.updateGrid = function (maxNum) {
        var num = Math.ceil(Math.random() * 4);
        for (var i = 1; i <= 4; i++) {
            var grid = this.gridArr[i - 1];
            if (i == num) {
                grid.updateDateNum(1);
            } else {
                grid.updateDateNum(4);
            }
            grid.reset();
            grid.setCurNum(maxNum);
        }
    };

    LineGrid.prototype.updateCurNum = function (curNum) {
        this.curNum = curNum;
    };

    LineGrid.prototype.getWidth = function () {
        return this.spr.width;
    };

    LineGrid.prototype.getHeight = function () {
        return this.spr.height;
    };
    return LineGrid;
})(egret.Sprite);
