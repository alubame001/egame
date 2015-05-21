var game;
(function (game) {
    var GlobalData = (function () {
        function GlobalData() {
        }
        //自己名字
        GlobalData.myName = "";
        //对手名字
        GlobalData.fightName = "";
        //电脑num
        GlobalData.aiNum = 0;
        GlobalData.doubleNum = 0;
        GlobalData.isBoss = false;
        GlobalData.bossName = "";
        GlobalData.myMaxHP = 5000;
        GlobalData.myCurHP = 5000;
        GlobalData.myStrength = 1000;
        GlobalData.aiMaxHP = 4000;
        GlobalData.aiCurHP = 4000;
        GlobalData.aiStrength = 1500;
        GlobalData.myAttackNum = 0;
        GlobalData.aiAttackNum = 0;
        GlobalData.winerNum = 0;
        return GlobalData;
    })();
    game.GlobalData = GlobalData;
    GlobalData.prototype.__class__ = "game.GlobalData";
})(game || (game = {}));
