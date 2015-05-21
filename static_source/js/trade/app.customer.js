

 var regex = new RegExp('');
WebApp.Router.map(function() {
  this.resource('customer', function() {  
      this.resource('cfd', { path: '/cfd/:symbol'},function() {    
        }); 
 

  });           
});

WebApp.CustomerView = Ember.View.extend({
    templateName: 'customer',
    didInsertElement: function() {
     // this.$(".slideTxtBox").slide();
        $('#customerTab a:first').tab('show');//初始化显示哪个tab 
        $('#customerTab a').click(function (e) { 
        e.preventDefault();//阻止a链接的跳转行为 
        $(this).tab('show');//显示当前选中的链接及关联的content 
        }) 

    },

});





WebApp.CustomerRoute = Ember.Route.extend({ 
queryParams: ['searchString'],
  searchString: null,    
    model: function(params) {

      return Ember.RSVP.hash({ // 这里 model 对象包含多种子对象 
         //customer: this.store.find('customer'), 
         price :this.store.find('price'),
         /*
         all :this.store.filter('price', function(record){
             var regex = new RegExp('');
             return record.get("cid").match(regex)}
          ),  
*/  
         index :this.store.filter('price', function(record){
              regex =  RegExp(this.get('searchString'));
             return record.get("cid").match(regex)}
          ),  

         currency :this.store.filter('price', function(record){return record.get('kind') == 'currency'}),   
         energy :this.store.filter('price', function(record){return record.get('kind') == 'energy'}),   
         //stock :this.store.filter('price', function(record){return record.get('kind') == 'stock'}),   
         stock :this.store.filter('price', function(record){
          return record.get('kind') == 'stock'}),           
        });
    },

    afterModel: function(model, transition) {


      $.post("/join", {
                  uname: '',
                  tech :'Long Polling'
              });
      var myStore = this.store;       
      var lastReceived = 0;
      var isWait = false;
      var updatePrice = function (data){
         
          
            myStore.update('price',{id:data.Id,price:data.P,change:data.C,change_rate:data.R});

      }

      var fetch = function () {
          if (isWait) return;
          isWait = true;
          $.getJSON("/lp/fetch?lastReceived=" + lastReceived, function (data) {
              if (data == null) return;
               
              $.each(data, function (i, event) {
                  switch (event.Type) {
                  case 0: // JOIN
                      if (event.User == $('#uname').text()) {
                          $("#chatbox li").first().before("<li>You joined the chat room.</li>");
                      } else {
                          $("#chatbox li").first().before("<li>" + event.User + " joined the chat room.</li>");
                      }
                      break;
                  case 1: // LEAVE
                      $("#chatbox li").first().before("<li>" + event.User + " left the chat room.</li>");
                      break;
                  case 2: // MESSAGE
                      $("#chatbox li").first().before("<li><b>" + event.User + "</b>: " + event.Content + "</li>");
                      break;
                  case 3: // Price
                      // console.log(event)
                       updatePrice(event);


                      break;

                  }

                  lastReceived = event.Timestamp;
              });
              isWait = false;
          });
      }

      // Call fetch every 1 seconds
      setInterval(fetch, 1000);



    },

      actions:{
        updateSeachString:function(value){
          this.set('searchString', value);
          console.log( this.get('searchString'));

/*
          model: function() {
                return Ember.RSVP.hash({ // 这里 model 对象包含多种子对象 
                   index :this.store.filter('price', function(record){
                        regex =  RegExp(this.get('searchString'));
                       return record.get("cid").match(regex)}
                    ),  

              } , 
*/




        }

      
    }, 
  setupController: function (controller, model) {
    
    controller.set('content', model);  
       
  },

});



WebApp.CustomerkindView = Ember.View.extend({
    didInsertElement: function() {
        $('#myTab a:first').tab('show');//初始化显示哪个tab 
        $('#myTab a').click(function (e) { 
        e.preventDefault();//阻止a链接的跳转行为 
        $(this).tab('show');//显示当前选中的链接及关联的content 
        }) 
    },
});
WebApp.CustomerkindRoute = Ember.Route.extend({

    model: function(params) {
      return Ember.RSVP.hash({ // 这里 model 对象包含多种子对象 
        customer:this.store.filter('customer', function(record){return record.get('kind') == params.kind}),    
         marketmaker: this.store.find('marketmaker',{kind:params.kind}),  
         hold: this.store.find('hold',{kind:params.kind}),  
         dailyreport: this.store.find('dailyreport',{kind:params.kind}),           
           
      });
    },  
    afterModel: function(model, transition) {

        if (model.customer.content.length=== 1) {
          // this.transitionTo('cfddetail',  model.indice.content[0]._data.symbol);
        }
    }
}); 



