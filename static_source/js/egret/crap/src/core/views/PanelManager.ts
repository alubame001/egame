  /**
    * 面板管理类
    * by dily
    * (c) copyright false,0,0,2014 - 2035
    * All Rights Reserved. 
    * 面板的管理类
    */
module PanelManager {

    var startPanel:StartPanel;
    var crapPanel:CrapPanel;
    var buttonPanel:ButtonPanel;
    var imgPanel:ImgPanel;
    var panelPanel:PanelPanel;
    var tipsPanel:TipsEffectPanel;	
    var scenePanel:ScenePanel;	
    var showTipsPanel:ShowTipsPanel;	
    var addFriendPanel:AddFriendPanel;	
    var setPanel:SetPanel;	
	// 初始化所有面板
	export function initPanel():void{ 

        Global.addEventListener(MainNotify.openStartPanelNotify,this.openStartPanel,this);
        Global.addEventListener(MainNotify.closeStartPanelNotify,this.closeStartPanel,this);


        Global.addEventListener(MainNotify.openCrapPanelNotify,this.openCrapPanel,this);
        Global.addEventListener(MainNotify.closeCrapPanelNotify,this.closeCrapPanel,this);

        Global.addEventListener(MainNotify.openButtonPanelNotify,this.openButtonPanel,this);
        Global.addEventListener(MainNotify.closeButtonPanelNotify,this.closeButtonPanel,this);

        Global.addEventListener(MainNotify.openImgPanelNotify,this.openImgPanel,this);
        Global.addEventListener(MainNotify.closeImgPanelNotify,this.closeImgPanel,this);

        Global.addEventListener(MainNotify.openPanelPanelNotify,this.openPanelPanel,this);
        Global.addEventListener(MainNotify.closePanelPanelNotify,this.closePanelPanel,this);

        Global.addEventListener(MainNotify.openTipsPanelNotify,this.openTipsPanel,this);
        Global.addEventListener(MainNotify.closeTipsPanelNotify,this.closeTipsPanel,this);

        Global.addEventListener(MainNotify.openScenePanelNotify,this.openScenePanel,this);
        Global.addEventListener(MainNotify.closeScenePanelNotify,this.closeScenePanel,this);

        Global.addEventListener(MainNotify.openShowTipsPanelNotify,this.openShowTipsPanel,this);
        Global.addEventListener(MainNotify.closeShowTipsPanelNotify,this.closeShowTipsPanel,this);

        Global.addEventListener(MainNotify.openAddFriendPanelNotify,this.openAddFriendPanel,this);
        Global.addEventListener(MainNotify.closeAddFriendPanelNotify,this.closeAddFriendPanel,this);

        Global.addEventListener(MainNotify.openSetPanelNotify,this.openSetPanel,this);
        Global.addEventListener(MainNotify.closeSetPanelNotify,this.closeSetPanel,this);

	} 

	// 打开开始界面
	export function openStartPanel():void{ 
		if(this.startPanel == null){
			this.startPanel = new StartPanel();
			PopUpManager.addPopUp(this.startPanel,false,0,0,0);
		}
	} 
	// 关闭开始界面
	export function closeStartPanel():void{ 
		if(this.startPanel != null){
			PopUpManager.removePopUp(this.startPanel,3);
			this.startPanel = null;
		}
	} 



	// 打开CRAP界面  
	export function openCrapPanel():void{ 
		if(this.crapPanel == null){
			this.crapPanel = new CrapPanel();
			PopUpManager.addPopUp(this.crapPanel,false,0,0,0);
		}
	} 
	// 关闭CRAP界面
	export function closeCrapPanel():void{ 
		if(this.crapPanel != null){
			PopUpManager.removePopUp(this.crapPanel,3);
			this.crapPanel = null;
		}
	} 


	export function openButtonPanel():void{ 
		if(this.buttonPanel == null){
			this.buttonPanel = new ButtonPanel();
			PopUpManager.addPopUp(this.buttonPanel,false,0,0,3);
		}
	} 
	export function closeButtonPanel():void{ 
		if(this.buttonPanel != null){
			PopUpManager.removePopUp(this.buttonPanel,3);
			this.buttonPanel = null;
		}
	} 

	export function openImgPanel():void{ 
		if(this.imgPanel == null){
			this.imgPanel = new ImgPanel();
			PopUpManager.addPopUp(this.imgPanel,false,0,0,3);
		}
	} 
	export function closeImgPanel():void{ 
		if(this.imgPanel != null){
			PopUpManager.removePopUp(this.imgPanel,3);
			this.imgPanel = null;
		}
	} 

	export function openPanelPanel():void{ 
		if(this.panelPanel == null){
			this.panelPanel = new PanelPanel();
			PopUpManager.addPopUp(this.panelPanel,false,0,0,3);
		}
	} 
	export function closePanelPanel():void{ 
		if(this.panelPanel != null){
			PopUpManager.removePopUp(this.panelPanel,3);
			this.panelPanel = null;
		}
	} 

	export function openTipsPanel():void{ 
		if(this.tipsPanel == null){
			this.tipsPanel = new TipsEffectPanel();
			PopUpManager.addPopUp(this.tipsPanel,false,0,0,3);
		}
	} 
	export function closeTipsPanel():void{ 
		if(this.tipsPanel != null){
			PopUpManager.removePopUp(this.tipsPanel,3);
			this.tipsPanel = null;
		}
	} 

	export function openScenePanel(e):void{ 
		if(this.scenePanel == null){
			var type:number = e.param;
			this.scenePanel = new ScenePanel();
			PopUpManager.addPopUp(this.scenePanel,false,0,0,type);
		}
	} 
	export function closeScenePanel():void{ 
		if(this.scenePanel != null){
			PopUpManager.removePopUp(this.scenePanel,0);
			this.scenePanel = null;
		}
	} 

	export function openShowTipsPanel(e):void{ 
		if(this.showTipsPanel == null){
			var type:number = e.param;
			this.showTipsPanel = new ShowTipsPanel();
			PopUpManager.addPopUp(this.showTipsPanel,false,0,0,type);
		}
	} 
	export function closeShowTipsPanel():void{ 
		if(this.showTipsPanel != null){
			PopUpManager.removePopUp(this.showTipsPanel,0);
			this.showTipsPanel = null;
		}
	} 

	export function openAddFriendPanel(e):void{ 
		if(this.addFriendPanel == null){
			var type:number = e.param;
			this.addFriendPanel = new AddFriendPanel();
			PopUpManager.addPopUp(this.addFriendPanel,true,439,615,type);
		}
	} 
	export function closeAddFriendPanel(e):void{ 
		if(this.addFriendPanel != null){
			var type:number = e.param;
			PopUpManager.removePopUp(this.addFriendPanel,type);
			this.addFriendPanel = null;
		}
	} 

	export function openSetPanel(e):void{ 
		if(this.setPanel == null){
			var type:number = e.param;
			this.setPanel = new SetPanel();
			PopUpManager.addPopUp(this.setPanel,true,359,252,type);
		}
	} 
	export function closeSetPanel(e):void{ 
		if(this.setPanel != null){
			var type:number = e.param;
			PopUpManager.removePopUp(this.setPanel,type);
			this.setPanel = null;
		}
	} 
}


