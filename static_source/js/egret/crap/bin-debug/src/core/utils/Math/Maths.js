/**
  * 游戏特效汇总
  * by zhaoxin
  * (c) copyright 2014 - 2035
  * All Rights Reserved.
  * 使用方法如：EffectUtils.rotationEffect()
  */
var Maths;
(function (Maths) {
    function RndNum(n) {
        var rnd = 0;
        rnd = Math.random() * n;
        //for(var i=0;i<n;i++)
        // {
        rnd = Math.floor(rnd);
        return rnd;
    }
    Maths.RndNum = RndNum;
})(Maths || (Maths = {}));
