WebApp.Router.map(function() {
     this.resource('analyst', function() {   
        this.route('uid', {path: 'uid/:uid'},function() {              
         }); 
         this.route('search', {path: 'search/:query'},function() {              
         }); 
                   
    });
});



WebApp.AnalystRoute  = WebApp.SinglePageRoute.extend({dataName :'analyst'});

WebApp.AnalystpageController = WebApp.SinglePageController.extend({
  dataName :'analyst',
  itemsPerPage:5,
    searchEnabled:true,
  paginationEnabled:true,  
});



//WebApp.AnalystIdView = Ember.View.extend({ templateName:'analystdata' });



WebApp.Router.map(function() {
     this.resource('hold', function() {   
    });
});
WebApp.HoldRoute  =WebApp.SinglePageRoute.extend({dataName :'hold',});
WebApp.HoldpageView = WebApp.SinglePageView.extend(); 
WebApp.HoldpageController = WebApp.SinglePageController.extend({
  //dataName :'hold',
  contentName :'hold_content',
  searchEnabled:false,
  paginationEnabled:false,
  itemsPerPage:2,
});
 //WebApp.HoldController = WebApp.SinglePageController.extend({dataName :'hold'});  

WebApp.AnalystUidRoute = Ember.Route.extend({
    model: function(params) {      
      return Ember.RSVP.hash({ 
         hold: this.store.find('hold',{uid:params.uid}),  
         detail:this.store.filter('analyst', function(record){return record.get('uid') == params.uid}),  
      });
    }
}); 


/*
WebApp.UidpageView = WebApp.SinglePageView.extend({ templateName:'analystpage' }); 
WebApp.UidpageController = WebApp.SinglePageController.extend({
    searchEnabled:false,
  paginationEnabled:false,
});
*/
WebApp.AnalystuidView = WebApp.SinglePageView.extend({ templateName:'analystpage' }); 
WebApp.AnalystuidController = WebApp.SinglePageController.extend({
    searchEnabled:false,
  paginationEnabled:false,
});