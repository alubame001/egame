var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameApp = (function (_super) {
    __extends(GameApp, _super);
    function GameApp() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    GameApp.prototype.onAddToStage = function (event) {
        console.log("onAddToStage:");
        egret.Injector.mapClass(RES.AnalyzerBase, RES.PropertiesAnalyzer, RES.PropertiesAnalyzer.TYPE);
        this.stage.addChild(GameConfig.gameScene());
        //设置加载进度界面
        this.loadingView = new LoadingUI();
        PopUpManager.addPopUp(this.loadingView);
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
        RES.loadGroup("soundload");
        RES.loadGroup("clickload");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     */
    GameApp.prototype.onConfigComplete = function (event) {
        console.log("onConfigComplete:");
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("loading");
        RES.loadGroup("clickload");
    };
    /**
     * preload资源组加载完成
     */
    GameApp.prototype.onResourceLoadComplete = function (event) {
        console.log("onResourceLoadComplete:", event.groupName);
        if (event.groupName == "preload") {
            PopUpManager.removePopUp(this.loadingPanel);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createGameScene();
        }
        else if (event.groupName == "loading") {
            PopUpManager.removePopUp(this.loadingView);
            this.loadingPanel = new LoadingPanel();
            PopUpManager.addPopUp(this.loadingPanel);
            RES.loadGroup("preload");
        }
        else if (event.groupName == "soundload") {
            this.sound = RES.getRes("sound");
            this.sound.play(true);
        }
        else if (event.groupName == "lottery28load") {
            Global.dispatchEvent(MainNotify.openLottery28PanelNotify, null, false);
            Global.dispatchEvent(MainNotify.closeStartPanelNotify, null, false);
        }
    };
    /**
     * preload资源组加载进度
     */
    GameApp.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingPanel.setProgress(event.itemsLoaded, event.itemsTotal);
        }
        else if (event.groupName == "loading") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建游戏场景
     */
    GameApp.prototype.createGameScene = function () {
        //var gameContainer:fighter.GameContainer = new fighter.GameContainer();
        //this.addChild(gameContainer);
        if (GameConfig.isDebug) {
        }
        GlobalData.isEngineer = (egret.localStorage.getItem("isEngineer") == "true");
        PanelManager.initPanel();
        Global.dispatchEvent(MainNotify.openStartPanelNotify, null, false);
        //打开crap板面
        //Global.dispatchEvent(MainNotify.openCrapPanelNotify,null,false);
        // Global.dispatchEvent(MainNotify.openFishPanelNotify,null,false);
        // Global.dispatchEvent(MainNotify.openCrapPanelNotify,null,false);
        //  Global.dispatchEvent(MainNotify.openWheelPanelNotify,null,false);
        //    Global.dispatchEvent(MainNotify.openLottery28PanelNotify,null,false);
    };
    return GameApp;
})(egret.DisplayObjectContainer);
GameApp.prototype.__class__ = "GameApp";
