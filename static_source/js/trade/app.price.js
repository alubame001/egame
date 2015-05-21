WebApp.Router.map(function() {
     this.resource('price', function() {   
        this.route('uid', {path: 'uid/:uid'},function() {              
         });                    
    });
});

WebApp.PriceRoute  = WebApp.SinglePageRoute.extend({  
  dataName :'price',
    
 model: function(params) {

      return Ember.RSVP.hash({ // 这里 model 对象包含多种子对象 

         detail :this.store.find(this.get('dataName')),


         index :this.store.filter(this.get('dataName'), function(record){return record.get('kind') == 'index'}),   
         currency :this.store.filter(this.get('dataName'), function(record){return record.get('kind') == 'currency'}),   
         energy :this.store.filter(this.get('dataName'), function(record){return record.get('kind') == 'energy'}),   
         stock :this.store.filter(this.get('dataName'), function(record){return record.get('kind') == 'stock'}),           
        });
    },

});
WebApp.PricepageController = WebApp.SinglePageController.extend({
    dataName :'price',
    seachFiled :'cid',
    itemsPerPage:5,
    searchEnabled:true,
    paginationEnabled:true,  
});


WebApp.MatchpageController = WebApp.SinglePageController.extend({
    dataName :'match',
    seachFiled :'cid',
    itemsPerPage:5,
    searchEnabled:false,
    paginationEnabled:false,  
});

