var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var StartPanel = (function (_super) {
    __extends(StartPanel, _super);
    function StartPanel(stageW, stageH) {
        _super.call(this);
        this.imgs = RES.getRes("asserts");
        this.w = 0;
        this.h = 0;
        this.bg = new egret.Bitmap();
        this.inputImg1 = new egret.Bitmap();
        this.inputImg2 = new egret.Bitmap();
        this.logoImg = new egret.Bitmap();
        this.warImg = new egret.Bitmap();
        this.startBtn = new egret.Bitmap();
        this.copyRight = new egret.TextField();
        this.btnDown1 = new egret.Bitmap();
        this.btnDown2 = new egret.Bitmap();
        this.btnUp1 = new egret.Bitmap();
        this.btnUp2 = new egret.Bitmap();
        this.bossNameArr = ["白骨精", "玄奘", "申公豹", "妲己"];
        this.hpNameArr = ["700007000", "600006000", "900009000", "850008500"];
        this.doubleArr = [0.5, 2, 4, 6, 10];
        this.selectNum = 0;
        this.w = stageW;
        this.h = stageH;
        this.createView();
    }
    StartPanel.prototype.createView = function () {
        this.bg.texture = this.imgs.getTexture("bg");
        this.addChild(this.bg);
        this.bg.touchEnabled = true;
        this.btnDown1.texture = this.imgs.getTexture("btnDown1");
        this.btnDown1.y = 290 + 55;
        this.btnDown1.x = 15 + 26 + 20;
        this.addChild(this.btnDown1);
        this.btnUp1.texture = this.imgs.getTexture("btnUp1");
        this.btnUp1.y = 295 + 50;
        this.btnUp1.x = 18 + 26 - 3 + 20;
        this.addChild(this.btnUp1);
        this.btnUp1.visible = false;
        this.btnDown2.texture = this.imgs.getTexture("btnDown2");
        this.btnDown2.y = 290 + 55;
        this.btnDown2.x = 260 - 25 + 26 + 5 - 20;
        this.addChild(this.btnDown2);
        this.btnDown2.visible = false;
        this.btnUp2.texture = this.imgs.getTexture("btnUp2");
        this.btnUp2.y = 295 + 50;
        this.btnUp2.x = 260 - 20 + 26 - 20;
        this.addChild(this.btnUp2);
        this.inputImg1.texture = this.imgs.getTexture("inputImg");
        this.inputImg1.y = 140 + 70;
        this.inputImg1.x = this.w / 2 - this.inputImg1.width / 2;
        this.addChild(this.inputImg1);
        this.inputImg2.texture = this.imgs.getTexture("inputImg");
        this.inputImg2.y = 310 + 100 + 25 - 50 + 57;
        this.inputImg2.x = this.w / 2 - this.inputImg2.width / 2;
        this.addChild(this.inputImg2);
        this.myName = new egret.TextField();
        this.myName.type = "input";
        this.myName.size = 24;
        this.myName.height = 24;
        this.myName.width = 240;
        this.myName.textColor = 0xe0c16c;
        this.myName.strokeColor = 0x000000;
        this.myName.stroke = 1;
        this.myName.x = this.w / 2 - 120;
        this.myName.y = this.inputImg1.y + 50 - 40;
        this.myName.textAlign = egret.HorizontalAlign.CENTER;
        this.myName.text = "请大侠报上大名";
        // this.myName.text = "哈哈";
        this.addChild(this.myName);
        // this.myName.addEventListener("focus", this.onFocusHandler1, this);
        // this.myName["_inputUtils"].stageText.addEventListener("focus", this.onFocusHandler1, this);
        this.myName["_inputUtils"].stageText.addEventListener("focus", this.onFocusHandler1, this);
        this.fightName = new egret.TextField();
        this.fightName.type = "input";
        this.fightName.size = 24;
        this.fightName.height = 24;
        this.fightName.width = 240;
        this.fightName.textColor = 0xe0c16c;
        this.fightName.strokeColor = 0x000000;
        this.fightName.stroke = 1;
        this.fightName.x = this.w / 2 - 120;
        this.fightName.y = this.inputImg2.y + 50 - 40;
        this.fightName.textAlign = egret.HorizontalAlign.CENTER;
        this.fightName.text = "请输入你要挑战的对手";
        this.addChild(this.fightName);
        this.fightName["_inputUtils"].stageText.addEventListener("focus", this.onFocusHandler2, this);
        // this.fightName._inputUtils.stageText.addEventListener("focus", this.onFocusHandler2, this);
        this.warImg.texture = this.imgs.getTexture("warImg");
        this.warImg.y = 225 + 37 + 8;
        this.warImg.x = this.w / 2 - this.warImg.width / 2;
        this.addChild(this.warImg);
        this.logoImg.texture = this.imgs.getTexture("logoImg");
        this.logoImg.x = this.w / 2 - this.logoImg.width / 2;
        this.logoImg.y = -10;
        this.addChild(this.logoImg);
        this.roleRender1 = new RoleRender(this.w, this.h, 1);
        this.roleRender1.x = 8;
        this.roleRender1.y = 370 + 50;
        this.addChild(this.roleRender1);
        this.roleRender1.addEventListener("onSelectBtnEvent", this.onSelectBtn, this);
        this.roleRender2 = new RoleRender(this.w, this.h, 2);
        this.roleRender2.x = this.roleRender1.x + 110 + 10;
        this.roleRender2.y = 370 + 50;
        this.addChild(this.roleRender2);
        this.roleRender2.addEventListener("onSelectBtnEvent", this.onSelectBtn, this);
        this.roleRender3 = new RoleRender(this.w, this.h, 3);
        this.roleRender3.x = this.roleRender2.x + 110 + 10;
        this.roleRender3.y = 370 + 50;
        this.addChild(this.roleRender3);
        this.roleRender3.addEventListener("onSelectBtnEvent", this.onSelectBtn, this);
        this.roleRender4 = new RoleRender(this.w, this.h, 4);
        this.roleRender4.x = this.roleRender3.x + 110 + 10;
        this.roleRender4.y = 370 + 50;
        this.addChild(this.roleRender4);
        this.roleRender4.addEventListener("onSelectBtnEvent", this.onSelectBtn, this);
        this.copyRight.size = 24;
        this.copyRight.y = this.h - 30;
        this.copyRight.textColor = 0xFFFFFF;
        this.copyRight.text = "9ria.com 蜂群工作室荣誉出品";
        this.copyRight.x = this.w / 2 - this.copyRight.width / 2;
        this.copyRight.strokeColor = 0x000000;
        this.copyRight.stroke = 2;
        this.copyRight.bold = true;
        // this.copyRight.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(this.copyRight);
        this.startBtn.texture = this.imgs.getTexture("startBtn");
        this.startBtn.x = this.w / 2 - this.startBtn.width / 2 - 35;
        this.startBtn.y = 525 + 40 - 15;
        this.addChild(this.startBtn);
        this.startBtn.touchEnabled = true;
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartBtnTouchTap, this);
        //9ria.com 蜂群工作室荣誉出品 black
        this.btnUp1.touchEnabled = true;
        this.btnUp1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showTab1, this);
        this.btnUp2.touchEnabled = true;
        this.btnUp2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showTab2, this);
        this.bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bgClick, this);
        this.setTabBar(1);
    };
    StartPanel.prototype.bgClick = function () {
        // console.log("focus");
        // document.getElementById("egretCanvas").focus();
        var tempStr = this.myName.text;
        if (this.myName != null) {
            this.myName["_inputUtils"].stageText.removeEventListener("focus", this.onFocusHandler1, this);
            this.removeChild(this.myName);
            this.myName = null;
        }
        this.myName = new egret.TextField();
        this.myName.type = "input";
        this.myName.size = 24;
        this.myName.height = 24;
        this.myName.width = 240;
        this.myName.textColor = 0xe0c16c;
        this.myName.strokeColor = 0x000000;
        this.myName.stroke = 1;
        this.myName.x = this.w / 2 - 120;
        this.myName.y = this.inputImg1.y + 50 - 40;
        this.myName.textAlign = egret.HorizontalAlign.CENTER;
        this.myName.text = tempStr;
        // this.myName.text = "哈哈";
        this.addChild(this.myName);
        // this.myName.addEventListener("focus", this.onFocusHandler1, this);
        // this.myName["_inputUtils"].stageText.addEventListener("focus", this.onFocusHandler1, this);
        this.myName["_inputUtils"].stageText.addEventListener("focus", this.onFocusHandler1, this);
    };
    StartPanel.prototype.showTab1 = function () {
        this.setTabBar(1);
        if (!this.contains(this.fightName)) {
            this.addChild(this.fightName);
        }
    };
    StartPanel.prototype.showTab2 = function () {
        this.bgClick();
        this.setTabBar(2);
        if (this.contains(this.fightName)) {
            this.removeChild(this.fightName);
        }
    };
    StartPanel.prototype.onStartBtnTouchTap = function (e) {
        //判断是否满足条件
        if (this.myName.text == "请大侠报上大名") {
            this.playEffect("请大侠报上大名");
            return;
        }
        var result1 = this.myName.text.replace(/(^\s+)|(\s+$)/g, ""); //去掉前后空格
        if (result1.length == 0) {
            this.playEffect("名称不能为空！");
            return;
        }
        if (this.myName.text.length > 7) {
            this.playEffect("大侠名字太长了~");
            return;
        }
        if (this.selectNum == 1) {
            if (this.fightName.text == "请输入你要挑战的对手") {
                this.playEffect("请输入对手名字");
                return;
            }
            var result2 = this.fightName.text.replace(/(^\s+)|(\s+$)/g, ""); //去掉前后空格
            if (result2.length == 0) {
                this.playEffect("名称不能为空！");
                return;
            }
            if (this.fightName.text.length > 7) {
                this.playEffect("对手名字太长了~");
                return;
            }
        }
        else {
            if (game.GlobalData.aiNum == 0) {
                this.playEffect("请选择你要挑战的Boss");
                return;
            }
        }
        var md = new md5();
        var myStr = this.transToNum(md.hex_md5(this.myName.text));
        var myHPStr = myStr.substr(0, 5);
        var myStrenthStr = myStr.substr(5, 4);
        game.GlobalData.myMaxHP = parseInt(myHPStr, 10);
        game.GlobalData.myCurHP = parseInt(myHPStr, 10);
        game.GlobalData.myStrength = parseInt(myStrenthStr, 10);
        var rateNum = Math.random();
        var doubleNum = 0;
        if (rateNum < 0.4) {
            doubleNum = 0.5;
        }
        else if (rateNum < 0.8) {
            doubleNum = 1;
        }
        else {
            doubleNum = 2;
        }
        game.GlobalData.myStrength = game.GlobalData.myStrength * doubleNum;
        game.GlobalData.doubleNum = doubleNum;
        var aiStr = "";
        var aiHPStr = "";
        var aiStrenthStr = "";
        game.GlobalData.isBoss = (this.selectNum == 2);
        if (game.GlobalData.isBoss) {
            game.GlobalData.bossName = this.bossNameArr[game.GlobalData.aiNum - 1];
            aiStr = this.hpNameArr[game.GlobalData.aiNum - 1];
        }
        else {
            game.GlobalData.fightName = this.fightName.text;
            aiStr = this.transToNum(md.hex_md5(game.GlobalData.fightName));
        }
        aiHPStr = aiStr.substr(0, 5);
        aiStrenthStr = aiStr.substr(5, 4);
        game.GlobalData.aiMaxHP = parseInt(aiHPStr, 10);
        game.GlobalData.aiCurHP = parseInt(aiHPStr, 10);
        game.GlobalData.aiStrength = parseInt(aiStrenthStr, 10);
        this.dispatchEvent(new egret.Event("onStartBtnEvent"));
    };
    StartPanel.prototype.onFocusHandler1 = function () {
        if (this.myName.text == "请大侠报上大名") {
            this.myName.text = " ";
        }
    };
    StartPanel.prototype.onFocusHandler2 = function () {
        if (this.fightName.text == "请输入你要挑战的对手") {
            this.fightName.text = " ";
        }
    };
    StartPanel.prototype.onSelectBtn = function (e) {
        // var render = e.curTarget.roleNum;
        this.roleRender1.setSelect(false);
        this.roleRender2.setSelect(false);
        this.roleRender3.setSelect(false);
        this.roleRender4.setSelect(false);
        this["roleRender" + e.currentTarget.roleNum].setSelect(true);
        game.GlobalData.aiNum = e.currentTarget.roleNum;
    };
    StartPanel.prototype.playEffect = function (str) {
        var effectTips = new egret.TextField();
        effectTips.size = 24;
        effectTips.y = this.h / 2;
        effectTips.textColor = 0xff0505;
        // effectTips.anchorX = 0.5;
        effectTips.text = str;
        effectTips.strokeColor = 0x000000;
        effectTips.x = this.w / 2 - effectTips.width / 2;
        effectTips.stroke = 2;
        effectTips.bold = true;
        effectTips.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(effectTips);
        var onComplete1 = function () {
            this.removeChild(effectTips);
        };
        effectTips.visible = true;
        egret.Tween.get(effectTips).to({ y: effectTips.y - 120 }, 1000, egret.Ease.backOut).call(onComplete1, this);
    };
    StartPanel.prototype.setTabBar = function (type) {
        this.selectNum = type;
        var bool = (type == 1);
        this.btnDown1.visible = bool;
        this.btnUp1.visible = !bool;
        this.btnDown2.visible = !bool;
        this.btnUp2.visible = bool;
        this.inputImg2.visible = bool;
        this.fightName.visible = bool;
        this.roleRender1.visible = !bool;
        this.roleRender2.visible = !bool;
        this.roleRender3.visible = !bool;
        this.roleRender4.visible = !bool;
    };
    //将字母转换成1234
    StartPanel.prototype.transToNum = function (s) {
        var sArr = s.split("");
        var reStr = "";
        for (var i = 0; i < s.length; i++) {
            var n = Number(sArr[i]);
            if (isNaN(n)) {
                sArr[i] = this.aToNumber(sArr[i]);
            }
            reStr += sArr[i];
        }
        return reStr;
    };
    StartPanel.prototype.aToNumber = function (s) {
        switch (s) {
            case "a":
                {
                    return "1";
                    break;
                }
            case "b":
                {
                    return "3";
                    break;
                }
            case "c":
                {
                    return "5";
                    break;
                }
            case "d":
                {
                    return "7";
                    break;
                }
            case "e":
                {
                    return "9";
                    break;
                }
            case "f":
                {
                    return "2";
                    break;
                }
        }
    };
    return StartPanel;
})(egret.Sprite);
