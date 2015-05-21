

WebApp.CfddetailRoute = Ember.Route.extend({
  beforeModel : function(params) {
   // console.log('cfddetailRoute:'+params.symbol);
},
 model: function(params) {
    if (params.symbol){
      return Ember.RSVP.hash({ // 指定symbol
        orderhistory :this.store.find('orderhistory',{symbol:params.symbol}),    
        delegation :this.store.find('delegation',{symbol:params.symbol}),  
        hold :this.store.find('hold',{symbol:params.symbol}),  


      });
    } else{
      return Ember.RSVP.hash({ //全部
        orderhistory :this.store.find('orderhistory'),    
        delegation :this.store.find('delegation'),  
        hold :this.store.find('hold'),  
      });


    }
  }

});


WebApp.CfddetailView = Ember.View.extend({
    didInsertElement: function() {
        $(".orderBox").slide(); 
        
    }
});



