/**
  * 面板管理类
  * by dily
  * (c) copyright false,0,0,2014 - 2035
  * All Rights Reserved.
  * 面板的管理类
  */
var PanelManager;
(function (PanelManager) {
    var startPanel;
    var crapPanel;
    var wheelPanel;
    var lottery28Panel;
    var fishPanel;
    var buttonPanel;
    var imgPanel;
    var panelPanel;
    var tipsPanel;
    var scenePanel;
    var showTipsPanel;
    var addFriendPanel;
    var setPanel;
    var darkSlotPanel;
    var titanSlotPanel;
    // 初始化所有面板
    function initPanel() {
        Global.addEventListener(MainNotify.openStartPanelNotify, this.openStartPanel, this);
        Global.addEventListener(MainNotify.closeStartPanelNotify, this.closeStartPanel, this);
        Global.addEventListener(MainNotify.openWheelPanelNotify, this.openWheelPanel, this);
        Global.addEventListener(MainNotify.closeWheelPanelNotify, this.closeWheelPanel, this);
        Global.addEventListener(MainNotify.openLottery28PanelNotify, this.openLottery28Panel, this);
        Global.addEventListener(MainNotify.closeLottery28PanelNotify, this.closeLottery28Panel, this);
        Global.addEventListener(MainNotify.openCrapPanelNotify, this.openCrapPanel, this);
        Global.addEventListener(MainNotify.closeCrapPanelNotify, this.closeCrapPanel, this);
        Global.addEventListener(MainNotify.openFishPanelNotify, this.openFishPanel, this);
        Global.addEventListener(MainNotify.closeFishPanelNotify, this.closeFishPanel, this);
        Global.addEventListener(MainNotify.openButtonPanelNotify, this.openButtonPanel, this);
        Global.addEventListener(MainNotify.closeButtonPanelNotify, this.closeButtonPanel, this);
        Global.addEventListener(MainNotify.openImgPanelNotify, this.openImgPanel, this);
        Global.addEventListener(MainNotify.closeImgPanelNotify, this.closeImgPanel, this);
        Global.addEventListener(MainNotify.openPanelPanelNotify, this.openPanelPanel, this);
        Global.addEventListener(MainNotify.closePanelPanelNotify, this.closePanelPanel, this);
        Global.addEventListener(MainNotify.openTipsPanelNotify, this.openTipsPanel, this);
        Global.addEventListener(MainNotify.closeTipsPanelNotify, this.closeTipsPanel, this);
        Global.addEventListener(MainNotify.openScenePanelNotify, this.openScenePanel, this);
        Global.addEventListener(MainNotify.closeScenePanelNotify, this.closeScenePanel, this);
        Global.addEventListener(MainNotify.openShowTipsPanelNotify, this.openShowTipsPanel, this);
        Global.addEventListener(MainNotify.closeShowTipsPanelNotify, this.closeShowTipsPanel, this);
        Global.addEventListener(MainNotify.openAddFriendPanelNotify, this.openAddFriendPanel, this);
        Global.addEventListener(MainNotify.closeAddFriendPanelNotify, this.closeAddFriendPanel, this);
        Global.addEventListener(MainNotify.openSetPanelNotify, this.openSetPanel, this);
        Global.addEventListener(MainNotify.closeSetPanelNotify, this.closeSetPanel, this);
        Global.addEventListener(MainNotify.openDarkSlotPanelNotify, this.openDarkSlotPanel, this);
        Global.addEventListener(MainNotify.closeDarkSlotPanelNotify, this.closeDarkSlotPanel, this);
        Global.addEventListener(MainNotify.openTitanSlotPanelNotify, this.openTitanSlotPanel, this);
        Global.addEventListener(MainNotify.closeTitanSlotPanelNotify, this.closeTitanSlotPanel, this);
    }
    PanelManager.initPanel = initPanel;
    // 打开开始界面
    function openStartPanel() {
        if (this.startPanel == null) {
            this.startPanel = new StartPanel();
            PopUpManager.addPopUp(this.startPanel, false, 0, 0, 0);
        }
    }
    PanelManager.openStartPanel = openStartPanel;
    // 关闭开始界面
    function closeStartPanel() {
        if (this.startPanel != null) {
            PopUpManager.removePopUp(this.startPanel, 3);
            this.startPanel = null;
        }
    }
    PanelManager.closeStartPanel = closeStartPanel;
    // 打开DarkSlot界面
    function openDarkSlotPanel() {
        if (this.darkSlotPanel == null) {
            this.darkSlotPanel = new DarkSlotPanel();
            PopUpManager.addPopUp(this.darkSlotPanel, false, 0, 0, 0);
        }
    }
    PanelManager.openDarkSlotPanel = openDarkSlotPanel;
    // 关闭开始界面
    function closeDarkSlotPanel() {
        if (this.darkSlotPanel != null) {
            PopUpManager.removePopUp(this.darkSlotPanel, 3);
            this.darkSlotPanel = null;
        }
    }
    PanelManager.closeDarkSlotPanel = closeDarkSlotPanel;
    function openTitanSlotPanel() {
        if (this.titanSlotPanel == null) {
            this.titanSlotPanel = new TitanSlotPanel();
            PopUpManager.addPopUp(this.titanSlotPanel, false, 0, 0, 0);
        }
    }
    PanelManager.openTitanSlotPanel = openTitanSlotPanel;
    function closeTitanSlotPanel() {
        if (this.titanSlotPanel != null) {
            PopUpManager.removePopUp(this.titanSlotPanel, 3);
            this.titanSlotPanel = null;
        }
    }
    PanelManager.closeTitanSlotPanel = closeTitanSlotPanel;
    // 打开CRAP界面  
    function openCrapPanel() {
        if (this.crapPanel == null) {
            this.crapPanel = new CrapPanel();
            PopUpManager.addPopUp(this.crapPanel, false, 0, 0, 0);
        }
    }
    PanelManager.openCrapPanel = openCrapPanel;
    // 关闭CRAP界面
    function closeCrapPanel() {
        if (this.crapPanel != null) {
            PopUpManager.removePopUp(this.crapPanel, 3);
            this.crapPanel = null;
        }
    }
    PanelManager.closeCrapPanel = closeCrapPanel;
    // 打开Wheel界面  
    function openWheelPanel() {
        if (this.wheelPanel == null) {
            this.wheelPanel = new WheelPanel();
            PopUpManager.addPopUp(this.wheelPanel, false, 0, 0, 0);
        }
    }
    PanelManager.openWheelPanel = openWheelPanel;
    // 关闭Wheel界面
    function closeWheelPanel() {
        if (this.wheelPanel != null) {
            PopUpManager.removePopUp(this.wheelPanel, 3);
            this.wheelPanel = null;
        }
    }
    PanelManager.closeWheelPanel = closeWheelPanel;
    // 打开Wheel界面  
    function openLottery28Panel() {
        if (this.lottery28Panel == null) {
            this.lottery28Panel = new Lottery28Panel();
            PopUpManager.addPopUp(this.lottery28Panel, false, 0, 0, 0);
        }
    }
    PanelManager.openLottery28Panel = openLottery28Panel;
    // 关闭Wheel界面
    function closeLottery28Panel() {
        if (this.lottery28Panel != null) {
            PopUpManager.removePopUp(this.lottery28Panel, 3);
            this.lottery28Panel = null;
        }
    }
    PanelManager.closeLottery28Panel = closeLottery28Panel;
    // 打开Fish界面  
    function openFishPanel() {
        if (this.fishPanel == null) {
            this.fishPanel = new FishPanel();
            PopUpManager.addPopUp(this.fishPanel, false, 0, 0, 0);
        }
    }
    PanelManager.openFishPanel = openFishPanel;
    // 关闭Fish界面
    function closeFishPanel() {
        if (this.fishPanel != null) {
            PopUpManager.removePopUp(this.fishPanel, 3);
            this.fishPanel = null;
        }
    }
    PanelManager.closeFishPanel = closeFishPanel;
    function openButtonPanel() {
        if (this.buttonPanel == null) {
            this.buttonPanel = new ButtonPanel();
            PopUpManager.addPopUp(this.buttonPanel, false, 0, 0, 3);
        }
    }
    PanelManager.openButtonPanel = openButtonPanel;
    function closeButtonPanel() {
        if (this.buttonPanel != null) {
            PopUpManager.removePopUp(this.buttonPanel, 3);
            this.buttonPanel = null;
        }
    }
    PanelManager.closeButtonPanel = closeButtonPanel;
    function openImgPanel() {
        if (this.imgPanel == null) {
            this.imgPanel = new ImgPanel();
            PopUpManager.addPopUp(this.imgPanel, false, 0, 0, 3);
        }
    }
    PanelManager.openImgPanel = openImgPanel;
    function closeImgPanel() {
        if (this.imgPanel != null) {
            PopUpManager.removePopUp(this.imgPanel, 3);
            this.imgPanel = null;
        }
    }
    PanelManager.closeImgPanel = closeImgPanel;
    function openPanelPanel() {
        if (this.panelPanel == null) {
            this.panelPanel = new PanelPanel();
            PopUpManager.addPopUp(this.panelPanel, false, 0, 0, 3);
        }
    }
    PanelManager.openPanelPanel = openPanelPanel;
    function closePanelPanel() {
        if (this.panelPanel != null) {
            PopUpManager.removePopUp(this.panelPanel, 3);
            this.panelPanel = null;
        }
    }
    PanelManager.closePanelPanel = closePanelPanel;
    function openTipsPanel() {
        if (this.tipsPanel == null) {
            this.tipsPanel = new TipsEffectPanel();
            PopUpManager.addPopUp(this.tipsPanel, false, 0, 0, 3);
        }
    }
    PanelManager.openTipsPanel = openTipsPanel;
    function closeTipsPanel() {
        if (this.tipsPanel != null) {
            PopUpManager.removePopUp(this.tipsPanel, 3);
            this.tipsPanel = null;
        }
    }
    PanelManager.closeTipsPanel = closeTipsPanel;
    function openScenePanel(e) {
        if (this.scenePanel == null) {
            var type = e.param;
            this.scenePanel = new ScenePanel();
            PopUpManager.addPopUp(this.scenePanel, false, 0, 0, type);
        }
    }
    PanelManager.openScenePanel = openScenePanel;
    function closeScenePanel() {
        if (this.scenePanel != null) {
            PopUpManager.removePopUp(this.scenePanel, 0);
            this.scenePanel = null;
        }
    }
    PanelManager.closeScenePanel = closeScenePanel;
    function openShowTipsPanel(e) {
        if (this.showTipsPanel == null) {
            var type = e.param;
            this.showTipsPanel = new ShowTipsPanel();
            PopUpManager.addPopUp(this.showTipsPanel, false, 0, 0, type);
        }
    }
    PanelManager.openShowTipsPanel = openShowTipsPanel;
    function closeShowTipsPanel() {
        if (this.showTipsPanel != null) {
            PopUpManager.removePopUp(this.showTipsPanel, 0);
            this.showTipsPanel = null;
        }
    }
    PanelManager.closeShowTipsPanel = closeShowTipsPanel;
    function openAddFriendPanel(e) {
        if (this.addFriendPanel == null) {
            var type = e.param;
            this.addFriendPanel = new AddFriendPanel();
            PopUpManager.addPopUp(this.addFriendPanel, true, 439, 615, type);
        }
    }
    PanelManager.openAddFriendPanel = openAddFriendPanel;
    function closeAddFriendPanel(e) {
        if (this.addFriendPanel != null) {
            var type = e.param;
            PopUpManager.removePopUp(this.addFriendPanel, type);
            this.addFriendPanel = null;
        }
    }
    PanelManager.closeAddFriendPanel = closeAddFriendPanel;
    function openSetPanel(e) {
        if (this.setPanel == null) {
            var type = e.param;
            this.setPanel = new SetPanel();
            PopUpManager.addPopUp(this.setPanel, true, 359, 252, type);
        }
    }
    PanelManager.openSetPanel = openSetPanel;
    function closeSetPanel(e) {
        if (this.setPanel != null) {
            var type = e.param;
            PopUpManager.removePopUp(this.setPanel, type);
            this.setPanel = null;
        }
    }
    PanelManager.closeSetPanel = closeSetPanel;
})(PanelManager || (PanelManager = {}));
