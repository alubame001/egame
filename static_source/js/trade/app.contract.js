WebApp.Router.map(function() {
     this.resource('contract', function() {   
        this.route('uid', {path: 'uid/:uid'},function() {              
         }); 

                   
    });
});



WebApp.ContractRoute  = WebApp.SinglePageRoute.extend({
  dataName :'contract',

  model: function(params) {   
      return Ember.RSVP.hash({ 
          detail:this.store.find('contract'),
          trade:this.store.find('trade'),

      });
    }
});

WebApp.ContractpageController = WebApp.SinglePageController.extend({
  dataName :'contract',
  itemsPerPage:2,
  searchEnabled:true,
  paginationEnabled:true, 

});








WebApp.ContractUidRoute = Ember.Route.extend({
   dataName :'contract', 
    model: function(params) {      
    
      console.log(params)
      return Ember.RSVP.hash({ 
         mp: this.store.find('mp',{uid:params.uid}),  
          buy:this.store.filter('mp', function(record){return record.get('type') == "buy"}),  
          sell:this.store.filter('mp', function(record){return record.get('type') == "sell"}),  
         detail:this.store.filter(this.get('dataName'), function(record){return record.get('uid') == params.uid}),  
      });
    },
    afterModel: function(model, transition) {
      console.log(model.detail.content[0]._data.cid)
     GetHighStockData(model.detail.content[0]._data.cid);
    },
  
         
      
}); 

WebApp.ContractuidView = WebApp.SinglePageView.extend({ templateName:'contractpage' }); 
WebApp.ContractuidController = WebApp.SinglePageController.extend({
    searchEnabled:false,
  paginationEnabled:false,
});

WebApp.MatchpageView = WebApp.SinglePageView.extend({ templateName:'contractpage' }); 
WebApp.MatchpageController = WebApp.SinglePageController.extend({
   itemsPerPage:5, 
    searchEnabled:false,
  paginationEnabled:true,
  pageNumberEnabled:false
});
WebApp.TradepageController = WebApp.SinglePageController.extend({
  dataName :'trade',
  itemsPerPage:10,
  searchEnabled:false,
  paginationEnabled:true, 

});
