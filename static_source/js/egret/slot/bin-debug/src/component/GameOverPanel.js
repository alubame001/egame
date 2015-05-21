var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameOverPanel = (function (_super) {
    __extends(GameOverPanel, _super);
    function GameOverPanel(stageW, stageH) {
        _super.call(this);
        this.imgs = RES.getRes("asserts");
        this.w = 0;
        this.h = 0;
        this.winerTF = new egret.TextField();
        this.noticeTF = new egret.TextField();
        this.noticeTF2 = new egret.TextField();
        this.bg1 = new egret.Bitmap();
        this.bg2 = new egret.Sprite();
        this.overBg = new egret.Bitmap();
        this.logoImg = new egret.Bitmap();
        this.winerImg = new egret.Bitmap();
        this.shareBtn = new egret.Bitmap();
        this.submitBtn = new egret.Bitmap();
        this.inputBG = new egret.Bitmap();
        this.inputTF = new egret.Bitmap();
        this.retryBtn = new egret.Bitmap();
        this.linkBtn = new egret.Bitmap();
        this.weiXin = new egret.Bitmap();
        this.playBg = new egret.Bitmap();
        this.playBtn = new egret.Bitmap();
        this.w = stageW;
        this.h = stageH;
        this.createView();
    }
    GameOverPanel.prototype.createView = function () {
        this.bg1.texture = this.imgs.getTexture("bg");
        this.addChild(this.bg1);
        //绘制一个透明度为1的绿色矩形，宽高为100*80
        this.bg2.graphics.beginFill(0x000000, 0.2);
        this.bg2.graphics.drawRect(0, 0, this.w, this.h);
        this.bg2.graphics.endFill();
        this.bg2.width = this.w;
        this.bg2.height = this.h;
        this.addChild(this.bg2);
        this.touchEnabled = true;
        this.overBg.texture = this.imgs.getTexture("overBg");
        this.overBg.x = this.w / 2 - this.overBg.width / 2;
        this.overBg.y = this.h / 2 - this.overBg.height / 2;
        this.addChild(this.overBg);
        this.logoImg.texture = this.imgs.getTexture("logoImg");
        this.logoImg.x = this.w / 2 - this.logoImg.width / 2;
        this.logoImg.y = this.overBg.y - this.logoImg.height - 10;
        this.addChild(this.logoImg);
        this.playBg.texture = this.imgs.getTexture("playBg");
        this.playBg.x = this.w / 2 - this.playBg.width / 2;
        this.playBg.y = this.overBg.y + 20;
        this.addChild(this.playBg);
        this.playBtn.texture = this.imgs.getTexture("playBtn");
        this.playBtn.x = this.w / 2 - this.playBtn.width / 2;
        this.playBtn.y = this.overBg.y + 20 + 44;
        this.addChild(this.playBtn);
        var tfSize = 36;
        this.winerImg.texture = this.imgs.getTexture("winerImg");
        this.winerImg.x = 35 + 80;
        this.winerImg.y = this.overBg.y + 65 + 130 + 6;
        this.addChild(this.winerImg);
        this.winerTF.size = tfSize;
        this.winerTF.x = 245;
        this.winerTF.y = this.overBg.y + 85 + 130 - 6;
        this.winerTF.textColor = 0x000000;
        this.winerTF.text = "";
        // this.winerTF.strokeColor = 0x000000;
        // this.winerTF.stroke  = 2;
        this.winerTF.bold = true;
        // this.winerTF.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(this.winerTF);
        this.noticeTF.size = 18;
        this.noticeTF.textColor = 0x000000;
        // this.noticeTF.strokeColor = 0x000000;
        this.noticeTF.width = 400;
        // this.noticeTF.stroke  = 2;
        this.noticeTF.bold = true;
        this.noticeTF.text = "";
        this.noticeTF.x = this.w / 2 - 200;
        this.noticeTF.y = this.overBg.y + 160 + 100;
        this.noticeTF.lineSpacing = 10;
        this.noticeTF.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(this.noticeTF);
        this.noticeTF2.size = 16;
        this.noticeTF2.textColor = 0x000000;
        // this.noticeTF2.strokeColor = 0xFFFFFF;
        this.noticeTF2.width = 450;
        // this.noticeTF2.stroke  = 1;
        this.noticeTF2.bold = false;
        this.noticeTF2.text = "即刻                           ，填写手机号码，寻求更多挑战！\niPhone6、iPad mini3、充值卡等海量豪礼等你来拿！";
        this.noticeTF2.x = this.w / 2 - this.noticeTF2.width / 2;
        this.noticeTF2.y = this.overBg.y + this.overBg.height - 125;
        this.noticeTF2.lineSpacing = 10;
        this.noticeTF2.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(this.noticeTF2);
        this.weiXin.texture = this.imgs.getTexture("weiXin");
        this.weiXin.x = 59 + 29;
        this.weiXin.y = this.overBg.y + 327;
        this.addChild(this.weiXin);
        this.shareBtn.texture = this.imgs.getTexture("shareBtn");
        this.shareBtn.x = 255;
        this.shareBtn.y = this.overBg.y + 250 + 140;
        this.addChild(this.shareBtn);
        this.retryBtn.texture = this.imgs.getTexture("retryBtn");
        this.retryBtn.x = 30 + 36;
        this.retryBtn.y = this.overBg.y + 250 + 140;
        this.addChild(this.retryBtn);
        this.submitBtn.texture = this.imgs.getTexture("submitBtn");
        this.submitBtn.x = 293;
        this.submitBtn.y = this.overBg.y + this.overBg.height + 5 + 4;
        this.addChild(this.submitBtn);
        this.inputBG.texture = this.imgs.getTexture("inputImg");
        this.inputBG.scaleX = 0.7;
        this.inputBG.scaleY = 0.9;
        this.inputBG.x = 40;
        this.inputBG.y = this.overBg.y + this.overBg.height + 7;
        this.addChild(this.inputBG);
        this.teleTF = new egret.TextField();
        this.teleTF.type = "input";
        this.teleTF.size = 20;
        this.teleTF.height = 24;
        this.teleTF.width = 140;
        this.teleTF.textColor = 0xe0c16c;
        this.teleTF.strokeColor = 0x000000;
        this.teleTF.stroke = 1;
        this.teleTF.x = 106;
        this.teleTF.y = this.overBg.y + this.overBg.height + 17;
        this.teleTF.textAlign = egret.HorizontalAlign.CENTER;
        this.teleTF.text = "输入手机号提交注册";
        this.addChild(this.teleTF);
        this.teleTF["_inputUtils"].stageText.addEventListener("focus", this.onFocusHandler1, this);
        this.submitBtn.touchEnabled = true;
        this.playBtn.touchEnabled = true;
        this.shareBtn.touchEnabled = true;
        this.retryBtn.touchEnabled = true;
        this.weiXin.touchEnabled = true;
        // this.linkBtn.touchEnabled = true;
        this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShareBtnTouchTap, this);
        this.retryBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRetryBtnTouchTap, this);
        this.submitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSubmitBtnTouchTap, this);
        this.playBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlayBtnTouchTap, this);
        this.weiXin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onWeiXinBtnTouchTap, this);
    };
    GameOverPanel.prototype.onFocusHandler1 = function () {
        if (this.teleTF.text == "输入手机号提交注册") {
            this.teleTF.text = " ";
        }
    };
    GameOverPanel.prototype.updateData = function () {
        if (!this.contains(this.teleTF)) {
            this.addChild(this.teleTF);
        }
        var name = "";
        if (game.GlobalData.isBoss) {
            name = game.GlobalData.bossName;
        }
        else {
            name = game.GlobalData.fightName;
        }
        if (game.GlobalData.winerNum == 1) {
            this.winerTF.text = game.GlobalData.myName;
            this.noticeTF.text = "你施展了毕生绝学，用" + game.GlobalData.myAttackNum + "招成功击败" + name + "，快邀请江湖豪杰来挑战你!";
        }
        else {
            this.winerTF.text = name;
            this.noticeTF.text = "你被" + name + "在" + game.GlobalData.aiAttackNum + "招之内击败，为了一雪前耻，迅速追击重新挑战吧!";
        }
    };
    GameOverPanel.prototype.onShareBtnTouchTap = function (e) {
        this.dispatchEvent(new egret.Event("shareBtn"));
    };
    GameOverPanel.prototype.onRetryBtnTouchTap = function (e) {
        if (this.contains(this.teleTF)) {
            this.removeChild(this.teleTF);
        }
        this.dispatchEvent(new egret.Event("retryBtn"));
    };
    GameOverPanel.prototype.bgClick = function () {
        // console.log("focus");
        // document.getElementById("egretCanvas").focus();
        var tempStr = this.teleTF.text;
        if (this.teleTF != null) {
            this.teleTF["_inputUtils"].stageText.removeEventListener("focus", this.onFocusHandler1, this);
            this.removeChild(this.teleTF);
            this.teleTF = null;
        }
        this.teleTF = new egret.TextField();
        this.teleTF.type = "input";
        this.teleTF.size = 20;
        this.teleTF.height = 24;
        this.teleTF.width = 140;
        this.teleTF.textColor = 0xe0c16c;
        this.teleTF.strokeColor = 0x000000;
        this.teleTF.stroke = 1;
        this.teleTF.x = 106;
        this.teleTF.y = this.overBg.y + this.overBg.height + 17;
        this.teleTF.textAlign = egret.HorizontalAlign.CENTER;
        this.teleTF.text = tempStr;
        this.addChild(this.teleTF);
        this.teleTF["_inputUtils"].stageText.addEventListener("focus", this.onFocusHandler1, this);
    };
    GameOverPanel.prototype.onSubmitBtnTouchTap = function (e) {
        this.bgClick();
        var partten = /^1[3,5,8]\d{9}$/;
        this.teleTF.text = this.teleTF.text.replace(/\s/g, "");
        if (partten.test(this.teleTF.text)) {
            // window.open("http://mp.weixin.qq.com/s?__biz=MzA3NTkzMjgzMQ==&mid=201400879&idx=3&sn=46684c0f4b74aa88bd337a329b3687d4",'_self') 
            var script = document.createElement("script");
            script.src = "http://apibox.mobage.cn/api/index.php/kit/api_comp/mid_post/32?__APP=ohYGJnF1vDQBqS8v&__SRC=JSSDK&phone=" + this.teleTF.text + "&event=gods_third&_C=sendPhonenumSuccess&_=1414639537435";
            //game.EffectUtils.setCookie("tempTelePhoneNum", this.teleTF.text);
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(script, s);
            // var smsScript = document.createElement("script");
            // smsScript.src = "http://apibox.mobage.cn/api/index.php/kit/api_comp/mid_post/31?__APP=ohYGJnF1vDQBqS8v&__SRC=JSSDK&&phone_no=" + this.teleTF.text + "&text=感谢使用&_=1414756002067";
            // s.parentNode.insertBefore(smsScript, s);
            // this.playEffect("恭喜您成功获取礼包码！记得查看手机短信哦~快点告诉小伙伴，更多惊喜等着您！");
            this.playEffect("恭喜您成功获取礼包码！记得查看手机短信哦~");
        }
        else {
            this.playEffect("手机号码格式不正确");
        }
    };
    GameOverPanel.prototype.onPlayBtnTouchTap = function (e) {
        window.open("http://v.youku.com/v_show/id_XODE0OTc2OTA4.html", '_self');
    };
    GameOverPanel.prototype.onWeiXinBtnTouchTap = function (e) {
        window.open("http://mp.weixin.qq.com/s?__biz=MzA3Njc3ODEzMw==&mid=200906381&idx=1&sn=55881e356e89cbb24160869b82b9f1b5#rd", '_self');
    };
    GameOverPanel.prototype.setCuScore = function (num) {
        // this.cureScoreTF.text = ""+num;
    };
    GameOverPanel.prototype.setBestCuScore = function (num) {
        // this.bestCoreTF.text = ""+num;
    };
    //通讯
    GameOverPanel.prototype.sendInfo2 = function (url, urlData) {
        var loader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        loader.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
        // this.tipTF.text = "正在发送数据...";
        var request = new egret.URLRequest(url);
        request.method = egret.URLRequestMethod.GET;
        request.data = new egret.URLVariables(urlData);
        loader.load(request);
    };
    //GET请求完成
    GameOverPanel.prototype.onGetComplete = function (event) {
        this.playEffect("恭喜您成功获取礼包码！记得查看手机短信哦~快点告诉小伙伴，更多惊喜等着您！");
        var loader = event.target;
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        var data = loader.data;
        // var data2 = eval("("+data+")")
        // game.GlobalData.rankArr = data2;
        // //处理数据
        // this.dispatchEvent(new egret.Event("rankBtn")); 
    };
    GameOverPanel.prototype.playEffect = function (str) {
        var effectTips = new egret.TextField();
        effectTips.size = 24;
        effectTips.y = this.h / 2;
        effectTips.textColor = 0xFFFFFF;
        // effectTips.anchorX = 0.5;
        effectTips.text = str;
        effectTips.width = 280;
        effectTips.strokeColor = 0x000000;
        effectTips.lineSpacing = 10;
        effectTips.x = this.w / 2 - 280 / 2;
        effectTips.stroke = 2;
        effectTips.bold = true;
        effectTips.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(effectTips);
        var onComplete2 = function () {
            this.removeChild(effectTips);
        };
        var onComplete1 = function () {
            egret.Tween.get(effectTips).to({ alpha: 0 }, 500).call(onComplete2, this);
        };
        effectTips.visible = true;
        egret.Tween.get(effectTips).to({ y: effectTips.y - 120 }, 1000, egret.Ease.backOut).call(onComplete1, this);
    };
    return GameOverPanel;
})(egret.Sprite);
