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
var LayoutScreen = (function (_super) {
    __extends(LayoutScreen, _super);
    function LayoutScreen() {
        _super.call(this);
        this.skinName = "screenContentSkins.LayoutScreenSkin";
    }
    LayoutScreen.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
        if (instance == this.topCheck || instance == this.topLeftCheck || instance == this.topRightCheck || instance == this.leftChcek || instance == this.leftTopCheck || instance == this.leftBottomCheck) {
            instance.addEventListener(egret.Event.CHANGE, this.onCheckBoxChangeHandler, this);
        }
    };
    /*
    * 设置对象的显示状态
    * */
    LayoutScreen.prototype.onCheckBoxChangeHandler = function (e) {
        this.panel.x = 50;
        this.panel.y = 50;
        this.panel.width = 200;
        this.panel.height = 200;
        this.panel.top = this.leftTopCheck.selected ? 0 : NaN;
        this.panel.left = this.topLeftCheck.selected ? 0 : NaN;
        this.panel.right = this.topRightCheck.selected ? 0 : NaN;
        this.panel.bottom = this.leftBottomCheck.selected ? 0 : NaN;
        this.panel.horizontalCenter = this.topCheck.selected ? 0 : NaN;
        this.panel.verticalCenter = this.leftChcek.selected ? 0 : NaN;
        this.vleftLine.visible = this.topLeftCheck.selected ? true : false;
        this.vMiddleLine.visible = this.topCheck.selected ? true : false;
        this.vRightLine.visible = this.topRightCheck.selected ? true : false;
        this.hTopLine.visible = this.leftTopCheck.selected ? true : false;
        this.hMiddleLine.visible = this.leftChcek.selected ? true : false;
        this.hBottomLine.visible = this.leftBottomCheck.selected ? true : false;
    };
    return LayoutScreen;
})(egret.gui.SkinnableComponent);
LayoutScreen.prototype.__class__ = "LayoutScreen";
