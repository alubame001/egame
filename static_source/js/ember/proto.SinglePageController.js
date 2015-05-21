WebApp.SinglePageController = Ember.ArrayController.extend(Ember.PaginationMixin, {
  selectedPage :null,
  itemsPerPage:3,
  actions:{
        moveForward:function(params){
            this.set('selectedPage', params.id);
           // console.log(params);
        },
        moveBackward:function(params){   
            this.set('selectedPage', params.id);
        },
        goToPage:function(params){        

            this.set('selectedPage', params);
        },
    },      
});