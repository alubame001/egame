class JsonpReq
{
    private static _regID:number = 0;
    public static completeCall:any = {};
    public static process($loader:egret.URLLoader):void
    {
        JsonpReq.completeCall["call_"+JsonpReq._regID] = (data)=>{
            var id = JsonpReq._regID;
            $loader.data = data;
            $loader.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
            delete JsonpReq.completeCall["call_"+id];
        };
        JsonpReq.startLoader($loader, JsonpReq._regID++);
    }
 
    private static startLoader(loader:egret.URLLoader, id:number):void{
        var script = document.createElement('script');
        script.src = loader._request.url + "JsonpReq.completeCall.call_" + id +"";
        document.body.appendChild(script);
    }
}

/*

var url = "";//请求的url 
var para = "";//和后端约定的Jsonp参数名称，如callBack
var loader:egret.URLLoader = new egret.URLLoader();
var req:egret.URLRequest = new egret.URLRequest(url+"?"+para+"=");
loader._request = req;
JsonpReq.process(loader);
完成~然后就会在URLLoader的Complete事件中监听到服务器传来的数据了。

*/