/*
冰霜女巫,0        
德邦总管,1       近
德玛之力,2       近
寒冰射手,3         
流浪法师,4
皮城女警,5
齐天大圣,6       近
赏金猎人,7
无极剑圣,8       近
雪人骑士,9       近
*/
/*
WebApp.IndexController = Ember.Controller.extend({
  isLogin:true,
  isSignup:false,
  isForegetPassword:false, 
       needs: 'application',
});
*/
/*
    var date = new Date($.ajax({
              url: "/api",
               type: "GET",async: false}).getResponseHeader("Date"));
    var ss = date.getSeconds();
    return  ss;
*/
WebApp.IndexController = Ember.Controller.extend({
  sn:"0",
  balance:10000,
  betBalance:0,
  symbol:"lol",
  betCoin:"doge",
  betUnit:0.1,
 // myBet :{ name: "video",kind:"lol",pick:[]},  
  myBet :{ name: "video",kind:"lol",pick:[],sn:0},  
  betParams:{
    icon0:0,
    icon1:0,
    icon2:0,
    icon3:0,
    icon4:0,
    icon5:0,
    icon6:0,
    icon7:0,
    icon8:0,
    icon9:0,
    dxd:0,
    dxx:0,
    dsd:0,
    dss:0,
    zbz:0,
    zbb:0,
    ywy:0,
    yww:0,
    jyj:0,
    jyy:0
  },

  sysDate : "",
  sysTime:"",   
  systemDate: function() {
     var date = new Date($.ajax({url: "/api",type: "GET",async: false}).getResponseHeader("Date"));
      return date;
 // }.property('balance','betBalance'),  
  }.property('balance'  ),  
  leftBalance: function() {
         
      var amount = new Big(0);         
      var x = this.get("balance");        
      var y = this.get("betBalance");     
        
        amount = amount.plus(x).minus(y);
                    
      return amount;
  }.property('balance'),  
 // }.property('balance','betBalance'),  

    totalAmount: function() {
        var amount = new Big(0);         
        var s = this.get("content",'content');        
        if (s.video.content.length != undefined){ 
          amount = amount.plus(s.video.content.length);
          return amount;                
        }
    }.property('content.video.content'),


    //全部数字次数
    nr_s: function() {  
        var amount = new Big(0);         
        var s = this.get("content",'content');        
        if (s.video.content.length != undefined){  
              percent = new Big(0.1);
          amount = amount.plus(s.video.content.length);   
          amount = amount.times(percent).round(1)   
          return amount;                
        }
    }.property('content.video.content'),   
    //全部大小标准次数
    dx_s: function() {  
        var amount = new Big(0);         
        var s = this.get("content",'content');        
        if (s.video.content.length != undefined){  
              percent = new Big(0.5);
          amount = amount.plus(s.video.content.length);   
          amount = amount.times(percent).round(1)   
          return amount;                
        }
        
    }.property('content.video.content'),   

    //全部单双标准次数
    ds_s: function() {  
        var amount = new Big(0);         
        var s = this.get("content",'content');        
        if (s.video.content.length != undefined){  
              percent = new Big(0.5);
          amount = amount.plus(s.video.content.length);   
          amount = amount.times(percent).round(1)   
          return amount;                
        }
    }.property('content.video.content'), 

    //全部中边标准次数
    zb_s: function() {  
        var amount = new Big(0);         
        var s = this.get("content",'content');        
        if (s.video.content.length != undefined){  
              percent = new Big(0.5);
          amount = amount.plus(s.video.content.length);   
          amount = amount.times(percent).round(1)   
          return amount;                
        }
    }.property('content.video.content'), 

    //全部有蓝标准次数
    yw_y: function() {  
        var amount = new Big(0);         
        var s = this.get("content",'content');        
        if (s.video.content.length != undefined){  
              percent = new Big(0.9);
          amount = amount.plus(s.video.content.length);   
          amount = amount.times(percent).round(1)   
          return amount;                
        }
    }.property('content.video.content'), 

    //全部无蓝标准次数
    yw_w: function() {  
        var amount = new Big(0);         
        var s = this.get("content",'content');        
        if (s.video.content.length != undefined){  
              percent = new Big(0.1);
          amount = amount.plus(s.video.content.length);   
          amount = amount.times(percent).round(1)   
          return amount;                
        }
    }.property('content.video.content'), 


    //全部近战标准次数
    jy_j: function() {  
        var amount = new Big(0);         
        var s = this.get("content",'content');        
        if (s.video.content.length != undefined){  
              percent = new Big(0.5);
          amount = amount.plus(s.video.content.length);   
          amount = amount.times(percent).round(1)   
          return amount;                
        }
    }.property('content.video.content'), 

    //全部远程标准次数
    jy_y: function() {  
         var amount = new Big(0);         
        var s = this.get("content",'content');        
        if (s.video.content.length != undefined){  
              percent = new Big(0.5);
          amount = amount.plus(s.video.content.length);   
          amount = amount.times(percent).round(1)   
          return amount;                
        }
    }.property('content.video.content'),     


    nr0: function() {
        var amount = new Big(0);         
        var s = this.get("content",'content'); 
        if (s.video.content.length != undefined){ 
          amount = amount.plus( s.video.filterBy('nr0', true).get('length'));   
          return amount;                
        }
       
    }.property('content.video.content'),  
     nr1: function() {
        var amount = new Big(0);         
        var s = this.get("content",'content'); 
        if (s.video.content.length != undefined){ 
          amount = amount.plus( s.video.filterBy('nr1', true).get('length'));   
          return amount;                
        }
    }.property('content.video.content'),     

    nr2: function() {
        var amount = new Big(0);         
        var s = this.get("content",'content'); 
        if (s.video.content.length != undefined){ 
          amount = amount.plus( s.video.filterBy('nr2', true).get('length'));   
          return amount;                
        }
    }.property('content.video.content'), 
    nr3: function() {
        var amount = new Big(0);         
        var s = this.get("content",'content'); 
        if (s.video.content.length != undefined){ 
          amount = amount.plus( s.video.filterBy('nr3', true).get('length'));   
          return amount;                
        }
    }.property('content.video.content'),  

    nr4: function() {
        var amount = new Big(0);         
        var s = this.get("content",'content'); 
        if (s.video.content.length != undefined){ 
          amount = amount.plus( s.video.filterBy('nr4', true).get('length'));   
          return amount;                
        }
    }.property('content.video.content'),  
    nr5: function() {
        var amount = new Big(0);         
        var s = this.get("content",'content'); 
        if (s.video.content.length != undefined){ 
          amount = amount.plus( s.video.filterBy('nr5', true).get('length'));   
          return amount;                
        }
    }.property('content.video.content'),  
    nr6: function() {
        var amount = new Big(0);         
        var s = this.get("content",'content'); 
        if (s.video.content.length != undefined){ 
          amount = amount.plus( s.video.filterBy('nr6', true).get('length'));   
          return amount;                
        }
    }.property('content.video.content'), 
     nr7: function() {
        var amount = new Big(0);         
        var s = this.get("content",'content'); 
        if (s.video.content.length != undefined){ 
          amount = amount.plus( s.video.filterBy('nr7', true).get('length'));   
          return amount;                
        }
    }.property('content.video.content'),   
    nr8: function() {
        var amount = new Big(0);         
        var s = this.get("content",'content'); 
        if (s.video.content.length != undefined){ 
          amount = amount.plus( s.video.filterBy('nr8', true).get('length'));   
          return amount;                
        }
    }.property('content.video.content'),  

    nr9: function() {
        var amount = new Big(0);         
        var s = this.get("content",'content'); 
        if (s.video.content.length != undefined){ 
          amount = amount.plus( s.video.filterBy('nr9', true).get('length'));   
          return amount;                
        }
    }.property('content.video.content'),  

    dxd: function() {
               var amount = new Big(0);         
        var s = this.get("content",'content'); 
        if (s.video.content.length != undefined){ 
          amount = amount.plus( s.video.filterBy('dxd', true).get('length'));   
          return amount;                
        }
    }.property('content.video.content'),  
    dxx: function() {
        var amount = new Big(0);         
        var s = this.get("content",'content'); 
        if (s.video.content.length != undefined){ 
          amount = amount.plus( s.video.filterBy('dxx', true).get('length'));   
          return amount;                
        }
    }.property('content.video.content'),  

    dsd: function() {
        var amount = new Big(0);         
        var s = this.get("content",'content'); 
        if (s.video.content.length != undefined){ 
          amount = amount.plus( s.video.filterBy('dsd', true).get('length'));   
          return amount;                
        }
    }.property('content.video.content'),  
    dss: function() {
        var amount = new Big(0);         
        var s = this.get("content",'content'); 
        if (s.video.content.length != undefined){ 
          amount = amount.plus( s.video.filterBy('dss', true).get('length'));   
          return amount;                
        }
    }.property('content.video.content'),  
    zbz: function() {
        var amount = new Big(0);         
        var s = this.get("content",'content'); 
        if (s.video.content.length != undefined){ 
          amount = amount.plus( s.video.filterBy('zbz', true).get('length'));   
          return amount;                
        }
    }.property('content.video.content'),  
    zbb: function() {
        var amount = new Big(0);         
        var s = this.get("content",'content'); 
        if (s.video.content.length != undefined){ 
          amount = amount.plus( s.video.filterBy('zbb', true).get('length'));   
          return amount;                
        }
    }.property('content.video.content'),  

    ywy: function() {
        var amount = new Big(0);         
        var s = this.get("content",'content'); 
        if (s.video.content.length != undefined){ 
          amount = amount.plus( s.video.filterBy('ywy', true).get('length'));   
          return amount;                
        }
    }.property('content.video.content'),

    yww: function() {
        var amount = new Big(0);         
        var s = this.get("content",'content'); 
        if (s.video.content.length != undefined){ 
          amount = amount.plus( s.video.filterBy('yww', true).get('length'));   
          return amount;                
        }
    }.property('content.video.content'),
    jyj: function() {
        var amount = new Big(0);         
        var s = this.get("content",'content'); 
        if (s.video.content.length != undefined){ 
          amount = amount.plus( s.video.filterBy('jyj', true).get('length'));   
          return amount;                
        }
    }.property('content.video.content'),
    jyy: function() {
        var amount = new Big(0);         
        var s = this.get("content",'content'); 
        if (s.video.content.length != undefined){ 
          amount = amount.plus( s.video.filterBy('jyy', true).get('length'));   
          return amount;                
        }
    }.property('content.video.content'),
    data_filter:"1",
    GetDataByFilter:function(params){
      var c= this;      
      console.log(c)  
         
      if (true){

         
         var m =[]; 
        // var c= this; 
         var target = this.get('content.video') 
        
         var newData = null;
         var filter = this.get("data_filter");
         console.log(filter)
         this.store.find('video',{symbol:c.symbol,amount:this.data_filter}).then(function (data) {
          
          newData = data;
           for(var i=0;i<data.content.length;i++){   
            var  d =  data.content[i]._data
              m.push(d)
           }
               

         }).then(function (data){
             console.log(data)  
             sortVideoData(m,0)
             var n ={};
             n.video = m;  

           
             //this.set('content.video',newData) 
             c.set('content.video',newData) 
         })              
        
      
     
      } 
    }, 

})


