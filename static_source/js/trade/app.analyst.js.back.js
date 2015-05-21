WebApp.Router.map(function() {
     this.resource('analyst', function() {   
        this.route('person', {path: 'person/:aid'},function() {              
         }); 
         this.route('search', {path: 'search/:query'},function() {              
         }); 
                   
    });
});




WebApp.AnalystView = Ember.View.extend({  
    templateName :"analyst",
    didInsertElement: function() {
    },
});

WebApp.AnalystPersonView = Ember.View.extend({  
    didInsertElement: function() {
      console.log("AnalystPersonView");

    },
});

WebApp.AnalystSearchView = WebApp.AnalystPersonView.extend();

WebApp.AnalystController = Ember.ObjectController.extend({
  
});


WebApp.AnalystRoute = Ember.Route.extend({

    model: function(params) {
     // console.log(params)
      // WebApp.Analyst.FIXTURES.push({id:1,nick:'test'})
      return Ember.RSVP.hash({ 
         analyst: this.store.find('analyst'),      
       //  price: this.store.find('price'),      
        // search:this.store.filter('analyst', function(record){
        //      return record.get('kind') == 'currency'
        //}),            
      });
    },  
    afterModel: function(model, transition) {


          $.post("/join", {uname: '',tech :'Long Polling'});
          var myStore = this.store;       
          var lastReceived = 0;
          var isWait = false;
          var updatePrice = function (data){
            console.log(data)
             myStore.update('price',{id:data.Id,price:data.P,change:data.C,change_rate:data.R});
          }
          var updateAnalyst = function (data){
            //console.log(data)
            myStore.update('analyst',{id:data.Id,total_profit:data.P});
          }
          var fetch = function () {
              if (isWait) return;
              isWait = true;
              $.getJSON("/lp/fetch?lastReceived=" + lastReceived, function (data) {
                  if (data == null) return;
                    //console.log(data);
                  $.each(data, function (i, event) {
                      switch (event.Type) { 

                      case 3: // Price                          
                           updateAnalyst(event);                      
                      case 4: // Analyst                          
                           updateAnalyst(event);
                          break;
                      }
                      lastReceived = event.Timestamp;
                  });
                  isWait = false;
              });
          }
          setInterval(fetch, 1000);
         



        },
    
    actions:{
        searchTotalProfitPercent:function(params){        
            console.log(params);
           // this.set('model', this.store.filter('analyst', function(record){return record.get('monthlyProfitPercent') >= params});
        },  
    },
    
}); 


WebApp.AnalystPersonRoute = Ember.Route.extend({


    model: function(params) {
      console.log(params);
      return Ember.RSVP.hash({ 

         analyperson: this.store.find('analyst',{kind:params.pid}),  
         person:this.store.filter('analyst', function(record){return record.get('aid') == params.aid}),  
         search:this.store.filter('analyst', function(record){return record.get('monthlyProfitPercent') >= params.query}),              
           
      });
    },  
    afterModel: function(model, transition) {
      
        if (model.analyperson.content.length=== 1) {
          // this.transitionTo('cfddetail',  model.indice.content[0]._data.symbol);
        }
    }
}); 


//WebApp.AnalystSearchRoute = WebApp.AnalystPersonRoute.extend();



