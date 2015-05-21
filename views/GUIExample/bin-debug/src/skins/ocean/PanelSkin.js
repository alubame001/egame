var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var skins;
(function (skins) {
    var ocean;
    (function (ocean) {
        var PanelSkin = (function (_super) {
            __extends(PanelSkin, _super);
            function PanelSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["maxWidth", "minHeight", "minWidth"], [710, 230, 470]);
                this.elementsContent = [this.__3_i(), this.moveArea_i(), this.contentGroup_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            Object.defineProperty(PanelSkin.prototype, "skinParts", {
                get: function () {
                    return PanelSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            PanelSkin.prototype.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["percentHeight", "source", "percentWidth"], [100, "panel_headeback_png", 100]);
                return t;
            };
            PanelSkin.prototype.contentGroup_i = function () {
                var t = new egret.gui.Group();
                this.contentGroup = t;
                this.__s(t, ["bottom", "clipAndEnableScrolling", "left", "right", "top"], [0, true, 7, 7, 50]);
                return t;
            };
            PanelSkin.prototype.moveArea_i = function () {
                var t = new egret.gui.Group();
                this.moveArea = t;
                this.__s(t, ["height", "left", "right"], [50, 6, 6]);
                t.elementsContent = [this.__4_i(), this.titleDisplay_i()];
                return t;
            };
            PanelSkin.prototype.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["percentHeight", "source", "percentWidth"], [100, "panel_back_png", 100]);
                return t;
            };
            PanelSkin.prototype.titleDisplay_i = function () {
                var t = new egret.gui.Label();
                this.titleDisplay = t;
                this.__s(t, ["fontFamily", "left", "maxDisplayedLines", "minHeight", "right", "size", "textAlign", "textColor", "verticalAlign", "verticalCenter"], ["Tahoma", 5, 1, 28, 5, 26, "center", 0x727070, "middle", 0]);
                return t;
            };
            PanelSkin._skinParts = ["titleDisplay", "moveArea", "contentGroup"];
            return PanelSkin;
        })(egret.gui.Skin);
        ocean.PanelSkin = PanelSkin;
        PanelSkin.prototype.__class__ = "skins.ocean.PanelSkin";
    })(ocean = skins.ocean || (skins.ocean = {}));
})(skins || (skins = {}));
