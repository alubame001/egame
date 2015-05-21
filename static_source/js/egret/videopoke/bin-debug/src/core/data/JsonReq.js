var JsonpReq = (function () {
    function JsonpReq() {
    }
    JsonpReq.process = function ($loader) {
        JsonpReq.completeCall["call_" + JsonpReq._regID] = function (data) {
            var id = JsonpReq._regID;
            $loader.data = data;
            $loader.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
            delete JsonpReq.completeCall["call_" + id];
        };
        JsonpReq.startLoader($loader, JsonpReq._regID++);
    };
    JsonpReq.startLoader = function (loader, id) {
        var script = document.createElement('script');
        script.src = loader._request.url + "JsonpReq.completeCall.call_" + id + "";
        document.body.appendChild(script);
    };
    JsonpReq._regID = 0;
    JsonpReq.completeCall = {};
    return JsonpReq;
})();
JsonpReq.prototype.__class__ = "JsonpReq";
/*

var url = "";//请求的url
var para = "";//和后端约定的Jsonp参数名称，如callBack
var loader:egret.URLLoader = new egret.URLLoader();
var req:egret.URLRequest = new egret.URLRequest(url+"?"+para+"=");
loader._request = req;
JsonpReq.process(loader);
完成~然后就会在URLLoader的Complete事件中监听到服务器传来的数据了。

*/ 
