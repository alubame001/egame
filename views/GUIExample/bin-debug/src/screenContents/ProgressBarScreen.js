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
var ProgressBarScreen = (function (_super) {
    __extends(ProgressBarScreen, _super);
    function ProgressBarScreen() {
        _super.call(this);
        this.skinName = "screenContentSkins.ProgressBarScreenSkin";
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removed, this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.added, this);
    }
    ProgressBarScreen.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
        if (instance == this.hProgressBar1) {
            this.tweenBar1 = egret.Tween.get(this.hProgressBar1, { loop: true });
            this.tweenBar1.to({ value: 100 }, 3000);
        }
        if (instance == this.hProgressBar2) {
            this.tweenBar2 = egret.Tween.get(this.hProgressBar2, { loop: true });
            this.tweenBar2.to({ value: 100 }, 3000);
        }
        if (instance == this.vProgressBar) {
            this.tweenVBar = egret.Tween.get(this.vProgressBar, { loop: true });
            this.tweenVBar.to({ value: 100 }, 3000);
        }
    };
    ProgressBarScreen.prototype.removed = function (e) {
        this.stopEffect();
    };
    ProgressBarScreen.prototype.added = function (e) {
        this.startEffect();
    };
    ProgressBarScreen.prototype.startEffect = function () {
        if (this.tweenBar1) {
            this.tweenBar1.setPaused(false);
        }
        if (this.tweenBar2) {
            this.tweenBar2.setPaused(false);
            ;
        }
        if (this.tweenVBar) {
            this.tweenVBar.setPaused(false);
            ;
        }
    };
    ProgressBarScreen.prototype.stopEffect = function () {
        if (this.tweenBar1) {
            this.tweenBar1.setPaused(true);
        }
        if (this.tweenBar2) {
            this.tweenBar2.setPaused(true);
        }
        if (this.tweenVBar) {
            this.tweenVBar.setPaused(true);
        }
    };
    return ProgressBarScreen;
})(egret.gui.SkinnableComponent);
ProgressBarScreen.prototype.__class__ = "ProgressBarScreen";
