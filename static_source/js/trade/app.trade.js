WebApp.Router.map(function() {
     this.resource('trade', function() {     
        
    });         
});


WebApp.TradeView = Ember.View.extend({
    templateName: 'trade',
    didInsertElement: function() {
     console.log('tradeview')   
            //  $(".slideTxtBox").slide();   
             // $("#sideMenu").slide({ titCell:".hd", targetCell:".bd",effect:"slideDown",trigger:"click" });
             // $(".picScroll").slide({ mainCell:"ul",autoPlay:true,effect:"left", vis:4, scroll:2, autoPage:true, pnLoop:false });   

     
    }
});


WebApp.TradeCurrencyView = Ember.View.extend({
    templateName: 'trade',
    didInsertElement: function() {
     //console.log('tradeview')   
            //  this.$(".slideTxtBox").slide();   
              this.$(".picScroll").slide({ mainCell:"ul",autoPlay:true,effect:"left", vis:5, scroll:2, autoPage:true, pnLoop:false });   


     
    }
});

/*
WebApp.Trade.find({'kind':'currency'}).then(function(item) {
  item.set('buyPrice', 1000).save();

});

WebApp.Trade.push(     {id:7,change:0,buyPrice:380,sellPrice:0,tradeAvailable:1,kind:"index",eid:"FTSE2",symbol:"FTSE2",cid:"英国富时2"});
  this.store.pushPayload('trade', {id:7,change:0,buyPrice:380,sellPrice:0,tradeAvailable:1,kind:"index",eid:"FTSE2",symbol:"FTSE2",cid:"英国富时2"});
  store.pushPayload('trade', {id:7,change:0,buyPrice:380,sellPrice:0,tradeAvailable:1,kind:"index",eid:"FTSE2",symbol:"FTSE2",cid:"英国富时2"});
*/




WebApp.TradeRoute = Ember.Route.extend({
   
    model: function() {
    return Ember.RSVP.hash({ // 这里 model 对象包含多种子对象 
      currency :this.store.find('trade',{'kind':'currency'}),
           // index :this.store.find('trade',{'kind':'index'}),
     // currency: WebApp.Trade.find(),
  //    currency: WebApp.Trade.find({'kind':'currency'}),
       index: this.store.find('trade',{'kind':'index'}),



     
    });
  },
  setupController: function(controller, model) {
    controller.set('model', model);
  }
});