function getDate(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
   
    return year + "-" + month + "-" + day ;
}
function getTime(date) {
    var hh = date.getHours();
    var mm = date.getMinutes();
    var ss = date.getSeconds();
    return hh + ":" + mm + ":" + ss;
}
function getSn(date) {
  date = new Date(date.setMinutes(date.getMinutes()+1)); 
  var year = date.getFullYear();
  year = String(year).substr(2,2)
  var month = date.getMonth() + 1;
  if (month < 10){
    month =String(0)+String(month)
  }
  var day = date.getDate();
  if (day < 10){
    day =String(0)+String(day)
  }
  var hh = date.getHours();
  if (hh < 10){
    hh =String(0)+String(hh)
  }

  var mm = date.getMinutes();
    if (mm < 10){
    mm =String(0)+String(mm)
  }
  var ss = date.getSeconds();
  var result = String(year)+String(month)+String(day)+
               String(hh)+String(mm)
  return result;
}


function getSeconds() {
    var date = new Date($.ajax({
              url: "/api",
               type: "GET",async: false}).getResponseHeader("Date"));
    var ss = date.getSeconds();
    return  ss;
}
WebApp.IndexView = Ember.View.extend({
    didInsertElement: function() {
      /* for slider */
     var $pxs_container = $('#pxs_container');
       if ( $pxs_container!= undefined) {
        $pxs_container.parallaxSlider();
        setChannel(0)
       }


    //  $('#top-right').tooltip('show');
    $("[data-toggle='tooltip']").tooltip();

      var c = this.controller;
/*
      var date = new Date($.ajax({
              url: "/api",
               type: "GET",async: false}).getResponseHeader("Date"));
      var bombay = date + (3600000 * 8);
      var time = new Date(bombay)
      console.log(getDate(time))
      console.log(getTime(time))
*/


      var xsrftoken = $('meta[name=_xsrf]').attr('content'); 
      var s ='ws://' + window.location.host + '/egame/ws/join?uname='+xsrftoken;
      socket = new WebSocket(s);
      c.socket = socket;
      // Message received on the socket
         socket.connect = function (event) {
          alert('connect')
       }    
       socket.onclose = function (event) {
          alert('closed')
           //socket = new WebSocket(s);
       }
      socket.onmessage = function (event) {
          var data = JSON.parse(event.data);

         
       

         console.log(data);
         console.log(data.Type);
          switch (data.Type) {
          case 0: // JOIN
              
              $("#balance").text(data.Content)
                c.set("balance",data.Content)
            
               
   
              break;
          case 1: // LEAVE
              $("#chatbox li").first().before("<li>" + data.User + " left the chat room.</li>");
              break;
          case 2: // MESSAGE
              console.log(data.Content)
              if (data.Content!=""){
                var content = JSON.parse(data.Content);
                c.set("balance",(content.balance) )
              }  
              break;
         }
      };








      $(".focusBox").slide({ titCell:".num li", mainCell:".pic",effect:"fold", autoPlay:true,trigger:"click",
                 startFun:function(i){
              $(".focusBox .txt li").eq(i).animate({"bottom":0}).siblings().animate({"bottom":-36});
          }
      });
     
      $(".stb").slide({});
      $("[data-toggle='popover']").popover();


      var element = document.getElementById('clock-container');
      var seconds = new ProgressBar.Circle(element, {
          duration: 200,
        //  color: "#2DAE18",
          color: "#000000",
          strokeWidth: 5,
          trailColor: "#ddd"
      });
     // var d =$.getJSON("/time", {}, function(json){
       // alert("JSON Data: " + json);
      
     // });
     var second = 0
      var date = new Date($.getJSON("/time", {}, function(json){
        c.set("sn",json.sn)
        var unixTimestamp = new Date(json.time* 1000) 
        var time = new Date(json.time)
         second = unixTimestamp.getSeconds();  
      }).getResponseHeader("Date"))
      
     
       c.GetDataByFilter(); 

      setInterval(function() {
         second ++;
         if (second >=60) {
           c.GetDataByFilter(); 
             second = 0;
            var date = new Date($.getJSON("/time", {}, function(json){
              c.set("sn",json.sn)
              var unixTimestamp = new Date(json.time* 1000) 
              var time = new Date(json.time)
              second = unixTimestamp.getSeconds();  
            }).getResponseHeader("Date"))       
             
            //$("#sf1").click();   
          }


  
        if (second > 0 && second <30) {
           $("betbtn").attr("disabled",false)
          seconds.path.setAttribute('stroke', "#00FC00");
           $(".progressbar-text").css("color","#00FC00");      
        }else   
        {

            $("betbtn").attr("disabled",true)
          seconds.path.setAttribute('stroke', "#FC0000");
           $(".progressbar-text").css("color","#FC0000"); 
        } 
        seconds.animate(second / 60, function() {
          seconds.setText(second);
        });
         
      }, 1000);





    	$(".webbutton").click(function () {
		  	$('#login').addClass('magictime swashIn');





		  	//console.log('hover');
		});
    }
});

  /*
     3 4 5 6 7 为中，其馀为边
  */
