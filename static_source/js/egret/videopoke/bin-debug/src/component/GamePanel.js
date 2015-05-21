var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GamePanel = (function (_super) {
    __extends(GamePanel, _super);
    function GamePanel(stageW, stageH) {
        _super.call(this);
        this.imgs = RES.getRes("asserts");
        this.w = 0;
        this.h = 0;
        this.myName = new egret.TextField();
        this.aiName = new egret.TextField();
        this.weapon = new egret.TextField();
        this.bg1 = new egret.Bitmap();
        this.bg2 = new egret.Sprite();
        this.warBG = new egret.Bitmap();
        this.logoImg = new egret.Bitmap();
        this.myMaxHP = 0;
        this.myCurHP = 0;
        this.myStrength = 0;
        this.aiMaxHP = 0;
        this.aiCurHP = 0;
        this.aiStrength = 0;
        this.roleNameArr = ["baigu", "xuanzang", "shenggongbao", "daji"];
        this.equipeNameArr = ["太古飘翎", "达摩一叹", "无相绝踪", "六道黄泉", "大衍天玄", "倚天长生"];
        this.w = stageW;
        this.h = stageH;
        this.createView();
    }
    GamePanel.prototype.createView = function () {
        this.bg1.texture = this.imgs.getTexture("bg");
        this.addChild(this.bg1);
        //绘制一个透明度为1的绿色矩形，宽高为100*80
        this.bg2.graphics.beginFill(0x000000, 0.3);
        this.bg2.graphics.drawRect(0, 0, this.w, this.h);
        this.bg2.graphics.endFill();
        this.bg2.width = this.w;
        this.bg2.height = this.h;
        this.addChild(this.bg2);
        this.touchEnabled = true;
        this.warBG.texture = this.imgs.getTexture("warBG");
        this.warBG.y = this.h / 2 - this.warBG.height / 2;
        this.addChild(this.warBG);
        this.logoImg.texture = this.imgs.getTexture("logoImg");
        // this.logoImg.scaleX = 0.7;
        // this.logoImg.scaleY = 0.7;
        this.logoImg.x = this.w / 2 - this.logoImg.width / 2;
        this.logoImg.y = this.warBG.y - this.logoImg.height - 10;
        this.addChild(this.logoImg);
        this.pGRender1 = new PGRender(this.w, this.h, false);
        this.pGRender1.x = 10;
        this.pGRender1.y = this.warBG.y + 18;
        this.addChild(this.pGRender1);
        this.pGRender2 = new PGRender(this.w, this.h, true);
        this.pGRender2.x = this.w - this.pGRender2.width - 10;
        this.pGRender2.y = this.warBG.y + 18;
        this.addChild(this.pGRender2);
        this.myName.size = 16;
        this.myName.width = 110;
        this.myName.x = 20;
        this.myName.y = this.warBG.y + 40;
        this.myName.text = "";
        this.myName.strokeColor = 0x000000;
        this.myName.stroke = 2;
        this.myName.bold = true;
        this.myName.textAlign = egret.HorizontalAlign.LEFT;
        this.addChild(this.myName);
        this.aiName.size = 16;
        this.aiName.width = 110;
        this.aiName.x = this.w - 110 - 20;
        this.aiName.y = this.warBG.y + 40;
        this.aiName.text = "";
        this.aiName.strokeColor = 0x000000;
        this.aiName.stroke = 2;
        this.aiName.bold = true;
        this.aiName.textAlign = egret.HorizontalAlign.RIGHT;
        this.addChild(this.aiName);
        this.weapon.size = 16;
        this.weapon.width = 400;
        this.weapon.x = this.w / 2 - 200;
        this.weapon.y = this.warBG.y + this.warBG.height + 5;
        this.weapon.text = "";
        this.weapon.textColor = 0xFFFFFF;
        this.weapon.strokeColor = 0x000000;
        this.weapon.stroke = 2;
        this.weapon.bold = true;
        this.weapon.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(this.weapon);
        this.role1 = new Role();
        this.role1.x = -50;
        this.role1.y = this.warBG.y + this.warBG.height - this.role1.getHeight() + 70;
        this.addChild(this.role1);
        this.role1.setDirect("right");
        this.role1.play();
        this.role2 = new Role();
        this.role2.x = 530;
        // this.role2.y = this.warBG.y + 130;
        this.role2.y = this.warBG.y + this.warBG.height - this.role2.height + 40;
        this.addChild(this.role2);
        this.role2.setDirect("left");
        this.role1.addEventListener("attackToRight", this.attackToRight, this);
        this.role2.addEventListener("attackToLeft", this.attackToLeft, this);
        this.role1.addEventListener("rightAttack", this.rightAttack, this);
        this.role2.addEventListener("leftAttack", this.leftAttack, this);
    };
    GamePanel.prototype.attackToRight = function () {
        game.GlobalData.myAttackNum++;
        var localStrength = Math.round(this.myStrength * (1 + Math.random() * 2));
        this.role2.beAttack();
        this.aiCurHP -= localStrength;
        if (this.aiCurHP < 0) {
            this.aiCurHP = 0;
        }
        this.pGRender2.setHP(false, this.aiCurHP, this.aiMaxHP);
        this.role2.playEffect(2, localStrength);
    };
    GamePanel.prototype.attackToLeft = function () {
        game.GlobalData.aiAttackNum++;
        var localStrength = Math.round(this.aiStrength * (1 + Math.random() * 2));
        this.role1.beAttack();
        this.myCurHP -= localStrength;
        if (this.myCurHP < 0) {
            this.myCurHP = 0;
        }
        this.pGRender1.setHP(false, this.myCurHP, this.myMaxHP);
        this.role1.playEffect(1, localStrength);
    };
    GamePanel.prototype.rightAttack = function () {
        if (this.myCurHP <= 0) {
            this.role1.dead();
            game.GlobalData.winerNum = 2;
            this.playOverEffect();
            return;
        }
        this.role1.attack();
    };
    GamePanel.prototype.leftAttack = function () {
        if (this.aiCurHP <= 0) {
            this.role2.dead();
            game.GlobalData.winerNum = 1;
            this.playOverEffect();
            return;
        }
        this.role2.attack();
    };
    GamePanel.prototype.onRetry = function () {
        game.GlobalData.aiAttackNum = 0;
        this.myMaxHP = game.GlobalData.myMaxHP;
        this.myCurHP = game.GlobalData.myCurHP;
        this.myStrength = game.GlobalData.myStrength;
        this.aiMaxHP = game.GlobalData.aiMaxHP;
        this.aiCurHP = game.GlobalData.aiCurHP;
        this.aiStrength = game.GlobalData.aiStrength;
        this.myName.text = game.GlobalData.myName;
        if (game.GlobalData.isBoss) {
            this.aiName.text = game.GlobalData.bossName;
        }
        else {
            this.aiName.text = game.GlobalData.fightName;
        }
        if (game.GlobalData.doubleNum == 2) {
            var ranNum = Math.round(Math.random() * 6);
            if (ranNum == 0) {
                ranNum = 1;
            }
            this.weapon.text = "女神获得神器【" + this.equipeNameArr[ranNum - 1] + "】，攻击力提升一倍！";
        }
        else if (game.GlobalData.doubleNum == 0.5) {
            this.weapon.text = "女神实力太强，被上天压制，攻击力减半！";
        }
        else {
            this.weapon.text = "女神今日未带武器，攻击力没有变化！";
        }
        this.pGRender1.setHP(true, this.myCurHP, this.myMaxHP);
        this.pGRender2.setHP(true, this.aiCurHP, this.aiMaxHP);
        //模型
        if (Math.random() > 0.5) {
            this.role1.updateData("mozu");
            this.role1.x = -100;
            this.role1.y = this.warBG.y + this.warBG.height - this.role1.getHeight() + 40;
        }
        else {
            this.role1.updateData("renzu");
            this.role1.x = -50;
            this.role1.y = this.warBG.y + this.warBG.height - this.role1.getHeight() + 20;
        }
        if (game.GlobalData.isBoss) {
            if (game.GlobalData.aiNum == 3) {
                this.role2.y = this.warBG.y + this.warBG.height - this.role2.getHeight() + 20;
            }
            else {
                this.role2.y = this.warBG.y + this.warBG.height - this.role2.getHeight() + 40;
            }
            this.role2.updateData(this.roleNameArr[game.GlobalData.aiNum - 1]);
            if (game.GlobalData.aiNum == 2) {
                this.role2.x = 530 + 50;
            }
            else {
                this.role2.x = 530;
            }
        }
        else {
            if (Math.random() > 0.5) {
                this.role2.updateData("mozu");
                this.role2.x = 530 + 50;
                this.role2.y = this.warBG.y + this.warBG.height - this.role2.getHeight() + 40;
            }
            else {
                this.role2.updateData("renzu");
                this.role2.x = 530;
                this.role2.y = this.warBG.y + this.warBG.height - this.role2.getHeight() + 20;
            }
        }
        this.playFightEffect();
    };
    GamePanel.prototype.playFightEffect = function () {
        this.fight = new egret.Bitmap();
        this.fight.texture = this.imgs.getTexture("fight");
        this.fight.anchorX = 0.5;
        this.fight.anchorY = 0.5;
        this.fight.scaleX = 2;
        this.fight.scaleY = 2;
        this.fight.x = this.w / 2 + 25 - 50;
        this.fight.y = this.h / 2;
        this.addChild(this.fight);
        var onComplete1 = function () {
            this.removeChild(this.fight);
            this.fight = null;
            //--开始战斗
            this.role1.attack();
        };
        egret.Tween.get(this.fight).to({ scaleX: 1, scaleY: 1 }, 800, egret.Ease.elasticOut).call(onComplete1, this);
    };
    GamePanel.prototype.playOverEffect = function () {
        this.leftImg = new egret.Bitmap();
        this.leftImg.texture = this.imgs.getTexture("leftImg");
        this.leftImg.x = -this.leftImg.width;
        this.leftImg.y = this.h / 2 - this.leftImg.height - 5;
        this.addChild(this.leftImg);
        this.rightImg = new egret.Bitmap();
        this.rightImg.texture = this.imgs.getTexture("rightImg");
        this.rightImg.x = this.w;
        this.rightImg.y = this.h / 2 + 5;
        this.addChild(this.rightImg);
        egret.Tween.get(this.leftImg).to({ x: 100 }, 300, egret.Ease.sineOut);
        egret.Tween.get(this.rightImg).to({ x: this.w - this.rightImg.width - 100 }, 300, egret.Ease.sineOut);
        egret.setTimeout(function () {
            egret.Tween.get(this.leftImg).to({ x: this.leftImg.x + 150 }, 800);
            egret.Tween.get(this.rightImg).to({ x: this.rightImg.x - 150 }, 800);
        }, this, 300);
        egret.setTimeout(function () {
            egret.Tween.get(this.leftImg).to({ x: this.w }, 300, egret.Ease.sineIn);
            egret.Tween.get(this.rightImg).to({ x: -this.rightImg.width }, 300, egret.Ease.sineIn);
        }, this, 1100);
        egret.setTimeout(function () {
            this.removeChild(this.leftImg);
            this.removeChild(this.rightImg);
            this.leftImg = null;
            this.rightImg = null;
            this.dispatchEvent(new egret.Event("gameOver"));
        }, this, 1800);
    };
    GamePanel.prototype.getScore = function () {
        return 10;
    };
    return GamePanel;
})(egret.Sprite);
