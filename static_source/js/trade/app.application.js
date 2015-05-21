/*
WebApp.Router.map(function() {
  this.route('catchall', {path: '/*wildcard'});
});

*/

WebApp.ApplicationRoute = Ember.Route.extend({
  
    actions: {
      error: function (params) {
        console.log(params)
        
        //this.transitionTo('catchall', "application-error");
      }
    },
    /*
    model: function(params) {
      return Ember.RSVP.hash({ // 这里 model 对象包含多种子对象 
         chart: this.store.find('chart'),  
           
      });
    },  

   setupController: function (controller, model) {   
       // console.log(model.chart.content.length);
        var m =[];
        for(var i=0;i<model.chart.content.length;i++){
           m.push(model.chart.content[i]._data);
        }
        controller.set('chartdata', m);     
    },
    */
    afterModel: function(model, transition) {


        var ajax = $.ajax;
        $.extend({
            ajax: function(url, options) {
                if (typeof url === 'object') {
                    options = url;
                    url = undefined;
                }
                options = options || {};
                url = options.url;
                var xsrftoken = $('meta[name=_xsrf]').attr('content');
                var headers = options.headers || {};
                var domain = document.domain.replace(/\./ig, '\\.');
                if (!/^(http:|https:).*/.test(url) || eval('/^(http:|https:)\\/\\/(.+\\.)*' + domain + '.*/').test(url)) {
                    headers = $.extend(headers, {'X-Xsrftoken':xsrftoken});
                }
                options.headers = headers;
                
                return ajax(url, options);
            }
        });


      /*
          $.post("/join", {uname: '',tech :'Long Polling'});
          var myStore = this.store;       
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
          var fetch = function () {
              if (isWait) return;
              isWait = true;
              $.getJSON("/lp/fetch?lastReceived=" + lastReceived, function (data) {
                  if (data == null) return;
                    //console.log(data);
                  $.each(data, function (i, event) {
                      switch (event.Type) { 

                      case 3: // Price                          
                           updateAnalyst(event);                      
                      case 4: // Analyst                          
                           updateAnalyst(event);
                          break;
                      }
                      lastReceived = event.Timestamp;
                  });
                  isWait = false;
              });
          }
          setInterval(fetch, 1000);  
        },
        */

});




WebApp.ApplicationController = Ember.Controller.extend({
  
  isLogin:true,
  isSignup:false,
  isForegetPassword:false, 

});

/* websocket
WebApp.ApplicationView = Ember.View.extend({
    didInsertElement: function() {

      var account= 'tester';
      var s ='ws://' + window.location.host + '/ws/join?uname='+account;
      socket = new WebSocket(s);
      // Message received on the socket
      socket.onmessage = function (event) {
          var data = JSON.parse(event.data);
         // console.log(data);
          switch (data.Type) {
          case 0: // JOIN
              if (data.User == $('#uname').text()) {
                  $("#chatbox li").first().before("<li>You joined the chat room.</li>");
              } else {
                  $("#chatbox li").first().before("<li>" + data.User + " joined the chat room.</li>");
              }
              break;
          case 1: // LEAVE
              $("#chatbox li").first().before("<li>" + data.User + " left the chat room.</li>");
              break;
          case 2: // MESSAGE
              $("#chatbox li").first().before("<li><b>" + data.User + "</b>: " + data.Content + "</li>");
              //this.store.update('indice',{id:1,sellPrice:data.Content});
              break;
          }
      };


      // Send messages.
      var postConecnt = function () {
          var uname = $('#uname').text();
          var content = $('#sendbox').val();
          socket.send(content);
          $('#sendbox').val("");
      }

      $('#sendbtn').click(function () {
          postConecnt();
      });

        
    }
});
*/

WebApp.ApplicationView = Ember.View.extend({
  didInsertElement: function() {
    //AjaxNotice.initializeGlobalEvents();
    fixLang();
  }
});



//WebApp.ApplicationView = WebApp.SinglePageView.extend({templateName:"application"}); 