function sortVideoData(vData,kind) { 


 //console.log(vData)
 //for(var i=0;i<model.video.content.length;i++){      
 for(var i=0;i<vData.length;i++){      
     //  m.push(model.lol.content[i]._data);
       if (kind== 1){
         m = vData[i]._data
       } else {
         m = vData[i]
       }
        switch ( m.nr)
        {
        case 0:
          m.cid = "冰霜女巫"
          m.nr0 = true
          m.dxx = true
          m.dss = true
          m.zbb = true
          m.ywy = true
          m.jyy = true
          break;
        case 1:
          m.cid = "德邦总管"
          m.nr1 = true
          m.dxx = true
          m.dsd = true
          m.zbb = true
          m.ywy = true
          m.jyj = true          
          break;
        case 2:
          m.cid = "德玛之力"
          m.nr2 = true
          m.dxx = true
          m.dss = true
          m.zbb = true          
          m.yww = true
          m.jyj = true
          break;
        case 3:
          m.cid = "寒冰射手"
          m.nr3 = true
          m.dxx = true
          m.dsd = true
          m.zbz = true          
          m.ywy = true
          m.jyy = true          
          break;
        case 4:
          m.cid = "流浪法师"
          m.nr4 = true
          m.dxx = true
          m.dss = true
          m.zbz = true          
          m.ywy = true
          m.jyy = true              
          break;
        case 5:
          m.cid = "皮城女警"
          m.nr5 = true
          m.dxd = true
          m.dsd = true
          m.zbz = true          
          m.ywy = true
          m.jyy = true           
          break;
        case 6:
          m.cid = "齐天大圣"
          m.nr6 = true
          m.dxd = true
          m.dss = true
          m.zbz = true          
          m.ywy = true
          m.jyj = true           
          break;
        
        case 7:
          m.cid = "赏金猎人"
          m.nr7 = true
          m.dxd = true
          m.dsd = true
          m.zbz = true          
          m.ywy = true
          m.jyy = true           
          break;
        
        case 8:
          m.cid = "无极剑圣"
          m.nr8 = true
          m.dxd = true
          m.dss = true
          m.zbb = true          
          m.ywy = true
          m.jyj = true             
          break;
        
        case 9:
          m.cid = "雪人骑士"
          m.nr9 = true
          m.dxd = true
          m.dsd = true
          m.zbb = true          
          m.ywy = true
          m.jyj = true             
          break;
        }
      }     
}

