  /**
	* 游戏配置文件
	* by dily
	* (c) copyright 2014 - 2035
	* All Rights Reserved. 
	* 存放游戏的配置数据
	* 比如：游戏界面尺寸、分享随机百分比、获取系统数据
    */
module GameConfig {

	//是否调试显示帧频
	// 以下语句写在游戏初始化方法里
     if(GameConfig.isDebug){
         egret.Profiler.getInstance().run();
     }

	export var isDebug:boolean = true;

	//是否在线
	export var isOnLine:boolean = navigator.onLine;
	
	//全局字体颜色表--可以扩展
	export var TextColors = {
		white:0xFFFFFF,//白色
		milkWhite:0xfbf1af,//乳白色 
		grayWhite:0xceb6a2,//灰白色
		yellow:0xffff00,//金黄色 
		lightYellow:0xffd375,//淡黄色
		orangeYellow:0xff9900,//橘黄色//道具名称 //玩家姓名
		red:0xf11300,//红色
		green:0x00e500,//绿色 
		blue:0x1a94d7,//蓝色 
		grayBlue:0x2f5177,//墨蓝色 
		purple:0xe938f2,//紫色 
		pink:0xFF3030,//粉色 
		black:0x2e2d2d,//黑色
		golden:0xFFD700 //金色
	}

	//全局字体大小表--可以扩展
	export var LabelFontSize = {
		littleSize:12,//小型字体大小
		middleSize:18,//中型字体大小
		normalSize:24,//正常字体大小
		bigSize:36//大型字体大小
	}

	//是不是微信浏览
	export function isWeiXin():boolean{ 
		var ua = window.navigator.userAgent.toLowerCase(); 
		var microStr = "" + ua.match(/MicroMessenger/i);
		if(microStr == "null"){
			return false;
		}else if(microStr == "micromessenger"){
			return true;
		}
	} 

	//获得浏览器类型 pc android ios -- 可扩展为其他 如 微信、qqzone、qq、微博、校内、facebook
	export function systemType():string{ 
		var ua = window.navigator.userAgent.toLowerCase(); 
		var microStr = "" + ua.match(/MicroMessenger/i);
		if(("" + ua.match(/windows nt/i)) == "windows nt"){
			return "windows";
		}else if(("" + ua.match(/iphone/i)) == "iphone"){
			return "ios";
		}else if(("" + ua.match(/android/i)) == "android"){
			return "android";
		}else if(("" + ua.match(/ipad/i)) == "ipad"){
			return "ipad";
		}else if(("" + ua.match(/linux/i)) == "linux"){
			return "linux";
		}else if(("" + ua.match(/mac/i)) == "mac"){
			return "mac";
		}else if(("" + ua.match(/ucbrower/i)) == "ucbrower"){
			return "ucbrower";
		}else{
			console.log("未知系统类型");
		}
	} 

	var curScene:GameScene;
	//当前游戏场景类
	export function gameScene():GameScene{ 
		if(this.curScene == null){
			this.curScene = new GameScene();
		}
		return this.curScene;
	}

	//当前舞台
	export function curStage():egret.Stage{ 
		return egret.MainContext.instance.stage;
	}

	//当前面板
	export var curPanel:egret.DisplayObjectContainer;

	//当前游戏宽度
	export function curWidth():number{ 

		return egret.MainContext.instance.stage.stageWidth;
	}

	//当前游戏宽度
	export function curHeight():number{ 
		//console.log("curHeight:",egret.MainContext.instance.stage.stageHeight)
		return egret.MainContext.instance.stage.stageHeight;
	}

	//当前游戏角度
	export var curAngle:number = window["orientation"];	

	//获得手机是横屏还是竖屏
	//角度为0说明是竖屏，+-90是横屏
	export function isVertical():boolean{ 
		var angle = window["orientation"]; 
		console.log(angle)
		if(angle == 90){
			return false;
		}else{
			return true;
		}
	} 

