
WebApp.SinglePageView = Ember.View.extend({
  didInsertElement: function() {    
    fixLang();
  }
});

//WebApp.SinglePageController = Ember.ArrayController.extend(Ember.PaginationMixin, {


WebApp.SinglePageController = Ember.Controller.extend(Ember.PaginationMixin, {
  dataName:null,
  searchEnabled:true,
  paginationEnabled:true,
  pageNumberEnabled:true,
  seachFiled :'cid',
  
  selectedPage :null,
  itemsPerPage:3,
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
/*
        chooseId: function(params) {
          var result = this.store.filter(this.get('dataName'), function(record){ 
            if (params!= null){ 
              return record.get(this.get('searchField')) == params
            } else {
               return record
            }
          }) 
          this.set('content',result );
          this.set('selectedPage',1);    
  

        }, 
*/
        choose: function(params) {
          var result = this.store.filter(this.get('dataName'), function(record){ 
            if (params!= null){ 
              return record.get('kind') == params
            } else {
               return record
            }
          }) 
          this.set('content',result );
          this.set('selectedPage',1);    
  
          fixLang(); 
        },    
        updateSeachString:function(value){

          var  regex = new RegExp(value);     
          var search =    this.get('seachFiled')  
          var result = this.store.filter(this.get('dataName'), function(record){ return record.get(search).match(regex) })  
          this.set('content',result );
          this.set('selectedPage',1);    
          fixLang();
        }          
 


    },      
});
WebApp.SinglePageView = Ember.View.extend({ 
  templateName:'singlepage',
   didInsertElement: function() {
        $('#myTab a:first').tab('show');//初始化显示哪个tab 
        $('#myTab a').click(function (e) { 
        e.preventDefault();//阻止a链接的跳转行为 
        $(this).tab('show');//显示当前选中的链接及关联的content 
        }) 
    },

});

WebApp.SinglePageRoute = Ember.Route.extend({	
    dataName:null,
    model: function(params) {    
      return Ember.RSVP.hash({ 
         detail: this.store.find(this.get('dataName')), 
      });
    },       
}); 
