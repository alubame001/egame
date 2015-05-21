var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by yn on 2014/8/28.
 */
var DropDownListScreen = (function (_super) {
    __extends(DropDownListScreen, _super);
    function DropDownListScreen() {
        _super.call(this);
        /**
         * 皮肤组件
         */
        this.dropDownlist = null;
        this.skinName = "screenContentSkins.DropDownListScreenSkin";
    }
    DropDownListScreen.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
        if (instance == this.dropDownlist) {
            var dp = [];
            for (var i = 1; i < 50; i++) {
                dp.push({ label: "item" + i, toggle: false });
            }
            this.dropDownlist.dataProvider = new egret.gui.ArrayCollection(dp);
            this.dropDownlist.selectedIndex = 0;
        }
    };
    return DropDownListScreen;
})(egret.gui.SkinnableComponent);
DropDownListScreen.prototype.__class__ = "DropDownListScreen";
