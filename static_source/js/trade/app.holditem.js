
WebApp.HolditemController = Ember.ArrayController.extend(Ember.PaginationMixin, {
    itemsPerPage:5,
    
   routeTo:'holditem.page',
   showTableTh :false,
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
         sellFilter:function(params){
             //var result =this.store.find('hold',{type:'sell',symbol:params});
              this.set('model', this.store.find('holditem',{type:'sell',symbol:params}));
        }, 
        buyFilter:function(params){
            // var result =this.store.find('hold',{type:'buy',symbol:params});
              this.set('model', this.store.find('holditem',{type:'buy',symbol:params}));
        },
         allFilter:function(params){
          //   var result =this.store.find('hold',{symbol:params});
              this.set('model', this.store.find('holditem',{symbol:params}));
        }

    },    
   
});


WebApp.HolditemPageRoute = Ember.Route.extend({
    model: function(params) {
        
      
        return Ember.Object.create({id: params.page_id});
    },
    setupController: function(controller, model) {
        this.controllerFor('holditem').set('selectedPage', model.get('id'));
    }
});




