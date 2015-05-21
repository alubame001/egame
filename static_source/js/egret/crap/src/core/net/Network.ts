  /**
    * 网络公共类
    * by dily
    * (c) copyright 2014 - 2035
    * All Rights Reserved. 
    * 存放网络公共方法
    * 比如：
    */
module Network {

    //发送消息
    //url 网络地址
    //data exp "name='dily'&age:18"
    export function sendInfo(url,urlData):void{
        var loader:egret.URLLoader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        loader.addEventListener(egret.Event.COMPLETE,this.onGetComplete,this);
        // this.tipTF.text = "正在发送数据...";
        var request:egret.URLRequest = new egret.URLRequest(url);
        request.method = egret.URLRequestMethod.GET;
        request.data = new egret.URLVariables(urlData);
        loader.load(request);
    }

    //GET请求完成
    //发送消息 消息为 网址名称
    export function onGetComplete(event:egret.Event):void
    {
        var loader:egret.URLLoader = <egret.URLLoader> event.target;
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        var data:egret.URLVariables = loader.data;
        var data2 = eval("("+data+")")

        var notify:string = loader["_eventTarget"]._request.url;
        lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(notify,data2,false));
     }
}



