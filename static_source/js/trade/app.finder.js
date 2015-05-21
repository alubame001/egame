WebApp.Router.map(function() {
     this.resource('finder', function() {   
       
        this.resource('mmkind', { path: '/kind/:kind'},function() {           
            this.resource("cfddetail", { path: "/symbol/:symbol" }, function() {     
             });  

        }); 

    });   


});


WebApp.Finder = Ember.View.extend({
  
    didInsertElement: function() {
    },

});
/*
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



    } ,actions:{
        update:function(params){    

            var pushData =[{id:1,profit:100},{id:2,profit:300},{id:3,profit:300}];
           for(var i=0;i<pushData.length;i++){
              this.store.update('holditem',pushData[i]);
            }

        },


      
    }, 
  setupController: function (controller, model) {



    controller.set('content', model);  
   

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


*/