	//手机旋转适配
	//注意：
	//在egret_loader.js中，rootContainer要放startGame在外定义
	//具体旋转数值自己修改
	//貌似不完善
	export function rotationResize(isRotation:boolean = false):void{ 
		console.log("rotationResize")
		if(isRotation){
			egret.StageDelegate.getInstance().setDesignSize(800, 480);
			window["rootContainer"].rotation = 90;
			window["rootContainer"].x = egret.MainContext.instance.stage.stageWidth;
		}else{
			egret.StageDelegate.getInstance().setDesignSize(480, 800);
			window["rootContainer"].rotation = 0;
			window["rootContainer"].x = 0;
		}
	} 

	//监听MainNotify.onOrientationChange事件可以获得屏幕竖屏横屏变化和角度
    // var orientationFun:Function = function(e){
    //     // document.title = "" + GameConfig.curAngle;
    //     document.title = "11--" + e.param;
    // };  
    // lcp.LListener.getInstance().addEventListener(MainNotify.onOrientationChange,orientationFun,this);
    window["onorientationchange"] = function(){
        lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(MainNotify.onOrientationChange,window["orientation"],false));
    };  

	//监听MainNotify.onDeviceMotion事件可以获得摇一摇事件
    //需要在index中增加如下代码
	// <script type="text/javascript">
	//     if (window.DeviceMotionEvent) {
	//         window.addEventListener('devicemotion', deviceMotionHandler, false);
	//     } else {
	//         alert('本设备不支持devicemotion事件');
	//     }
	//     function deviceMotionHandler(eventData) {
	//         window["rootContainer"].deviceMotionHandler(eventData);
	//     }
	// </script>
	//需要在gameMain中增加如下代码
    // private SHAKE_THRESHOLD = 3000;
    // private last_update = 0;
    // private temp_x = 0;
    // private temp_y = 0;
    // private temp_z = 0;
    // private last_x = 0;
    // private last_y = 0;
    // private last_z = 0;
    // public deviceMotionHandler(eventData):void{
    //     var acceleration = eventData.accelerationIncludingGravity;
    //     var curTime = new Date().getTime();
    //     if ((curTime - this.last_update) > 100) {
    //         var diffTime = curTime - this.last_update;
    //         this.last_update = curTime;
    //         this.temp_x = acceleration.x;
    //         this.temp_y = acceleration.y;
    //         this.temp_z = acceleration.z;
    //         var speed = Math.abs(this.temp_x + this.temp_y + this.temp_z - this.last_x - this.last_y - this.last_z) / diffTime * 10000;

    //         if (speed > this.SHAKE_THRESHOLD) {
    //             // alert("摇动了");
    //             lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(MainNotify.onDeviceMotion,eventData,false));
    //         }
    //         this.last_x = this.temp_x;
    //         this.last_y = this.temp_y;
    //         this.last_z = this.temp_z;
    //     }
    // }	

    //监听MainNotify.onDeviceOrientation事件可以获得陀螺仪数据
    // var orientationFun:Function = function(e){
    //     var angleX:number = e.param.beta;
	//     var angleY:number = e.param.gamma;
	//     var angleZ:number = e.param.alpha;
    // };  
    // lcp.LListener.getInstance().addEventListener(MainNotify.onDeviceOrientation,orientationFun,this);
    //需要就打开
    // window["ondeviceorientation"] = function(e){
    //     lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(MainNotify.onDeviceOrientation,{beta:Math.floor(e.beta), gamma:Math.floor(e.gamma), alpha:Math.floor(e.alpha)},false));
    // };  


    /**----------------------------------FAQ:-----------------------------*/

	// 横屏解决方法 by 张宇
	// http://bbs.egret-labs.org/thread-529-1-1.html

	//声音解决方法 by east
	// http://bbs.egret-labs.org/forum.php?mod=viewthread&tid=386&pid=1770&page=1&extra=#pid1770

	//js调用ts的方法
	// document_class 查看egretProperties
	// 在egret_loader中有如下代码：
	// var rootClass;
	// if(document_class){
	//     rootClass = egret.getDefinitionByName(document_class);
	// }
	// var rootContainer = new rootClass();
	// rootContainer就是主ts中的this
	// 在index中直接调用rootContainer就ok了

	//ts调用js的方法
	// 使用如下方法：
	// window["_smq"]

	//上传图片
	// http://a3147972.blog.51cto.com/2366547/1551066
	
}