WebApp.IndexRoute = Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({
        video :this.store.find('video',{'symbol':'lol'}),    
       login :{errorTime:0},      
    });
  },
  afterModel: function(model, transition) {
     sortVideoData(model.video.content,1);
  },  

  setupController: function(controller, model) {  
    controller.set('content', model); // <- 这里，我们把 model 内容指派给控制器的 content 属性
  },  
  resetBet:function(params){
    this.controller.set("betBalance",0)
    this.controller.set("betParams.icon0",0)
    this.controller.set("betParams.icon1",0)
    this.controller.set("betParams.icon2",0)
    this.controller.set("betParams.icon3",0)
    this.controller.set("betParams.icon4",0)
    this.controller.set("betParams.icon5",0)
    this.controller.set("betParams.icon6",0)
    this.controller.set("betParams.icon7",0)
    this.controller.set("betParams.icon8",0)
    this.controller.set("betParams.icon9",0)
    this.controller.set("betParams.dxd",0)
    this.controller.set("betParams.dxx",0)
    this.controller.set("betParams.dsd",0)
    this.controller.set("betParams.dss",0)
    this.controller.set("betParams.zbz",0)
    this.controller.set("betParams.zbb",0)
    this.controller.set("betParams.ywy",0)
    this.controller.set("betParams.yww",0)    
    this.controller.set("betParams.jyj",0)
    this.controller.set("betParams.jyy",0)



    /*-
    dxd:0,
    dxx:0,
    dsd:0,
    dss:0,
    zbz:0,
    zbb:0,
    ywy:0,
    yww:0,
    jyj:0,
    jyy:0
    */
  },  
         SetCoin:function(params){

          switch (params) {
          case "btc": 
            this.controller.set("betCoin","btc")
            $("#bg3").removeClass();
            $("#bg3").addClass("btc")
            break;            
          case "ltc": 
            this.controller.set("betCoin","ltc")
            $("#bg3").removeClass();
            $("#bg3").addClass("ltc")
            break;

          case "doge": 
            this.controller.set("betCoin","doge")
            $("#bg3").removeClass();
            $("#bg3").addClass("doge")            
            break;
         }
        },  
  actions:{
  
        moveForward:function(params){
            this.set('selectedPage', params.id);
        },
        moveBackward:function(params){   
            this.set('selectedPage', params.id);
        },
         goToPage:function(params){       

            this.set('selectedPage', params);
        },

        buyFilter:function(params){        
           //  this.store.find('loginip',{type:'buy'});
             this.set('filterParam', true);
             // this.set('model.loginip', this.store.find('loginip',{isDone:this.get('filterParam')}) )
        },
      
        actionResetBet:function(params){   
             this.resetBet();
            
        },

         setCoin:function(params){
            this.SetCoin(params)
        },       
      
        sendBet:function(params){


          var a =  this.controller.myBet;
          a.pick=[];
          a.sn = this.controller.sn;
          
          var b =  this.controller.betParams; 
          if  (parseFloat(b.icon0)>  0 ) { 
              var data = {"icon":"0","stake": parseFloat(b.icon0)}
              a.pick.push(data)
          }         
          if  (parseFloat(b.icon1)>  0 ) { 
              var data = {"icon":"1","stake": parseFloat(b.icon1)}
              a.pick.push(data)
          }
          if  (parseFloat(b.icon2)>  0 ) { 
              var data = {"icon":"2","stake": parseFloat(b.icon2)}
              a.pick.push(data)
          }
          if  (parseFloat(b.icon3)>  0 ) { 
              var data = {"icon":"3","stake": parseFloat(b.icon3)}
              a.pick.push(data)
          }
          if  (parseFloat(b.icon4)>  0 ) { 
              var data = {"icon":"4","stake": parseFloat(b.icon4)}
              a.pick.push(data)
          }
          if  (parseFloat(b.icon5)>  0 ) { 
              var data = {"icon":"5","stake": parseFloat(b.icon5)}
              a.pick.push(data)
          }
          if  (parseFloat(b.icon6)>  0 ) { 
              var data = {"icon":"6","stake": parseFloat(b.icon6)}
              a.pick.push(data)
          }
          if  (parseFloat(b.icon7)>  0 ) { 
              var data = {"icon":"7","stake": parseFloat(b.icon7)}
              a.pick.push(data)
          }
          if  (parseFloat(b.icon8)>  0 ) { 
              var data = {"icon":"8","stake": parseFloat(b.icon8)}
              a.pick.push(data)
          }
          if  (parseFloat(b.icon9)>  0 ) { 
              var data = {"icon":"9","stake": parseFloat(b.icon9)}
              a.pick.push(data)
          }
          if  (parseFloat(b.dxd)>  0 ) { 
              var data = {"icon":"dxd","stake": parseFloat(b.dxd)}
              a.pick.push(data)
          }
          if  (parseFloat(b.dxx)>  0 ) { 
              var data = {"icon":"dxx","stake": parseFloat(b.dxx)}
              a.pick.push(data)
          }
          if  (parseFloat(b.dsd)>  0 ) { 
              var data = {"icon":"dsd","stake": parseFloat(b.dsd)}
              a.pick.push(data)
          }
          if  (parseFloat(b.dss)>  0 ) { 
              var data = {"icon":"dss","stake": parseFloat(b.dss)}
              a.pick.push(data)
          }
          if  (parseFloat(b.zbz)>  0 ) { 
              var data = {"icon":"zbz","stake": parseFloat(b.zbz)}
              a.pick.push(data)
          }
          if  (parseFloat(b.zbb)>  0 ) { 
              var data = {"icon":"zbb","stake": parseFloat(b.zbb)}
              a.pick.push(data)
          }
          if  (parseFloat(b.ywy)>  0 ) { 
              var data = {"icon":"ywy","stake": parseFloat(b.ywy)}
              a.pick.push(data)
          }
          if  (parseFloat(b.yww)>  0 ) { 
              var data = {"icon":"yww","stake": parseFloat(b.yww)}
              a.pick.push(data)
          }
          if  (parseFloat(b.jyj)>  0 ) { 
              var data = {"icon":"jyj","stake": parseFloat(b.jyj)}
              a.pick.push(data)
          }
          if  (parseFloat(b.jyy)>  0 ) { 
              var data = {"icon":"jyy","stake": parseFloat(b.jyy)}
              a.pick.push(data)
          }







          

          var str =JSON.stringify(a);
          console.log(str);
          this.controller.socket.send(str);          
          this.resetBet();

          


        },
        setBet:function(params){
            console.log(params)
           if (params){
              var amount = new Big(0);            
              params = "betParams."+params       
              var x = this.controller.get(params);             
              amount= amount.plus(x)
              amount = amount.plus(this.controller.get("betUnit"))
              this.controller.set(params,amount);             
              var amount = new Big(0);    
              var y = this.controller.get("betBalance");
               amount= amount.plus(y)
              amount = amount.plus(this.controller.get("betUnit"))
              this.controller.set("betBalance",amount);
           }
        },
       setFilter:function(params){
                  
             
         
          if (params){

             
             var m =[]; 
             var c= this.controller; 
             c.data_filter = params
             //c.GetDataByFilter(params)
             
             var target = c.get('content.video') 
            
             var newData = null;
             this.store.find('video',{symbol:this.controller.symbol,amount:params}).then(function (data) {
              
              newData = data;
               for(var i=0;i<data.content.length;i++){   
                var  d =  data.content[i]._data
                  m.push(d)
               }
                   

             }).then(function (data){
             
                 sortVideoData(m,0)
                 var n ={};
                 n.video = m;   
                c.set('content.video',newData) 
             })           
             
            
          
         
          } 
          
        },       

        setLoginState:function(params){        
          console.log(params);
           if (params=='1'){
             this.controller.set('isLogin', true);
             this.controller.set('isSignup', false);     
             this.controller.set('isForegetPassword', false);                   
            }
           if (params=='2'){
             this.controller.set('isLogin', false);
             this.controller.set('isSignup', true);     
             this.controller.set('isForegetPassword', false);  
                            
            }
           if (params=='3'){
             this.controller.set('isLogin', false);
             this.controller.set('isSignup', false);     
             this.controller.set('isForegetPassword', true);                   
            }

        },       


    },   
  
});
/*
var bparams = {
    icon0:0,
    icon1:0,
    icon2:0,
    icon3:0,
    icon4:0,
    icon5:0,
    icon6:0,
    icon7:0,
    icon8:0,
    icon9:0
  }
*/