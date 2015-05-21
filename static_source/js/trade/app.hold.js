/*
WebApp.HoldView = Ember.View.extend({  
    didInsertElement: function() {
      console.log('HoldView didInsertElement');
         $('.btn-default').click( function() {
                  $('.btn-default').removeClass('active');
                //console.log('button clicked');
             });
    }
});

WebApp.HoldController = Ember.ArrayController.extend(Ember.PaginationMixin, {
    itemsPerPage:2,
      symbol :null, 
   routeTo:'hold.page',
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
          setFilter:function(params){
            console.log(' hold controller setFilter params:'+params);
                 
            if (this.get('model.query.symbol')){
                this.set('symbol',this.get('model.query.symbol'));
            };
            if (params){
                this.set('model', this.store.find('hold',{type:params}));
            } else
            {
                this.set('model', this.store.find('hold'));

            }
        },         
         checkDetail:function(params){
          console.log(params);
            // var result =this.store.find('hold',{symbol:params.symbol});
             // this.set('model', result);
        },

    },    
   
});


WebApp.HoldPageRoute = Ember.Route.extend({
    model: function(params) {
        
      
        return Ember.Object.create({id: params.page_id});
    },
    setupController: function(controller, model) {
        this.controllerFor('hold').set('selectedPage', model.get('id'));
    }
});




*/