/*
WebApp.Router.map(function() {
  this.route('catchall', {path: '/*wildcard'});
});

*/

WebApp.ApplicationRoute = Ember.Route.extend({
  
    actions: {
      error: function (params) {
        console.log(params)   
        
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
     }     


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