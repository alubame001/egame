WebApp.Router.map(function() {
     this.resource('marketmaker', function() {   
       
        this.resource('mmkind', { path: '/kind/:kind'},function() {           
            this.resource("cfddetail", { path: "/symbol/:symbol" }, function() {     
             });    
         //   this.resource("report", { path: "/report/:date" }, function() {
           //  });   

        }); 
          /*
        this.resource("holddetail", { path: "/id/:master_id" }, function() {                     
        });
        */
    });   


});


WebApp.MarketmakerView = Ember.View.extend({
    templateName: 'marketmaker',
    didInsertElement: function() {
    },

});

WebApp.MmkindView = Ember.View.extend({
    didInsertElement: function() {
        $('#myTab a:first').tab('show');//初始化显示哪个tab 
        $('#myTab a').click(function (e) { 
        e.preventDefault();//阻止a链接的跳转行为 
        $(this).tab('show');//显示当前选中的链接及关联的content 
        }) 
    },
});

WebApp.MarketmakerRoute = Ember.Route.extend({
  /*
    uri :'ws://localhost:8080/ws/join?uname=',
    uname :'route',
    beforeModel: function() { 

      var myStore =  this.store;
   
       socket = new WebSocket(this.uri+this.uname);
              // Message received on the socket
   
          socket.onmessage = function (event) {
              var data = JSON.parse(event.data); 

              myStore.update('holditem',{id:1,profit:100000});
         //  WebApp.ApplicationStore.update('holditem',{id:1,profit:100});
            //  console.log(WebApp.ApplicationStore);
         };
          // callbacks
          socket.onopen = function() {
            console.log('Connection established /all');
              
          };
          socket.onclone = function() {
            console.log('Connection closed /' + 'all');

          };


      },

*/
    model: function() {
    return Ember.RSVP.hash({ // 这里 model 对象包含多种子对象 
       marketmaker: this.store.find('marketmaker'),   
       currency:this.store.filter('marketmaker', function(record){return record.get('kind') == 'currency'}),  
       index:this.store.filter('marketmaker', function(record){return record.get('kind') == 'index'}),  
       dailyreport: this.store.find('dailyreport'),           
         
      });
    } ,  
    afterModel: function(model, transition) {
    if (model.marketmaker.content.length=== 1) {
          //  this.transitionTo('mmkind',  model.marketmaker.content[0]._data.kind);
           
        }

    //var ws = WebApp.WebSocketHandler.create(
    //  {uname :'test',myStore:this.store})

       // this.set('socketData',ws.socketData); 



    } ,actions:{
        update:function(params){    

            var pushData =[{id:1,profit:100},{id:2,profit:300},{id:3,profit:300}];
           for(var i=0;i<pushData.length;i++){
              this.store.update('holditem',pushData[i]);
            }
 //            this.store.update('holditem',{id:1,profit:params});
/*
                this.store.find('holditem', 1).then(function (post) {
                    console.log(post);
                    post.get('amount'); // => "Rails is Omakase"
                    post.set('amount', '123');
                    post.save(); // => PUT to '/posts/1'
                });

*/
        },


      
    }, 
  setupController: function (controller, model) {



    controller.set('content', model);  
   
     // console.log(model.currency.content.length);  
     /*
     var m =[];
        for(var i=0;i<model.currency.content.length;i++){
          console.log(model.currency.content[i]._data);
           m.push(model.currency.content[i]._data);
        }
    */

             var m =[];
        for(var i=0;i<model.dailyreport.content.length;i++){
          //console.log(model.dailyreport.content[i]._data.time);
          var d3time = d3.time.format('%Y-%m-%d').parse(model.dailyreport.content[i]._data.time);
          var newdata =model.dailyreport.content[i]._data;
              if (newdata.kind=='currency') {
                newdata.kind='外汇基金'
              }
              if (newdata.kind=='index') {
                newdata.kind='指数基金'
              }
             newdata.time = d3time;
             newdata.label = newdata.kind;
             //console.log(newdata)
           m.push(newdata);
        }

        controller.set('chartdata_netvalue', m);     

 

  },

});

WebAppMarketmakerController = Ember.Controller.extend({
  test :'teststr',
  count: function() {
    var model = this.get('model');
    var items = model.currency;
    return items.filterBy('symbol', 'BTCUSD').get('length');
  }.property('items.@each.symbol'), 

});

WebApp.MmkindController = Ember.Controller.extend({

  count: function() {
    var model = this.get('model');
    var items = model.currency;
    return items.filterBy('symbol', 'BTCUSD').get('length');
  }.property('items.@each.symbol'), 

});

WebApp.MmkindRoute = Ember.Route.extend({

    model: function(params) {
      return Ember.RSVP.hash({ // 这里 model 对象包含多种子对象 
         //currency :this.store.find('indice',{'kind':'currency'}),
         //indice: this.store.find('indice',{'kind':params.kind}),
         marketmaker: this.store.find('marketmaker',{kind:params.kind}),  
         hold: this.store.find('hold',{kind:params.kind}),  

        // orderhistory: this.store.find('orderhistory',{kind:params.kind}),           
         //currency:this.get('store').filter('hold', function(record){return record.get('kind') == 'currency'}),
         //BTCUSD:this.store.filter('hold', function(record){return record.get('symbol') == 'BTCUSD'}),    
         chart: this.store.find('chart'),  
         dailyreport: this.store.find('dailyreport',{kind:params.kind}),           
           
      });
    },  
    afterModel: function(model, transition) {

        if (model.marketmaker.content.length=== 1) {
          // this.transitionTo('cfddetail',  model.indice.content[0]._data.symbol);
        }
    }
}); 


