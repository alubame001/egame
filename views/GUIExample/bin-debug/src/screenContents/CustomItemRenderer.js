var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by yn on 2014/9/10.
 */
var CustomItemRenderer = (function (_super) {
    __extends(CustomItemRenderer, _super);
    function CustomItemRenderer() {
        _super.call(this);
        this.hostComponentKey = "CustomItemRender";
    }
    CustomItemRenderer.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
        if (instance == this.toggleSwitch)
            this.toggleSwitch.addEventListener(egret.Event.CHANGE, this.touchDown, this);
    };
    CustomItemRenderer.prototype.touchDown = function (event) {
        this.data.toggle = this.toggleSwitch.selected;
    };
    CustomItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.toggleSwitch) {
            this.toggleSwitch.selected = this.data.toggle;
        }
    };
    return CustomItemRenderer;
})(egret.gui.ItemRenderer);
CustomItemRenderer.prototype.__class__ = "CustomItemRenderer";
