/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GUIExplorer = (function (_super) {
    __extends(GUIExplorer, _super);
    function GUIExplorer() {
        _super.call(this);
        this.gap = 300; //布局分割值
        /**
        *预定义类，用于对象反射
        * */
        this.classDefine = new egret.gui.ArrayCollection([
            AlertScreen,
            BitmapLabelScreen,
            ButtonScreen,
            TogglesScreen,
            TreeScreen,
            TitleWindowScreen,
            PanelScreen,
            LabelScreen,
            LayoutScreen,
            ListScreen,
            ListCustomScreen,
            ProgressBarScreen,
            ScrollerScreen,
            SliderScreen,
            TabBarScreen,
            DropDownListScreen
        ]);
        /*
        * 缓存创建的对象
        * */
        this.classInstanceCache = {};
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    GUIExplorer.prototype.onAddToStage = function (event) {
        //注入自定义的素材解析器
        egret.Injector.mapClass("egret.gui.IAssetAdapter", AssetAdapter);
        var skintype = window["getCurrentTest"]();
        // this.setSkinType("simple");
        this.loading = new Loading();
        this.loading.contentSize(this.stage.stageWidth, this.stage.stageHeight);
        this.addChildAt(this.loading, 0);
        this.setSkinType(skintype);
    };
    /*
    * 设置皮肤类型
    * */
    GUIExplorer.prototype.setSkinType = function (type) {
        GUIExplorer.skinType = type;
        var path;
        switch (type) {
            case "ocean":
                egret.gui.Theme.load("resource/theme/theme_ocean.thm");
                path = "resource/resource_ocean.json";
                break;
            case "simple":
                egret.gui.Theme.load("resource/theme/theme_simple.thm");
                path = "resource/resource_simple.json";
                break;
        }
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComp, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onGroupProgress, this);
        RES.loadConfig(path, "resource/");
        RES.loadGroup("global");
    };
    GUIExplorer.prototype.clear = function () {
        var screens = RES.getRes("screens_json");
        this.mainList.dataProvider = new egret.gui.ArrayCollection(screens);
        this.mainList.addEventListener(egret.gui.ListEvent.ITEM_CLICK, this.onItemClick, this);
        this.mainList.selectedIndex = 0;
        var obj = {};
        obj.item = this.mainList.selectedItem;
        this.onItemClick(obj);
        this.uiStage.validateNow();
    };
    GUIExplorer.prototype.onGroupComp = function (event) {
        switch (event.groupName) {
            case "global":
                RES.loadGroup("skin");
                break;
            case "skin":
                this.createExporer();
                this.clear();
                this.removeChild(this.loading);
                break;
        }
    };
    GUIExplorer.prototype.onGroupProgress = function (event) {
        this.loading.setProgress(Math.floor(event.itemsLoaded / event.itemsTotal * 100), "正在加载资源");
    };
    GUIExplorer.prototype.createExporer = function () {
        //实例化GUI根容器
        var uiStage = new egret.gui.UIStage();
        this.uiStage = uiStage;
        this.addChild(uiStage);
        var asset = new egret.gui.UIAsset();
        asset.source = "app_back_png";
        asset.percentHeight = asset.percentWidth = 100;
        asset.fillMode = egret.BitmapFillMode.REPEAT;
        uiStage.addElement(asset);
        this.listBack = new egret.gui.UIAsset();
        this.listBack.source = "app_list_back_png";
        this.listBack.width = this.gap;
        this.listBack.bottom = 0;
        this.listBack.top = 0;
        uiStage.addElement(this.listBack);
        var headerGroup = new egret.gui.Group();
        headerGroup.width = this.gap;
        headerGroup.height = 90;
        uiStage.addElement(headerGroup);
        var asset = new egret.gui.UIAsset();
        asset.source = "app_header_back_png";
        asset.fillMode = egret.BitmapFillMode.REPEAT;
        asset.cacheAsBitmap = true;
        asset.percentWidth = asset.percentHeight = 100;
        headerGroup.addElement(asset);
        var logo = new egret.gui.UIAsset();
        logo.source = "app_logo_png";
        logo.bottom = 5;
        logo.left = 20;
        headerGroup.addElement(logo);
        var title = new egret.gui.Label();
        title.text = "Egret GUI";
        title.size = 18;
        title.right = 20;
        title.bottom = 10;
        headerGroup.addElement(title);
        var list = new egret.gui.List();
        this.mainList = list;
        list.width = this.gap;
        list.top = 90;
        list.bottom = 0;
        uiStage.addElement(list);
        list.addEventListener(egret.gui.ListEvent.ITEM_CLICK, this.onItemClick, this);
        switch (GUIExplorer.skinType) {
            case "ocean":
                title.textColor = 0xffffff;
                list.skinName = "skins.ocean.ListSkin";
                list.itemRendererSkinName = "skins.ocean.ScreenItemRendererSkin";
                break;
            case "simple":
                title.textColor = 0x111111;
                list.skinName = "skins.simple.ListSkin";
                list.itemRendererSkinName = "skins.simple.ScreenItemRendererSkin";
                break;
        }
        this.componentGroup = new egret.gui.Group();
        this.componentGroup.percentHeight = 100;
        this.componentGroup.left = this.gap;
        this.componentGroup.right = 0;
        uiStage.addElement(this.componentGroup);
    };
    GUIExplorer.prototype.onItemClick = function (event) {
        this.componentGroup.removeAllElements();
        var className = event.item + "Screen";
        var clazz;
        if (egret.hasDefinition(className)) {
            clazz = egret.getDefinitionByName(className);
            //缓存一下，免得反复重复创建
            if (this.classInstanceCache.hasOwnProperty(className)) {
                this.componentGroup.addElement(this.classInstanceCache[className]);
            }
            else {
                var screenContent = new clazz();
                screenContent.percentHeight = 100;
                screenContent.percentWidth = 100;
                this.componentGroup.addElement(screenContent);
                this.classInstanceCache[className] = screenContent;
            }
        }
    };
    return GUIExplorer;
})(egret.DisplayObjectContainer);
GUIExplorer.prototype.__class__ = "GUIExplorer";
