// ==UserScript==
// @name         egame crap
// @namespace    http://your.homepage/
// @version      0.1
// @description  enter something useful
// @author       You
// @match        http://192.168.1.104:8092/*
// @grant        none
// ==/UserScript==


 var wsUri ='ws://www.justcfd.com/egame/ws/join?uname=c12314k';
    var output;  
    
    function init() { 
        output = document.getElementById("output"); 
        testWebSocket(); 
    }  
 
    function testWebSocket() { 
        websocket = new WebSocket(wsUri); 
        websocket.onopen = function(evt) { 
            onOpen(evt) 
        }; 
        websocket.onclose = function(evt) { 
            onClose(evt) 
            init()
        }; 
        websocket.onmessage = function(evt) { 
            onMessage(evt) 
        }; 
        websocket.onerror = function(evt) { 
            onError(evt) 
        }; 
    }  

    function onOpen(evt) { 
        console.log("CONNECTED"); 
       // for (var i = 0; i < 10000; i++) {
           sendMessage()
       
       // }
    }  
     function sendMessage() { 
       doSend('{"name":"slot","kind":"crap","total":1000,"pick":[{"icon":"6","stake":1000,"profit":0}],"pk":[]}');
        
    } 
    function onClose(evt) { 
        console.log("DISCONNECTED"); 
    }  
 
    function onMessage(evt) { 
      //  writeToScreen('<span style="color: blue;">RESPONSE: '+ evt.data+'</span>'); 
      console.log(evt);
        sendMessage()
  //  websocket.close(); 
    }  
 
    function onError(evt) { 
       console.log('<span style="color: red;">ERROR:</span> '+ evt.data); 
    }  
 
    function doSend(message) { 
      //  console.log("SENT: " + message);  
        websocket.send(message); 
    }  
 
    function writeToScreen(message) { 
       // var pre = document.createElement("p"); 
      //  pre.style.wordWrap = "break-word"; 
      //  pre.innerHTML = message; 
      //  output.appendChild(pre); 
    }  


init();