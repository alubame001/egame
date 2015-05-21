
WebApp.IndexController = Ember.Controller.extend({
});
WebApp.IndexView = Ember.View.extend({
  didInsertElement: function() {

        $(".focusBox").slide({ titCell:".num li", mainCell:".pic",effect:"fold", autoPlay:true,trigger:"click",
                   startFun:function(i){
                $(".focusBox .txt li").eq(i).animate({"bottom":0}).siblings().animate({"bottom":-36});
            }
        }); 

        /*



        var storage = window.localStorage;
        var students = 
        {
        liyang:{name:"liyang",age:17},

        lilei:{name:"lilei",age:18}

        }//要存储的JSON对象


        students = JSON.stringify(students);//将JSON对象转化成字符串

        //localStorage.setItem("students",students);//用localStorage保存转化好的的字符串
        storage.setItem("students",students);//用localStorage保存转化好的的字符串

        console.log(storage["students"])
        
        for(var i=0;i<storage.length;i++){
          var name = storage.key(i)​;
          var value = storage.getItem(name);​
          console.log(value)
        }
        */
  }
});



WebApp.IndexRoute = Ember.Route.extend({

  model: function(params) {   
    console.log(this.store)
      return Ember.RSVP.hash({ 
          detail:this.store.find('contract'),
          trade:this.store.find('trade'),

      });
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
    },   
      afterModel: function(model, transition) {

/*
        
        $.post("/egame/join", {uname: '',tech :'Long Polling'});
          var myStore = this.store;    
          console.log(myStore)   
          var lastReceived = 0;
          var isWait = false;
          var updatePrice = function (data){
            console.log(data)
             myStore.update('price',{id:data.Id,price:data.P,change:data.C,change_rate:data.R});
          }
          var updateAnalyst = function (data){
            //console.log(data)
            myStore.update('analyst',{id:data.Id,total_profit:data.P});
          }
           var updateGame = function (data){
            //console.log(data)
            var str = JSON.stringify(data)
            //      console.log(str)
            var obj =JSON.parse(str)
            var contentStr =    JSON.stringify(obj.Content) 
            var contentObj = eval("(" + obj.Content+ ")")
            var lucky = contentObj.lucky;
            var allprofit = contentObj.allprofit;
            var total = contentObj.total;
            var unixTimestamp = new Date(data.Timestamp * 1000) 
            var  commonTime = unixTimestamp.toLocaleString()
            var profit = ""
            if (allprofit < 0 ){
              profit =  "<div class='who red text-right'>"+allprofit+"</div>"
            } else if (allprofit > 0 ){
               profit =  "<div class='who green text-right'>"+allprofit+"</div>"
            } else {
               profit =  "<div class='who text-right'>"+allprofit+"</div>"
            }

            var s = "<div class='result win'>"+
            "<div class='who'>"+data.User+"</div>"+
            profit+
            "<div class='who text-right'>"+total+"</div>"+
            "<div class='who text-right'>"+lucky+"</div>"+
            "<div class='commontime text-right'>"+commonTime+"</div>"
            $("#result").prepend(s)

          //  myStore.update('game',{id:data.Id,cmd:data.Cmd,content:data.Content,user:data.User,timestamp:data.Timestamp});
          }         
          var fetch = function () {
              if (isWait) return;
              isWait = true;
              $.getJSON("/egame/lp/fetch?lastReceived=" + lastReceived, function (data) {
                  if (data == null) return;
                    console.log(data);
                  $.each(data, function (i, event) {
                        //console.log(data)
                        switch (event.Type) { 
                          case 2:updateGame(event);
                          break
                        case 3: // Price                          
                          updateAnalyst(event);   
                          break;                   
                        case 4: // Analyst                          
                          updateAnalyst(event);
                          break;
                      }
                      lastReceived = event.Timestamp;

                  });
                   var len=$(".result").length;
                  console.log(len)
                   for(var i = 0; i < len-50; i++){
                   $(".result:last").remove();
                  }
                   len=$("li").length;  
                    console.log(len)               

                  isWait = false;
              });
          }
          setInterval(fetch, 1000);
       */
    },

});
