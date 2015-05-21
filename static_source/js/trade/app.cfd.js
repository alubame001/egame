/*
WebApp.Router.map(function() {

  this.resource('cfd', { path: '/cfd/:symbol'},function() {    
    }); 
});
*/
WebApp.CfdRoute = Ember.Route.extend({
  beforeModel : function(params) {
    console.log(params);
},
 model: function(params) {
    return Ember.RSVP.hash({ // 这里 model 对象包含多种子对象 
      orderhistory :this.store.find('orderhistory',{symbol:params.symbol}),    
      delegation :this.store.find('delegation',{symbol:params.symbol}),
      currency :this.store.find('indice',{kind:'currency'}),
      index :this.store.find('indice',{kind:'index'}),      
    });
  }, setupController: function (controller, model) {
    controller.set('model', model); 
  
  }

});

WebApp.CfdView = Ember.View.extend({
    templateName :'cfd',
    didInsertElement: function() {
               $(".nav").slide({ type:"menu",  titCell:".m", targetCell:".sub", effect:"slideDown", delayTime:300, triggerTime:100,returnDefault:true  });
      console.log('cfdview');
        $(".orderBox").slide();
       // GetHighStockData();
        
    }
});





