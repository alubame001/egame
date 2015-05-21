
WebApp.IndiceView = Ember.View.extend({  
    didInsertElement: function() {

    }
});

WebApp.IndiceController = Ember.ArrayController.extend(Ember.PaginationMixin, {
    itemsPerPage:5,
   routeTo:'indice.page',
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


WebApp.IndicePageRoute = Ember.Route.extend({
    model: function(params) {
       
      
        return Ember.Object.create({id: params.page_id});
    },
    setupController: function(controller, model) {
     
        this.controllerFor('indice').set('selectedPage', model.get('id'));
    }
});




