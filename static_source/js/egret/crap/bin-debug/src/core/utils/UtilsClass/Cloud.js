var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by shaorui on 14-9-3.
 */
var Cloud = (function (_super) {
    __extends(Cloud, _super);
    function Cloud() {
        _super.call(this);
        this.imgCount = 300;
        this.screenWidth = 480;
        this.screenHeight = 800;
        this.focal = 400;
        this.touchX = 240;
        this.touchY = 540;
        this.touchEnabled = true;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    Cloud.prototype.onAddToStage = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.initGame();
    };
    Cloud.prototype.initGame = function () {
        this.vpX = this.stage.stageWidth / 2;
        this.vpY = this.stage.stageHeight / 2;
        this.stageRect = new egret.Rectangle(-480, 0, this.stage.stageWidth * 3, this.stage.stageHeight);
        this.imgArr = [];
        for (var i = 0; i < this.imgCount; i++) {
            var item = new CloudImage(RES.getRes("cloud10"));
            item.anchorX = 0.5;
            item.anchorY = 0.5;
            //item.x = Math.random()*2000;
            //item.y = this.screenHeight-200+Math.random()*200;
            this.setAShape(item);
            this.imgArr.push(item);
            this.addChild(item);
        }
        this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMoveHandler, this);
    };
    Cloud.prototype.touchMoveHandler = function (evt) {
        this.touchX = evt.stageX;
        //this.touchY = evt.stageY;
    };
    /**重置位置*/
    Cloud.prototype.setAShape = function (shape) {
        shape.scale = 0.001;
        shape.scaleX = shape.scale;
        shape.scaleY = shape.scale;
        shape.startX = this.screenWidth * Math.random();
        shape.startY = this.screenHeight / 2 + this.screenHeight / 2 * Math.random() - 100;
        shape.x = shape.startX;
        shape.y = shape.startY;
        shape.zpos = Math.random() * 800 + 400;
        shape.rotation = Math.random() * Math.PI;
    };
    /**Z排序*/
    Cloud.prototype.sortArray = function () {
        this.imgArr.sort(this.zSortFunction);
    };
    /**排序方法*/
    Cloud.prototype.zSortFunction = function (a, b) {
        if (a.zpos > b.zpos)
            return -1;
        else if (a.zpos < b.zpos)
            return 1;
        else
            return 0;
    };
    /**判断一个对象是否已经不在屏幕区域*/
    Cloud.prototype.shapeAvisible = function (shape) {
        var shapeRect = shape.getBounds();
        return this.stageRect.intersects(shapeRect);
    };
    /**每帧调用*/
    Cloud.prototype.enterFrameHandler = function (event) {
        if (event === void 0) { event = null; }
        var centerPoint = new egret.Point(this.touchX, this.touchY);
        var xpos;
        var ypos;
        var item;
        for (var i = 0; i < this.imgCount; i++) {
            item = this.imgArr[i];
            //reset properties
            item.zpos -= 4;
            var x1 = this.screenWidth / 2 - item.startX;
            var y1 = this.screenHeight / 2 - item.startY;
            if (item.zpos > -this.focal && this.shapeAvisible(item)) {
                xpos = centerPoint.x - this.vpX - x1; //x维度
                xpos *= 2;
                ypos = centerPoint.y - this.vpY - y1; //y维度
                item.scale = this.focal / (this.focal + item.zpos); //缩放产生近大远小，取值在0-1之间；
                item.scaleX = item.scale;
                item.scaleY = item.scale;
                item.x = this.vpX + xpos * item.scale;
                item.y = this.vpY + ypos * item.scale;
            }
            else {
                this.setAShape(item);
            }
        }
        this.sortArray();
        for (i = 0; i < this.imgCount; i++) {
            item = this.imgArr[i];
            this.addChild(item);
        }
    };
    return Cloud;
})(egret.DisplayObjectContainer);
var CloudImage = (function (_super) {
    __extends(CloudImage, _super);
    function CloudImage() {
        _super.apply(this, arguments);
        this.itemWidth = 256;
        this.itemHeight = 256;
        this.zpos = 0;
        this.scale = 1;
    }
    CloudImage.prototype.getBounds = function () {
        var w = this.itemWidth * this.scale;
        var h = this.itemHeight * this.scale;
        var rect = new egret.Rectangle(this.x - w / 2, this.y - h / 2, w / 2, h / 2);
        rect.width = Math.max(1, rect.width);
        rect.height = Math.max(1, rect.height);
        return rect;
    };
    return CloudImage;
})(egret.Bitmap);
