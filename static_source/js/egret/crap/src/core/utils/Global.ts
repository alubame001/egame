  /**
	* 游戏公用方法汇总
	* by dily
	* (c) copyright 2014 - 2035
	* All Rights Reserved. 
	* 使用方法如：Global.setCookie()
    */

module Global {
	//等待界面，主要用在通讯等待展示
	export var waitPanel:WaitPanel;
	//竖屏提示界面，主要用在横屏游戏竖屏展示
	export var verticalTipsPanel:VerticalTipsPanel;
	Global.waitPanel;
    //竖屏提示界面，主要用在横屏游戏竖屏展示
    Global.verticalTipsPanel;
    //多平台分享组件主要针对 微信、微博、qqzone、qq
    //一键分享到新浪微博、腾讯微博、qq空间等代码


	// 储存数据需要key和value，都必须是字符串
	// var key:string = "bestscore";
	// var value:string = "95";
	// egret.localStorage.setItem(key,value);
	// 这样就把数据存在本地了.

	// 读取数据
	// var score:string = egret.localStorage.getItem(key);

	// 删除数据
	// egret.localStorage.removeItem(key);

	// 将所有数据清空
	// egret.localStorage.clear();

	// 在游戏初始化的地方增加如下代码
	// this.stage.addChild(GameConfig.gameScene());

	//新建事件
	export function Event(type:string, obj:Object = null, bubbles:boolean = false, cancelable:boolean = false):egret.Event
	{ 
		 return new lcp.LEvent(type,obj,bubbles,cancelable); 
	}

	//派发事件
	export function dispatchEvent(type:string, obj:Object = null, bubbles:boolean = false, cancelable:boolean = false):void
	{ 	
		var event = new lcp.LEvent(type,obj,bubbles,cancelable);
		lcp.LListener.getInstance().dispatchEvent(event);
	}

	//监听事件
	export function addEventListener(type:string,listener:Function,thisObject:any,useCapture:boolean=false,priority:number=0):void
	{ 
		lcp.LListener.getInstance().addEventListener(type,listener,thisObject,useCapture,priority);
	}

	//存储cookies 存储临时数据如最高分最低分之类的
	export function setCookie(name,value):void
	{ 
		document.cookie = name + "="+ value; 
	} 

	//读取cookies 读取临时数据如最高分最低分之类的
	export function getCookie(name):string
	{ 
	    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	 
	    if(arr=document.cookie.match(reg))
	 
	        return arr[2]; 
	    else 
	        return null; 
	} 

	//一键分享到新浪微博、腾讯微博、qq空间等代码
	export function share(type,title,url,imgUrl):void
	{ 
		if(type == 1){
		    //分享到新浪微博
			var sharesinastring:string='http://v.t.sina.com.cn/share/share.php?title='+title+'&url='+url+'&content=utf-8&sourceUrl='+url+'&pic='+imgUrl;
			window.open(sharesinastring,'newwindow','height=400,width=400,top=100,left=100');
		}else if(type == 2){
			//分享到疼讯微博
			var shareqqstring:string='http://v.t.qq.com/share/share.php?title='+title+'&url='+url+'&pic='+imgUrl;
			window.open(shareqqstring,'newwindow','height=100,width=100,top=100,left=100');
		}else if(type == 3){
			//分享到QQ空间
			var shareqqzonestring:string='http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary='+title+'&url='+url+'&pics='+imgUrl;
			window.open(shareqqzonestring,'newwindow','height=400,width=400,top=100,left=100');
		// }else if(type == 4){

		}

	} 

	//通过微信分享api
	export function shareToWeiXin(title,desc,link,imgUrl,backFun:Function = null):void {//微信分享
      /*
        WeixinApi.ready(function(api:WeixinApi){
            var info:WeixinShareInfo = new WeixinShareInfo();
            info.title = title;//分享的标题 长度不能超过512字节
            info.desc = desc;//分享的内容 长度不能超过1K
            info.link = link;//分享的连接
            info.imgUrl = imgUrl; //分享图片的地址 图片大小不能超过32k

            var backInfo:WeixinShareCallbackInfo = new WeixinShareCallbackInfo();
            if(backFun != null){
            	backInfo.confirm = backFun;
            }

            api.shareToFriend(info,backInfo);
            api.shareToTimeline(info,backInfo);
        })
  */
    } 

	//调用摄像头
	export function getCamera():void {
      
    } 

	//调用麦克风
	export function getMic():void {
      
    } 

	//调用canvas截屏
	export function getScreen():void {
      
    } 	

	//调用打电话功能
	export function callPhone(telNum:number):void {
    	window.open("tel:"+telNum,'_self') 
    } 	

	//调用发短信功能
	export function sendMessage(telNum:number):void {
    	window.open("sms:"+telNum,'_self') 
    } 	

	//获取当前地址
	export function getCurUrl():string {
		return window.location.href;
    } 	

    var _alert:AlertPanel;
 	//提示框
    /**
    * titleStr       标题
    * descStr        描述
    * acceptFun      确认方法
    * effectType        0：没有动画 1:从中间轻微弹出 2：从中间猛烈弹出  3：从左向右 4：从右向左 5、从上到下 6、从下到上
    */
	export function alert(titleStr:string = "",descStr:string = "",acceptFun:Function = null,effectType:number = 1):void {
		if(this._alert == null){
			this._alert = new AlertPanel(titleStr,descStr,null,acceptFun);
			PopUpManager.addPopUp(this._alert,true,this._alert.getWidth(),this._alert.getHeight(),effectType,true);
			Global.addEventListener(MainNotify.closeAlertNotify,this.closeAlertPanel,this);
		}	
    } 

 	//确认框
    /**
    * titleStr       标题
    * descStr        描述
    * cancelFun      取消方法
    * acceptFun      确认方法
    * effectType        0：没有动画 1:从中间轻微弹出 2：从中间猛烈弹出  3：从左向右 4：从右向左 5、从上到下 6、从下到上
    */
	export function confirm(titleStr:string = "",descStr:string = "",cancelFun:Function = null,acceptFun:Function = null,effectType:number = 1):void {
		if(this._alert == null){
			this._alert = new AlertPanel(titleStr,descStr,cancelFun,acceptFun,2);
			PopUpManager.addPopUp(this._alert,true,this._alert.getWidth(),this._alert.getHeight(),effectType,true);
			Global.addEventListener(MainNotify.closeAlertNotify,this.closeAlertPanel,this);
		}	
    } 	

	//关闭alert方法
	export function closeAlertPanel():void {
		if(this._alert != null){
			PopUpManager.removePopUp(this._alert,1);
			this._alert = null;
		}	    	
	}
}