WebApp.AnalystdataController = Ember.ArrayController.extend(Ember.PaginationMixin, {
  itemsPerPage:3,
  queryParams: ['nick','fellowPerson','kind','searchString'],
  nick: null,  
  fellowPerson: null,  
  kind: null,  
  searchString: null,
  content: function() {
 // paginatedContent: function() {
     var nick = this.get('nick');    
     var fellowPerson = this.get('fellowPerson');    
     var kind = this.get('kind');    
     var searchString = this.get('searchString');    
     
      if (kind) {
         console.log(kind)
        return this.store.filter('analyst', function(record){ return record.get('kind') == kind})     
      } else if (searchString){
       
            var  regex = new RegExp(searchString);
             console.log(regex)
           
           return this.store.filter('analyst', function(record){ return record.get("nick").match(regex) })     
      }
      else {
        return this;
      }
  }.property('nick','fellowPerson','kind','searchString'),  

  actions:{
        moveForward:function(params){
            this.set('selectedPage', params.id);
            console.log(params);
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
        choose: function(params) {
          this.set('fellowPerson',null );
          this.set('nick', null);
          this.set('kind', params);


            },   

        all: function() {
          this.set('fellowPerson',null );
          this.set('nick', null);
          this.set('kind', null);

            },    


        change: function() {
                         this.set('fellowPerson',null );
              this.set('nick', 'a0000210');

            },

         biggerthan: function() {
           this.set('nick',null );
              this.set('fellowPerson', 33);
              
            } ,
            updateSeachString:function(value){
                console.log(value);
                this.set('fellowPerson',null );
                this.set('nick', null);
                this.set('kind', null);             
                this.set('searchString',value );
                //this.set('paginatedContent',this.content);

                console.log( this.get('paginatedContent').length);
                console.log( this.get('content').length);
            }          
 
    },    
   
});


WebApp.AnalystdataPageRoute = Ember.Route.extend({
    model: function(params) {
       
      
        return Ember.Object.create({id: params.page_id});
    },
    setupController: function(controller, model) {
     
        this.controllerFor('analystdata').set('selectedPage', model.get('id'));
    }
});
/*
WebApp.MmkindView = Ember.View.extend({
    didInsertElement: function() {
        $('#myTab a:first').tab('show');//初始化显示哪个tab 
        $('#myTab a').click(function (e) { 
        e.preventDefault();//阻止a链接的跳转行为 
        $(this).tab('show');//显示当前选中的链接及关联的content 
        }) 
    },
});

WebApp.MarketmakerRoute = Ember.Route.extend({
 
    model: function() {
    return Ember.RSVP.hash({ // 这里 model 对象包含多种子对象 
       marketmaker: this.store.find('marketmaker'),   
       currency:this.store.filter('marketmaker', function(record){return record.get('kind') == 'currency'}),  
       index:this.store.filter('marketmaker', function(record){return record.get('kind') == 'index'}),  
       dailyreport: this.store.find('dailyreport'),           
         
      });
    } ,  
    afterModel: function(model, transition) {
    if (model.marketmaker.content.length=== 1) {
          //  this.transitionTo('mmkind',  model.marketmaker.content[0]._data.kind);
           
        }



    } ,actions:{
        update:function(params){    

            var pushData =[{id:1,profit:100},{id:2,profit:300},{id:3,profit:300}];
           for(var i=0;i<pushData.length;i++){
              this.store.update('holditem',pushData[i]);
            }

        },


      
    }, 
  setupController: function (controller, model) {



    controller.set('content', model);  
   

             var m =[];
        for(var i=0;i<model.dailyreport.content.length;i++){
          //console.log(model.dailyreport.content[i]._data.time);
          var d3time = d3.time.format('%Y-%m-%d').parse(model.dailyreport.content[i]._data.time);
          var newdata =model.dailyreport.content[i]._data;
              if (newdata.kind=='currency') {
                newdata.kind='外汇基金'
              }
              if (newdata.kind=='index') {
                newdata.kind='指数基金'
              }
             newdata.time = d3time;
             newdata.label = newdata.kind;
             //console.log(newdata)
           m.push(newdata);
        }

        controller.set('chartdata_netvalue', m);     

 

  },

});

WebAppMarketmakerController = Ember.Controller.extend({
  test :'teststr',
  count: function() {
    var model = this.get('model');
    var items = model.currency;
    return items.filterBy('symbol', 'BTCUSD').get('length');
  }.property('items.@each.symbol'), 

});

WebApp.MmkindController = Ember.Controller.extend({

  count: function() {
    var model = this.get('model');
    var items = model.currency;
    return items.filterBy('symbol', 'BTCUSD').get('length');
  }.property('items.@each.symbol'), 

});

WebApp.MmkindRoute = Ember.Route.extend({

    model: function(params) {
      return Ember.RSVP.hash({ // 这里 model 对象包含多种子对象 
         //currency :this.store.find('indice',{'kind':'currency'}),
         //indice: this.store.find('indice',{'kind':params.kind}),
         marketmaker: this.store.find('marketmaker',{kind:params.kind}),  
         hold: this.store.find('hold',{kind:params.kind}),  

        // orderhistory: this.store.find('orderhistory',{kind:params.kind}),           
         //currency:this.get('store').filter('hold', function(record){return record.get('kind') == 'currency'}),
         //BTCUSD:this.store.filter('hold', function(record){return record.get('symbol') == 'BTCUSD'}),    
         chart: this.store.find('chart'),  
         dailyreport: this.store.find('dailyreport',{kind:params.kind}),           
           
      });
    },  
    afterModel: function(model, transition) {

        if (model.marketmaker.content.length=== 1) {
          // this.transitionTo('cfddetail',  model.indice.content[0]._data.symbol);
        }
    }
}); 


*/