
WebApp.DailyreportdetailView = Ember.View.extend({  
    didInsertElement: function() {
    }
});

WebApp.DailyreportdetailController = Ember.ArrayController.extend(Ember.PaginationMixin, {
  itemsPerPage:10,
  routeTo:'dailyreportdetail.page',
  actions:{
      moveForward:function(params){
          this.set('selectedPage', params.id);
      },
      moveBackward:function(params){   
          this.set('selectedPage', params.id);
      },
      goToPage:function(params){        

          this.set('selectedPage', params);
      },
      fold:function(params){        

           $("tr.detail").slideToggle("fast");
      },        
       

  },    
   
});


WebApp.DailyreportPageRoute = Ember.Route.extend({
    model: function(params) {
        
      
        return Ember.Object.create({id: params.page_id});
    },
    setupController: function(controller, model) {
        this.controllerFor('dailyreportdetail').set('selectedPage', model.get('id'));
    }
});




