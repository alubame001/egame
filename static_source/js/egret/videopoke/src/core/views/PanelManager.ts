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
    var wheelPanel:CrapPanel;
    var lottery28Panel:CrapPanel;
    var fishPanel:FishPanel;
    var buttonPanel:ButtonPanel;
    var imgPanel:ImgPanel;
    var panelPanel:PanelPanel;
    var tipsPanel:TipsEffectPanel;	
    var scenePanel:ScenePanel;	
    var showTipsPanel:ShowTipsPanel;	
    var addFriendPanel:AddFriendPanel;	
    var setPanel:SetPanel;	
    var darkSlotPanel:GamePanel;	
    var titanSlotPanel:GamePanel;	
	// 初始化所有面板
	export function initPanel():void{ 

        Global.addEventListener(MainNotify.openStartPanelNotify,this.openStartPanel,this);
        Global.addEventListener(MainNotify.closeStartPanelNotify,this.closeStartPanel,this);

        Global.addEventListener(MainNotify.openWheelPanelNotify,this.openWheelPanel,this);
        Global.addEventListener(MainNotify.closeWheelPanelNotify,this.closeWheelPanel,this);

        
        Global.addEventListener(MainNotify.openLottery28PanelNotify,this.openLottery28Panel,this);
        Global.addEventListener(MainNotify.closeLottery28PanelNotify,this.closeLottery28Panel,this);



        Global.addEventListener(MainNotify.openCrapPanelNotify,this.openCrapPanel,this);
        Global.addEventListener(MainNotify.closeCrapPanelNotify,this.closeCrapPanel,this);

        Global.addEventListener(MainNotify.openFishPanelNotify,this.openFishPanel,this);
        Global.addEventListener(MainNotify.closeFishPanelNotify,this.closeFishPanel,this);        

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

		Global.addEventListener(MainNotify.openDarkSlotPanelNotify,this.openDarkSlotPanel,this);
		Global.addEventListener(MainNotify.closeDarkSlotPanelNotify,this.closeDarkSlotPanel,this);    

		Global.addEventListener(MainNotify.openTitanSlotPanelNotify,this.openTitanSlotPanel,this);
		Global.addEventListener(MainNotify.closeTitanSlotPanelNotify,this.closeTitanSlotPanel,this);    


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

	// 打开DarkSlot界面
	export function openDarkSlotPanel():void{ 
		if(this.darkSlotPanel == null){
			this.darkSlotPanel = new DarkSlotPanel();
			PopUpManager.addPopUp(this.darkSlotPanel,false,0,0,0);
		}
	} 
	// 关闭开始界面
	export function closeDarkSlotPanel():void{ 
		if(this.darkSlotPanel != null){
			PopUpManager.removePopUp(this.darkSlotPanel,3);
			this.darkSlotPanel = null;
		}
	} 


	export function openTitanSlotPanel():void{ 
		if(this.titanSlotPanel == null){
			this.titanSlotPanel = new TitanSlotPanel();
			PopUpManager.addPopUp(this.titanSlotPanel,false,0,0,0);
		}
	} 

	export function closeTitanSlotPanel():void{ 
		if(this.titanSlotPanel != null){
			PopUpManager.removePopUp(this.titanSlotPanel,3);
			this.titanSlotPanel = null;
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

    // 打开Wheel界面  
    export function openWheelPanel():void{ 
        if(this.wheelPanel == null){
            this.wheelPanel = new WheelPanel();
            PopUpManager.addPopUp(this.wheelPanel,false,0,0,0);
        }
    } 
    // 关闭Wheel界面
    export function closeWheelPanel():void{ 
        if(this.wheelPanel != null){
            PopUpManager.removePopUp(this.wheelPanel,3);
            this.wheelPanel = null;
        }
    } 



    // 打开Wheel界面  
    export function openLottery28Panel():void{ 
        if(this.lottery28Panel == null){
            this.lottery28Panel = new Lottery28Panel();
            PopUpManager.addPopUp(this.lottery28Panel,false,0,0,0);
        }
    } 
    // 关闭Wheel界面
    export function closeLottery28Panel():void{ 
        if(this.lottery28Panel != null){
            PopUpManager.removePopUp(this.lottery28Panel,3);
            this.lottery28Panel = null;
        }
    } 



    // 打开Fish界面  
    export function openFishPanel():void{ 
        if(this.fishPanel == null){
            this.fishPanel = new FishPanel();
            PopUpManager.addPopUp(this.fishPanel,false,0,0,0);
        }
    } 
    // 关闭Fish界面
    export function closeFishPanel():void{ 
        if(this.fishPanel != null){
            PopUpManager.removePopUp(this.fishPanel,3);
            this.fishPanel = null;
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


