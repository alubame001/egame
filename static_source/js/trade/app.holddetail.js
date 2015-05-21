/*
WebApp.HolddetailController = Ember.ArrayController.extend(Ember.PaginationMixin, {
    itemsPerPage:5,
    
   routeTo:'holddetail.page',
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
              this.set('model', this.store.find('holddetail',{type:'sell',symbol:params}));
        }, 
        buyFilter:function(params){
            // var result =this.store.find('hold',{type:'buy',symbol:params});
              this.set('model', this.store.find('holddetail',{type:'buy',symbol:params}));
        },
         allFilter:function(params){
          //   var result =this.store.find('hold',{symbol:params});
              this.set('model', this.store.find('holddetail',{symbol:params}));
        }

    },    
   
});


WebApp.HolddetailPageRoute = Ember.Route.extend({
    model: function(params) {
        
      
        return Ember.Object.create({id: params.page_id});
    },
    setupController: function(controller, model) {
        this.controllerFor('holddetail').set('selectedPage', model.get('id'));
    }
});




*/

/*

WebApp.HolddetailController = Ember.ArrayController.extend(Ember.PaginationMixin, {
    itemsPerPage:5,

    // routeTo:'loginip.page',

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
             var result =this.store.find('holddetail',{symbol:params,type:'sell'});
              this.set('model', result);
        }, 
        buyFilter:function(params){
             var result =this.store.find('holddetail',{symbol:params,type:'buy'});
              this.set('model', result);
        },
         allFilter:function(params){
             var result =this.store.find('holddetail',{symbol:params});
              this.set('model', result);
        }
    },   
   
});






WebApp.HolddetailPageRoute = Ember.Route.extend({
    model: function(params) {  
        return Ember.Object.create({id: params.page_id});
    },
    setupController: function(controller, model) {
        this.controllerFor('holddetail').set('selectedPage', model.get('id'));
    }
});
*/

WebApp.HolddetailRoute = Ember.Route.extend({
  beforeModel : function(params) {
    console.log('HolddetailRoute:'+params);
},
 model: function(params) {
    return Ember.RSVP.hash({ // 这里 model 对象包含多种子对象 
         hold :this.store.find('hold',{'master_id':params.master_id}),         
         holditem :this.store.find('holditem',{'master_id':params.master_id}),    


    });
  }, setupController: function (controller, model) {
    controller.set('model', model); 
  
  },
    

});


WebApp.HolddetailView = Ember.View.extend({
   // templateName :'bankdetail',
    didInsertElement: function() {
     
      console.log('HolddetailView');

        
    }
});


