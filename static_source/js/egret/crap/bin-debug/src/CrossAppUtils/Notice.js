var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Notice = (function (_super) {
    __extends(Notice, _super);
    function Notice() {
        _super.call(this);
        this.imgs = RES.getRes("tree");
        this.img = new egret.Bitmap();
        this.createView();
    }
    Notice.prototype.createView = function () {
        this.img.texture = this.imgs.getTexture("role11");
        this.addChild(this.img);
    };
    Notice.prototype.play = function () {
        this.img.texture = this.imgs.getTexture("role12");
        egret.setTimeout(function () {
            this.img.texture = this.imgs.getTexture("role11");
        }, this, 100);
    };
    Notice.prototype.dead = function () {
        egret.setTimeout(function () {
            this.img.texture = this.imgs.getTexture("loseImg");
        }, this, 110);
    };
    Notice.prototype.reborn = function () {
        this.img.texture = this.imgs.getTexture("role11");
    };
    return Notice;
})(egret.Sprite);
