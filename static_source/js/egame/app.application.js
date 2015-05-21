/*
WebApp.Router.map(function() {
  this.route('catchall', {path: '/*wildcard'});
});

*/

WebApp.Router.map(function() {
 
     
});




WebApp.ApplicationRoute = Ember.Route.extend({
  
    actions: {
      error: function (params) {
        console.log(params)
        
        //this.transitionTo('catchall', "application-error");
      }
    },

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
      
            

          */
      },
        

});




WebApp.ApplicationController = Ember.Controller.extend({
  
  isLogin:true,
  isSignup:false,
  isForegetPassword:false, 

});



WebApp.ApplicationView = Ember.View.extend({
    didInsertElement: function() {


       fixLang();
   /*    
      var xsrftoken = $('meta[name=_xsrf]').attr('content');;
 
      var s ='ws://' + window.location.host + '/egame/ws/join?uname='+xsrftoken;
      socket = new WebSocket(s);
      // Message received on the socket
         socket.connect = function (event) {
          alert('connect')
       }    
       socket.onclose = function (event) {
          alert('closed')
       }
      socket.onmessage = function (event) {
          var data = JSON.parse(event.data);

         // var myJSONObject = '{"name": "Ray","type":4}'
         // console.log(content);
          //socket.send(myJSONObject);
         console.log(data);
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
          
          var myJSONObject = '{"name": "Ray","type":4}'

          var uname = xsrftoken;
          var content = $('#sendbox').val();
         // console.log(content);
          socket.send(myJSONObject);
          $('#sendbox').val("");
      }

      $('#sendbtn').click(function () {
          postConecnt();
      });

      */

    }
});

/*
WebApp.ApplicationView = Ember.View.extend({
  didInsertElement: function() {
    //AjaxNotice.initializeGlobalEvents();
    fixLang();
  }
});
*/

