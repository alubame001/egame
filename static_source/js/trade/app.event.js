WebApp.Router.map(function() {
     this.resource('event', function() {   
        this.route('uid', {path: 'uid/:uid'},function() {              
         }); 

                   
    });
});



WebApp.EventRoute  = WebApp.SinglePageRoute.extend({dataName :'event'});

WebApp.EventpageController = WebApp.SinglePageController.extend({
  dataName :'event',
  itemsPerPage:5,
    searchEnabled:true,
  paginationEnabled:true,  
});






/*
WebApp.EventUidRoute = Ember.Route.extend({
    model: function(params) {      
      return Ember.RSVP.hash({ 
         hold: this.store.find('hold',{uid:params.uid}),  
         detail:this.store.filter('analyst', function(record){return record.get('uid') == params.uid}),  
      });
    }
}); 


WebApp.UidpageView = WebApp.SinglePageView.extend({ templateName:'analystpage' }); 
WebApp.UidpageController = WebApp.SinglePageController.extend({
    searchEnabled:false,
  paginationEnabled:false,
});
*/