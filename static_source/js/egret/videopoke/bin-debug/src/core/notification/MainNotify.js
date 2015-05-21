/**
  * 游戏配置文件
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved.
  * 存放游戏的配置数据
  * 比如：游戏界面尺寸、分享随机百分比、获取系统数据
  */
var MainNotify;
(function (MainNotify) {
    //横屏竖屏切换
    MainNotify.onOrientationChange = "onOrientationChange";
    //陀螺仪监听
    MainNotify.onDeviceOrientation = "onDeviceOrientation";
    //摇一摇监听
    MainNotify.onDeviceMotion = "onDeviceMotion";
    //关闭提示
    MainNotify.closeAlertNotify = "closeAlertNotify";
    /**面板开关事件*/
    //打开开始界面
    MainNotify.openStartPanelNotify = "openStartPanelNotify";
    //关闭开始界面
    MainNotify.closeStartPanelNotify = "closeStartPanelNotify";
    MainNotify.openCrapPanelNotify = "openCrapPanelNotify";
    MainNotify.closeCrapPanelNotify = "closeCrapPanelNotify";
    MainNotify.openWheelPanelNotify = "openWheelPanelNotify";
    MainNotify.closeWheelPanelNotify = "closeWheelPanelNotify";
    MainNotify.openLottery28PanelNotify = "openLottery28PanelNotify";
    MainNotify.closeLottery28PanelNotify = "closeLottery28PanelNotify";
    MainNotify.openFishPanelNotify = "openFishPanelNotify";
    MainNotify.closeFishPanelNotify = "closeFishPanelNotify";
    //打开游戏界面
    MainNotify.openGamePanelNotify = "openGamePanelNotify";
    //关闭游戏界面
    MainNotify.closeGamePanelNotify = "closeGamePanelNotify";
    //打开结束界面
    MainNotify.openGameOverPanelNotify = "openGameOverPanelNotify";
    //关闭结束界面
    MainNotify.closeGameOverPanelNotify = "closeGameOverPanelNotify";
    //打开分享界面
    MainNotify.openSharePanelNotify = "openSharePanelNotify";
    //关闭分享界面
    MainNotify.closeSharePanelNotify = "closeSharePanelNotify";
    //打开设置界面
    MainNotify.openSetPanelNotify = "openSetPanelNotify";
    //关闭设置界面
    MainNotify.closeSetPanelNotify = "closeSetPanelNotify";
    //打开提示界面
    MainNotify.openAlertPanelNotify = "openAlertPanelNotify";
    //关闭提示界面
    MainNotify.closeAlertPanelNotify = "closeAlertPanelNotify";
    MainNotify.openButtonPanelNotify = "openButtonPanelNotify";
    MainNotify.closeButtonPanelNotify = "closeButtonPanelNotify";
    MainNotify.openImgPanelNotify = "openImgPanelNotify";
    MainNotify.closeImgPanelNotify = "closeImgPanelNotify";
    MainNotify.openPanelPanelNotify = "openPanelPanelNotify";
    MainNotify.closePanelPanelNotify = "closePanelPanelNotify";
    MainNotify.openTipsPanelNotify = "openTipsPanelNotify";
    MainNotify.closeTipsPanelNotify = "closeTipsPanelNotify";
    MainNotify.openScenePanelNotify = "openScenePanelNotify";
    MainNotify.closeScenePanelNotify = "closeScenePanelNotify";
    MainNotify.openShowTipsPanelNotify = "openShowTipsPanelNotify";
    MainNotify.closeShowTipsPanelNotify = "closeShowTipsPanelNotify";
    MainNotify.openAddFriendPanelNotify = "openAddFriendPanelNotify";
    MainNotify.closeAddFriendPanelNotify = "closeAddFriendPanelNotify";
    MainNotify.openSetPanelNotify = "openSetPanelNotify";
    MainNotify.closeSetPanelNotify = "closeSetPanelNotify";
})(MainNotify || (MainNotify = {}));
