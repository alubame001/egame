WebApp.Router.map(function() {
     this.resource('home', function() {   
    
    });
});


WebApp.HomeView = Ember.View.extend({
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
      */
/*

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

WebApp.HomeController = Ember.Controller.extend({
  //isLogin:true,
  //isSignup:false,
 // isForegetPassword:false, 

    //   needs: 'application',



});
/*

WebApp.AnalystuidView = WebApp.SinglePageView.extend({ templateName:'analystpage' }); 
WebApp.AnalystuidController = WebApp.SinglePageController.extend({
    searchEnabled:false,
  paginationEnabled:false,
});

*/