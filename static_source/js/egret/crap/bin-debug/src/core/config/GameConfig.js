/**
  * 游戏配置文件
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved.
  * 存放游戏的配置数据
  * 比如：游戏界面尺寸、分享随机百分比、获取系统数据
  */
var GameConfig;
(function (GameConfig) {
    //是否调试显示帧频
    // 以下语句写在游戏初始化方法里
    if (GameConfig.isDebug) {
        egret.Profiler.getInstance().run();
    }
    GameConfig.isDebug = true;
    //是否在线
    GameConfig.isOnLine = navigator.onLine;
    //全局字体颜色表--可以扩展
    GameConfig.TextColors = {
        white: 0xFFFFFF,
        milkWhite: 0xfbf1af,
        grayWhite: 0xceb6a2,
        yellow: 0xffff00,
        lightYellow: 0xffd375,
        orangeYellow: 0xff9900,
        red: 0xf11300,
        green: 0x00e500,
        blue: 0x1a94d7,
        grayBlue: 0x2f5177,
        purple: 0xe938f2,
        pink: 0xFF3030,
        black: 0x2e2d2d,
        golden: 0xFFD700 //金色
    };
    //全局字体大小表--可以扩展
    GameConfig.LabelFontSize = {
        littleSize: 12,
        middleSize: 18,
        normalSize: 24,
        bigSize: 36 //大型字体大小
    };
    //是不是微信浏览
    function isWeiXin() {
        var ua = window.navigator.userAgent.toLowerCase();
        var microStr = "" + ua.match(/MicroMessenger/i);
        if (microStr == "null") {
            return false;
        }
        else if (microStr == "micromessenger") {
            return true;
        }
    }
    GameConfig.isWeiXin = isWeiXin;
    //获得浏览器类型 pc android ios -- 可扩展为其他 如 微信、qqzone、qq、微博、校内、facebook
    function systemType() {
        var ua = window.navigator.userAgent.toLowerCase();
        var microStr = "" + ua.match(/MicroMessenger/i);
        if (("" + ua.match(/windows nt/i)) == "windows nt") {
            return "windows";
        }
        else if (("" + ua.match(/iphone/i)) == "iphone") {
            return "ios";
        }
        else if (("" + ua.match(/android/i)) == "android") {
            return "android";
        }
        else if (("" + ua.match(/ipad/i)) == "ipad") {
            return "ipad";
        }
        else if (("" + ua.match(/linux/i)) == "linux") {
            return "linux";
        }
        else if (("" + ua.match(/mac/i)) == "mac") {
            return "mac";
        }
        else if (("" + ua.match(/ucbrower/i)) == "ucbrower") {
            return "ucbrower";
        }
        else {
            console.log("未知系统类型");
        }
    }
    GameConfig.systemType = systemType;
    var curScene;
    //当前游戏场景类
    function gameScene() {
        if (this.curScene == null) {
            this.curScene = new GameScene();
        }
        return this.curScene;
    }
    GameConfig.gameScene = gameScene;
    //当前舞台
    function curStage() {
        return egret.MainContext.instance.stage;
    }
    GameConfig.curStage = curStage;
    //当前面板
    GameConfig.curPanel;
    //当前游戏宽度
    function curWidth() {
        return egret.MainContext.instance.stage.stageWidth;
    }
    GameConfig.curWidth = curWidth;
    //当前游戏宽度
    function curHeight() {
        //console.log("curHeight:",egret.MainContext.instance.stage.stageHeight)
        return egret.MainContext.instance.stage.stageHeight;
    }
    GameConfig.curHeight = curHeight;
    //当前游戏角度
    GameConfig.curAngle = window["orientation"];
    //获得手机是横屏还是竖屏
    //角度为0说明是竖屏，+-90是横屏
    function isVertical() {
        var angle = window["orientation"];
        console.log(angle);
        if (angle == 90) {
            return false;
        }
        else {
            return true;
        }
    }
    GameConfig.isVertical = isVertical;
    //手机旋转适配
    //注意：
    //在egret_loader.js中，rootContainer要放startGame在外定义
    //具体旋转数值自己修改
    //貌似不完善
    function rotationResize(isRotation) {
        if (isRotation === void 0) { isRotation = false; }
        console.log("rotationResize");
        if (isRotation) {
            egret.StageDelegate.getInstance().setDesignSize(800, 480);
            window["rootContainer"].rotation = 90;
            window["rootContainer"].x = egret.MainContext.instance.stage.stageWidth;
        }
        else {
            egret.StageDelegate.getInstance().setDesignSize(480, 800);
            window["rootContainer"].rotation = 0;
            window["rootContainer"].x = 0;
        }
    }
    GameConfig.rotationResize = rotationResize;
    //监听MainNotify.onOrientationChange事件可以获得屏幕竖屏横屏变化和角度
    // var orientationFun:Function = function(e){
    //     // document.title = "" + GameConfig.curAngle;
    //     document.title = "11--" + e.param;
    // };  
    // lcp.LListener.getInstance().addEventListener(MainNotify.onOrientationChange,orientationFun,this);
    window["onorientationchange"] = function () {
        lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(MainNotify.onOrientationChange, window["orientation"], false));
    };
})(GameConfig || (GameConfig = {}));
