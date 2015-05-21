/**
 * 网络公共类
 * by dily
 * (c) copyright 2014 - 2035
 * All Rights Reserved.
 * 存放网络公共方法
 * 注意：是同步请求，不是异步
 */
var SocketManager;
(function (SocketManager) {
    var sock = new egret.WebSocket();
    //连接服务器
    function connectServer(host, port) {
        if (host === void 0) { host = ""; }
        if (port === void 0) { port = 80; }
        Global.waitPanel = new WaitPanel(1);
        GameConfig.gameScene().maskLayer.removeChildren();
        GameConfig.gameScene().maskLayer.addChild(Global.waitPanel);
        this.sock = new egret.WebSocket();
        this.sock.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        this.sock.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        this.sock.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        this.sock.connect(host, port);
        console.log(host);
    }
    SocketManager.connectServer = connectServer;
    function reconnect(host, port) {
        if (host === void 0) { host = ""; }
        if (port === void 0) { port = 80; }
        Global.waitPanel = new WaitPanel(1);
        GameConfig.gameScene().maskLayer.removeChildren();
        GameConfig.gameScene().maskLayer.addChild(Global.waitPanel);
        this.sock.connect(host, port);
    }
    SocketManager.reconnect = reconnect;
    function closeSocket() {
        Global.waitPanel = new WaitPanel(1);
        GameConfig.gameScene().maskLayer.removeChildren();
        GameConfig.gameScene().maskLayer.addChild(Global.waitPanel);
    }
    SocketManager.closeSocket = closeSocket;
    //连接成功返回
    function onSocketOpen() {
        //  GameConfig.gameScene().maskLayer.removeChild(Global.waitPanel);
        //  Global.waitPanel = null;
        console.log("onSocketOpen");
    }
    SocketManager.onSocketOpen = onSocketOpen;
    //断开成功返回
    function onSocketClose() {
        //  GameConfig.gameScene().maskLayer.removeChild(Global.waitPanel);
        //   Global.waitPanel = null;
        console.log("onSocketClose");
        lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent("onSocketClose", "", false));
    }
    SocketManager.onSocketClose = onSocketClose;
    //消息返回后，会广播出去
    //Global.addEventListener("你发送的cmd名称",监听方法,this)
    function onReceiveMessage() {
        // console.log("onReceiveMessage")
        var msg = this.sock.readUTF();
        var data = eval("(" + msg + ")");
        // console.log(data)
        lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(data.Cmd, data, false));
    }
    SocketManager.onReceiveMessage = onReceiveMessage;
    //向服务端发送消息
    function sendMessage(cmd) {
        if (cmd === void 0) { cmd = ""; }
        Global.waitPanel = new WaitPanel(1);
        GameConfig.gameScene().maskLayer.removeChildren();
        GameConfig.gameScene().maskLayer.addChild(Global.waitPanel);
        this.sock.writeUTF(cmd);
    }
    SocketManager.sendMessage = sendMessage;
})(SocketManager || (SocketManager = {}));
